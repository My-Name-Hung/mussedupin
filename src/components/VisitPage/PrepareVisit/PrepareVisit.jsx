import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TranslatedText from "../../TranslatedText";
import "./PrepareVisit.css";

// Hero section background image
import modernImg from "../../../assets/home/Collections/Bauholo_cards.webp";
import luxuryImg from "../../../assets/home/Collections/congchien_cards.webp";
import budgetImg from "../../../assets/home/Collections/DanT'rung_cards.webp";
import traditionalImg from "../../../assets/home/Collections/Gui_cards.webp";
import heroImage from "../../../assets/home/Hero/louvre-sunset.webp";

// Import icons from react-icons
import {
  FaBaby,
  FaCar,
  FaClock,
  FaHome,
  FaInfo,
  FaQuestion,
  FaSearch,
  FaTicketAlt,
  FaUsers,
} from "react-icons/fa";

// Import optimized images for amenities
import toiletsImg from "../../../assets/home/Collections/Bauholo_cards.webp";
import parkingImg from "../../../assets/home/Collections/congchien_cards.webp";
import lostFoundImg from "../../../assets/home/Collections/DanT'rung_cards.webp";
import babySpaceImg from "../../../assets/home/Collections/Gui_cards.webp";
import informationDeskImg from "../../../assets/home/Collections/Lehoi_cards.webp";
import cloakroomImg from "../../../assets/home/Collections/LongDaDa_cards.webp";
import equipmentImg from "../../../assets/home/Collections/noidat_cards.webp";
import wifiImg from "../../../assets/home/Collections/phunu_cards.webp";

const PrepareVisit = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hours");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [showHomestayDetails, setShowHomestayDetails] = useState(false);
  const [showBookingSidebar, setShowBookingSidebar] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });
  const [bookingErrors, setBookingErrors] = useState({});
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const sectionRefs = {
    hours: useRef(null),
    tickets: useRef(null),
    membership: useRef(null),
    amenities: useRef(null),
    homestay: useRef(null),
    faq: useRef(null),
  };

  const navRef = useRef(null);
  const heroRef = useRef(null);
  const horizontalNavRef = useRef(null);
  const lastScrollTop = useRef(0);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle scroll events for navigation
  const handleScroll = useCallback(() => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrollingDown(st > lastScrollTop.current && st > 200);
    lastScrollTop.current = st <= 0 ? 0 : st;

    if (heroRef.current && navRef.current) {
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      const navHeight = navRef.current.offsetHeight;

      if (heroBottom <= navHeight) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
    }

    // Check if horizontal nav is scrolled to end for visual indicator
    if (horizontalNavRef.current) {
      const isScrolledToEnd = horizontalNavRef.current.scrollLeft > 0;
      setNavScrolled(isScrolledToEnd);
    }

    // Determine which section is in view
    let currentSection = "hours";
    const scrollPosition = window.scrollY + (isMobile ? 80 : 100);

    // Check sections in reverse order (from bottom to top)
    if (
      sectionRefs.faq.current &&
      scrollPosition >=
        sectionRefs.faq.current.offsetTop - (isMobile ? 120 : 150)
    ) {
      currentSection = "faq";
    } else if (
      sectionRefs.homestay.current &&
      scrollPosition >=
        sectionRefs.homestay.current.offsetTop - (isMobile ? 120 : 150)
    ) {
      currentSection = "homestay";
    } else if (
      sectionRefs.amenities.current &&
      scrollPosition >=
        sectionRefs.amenities.current.offsetTop - (isMobile ? 120 : 150)
    ) {
      currentSection = "amenities";
    } else if (
      sectionRefs.membership.current &&
      scrollPosition >=
        sectionRefs.membership.current.offsetTop - (isMobile ? 120 : 150)
    ) {
      currentSection = "membership";
    } else if (
      sectionRefs.tickets.current &&
      scrollPosition >=
        sectionRefs.tickets.current.offsetTop - (isMobile ? 120 : 150)
    ) {
      currentSection = "tickets";
    }

    setActiveSection(currentSection);
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Handle hash links when component mounts
  useEffect(() => {
    // Get the hash from the URL
    const hash = location.hash.replace("#", "");

    // If there's a hash and it corresponds to one of our sections, set it as active
    if (hash && sectionRefs[hash]) {
      setActiveSection(hash);

      // Add a small delay to ensure DOM is fully loaded
      setTimeout(() => {
        // Scroll to the section
        sectionRefs[hash].current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location]);

  // Handle touch events for horizontal nav scrolling on mobile
  const handleNavTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleNavTouchMove = (e) => {
    if (!horizontalNavRef.current) return;

    const touchX = e.touches[0].clientX;
    const diff = touchStartX - touchX;

    // Smooth scroll for better touch experience
    horizontalNavRef.current.scrollLeft += diff / 1.5;
    setTouchStartX(touchX);
  };

  // Function to create ripple effect on touch
  const createRippleEffect = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple-circle";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 800);
  };

  // Scroll to section with URL hash update
  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const section = sectionRefs[sectionId];
    if (section && section.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  // Add these museum info values

  // Current day and time display
  const getCurrentDayTimeInfo = () => {
    // Open all days of the week until 9pm
    const statusText = "open today from 7:00 AM to 21:00 PM";
    const statusClass = "open";

    return { statusText, statusClass };
  };

  const { statusText, statusClass } = getCurrentDayTimeInfo();

  // Amenities data
  const amenitiesData = [
    {
      id: "information-desk",
      title: "Quầy thông tin",
      description:
        "Hai quầy thông tin, nơi du khách có thể hỏi đáp với nhân viên và nhận bản đồ bảo tàng. Tài liệu hướng dẫn bằng 8 ngôn ngữ có sẵn dưới Tháp.",
      image: informationDeskImg,
      icon: "info",
      details: "Nhân viên đa ngôn ngữ làm việc từ 9:00 đến 19:00 hàng ngày.",
    },
    {
      id: "cloakroom",
      title: "Phòng gửi đồ",
      description:
        "Tủ khóa tự phục vụ miễn phí dưới Tháp. Khách tham quan nên sử dụng tủ khóa tại lối vào. Tất cả các vật dụng gửi trong tủ khóa phải được lấy lại trong cùng ngày.",
      image: cloakroomImg,
      icon: "hanger",
      details:
        "Gửi miễn phí cho túi có kích thước tối đa 55×35×20 cm. Không nhận vật dụng lớn hơn.",
    },
    {
      id: "equipment",
      title: "Cho mượn thiết bị",
      description:
        "Gậy chống, ghế xếp, xe đẩy trẻ em, địu em bé, ghế đa năng có bánh xe và xe lăn được cung cấp miễn phí tại khu vực tiếp đón khách dưới Tháp.",
      image: equipmentImg,
      icon: "stroller",
      details: "Liên hệ quầy hỗ trợ để biết thêm thông tin",
    },
    {
      id: "wifi",
      title: "Wi-Fi Miễn phí",
      description:
        "Mạng 'Musée Du Pin' có sẵn dưới Tháp và trong các phòng trưng bày. Kết nối Wi-Fi miễn phí có giới hạn một giờ và có thể được gia hạn nhiều lần theo nhu cầu.",
      image: wifiImg,
      icon: "wifi",
      details: "Tốc độ kết nối: 50 Mbps",
    },
    {
      id: "toilets",
      title: "Nhà vệ sinh",
      description:
        "Nhà vệ sinh có thể được tìm thấy tại khu vực đón tiếp dưới Tháp và khắp bảo tàng. Có bàn thay tã cho em bé.",
      image: toiletsImg,
      icon: "toilet",
      details: "Tất cả nhà vệ sinh đều tiếp cận được cho người khuyết tật",
    },
    {
      id: "car-park",
      title: "Bãi đậu xe",
      description:
        "Bãi đậu xe ngầm nằm tại số 1 Đại lộ Général Lemonnier, từ đó bạn có thể vào bảo tàng qua lối vào Carrousel. Mở cửa 7 ngày một tuần từ 7:00 đến 23:00.",
      image: parkingImg,
      icon: "parking",
      details:
        "Khách tham quan khuyết tật được hưởng giá đậu xe ưu đãi. Giá này có thể được thương lượng tại quầy thanh toán trước khi trả tiền.",
    },
    {
      id: "lost-found",
      title: "Đồ thất lạc",
      description:
        "Bị mất đồ? Nếu bạn vẫn còn trong bảo tàng, hãy đến Quầy Hỗ trợ dưới Tháp và nhân viên sẽ giúp bạn.",
      image: lostFoundImg,
      icon: "help",
      details:
        "Đối với đồ vật tìm thấy sau chuyến thăm, hãy điền vào mẫu báo cáo trên trang web của chúng tôi",
    },
    {
      id: "baby-space",
      title: "Khu vực cho em bé",
      description:
        "Studio – khu vực đặc biệt được thiết kế dành cho gia đình, nằm ở tầng trệt của cánh Richelieu – có khu vực dành cho em bé được trang bị máy hâm sữa, lò vi sóng và ghế cho con bú.",
      image: babySpaceImg,
      icon: "baby",
      details: "Mọi thứ bạn cần cho sự thoải mái và chăm sóc em bé",
    },
  ];

  // Helper function to render icons for amenities
  const renderIcon = (icon) => {
    const commonAttributes = {
      width: isMobile ? "30" : "32",
      height: isMobile ? "30" : "32",
      fill: "none",
      stroke: "#00d1b2",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    switch (icon) {
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case "hanger":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
            <path d="M12 8v3l-8 9h16l-8-9V8"></path>
          </svg>
        );
      case "stroller":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <circle cx="8" cy="18" r="2"></circle>
            <circle cx="16" cy="18" r="2"></circle>
            <path d="M8 18h8l4-12H8"></path>
            <path d="M6 10h12"></path>
          </svg>
        );
      case "wifi":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        );
      case "toilet":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M6 4h12v4H6z"></path>
            <path d="M6 8h12v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"></path>
            <path d="M10 8v8"></path>
            <path d="M14 8v8"></path>
          </svg>
        );
      case "parking":
        return <FaCar size={isMobile ? 28 : 32} color="currentColor" />;
      case "help":
        return <FaSearch size={isMobile ? 28 : 32} color="currentColor" />;
      case "baby":
        return <FaBaby size={isMobile ? 28 : 32} color="currentColor" />;
      default:
        return null;
    }
  };

  // Render Hero Section with artistic elements
  const renderHero = () => (
    <div className="prepare-hero" ref={heroRef}>
      <div className="prepare-hero-image-container">
        <img
          src={heroImage}
          alt="Musée Du Pin"
          className="prepare-hero-image"
        />
        <div className="prepare-hero-overlay"></div>
      </div>

      <div className="prepare-hero-content">
        <h1 className="prepare-hero-title">
          <TranslatedText>HƯỚNG DẪN THAM QUAN</TranslatedText>
        </h1>
        <p className="prepare-hero-subtitle">
          <TranslatedText>
            Tất cả những điều bạn cần biết trước khi đến bảo tàng
          </TranslatedText>
        </p>

        <div className="prepare-hero-cta">
          <Link to="/tickets" className="prepare-hero-button">
            <TranslatedText>Đặt vé</TranslatedText>
          </Link>
        </div>
      </div>

      {/* Mobile scroll indicator */}
      {isMobile && (
        <div
          className="mobile-scroll-indicator"
          onClick={() =>
            window.scrollTo({
              top: window.innerHeight * 0.8,
              behavior: "smooth",
            })
          }
        ></div>
      )}
    </div>
  );

  // Render Navigation Bar
  const renderNavigationBar = () => (
    <div
      className={`prepare-nav-container ${isNavSticky ? "sticky" : ""} ${
        navScrolled ? "scrolled-right" : ""
      }`}
      ref={(el) => {
        navRef.current = el;
        horizontalNavRef.current = el;
      }}
      onTouchStart={handleNavTouchStart}
      onTouchMove={handleNavTouchMove}
    >
      <div className="prepare-nav">
        <ul className="prepare-nav-list">
          <li
            className={`prepare-nav-item ${
              activeSection === "hours" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("hours")}
              className="prepare-nav-button"
            >
              <span className="prepare-nav-icon">
                <FaClock />
              </span>
              <TranslatedText>Giờ mở cửa</TranslatedText>
            </button>
            <span className="prepare-nav-indicator"></span>
          </li>
          <li
            className={`prepare-nav-item ${
              activeSection === "tickets" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("tickets")}
              className="prepare-nav-button"
            >
              <span className="prepare-nav-icon">
                <FaTicketAlt />
              </span>
              <TranslatedText>Vé</TranslatedText>
            </button>
            <span className="prepare-nav-indicator"></span>
          </li>
          <li
            className={`prepare-nav-item ${
              activeSection === "membership" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("membership")}
              className="prepare-nav-button"
            >
              <span className="prepare-nav-icon">
                <FaUsers />
              </span>
              <TranslatedText>Thành viên</TranslatedText>
            </button>
            <span className="prepare-nav-indicator"></span>
          </li>
          <li
            className={`prepare-nav-item ${
              activeSection === "amenities" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("amenities")}
              className="prepare-nav-button"
            >
              <span className="prepare-nav-icon">
                <FaInfo />
              </span>
              <TranslatedText>Tiện ích</TranslatedText>
            </button>
            <span className="prepare-nav-indicator"></span>
          </li>
          <li
            className={`prepare-nav-item ${
              activeSection === "homestay" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("homestay")}
              className="prepare-nav-button"
            >
              <span className="prepare-nav-icon">
                <FaHome />
              </span>
              <TranslatedText>Lưu trú</TranslatedText>
            </button>
            <span className="prepare-nav-indicator"></span>
          </li>
          <li
            className={`prepare-nav-item ${
              activeSection === "faq" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("faq")}
              className="prepare-nav-button"
            >
              <span className="prepare-nav-icon">
                <FaQuestion />
              </span>
              <TranslatedText>Hỏi đáp</TranslatedText>
            </button>
            <span className="prepare-nav-indicator"></span>
          </li>
        </ul>
      </div>
    </div>
  );

  // Render mobile bottom navigation
  const renderMobileNavigation = () => {
    if (!isMobile) return null;

    return (
      <nav
        className={`mobile-bottom-nav fixed-mobile-element ${
          isScrollingDown ? "hidden" : ""
        }`}
      >
        <ul className="mobile-nav-list">
          <li
            className={`mobile-button-item ${
              activeSection === "hours" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("hours");
              }}
            >
              <span className="mobile-nav-icon">
                <FaClock />
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Giờ</TranslatedText>
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "tickets" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("tickets");
              }}
            >
              <span className="mobile-nav-icon">
                <FaTicketAlt />
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Vé</TranslatedText>
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "membership" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("membership");
              }}
            >
              <span className="mobile-nav-icon">
                <FaUsers />
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Thành viên</TranslatedText>
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "amenities" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("amenities");
              }}
            >
              <span className="mobile-nav-icon">
                <FaInfo />
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Dịch vụ</TranslatedText>
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "homestay" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("homestay");
              }}
            >
              <span className="mobile-nav-icon">
                <FaHome />
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Lưu trú</TranslatedText>
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "faq" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("faq");
              }}
            >
              <span className="mobile-nav-icon">
                <FaQuestion />
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Hỏi đáp</TranslatedText>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Render Hours Section
  const renderHoursSection = () => (
    <section className="hours-section" id="hours" ref={sectionRefs.hours}>
      <div className="prepare-section-container">
        <div className="prepare-section-header">
          <div className="section-badge"></div>
          <h2 className="prepare-section-title">
            <TranslatedText>GIỜ MỞ CỬA</TranslatedText>
            <span className="title-underline"></span>
          </h2>
          <p className="prepare-section-description">
            <TranslatedText>
              Lên kế hoạch cho chuyến tham quan với lịch trình hiện tại của
              chúng tôi
            </TranslatedText>
          </p>
        </div>

        <div className="museum-info-wrapper">
          <div className="museum-info-image">
            <img src={heroImage} alt="Musée Du Pin" />
            {isMobile && <div className="info-image-overlay"></div>}
          </div>

          <div className="museum-info-content">
            <div className="museum-status-bar">
              <div className={`museum-status ${statusClass}`}>
                <span className="status-dot"></span>
                <TranslatedText>Bảo tàng {statusText}</TranslatedText>
              </div>
            </div>

            <div className="museum-hours">
              <div className={`hours-row ${isMobile ? "touch-friendly" : ""}`}>
                <div className="hours-time">
                  <span>
                    <TranslatedText>7:00 → 21:00</TranslatedText>
                  </span>
                </div>
                <div className="hours-days">
                  <span>
                    <TranslatedText>Thứ Hai đến Chủ Nhật</TranslatedText>
                  </span>
                </div>
              </div>
            </div>

            <div className="museum-notes">
              <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
                <div className="note-label">
                  <TranslatedText>Giờ vào cuối:</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>1 tiếng trước giờ đóng cửa</TranslatedText>
                </div>
              </div>

              <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
                <div className="note-label">
                  <TranslatedText>Dọn dẹp phòng:</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>30 phút trước giờ đóng cửa</TranslatedText>
                </div>
              </div>

              <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
                <div className="note-label">
                  <TranslatedText>Ngày lễ:</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>
                    Musée Du Pin đóng cửa vào ngày 1 tháng 1, 1 tháng 5 và 25
                    tháng 12. Bảo tàng vẫn mở cửa vào các ngày lễ khác trừ khi
                    rơi vào thứ Ba, ngày nghỉ định kỳ của bảo tàng.
                  </TranslatedText>
                </div>
              </div>

              <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
                <div className="note-label">
                  <TranslatedText>Sân Carrée</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>đóng cửa lúc 23:00.</TranslatedText>
                </div>
              </div>

              <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
                <div className="note-label">
                  <TranslatedText>Sân Carrée</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>
                    sẽ đóng cửa từ ngày 7 tháng 4 đến 25 tháng 6 năm 2025.
                  </TranslatedText>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Render Tickets Section
  const renderTicketsSection = () => (
    <section className="tickets-section" id="tickets" ref={sectionRefs.tickets}>
      <div className="prepare-section-container">
        <div className="prepare-section-header">
          <h2 className="prepare-section-title">
            <TranslatedText>VÉ & GIÁ</TranslatedText>
            <span className="title-underline"></span>
          </h2>
          <p className="prepare-section-description">
            <TranslatedText>
              Chọn loại vé phù hợp cho trải nghiệm tham quan bảo tàng của bạn
            </TranslatedText>
          </p>
        </div>

        <div className="tickets-container">
          <div className="ticket-card featured">
            <div className="ticket-header">
              <h3 className="ticket-title">
                <TranslatedText>Vé phổ thông</TranslatedText>
              </h3>
              <div className="ticket-price">
                <span className="price-value">€15</span>
              </div>
            </div>
            <div className="ticket-content">
              <ul className="ticket-features">
                <li>
                  <TranslatedText>
                    Truy cập tất cả bộ sưu tập thường trực
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>Hướng dẫn âm thanh (thêm €5)</TranslatedText>
                </li>
                <li>
                  <TranslatedText>Có giá trị trong một ngày</TranslatedText>
                </li>
              </ul>
              <div className="ticket-notes">
                <TranslatedText>
                  Miễn phí cho khách dưới 18 tuổi và cư dân EU dưới 26 tuổi
                </TranslatedText>
              </div>
              <button className="ticket-button">
                <TranslatedText>Đặt ngay</TranslatedText>
              </button>
            </div>
          </div>

          <div className="ticket-card">
            <div className="ticket-header">
              <h3 className="ticket-title">
                <TranslatedText>Vé triển lãm</TranslatedText>
              </h3>
              <div className="ticket-price">
                <span className="price-value">€25</span>
              </div>
            </div>
            <div className="ticket-content">
              <ul className="ticket-features">
                <li>
                  <TranslatedText>
                    Truy cập tất cả bộ sưu tập thường trực
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>
                    Bao gồm tất cả triển lãm tạm thời
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>Bao gồm hướng dẫn âm thanh</TranslatedText>
                </li>
                <li>
                  <TranslatedText>Có giá trị trong một ngày</TranslatedText>
                </li>
              </ul>
              <button className="ticket-button">
                <TranslatedText>Đặt ngay</TranslatedText>
              </button>
            </div>
          </div>

          <div className="ticket-card">
            <div className="ticket-header">
              <h3 className="ticket-title">
                <TranslatedText>Vé thông hành</TranslatedText>
              </h3>
              <div className="ticket-price">
                <span className="price-value">€45</span>
              </div>
            </div>
            <div className="ticket-content">
              <ul className="ticket-features">
                <li>
                  <TranslatedText>
                    Truy cập không giới hạn trong 3 ngày liên tiếp
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>
                    Bao gồm tất cả bộ sưu tập và triển lãm
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>
                    Ưu tiên vào cửa không cần xếp hàng
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>
                    Giảm 10% tại cửa hàng bảo tàng
                  </TranslatedText>
                </li>
              </ul>
              <button className="ticket-button">
                <TranslatedText>Đặt ngay</TranslatedText>
              </button>
            </div>
          </div>
        </div>

        <div className="tickets-info">
          <div className="info-block">
            <h4 className="info-title">
              <TranslatedText>Miễn phí vào cửa</TranslatedText>
            </h4>
            <p className="info-text">
              <TranslatedText>
                Miễn phí vào cửa cho khách dưới 18 tuổi, cư dân EU dưới 26 tuổi,
                người khuyết tật và một người đi kèm, và cho tất cả mọi người
                vào thứ Sáu đầu tiên của mỗi tháng.
              </TranslatedText>
            </p>
          </div>
          <div className="info-block">
            <h4 className="info-title">
              <TranslatedText>Tham quan theo nhóm</TranslatedText>
            </h4>
            <p className="info-text">
              <TranslatedText>
                Có giá đặc biệt cho nhóm từ 10 người trở lên. Vui lòng liên hệ
                bộ phận đặt chỗ nhóm ít nhất hai tuần trước chuyến thăm.
              </TranslatedText>
            </p>
          </div>
        </div>
      </div>
    </section>
  );

  // Render Membership Section
  const renderMembershipSection = () => (
    <section
      className="membership-section"
      id="membership"
      ref={sectionRefs.membership}
    >
      <div className="prepare-section-container">
        <div className="prepare-section-header">
          <h2 className="prepare-section-title">
            <TranslatedText>THÀNH VIÊN</TranslatedText>
            <span className="title-underline"></span>
          </h2>
          <p className="prepare-section-description">
            <TranslatedText>
              Trở thành thành viên và tận hưởng các đặc quyền cùng quyền truy
              cập không giới hạn
            </TranslatedText>
          </p>
        </div>

        <div className="membership-info">
          <h3 className="membership-heading">
            <TranslatedText>
              Trở thành thành viên của Hội Bạn bè Musée Du Pin
            </TranslatedText>
          </h3>
          <p className="membership-description">
            <TranslatedText>
              Hội Bạn bè Musée Du Pin cung cấp nhiều chương trình thành viên
              khác nhau (thanh niên, cá nhân và cặp đôi, gia đình), với mức giá
              từ €15 đến €120.
            </TranslatedText>
          </p>

          <div className="membership-cards">
            <div className="membership-card">
              <div className="membership-card-header">
                <h4 className="membership-card-title">
                  <TranslatedText>Thành viên thanh niên</TranslatedText>
                </h4>
                <div className="membership-card-price">
                  <span className="price-value">€15</span>
                  <span className="price-period">/năm</span>
                </div>
              </div>
              <div className="membership-card-content">
                <ul className="membership-benefits">
                  <li>
                    <TranslatedText>
                      Dành cho khách tham quan dưới 26 tuổi
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Truy cập không giới hạn vào bộ sưu tập
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Sự kiện đặc biệt cho thành viên
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Giảm 10% tại cửa hàng bảo tàng
                    </TranslatedText>
                  </li>
                </ul>
                <button className="membership-card-button">
                  <TranslatedText>Tham gia ngay</TranslatedText>
                </button>
              </div>
            </div>

            <div className="membership-card featured">
              <div className="membership-card-header">
                <div className="card-badge">
                  <TranslatedText>Phổ biến nhất</TranslatedText>
                </div>
                <h4 className="membership-card-title">
                  <TranslatedText>Thành viên cá nhân</TranslatedText>
                </h4>
                <div className="membership-card-price">
                  <span className="price-value">€60</span>
                  <span className="price-period">/năm</span>
                </div>
              </div>
              <div className="membership-card-content">
                <ul className="membership-benefits">
                  <li>
                    <TranslatedText>
                      Truy cập không giới hạn cho một người
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Vào cửa nhanh cho các triển lãm
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Tham gia sự kiện dành riêng cho thành viên
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Giảm 15% tại cửa hàng bảo tàng
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>Đăng ký tạp chí hàng quý</TranslatedText>
                  </li>
                </ul>
                <button className="membership-card-button featured">
                  <TranslatedText>Tham gia ngay</TranslatedText>
                </button>
              </div>
            </div>

            <div className="membership-card">
              <div className="membership-card-header">
                <h4 className="membership-card-title">
                  <TranslatedText>Thành viên gia đình</TranslatedText>
                </h4>
                <div className="membership-card-price">
                  <span className="price-value">€120</span>
                  <span className="price-period">/năm</span>
                </div>
              </div>
              <div className="membership-card-content">
                <ul className="membership-benefits">
                  <li>
                    <TranslatedText>
                      Áp dụng cho 2 người lớn và tối đa 4 trẻ em
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Truy cập không giới hạn cho cả gia đình
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Quyền tham gia các hội thảo gia đình đặc biệt
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Giảm 20% cho các chương trình giáo dục
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Giảm 15% tại cửa hàng bảo tàng
                    </TranslatedText>
                  </li>
                </ul>
                <button className="membership-card-button">
                  <TranslatedText>Tham gia ngay</TranslatedText>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // Enhanced Amenities Section
  const renderAmenitiesSection = () => (
    <section
      className="prepare-section amenities-section"
      id="amenities"
      ref={sectionRefs.amenities}
      style={{
        background: "linear-gradient(135deg, #0f0f0f, #151515, #1a1a1a)",
        color: "#fff",
        position: "relative",
        padding: isMobile ? "80px 0 60px" : "150px 0 120px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: isMobile ? "30px" : "60px",
          left: isMobile ? "30px" : "60px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: isMobile ? "0.8rem" : "1rem",
          fontWeight: "600",
          color: "#ff4081",
          letterSpacing: "2px",
          textTransform: "uppercase",
          zIndex: "2",
          textShadow: "0 2px 10px rgba(255,64,129,0.2)",
        }}
      >
        AMENITIES & SERVICES
      </div>
      <div
        className="prepare-section-container"
        style={{ position: "relative", zIndex: "2" }}
      >
        <div
          className="prepare-section-header"
          style={{
            textAlign: isMobile ? "center" : "left",
            maxWidth: "900px",
            marginBottom: isMobile ? "50px" : "80px",
          }}
        >
          <h2
            className="prepare-section-title"
            style={{
              color: "#ffffff",
              fontSize: isMobile ? "2rem" : "3.5rem",
              fontWeight: "700",
              marginBottom: isMobile ? "20px" : "30px",
              position: "relative",
              paddingBottom: "20px",
              textShadow: "0 2px 15px rgba(0,0,0,0.3)",
              transition: "transform 0.5s ease",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            <TranslatedText>Comfort and convenience</TranslatedText>
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: isMobile ? "50%" : "0",
                transform: isMobile ? "translateX(-50%)" : "none",
                width: "100px",
                height: "4px",
                background:
                  "linear-gradient(to right, #00d1b2, rgba(0,209,178,0.5))",
                borderRadius: "4px",
                transition: "width 0.3s ease",
              }}
              className="title-underline"
            ></span>
          </h2>
          <p
            className="prepare-section-description"
            style={{
              color: "#cccccc",
              fontSize: isMobile ? "1rem" : "1.3rem",
              lineHeight: "1.8",
              fontWeight: "300",
              maxWidth: "800px",
              opacity: "0.9",
              transition: "opacity 0.5s ease",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              marginTop: "40px",
              borderLeft: "3px solid rgba(0, 209, 178, 0.3)",
              paddingLeft: "25px",
            }}
          >
            <TranslatedText>
              The museum offers a range of services to ensure optimal visiting
              conditions. Staff members are at hand throughout the museum to
              provide up-to-date information on the museum and its activities.
            </TranslatedText>
          </p>
        </div>

        <div className="amenities-container">
          {amenitiesData.map((amenity, index) => (
            <div
              className={`amenity-card desktop-enhanced ${
                index % 3 === 0 ? "wide" : ""
              }`}
              key={amenity.id}
              style={{
                animationDelay: `${index * 0.15}s`,
                background: `linear-gradient(135deg, ${
                  index % 4 === 0
                    ? "#1E2A3B, #152231"
                    : index % 4 === 1
                    ? "#2A1E3B, #231522"
                    : index % 4 === 2
                    ? "#3B1E2A, #311522"
                    : "#1E3B2A, #152315"
                })`,
                borderLeft: `4px solid ${
                  index % 4 === 0
                    ? "#00d1b2"
                    : index % 4 === 1
                    ? "#7c4dff"
                    : index % 4 === 2
                    ? "#ff4081"
                    : "#00e676"
                }`,
              }}
            >
              <div className="amenity-content-wrapper">
                <div className="amenity-icon-container">
                  <div
                    className="amenity-icon"
                    style={{
                      color:
                        index % 4 === 0
                          ? "#00d1b2"
                          : index % 4 === 1
                          ? "#7c4dff"
                          : index % 4 === 2
                          ? "#ff4081"
                          : "#00e676",
                    }}
                  >
                    {renderIcon(amenity.icon)}
                  </div>
                  <div className="amenity-icon-backdrop"></div>
                </div>
                <div className="amenity-card-content">
                  <h3 className="amenity-title">
                    <TranslatedText>{amenity.title}</TranslatedText>
                  </h3>
                  <p className="amenity-description">
                    <TranslatedText>{amenity.description}</TranslatedText>
                  </p>
                  <div className="amenity-card-details">
                    <TranslatedText>{amenity.details}</TranslatedText>
                  </div>
                </div>
              </div>
              <div className="amenity-card-decorations">
                <div className="decoration-circle"></div>
                <div className="decoration-line"></div>
                <div className="decoration-dots"></div>
              </div>
              <div className="amenity-card-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Homestay data with expanded information for detailed view
  const homestayData = [
    {
      id: "traditional",
      title: "Traditional Homestay",
      description:
        "Authentic local home with traditional décor and home-cooked meals included.",
      image: traditionalImg,
      price: 120,
      rating: 4.8,
      tags: ["Recommended", "Authentic", "Breakfast Included"],
      category: ["popular", "recommended"],
      location: "5 minutes walk from the museum",
      host: "Marie Dupont",
    },
    {
      id: "modern",
      title: "Modern Apartment",
      description:
        "Stylish modern apartment with all amenities, located just 10 minutes from the museum.",
      image: modernImg,
      price: 180,
      rating: 4.9,
      tags: ["Top Rated", "Luxury", "Central Location"],
      category: ["popular", "top-rated"],
      location: "10 minutes walk from the museum",
      host: "Thomas Martin",
    },
    {
      id: "luxury",
      title: "Luxury Villa",
      description:
        "Exquisite villa with private garden, premium services and exceptional views of the city.",
      image: luxuryImg,
      price: 350,
      rating: 5.0,
      tags: ["Premium", "Private", "Full Service"],
      category: ["top-rated", "luxury"],
      location: "15 minutes drive from the museum",
      host: "Philippe Dubois",
    },
    {
      id: "budget",
      title: "Budget Room",
      description:
        "Comfortable and affordable private room in a shared apartment near public transport.",
      image: budgetImg,
      price: 75,
      rating: 4.5,
      tags: ["Budget-Friendly", "Convenient", "Good Value"],
      category: ["recommended", "budget-friendly"],
      location: "20 minutes by metro from the museum",
      host: "Claire Roux",
    },
  ];

  // FAQ data with more detailed answers
  const faqData = [
    {
      question:
        "Tôi có thể tham quan bảo tàng miễn phí không? Tôi có cần đặt vé không?",
      answer:
        "Bảo tàng miễn phí vé vào cửa cho nhiều đối tượng bao gồm người dưới 18 tuổi, cư dân EU dưới 26 tuổi và người khuyết tật cùng một người đi kèm. Vào cửa miễn phí cũng được áp dụng cho tất cả mọi người vào thứ Sáu đầu tiên của mỗi tháng từ 18:00 (trừ tháng 7 và tháng 8). Chúng tôi khuyến nghị đặt khung giờ trước, kể cả đối với khách được miễn phí vé, đặc biệt là trong mùa cao điểm.",
    },
    {
      question: "Làm thế nào để mua vé ưu đãi?",
      answer:
        "Vé ưu đãi có sẵn cho thanh niên từ 18-25 tuổi đến từ các nước ngoài EU, người có Thẻ Giáo dục và thành viên của các tổ chức đối tác. Bạn phải xuất trình CMND/CCCD hoặc thẻ thành viên hợp lệ tại cửa. Vé ưu đãi có thể được mua trực tuyến hoặc tại quầy vé.",
    },
    {
      question: "Tôi có thể được hoàn tiền không?",
      answer:
        "Vé không được hoàn tiền sau khi mua. Tuy nhiên, trong trường hợp bảo tàng đóng cửa vì lý do đặc biệt, chúng tôi sẽ hoàn tiền hoặc đổi sang ngày khác. Đối với các trường hợp đặc biệt, vui lòng liên hệ dịch vụ khách tham quan tại visitor@museedupin.com kèm mã đặt chỗ và lý do yêu cầu hoàn tiền.",
    },
    {
      question: "Tôi nên vào cửa nào nếu đã mua vé trực tuyến?",
      answer:
        "Khách có vé điện tử có thể vào qua cửa Tháp (cửa chính) hoặc cửa Porte des Lions. Cửa Carrousel dành riêng cho các đoàn và người có thẻ bảo tàng. Vé điện tử của bạn có mã QR sẽ được quét tại cửa. Chúng tôi khuyến nghị đến trước 15 phút so với khung giờ đã đặt.",
    },
    {
      question: "Có được mang xe đẩy em bé vào bảo tàng không?",
      answer:
        "Có, xe đẩy và xe nôi được phép vào bảo tàng. Tuy nhiên, trong thời điểm rất đông khách, bạn có thể được yêu cầu gửi xe đẩy lớn tại phòng gửi đồ và sử dụng địu em bé thay thế, được cung cấp miễn phí. Tất cả các phòng trưng bày đều có thể tiếp cận bằng xe đẩy thông qua thang máy.",
    },
    {
      question: "Những vật dụng nào không được mang vào bảo tàng?",
      answer:
        "Các vật dụng không được phép mang vào bảo tàng bao gồm túi xách và vali lớn (lớn hơn 55×35×20 cm), giá ba chân, gậy selfie, thiết bị chụp ảnh có đèn flash, đồ ăn và thức uống (trừ chai nước), và các vật sắc nhọn. Những vật dụng này phải được gửi tại phòng gửi đồ. Chúng tôi cũng cấm chạm vào tác phẩm nghệ thuật, hút thuốc và sử dụng điện thoại di động trong phòng trưng bày.",
    },
  ];

  // Enhanced Homestay Section
  const renderHomestaySection = () => (
    <section
      className="prepare-section homestay-section"
      id="homestay"
      ref={sectionRefs.homestay}
    >
      <div
        className="prepare-section-container"
        style={{ position: "relative", zIndex: "2" }}
      >
        <div
          className="prepare-section-header"
          style={{
            marginBottom: "80px",
            textAlign: "left",
            maxWidth: "900px",
          }}
        >
          <h2
            className="prepare-section-title modern"
            style={{
              fontSize: isMobile ? "2.5rem" : "3.8rem",
              color: "#0f172a",
              position: "relative",
              paddingBottom: "25px",
              fontWeight: "700",
              lineHeight: "1.2",
              marginBottom: "40px",
            }}
          >
            <TranslatedText>
              Experience local living near the museum
            </TranslatedText>
            <span className="title-accent"></span>
          </h2>
          <p
            className="prepare-section-description"
            style={{
              fontSize: isMobile ? "1.1rem" : "1.3rem",
              color: "#64748b",
              maxWidth: "800px",
              lineHeight: "1.8",
              fontWeight: "300",
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic",
              marginTop: "40px",
              borderLeft: "3px solid rgba(14, 165, 233, 0.3)",
              paddingLeft: "25px",
            }}
          >
            <TranslatedText>
              Immerse yourself in the local culture with our carefully selected
              homestay options near the museum. Experience authentic hospitality
              in these artfully designed spaces.
            </TranslatedText>
          </p>
        </div>

        <div className="homestay-grid modern">
          {homestayData.map((homestay) => (
            <div className="homestay-card modern" key={homestay.id}>
              <div className="homestay-card-image">
                <img src={homestay.image} alt={homestay.title} />
                {homestay.tags.map(
                  (tag, index) =>
                    index < 1 && (
                      <div className="homestay-card-tag" key={index}>
                        <TranslatedText>{tag}</TranslatedText>
                      </div>
                    )
                )}
              </div>
              <div className="homestay-card-content">
                <h3 className="homestay-card-title">
                  <TranslatedText>{homestay.title}</TranslatedText>
                </h3>
                <p className="homestay-card-description">
                  <TranslatedText>{homestay.description}</TranslatedText>
                </p>
                <div className="homestay-card-location">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>
                    <TranslatedText>{homestay.location}</TranslatedText>
                  </span>
                </div>
                <div className="homestay-card-footer">
                  <div className="homestay-card-price">
                    <span className="price-value">${homestay.price}</span>
                    <span className="price-unit">
                      <TranslatedText>per night</TranslatedText>
                    </span>
                  </div>
                  <div className="homestay-card-actions">
                    <button
                      className="btn-view"
                      onClick={() => openDetailsSidebar(homestay)}
                    >
                      <TranslatedText>View Details</TranslatedText>
                    </button>
                    <button
                      className="btn-book"
                      onClick={() => openBookingSidebar(homestay)}
                    >
                      <TranslatedText>Book Now</TranslatedText>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Enhanced FAQ Section
  const renderFAQSection = () => (
    <section
      className="prepare-section faq-section"
      id="faq"
      ref={sectionRefs.faq}
    >
      <div className="faq-container">
        <div className="faq-header">
          <div className="section-badge">
            <FaQuestion />
          </div>
          <h2 className="faq-title">
            <TranslatedText>Câu hỏi thường gặp</TranslatedText>
          </h2>
          <p className="faq-subtitle">
            <TranslatedText>Giải đáp từ Musée Du Pin.</TranslatedText>
          </p>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              key={index}
              style={{ "--animation-order": index }}
            >
              <div className="faq-highlight"></div>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <span>
                  <TranslatedText>{faq.question}</TranslatedText>
                </span>
              </div>
              <div className="faq-answer">
                <p>
                  <TranslatedText>{faq.answer}</TranslatedText>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3 className="faq-footer-title">
            <TranslatedText>Chưa tìm thấy câu trả lời?</TranslatedText>
          </h3>
          <p className="faq-footer-text">
            <TranslatedText>
              Liên hệ đội ngũ hỗ trợ của chúng tôi để biết thêm thông tin.
            </TranslatedText>
          </p>
          <button className="contact-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <TranslatedText>Liên hệ chúng tôi</TranslatedText>
          </button>
        </div>
      </div>
    </section>
  );

  // Enhanced effect to handle section visibility on scroll
  useEffect(() => {
    const sectionsObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    };

    const sectionsObserverOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -10% 0px",
    };

    const sectionsObserver = new IntersectionObserver(
      sectionsObserverCallback,
      sectionsObserverOptions
    );

    // Observe all sections
    document.querySelectorAll(".prepare-section").forEach((section) => {
      sectionsObserver.observe(section);
    });

    return () => {
      document.querySelectorAll(".prepare-section").forEach((section) => {
        sectionsObserver.unobserve(section);
      });
    };
  }, []);

  // Open homestay details sidebar
  const openDetailsSidebar = (homestay) => {
    setSelectedHomestay(homestay);
    setShowHomestayDetails(true);
    document.body.style.overflow = "hidden";
  };

  // Close homestay details sidebar
  const closeDetailsSidebar = () => {
    setShowHomestayDetails(false);
    document.body.style.overflow = "";
  };

  // Open booking sidebar
  const openBookingSidebar = (homestay) => {
    setSelectedHomestay(homestay);
    setShowBookingSidebar(true);
    document.body.style.overflow = "hidden";
  };

  // Close booking sidebar
  const closeBookingSidebar = () => {
    setShowBookingSidebar(false);
    document.body.style.overflow = "";
  };

  // Handle booking form input changes
  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingForm({
      ...bookingForm,
      [name]: value,
    });

    // Clear error when user types
    if (bookingErrors[name]) {
      setBookingErrors({
        ...bookingErrors,
        [name]: null,
      });
    }
  };

  // Validate booking form
  const validateForm = () => {
    const errors = {};

    if (!bookingForm.firstName.trim()) {
      errors.firstName = "First name is required";
    }

    if (!bookingForm.lastName.trim()) {
      errors.lastName = "Last name is required";
    }

    if (!bookingForm.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingForm.email)) {
      errors.email = "Email is invalid";
    }

    if (!bookingForm.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!bookingForm.checkIn) {
      errors.checkIn = "Check-in date is required";
    }

    if (!bookingForm.checkOut) {
      errors.checkOut = "Check-out date is required";
    }

    setBookingErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsBookingSubmitting(true);

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Success
      setBookingSuccess(true);
      setBookingForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        specialRequests: "",
      });

      // Close booking sidebar after delay
      setTimeout(() => {
        setBookingSuccess(false);
        closeBookingSidebar();
      }, 3000);
    } catch (error) {
      console.error("Booking failed:", error);
    } finally {
      setIsBookingSubmitting(false);
    }
  };

  // Render homestay details sidebar
  const renderHomestayDetailsSidebar = () => {
    if (!selectedHomestay) return null;

    return (
      <div
        className={`homestay-details-sidebar ${
          showHomestayDetails ? "open" : ""
        }`}
      >
        <div className="details-sidebar-header">
          <h2>
            <TranslatedText>{selectedHomestay.title}</TranslatedText>
          </h2>
          <button
            className="close-sidebar"
            onClick={closeDetailsSidebar}
            aria-label="Close details"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="homestay-gallery">
          <div className="gallery-main">
            <img src={selectedHomestay.image} alt={selectedHomestay.title} />
          </div>
          <div className="gallery-thumbnails">
            <div className="gallery-thumbnail active">
              <img src={selectedHomestay.image} alt={selectedHomestay.title} />
            </div>
            {/* In a real app, you would map through multiple images here */}
            <div className="gallery-thumbnail">
              <img src={traditionalImg} alt="Additional view" />
            </div>
            <div className="gallery-thumbnail">
              <img src={luxuryImg} alt="Additional view" />
            </div>
            <div className="gallery-thumbnail">
              <img src={modernImg} alt="Additional view" />
            </div>
          </div>
        </div>

        <div className="homestay-details-info">
          <div className="homestay-details-subtitle">
            <TranslatedText>
              Hosted by {selectedHomestay.host} · {selectedHomestay.location}
            </TranslatedText>
          </div>

          <div className="homestay-details-description">
            <TranslatedText>{selectedHomestay.description}</TranslatedText>
            <p>
              <TranslatedText>
                This homestay offers a unique opportunity to experience local
                life while enjoying all the comforts of home. The perfect base
                for exploring the museum and surrounding cultural attractions.
              </TranslatedText>
            </p>
          </div>

          <div className="homestay-details-location">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                fill="currentColor"
              />
            </svg>
            <span>
              <TranslatedText>{selectedHomestay.location}</TranslatedText>
            </span>
          </div>

          <div className="homestay-details-host">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                fill="currentColor"
              />
            </svg>
            <span>
              <TranslatedText>Hosted by {selectedHomestay.host}</TranslatedText>
            </span>
          </div>

          <div className="homestay-details-section">
            <h4>
              <TranslatedText>Amenities</TranslatedText>
            </h4>
            <ul className="amenities-list">
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    fill="currentColor"
                  />
                </svg>
                <TranslatedText>Wi-Fi</TranslatedText>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
                    fill="currentColor"
                  />
                </svg>
                <TranslatedText>TV</TranslatedText>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M13 3H11v8h2zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z"
                    fill="currentColor"
                  />
                </svg>
                <TranslatedText>Air Conditioning</TranslatedText>
              </li>
              <li>
                <svg viewBox="0 0 24 24" width="18" height="18">
                  <path
                    d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"
                    fill="currentColor"
                  />
                </svg>
                <TranslatedText>Kitchen</TranslatedText>
              </li>
            </ul>
          </div>

          <div className="homestay-booking-card">
            <div className="booking-card-price">
              <span className="price-value">{selectedHomestay.price}</span>
              <span className="price-unit">
                <TranslatedText>per night</TranslatedText>
              </span>
            </div>
            <button
              className="btn-book-now"
              onClick={() => {
                closeDetailsSidebar();
                openBookingSidebar(selectedHomestay);
              }}
            >
              <TranslatedText>Book Now</TranslatedText>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render booking sidebar
  const renderBookingSidebar = () => {
    if (!selectedHomestay) return null;

    return (
      <div className={`booking-sidebar ${showBookingSidebar ? "open" : ""}`}>
        <div className="booking-sidebar-header modern">
          <h2>
            <TranslatedText>Book Your Stay</TranslatedText>
          </h2>
          <button
            className="close-sidebar"
            onClick={closeBookingSidebar}
            aria-label="Close booking"
          >
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7A.996.996 0 105.7 7.11L10.59 12 5.7 16.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>

        <div className="booking-homestay-info modern">
          <img src={selectedHomestay.image} alt={selectedHomestay.title} />
          <div>
            <h3>
              <TranslatedText>{selectedHomestay.title}</TranslatedText>
            </h3>
            <div className="booking-homestay-location">
              <svg viewBox="0 0 24 24" width="16" height="16">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>{selectedHomestay.location}</TranslatedText>
              </span>
            </div>
            <div className="booking-homestay-price">
              <span className="price-value">${selectedHomestay.price}</span>
              <span className="price-unit">
                <TranslatedText>per night</TranslatedText>
              </span>
            </div>
          </div>
        </div>

        <form className="booking-form modern" onSubmit={handleBookingSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">
              <TranslatedText>First Name</TranslatedText>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={bookingForm.firstName}
              onChange={handleBookingInputChange}
              className={bookingErrors.firstName ? "has-error" : ""}
            />
            {bookingErrors.firstName && (
              <div className="error-message">
                <TranslatedText>{bookingErrors.firstName}</TranslatedText>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">
              <TranslatedText>Last Name</TranslatedText>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={bookingForm.lastName}
              onChange={handleBookingInputChange}
              className={bookingErrors.lastName ? "has-error" : ""}
            />
            {bookingErrors.lastName && (
              <div className="error-message">
                <TranslatedText>{bookingErrors.lastName}</TranslatedText>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">
              <TranslatedText>Email</TranslatedText>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={bookingForm.email}
              onChange={handleBookingInputChange}
              className={bookingErrors.email ? "has-error" : ""}
            />
            {bookingErrors.email && (
              <div className="error-message">
                <TranslatedText>{bookingErrors.email}</TranslatedText>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="phone">
              <TranslatedText>Phone</TranslatedText>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={bookingForm.phone}
              onChange={handleBookingInputChange}
              className={bookingErrors.phone ? "has-error" : ""}
            />
            {bookingErrors.phone && (
              <div className="error-message">
                <TranslatedText>{bookingErrors.phone}</TranslatedText>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="checkIn">
              <TranslatedText>Check-in Date</TranslatedText>
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={bookingForm.checkIn}
              onChange={handleBookingInputChange}
              className={bookingErrors.checkIn ? "has-error" : ""}
              min={new Date().toISOString().split("T")[0]}
            />
            {bookingErrors.checkIn && (
              <div className="error-message">
                <TranslatedText>{bookingErrors.checkIn}</TranslatedText>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="checkOut">
              <TranslatedText>Check-out Date</TranslatedText>
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={bookingForm.checkOut}
              onChange={handleBookingInputChange}
              className={bookingErrors.checkOut ? "has-error" : ""}
              min={
                bookingForm.checkIn
                  ? new Date(new Date(bookingForm.checkIn).getTime() + 86400000)
                      .toISOString()
                      .split("T")[0]
                  : new Date().toISOString().split("T")[0]
              }
            />
            {bookingErrors.checkOut && (
              <div className="error-message">
                <TranslatedText>{bookingErrors.checkOut}</TranslatedText>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="guests">
              <TranslatedText>Number of Guests</TranslatedText>
            </label>
            <select
              id="guests"
              name="guests"
              value={bookingForm.guests}
              onChange={handleBookingInputChange}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="specialRequests">
              <TranslatedText>Special Requests</TranslatedText>
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={bookingForm.specialRequests}
              onChange={handleBookingInputChange}
              rows="3"
            ></textarea>
          </div>

          <div className="booking-summary modern">
            <div className="summary-row">
              <div>
                <TranslatedText>
                  ${selectedHomestay.price} x{" "}
                  {bookingForm.checkIn && bookingForm.checkOut
                    ? Math.ceil(
                        (new Date(bookingForm.checkOut) -
                          new Date(bookingForm.checkIn)) /
                          (1000 * 60 * 60 * 24)
                      )
                    : 1}{" "}
                  nights
                </TranslatedText>
              </div>
              <div>
                $
                {bookingForm.checkIn && bookingForm.checkOut
                  ? selectedHomestay.price *
                    Math.ceil(
                      (new Date(bookingForm.checkOut) -
                        new Date(bookingForm.checkIn)) /
                        (1000 * 60 * 60 * 24)
                    )
                  : selectedHomestay.price}
              </div>
            </div>
            <div className="summary-row">
              <div>
                <TranslatedText>Service fee</TranslatedText>
              </div>
              <div>$25</div>
            </div>
            <div className="summary-row total">
              <div>
                <TranslatedText>Total</TranslatedText>
              </div>
              <div>
                $
                {bookingForm.checkIn && bookingForm.checkOut
                  ? selectedHomestay.price *
                      Math.ceil(
                        (new Date(bookingForm.checkOut) -
                          new Date(bookingForm.checkIn)) /
                          (1000 * 60 * 60 * 24)
                      ) +
                    25
                  : selectedHomestay.price + 25}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn-submit-booking modern"
            disabled={isBookingSubmitting || bookingSuccess}
          >
            {isBookingSubmitting && <span className="spinner"></span>}
            {bookingSuccess ? (
              <TranslatedText>Booking Confirmed!</TranslatedText>
            ) : isBookingSubmitting ? (
              <TranslatedText>Processing...</TranslatedText>
            ) : (
              <TranslatedText>Confirm Booking</TranslatedText>
            )}
          </button>
        </form>
      </div>
    );
  };

  // Update the render with improved components
  return (
    <div className={`prepare-page ${isMobile ? "mobile-view" : ""}`}>
      {/* Fix for mobile fixed elements - invisible div creates proper stacking context */}
      {isMobile && (
        <div
          id="mobile-fixed-elements-fix"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: -1,
          }}
        ></div>
      )}

      {/* Hero Section */}
      {renderHero()}

      {/* Horizontal Navigation */}
      {renderNavigationBar()}

      {/* Hours Section */}
      {renderHoursSection()}

      {/* Tickets Section */}
      {renderTicketsSection()}

      {/* Membership Section */}
      {renderMembershipSection()}

      {/* Amenities Section */}
      {renderAmenitiesSection()}

      {/* Homestay Section */}
      {renderHomestaySection()}

      {/* FAQ Section */}
      {renderFAQSection()}

      {/* Mobile Bottom Navigation */}
      {renderMobileNavigation()}

      {/* Homestay Details Sidebar */}
      {renderHomestayDetailsSidebar()}

      {/* Booking Sidebar */}
      {renderBookingSidebar()}
    </div>
  );
};

export default PrepareVisit;
