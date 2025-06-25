import { useMemo } from "react";
import useImageCache from "./useImageCache";

// Hook to get cached asset URL or fallback to original
export default function useCachedAsset(assetUrl) {
  const { getCachedUrl, isLoaded } = useImageCache();

  const cachedUrl = useMemo(() => {
    if (!assetUrl) return "";

    // Return cached URL if available, otherwise return original
    return getCachedUrl(assetUrl);
  }, [assetUrl, getCachedUrl]);

  const isAssetLoaded = useMemo(() => {
    return isLoaded(assetUrl);
  }, [assetUrl, isLoaded]);

  return {
    url: cachedUrl,
    isLoaded: isAssetLoaded,
    originalUrl: assetUrl,
  };
}
