import { useCallback, useRef } from "react";

// Memory cache for fastest access
const memoryCache = new Map();

// IndexedDB setup
const DB_NAME = "imageCache";
const STORE_NAME = "images";
const DB_VERSION = 1;

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
};

// Helper to get sessionStorage key
const getSessionKey = (src) => `imagecache_${src}`;

export default function useImageCache() {
  const loadingRef = useRef(new Set());

  const preload = useCallback(async (src) => {
    if (!src) return false;

    // Check memory cache first
    if (memoryCache.has(src)) {
      return true;
    }

    // Check if already loading
    if (loadingRef.current.has(src)) {
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (memoryCache.has(src) || !loadingRef.current.has(src)) {
            resolve(true);
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      });
    }

    loadingRef.current.add(src);

    try {
      // Check sessionStorage first
      const sessionKey = getSessionKey(src);
      const sessionData = sessionStorage.getItem(sessionKey);

      if (sessionData) {
        const blob = new Blob([new Uint8Array(JSON.parse(sessionData))]);
        const url = URL.createObjectURL(blob);
        memoryCache.set(src, url);
        loadingRef.current.delete(src);
        return true;
      }

      // Check IndexedDB
      try {
        const db = await openDB();
        const transaction = db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const result = await new Promise((resolve, reject) => {
          const request = store.get(src);
          request.onsuccess = () => resolve(request.result);
          request.onerror = () => reject(request.error);
        });

        if (result) {
          const url = URL.createObjectURL(result);
          memoryCache.set(src, url);
          loadingRef.current.delete(src);
          return true;
        }
      } catch (dbError) {
        console.warn("IndexedDB error:", dbError);
      }

      // Fetch and cache
      const response = await fetch(src);
      if (!response.ok) throw new Error(`Failed to load: ${response.status}`);

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Store in memory cache
      memoryCache.set(src, url);

      // Store in sessionStorage (limit size)
      if (blob.size < 1024 * 1024) {
        // 1MB limit
        try {
          const arrayBuffer = await blob.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          sessionStorage.setItem(
            sessionKey,
            JSON.stringify(Array.from(uint8Array))
          );
        } catch (storageError) {
          console.warn("SessionStorage error:", storageError);
        }
      }

      // Store in IndexedDB
      try {
        const db = await openDB();
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.put(blob, src);
      } catch (dbError) {
        console.warn("IndexedDB store error:", dbError);
      }

      loadingRef.current.delete(src);
      return true;
    } catch (error) {
      console.error("Preload error:", error);
      loadingRef.current.delete(src);
    return false;
    }
  }, []);

  // New function to preload multiple assets
  const preloadAll = useCallback(
    async (assetList, concurrency = 6) => {
      if (!assetList || assetList.length === 0) return [];

      const results = [];
      for (let i = 0; i < assetList.length; i += concurrency) {
        const batch = assetList.slice(i, i + concurrency);
        const batchPromises = batch.map((asset) => preload(asset));
        const batchResults = await Promise.allSettled(batchPromises);
        results.push(...batchResults);
      }

      return results;
    },
    [preload]
  );

  const getCachedUrl = useCallback((src) => {
    return memoryCache.get(src) || src;
  }, []);

  const isLoaded = useCallback((src) => {
    return memoryCache.has(src);
  }, []);

  const clearCache = useCallback(() => {
    memoryCache.clear();
    loadingRef.current.clear();

    // Clear sessionStorage
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith("imagecache_")) {
        sessionStorage.removeItem(key);
      }
    }

    // Clear IndexedDB
    openDB()
      .then((db) => {
        const transaction = db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.clear();
      })
      .catch(console.warn);
  }, []);

  return {
    preload,
    preloadAll,
    getCachedUrl,
    isLoaded,
    clearCache,
  };
}
