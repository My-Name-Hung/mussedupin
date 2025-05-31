import { useCallback, useEffect, useState } from "react";
import useImageCache from "./useImageCache";

const PRIORITY_PATTERNS = ["hero", "background", "logo", "banner", "thumbnail"];

const useImagePreload = (images, options = {}) => {
  const { preload, isLoaded: isCached } = useImageCache();
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [progress, setProgress] = useState(0);
  const [priorityDone, setPriorityDone] = useState(false);

  const getPriority = useCallback((src) => {
    return PRIORITY_PATTERNS.some((pattern) =>
      src.toLowerCase().includes(pattern)
    )
      ? "high"
      : "low";
  }, []);

  useEffect(() => {
    if (!images || images.length === 0) {
      setProgress(100);
      setPriorityDone(true);
      return;
    }

    let isMounted = true;
    let loadedCount = 0;
    const totalImages = images.length;

    // Split images into priority groups
    const priorityImages = images.filter((src) => getPriority(src) === "high");
    const regularImages = images.filter((src) => getPriority(src) === "low");

    const updateProgress = (count) => {
      if (!isMounted) return;
      loadedCount = count;
      setProgress(Math.round((loadedCount / totalImages) * 100));
    };

    const loadImage = async (src) => {
      if (isCached(src)) {
        setLoadedImages((prev) => new Set([...prev, src]));
        return true;
      }

      try {
        await preload(src);
        if (isMounted) {
          setLoadedImages((prev) => new Set([...prev, src]));
        }
        return true;
      } catch (error) {
        console.error(`Failed to preload: ${src}`, error);
        return false;
      }
    };

    // Load priority images first
    const loadPriorityImages = async () => {
      await Promise.all(priorityImages.map((src) => loadImage(src)));
      if (isMounted) {
        setPriorityDone(true);
        updateProgress(priorityImages.length);
      }
    };

    // Load regular images in chunks
    const loadRegularImages = async () => {
      const CHUNK_SIZE = 4;
      for (let i = 0; i < regularImages.length; i += CHUNK_SIZE) {
        const chunk = regularImages.slice(i, i + CHUNK_SIZE);
        await Promise.all(chunk.map((src) => loadImage(src)));
        if (isMounted) {
          updateProgress(priorityImages.length + i + chunk.length);
        }
      }
    };

    // Start loading process
    loadPriorityImages().then(() => {
      if (regularImages.length > 0) {
        loadRegularImages();
      }
    });

    return () => {
      isMounted = false;
    };
  }, [images, preload, isCached, getPriority]);

  return {
    progress,
    isLoaded: loadedImages.size === images.length,
    priorityDone,
    loadedImages,
  };
};

export default useImagePreload;
