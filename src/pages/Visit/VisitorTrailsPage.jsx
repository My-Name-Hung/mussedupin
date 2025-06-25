import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../utils/cloudinary";
import "./VisitorTrailsPage.css";

// SVG icons
const ClockIcon = () => (
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
    className="vt-clock-icon"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const AudioIcon = () => (
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
    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const ArrowRightIcon = () => (
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
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ScrollDownIcon = () => (
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
    <path d="M12 5v14"></path>
    <path d="M19 12l-7 7-7-7"></path>
  </svg>
);

// Trail data
const trailsData = [
  {
    id: 1,
    title: "DỤNG CỤ ÂM NHẠC TÂY NGUYÊN",
    description:
      "Khám phá âm nhạc truyền thống của người Tây Nguyên qua các nhạc cụ độc đáo như cồng chiêng - biểu tượng văn hóa và tín ngưỡng thiêng liêng.",
    image: "Cồng Chiên.webp",
    duration: "1H30",
    audioGuide: true,
  },
  {
    id: 2,
    title: "K'HO CHĂN NUÔI",
    description:
      "Khám phá các công cụ và phương thức chăn nuôi truyền thống của người K'ho, từ lồng đa đa đến các vật dụng chăn nuôi khác.",
    image: "Lồng Đa Đa.webp",
    duration: "1H30",
    audioGuide: true,
  },
  {
    id: 3,
    title: "K'HO LỄ HỘI",
    description:
      "Tìm hiểu về các lễ hội truyền thống và nghi thức văn hóa của người K'ho thông qua các hiện vật như Ché Ghò Sành.",
    image: "36 (2).webp",
    duration: "1H",
    audioGuide: true,
  },
  {
    id: 4,
    title: "K'HO ĐIÊU KHẮC",
    description:
      "Chiêm ngưỡng nghệ thuật điêu khắc truyền thống của người K'ho qua các tác phẩm tượng và điêu khắc tinh xảo.",
    image: "Điêu Khắc.webp",
    duration: "1H30P",
    audioGuide: true,
  },
  {
    id: 5,
    title: "K'HO SĂN BẮN & HÁI LƯỢM",
    description:
      "Khám phá các công cụ săn bắn, hái lượm và canh tác truyền thống của người K'ho.",
    image: "Chiếc Gùi.webp",
    duration: "1H",
    audioGuide: true,
  },
  {
    id: 6,
    title: "K'HO SINH HOẠT THƯỜNG NHẬT",
    description:
      "Tìm hiểu về đời sống hàng ngày của người K'ho qua các vật dụng sinh hoạt như nồi đất, bầu hồ lô.",
    image: "Nồi Đất.webp",
    duration: "1H30",
    audioGuide: true,
  },
  {
    id: 7,
    title: "PHỨC TẦNG",
    description: "Tham quan trải nghiệm thiên nhiên của đồi thông.",
    image: "Thông 2.webp",
    duration: "1H",
    audioGuide: true,
  },
  {
    id: 8,
    title: "VẬT LIỆU",
    description: "Tham quan vật liệu của người Tây Nguyên.",
    image: "Hoa Ban Trắng.webp",
    duration: "30P",
    audioGuide: true,
  },
];

const VisitorTrailsPage = () => {
  const [animatedSections, setAnimatedSections] = useState({});
  const [loadedImages, setLoadedImages] = useState({});

  // Optimize intersection observer by using useCallback
  const observerCallback = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setAnimatedSections((prev) => ({
          ...prev,
          [entry.target.id]: true,
        }));
      }
    });
  }, []);

  useEffect(() => {
    document.title = "Lộ trình tham quan | Bảo tàng Du Pin";

    // Preload hero image
    const heroImg = new Image();
    heroImg.src = getImageUrl("louvre-sunset.webp");

    // Optimize observer options
    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1, // Reduce threshold for earlier loading
      rootMargin: "50px", // Load images before they enter viewport
    });

    // Observe sections with debounced handler
    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [observerCallback]);

  // Lazy load trail images
  const handleImageLoad = useCallback((trailId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [trailId]: true,
    }));
  }, []);

  return (
    <div className="visitor-trails-page">
      {/* Hero Section - Optimize background image loading */}
      <div className="vt-hero">
        <div
          className="vt-hero-image"
          style={{
            backgroundImage: `url(${getImageUrl("louvre-sunset.webp")})`,
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        >
          <div className="vt-hero-overlay"></div>
        </div>
        <div className="vt-hero-content">
          <h1 className="vt-hero-title">LỘ TRÌNH THAM QUAN</h1>
          <p className="vt-hero-subtitle">
            Những gợi ý hữu ích trước hoặc trong chuyến thăm của bạn
          </p>
        </div>
        <div className="vt-hero-scroll-indicator">
          <div className="vt-hero-scroll-mouse">
            <div className="vt-hero-scroll-wheel"></div>
          </div>
          <span>CUỘN XUỐNG</span>
        </div>
      </div>

      {/* Description Section */}
      <section
        id="description-section"
        className={`vt-description-section animate-section ${
          animatedSections["description-section"] ? "visible" : ""
        }`}
      >
        <div className="vt-description-container">
          <div className="vt-description-text">
            <p>
              Không biết bắt đầu từ đâu? Hãy tự làm hướng dẫn viên cho mình với
              những lộ trình được thiết kế dựa trên thời gian bạn dự định dành
              cho bảo tàng và sở thích của bạn.
            </p>
            <p>
              Để chuẩn bị cho chuyến thăm, hãy nhớ kiểm tra tình trạng mở cửa
              của các phòng. Một số tác phẩm có thể không được trưng bày do
              triển lãm đặc biệt, cho mượn, bảo trì, v.v. Nếu gặp trường hợp
              này, hãy chuyển sang điểm dừng tiếp theo, vì điều này sẽ không làm
              thay đổi lộ trình tham quan của bạn.
            </p>
          </div>

          <Link to="/museum-map" className="vt-map-link">
            Xem bản đồ bảo tàng <ArrowRightIcon />
          </Link>
        </div>
      </section>

      {/* Trails Section - Optimize image loading */}
      <section
        id="trails-section"
        className={`vt-trails-section animate-section ${
          animatedSections["trails-section"] ? "visible" : ""
        }`}
      >
        <div className="vt-section-header">
          <h2 className="vt-section-title">Khám phá lộ trình tham quan</h2>
          <div className="vt-section-divider"></div>
        </div>

        <div className="vt-trails-grid">
          {trailsData.map((trail) => (
            <div
              key={trail.id}
              className={`vt-trail-item ${
                loadedImages[trail.id] ? "loaded" : ""
              }`}
            >
              <Link to={`/visitor-trails/${trail.id}`}>
                <div className="vt-trail-image-container">
                  <img
                    src={getImageUrl(trail.image)}
                    alt={trail.title}
                    className="vt-trail-image"
                    loading="lazy"
                    onLoad={() => handleImageLoad(trail.id)}
                    style={{
                      willChange: "transform",
                      transform: "translateZ(0)",
                    }}
                  />
                  <div className="vt-trail-duration">
                    <ClockIcon /> {trail.duration}
                  </div>
                </div>
                <div className="vt-trail-content">
                  <h3 className="vt-trail-title">{trail.title}</h3>
                  <p className="vt-trail-description">{trail.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default React.memo(VisitorTrailsPage); // Prevent unnecessary re-renders
