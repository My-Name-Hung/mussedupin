import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "./TheTasteDetail.css";

const TheTasteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const autoPlayRef = useRef(null);

  // Mock data - replace with your actual data
  const tasteData = {
    restaurant: {
      title: "Nghệ thuật vị giác",
      title2: "🍽️ Thưởng thức ẩm thực đặc sắc tại Nhà hàng Bảo Tàng Thông",
      description: "Nơi hội tụ tinh hoa ẩm thực Đà Lạt",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/image(1).png?updatedAt=1749000543046",
      content: `– Nơi hội tụ tinh hoa ẩm thực Đà Lạt –

Tại Nhà hàng Bảo Tàng Thông, chúng tôi mang đến cho bạn một trải nghiệm ẩm thực độc đáo, nơi hội tụ tinh hoa của ẩm thực Đà Lạt và thế giới.

Mỗi món ăn là một tác phẩm nghệ thuật, được chế biến từ những nguyên liệu tươi ngon nhất, kết hợp với công thức độc đáo và sự sáng tạo không ngừng của đội ngũ đầu bếp tài năng.

Với không gian sang trọng, ấm cúng và view toàn cảnh thành phố Đà Lạt, Nhà hàng Bảo Tàng Thông là điểm đến lý tưởng cho những bữa tiệc gia đình, họp mặt bạn bè hay những buổi tối lãng mạn.`,
      videos: [
        {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm ẩm thực tại Nhà hàng",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
        {
          id: "aozcRuYVPKw",
          title: "Khám phá menu đặc sắc",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      ],
    },
    cafe: {
      title: "Nghệ thuật vị giác",
      title2: "☕ Thưởng thức cà phê đặc sản tại Bảo Tàng Thông",
      description: "Nơi hương vị cà phê hòa quyện cùng không gian nghệ thuật",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/image(2).png?updatedAt=1749000540091",
      content: `– Nơi hương vị cà phê hòa quyện cùng không gian nghệ thuật –

Tại Bảo Tàng Thông, chúng tôi mang đến cho bạn một trải nghiệm cà phê độc đáo, nơi hội tụ tinh hoa của nghệ thuật pha chế và không gian sáng tạo.

Mỗi tách cà phê là một câu chuyện, được kể bằng hương vị đậm đà của hạt cà phê Đà Lạt, kết hợp với kỹ thuật rang xay và pha chế tinh tế của đội ngũ barista chuyên nghiệp.

Với không gian mở, view toàn cảnh thành phố và thiết kế độc đáo, quán cà phê Bảo Tàng Thông là điểm đến lý tưởng cho những buổi sáng thư thái hay những buổi chiều lãng mạn.`,
      videos: [
        {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm cà phê đặc sản",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
        {
          id: "aozcRuYVPKw",
          title: "Khám phá không gian cà phê",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      ],
    },
  };

  const currentData = tasteData[id];

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
    <div className="taste-detail-container">
      {/* Hero Section */}
      <div className="taste-detail-hero">
        <img
          src={currentData.image}
          alt={currentData.title}
          className="taste-detail-hero-img"
        />
        <div className="taste-detail-hero-overlay" />
        <button className="back-button" onClick={() => navigate("/the-taste")}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Quay lại
        </button>
        <div className="taste-detail-hero-content">
          <h1>{currentData.title}</h1>
          <p>{currentData.description}</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="taste-detail-content">
        <div className="content-wrapper">
          <h2>{currentData.title2}</h2>
          <p>{currentData.content}</p>
        </div>
      </div>

      {/* Video Slideshow Section */}
      <div className="taste-detail-slideshow">
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

export default TheTasteDetail;
