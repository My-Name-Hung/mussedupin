import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import "./DuPinPlus.css";

// Sample data for videos - replace with your actual content
const allVideos = [
  {
    id: 1,
    title:
      "Góc nhìn từ Bảo Tàng Thông – Một lát cắt Đà Lạt trọn vẹn trong ánh chiều tà!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aozcRuYVPKw",
    duration: "11s",
    thumbnail:
      "https://i.ytimg.com/vi/aozcRuYVPKw/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Lifestyle",
  },
  {
    id: 2,
    title:
      "Sự hòa trộn phối ghép của màu sắc, vật liệu chất chứa bên trong những giá trị của vùng đất đại ngàn.",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "mhHVg1Hlq-Y",
    duration: "22s",
    thumbnail:
      "https://i.ytimg.com/vi/mhHVg1Hlq-Y/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Kiến trúc",
  },
  {
    id: 3,
    title: "Nhà Mắt Thông- Tinh Hoa Kiến Trúc Giữa Lòng Thiên Nhiên",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "XHcN9NoTzd4",
    duration: "1:19s",
    thumbnail:
      "https://i.ytimg.com/vi/XHcN9NoTzd4/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Nhà Mắt Thông",
  },
  {
    id: 4,
    title: "Chạm vào Langbiang Art Space",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "iphjfzjG-G4",
    duration: "27s",
    thumbnail:
      "https://i.ytimg.com/vi/iphjfzjG-G4/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "MDP-AR",
  },
  {
    id: 5,
    title:
      "Mỗi giọt sơn là một phần của câu chuyện, mỗi nét cọ là một phần tâm hồn",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "vGVCScsRiK4",
    duration: "28s",
    thumbnail:
      "https://i.ytimg.com/vi/vGVCScsRiK4/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Kiến trúc",
  },
  {
    id: 6,
    title: "MỖI VẬT PHẨM – MỘT NÉT VĂN HOÁ LANGBIANG",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "y8O6GSFVedg",
    duration: "1:36s",
    thumbnail:
      "https://i.ytimg.com/vi/y8O6GSFVedg/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Văn hóa",
  },
  {
    id: 7,
    title: "LANGBIANG - KHÔNG GIAN NGHỆ THUẬT SỐNG CÙNG VĂN HOÁ",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "1c6cPAkPXto",
    duration: "32s",
    thumbnail:
      "https://i.ytimg.com/vi/1c6cPAkPXto/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Văn hóa",
  },
  {
    id: 8,
    title:
      "Sớm bình minh mờ sương trong hành trình lưu trú nghệ thuật tại Bảo Tàng Thông!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "pE4CGNBrE1M",
    duration: "16s",
    thumbnail:
      "https://i.ytimg.com/vi/pE4CGNBrE1M/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Lifestyle",
  },
  {
    id: 9,
    title: "ÂM THANH CỦA RỪNG, NHỊP ĐẬP CỦA LINH HỒN",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "pYAdoqUkVHo",
    duration: "44s",
    thumbnail:
      "https://i.ytimg.com/vi/pYAdoqUkVHo/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Acoustic Art",
  },
  {
    id: 10,
    title:
      "Chỉ cần đi chậm lại, bạn sẽ thấy nơi đây vẫn còn nguyên những bình yên tưởng chừng đã mất",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aTeAHvkXqDU",
    duration: "38s",
    thumbnail:
      "https://i.ytimg.com/vi/aTeAHvkXqDU/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Lifestyle",
  },
  {
    id: 11,
    title: "Tiếng thông xào xạc hay lời kêu cứu lặng thầm?",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "MOtrdJzefmQ",
    duration: "49s",
    thumbnail:
      "https://i.ytimg.com/vi/MOtrdJzefmQ/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Lifestyle",
  },
  {
    id: 12,
    title: "Có những câu chuyện chỉ có thể lắng nghe khi ta đủ tĩnh lặng.",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "qR2H15Q1nc8",
    duration: "43s",
    thumbnail:
      "https://i.ytimg.com/vi/qR2H15Q1nc8/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Lifestyle",
  },
  {
    id: 13,
    title: "KHÉP LẠI MDP-AR MÙA 1: HÀNH TRÌNH NGHỆ THUẬT VÌ THIÊN NHIÊN ĐÀ LẠT",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "HDOx1dRhRY8",
    duration: "40s",
    thumbnail:
      "https://i.ytimg.com/vi/HDOx1dRhRY8/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "MDP-AR",
  },
  {
    id: 14,
    title: "NHẠC CỤ DÂN TỘC",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "epnBikruPUM",
    duration: "1:24s",
    thumbnail:
      "https://i.ytimg.com/vi/epnBikruPUM/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw",
    category: "Acoustic Art",
  },
  {
    id: 15,
    title: "Bóng Cây Kơnia",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "2zuGLmyZgfU",
    duration: "1:28",
    thumbnail:
      "https://ik.imagekit.io/8u8lkoqkkm/bongcay-doc.png?updatedAt=1750002737327",
    category: "Triển lãm",
  },
  {
    id: 16,
    title: "Hồn núi",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "3hr-yyLqAy4",
    duration: "1:02",
    thumbnail:
      "https://ik.imagekit.io/8u8lkoqkkm/Honnui_Doc.jpg?updatedAt=1749269171601",
    category: "Triển lãm",
  },
  {
    id: 17,
    title: "Lửa thiêng",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "_qP_eGPzVJE",
    duration: "52s",
    thumbnail:
      "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
    category: "Triển lãm",
  },
  {
    id: 18,
    title: "Đêm thông",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "Ja3XeTu-r54",
    duration: "1:27",
    thumbnail:
      "https://ik.imagekit.io/8u8lkoqkkm/DemThong_Trong.jpg?updatedAt=1749312390412",
    category: "Triển lãm",
  },
  {
    id: 19,
    title: "Dáng sương",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "gJL4YdOunvA",
    duration: "1:01",
    thumbnail:
      "https://ik.imagekit.io/8u8lkoqkkm/Dangsuong_Doc.jpg?updatedAt=1749269171830",
    category: "Triển lãm",
  },
  {
    id: 20,
    title: "Trường ca Langbiang",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "OI6r5SW9BiM",
    duration: "2:53",
    thumbnail:
      "https://ik.imagekit.io/8u8lkoqkkm/daa23646b65e02005b4f.jpg?updatedAt=1749083704100",
    category: "Triển lãm",
  },
  {
    id: 21,
    title: "Nghệ nhân",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "1lVoCgIxUm4",
    duration: "1:16",
    thumbnail:
      "https://ik.imagekit.io/8u8lkoqkkm/Thumbnail%20Ngh%E1%BB%87%20Nh%C3%A2n%20D%E1%BB%8Dc.png?updatedAt=1750322897358",
    category: "Triển lãm",
  },
];

// Extract unique categories for the filter
const categories = [
  "Tất cả",
  ...new Set(allVideos.map((video) => video.category)),
];

const DuPinPlus = () => {
  const [videos, setVideos] = useState(allVideos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayRef = useRef(null);
  const videosRef = useRef({});
  const heroRef = useRef(null);

  const heroVideos = allVideos.filter(
    (video) => video.id >= 15 && video.id <= 21
  );

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentHeroSlide((prev) => (prev + 1) % heroVideos.length);
      }, 2500); // Reduced to 3 seconds for smoother transitions
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, heroVideos.length]);

  // Pause autoplay on hover
  useEffect(() => {
    const heroElement = heroRef.current;

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    if (heroElement) {
      heroElement.addEventListener("mouseenter", handleMouseEnter);
      heroElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mouseenter", handleMouseEnter);
        heroElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const nextHeroSlide = () => {
    setCurrentHeroSlide((prev) => (prev + 1) % heroVideos.length);
    setIsAutoPlaying(false);
  };

  const prevHeroSlide = () => {
    setCurrentHeroSlide((prev) =>
      prev === 0 ? heroVideos.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const playHeroVideo = (video) => {
    const targetVideo = videosRef.current[video.id];
    if (targetVideo) {
      targetVideo.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => {
        setSelectedVideo(video);
        setShowModal(true);
      }, 500);
    }
  };

  // Filter videos based on category and search query
  useEffect(() => {
    let filteredVideos = allVideos;

    // Apply category filter
    if (activeCategory !== "Tất cả") {
      filteredVideos = filteredVideos.filter(
        (video) => video.category === activeCategory
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredVideos = filteredVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.subtitle.toLowerCase().includes(query)
      );
    }

    setVideos(filteredVideos);
  }, [activeCategory, searchQuery]);

  // Handle video selection and modal
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  // Close modal when clicking outside the content
  const handleModalBackdropClick = (e) => {
    if (e.target.classList.contains("video-modal-dupin")) {
      closeModal();
    }
  };

  return (
    <div className="dupin-plus-page">
      <Helmet>
        <title>Bảo tàng Du Pin+ | Kho lưu trữ video</title>
        <meta
          name="description"
          content="Khám phá bộ sưu tập video, tour ảo và nội dung hậu trường từ bảo tàng."
        />
      </Helmet>

      <div className="dupinplus-hero" ref={heroRef}>
        <div className="hero-slideshow">
          {heroVideos.map((video, index) => (
            <div
              key={video.id}
              className={`hero-slide ${
                index === currentHeroSlide ? "active" : ""
              }`}
              style={{
                zIndex: index === currentHeroSlide ? 1 : 0,
                opacity: index === currentHeroSlide ? 1 : 0,
                transition: "opacity 0.8s ease-in-out",
              }}
            >
              <img
                src={video.thumbnail}
                alt={video.title}
                className="hero-image-dupin"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="hero-content-dupin">
                <div className="hero-text">
                  <span className="hero-category">{video.category}</span>
                  <h2 className="hero-title">{video.title}</h2>
                </div>
                <button
                  className="hero-play-button"
                  onClick={() => playHeroVideo(video)}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Phát video
                </button>
              </div>
            </div>
          ))}

          <button
            className="hero-nav prev"
            onClick={prevHeroSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>

          <button
            className="hero-nav next"
            onClick={nextHeroSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
            </svg>
          </button>

          <div className="hero-dots-dupin">
            {heroVideos.map((_, index) => (
              <button
                key={index}
                className={`hero-dot-dupin ${
                  index === currentHeroSlide ? "active" : ""
                }`}
                onClick={() => {
                  setCurrentHeroSlide(index);
                  setIsAutoPlaying(false);
                }}
                onMouseEnter={() => setIsAutoPlaying(false)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* <section className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm video..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z"
              />
            </svg>
          </button>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section> */}

      <section className="videos-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => openVideoModal(video)}
              ref={(el) => (videosRef.current[video.id] = el)}
            >
              <div className="video-thumbnail-container">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="video-thumbnail"
                  loading="lazy"
                />
                <div className="play-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 100 100" className="play-icon">
                      <circle cx="50" cy="50" r="45" className="play-circle" />
                      <polygon
                        points="40,30 70,50 40,70"
                        className="play-triangle"
                      />
                    </svg>
                  </div>
                </div>
                <div className="video-duration">{video.duration}</div>
              </div>
              <div className="video-info">
                <span className="video-category">{video.category}</span>
                <h3 className="video-title">{video.title}</h3>
                {video.subtitle && <span className="video-subtitle"></span>}
                <p className="video-description">{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>Không tìm thấy video</h3>
            <p>Vui lòng điều chỉnh lại tiêu chí tìm kiếm hoặc bộ lọc</p>
          </div>
        )}
      </section>

      {/* Video Modal */}
      {showModal && (
        <div className="video-modal-dupin" onClick={handleModalBackdropClick}>
          <div className="video-modal-dupin-content">
            <button className="close-modal-dupin" onClick={closeModal}>
              ×
            </button>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-dupin-info">
              <div className="video-modal-dupin-header">
                <h3 className="video-modal-dupin-title">
                  {selectedVideo.title}
                </h3>
                {selectedVideo.subtitle && (
                  <p className="video-modal-dupin-subtitle">
                    {selectedVideo.subtitle}
                  </p>
                )}
                <span className="video-modal-dupin-category">
                  {selectedVideo.category}
                </span>
                <span className="video-modal-dupin-duration">
                  {selectedVideo.duration}
                </span>
              </div>
              <p className="video-modal-dupin-description">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuPinPlus;
