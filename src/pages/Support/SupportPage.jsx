import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import TranslatedText from "../../components/TranslatedText";
import { useAssets } from "../../hooks/useAssets";
import "./SupportPage.css";

import {
  FaCalendarAlt,
  FaImage,
  FaInfoCircle,
  FaMapMarkedAlt,
  FaQuestionCircle,
  FaTicketAlt,
  FaUserFriends,
} from "react-icons/fa";
import herosssVideo from "../../assets/Home/About/Hero_Abouts_Resize.mp4";

const SupportPage = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const { assets, loading, error, getAssetUrl } = useAssets();

  const sectionRefs = {
    intro: useRef(null),
    categories: useRef(null),
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  const supportCategories = [
    {
      title: "Tham quan",
      description:
        "Thông tin về lịch tham quan, hướng dẫn và quy định tham quan bảo tàng",
      icon: <FaMapMarkedAlt />,
      path: "/visitor-rules",
    },
    {
      title: "Giá vé",
      description: "Thông tin về giá vé, ưu đãi và cách đặt vé trực tuyến",
      icon: <FaTicketAlt />,
      path: "/tickets",
    },
    {
      title: "FAQ",
      description: "Các câu hỏi thường gặp và giải đáp thắc mắc",
      icon: <FaQuestionCircle />,
      path: "/visit-info#faq",
    },
    {
      title: "Bộ sưu tập",
      description: "Khám phá bộ sưu tập nghệ thuật đa dạng của bảo tàng",
      icon: <FaImage />,
      path: "/collection",
    },
    {
      title: "Sự kiện",
      description: "Lịch trình các sự kiện, triển lãm và hoạt động đặc biệt",
      icon: <FaCalendarAlt />,
      path: "/exhibitions",
    },
    {
      title: "Thành viên",
      description: "Thông tin về chương trình thành viên và đặc quyền",
      icon: <FaUserFriends />,
      path: "/membership",
    },
    {
      title: "Về chúng tôi",
      description: "Tìm hiểu thêm về Bảo tàng Du Pin và sứ mệnh của chúng tôi",
      icon: <FaInfoCircle />,
      path: "/about",
    },
  ];

  // Find the hero image by filename
  const heroAsset = assets.find((a) => a.filename === "louvre-sunset.webp");

  return (
    <div className="support-page">
      {/* Navigation Sidebar */}
      <nav className="support-nav">
        <ul>
          <li>
            <button
              className={activeSection === "intro" ? "active" : ""}
              onClick={() => scrollToSection("intro")}
            >
              Giới thiệu
            </button>
          </li>
          <li>
            <button
              className={activeSection === "categories" ? "active" : ""}
              onClick={() => scrollToSection("categories")}
            >
              Danh mục
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="support-heross" ref={sectionRefs.intro}>
        <div className="heross-video-container">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`heross-video ${isVideoLoaded ? "loaded" : ""}`}
          >
            <source src={herosssVideo} type="video/mp4" />
          </video>
          <div className="heross-overlay"></div>
        </div>
        <div className="heross-content">
          <h1 className="heross-title">
            <TranslatedText>Hỗ trợ khách tham quan</TranslatedText>
          </h1>
          <p className="heross-subtitle">
            <TranslatedText>
              Chúng tôi luôn sẵn sàng hỗ trợ để bạn có trải nghiệm tốt nhất tại
              Bảo tàng Du Pin
            </TranslatedText>
          </p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section" ref={sectionRefs.categories}>
        <div className="categories-container">
          <h2 className="section-title">Danh mục hỗ trợ</h2>
          <div className="categories-grid">
            {supportCategories.map((category, index) => (
              <div
                key={index}
                className="category-card"
                onClick={() => navigate(category.path)}
              >
                <div className="category-icon">{category.icon}</div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <div className="category-arrow">→</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero section */}
      <div className="support-hero">
        {loading && <div>Đang tải ảnh...</div>}
        {error && <div>Lỗi tải ảnh: {error}</div>}
        {heroAsset && !loading && !error && (
          <img src={getAssetUrl(heroAsset.filename)} alt="Bảo tàng Du Pin" />
        )}
        <div className="hero-overlay">
          <h1>{translations.support || "HỖ TRỢ"}</h1>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
