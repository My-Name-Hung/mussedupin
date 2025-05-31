import { useEffect, useState } from "react";

const useImagePreload = (images) => {
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;

    const totalImages = images.length;
    let loadedCount = 0;

    const preloadImage = (src) => {
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          loadedCount++;
          setLoadedImages((prev) => new Set([...prev, src]));
          setProgress((loadedCount / totalImages) * 100);
          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          setProgress((loadedCount / totalImages) * 100);
          reject();
        };

        // Set loading priority
        if (src.includes("hero") || src.includes("background")) {
          img.fetchPriority = "high";
        } else {
          img.fetchPriority = "low";
        }

        img.src = src;
      });
    };

    // Sort images by priority
    const sortedImages = [...images].sort((a, b) => {
      const aIsPriority = a.includes("hero") || a.includes("background");
      const bIsPriority = b.includes("hero") || b.includes("background");
      return bIsPriority - aIsPriority;
    });

    // Preload images in parallel with priority
    Promise.allSettled(sortedImages.map(preloadImage)).catch((error) =>
      console.error("Error preloading images:", error)
    );
  }, [images]);

  return {
    progress,
    isLoaded: loadedImages.size === images.length,
    loadedImages,
  };
};

export default useImagePreload;
