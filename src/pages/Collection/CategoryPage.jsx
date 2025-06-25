import React, { useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getImageUrl } from "../../utils/cloudinary";
import "./CategoryPage.css";

// Import thumbnails for each category

// Sample collection data
const collectionData = {
  categories: [
    {
      id: 1,
      title: "Dụng cụ âm nhạc Tây Nguyên",
      description: "Bộ sưu tập nhạc cụ truyền thống của các dân tộc Tây Nguyên",
      image: "Cồng Chiên.webp",
      artworks: [
        {
          id: "dungcu-1",
          title: "Cồng Chiên",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Cồng Chiên.webp",
          description: "Dụng cụ âm nhạc truyền thống của người Tây Nguyên",
          location: "Khu trưng bày nhạc cụ",
          tags: ["Nhạc cụ"],
          images: [
            "Cồng Chiên.webp",
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
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Hơi thở đại ngàn",
      description: "Bộ sưu tập vật dụng chăn nuôi truyền thống của người K'ho",
      image: "Lồng Đa Đa.webp",
      artworks: [
        {
          id: "channuoi-1",
          title: "Lồng Đa Đa",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Lồng Đa Đa.webp",
          description: "Vật dụng chăn nuôi truyền thống của người K'ho",
          location: "Khu trưng bày đời sống",
          tags: ["Đời sống", "Văn hóa"],
          images: [
            "Lồng Đa Đa.webp",
            "3 (1).webp",
            "3 (2).webp",
            "3 (3).webp",
            "3 (4).webp",
            "3.webp",
            "4 (2).webp",
          ],
        },
      ],
    },
    {
      id: 4,
      title: "Hình hài bản sắc",
      description: "Bộ sưu tập tác phẩm điêu khắc truyền thống của người K'ho",
      image: "Điêu Khắc.webp",
      artworks: [
        {
          id: "dieukhac-1",
          title: "Điêu Khắc",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Điêu Khắc.webp",
          description: "Tác phẩm điêu khắc truyền thống của người K'ho",
          location: "Khu trưng bày điêu khắc",
          tags: ["Điêu khắc"],
          images: [
            "Điêu Khắc.webp",
            "20 (1).webp",
            "20 (2).webp",
            "20 (3).webp",
            "20 (4).webp",
            "20 (5).webp",
            "21 (1).webp",
            "21 (2).webp",
            "21 (3).webp",
            "21 (4).webp",
            "21 (5).webp",
            "22 (1).webp",
            "22 (2).webp",
            "22 (3).webp",
            "22 (4).webp",
            "22 (5).webp",
            "23 (1).webp",
            "23 (2).webp",
            "23 (3).webp",
            "23 (4).webp",
            "23 (5).webp",
            "24 (1).webp",
            "24 (2).webp",
            "24 (3).webp",
            "24 (4).webp",
            "25 (1).webp",
            "25 (2).webp",
            "25 (3).webp",
            "26  (1).webp",
            "26  (2).webp",
            "26  (3).webp",
            "26  (4).webp",
            "26  (5).webp",
            "26  (6).webp",
            "27 (1).webp",
            "27 (2).webp",
            "27 (3).webp",
            "27 (4).webp",
            "27 (5).webp",
            "28 (1).webp",
            "28 (2).webp",
          ],
        },
      ],
    },
    {
      id: 3,
      title: "Lửa thiêng đêm núi",
      description: "Bộ sưu tập về lễ hội truyền thống của người K'ho",
      image: "36 (2).webp",
      artworks: [
        {
          id: "lehoi-1",
          title: "Lễ Hội",
          artist: "Musée Du Pin",
          year: "2024",
          image: "36 (2).webp",
          description: "Lễ hội truyền thống của người K'ho",
          location: "Khu trưng bày lễ hội",
          tags: ["Lễ hội"],
          images: [
            "36 (1).webp",
            "36 (2).webp",
            "18 (2).webp",
            "18 (3).webp",
            "18 (4).webp",
            "Lễ Hội.webp",
          ],
        },
      ],
    },
    {
      id: 5,
      title: "Những mùa no ấm",
      description: "Bộ sưu tập công cụ săn bắn và hái lượm của người K'ho",
      image: "Chiếc Gùi.webp",
      artworks: [
        {
          id: "sanban-1",
          title: "Chiếc Gùi",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Chiếc Gùi.webp",
          description: "Công cụ săn bắn và hái lượm của người K'ho",
          location: "Khu trưng bày đời sống",
          tags: ["Đời sống", "Văn hóa"],
          images: [
            "Chiếc Gùi.webp",
            "1 (2).webp",
            "1(3).webp",
            "1(4).webp",
            "1.webp",
            "2 (1).webp",
            "2 (3).webp",
            "2 .webp",
            "5.webp",
            "6.webp",
            "7 (1).webp",
            "7 (2).webp",
            "7 (3).webp",
            "8 (1).webp",
            "8 (2).webp",
            "8 (3).webp",
            "9 (1).webp",
            "9 (2).webp",
            "9 (3).webp",
            "10 (1).webp",
            "10 (2).webp",
            "10 (3).webp",
            "11.webp",
            "12 (1).webp",
            "12 (2).webp",
            "13 (1).webp",
            "13 (2).webp",
            "13 (3).webp",
            "14 (1).webp",
            "14 (2).webp",
            "14 (3).webp",
            "15 (1).webp",
            "15 (2).webp",
            "15 (3).webp",
            "30 (1).webp",
            "30 (2).webp",
            "37 (2).webp",
            "37 (3).webp",
            "37 (4).webp",
            "45 (1).webp",
          ],
        },
      ],
    },
    {
      id: 6,
      title: "Hơi ấm buôn làng",
      description: "Bộ sưu tập về sinh hoạt thường nhật của người K'ho",
      image: "Nồi Đất.webp",
      artworks: [
        {
          id: "sinhoat-1",
          title: "Nồi Đất",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Nồi Đất.webp",
          description: "Sinh hoạt thường nhật của người K'ho",
          location: "Khu trưng bày đời sống",
          tags: ["Đời sống", "K'ho"],
          images: [
            "Nồi Đất.webp",
            "16 (1).webp",
            "16 (2).webp",
            "19 (1).webp",
            "19 (2).webp",
            "31 (1).webp",
            "31 (2).webp",
            "32 (1).webp",
            "32 (2).webp",
            "32 (3).webp",
            "33 (1).webp",
            "33 (2).webp",
            "34 (1).webp",
            "34 (2).webp",
            "35 (1).webp",
            "35 (2).webp",
            "39.webp",
            "40.webp",
            "41.webp",
            "42.webp",
            "43 (1).webp",
            "43 (2).webp",
            "46.webp",
          ],
        },
      ],
    },
    {
      id: 7,
      title: "Phức tầng",
      description: "Bộ sưu tập phức tầng văn hóa K'ho",
      image: "Thông 2.webp",
      artworks: [
        {
          id: "phuctang-1",
          title: "Thông 2",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Thông 2.webp",
          description: "Phức tầng văn hóa K'ho",
          location: "Khu trưng bày phức tầng",
          tags: ["Phức tầng"],
          images: [
            "Thông 1.webp",
            "Thông 2.webp",
            "Thông 3.webp",
            "Thông 4.webp",
            "Cô đơn.webp",
            "Gào thét.webp",
            "Lãng du.webp",
            "Mênh mang.webp",
            "Trầm mặc.webp",
          ],
        },
      ],
    },
    {
      id: 8,
      title: "Vật liệu",
      description: "Bộ sưu tập vật liệu văn hóa K'ho",
      image: "Hoa Ban Trắng.webp",
      artworks: [
        {
          id: "vatlieu-1",
          title: "Vật liệu",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Hoa Ban Trắng.webp",
          description: "Vật liệu văn hóa K'ho",
          location: "Khu trưng bày vật liệu",
          tags: ["Vật liệu"],
          images: [
            "Hoa Ban Trắng.webp",
            "Bình yên 1.webp",
            "Bình Yên 2.webp",
            "Dâu tây.webp",
            "Hoài Niệm.webp",
            "Hoàng hôn.webp",
            "Thác đổ.webp",
            "Toa Tàu.webp",
            "Tuổi ấu thơ.webp",
            "Ống khói.webp",
          ],
        },
      ],
    },
    {
      id: 9,
      title: "Redpine Art Studio",
      description: "Không gian lưu trú nghệ thuật giữa rừng thông Đà Lạt",
      image: "luutrunghethuat.jpg",
      artworks: [
        {
          id: "redpine-1",
          title: "Redpine Art Studio",
          artist: "Musée Du Pin",
          year: "2024",
          image: "luutrunghethuat.jpg",
          description:
            "Redpine Art Studio là không gian lưu trú nghệ thuật độc đáo giữa rừng thông, nơi bạn có thể trải nghiệm nghệ thuật và thiên nhiên Đà Lạt.",
          location: "Khu lưu trú nghệ thuật",
          tags: ["Lưu trú", "Nghệ thuật", "Đà Lạt"],
          images: [
            "thechillhood.jpg",
            "thechill1.jpg",
            "thechill2.jpg",
            "whitebauhinia.jpg",
            "thememory.jpg",
            "thesunset.jpg",
            "thetrain.jpg",
          ],
        },
      ],
    },
    {
      id: 10,
      title: "Bề mặt ký ức",
      description: "Bộ sưu tập về ký ức và hoài niệm",
      image: "Lửa.webp",
      artworks: [
        {
          id: "memory-1",
          title: "Bề mặt ký ức",
          artist: "Musée Du Pin",
          year: "2024",
          image: "Lửa.webp",
          description:
            "Bề mặt ký ức là một tác phẩm nghệ thuật đa phương tiện, kết hợp giữa hình ảnh, âm thanh và không gian để tái hiện những ký ức và cảm xúc của con người.",
          location: "Khu trưng bày đặc biệt",
          tags: ["Nghệ thuật", "Ký ức", "Đa phương tiện"],
          images: [
            "Bidoup.webp",
            "bình yên 1 (1).webp",
            "bình yên 1 (2).webp",
            "bình yên 2 (1).webp",
            "bình yên 2 (2).webp",
            "bình yên 2 (3).webp",
            "chiếc tổ (1).webp",
            "chiếc tổ (2).webp",
            "Đạ Lạch.webp",
            "dâu tây.webp",
            "Dung nham.webp",
            "ga xe lửa (1).webp",
            "ga xe lửa (2).webp",
            "ga xe lửa (3).webp",
            "ga xe lửa (4).webp",
            "ga xe lửa (5).webp",
            "ga xe lửa (6).webp",
            "ký ức.webp",
            "Langbiang3.webp",
            "Lửa.webp",
            "Dung nham.webp",
            "ống khói (2).webp",
            "ống khói (3).webp",
            "ống khói (4).webp",
            "Rạn 1.webp",
            "Rạn 2.webp",
            "Rạn 3.webp",
            "thác đổ (1).webp",
            "thác đổ (2).webp",
            "thác đổ (3).webp",
            "thác đổ (4).webp",
            "thác đổ (5).webp",
            "The Sunrise.webp",
            "The Sunset 1.webp",
            "The Sunset 2.webp",
            "Thông 1-1(1).webp",
            "Thông 1-1.webp",
            "Thông 1-2.webp",
            "Thông 1-3.webp",
            "Thông 2-1.webp",
            "Thông 2-2.webp",
            "Thông 3.webp",
            "Thông bì 1.webp",
            "Thông bì 2.webp",
            "Thông cháy 1.webp",
            "Thông cháy 2.webp",
          ],
        },
      ],
    },
    {
      id: 11,
      title: "Thiên nhiên Đà Lạt",
      description: "Không gian lưu trú nghệ thuật giữa rừng thông Đà Lạt",
      image: "Gió.webp",
      artworks: [
        {
          id: "nature-1",
          title: "Thiên nhiên Đà Lạt",
          artist: "Musée Du Pin",
          year: "2025",
          image: "Gió.webp",
          description:
            "Thiên nhiên Đà Lạt là một trong những điểm đến hấp dẫn nhất trong khu vực, với những dãy núi, thác nước và rừng thông tạo nên một khung cảnh tuyệt vời.",
          location: "Thiên nhiên",
          tags: ["Thiên nhiên"],
          images: [
            "Sương sớm.webp",
            "Hoàng hôn Đà Lạt.webp",
            "Gió.webp",
            "Bình Minh.webp",
          ],
        },
      ],
    },
    {
      id: 12,
      title: "Sắc màu Tây nguyên",
      description: "Bộ sưu tập về sắc màu Tây nguyên",
      image: "Đông.webp",
      artworks: [
        {
          id: "nature-1",
          title: "Thiên nhiên Đà Lạt",
          artist: "Musée Du Pin",
          year: "2025",
          image: "Đông.webp",
          description:
            "Sắc màu Tây nguyên là một trong những điểm đến hấp dẫn nhất trong khu vực, với những dãy núi, thác nước và rừng thông tạo nên một khung cảnh tuyệt vời.",
          location: "Sắc màu",
          tags: ["Sắc màu"],
          images: ["Đông.webp", "Xuân.webp", "Thu.webp", "Hạ.webp"],
        },
      ],
    },
  ],
};

const CategoryPage = () => {
  const { category } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allModalImages, setAllModalImages] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [displayedImages, setDisplayedImages] = useState(6);
  const artworksRef = useRef(null);
  const heroImageRef = useRef(null);
  const navigate = useNavigate();

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
    // Reset state for new category
    setIsLoaded(false);
    setCategoryData(null);
    setArtworks([]);

    // Get trail data
    try {
      console.log("Loading category with ID:", category);
      console.log("Available categories:", collectionData.categories);

      const foundCategory = collectionData.categories.find(
        (cat) => cat.id === parseInt(category)
      );

      console.log("Found category:", foundCategory);

      if (foundCategory) {
        setCategoryData(foundCategory);

        // Create artwork entries with all images
        const categoryArtworks = foundCategory.artworks.map((artwork) => {
          // Get all images for this artwork
          const allImages = artwork.images.map((imageName) => ({
            id: `${artwork.id}-${imageName}`,
            title: imageName.split(".")[0],
            artist: artwork.artist,
            year: artwork.year,
            image: imageName,
            description: artwork.description,
            location: artwork.location,
            tags: artwork.tags,
          }));

          return {
            ...artwork,
            allImages: allImages,
          };
        });

        setArtworks(categoryArtworks);
        setIsLoaded(true);
        document.title = `${foundCategory.title} | Musée Du Pin`;
        console.log("Category loaded successfully");
      } else {
        // Handle case when category is not found
        console.warn(`Category with ID ${category} not found`);
        setCategoryData(null);
        setIsLoaded(true);
      }
    } catch (err) {
      console.error("Error loading category data:", err);
      setCategoryData(null);
      setIsLoaded(true);
    }
  }, [category]);

  const openModal = (imageId) => {
    // Find all images for the modal
    const allImages = [];
    Object.values(artworks).forEach((artwork) => {
      allImages.push(...artwork.allImages);
    });

    setAllModalImages(allImages);

    // Find current image index
    const imageIndex = allImages.findIndex((img) => img.id === imageId);
    setCurrentImageIndex(imageIndex >= 0 ? imageIndex : 0);

    setSelectedImageId(imageId);
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageId(null);
    document.body.style.overflow = "auto";
  };

  const navigateModal = (direction) => {
    if (allModalImages.length === 0) return;

    let newIndex = currentImageIndex + direction;

    if (newIndex < 0) {
      newIndex = allModalImages.length - 1;
    } else if (newIndex >= allModalImages.length) {
      newIndex = 0;
    }

    setCurrentImageIndex(newIndex);
    setSelectedImageId(allModalImages[newIndex].id);
  };

  const goToImage = (index) => {
    if (index >= 0 && index < allModalImages.length) {
      setCurrentImageIndex(index);
      setSelectedImageId(allModalImages[index].id);
    }
  };

  // Handle download functionality
  const handleDownload = (imageData) => {
    const link = document.createElement("a");
    link.href = getImageUrl(imageData.image);
    link.download = `${imageData.title
      .replace(/\s+/g, "-")
      .toLowerCase()}-musee-du-pin.webp`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleKeyDown = (e) => {
    if (!isModalOpen) return;

    if (e.key === "ArrowLeft") {
      navigateModal(-1);
    } else if (e.key === "ArrowRight") {
      navigateModal(1);
    } else if (e.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen, currentImageIndex, allModalImages.length]);

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
      openModal(artwork.id);
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

  // Handle hero image loaded
  const handleHeroImageLoaded = () => {
    setHeroLoaded(true);
  };

  // Handle visit button click
  const handleVisitClick = () => {
    console.log("Visit button clicked - navigating to /visit#tickets");
    closeModal();
  };

  // Handle load more images
  const handleLoadMore = () => {
    setDisplayedImages((prev) => prev + 10);
  };

  if (!isLoaded) {
    return (
      <div className="category-loading">
        <div className="spinner"></div>
        <p>Loading category...</p>
      </div>
    );
  }

  if (!categoryData) {
    return (
      <div className="category-page">
        <div className="category-not-found">
          <Link
            to="/collection#complete-collection"
            onClick={() => {
              navigate("/collection#complete-collection");
            }}
            className="category-back-button"
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
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            <span>Quay lại Bộ sưu tập</span>
          </Link>
          <div className="not-found-content">
            <h1>Không tìm thấy danh mục</h1>
            <p>Danh mục bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link to="/collection" className="btn-primary">
              Xem tất cả bộ sưu tập
            </Link>
          </div>
        </div>
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
            {categoryData && (
              <img
                ref={heroImageRef}
                src={getImageUrl(categoryData.image)}
                alt={categoryData.title}
                className="category-hero-img"
                onLoad={handleHeroImageLoaded}
              />
            )}
          </div>
        </div>
        <div className="category-hero-overlay"></div>
        <Link
          to="/collection#complete-collection"
          className="category-back-button"
          onClick={() => {
            navigate("/collection#complete-collection");
          }}
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
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          <span>Quay lại Bộ sưu tập</span>
        </Link>
        <div className="category-hero-content">
          <h1
            className={`category-hero-title ${
              categoryData?.title.length > 30 ? "long-title" : ""
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
              Khám phá bộ sưu tập {categoryData?.title}
            </h2>
            <p className="category-artworks-count">
              <span>
                {artworks.reduce(
                  (total, artwork) => total + artwork.images.length,
                  0
                )}
              </span>{" "}
              tác phẩm
            </p>
          </header>

          <div className="category-artworks-grid">
            {artworks.map((artwork) =>
              artwork.images
                .slice(0, displayedImages)
                .map((image, imageIndex) => (
                  <div
                    key={`${artwork.id}-${imageIndex}`}
                    className={`category-artwork-card ${
                      isLoaded ? "appear" : ""
                    }`}
                    onClick={() => openModal(image)}
                    onTouchStart={(e) => handleTouchStart(artwork, e)}
                    onTouchEnd={handleTouchEnd}
                    onTouchMove={handleTouchMove}
                    style={{
                      "--index": imageIndex,
                      animationDelay: `${100 + imageIndex * 120}ms`,
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
                        src={getImageUrl(image)}
                        alt={artwork.title}
                        className="category-artwork-image"
                        loading={imageIndex < 12 ? "eager" : "lazy"}
                        style={{
                          transform: !isMobile
                            ? `translateX(${mousePosition.x * -15}px) 
                           translateY(${mousePosition.y * -15}px)`
                            : "none",
                        }}
                      />
                      <div className="category-artwork-overlay">
                        <div className="artwork-quick-info">
                          <h3 className="artwork-overlay-title">
                            {artwork.title}
                          </h3>
                          <p className="artwork-overlay-artist">
                            {artwork.artist}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="category-artwork-info">
                      <h3 className="category-artwork-title">
                        {artwork.title}
                      </h3>
                      <p className="category-artwork-artist">
                        {artwork.artist}
                      </p>
                      <p className="category-artwork-year">{artwork.year}</p>
                    </div>
                  </div>
                ))
            )}
          </div>

          {/* Load More Button */}
          {artworks[0]?.images.length > displayedImages && (
            <div className="load-more-container">
              <button className="load-more-button" onClick={handleLoadMore}>
                <span>Khám phá</span>
                <IoAdd className="load-more-icon" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Modal with navigation */}
      {isModalOpen && selectedImageId && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <button className="modal-close" onClick={closeModal}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Image section with black background */}
            <div className="modal-image-section">
              {/* Navigation arrows */}
              {allModalImages.length > 1 && (
                <>
                  <button
                    className="modal-nav modal-prev"
                    onClick={() => navigateModal(-1)}
                    aria-label="Previous image"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="15,18 9,12 15,6"></polyline>
                    </svg>
                  </button>

                  <button
                    className="modal-nav modal-next"
                    onClick={() => navigateModal(1)}
                    aria-label="Next image"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <polyline points="9,18 15,12 9,6"></polyline>
                    </svg>
                  </button>
                </>
              )}

              {/* Main image */}
              <div className="modal-image-container">
                {allModalImages[currentImageIndex] && (
                  <img
                    src={getImageUrl(allModalImages[currentImageIndex].image)}
                    alt={allModalImages[currentImageIndex].title}
                    className="modal-image"
                  />
                )}
              </div>

              {/* Dots navigation */}
              {allModalImages.length > 1 && (
                <div className="modal-dots-navigation">
                  {allModalImages.map((_, index) => (
                    <button
                      key={index}
                      className={`modal-dot ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => goToImage(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}

              {/* Download button */}
              {allModalImages[currentImageIndex] && (
                <button
                  className="modal-download-btn"
                  onClick={() =>
                    handleDownload(allModalImages[currentImageIndex])
                  }
                  title="Tải ảnh"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7,10 12,15 17,10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>Tải ảnh</span>
                </button>
              )}

              {/* Counter */}
              <div className="modal-counter">
                {currentImageIndex + 1} / {allModalImages.length}
              </div>
            </div>

            {/* Info section with white background */}
            {allModalImages[currentImageIndex] && (
              <div className="modal-info-section">
                <div className="modal-title-main">
                  {allModalImages[currentImageIndex].title}
                </div>

                <div className="modal-metadata-grid">
                  <div className="modal-meta-item">
                    <div className="modal-meta-label">TÁC GIẢ</div>
                    <div className="modal-meta-value">
                      {allModalImages[currentImageIndex].artist}
                    </div>
                  </div>
                  <div className="modal-meta-item">
                    <div className="modal-meta-label">NĂM</div>
                    <div className="modal-meta-value">
                      {allModalImages[currentImageIndex].year}
                    </div>
                  </div>
                  <div className="modal-meta-item">
                    <div className="modal-meta-label">ĐỊA ĐIỂM</div>
                    <div className="modal-meta-value">
                      {allModalImages[currentImageIndex].location}
                    </div>
                  </div>
                </div>

                <div className="modal-tags-section">
                  {allModalImages[currentImageIndex].tags?.map((tag, index) => (
                    <span key={index} className="modal-tag-item">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="modal-description-text">
                  {allModalImages[currentImageIndex].description}
                </div>

                <div className="modal-location-section">
                  <svg
                    className="modal-location-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <div className="modal-location-content">
                    <div className="modal-location-title">Địa điểm</div>
                    <div className="modal-location-text">
                      {allModalImages[currentImageIndex].location}
                    </div>
                  </div>
                </div>

                <Link
                  to="/visit#tickets"
                  className="modal-visit-button"
                  onClick={handleVisitClick}
                >
                  Lập lịch thăm viếng
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
