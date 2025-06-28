import React, { useEffect, useRef, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
import "./TheAcousticDetail.css";

const TheAcousticDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentLang } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const autoPlayRef = useRef(null);

  // Mock data - replace with your actual data
  const acousticData = {
    "pind-amour": {
      title: "Khán phòng Pin d'amour",
      title2: "🎶 Thưởng thức âm thanh đẹp trong khán phòng Pind'amour",
      description: "Khi âm thanh trở thành một tác phẩm nghệ thuật.",
      heroImages: [
        "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour6.jpg?updatedAt=1750001274965",
        "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour5.jpg?updatedAt=1750001275246",
        "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour3.jpg?updatedAt=1750001275260",
        "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour4.jpg?updatedAt=1750001276251",
        "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour2.jpg?updatedAt=1750001276276",
        "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour1.jpg?updatedAt=1750001275424",
      ],
      content:
        currentLang === "en"
          ? `When sound becomes a work of art

At the highest roof of Musée Du Pin – amidst the Dalat sky, where light and air seem to whisper – there is a special auditorium named Pind'amour.

This is not just a venue for pure analog acoustic performances. It's an artistic space where sound returns to its purest essence – crystal clear, meticulous, pristine in every detail.

With three transparent glass walls opening to a panoramic view of the romantic Dalat city, the auditorium seems to float among the clouds. The modern sound system combined with high-end equipment delivers an authentic, crisp, and emotionally rich audio experience. No effects. No noise. Just beautiful voices, inner strength, and rustic instrument notes, resonating in a space created specifically for art.`
          : `Khi âm thanh trở thành một tác phẩm nghệ thuật

Trên đỉnh mái cao nhất của Bảo Tàng Thông – giữa lưng trời Đà Lạt, nơi ánh sáng và không khí dường như cũng biết thì thầm – có một khán phòng đặc biệt mang tên Pind'amour.

Đây không chỉ là nơi dành cho những buổi biểu diễn acoustic thuần analog. Mà là không gian nghệ thuật nơi âm thanh trở về với bản chất nguyên sơ nhất – trong trẻo, tỉ mỉ, tinh khôi đến từng chi tiết.

Với thiết kế 3 mặt kính trong suốt, mở ra toàn cảnh thành phố Đà Lạt thơ mộng, khán phòng như đang lơ lửng giữa những tầng mây. Hệ thống âm thanh hiện đại phối hợp cùng thiết bị cao cấp mang lại trải nghiệm âm thanh chân thực, sắc nét và đầy xúc cảm. Không kỹ xảo. Không ồn ào. Chỉ có giọng hát đẹp, nội lực và ngón đàn mộc mạc, ngân lên giữa một không gian được kiến tạo dành riêng cho nghệ thuật.`,
      videos: [
        {
          id: "aozcRuYVPKw",
          title: "Buổi biểu diễn tại Pind'amour",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      ],
    },
    "high-end": {
      title: "Phòng nghe High-end",
      title2: "Phòng nghe High-end",
      description: "",
      heroImages: [
        "https://ik.imagekit.io/8u8lkoqkkm/hi-end3.jpg?updatedAt=1750989597877",
        "https://ik.imagekit.io/8u8lkoqkkm/hi-end2.jpg?updatedAt=1750989597877",
        "https://ik.imagekit.io/8u8lkoqkkm/hi-end1.jpg?updatedAt=1750989597877",
      ],
      content:
        currentLang === "en"
          ? `💡 For special guests, Musée Du Pin also has a dedicated High-end listening room – where sound is reproduced with such fidelity that you feel as if you're sitting right on stage, face to face with the actual singer.

🌿 One space, two heartbeats:
– An auditorium opening to a panoramic city view.
– A private room, dedicated to those who love sound as much as they love life itself.

"We believe that beautiful sound is not just for listening – but to touch the deepest part of emotions."`
          : `💡 Với những nhân vật đặc biệt, Bảo Tàng Thông còn có riêng một phòng nghe High-end chuyên dụng – nơi âm thanh được tái hiện với độ trung thực đến mức khiến bạn có cảm giác mình đang ngồi ngay trên sân khấu, đối diện với ca sĩ thật.

🌿 Một không gian, hai nhịp đập:
– Một khán phòng mở ra toàn cảnh thành phố.
– Một căn phòng riêng tư, dành riêng cho những người yêu âm thanh như yêu chính cuộc sống này.

"Chúng tôi tin rằng, âm thanh đẹp không chỉ để nghe – mà để chạm đến nơi sâu thẳm nhất của cảm xúc."`,
      videos: [
        {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm âm thanh tại High-end Room",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      ],
    },
  };

  const currentData = acousticData[id];

  // Handle hero slideshow autoplay
  useEffect(() => {
    if (isAutoPlaying && currentData.heroImages) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % currentData.heroImages.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentData.heroImages]);

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
    <div className="acoustic-detail-container">
      {/* Hero Section */}
      <div className="acoustic-detail-hero">
        <div className="hero-slideshow">
          {currentData.heroImages?.map((image, index) => (
            <div
              key={index}
              className={`hero-slide ${index === currentSlide ? "active" : ""}`}
            >
              <img
                src={image}
                alt={`${currentData.title} - Slide ${index + 1}`}
                className="acoustic-detail-hero-img"
              />
            </div>
          ))}

          <div className="hero-dots">
            {currentData.heroImages?.map((_, index) => (
              <button
                key={index}
                className={`hero-dot ${index === currentSlide ? "active" : ""}`}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                }}
              />
            ))}
          </div>
        </div>

        <div className="acoustic-detail-hero-overlay" />
        <button
          className="back-button"
          onClick={() => navigate("/the-acoustic")}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
          Quay lại
        </button>
      </div>

      {/* Content Section */}
      <div className="acoustic-detail-content">
        <div className="content-wrapper-acoustic">
          <h2>{currentData.title2}</h2>
          <p>{currentData.content}</p>
        </div>
      </div>

      {/* Video Slideshow Section */}
      <div className="acoustic-detail-slideshow">
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

export default TheAcousticDetail;
