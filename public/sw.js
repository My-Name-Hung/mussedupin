const CACHE_NAME = "musee-du-pin-v1.2";
const STATIC_CACHE = "static-v1.2";
const DYNAMIC_CACHE = "dynamic-v1.2";

// Critical resources to cache immediately
const STATIC_ASSETS = [
  "/",
  "/static/js/bundle.js",
  "/static/css/main.css",
  "/manifest.json",
  // Critical fonts
  "/fonts/Meholrax.woff2",
  "/fonts/Roboto.woff2",
  // Critical images
  "https://mussedupin.onrender.com/api/assets/Background/Background2.webp",
  "https://mussedupin.onrender.com/api/assets/hero-poster.webp",
];

// Assets to cache on demand
const CACHE_PATTERNS = [
  /^https:\/\/mussedupin\.onrender\.com\/api\/assets\/.+\.(webp|jpg|jpeg|png)$/,
  /^https:\/\/mussedupin\.onrender\.com\/api\/assets\/.+\.(mp4|webm)$/,
  /^https:\/\/fonts\.googleapis\.com\//,
  /^https:\/\/fonts\.gstatic\.com\//,
];

// Install event - cache critical resources
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");

  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("Caching static assets...");
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error("Failed to cache static assets:", error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");

  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // Take control of all clients
      self.clients.claim(),
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const { url, method } = request;

  // Only handle GET requests
  if (method !== "GET") return;

  // Skip non-http(s) requests
  if (!url.startsWith("http")) return;

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);

  try {
    // Strategy 1: Cache First for static assets
    if (STATIC_ASSETS.some((asset) => request.url.includes(asset))) {
      return await cacheFirst(request, STATIC_CACHE);
    }

    // Strategy 2: Stale While Revalidate for images and videos
    if (CACHE_PATTERNS.some((pattern) => pattern.test(request.url))) {
      return await staleWhileRevalidate(request, DYNAMIC_CACHE);
    }

    // Strategy 3: Network First for API calls
    if (url.pathname.startsWith("/api/")) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }

    // Strategy 4: Cache First for navigation requests
    if (request.mode === "navigate") {
      return await cacheFirst(request, STATIC_CACHE);
    }

    // Default: Network with fallback to cache
    return await networkWithCacheFallback(request, DYNAMIC_CACHE);
  } catch (error) {
    console.error("Fetch error:", error);
    return new Response("Network error", { status: 408 });
  }
}

// Cache strategies
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.status === 200) {
    cache.put(request, response.clone());
  }

  return response;
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);

  // Fetch in background and update cache
  const fetchPromise = fetch(request).then((response) => {
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  });

  // Return cached version immediately if available
  return cached || fetchPromise;
}

async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);

  try {
    const response = await fetch(request);
    if (response.status === 200) {
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

async function networkWithCacheFallback(request, cacheName) {
  try {
    const response = await fetch(request);

    if (response.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }

    return response;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(request);

    if (cached) {
      return cached;
    }

    throw error;
  }
}

// Background sync for failed requests
self.addEventListener("sync", (event) => {
  if (event.tag === "background-sync") {
    console.log("Background sync triggered");
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Implement background sync logic for failed requests
  console.log("Performing background sync...");
}

// Push notification handler
self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();

    const options = {
      body: data.body,
      icon: "/icon-192x192.png",
      badge: "/icon-96x96.png",
      data: data.data,
      actions: data.actions,
    };

    event.waitUntil(self.registration.showNotification(data.title, options));
  }
});

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(self.clients.openWindow(event.notification.data.url || "/"));
});
