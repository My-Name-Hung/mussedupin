import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import "./DuPinPlus.css";

// Sample data for videos - replace with your actual content
const allVideos = [
  {
    id: 1,
    title:
      "Góc nhìn từ Bảo Tàng Thông – Một lát cắt Đà Lạt trọn vẹn trong ánh chiều tà!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aozcRuYVPKw", // Replace with actual YouTube ID
    duration: "11s",
    thumbnail:
      "https://i.ytimg.com/vi/aozcRuYVPKw/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
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
    if (e.target.classList.contains("video-modal")) {
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

      <header className="dupin-plus-header">
        <div className="header-content">
          <h1 className="page-title">Musée Du Pin +</h1>
          <p className="page-subtitle">
            <TranslatedText>
              Khám phá nội dung video độc quyền, tour ảo và các tính năng hậu
              trường
            </TranslatedText>
          </p>
        </div>
      </header>

      <section className="filter-section">
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
      </section>

      <section className="videos-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => openVideoModal(video)}
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
                {video.subtitle && (
                  <span className="video-subtitle"></span>
                )}
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
        <div className="video-modal" onClick={handleModalBackdropClick}>
          <div className="video-modal-content">
            <button className="close-modal" onClick={closeModal}>
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
            <div className="video-modal-info">
              <div className="video-modal-header">
                <h3 className="video-modal-title">{selectedVideo.title}</h3>
                {selectedVideo.subtitle && (
                  <p className="video-modal-subtitle">
                    {selectedVideo.subtitle}
                  </p>
                )}
                <span className="video-modal-category">
                  {selectedVideo.category}
                </span>
                <span className="video-modal-duration">
                  {selectedVideo.duration}
                </span>
              </div>
              <p className="video-modal-description">
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
