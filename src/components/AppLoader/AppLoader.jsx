import React, { useEffect, useState } from "react";
import useImageCache from "../../hooks/useImageCache";
import usePreloadAssets from "../../hooks/usePreloadAssets";
import Loading from "../Loading/Loading";

const AppLoader = ({ children }) => {
  const [allAssets, setAllAssets] = useState([]);
  const [criticalAssets, setCriticalAssets] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const { preloadAll } = useImageCache();

  // Initialize assets
  useEffect(() => {
    const critical = [];
    const secondary = [];

    setCriticalAssets(critical);
    setAllAssets([...critical, ...secondary]);
  }, []);

  // Use our preload hook for all assets
  const { progress, done, priorityDone } = usePreloadAssets(allAssets);

  // Preload critical assets with high priority
  useEffect(() => {
    if (criticalAssets.length > 0) {
      // Preload critical assets immediately
      preloadAll(criticalAssets).catch((error) => {
        console.error("Error preloading critical assets:", error);
      });
    }
  }, [criticalAssets, preloadAll]);

  // Show content when priority assets are loaded
  useEffect(() => {
    if (priorityDone) {
      setShowContent(true);
    }
  }, [priorityDone]);

  if (!showContent) {
    return <Loading progress={progress} priorityDone={priorityDone} />;
  }

  return (
    <>
      {children}
      {/* Continue loading secondary assets in background */}
      {!done && (
        <div style={{ display: "none" }}>
          Loading secondary assets: {Math.round(progress)}%
        </div>
      )}
    </>
  );
};

export default AppLoader;
