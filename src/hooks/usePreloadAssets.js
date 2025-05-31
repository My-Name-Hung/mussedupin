import { useEffect, useState } from "react";
import useImageCache from "./useImageCache";

export default function usePreloadAssets(assetList = []) {
  const { preload } = useImageCache();
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let isMounted = true;
    let loaded = 0;
    if (assetList.length === 0) {
      setDone(true);
      setProgress(100);
      return;
    }
    assetList.forEach((src) => {
      preload(src)
        .catch(() => {})
        .finally(() => {
          loaded += 1;
          if (isMounted) {
            setProgress(Math.round((loaded / assetList.length) * 100));
            if (loaded === assetList.length) setDone(true);
          }
        });
    });
    return () => {
      isMounted = false;
    };
  }, [assetList, preload]);

  return { progress, done };
}
