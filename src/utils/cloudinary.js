// Cloudinary configuration
const CLOUD_NAME = "dco63bsah";
const VERSION = "v1750338666"; // Add version number

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

// Helper functions for each category
export const getKhuyenTaiImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `khuyentai/${filename}`;
  return buildCloudinaryUrl(publicId);
};

export const getAnPhamImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `Anpham/${filename}`;
  return buildCloudinaryUrl(publicId);
};

export const getInTheoYeuCauImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `inyeucau/${filename}`;
  return buildCloudinaryUrl(publicId);
};

export const getHoiThaoNgheThuatImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `hoithaonghethuat/${filename}`;
  return buildCloudinaryUrl(publicId);
};

export const getThoiTrangImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `thoitrang/${filename}`;
  return buildCloudinaryUrl(publicId);
};

export const getDoTrangSucImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `dotrangsuc/${filename}`;
  return buildCloudinaryUrl(publicId);
};

export const getThoCamImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `thocam/${filename}`;
  return buildCloudinaryUrl(publicId);
};

export const getSanPhamTuThongImageUrl = (filename) => {
  if (!filename) return "";
  const publicId = `sanphamtuthong/${filename}`;
  return buildCloudinaryUrl(publicId);
};
