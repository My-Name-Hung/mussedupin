import { useEffect, useState } from "react";

const API_URL = "https://mussedupin.onrender.com";

export const useAssets = (category) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch(`${API_URL}/api/assets`);
        const data = await response.json();

        if (data.success) {
          const filteredAssets = category
            ? data.files.filter((file) => file.metadata.category === category)
            : data.files;
          setAssets(filteredAssets);
        } else {
          throw new Error(data.message);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAssets();
  }, [category]);

  const getAssetUrl = (filename) => {
    return `${API_URL}/api/assets/${filename}`;
  };

  return {
    assets,
    loading,
    error,
    getAssetUrl,
  };
};
