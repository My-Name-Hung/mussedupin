import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "./ThePlace.css";

const ThePlaceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const autoPlayRef = useRef(null);

  // Mock data for each place
  const placeData = {
    langbiang: {
      title: "KHÔNG GIAN NGHỆ THUẬT VÀ VƯỜN TRONG BẢO TÀNG",
      title2: "Khám phá nghệ thuật và văn hóa Langbiang",
      description: "Văn hóa và nghệ thuật của vùng đất Đà Lạt.",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784839/about/khonggian.jpg",
      content: `– Không gian nghệ thuật Langbiang –\n\nNơi hội tụ tinh hoa văn hóa và nghệ thuật của vùng đất Langbiang, Đà Lạt.\n\nTại đây, du khách sẽ được chiêm ngưỡng các tác phẩm nghệ thuật độc đáo, trải nghiệm các hoạt động giao lưu văn hóa và tìm hiểu về lịch sử, con người địa phương.\n\nKhông gian mở, gần gũi với thiên nhiên, mang lại cảm giác thư thái và truyền cảm hứng sáng tạo cho mọi người.`,
      videos: [
        {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm nghệ thuật Langbiang",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      ],
    },
    exhibition: {
      title: "KHÔNG GIAN NGHỆ THUẬT VÀ VƯỜN TRONG BẢO TÀNG",
      title2: "16 phòng trưng bày chủ đề đa dạng",
      description:
        "16 phòng trưng bày với các chủ đề đa dạng, từ thiên nhiên, lịch sử đến nghệ thuật.",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784839/about/khonggian.jpg",
      content: `– 16 phòng triển lãm chủ đề –\n\nKhám phá các chủ đề từ thiên nhiên, lịch sử, nghệ thuật đến văn hóa bản địa.\n\nMỗi phòng trưng bày là một thế giới riêng, mang đến trải nghiệm độc đáo và kiến thức bổ ích cho du khách ở mọi lứa tuổi.\n\nCác hoạt động tương tác, workshop và hướng dẫn viên chuyên nghiệp luôn sẵn sàng đồng hành cùng bạn.`,
      videos: [
        {
          id: "aozcRuYVPKw",
          title: "Khám phá phòng triển lãm",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
        {
          id: "aozcRuYVPKw",
          title: "Khám phá phòng triển lãm",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      ],
    },
  };

  const currentData = placeData[id];

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % currentData.videos.length);
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentData.videos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % currentData.videos.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? currentData.videos.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  if (!currentData) {
    return <div>Không tìm thấy thông tin</div>;
  }

  return (
    <div className="theplace-detail-container">
      {/* Hero Section */}
      <div className="theplace-detail-hero">
        <img
          src={currentData.image}
          alt={currentData.title}
          className="theplace-detail-hero-img"
        />
        <div className="theplace-detail-hero-overlay" />
        <button className="back-button" onClick={() => navigate("/the-place")}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Quay lại
        </button>
        <div className="theplace-detail-hero-content">
          <h1>{currentData.title}</h1>
          <p>{currentData.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="theplace-detail-content">
        <div className="content-wrapper-theplace">
          <h2>{currentData.title2}</h2>
          <p>{currentData.content}</p>
        </div>
      </div>

      {/* Video Slideshow Section */}
      <div className="theplace-detail-slideshow">
        <div className="slideshow-container">
          <button className="slide-nav prev" onClick={prevSlide}>
            <IoIosArrowBack size={24} />
          </button>

          <div
            className="slides-wrapper"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {currentData.videos.map((video, index) => (
              <div
                key={index}
                className="slide"
                onClick={() => openVideoModal(video)}
              >
                <img src={video.thumbnail} alt={video.title} />
                <div className="play-button">
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="48"
                    height="48"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <button className="slide-nav next" onClick={nextSlide}>
            <IoIosArrowForward size={24} />
          </button>
        </div>

        <div className="slide-indicators">
          {currentData.videos.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
          <span className="slide-count">
            {currentSlide + 1} / {currentData.videos.length}
          </span>
        </div>
      </div>

      {/* Video Modal */}
      {showVideoModal && selectedVideo && (
        <div className="video-modal">
          <button className="close-modal" onClick={closeVideoModal}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
          <div className="video-container">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ThePlaceDetail;
