// Cloudinary configuration
const CLOUD_NAME = "dn0br7hj0";
const VERSION = "v1748784675"; // Add version number

// Base URL for Cloudinary
const CLOUDINARY_BASE_URL = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload`;

// Helper function to build Cloudinary URL with transformations
const buildCloudinaryUrl = (publicId, options = {}) => {
  if (!publicId) return "";

  // Convert options to Cloudinary transformation string
  const transformations = Object.entries(options)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => {
      if (key === "width" || key === "height" || key === "crop") {
        return `${key}_${value}`;
      }
      return `${key},${value}`;
    })
    .join(",");

  // Build the final URL with version number
  return `${CLOUDINARY_BASE_URL}/${VERSION}/${
    transformations ? transformations + "/" : ""
  }${publicId}`;
};

// Helper function to check if a URL is a direct URL
const isDirectUrl = (url) => {
  return url && (url.startsWith("http") || url.startsWith("https"));
};

// Helper function to get exhibition image URL
export const getImageUrls = (imagePath) => {
  // Check if the path is already a full URL
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return imagePath;
  }

  // Otherwise, treat it as a Cloudinary image ID
  return `https://res.cloudinary.com/dn0br7hj0/image/upload/${imagePath}`;
};

export const getImageUrl = (filename) => {
  if (!filename) return "";
  // If it's already a direct URL, return it as is
  if (isDirectUrl(filename)) return filename;
  // Otherwise treat as Cloudinary asset
  const publicId = `collections/${filename}`;
  return buildCloudinaryUrl(publicId);
};

// Helper function to get gallery image URL
export const getGalleryImageUrl = (filename) => {
  if (!filename) return "";
  // If it's already a direct URL, return it as is
  if (isDirectUrl(filename)) return filename;
  // Otherwise treat as Cloudinary asset
  const publicId = `collections/${filename}`;
  return buildCloudinaryUrl(publicId);
};

// Helper function to get thumbnail URL
export const getThumbnailUrl = (filename) => {
  if (!filename) return "";
  // If it's already a direct URL, return it as is
  if (isDirectUrl(filename)) return filename;
  // Otherwise treat as Cloudinary asset
  const publicId = `collections/${filename}`;
  return buildCloudinaryUrl(publicId);
};

// Helper function to get about image URL
export const getAboutImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `about/${filename}`;
  return buildCloudinaryUrl(publicId);
};

// Helper function to get logo image URL
export const getLogoImageUrl = (filename, options = {}) => {
  if (!filename) return "";
  const publicId = `logo/${filename}`;
  return buildCloudinaryUrl(publicId, {
    ...options,
  });
};

// Helper function to get background image URL
export const getBackgroundImageUrl = (filename, options = {}) => {
  if (!filename) return "";
  const publicId = `background/${filename}`;
  return buildCloudinaryUrl(publicId, {
    ...options,
  });
};

// Helper function to get any image URL with custom transformations
export const getImagebuildUrl = (publicId, options = {}) => {
  return buildCloudinaryUrl(publicId, options);
};

// Helper function to get hero video URL
export const getHeroVideoUrl = (filename) => {
  if (!filename) return "";
  const publicId = `hero/${filename}`;
  return buildCloudinaryUrl(publicId);
};
