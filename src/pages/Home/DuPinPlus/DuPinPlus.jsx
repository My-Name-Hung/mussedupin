import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import "./DuPinPlus.css";

// Sample data for videos - replace with your actual content
const allVideos = [
  {
    id: 1,
    title: "Quá trình Hình thành Musée Du Pin",
    subtitle: "[Phụ đề tiếng Việt]",
    description:
      "Khám phá quá trình hình thành bảo tàng Thông - Musée Du Pin, từ ý tưởng đến thành quả hiện đại, thể hiện sự đa dạng và phong phú của nền văn hóa Đà lạt.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "30s",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Xây dựng",
  },
  {
    id: 2,
    title: "Ra mắt Nhà Mắt Thông",
    subtitle: "",
    description:
      "NHÀ MẮT THÔNG- Tinh hoa kiến trúc của thiên nhiên Giữa lòng Đà Lạt, Nhà Mắt Thông hiện lên như một khúc ca dịu dàng của thiên nhiên và sự sáng tạo. Lấy cảm hứng từ hình dáng mắt thông khô – biểu tượng của sự trường tồn và nét đẹp tự nhiên, mỗi phiên bản Nhà Mắt Thông là một câu chuyện riêng, mang đậm dấu ấn của đất trời Đà Lạt.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "1 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Ra mắt",
  },
  {
    id: 3,
    title: "Phòng trưng bày chính",
    subtitle: "",
    description:
      "Khám phá lịch sử và ý nghĩa của gian phòng lớn này cùng bộ sưu tập kiệt tác đã định hình nên lịch sử nghệ thuật.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "4 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Bộ sưu tập",
  },
  {
    id: 4,
    title: "Múa truyền thống K'ho",
    subtitle: "[Phụ đề tiếng Việt]",
    description:
      "Một buổi biểu diễn đặc sắc của nghệ thuật múa truyền thống, tạo nên cuộc đối thoại giữa nghệ thuật đương đại và cổ điển.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "7 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Biểu diễn",
  },
  {
    id: 5,
    title: "Tour ảo: Khu trưng bày dân tộc K'ho",
    subtitle: "",
    description:
      "Tham quan ảo qua một trong những bộ sưu tập hiện vật K'ho toàn diện nhất, được hướng dẫn bởi các chuyên gia.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "9 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Tour ảo",
  },
  {
    id: 6,
    title: "Hậu trường: Xưởng phục chế",
    subtitle: "",
    description:
      "Tiếp cận độc quyền với xưởng phục chế của bảo tàng, nơi các nghệ nhân lành nghề bảo tồn những báu vật vô giá cho thế hệ tương lai.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "6 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Hậu trường",
  },
  {
    id: 7,
    title: "Quá trình tạo nên triển lãm đặc biệt",
    subtitle: "",
    description:
      "Theo dõi hành trình tạo nên một triển lãm lớn từ ý tưởng đến đêm khai mạc, khám phá quá trình sáng tạo.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "12 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Hậu trường",
  },
  {
    id: 8,
    title: "Điểm nhấn bộ sưu tập K'ho",
    subtitle: "",
    description:
      "Tour tham quan qua bộ sưu tập K'ho tinh tế, khám phá kỹ thuật và câu chuyện đằng sau những kiệt tác này.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "8 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Bộ sưu tập",
  },
  {
    id: 9,
    title: "Bảo tồn điêu khắc cổ",
    subtitle: "[Phụ đề tiếng Việt]",
    description:
      "Chứng kiến quá trình bảo tồn tỉ mỉ các tác phẩm điêu khắc cổ, kết hợp kỹ thuật truyền thống với công nghệ hiện đại.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "11 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Phục chế",
  },
  {
    id: 10,
    title: "Đối thoại nghệ thuật: Hiện đại gặp truyền thống",
    subtitle: "",
    description:
      "Khám phá cuộc đối thoại thú vị giữa nghệ sĩ đương đại và các kiệt tác truyền thống trong bộ phim tài liệu đầy suy tư này.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "15 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Lịch sử nghệ thuật",
  },
  {
    id: 11,
    title: "Tour ảo: Văn hóa K'ho",
    subtitle: "",
    description:
      "Trải nghiệm sự hùng vĩ của văn hóa K'ho qua tour tham quan ảo về các tác phẩm điêu khắc và hiện vật mang tính biểu tượng.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "9 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Tour ảo",
  },
  {
    id: 12,
    title: "Âm nhạc trong bảo tàng: Chuỗi hòa nhạc truyền thống",
    subtitle: "[Phụ đề tiếng Việt]",
    description:
      "Thưởng thức các buổi biểu diễn từ chuỗi hòa nhạc của bảo tàng, nơi âm nhạc hòa quyện với các kiệt tác trong sự hài hòa hoàn hảo.",
    youtubeId: "dQw4w9WgXcQ",
    duration: "14 phút",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Biểu diễn",
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
          video.description.toLowerCase().includes(query)
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
