import { useEffect } from "react";
import { getAssetUrl } from "../../utils/getAssetUrl";

const CriticalResourceLoader = () => {
  useEffect(() => {
    // Critical resources that should be loaded immediately
    const criticalResources = [
      // Hero video poster/thumbnail
      { url: getAssetUrl("hero-poster.webp"), type: "image" },
      // Critical images for above-the-fold content
      { url: getAssetUrl("Background/Background2.webp"), type: "image" },
      // Critical fonts
      { url: "/fonts/Meholrax.woff2", type: "font" },
      { url: "/fonts/Roboto.woff2", type: "font" },
    ];

    // Preload critical resources
    criticalResources.forEach((resource) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = resource.type;
      link.href = resource.url;

      if (resource.type === "font") {
        link.crossOrigin = "anonymous";
      }

      // Add to head
      document.head.appendChild(link);
    });

    // Prefetch likely next page resources
    const prefetchResources = [
      getAssetUrl("Cồng Chiên.webp"),
      getAssetUrl("Thông 2.webp"),
      getAssetUrl("Lồng Đa Đa.webp"),
    ];

    // Delay prefetch to not block critical resources
    setTimeout(() => {
      prefetchResources.forEach((url) => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = url;
        document.head.appendChild(link);
      });
    }, 2000);

    // Cleanup function
    return () => {
      // Remove preload links to prevent memory leaks
      const preloadLinks = document.querySelectorAll(
        'link[rel="preload"], link[rel="prefetch"]'
      );
      preloadLinks.forEach((link) => {
        if (
          criticalResources.some((r) => r.url === link.href) ||
          prefetchResources.includes(link.href)
        ) {
          link.remove();
        }
      });
    };
  }, []);

  return null;
};

export default CriticalResourceLoader;
