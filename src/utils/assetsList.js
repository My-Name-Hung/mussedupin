import { getAssetUrl } from "./getAssetUrl";

// All critical assets that should be preloaded before showing the main content
export const getCriticalAssets = () => {
  const assets = [];

  // Hero video
  assets.push(getAssetUrl("LANGBIANG_RESIZE.mp4"));

  // Highlights images
  assets.push(getAssetUrl("Cồng Chiên.webp"));
  assets.push(getAssetUrl("Lồng Đa Đa.webp"));
  assets.push(getAssetUrl("Thông 2.webp"));
  assets.push(getAssetUrl("Hoa Ban Trắng.webp"));

  // Collections images
  assets.push(getAssetUrl("36 (2).webp"));
  assets.push(getAssetUrl("Nồi Đất.webp"));
  assets.push(getAssetUrl("Chiếc Gùi.webp"));
  assets.push(getAssetUrl("Điêu Khắc.webp"));

  // DelveInto images (convert imports to getAssetUrl)
  assets.push(getAssetUrl("congchien_hero.webp"));
  assets.push(getAssetUrl("DanT'rung_hero.webp"));
  assets.push(getAssetUrl("Gui_hero.webp"));
  assets.push(getAssetUrl("LongDaDa_hero.webp"));
  assets.push(getAssetUrl("phunu_hero.webp"));

  // Navbar images for dropdown menus
  assets.push(getAssetUrl("LongDaDa_cards.webp"));
  assets.push(getAssetUrl("noidat_cards.webp"));
  assets.push(getAssetUrl("phunu_cards.webp"));

  // Logo and other critical UI assets
  assets.push(getAssetUrl("logo-icon.jpg"));

  return assets;
};

// Secondary assets that can load after priority content
export const getSecondaryAssets = () => {
  const assets = [];

  // Additional collection images
  const collectionImages = [
    "DSC_2473.webp",
    "DSC_2475.webp",
    "DSC_2486.webp",
    "DSC_2498.webp",
    "17 (2).webp",
    "17 (3).webp",
    "17 (4).webp",
    "17 (5).webp",
    "17 (7).webp",
    "38 (1).webp",
    "38 (2).webp",
    "3 (1).webp",
    "3 (2).webp",
    "3 (3).webp",
    "3 (4).webp",
    "3.webp",
    "4 (2).webp",
    // Add more as needed
  ];

  collectionImages.forEach((image) => {
    assets.push(getAssetUrl(image));
  });

  return assets;
};

// All assets combined
export const getAllAssets = () => {
  return [...getCriticalAssets(), ...getSecondaryAssets()];
};
