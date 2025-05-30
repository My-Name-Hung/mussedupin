import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TranslatedText from "../../components/TranslatedText";
import "./CategoryPage.css";

// Import category thumbnails
import dungcuThumb from "../../assets/home/Collections/DungcuAmNhacTayNguyen/Cồng Chiên.webp";
import channuoiThumb from "../../assets/home/Collections/K_hoChanNuoi/Lồng Đa Đa.webp";
import dieukhacThumb from "../../assets/home/Collections/K_hoDieuKhac/Điêu Khắc.webp";
import lehoiThumb from "../../assets/home/Collections/K_hoLeHoi/Lễ Hội.webp";
import sanbanThumb from "../../assets/home/Collections/K_hoSanBan_HaiLuomTrongTrotChanNuoi/Chiếc Gùi.webp";
import sinhoatThumb from "../../assets/home/Collections/K_hoSinhHoatThuongNhat/Nồi Đất.webp";
import phuctangThumb from "../../assets/home/Collections/PhucTang/Thông 2.webp";
import vatlieuThumb from "../../assets/home/Collections/VatLieu/Hoa Ban Trắng.webp";

// Import all images for each category
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
const vatLieuImages = import.meta.glob(
  "../../assets/home/Collections/VatLieu/*.webp"
);

// Sample collection data
const collectionData = {
  categories: [
    {
      id: 1,
      title: "Dụng cụ âm nhạc Tây Nguyên",
      image: dungcuThumb,
      images: dungcuImages,
    },
    {
      id: 2,
      title: "K'ho chăn nuôi",
      image: channuoiThumb,
      images: khoChanNuoiImages,
    },
    {
      id: 3,
      title: "K'ho điêu khắc",
      image: dieukhacThumb,
      images: khoDieuKhacImages,
    },
    {
      id: 4,
      title: "K'ho lễ hội",
      image: lehoiThumb,
      images: khoLeHoiImages,
    },
    {
      id: 5,
      title: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
      image: sanbanThumb,
      images: khoSanBanImages,
    },
    {
      id: 6,
      title: "K'ho sinh hoạt thường nhật",
      image: sinhoatThumb,
      images: khoSinhHoatImages,
    },
    {
      id: 7,
      title: "Phức Tầng",
      image: phuctangThumb,
      images: phucTangImages,
    },
    {
      id: 8,
      title: "Vật liệu",
      image: vatlieuThumb,
      images: vatLieuImages,
    },
  ],

  // Tự động tạo artworks từ các hình ảnh đã import
  artworks: [
    ...Object.entries(dungcuImages).map(([path, loader], index) => ({
      id: `dungcu-${index + 1}`,
      title: path.split("/").pop().replace(".webp", ""),
      artist: "Musée Du Pin",
      year: "2024",
      image: path,
      imageLoader: loader,
      description: "Dụng cụ âm nhạc truyền thống của người Tây Nguyên",
      location: "Khu trưng bày nhạc cụ",
      tags: ["Nhạc cụ"],
    })),
    ...Object.entries(khoChanNuoiImages).map(([path, loader], index) => ({
      id: `channuoi-${index + 1}`,
      title: path.split("/").pop().replace(".webp", ""),
      artist: "Musée Du Pin",
      year: "2024",
      image: path,
      imageLoader: loader,
      description: "Vật dụng chăn nuôi truyền thống của người K'ho",
      location: "Khu trưng bày đời sống",
      tags: ["Đời sống", "Văn hóa"],
    })),
    ...Object.entries(khoDieuKhacImages).map(([path, loader], index) => ({
      id: `dieukhac-${index + 1}`,
      title: path.split("/").pop().replace(".webp", ""),
      artist: "Musée Du Pin",
      year: "2024",
      image: path,
      imageLoader: loader,
      description: "Tác phẩm điêu khắc truyền thống của người K'ho",
      location: "Khu trưng bày điêu khắc",
      tags: ["Điêu khắc"],
    })),
    ...Object.entries(khoLeHoiImages).map(([path, loader], index) => ({
      id: `lehoi-${index + 1}`,
      title: path.split("/").pop().replace(".webp", ""),
      artist: "Musée Du Pin",
      year: "2024",
      image: path,
      imageLoader: loader,
      description: "Lễ hội truyền thống của người K'ho",
      location: "Khu trưng bày lễ hội",
      tags: ["Lễ hội"],
    })),
    ...Object.entries(khoSanBanImages).map(([path, loader], index) => ({
      id: `sanban-${index + 1}`,
      title: path.split("/").pop().replace(".webp", ""),
      artist: "Musée Du Pin",
      year: "2024",
      image: path,
      imageLoader: loader,
      description: "Công cụ săn bắn và hái lượm của người K'ho",
      location: "Khu trưng bày đời sống",
      tags: ["Đời sống", "Văn hóa"],
    })),
    ...Object.entries(khoSinhHoatImages).map(([path, loader], index) => ({
      id: `sinhoat-${index + 1}`,
      title: path.split("/").pop().replace(".webp", ""),
      artist: "Musée Du Pin",
      year: "2024",
      image: path,
      imageLoader: loader,
      description: "Sinh hoạt thường nhật của người K'ho",
      location: "Khu trưng bày đời sống",
      tags: ["Đời sống", "K'ho"],
    })),
    ...Object.entries(phucTangImages).map(([path, loader], index) => ({
      id: `phuctang-${index + 1}`,
      title: path.split("/").pop().replace(".webp", ""),
      artist: "Musée Du Pin",
      year: "2024",
      image: path,
      imageLoader: loader,
      description: "Phức tầng văn hóa K'ho",
      location: "Khu trưng bày phức tầng",
      tags: ["Phức tầng"],
    })),
  ],

  highlights: [
    {
      id: 1,
      title: "Nhạc cụ truyền thống",
      category: "Nhạc cụ",
      image: dungcuThumb,
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Khám phá âm nhạc truyền thống của người Tây Nguyên qua các nhạc cụ độc đáo.",
    },
    {
      id: 2,
      title: "Điêu khắc K'ho",
      category: "Điêu khắc",
      image: dieukhacThumb,
      type: "image",
      artwork: 1,
      description:
        "Nghệ thuật điêu khắc truyền thống của người K'ho qua các tác phẩm tiêu biểu.",
    },
    {
      id: 3,
      title: "Đời sống thường nhật",
      category: "Đời sống",
      image: sinhoatThumb,
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Tìm hiểu về cuộc sống hàng ngày của người K'ho qua các vật dụng sinh hoạt.",
    },
    {
      id: 4,
      title: "Lễ hội truyền thống",
      category: "Lễ hội",
      image: lehoiThumb,
      type: "image",
      artwork: 4,
      description:
        "Khám phá các lễ hội truyền thống và ý nghĩa văn hóa của người K'ho.",
    },
    {
      id: 5,
      title: "Chăn nuôi K'ho",
      category: "Chăn nuôi",
      image: channuoiThumb,
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Tìm hiểu về hoạt động chăn nuôi và các công cụ truyền thống của người K'ho.",
    },
    {
      id: 6,
      title: "Sinh hoạt văn hóa",
      category: "Sinh hoạt",
      image: sanbanThumb,
      type: "image",
      artwork: 2,
      description:
        "Khám phá các hoạt động sinh hoạt văn hóa đặc trưng của người K'ho.",
    },
    {
      id: 7,
      title: "Vật liệu K'ho",
      category: "Vật liệu",
      image: vatlieuThumb,
      type: "image",
      artwork: 1,
      description:
        "Khám phá các chất liệu truyền thống và ý nghĩa văn hóa của người K'ho.",
    },
  ],

  relatedArtworks: [
    {
      id: 1,
      title: "Tác phẩm tương tự",
      description:
        "Khám phá các tác phẩm có phong cách, chủ đề hoặc thời kỳ tương tự",
      items: [2, 5, 8],
    },
    {
      id: 2,
      title: "Cùng nghệ nhân",
      description: "Khám phá thêm các tác phẩm của cùng nghệ nhân",
      items: [3, 7, 1],
    },
    {
      id: 3,
      title: "Có thể bạn quan tâm",
      description: "Dựa trên sở thích của bạn về danh mục này",
      items: [4, 6, 2],
    },
  ],
};

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalSlide, setModalSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [modalLoading, setModalLoading] = useState(false);
  const artworksRef = useRef(null);
  const modalContentRef = useRef(null);
  const heroImageRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Load images for the current category (only preload thumbnail, not all images)
  useEffect(() => {
    const loadCategoryImages = async () => {
      const foundCategory = collectionData.categories.find(
        (cat) => cat.id === parseInt(id)
      );

      if (foundCategory) {
        setCategory(foundCategory);

        // Load all images for the category
        const imageEntries = Object.entries(foundCategory.images);
        const loadedImageUrls = {};

        // Load all images
        for (const [path, loader] of imageEntries) {
          try {
            const module = await loader();
            loadedImageUrls[path] = module.default;
          } catch (error) {
            console.error(`Error loading image ${path}:`, error);
          }
        }

        // Get tags based on category
        const getCategoryTags = (categoryId) => {
          switch (categoryId) {
            case 1:
              return ["Nhạc cụ", "Văn hóa", "Tây Nguyên"];
            case 2:
              return ["Đời sống", "Văn hóa"];
            case 3:
              return ["Điêu khắc"];
            case 4:
              return ["Lễ hội"];
            case 5:
              return ["Đời sống", "Văn hóa"];
            case 6:
              return ["Đời sống", "K'ho"];
            case 7:
              return ["Phức tầng"];
            case 8:
              return ["Vật liệu"];
            default:
              return ["K'ho"];
          }
        };

        // Create artwork entries with loaded images
        const categoryArtworks = imageEntries.map(([path], index) => ({
          id: `${foundCategory.id}-${index + 1}`,
          title: path.split("/").pop().replace(".webp", ""),
          artist: "Musée Du Pin",
          year: "2024",
          image: loadedImageUrls[path] || null,
          imagePath: path,
          imageLoader: foundCategory.images[path],
          description: `${foundCategory.title} - ${path
            .split("/")
            .pop()
            .replace(".webp", "")}`,
          location: "Khu trưng bày",
          tags: getCategoryTags(foundCategory.id),
        }));

        setArtworks(categoryArtworks);
        setLoadedImages(loadedImageUrls);
        setIsLoaded(true);
      }
    };

    loadCategoryImages();
  }, [id]);

  // Lazy-load image for modal when needed
  const ensureImageLoaded = async (artwork, idx) => {
    if (artwork.image) return artwork.image;
    if (loadedImages[artwork.imagePath]) return loadedImages[artwork.imagePath];

    setModalLoading(true);
    try {
      const module = await artwork.imageLoader();
      const imageUrl = module.default;

      setLoadedImages((prev) => ({
        ...prev,
        [artwork.imagePath]: imageUrl,
      }));

      setArtworks((prev) => {
        const newArr = [...prev];
        newArr[idx] = { ...newArr[idx], image: imageUrl };
        return newArr;
      });

      setModalLoading(false);
      return imageUrl;
    } catch (error) {
      console.error("Error loading image:", error);
      setModalLoading(false);
      return null;
    }
  };

  // Open modal and lazy-load image if needed
  const openArtworkModal = async (artwork) => {
    const idx = artworks.findIndex((art) => art.id === artwork.id);
    setModalSlide(idx);
    setIsModalOpen(true);
    setSelectedArtwork(artwork);
    document.body.style.overflow = "hidden";
    if (!artwork.image) {
      await ensureImageLoaded(artwork, idx);
    }
  };

  // Navigate between artworks in modal (lazy-load image if needed)
  const navigateModal = async (direction) => {
    const newIndex =
      (modalSlide + direction + artworks.length) % artworks.length;
    setModalSlide(newIndex);
    setSelectedArtwork(artworks[newIndex]);
    if (!artworks[newIndex].image) {
      await ensureImageLoaded(artworks[newIndex], newIndex);
    }
  };

  // Dot navbar click (lazy-load image if needed)
  const handleDotClick = async (idx) => {
    setModalSlide(idx);
    setSelectedArtwork(artworks[idx]);
    if (!artworks[idx].image) {
      await ensureImageLoaded(artworks[idx], idx);
    }
  };

  // Close modal when pressing escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight" && isModalOpen && selectedArtwork) {
        navigateModal(1);
      } else if (e.key === "ArrowLeft" && isModalOpen && selectedArtwork) {
        navigateModal(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedArtwork]);

  // Handle mouse movement for parallax effect - only on non-mobile
  const handleMouseMove = (e) => {
    if (!artworksRef.current || isMobile) return;

    const { width, height } = artworksRef.current.getBoundingClientRect();
    const x = (e.clientX - width / 2) / (width / 2);
    const y = (e.clientY - height / 2) / (height / 2);

    setMousePosition({ x, y });
  };

  // Handle touch start for items (to improve touch experience)
  const handleTouchStart = (artwork, e) => {
    // Set a timeout to determine if it's a tap (not a scroll)
    const touchTimeout = setTimeout(() => {
      openArtworkModal(artwork);
    }, 200);

    // Store timeout ID on the element
    e.currentTarget.touchTimeout = touchTimeout;
  };

  // Handle touch end to clear timeout
  const handleTouchEnd = (e) => {
    if (e.currentTarget.touchTimeout) {
      clearTimeout(e.currentTarget.touchTimeout);
    }
  };

  // Handle touch move to cancel tap action
  const handleTouchMove = (e) => {
    if (e.currentTarget.touchTimeout) {
      clearTimeout(e.currentTarget.touchTimeout);
    }
  };

  const closeModal = () => {
    // Add closing animation class
    if (modalContentRef.current) {
      modalContentRef.current.classList.add("closing");

      setTimeout(() => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
      }, 400);
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  // Separate handler for close button to ensure it works
  const handleCloseButtonClick = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Handle hero image loaded
  const handleHeroImageLoaded = () => {
    setHeroLoaded(true);
  };

  // Download artwork image
  const handleDownload = (artwork) => {
    const link = document.createElement("a");
    link.href = artwork.image;
    link.download = `${artwork.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle swipe in modal for mobile navigation
  const handleSwipeStart = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStartModal = (e) => {
    const touch = e.touches[0];
    handleSwipeStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEndModal = (e) => {
    if (e.changedTouches.length === 0) return;

    const touch = e.changedTouches[0];
    const distX = touch.clientX - handleSwipeStart.current.x;
    const distY = touch.clientY - handleSwipeStart.current.y;
    const time = Date.now() - handleSwipeStart.current.time;

    // Check if it's a horizontal swipe
    if (Math.abs(distX) > 50 && Math.abs(distY) < 100 && time < 300) {
      // Right to left swipe
      if (distX < 0) {
        navigateModal(1);
      }
      // Left to right swipe
      else {
        navigateModal(-1);
      }
    }
  };

  if (!category) {
    return (
      <div className="category-loading">
        <div className="spinner"></div>
        <p>
          <TranslatedText>Loading category...</TranslatedText>
        </p>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Hero Section */}
      <section
        className={`category-hero ${isLoaded ? "loaded" : ""} ${
          heroLoaded ? "image-loaded" : ""
        }`}
      >
        <div className="category-hero-slides-container">
          <div className="category-hero-slide active">
            {category && (
              <img
                ref={heroImageRef}
                src={category.image}
                alt={category.title}
                className="category-hero-img"
                onLoad={handleHeroImageLoaded}
              />
            )}
          </div>
        </div>
        <div className="category-hero-overlay"></div>
        <Link to="/collection" className="category-back-button">
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
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          <span>
            <TranslatedText>Quay lại Bộ sưu tập</TranslatedText>
          </span>
        </Link>
        <div className="category-hero-content">
          <h1
            className={`category-hero-title ${
              category?.title.length > 30 ? "long-title" : ""
            }`}
          ></h1>
        </div>
        <div className="category-hero-scroll-indicator">
          <div className="category-hero-scroll-mouse">
            <div className="category-hero-scroll-wheel"></div>
          </div>
          <span>CUỘN XUỐNG</span>
        </div>
      </section>

      {/* Artworks Grid */}
      <section
        className="category-artworks-section"
        ref={artworksRef}
        onMouseMove={handleMouseMove}
      >
        <div className="category-artworks-container">
          <header className="category-artworks-header">
            <h2 className="category-artworks-title">
              <TranslatedText>
                Khám phá bộ sưu tập {category?.title}
              </TranslatedText>
            </h2>
            <p className="category-artworks-count">
              <span>{artworks.length}</span>{" "}
              <TranslatedText>tác phẩm</TranslatedText>
            </p>
          </header>

          <div className="category-artworks-grid">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`category-artwork-card ${isLoaded ? "appear" : ""}`}
                onClick={() => openArtworkModal(artwork)}
                onTouchStart={(e) => handleTouchStart(artwork, e)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                style={{
                  "--index": index,
                  animationDelay: `${100 + index * 120}ms`,
                  transform: !isMobile
                    ? `perspective(1000px) 
                       rotateX(${mousePosition.y * 5}deg) 
                       rotateY(${-mousePosition.x * 5}deg)
                       translateZ(10px)`
                    : "none",
                }}
              >
                <div className="category-artwork-image-container">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="category-artwork-image"
                    loading="lazy"
                    style={{
                      transform: !isMobile
                        ? `translateX(${mousePosition.x * -15}px) 
                           translateY(${mousePosition.y * -15}px)`
                        : "none",
                    }}
                  />
                  <div className="category-artwork-overlay">
                    <div className="artwork-quick-info">
                      <h3 className="artwork-overlay-title">{artwork.title}</h3>
                      <p className="artwork-overlay-artist">{artwork.artist}</p>
                    </div>
                  </div>
                </div>
                <div className="category-artwork-info">
                  <h3 className="category-artwork-title">{artwork.title}</h3>
                  <p className="category-artwork-artist">{artwork.artist}</p>
                  <p className="category-artwork-year">{artwork.year}</p>
                  <div className="category-artwork-tags">
                    {artwork.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="category-artwork-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artwork Modal */}
      {isModalOpen && selectedArtwork && (
        <div
          className="artwork-modal"
          onTouchStart={handleTouchStartModal}
          onTouchEnd={handleTouchEndModal}
        >
          <div className="artwork-modal-content" ref={modalContentRef}>
            <div className="artwork-modal-close-wrapper">
              <button
                type="button"
                className="artwork-modal-close"
                onClick={handleCloseButtonClick}
                aria-label="Đóng"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="artwork-modal-body">
              <div className="artwork-modal-image-container">
                <div className="artwork-image-frame">
                  {/* Left navigation button */}
                  {artworks.length > 1 && (
                    <button
                      className="artwork-modal-nav-btn left"
                      onClick={() => navigateModal(-1)}
                      aria-label="Previous image"
                    >
                      <svg
                        width="32"
                        height="32"
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
                  )}
                  {modalLoading ? (
                    <div className="artwork-modal-img-loading">
                      <div className="spinner"></div>
                      <p>
                        <TranslatedText>Đang tải ảnh...</TranslatedText>
                      </p>
                    </div>
                  ) : (
                    <img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="artwork-modal-image"
                      onError={(e) => {
                        console.error(
                          "Error loading image:",
                          selectedArtwork.image
                        );
                        e.target.src = "path/to/fallback-image.jpg"; // Add a fallback image
                      }}
                    />
                  )}
                  {/* Right navigation button */}
                  {artworks.length > 1 && (
                    <button
                      className="artwork-modal-nav-btn right"
                      onClick={() => navigateModal(1)}
                      aria-label="Next image"
                    >
                      <svg
                        width="32"
                        height="32"
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
                  )}
                </div>

                <button
                  className="cp-artwork-download-button"
                  onClick={() => handleDownload(selectedArtwork)}
                >
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>
                    <TranslatedText>Tải ảnh</TranslatedText>
                  </span>
                </button>

                {/* Dot navbar */}
                {artworks.length > 1 && (
                  <div className="artwork-modal-dot-navbar">
                    {artworks.map((_, idx) => (
                      <button
                        key={idx}
                        className={`artwork-modal-dot${
                          modalSlide === idx ? " active" : ""
                        }`}
                        onClick={() => handleDotClick(idx)}
                        aria-label={`Xem ảnh ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="artwork-modal-details">
                <div className="artwork-modal-nav">
                  <div className="modal-nav-indicator">
                    <span>{modalSlide + 1}</span>/<span>{artworks.length}</span>
                  </div>
                </div>

                <h2 className="artwork-modal-title">{selectedArtwork.title}</h2>

                <div className="artwork-modal-metadata">
                  <div className="artwork-metadata-item">
                    <div className="metadata-label">TÁC GIẢ</div>
                    <div className="metadata-value">
                      {selectedArtwork.artist}
                    </div>
                  </div>

                  <div className="artwork-metadata-item">
                    <div className="metadata-label">NĂM</div>
                    <div className="metadata-value">{selectedArtwork.year}</div>
                  </div>

                  <div className="artwork-metadata-item">
                    <div className="metadata-label">ĐỊA ĐIỂM</div>
                    <div className="metadata-value">
                      {selectedArtwork.location}
                    </div>
                  </div>
                </div>

                <div className="artwork-modal-tags">
                  {selectedArtwork.tags.map((tag, index) => (
                    <span key={index} className="artwork-modal-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="artwork-modal-description">
                  <p>{selectedArtwork.description}</p>
                </div>

                <div className="artwork-modal-location">
                  <div className="location-icon">
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
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="location-details">
                    <h4 className="location-title">Địa điểm</h4>
                    <p className="location-info">{selectedArtwork.location}</p>
                  </div>
                </div>

                <a href="/visit" className="artwork-visit-button">
                  Lập lịch thăm viếng
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
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
