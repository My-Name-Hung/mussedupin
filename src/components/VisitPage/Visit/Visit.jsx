import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAssets } from "../../../hooks/useAssets";
import TranslatedText from "../../TranslatedText";
import "./Visit.css";

// Hero section background image
// import heroImage from "../../../assets/Home/Hero/louvre-sunset.webp";

const Visit = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hours");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isAdmissionExpanded, setIsAdmissionExpanded] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hours: false,
    tickets: false,
    membership: false,
  });
  const sectionRefs = {
    hours: useRef(null),
    tickets: useRef(null),
    membership: useRef(null),
  };
  const navRef = useRef(null);
  const heroRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchDirection, setTouchDirection] = useState(null);
  const [animatedSections, setAnimatedSections] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rippleTimeout = useRef(null);
  const scrollTimeout = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const horizontalNavRef = useRef(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollTop = useRef(0);
  const { assets, getAssetUrl } = useAssets();
  // Find the hero image by filename
  const heroAsset = assets.find((a) => a.filename === "louvre-sunset.webp");

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

  // Current day and time display
  const getCurrentDayTimeInfo = () => {
    // Cập nhật: mở cửa tất cả các ngày trong tuần đến 21h tối
    const statusText = "mở cửa hôm nay từ 7:00 đến 21:00";
    const statusClass = "open";

    return { statusText, statusClass };
  };

  const { statusText, statusClass } = getCurrentDayTimeInfo();

  // Enhanced handleScroll to track scroll direction for hiding navbar
  const handleScroll = useCallback(() => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrollingDown(st > lastScrollTop.current && st > 200);
    lastScrollTop.current = st <= 0 ? 0 : st;

    // Original scroll handling logic
    if (heroRef.current && navRef.current) {
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      const navHeight = navRef.current.offsetHeight;

      if (heroBottom <= navHeight) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
    }

    // Determine which section is in view
    let currentSection = "hours";
    const scrollPosition = window.scrollY + (isMobile ? 80 : 100); // Smaller offset for mobile

    // Check sections in reverse order (from bottom to top)
    if (
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

  // Track horizontal nav scroll position
  useEffect(() => {
    const handleNavScroll = () => {
      if (horizontalNavRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          horizontalNavRef.current;
        // Check if scrolled to the right edge
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 20;
        setNavScrolled(isAtEnd);

        // Add or remove scrolled-right class
        if (isAtEnd) {
          horizontalNavRef.current.classList.add("scrolled-right");
        } else {
          horizontalNavRef.current.classList.remove("scrolled-right");
        }
      }
    };

    const navContainer = horizontalNavRef.current;
    if (navContainer) {
      navContainer.addEventListener("scroll", handleNavScroll);
      // Check initial scroll position
      handleNavScroll();
    }

    return () => {
      if (navContainer) {
        navContainer.removeEventListener("scroll", handleNavScroll);
      }
    };
  }, []);

  // Enhanced touch handling for horizontal nav
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

  // Thêm vào handle touch events cho mobile
  const handleTouchStart = useCallback((e) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // Xác định hướng vuốt
      if (diff > 30) {
        setTouchDirection("down");
      } else if (diff < -30) {
        setTouchDirection("up");
      }
    },
    [touchStartY]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchDirection(null);
  }, []);

  // Thêm vào logic để nâng cao hiệu ứng visible khi scroll
  useEffect(() => {
    const handleScrollAnimation = () => {
      const sections = document.querySelectorAll(".visit-section");

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.85) {
          if (!animatedSections.includes(section.id)) {
            setAnimatedSections((prev) => [...prev, section.id]);
            section.classList.add("visible");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    // Kích hoạt ngay khi component mount
    handleScrollAnimation();

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, [animatedSections]);

  // Thêm touch events khi component mount
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Thêm smooth scroll effect khi click vào các tabs
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Adjust the offset for mobile and desktop differently
      const yOffset = isMobile ? -70 : isNavSticky ? -70 : -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  // Cải thiện handleNavClick để dùng smoothScrollTo
  const handleNavClick = (section) => {
    setActiveSection(section);

    // Update URL với hash
    window.history.pushState(null, "", `#${section}`);

    // Sử dụng smooth scroll mới
    smoothScrollTo(section);
  };

  const toggleAdmissionSection = () => {
    setIsAdmissionExpanded(!isAdmissionExpanded);
  };

  // Thêm hàm xử lý khi click vào Full List
  const handleFullListClick = (e) => {
    e.preventDefault();
    setIsAdmissionExpanded(true);
    // Scroll đến vị trí của section sau khi mở rộng
    setTimeout(() => {
      const element = document.querySelector(".free-admission-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 100);
  };

  // Thêm hàm xử lý khi click vào See group prices
  const handleGroupPricesClick = (e) => {
    e.preventDefault();
    const element = document.querySelector(".tours-activities-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Hàm điều hướng về trang chủ
  const navigateToHome = () => {
    window.location.href = "/";
  };

  // Add this useEffect for section visibility detection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [sectionId]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe each section
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Thêm effect ripple cho các buttons
  const createRipple = useCallback((event) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    // Determine if event is touch or mouse
    const clientX =
      event.clientX || (event.touches && event.touches[0].clientX);
    const clientY =
      event.clientY || (event.touches && event.touches[0].clientY);

    if (!clientX || !clientY) return;

    const ripple = {
      id: Date.now(),
      left: clientX - rect.left - radius,
      top: clientY - rect.top - radius,
      width: diameter,
      height: diameter,
    };

    setRipples((prev) => [...prev, ripple]);

    clearTimeout(rippleTimeout.current);
    rippleTimeout.current = setTimeout(() => {
      setRipples([]);
    }, 600);
  }, []);

  // Cập nhật trạng thái scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Cải thiện cách hiển thị hero background với hiệu ứng nghệ thuật
  const renderArtisticHero = () => (
    <div className="visit-hero" ref={heroRef}>
      <div className="visit-hero-image-container">
        <img
          src={heroAsset?.url || getAssetUrl(heroAsset?.filename)}
          alt="Musée Du Pin"
          className="visit-hero-image"
        />
        <div className="visit-hero-overlay"></div>
      </div>
      <div className="visit-hero-content">
        <h1 className="visit-hero-title">
          <TranslatedText>GIỜ MỞ CỬA & VÉ VÀO CỬA</TranslatedText>
        </h1>
        <p className="visit-hero-subtitle">
          <TranslatedText>Lên kế hoạch và đặt vé tham quan</TranslatedText>
        </p>
      </div>
    </div>
  );

  // Render the horizontal nav with enhanced mobile support
  const renderNavigationBar = () => {
    // Don't render the navigation bar on mobile
    if (isMobile) return null;

    return (
      <div
        className={`visit-nav-container ${isNavSticky ? "sticky" : ""} ${
          navScrolled ? "scrolled-right" : ""
        }`}
        ref={(el) => {
          navRef.current = el;
          horizontalNavRef.current = el;
        }}
        onTouchStart={handleNavTouchStart}
        onTouchMove={handleNavTouchMove}
      >
        <div className="visit-nav">
          <ul className="visit-nav-list">
            <li
              className={`visit-nav-item ${
                activeSection === "hours" ? "active" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  createRipple(e);
                  handleNavClick("hours");
                }}
                className="visit-nav-button"
              >
                <TranslatedText>Thời gian tham quan</TranslatedText>
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.left,
                      top: ripple.top,
                      width: ripple.width,
                      height: ripple.height,
                    }}
                  />
                ))}
              </button>
              <span className="visit-nav-indicator"></span>
            </li>
            <li
              className={`visit-nav-item ${
                activeSection === "tickets" ? "active" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  createRipple(e);
                  handleNavClick("tickets");
                }}
                className="visit-nav-button"
              >
                <TranslatedText>Giá vé</TranslatedText>
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.left,
                      top: ripple.top,
                      width: ripple.width,
                      height: ripple.height,
                    }}
                  />
                ))}
              </button>
              <span className="visit-nav-indicator"></span>
            </li>
            <li
              className={`visit-nav-item ${
                activeSection === "membership" ? "active" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  createRipple(e);
                  handleNavClick("membership");
                }}
                className="visit-nav-button"
              >
                <TranslatedText>Thành viên</TranslatedText>
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.left,
                      top: ripple.top,
                      width: ripple.width,
                      height: ripple.height,
                    }}
                  />
                ))}
              </button>
              <span className="visit-nav-indicator"></span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // Enhanced mobile-friendly museum info
  const renderMuseumInfo = () => (
    <div className="museum-info-wrapper">
      <div className="museum-info-image">
        <img
          src={heroAsset?.url || getAssetUrl(heroAsset?.filename)}
          alt="Musée Du Pin"
        />
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
                Musée Du Pin đóng cửa vào ngày 1 tháng 1, 1 tháng 5 và 25 tháng
                12. Bảo tàng vẫn mở cửa vào các ngày lễ khác trừ khi rơi vào thứ
                Ba, ngày nghỉ định kỳ của bảo tàng.
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
  );

  // Enhanced ticket option cards
  const renderTicketOptions = () => (
    <div className="ticket-options">
      <div className={`ticket-option ${isMobile ? "touch-card" : ""}`}>
        <div className="ticket-option-details">
          <div className="ticket-type">
            <TranslatedText>Vé phổ thông</TranslatedText>
          </div>
        </div>
        <div className="ticket-price">
          <TranslatedText>500.000đ</TranslatedText>
        </div>
      </div>

      <div className={`ticket-option ${isMobile ? "touch-card" : ""}`}>
        <div className="ticket-option-details">
          <div className="ticket-type">
            <TranslatedText>
              Người dưới 18 tuổi, cư dân EEA dưới 26 tuổi
            </TranslatedText>
          </div>
          <a href="#" className="ticket-link" onClick={handleFullListClick}>
            <TranslatedText>
              Xem danh sách đầy đủ khách tham quan được miễn phí vé vào cửa
            </TranslatedText>
          </a>
        </div>
        <div className="ticket-price highlighted">
          <TranslatedText>MIỄN PHÍ</TranslatedText>
        </div>
      </div>

      <div className={`ticket-option ${isMobile ? "touch-card" : ""}`}>
        <div className="ticket-option-details">
          <div className="ticket-type">
            <TranslatedText>
              Bạn đến theo nhóm (từ 7 người trở lên)?
            </TranslatedText>
          </div>
          <a href="#" className="ticket-link" onClick={handleGroupPricesClick}>
            <TranslatedText>Xem giá vé nhóm</TranslatedText>
          </a>
        </div>
        <div className="ticket-price"></div>
      </div>
    </div>
  );

  // Add ripple effect for better touch feedback
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

  // Add a bottom navbar for mobile
  const renderBottomNavbar = () => {
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
                handleNavClick("hours");
              }}
            >
              <span className="mobile-nav-icon">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Thời gian</TranslatedText>
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
                handleNavClick("tickets");
              }}
            >
              <span className="mobile-nav-icon">
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
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
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
                handleNavClick("membership");
              }}
            >
              <span className="mobile-nav-icon">
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Thành viên</TranslatedText>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Update the renderMobileScrollTop function to avoid duplication with App.jsx's ScrollToTopButton
  const renderMobileScrollTop = () => {
    // Don't render if we're not on mobile or not scrolled enough
    if (!isMobile || !isScrolling) return null;

    // Check if we're rendering inside the App component where ScrollToTopButton is already used
    const isStandaloneMode = !document.querySelector(".app");

    // Only render in standalone mode
    if (!isStandaloneMode) return null;

    return (
      <button
        className={`mobile-scroll-top fixed-mobile-element visible`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
            fill="currentColor"
          />
        </svg>
      </button>
    );
  };

  // Update useEffect to use our enhanced scroll handler
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // return updated component with enhanced mobile support
  return (
    <div
      className={`visit-page ${
        touchDirection ? `touch-${touchDirection}` : ""
      } ${isScrolling ? "is-scrolling" : ""} ${isMobile ? "mobile-view" : ""}`}
    >
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
      {renderArtisticHero()}

      {/* Horizontal Navigation */}
      {renderNavigationBar()}

      {/* Hours & Admission Section */}
      <section
        className={`visit-section hours-section ${
          visibleSections.hours ? "visible" : ""
        }`}
        id="hours"
        ref={sectionRefs.hours}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>
              <TranslatedText>THỜI GIAN THAM QUAN</TranslatedText>
            </span>
          </h2>

          <div className="museum-location-tabs">
            <div className="location-tab active">
              <button className="location-tab-button">
                <TranslatedText>Musée Du Pin</TranslatedText>
              </button>
            </div>
          </div>

          {renderMuseumInfo()}
        </div>
      </section>

      {/* Ticket Prices Section */}
      <section
        className={`visit-section ${visibleSections.tickets ? "visible" : ""}`}
        id="tickets"
        ref={sectionRefs.tickets}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>
              <TranslatedText>GIÁ VÉ</TranslatedText>
            </span>
          </h2>

          <div className="ticket-intro">
            <p className="ticket-description">
              <TranslatedText>
                Một vé cho phép bạn truy cập vào các bộ sưu tập vĩnh viễn và các
                triển lãm tạm thời của Musée Du Pin, cũng như đến bảo tàng
                Eugène-Delacroix cùng ngày và ngày sau ngày thăm của bạn tại bảo
                tàng Musée Du Pin.
              </TranslatedText>
            </p>
            <div className="ticket-note">
              <TranslatedText>
                Vé có thể được mua trực tiếp tại điểm khi số lượng khách tham
                quan ở bảo tàng thấp (tùy theo sẵn có).
              </TranslatedText>
            </div>
          </div>

          {renderTicketOptions()}

          <div
            className={`free-admission-section expandable ${
              isAdmissionExpanded ? "expanded" : ""
            }`}
          >
            <div className="section-header" onClick={toggleAdmissionSection}>
              <h3 className="section-titles">
                <TranslatedText>
                  NGƯỜI THAM QUAN ĐƯỢC MIỄN PHÍ VÉ
                </TranslatedText>
              </h3>
              <button className="expand-button">
                <span
                  className={`expand-icon ${
                    isAdmissionExpanded ? "rotated" : ""
                  }`}
                >
                  ↓
                </span>
              </button>
            </div>

            <div
              className="section-content"
              style={{ display: isAdmissionExpanded ? "block" : "none" }}
            >
              <p className="section-intro">
                <TranslatedText>
                  Đặt giờ tham quan được khuyến nghị, bao gồm cho khách tham
                  quan được miễn phí vé.
                </TranslatedText>
              </p>

              <p className="section-subtitle">
                <TranslatedText>
                  Miễn phí cho các khách tham quan sau:
                </TranslatedText>
              </p>

              <div className="visitor-category">
                <h4 className="category-title">
                  <TranslatedText>Dưới 18 tuổi</TranslatedText>
                </h4>
                <p className="category-details">
                  <TranslatedText>Chứng minh ID yêu cầu.</TranslatedText>
                </p>
              </div>

              <div className="visitor-category">
                <h4 className="category-title">
                  <TranslatedText>
                    Cư dân khu vực kinh tế châu Âu (EU, Na Uy, Iceland, và
                    Liechtenstein) dưới 26 tuổi
                  </TranslatedText>
                </h4>
                <p className="category-details">
                  <TranslatedText>
                    Chứng minh ID và sống tại địa phương.
                  </TranslatedText>
                </p>
              </div>

              <div className="visitor-category">
                <h4 className="category-title">
                  <TranslatedText>Tất cả khách tham quan</TranslatedText>
                </h4>
                <p className="category-details">
                  <TranslatedText>
                    Vào ngày thứ năm đầu tiên của tháng sau 6 giờ chiều (trừ
                    tháng 7 và tháng 8)
                  </TranslatedText>
                </p>
              </div>

              <div className="visitor-category-separator">
                <TranslatedText>Và:</TranslatedText>
              </div>

              <div className="visitor-categories-grid">
                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>
                      Khách tham quan không mạnh mẽ và người đi cùng họ
                    </TranslatedText>
                  </h4>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>
                      Giáo viên nghệ thuật (nghệ thuật mỹ thuật, khảo cổ học,
                      nghệ thuật ứng dụng, kiến trúc và lịch sử nghệ thuật)
                    </TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Trình bày chứng minh môn học đã dạy.
                    </TranslatedText>
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>
                      Nghệ sĩ liên kết với AIAP (Hiệp hội Quốc tế Nghệ thuật Mỹ
                      thuật)
                    </TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Trình bày thẻ thành viên hợp lệ hoặc chứng chỉ.
                    </TranslatedText>
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>Thành viên ICOM và ICOMOS</TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Trình bày thẻ thành viên hợp lệ.
                    </TranslatedText>
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>Nhà báo</TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Trình bày thẻ báo chí quốc tế hoặc quốc gia.
                    </TranslatedText>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="tours-activities-section">
            <h3 className="section-subtitle">
              <TranslatedText>Chuyến đi và hoạt động</TranslatedText>
            </h3>

            <div className="ticket-options">
              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      GIÁ TRỊ - Guided tours, storytime và học tập
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      Giá này không bao gồm vé vào bảo tàng.
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>12.00 €</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      VÉ KẾT HỢP - Tham quan có hướng dẫn, kể chuyện và hội thảo
                      + Musée Du Pin
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>Bao gồm vé vào bảo tàng</TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>750.000đ</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      GIÁ ƯU ĐÃI - Tham quan có hướng dẫn, kể chuyện và hội thảo
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>Giá ưu đãi có điều kiện</TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>220.000đ</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      GIÁ NHÓM (7-25 người) - Tham quan có hướng dẫn
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      Giá mỗi người, yêu cầu đặt trước
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>200.000đ</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      NHÓM HỌC SINH - Tham quan giáo dục có hướng dẫn
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      Dành cho các nhóm học sinh tiểu học và trung học, bao gồm
                      tài liệu giáo dục
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>120.000đ</TranslatedText>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h3 className="section-subtitle">
              <TranslatedText>Phương thức thanh toán</TranslatedText>
            </h3>
            <p className="payment-details">
              <TranslatedText>
                Các phương thức thanh toán được chấp nhận tại quầy vé bảo tàng
                bao gồm tiền mặt, thẻ ngân hàng và phiếu du lịch
                'Chèques-Vacances'.
              </TranslatedText>
            </p>
            <div className="payment-image">
              <img
                src={heroAsset?.url || getAssetUrl(heroAsset?.filename)}
                alt="Thanh toán tại Musée Du Pin"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section
        className={`visit-section ${
          visibleSections.membership ? "visible" : ""
        }`}
        id="membership"
        ref={sectionRefs.membership}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>
              <TranslatedText>THÀNH VIÊN</TranslatedText>
            </span>
          </h2>

          <div className="membership-info">
            <h3 className="membership-heading">
              <TranslatedText>
                Trở thành thành viên của Hội Bạn bè Musée Du Pin
              </TranslatedText>
            </h3>
            <p className="membership-description">
              <TranslatedText>
                Hội Bạn bè Musée Du Pin cung cấp nhiều chương trình thành viên
                khác nhau (thanh niên, cá nhân và cặp đôi, gia đình), với mức
                giá từ 350.000đ đến 2.800.000đ.
              </TranslatedText>
            </p>

            <div className="membership-card-image">
              <img
                src={heroAsset?.url || getAssetUrl(heroAsset?.filename)}
                alt="Thẻ thành viên Hội Bạn bè Musée Du Pin"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-enhanced info box */}
      <div
        className={`visit-info-box ${isMobile ? "mobile-info-box" : ""}`}
        onClick={navigateToHome}
      >
        <div className="visit-info-icon">
          <svg viewBox="0 0 100 100" width="40" height="40">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#00695c"
              strokeWidth="2"
            />
            <path d="M45,30 L55,30 L55,40 L45,40 Z" fill="#00695c" />
            <path d="M45,45 L55,45 L55,70 L45,70 Z" fill="#00695c" />
          </svg>
        </div>
        <div className="visit-info-content">
          <h3 className="visit-info-title">
            <TranslatedText>VÀO VÀ RA</TranslatedText>
          </h3>
          <p className="visit-info-text">
            <TranslatedText>
              Hãy lên kế hoạch trước những gì bạn muốn làm tại bảo tàng vì khi
              đã ra khỏi bảo tàng sẽ không được vào lại.
            </TranslatedText>
          </p>
        </div>
      </div>

      {/* Mobile scroll to top button */}
      {renderMobileScrollTop()}

      {/* Mobile Bottom Navigation */}
      {renderBottomNavbar()}
    </div>
  );
};

export default Visit;
