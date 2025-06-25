import { useEffect, useState } from "react";

const API_URL = "https://mussedupin.onrender.com";

export const useAssets = (category) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = "/api/assets";
        if (category) {
          url += `?category=${encodeURIComponent(category)}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (data.success) {
          setAssets(data.files);
        } else {
          setError(data.message || "Failed to fetch assets");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch assets");
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, [category]);

  const getAssetUrl = (filename) => {
    const asset = assets.find((a) => a.filename === filename);
    if (asset && asset.url) return asset.url;
    // fallback for legacy
    return `/api/assets/${filename}`;
  };

  return { assets, loading, error, getAssetUrl };
};
