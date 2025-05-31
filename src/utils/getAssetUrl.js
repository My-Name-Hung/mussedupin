const SERVER_URL = "https://mussedupin.onrender.com";

export const getAssetUrl = (filename) => {
  if (!filename) return "";
  return `${SERVER_URL}/api/assets/${filename}`;
};
