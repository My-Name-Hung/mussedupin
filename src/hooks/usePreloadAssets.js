import { useCallback, useEffect, useState } from "react";
import useImageCache from "./useImageCache";

const CONCURRENT_LOADS = 4; // Number of concurrent image loads
const PRIORITY_THRESHOLD = 5; // Number of high priority images to load first

export default function usePreloadAssets(assetList = [], options = {}) {
  const { preload, isLoaded: isCached } = useImageCache();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const [priorityDone, setPriorityDone] = useState(false);

  const loadImage = useCallback(
    async (src) => {
      if (isCached(src)) return true;
      try {
        await preload(src);
        return true;
      } catch (error) {
        console.error(`Failed to preload: ${src}`, error);
        return false;
      }
    },
    [preload, isCached]
  );

  useEffect(() => {
    let isMounted = true;
    let loaded = 0;

    if (assetList.length === 0) {
      setDone(true);
      setProgress(100);
      setPriorityDone(true);
      return;
    }

    // Split assets into priority and regular
    const priorityAssets = assetList.slice(0, PRIORITY_THRESHOLD);
    const regularAssets = assetList.slice(PRIORITY_THRESHOLD);

    // Load priority assets first
    const loadPriorityAssets = async () => {
      await Promise.all(priorityAssets.map((src) => loadImage(src)));
      if (isMounted) {
        setPriorityDone(true);
        loaded = priorityAssets.length;
        setProgress(Math.round((loaded / assetList.length) * 100));
      }
    };

    // Load regular assets in chunks
    const loadRegularAssets = async () => {
      for (let i = 0; i < regularAssets.length; i += CONCURRENT_LOADS) {
        const chunk = regularAssets.slice(i, i + CONCURRENT_LOADS);
        await Promise.all(chunk.map((src) => loadImage(src)));
        if (isMounted) {
          loaded += chunk.length;
          setProgress(Math.round((loaded / assetList.length) * 100));
        }
      }
      if (isMounted) setDone(true);
    };

    // Start loading process
    loadPriorityAssets().then(() => {
      if (regularAssets.length > 0) {
        loadRegularAssets();
      } else {
        setDone(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [assetList, loadImage]);

  return { progress, done, priorityDone };
}
