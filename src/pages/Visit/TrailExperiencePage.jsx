import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./TrailExperiencePage.css";

// Import trail images from collection folders
const dungcuImages = import.meta.glob(
  "../../assets/home/Collections/DungcuAmNhacTayNguyen/*.webp"
);
const khoChanNuoiImages = import.meta.glob(
  "../../assets/home/Collections/K_hoChanNuoi/*.webp"
);
const khoDieuKhacImages = import.meta.glob(
  "../../assets/home/Collections/K_hoDieuKhac/*.webp"
);
const khoLeHoiImages = import.meta.glob(
  "../../assets/home/Collections/K_hoLeHoi/*.webp"
);
const khoSanBanImages = import.meta.glob(
  "../../assets/home/Collections/K_hoSanBan_HaiLuomTrongTrotChanNuoi/*.webp"
);
const khoSinhHoatImages = import.meta.glob(
  "../../assets/home/Collections/K_hoSinhHoatThuongNhat/*.webp"
);
const phucTangImages = import.meta.glob(
  "../../assets/home/Collections/PhucTang/*.webp"
);

// Import thumbnails for each category
import dungcuThumb from "../../assets/home/Collections/DungcuAmNhacTayNguyen/Cồng Chiên.webp";
import channuoiThumb from "../../assets/home/Collections/K_hoChanNuoi/Lồng Đa Đa.webp";
import dieukhacThumb from "../../assets/home/Collections/K_hoDieuKhac/Điêu Khắc.webp";
import lehoiThumb from "../../assets/home/Collections/K_hoLeHoi/Lễ Hội.webp";
import sanbanThumb from "../../assets/home/Collections/K_hoSanBan_HaiLuomTrongTrotChanNuoi/Chiếc Gùi.webp";
import sinhoatThumb from "../../assets/home/Collections/K_hoSinhHoatThuongNhat/Nồi Đất.webp";
import phuctangThumb from "../../assets/home/Collections/PhucTang/Thông 2.webp";

// SVG Icons
const KeyIcon = () => (
  <svg
    viewBox="0 0 20 20"
    width="1.5rem"
    height="1.5rem"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
  >
    <defs></defs>
    <path d="M14.5 4.4C14.5 3 15.6 1.9 17 2c1.4 0 2.5 1.1 2.5 2.4 0 .5-.2 1-.5 1.5l-1.6 2.3c-.2.3-.6.3-.8 0L15 5.9c-.3-.4-.5-.9-.5-1.5m3.2.1c0-.4-.3-.7-.7-.7s-.7.3-.7.7.3.7.7.7.7-.3.7-.7M.5 12.2C.5 10.4 2 9 3.8 9s3.3 1.4 3.3 3.2c0 .7-.2 1.4-.7 1.9l-2.2 3.3c-.2.3-.6.3-.8 0l-2.2-3.3c-.4-.6-.7-1.2-.7-1.9m4.2.1c0-.5-.4-.9-.9-.9s-.9.4-.9.9.4.9.9.9.9-.4.9-.9"></path>
    <path
      d="M15.5 18.5H5c-.3 0-.5-.2-.5-.5s.2-.5.5-.5h10.5c1.5 0 2.5-.3 2.5-1.5 0-2-2.4-2-2.5-2H11c-1.4 0-3-.8-3-3s1.8-3 3-3h4.5c.3 0 .5.2.5.5s-.2.5-.5.5H11s-2 0-2 2 1.4 2 2 2h4.5c1.2 0 3.5.6 3.5 3s-2.5 2.5-3.5 2.5"
      style={{ fill: "rgb(255, 255, 255)" }}
    ></path>
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const ArrowUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="19" x2="12" y2="5"></line>
    <polyline points="5 12 12 5 19 12"></polyline>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ListIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="8" y1="6" x2="21" y2="6"></line>
    <line x1="8" y1="12" x2="21" y2="12"></line>
    <line x1="8" y1="18" x2="21" y2="18"></line>
    <line x1="3" y1="6" x2="3.01" y2="6"></line>
    <line x1="3" y1="12" x2="3.01" y2="12"></line>
    <line x1="3" y1="18" x2="3.01" y2="18"></line>
  </svg>
);

const ChatIcon = () => (
  <svg
    viewBox="0 0 64 64"
    width="1.8rem"
    height="1.8rem"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M33 6.85c-13.7 0-24.83 9.52-24.83 21.22 0 5.58 2.52 10.84 7.09 14.83l.46.4-.1.6a22.18 22.18 0 0 1-6.9 12.63c9.18-1.8 14.57-5.93 16.62-7.8l.43-.38.56.13c2.17.53 4.41.8 6.66.8 13.69 0 24.82-9.51 24.82-21.2 0-5.65-2.56-10.95-7.2-14.96a26.9 26.9 0 0 0-17.62-6.27zM4.66 59.33 4 57.31a19.87 19.87 0 0 0 9.35-13.18C8.6 39.77 6 34.09 5.98 28.07c0-12.9 12.12-23.4 27.01-23.4 7.19 0 13.95 2.41 19.04 6.8C57.17 15.89 60 21.79 60 28.07c0 12.9-12.12 23.4-27 23.4-2.24 0-4.46-.25-6.62-.73-2.85 2.46-9.91 7.42-21.71 8.6z"></path>
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const BackArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6"></polyline>
  </svg>
);

const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
  </svg>
);

// Sample artworks data structure for the trail
const getArtworkData = (trailId) => {
  // This would ideally come from an API or database
  const trails = {
    1: [
      {
        id: 1,
        title: "DỤNG CỤ ÂM NHẠC TÂY NGUYÊN",
        artist: "Nghệ nhân Tây Nguyên",
        image: dungcuThumb,
        description:
          "Cồng chiêng là nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, là biểu tượng văn hóa và tín ngưỡng thiêng liêng.",
        room: "Khu trưng bày nhạc cụ",
        images: Object.entries(dungcuImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Vào qua cửa chính.",
          },
          {
            icon: <ArrowRightIcon />,
            text: "Đi thẳng đến khu trưng bày nhạc cụ.",
          },
        ],
        additionalSections: [
          {
            title: "NGHỆ THUẬT CỒNG CHIÊNG",
            icon: <ChatIcon />,
            content:
              "Cồng chiêng không chỉ là nhạc cụ mà còn là biểu tượng của quyền lực và địa vị trong cộng đồng.",
          },
        ],
      },
      {
        id: 2,
        title: "ĐIÊU KHẮC TÂY NGUYÊN",
        artist: "Nghệ nhân K'ho",
        image: dieukhacThumb,
        description:
          "Nghệ thuật điêu khắc truyền thống của người K'ho thể hiện đặc trưng văn hóa và đời sống tinh thần của dân tộc.",
        room: "Khu trưng bày điêu khắc",
        images: Object.entries(khoDieuKhacImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Đi theo chỉ dẫn đến khu điêu khắc.",
          },
        ],
        additionalSections: [
          {
            title: "NGHỆ THUẬT ĐIÊU KHẮC",
            icon: <ChatIcon />,
            content:
              "Nghệ thuật điêu khắc K'ho thể hiện đặc trưng văn hóa và đời sống tinh thần của dân tộc.",
          },
        ],
      },
    ],
    2: [
      {
        id: 1,
        title: "CHĂN NUÔI K'HO",
        artist: "Nghệ nhân K'ho",
        image: channuoiThumb,
        description:
          "Khám phá hoạt động chăn nuôi truyền thống của người K'ho.",
        room: "Khu trưng bày đời sống",
        images: Object.entries(khoChanNuoiImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Vào qua khu trưng bày chính.",
          },
          {
            icon: <ArrowRightIcon />,
            text: "Rẽ phải đến khu trưng bày đời sống.",
          },
        ],
        additionalSections: [
          {
            title: "CHĂN NUÔI TRUYỀN THỐNG",
            icon: <ChatIcon />,
            content:
              "Hoạt động chăn nuôi của người K'ho thể hiện sự gắn bó với thiên nhiên và truyền thống văn hóa.",
          },
        ],
      },
    ],
    3: [
      {
        id: 1,
        title: "LỄ HỘI K'HO",
        artist: "Cộng đồng K'ho",
        image: lehoiThumb,
        description: "Khám phá các lễ hội truyền thống của người K'ho.",
        room: "Khu trưng bày lễ hội",
        images: Object.entries(khoLeHoiImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Đi theo lối dẫn đến khu trưng bày lễ hội.",
          },
        ],
        additionalSections: [
          {
            title: "VĂN HÓA LỄ HỘI",
            icon: <ChatIcon />,
            content:
              "Lễ hội truyền thống là một phần không thể thiếu trong đời sống văn hóa của người K'ho.",
          },
        ],
      },
    ],
    4: [
      {
        id: 1,
        title: "SĂN BẮN VÀ HÁI LƯỢM",
        artist: "Cộng đồng K'ho",
        image: sanbanThumb,
        description:
          "Tìm hiểu về hoạt động săn bắn và hái lượm của người K'ho.",
        room: "Khu trưng bày đời sống",
        images: Object.entries(khoSanBanImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Vào qua khu trưng bày chính.",
          },
          {
            icon: <ArrowRightIcon />,
            text: "Đi theo chỉ dẫn đến khu trưng bày đời sống.",
          },
        ],
        additionalSections: [
          {
            title: "SINH KẾ TRUYỀN THỐNG",
            icon: <ChatIcon />,
            content:
              "Săn bắn và hái lượm là hoạt động sinh kế quan trọng của người K'ho.",
          },
        ],
      },
    ],
    5: [
      {
        id: 1,
        title: "SINH HOẠT THƯỜNG NHẬT",
        artist: "Cộng đồng K'ho",
        image: sinhoatThumb,
        description: "Khám phá đời sống sinh hoạt hàng ngày của người K'ho.",
        room: "Khu trưng bày đời sống",
        images: Object.entries(khoSinhHoatImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Đi theo chỉ dẫn đến khu trưng bày đời sống.",
          },
        ],
        additionalSections: [
          {
            title: "ĐỜI SỐNG HÀNG NGÀY",
            icon: <ChatIcon />,
            content:
              "Sinh hoạt thường nhật phản ánh nét văn hóa độc đáo của người K'ho.",
          },
        ],
      },
    ],
    6: [
      {
        id: 1,
        title: "PHỨC TẦNG VĂN HÓA",
        artist: "Cộng đồng K'ho",
        image: phuctangThumb,
        description: "Tìm hiểu về phức tầng văn hóa K'ho.",
        room: "Khu trưng bày phức tầng",
        images: Object.entries(phucTangImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Vào qua cửa chính bảo tàng.",
          },
        ],
        additionalSections: [
          {
            title: "PHỨC TẦNG VĂN HÓA",
            icon: <ChatIcon />,
            content:
              "Phức tầng văn hóa K'ho là sự kết hợp độc đáo của nhiều yếu tố văn hóa truyền thống.",
          },
        ],
      },
    ],
    // Add default data for any other trail ID
    default: [
      {
        id: 1,
        title: "VĂN HÓA K'HO",
        artist: "Cộng đồng K'ho",
        image: phuctangThumb,
        description: "Khám phá nét văn hóa độc đáo của người K'ho.",
        room: "Khu trưng bày chính",
        images: Object.entries(phucTangImages).map(([path, loader]) => ({
          path,
          loader,
        })),
        access: [
          {
            icon: <LocationIcon />,
            text: "Vào qua cửa chính bảo tàng.",
          },
        ],
        additionalSections: [
          {
            title: "VĂN HÓA K'HO",
            icon: <ChatIcon />,
            content:
              "Văn hóa K'ho là một phần quan trọng của di sản văn hóa Tây Nguyên.",
          },
        ],
      },
    ],
  };

  // Return the trail data if it exists, otherwise return default data
  return trails[trailId] || trails.default;
};

const TrailExperiencePage = () => {
  const { trailId, artworkId = 1 } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState([]);
  const [showAccess, setShowAccess] = useState(false);
  const [showArtworksList, setShowArtworksList] = useState(false);

  useEffect(() => {
    // Get trail data
    try {
      const trailArtworks = getArtworkData(parseInt(trailId) || 1);

      // Load all images for the current artwork
      const loadImages = async () => {
        const currentArtwork =
          trailArtworks.find((a) => a.id === parseInt(artworkId)) ||
          trailArtworks[0];
        if (currentArtwork && currentArtwork.images) {
          const imagePromises = currentArtwork.images.map(
            async ({ path, loader }) => {
              try {
                const module = await loader();
                return {
                  path,
                  url: module.default,
                  title: path.split("/").pop().replace(".webp", ""),
                  artist: currentArtwork.artist,
                  description: currentArtwork.description,
                  additionalSections: currentArtwork.additionalSections,
                };
              } catch (error) {
                console.error(`Error loading image ${path}:`, error);
                return null;
              }
            }
          );

          const loadedImagesList = (await Promise.all(imagePromises)).filter(
            (img) => img !== null
          );
          setAllImages([
            {
              path: "main",
              url: currentArtwork.image,
              title: currentArtwork.title,
              artist: currentArtwork.artist,
              description: currentArtwork.description,
              additionalSections: currentArtwork.additionalSections,
            },
            ...loadedImagesList,
          ]);
          setCurrentImageIndex(0);
        }
      };

      loadImages();
      setLoading(false);

      // Set trail name based on trail ID
      const trailNames = {
        1: "Dụng cụ âm nhạc Tây Nguyên",
        2: "K'ho chăn nuôi",
        3: "K'ho lễ hội",
        4: "K'ho săn bắn và hái lượm",
        5: "K'ho sinh hoạt thường nhật",
        6: "Phức tầng văn hóa K'ho",
      };

      document.title = `${
        trailNames[trailId] || "Lộ trình tham quan"
      } | Bảo tàng Du Pin`;
    } catch (err) {
      console.error("Error loading trail data:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
      setLoading(false);
    }
  }, [trailId, artworkId]);

  const navigateImages = (direction) => {
    const newIndex =
      (currentImageIndex + direction + allImages.length) % allImages.length;
    setCurrentImageIndex(newIndex);
  };

  const currentImage = allImages[currentImageIndex] || {
    url: "",
    title: "",
    artist: "",
    description: "",
    additionalSections: [],
  };

  if (loading) {
    return (
      <div className="trail-experience-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải trải nghiệm...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="trail-experience-page">
        <div className="error-container">
          <h2>Đã xảy ra lỗi</h2>
          <p>{error}</p>
          <button onClick={() => navigate(`/visitor-trails`)}>
            Quay lại lộ trình tham quan
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="trail-experience-page">
      <h1 className="trail-exp-title">{currentImage.title}</h1>

      <div className="trail-exp-main-content">
        {/* Access section */}
        <div className="trail-exp-access">
          <div
            className="trail-exp-access-header"
            onClick={() => setShowAccess(!showAccess)}
          >
            <div className="trail-exp-access-title">
              <KeyIcon /> ACCESS
            </div>
            <div className={`chevron-icon ${showAccess ? "open" : ""}`}>
              <ChevronDownIcon />
            </div>
          </div>
        </div>

        {/* Main artwork image */}
        <div className="trail-exp-artwork-container">
          <img
            src={currentImage.url}
            alt={currentImage.title}
            className="trail-exp-artwork main-artwork"
          />
        </div>

        {/* Artwork info */}
        <div className="trail-exp-artwork-info">
          <h2 className="trail-exp-artwork-title">{currentImage.title}</h2>
          {currentImage.artist && (
            <div className="trail-exp-artwork-artist">
              {currentImage.artist}
            </div>
          )}
          <p className="trail-exp-artwork-description">
            {currentImage.description}
          </p>
        </div>

        {/* Additional sections */}
        {currentImage.additionalSections?.map((section, index) => (
          <div key={index} className="trail-exp-section">
            <div className="trail-exp-section-header">
              <div className="trail-exp-section-icon">{section.icon}</div>
              <h3 className="trail-exp-section-title">{section.title}</h3>
            </div>
            <div className="trail-exp-section-content">{section.content}</div>
          </div>
        ))}
      </div>

      {/* Bottom navigation */}
      <div className="trail-exp-nav">
        <div
          className="trail-exp-nav-counter"
          onClick={() => setShowArtworksList(true)}
        >
          <ListIcon />
          <span className="trail-exp-nav-position">
            {currentImageIndex + 1}/{allImages.length}
          </span>
        </div>

        <div className="trail-exp-nav-buttons">
          <button
            className="trail-exp-nav-button"
            onClick={() => navigateImages(-1)}
            disabled={currentImageIndex === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            className="trail-exp-nav-button"
            onClick={() => navigateImages(1)}
            disabled={currentImageIndex === allImages.length - 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>

      {/* Artworks List Modal */}
      {showArtworksList && (
        <div className="trail-exp-modal-overlay">
          <div className="trail-exp-modal">
            <div className="trail-exp-modal-header">
              <button
                className="trail-exp-modal-back"
                onClick={() => setShowArtworksList(false)}
              >
                <BackArrowIcon />
              </button>
              <h2 className="trail-exp-modal-title">Tất cả hình ảnh</h2>
              <button
                className="trail-exp-modal-close"
                onClick={() => setShowArtworksList(false)}
              >
                ×
              </button>
            </div>

            <div className="trail-exp-modal-content">
              {allImages.map((image, index) => (
                <div
                  key={image.path}
                  className={`trail-exp-modal-item ${
                    index === currentImageIndex ? "active" : ""
                  }`}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setShowArtworksList(false);
                  }}
                >
                  <div className="trail-exp-modal-item-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <img
                    src={image.url}
                    alt={image.title}
                    className="trail-exp-modal-item-image"
                  />
                  <div className="trail-exp-modal-item-info">
                    <h3 className="trail-exp-modal-item-title">
                      {image.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            <div className="trail-exp-modal-footer">
              <span className="trail-exp-modal-counter">
                {currentImageIndex + 1}/{allImages.length}
              </span>
              <div className="trail-exp-modal-nav">
                <button
                  className="trail-exp-modal-nav-button"
                  onClick={() => navigateImages(-1)}
                  disabled={currentImageIndex === 0}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                <button
                  className="trail-exp-modal-nav-button"
                  onClick={() => navigateImages(1)}
                  disabled={currentImageIndex === allImages.length - 1}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrailExperiencePage;
