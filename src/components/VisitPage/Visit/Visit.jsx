import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { getImageUrl } from "../../../utils/cloudinary";
import "./Visit.css";

// Hero section background image

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
          src={getImageUrl("Thông 4.webp", {
            width: 1920,
            height: 1080,
            crop: "fill",
          })}
          alt="Musée Du Pin"
          className="visit-hero-image"
        />
        <div className="visit-hero-overlay"></div>
      </div>
      <div className="visit-hero-content">
        <h1 className="visit-hero-title">GIỜ MỞ CỬA VÀ CÁC GÓI TRẢI NGHIỆM</h1>
        <p className="visit-hero-subtitle">Lên kế hoạch và đặt vé tham quan</p>
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
                Thời gian tham quan
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
                Giá vé
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
                Thành viên
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
          src="https://scontent.fsgn5-12.fna.fbcdn.net/v/t39.30808-6/475005503_122135717756476582_3999824126778630748_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEEzq62LNhBII4YPz4y8vzHKTr0LI5nxT0pOvQsjmfFPcono5QWqsJZ5X1xeaMQAsxZO9nHTVw3RVjopc_CObft&_nc_ohc=oTEyYDZnfAIQ7kNvwGO8zcC&_nc_oc=AdmfX-I5Pk81vQKR7JRp2x-7eMqCFUwXe4xBH3KKLX02qI2o7LPSGDbj0fENglHdIRI&_nc_zt=23&_nc_ht=scontent.fsgn5-12.fna&_nc_gid=eg1SVxsLccaJ3OUbc4LAZA&oh=00_AfLwDVQH4jsNWFFEiwdntQxpqgh9RoTrq2Ym2ORQarytSw&oe=6842E118"
          alt="Musée Du Pin"
        />
        {isMobile && <div className="info-image-overlay"></div>}
      </div>

      <div className="museum-info-content">
        <div className="museum-status-bar">
          <div className={`museum-status ${statusClass}`}>
            <span className="status-dot"></span>
            Bảo tàng {statusText}
          </div>
        </div>

        <div className="museum-hours">
          <div className={`hours-row ${isMobile ? "touch-friendly" : ""}`}>
            <div className="hours-time">
              <span>7:00 → 21:00</span>
            </div>
            <div className="hours-days">
              <span>Thứ Hai đến Chủ Nhật</span>
            </div>
          </div>
        </div>

        <div className="museum-notes">
          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">Giờ vào cuối:</div>
            <div className="note-value">1 tiếng trước giờ đóng cửa</div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">Dọn dẹp phòng:</div>
            <div className="note-value">30 phút trước giờ đóng cửa</div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">Ngày lễ:</div>
            <div className="note-value">
                Musée Du Pin đóng cửa vào ngày 1 tháng 1, 1 tháng 5 và 25 tháng
                12. Bảo tàng vẫn mở cửa vào các ngày lễ khác trừ khi rơi vào thứ
                Ba, ngày nghỉ định kỳ của bảo tàng.
            </div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">Sân Carrée</div>
            <div className="note-value">đóng cửa lúc 23:00.</div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">Sân Carrée</div>
            <div className="note-value">
                sẽ đóng cửa từ ngày 7 tháng 4 đến 25 tháng 6 năm 2025.
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
            GIÁ TRỊ - Guided tours, storytime và học tập
          </div>
        </div>
        <div className="ticket-price">500.000đ</div>
      </div>

      <div className={`ticket-option ${isMobile ? "touch-card" : ""}`}>
        <div className="ticket-option-details">
          <div className="ticket-type">
              Người dưới 18 tuổi, cư dân EEA dưới 26 tuổi
          </div>
          <a href="#" className="ticket-link" onClick={handleFullListClick}>
              Xem danh sách đầy đủ khách tham quan được miễn phí vé vào cửa
          </a>
        </div>
        <div className="ticket-price highlighted">MIỄN PHÍ</div>
      </div>

      <div className={`ticket-option ${isMobile ? "touch-card" : ""}`}>
        <div className="ticket-option-details">
          <div className="ticket-type">
              Bạn đến theo nhóm (từ 7 người trở lên)?
          </div>
          <a href="#" className="ticket-link" onClick={handleGroupPricesClick}>
            Xem giá vé nhóm
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
              <span className="mobile-nav-label">Thời gian</span>
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
              <span className="mobile-nav-label">Vé</span>
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
              <span className="mobile-nav-label">Thành viên</span>
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
            <span>THỜI GIAN THAM QUAN</span>
          </h2>

          <div className="museum-location-tabs">
            <div className="location-tab active">
              <button className="location-tab-button">Musée Du Pin</button>
            </div>
          </div>

          {renderMuseumInfo()}
        </div>
      </section>

      {/* Ticket Prices Section */}
      <section
        className={` ${visibleSections.tickets ? "visible" : ""}`}
        id="tickets"
        ref={sectionRefs.tickets}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>CHI PHÍ CÁC GÓI TRẢI NGHIỆM</span>
          </h2>

          <div className="ticket-intro">
            <div className="ticket-image-container">
              <img
                src="https://live.staticflickr.com/2308/2427636873_0b9c299803_c.jpg"
                alt="Vé tham quan Musée Du Pin"
                className="ticket-illustration"
                loading="lazy"
              />
            </div>
            <p className="ticket-description">
                Một vé cho phép bạn truy cập vào các bộ sưu tập vĩnh viễn và các
                triển lãm tạm thời của Musée Du Pin, cũng như đến bảo tàng
                Eugène-Delacroix cùng ngày và ngày sau ngày thăm của bạn tại bảo
                tàng Musée Du Pin.
            </p>
            <div className="ticket-note">
              Vé có thể được mua trực tiếp tại điểm khi số lượng khách tham quan
              ở bảo tàng thấp (tùy theo sẵn có).
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
                  NGƯỜI THAM QUAN ĐƯỢC MIỄN PHÍ VÉ
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
                Đặt giờ tham quan được khuyến nghị, bao gồm cho khách tham quan
                được miễn phí vé.
              </p>

              <p className="section-subtitle">
                  Miễn phí cho các khách tham quan sau:
              </p>

              <div className="visitor-category">
                <h4 className="category-title">Dưới 18 tuổi</h4>
                <p className="category-details">Chứng minh ID yêu cầu.</p>
              </div>

              <div className="visitor-category">
                <h4 className="category-title">
                    Cư dân khu vực kinh tế châu Âu (EU, Na Uy, Iceland, và
                    Liechtenstein) dưới 26 tuổi
                </h4>
                <p className="category-details">
                    Chứng minh ID và sống tại địa phương.
                </p>
              </div>

              <div className="visitor-category">
                <h4 className="category-title">Tất cả khách tham quan</h4>
                <p className="category-details">
                  Vào ngày thứ năm đầu tiên của tháng sau 6 giờ chiều (trừ tháng
                  7 và tháng 8)
                </p>
              </div>

              <div className="visitor-category-separator">Và:</div>

              <div className="visitor-categories-grid">
                <div className="visitor-category">
                  <h4 className="category-title">
                      Khách tham quan không mạnh mẽ và người đi cùng họ
                  </h4>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    Giáo viên nghệ thuật (nghệ thuật mỹ thuật, khảo cổ học, nghệ
                    thuật ứng dụng, kiến trúc và lịch sử nghệ thuật)
                  </h4>
                  <p className="category-details">
                      Trình bày chứng minh môn học đã dạy.
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                      Nghệ sĩ liên kết với AIAP (Hiệp hội Quốc tế Nghệ thuật Mỹ
                      thuật)
                  </h4>
                  <p className="category-details">
                      Trình bày thẻ thành viên hợp lệ hoặc chứng chỉ.
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">Thành viên ICOM và ICOMOS</h4>
                  <p className="category-details">
                      Trình bày thẻ thành viên hợp lệ.
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">Nhà báo</h4>
                  <p className="category-details">
                      Trình bày thẻ báo chí quốc tế hoặc quốc gia.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="tours-activities-section">
            <h3 className="section-subtitle">Chuyến đi và hoạt động</h3>

            <div className="ticket-options">
              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                      GIÁ TRỊ - Guided tours, storytime và học tập
                  </div>
                  <p className="ticket-details">
                      Giá này không bao gồm vé vào bảo tàng.
                  </p>
                </div>
                <div className="ticket-price">12.00 €</div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    VÉ KẾT HỢP - Tham quan có hướng dẫn, kể chuyện và hội thảo +
                    Musée Du Pin
                  </div>
                  <p className="ticket-details">Bao gồm vé vào bảo tàng</p>
                </div>
                <div className="ticket-price">750.000đ</div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                      GIÁ ƯU ĐÃI - Tham quan có hướng dẫn, kể chuyện và hội thảo
                  </div>
                  <p className="ticket-details">Giá ưu đãi có điều kiện</p>
                </div>
                <div className="ticket-price">220.000đ</div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                      GIÁ NHÓM (7-25 người) - Tham quan có hướng dẫn
                  </div>
                  <p className="ticket-details">
                      Giá mỗi người, yêu cầu đặt trước
                  </p>
                </div>
                <div className="ticket-price">200.000đ</div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                      NHÓM HỌC SINH - Tham quan giáo dục có hướng dẫn
                  </div>
                  <p className="ticket-details">
                      Dành cho các nhóm học sinh tiểu học và trung học, bao gồm
                      tài liệu giáo dục
                  </p>
                </div>
                <div className="ticket-price">120.000đ</div>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h3 className="section-subtitle">Phương thức thanh toán</h3>
            <p className="payment-details">
              Các phương thức thanh toán được chấp nhận tại quầy vé bảo tàng bao
              gồm tiền mặt, thẻ ngân hàng và phiếu du lịch 'Chèques-Vacances'.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section
        className={` ${visibleSections.membership ? "visible" : ""}`}
        id="membership"
        ref={sectionRefs.membership}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>THÀNH VIÊN</span>
          </h2>

          <div className="membership-info">
            <h3 className="membership-heading">
                Trở thành thành viên của Hội Bạn bè Musée Du Pin
            </h3>
            <p className="membership-description">
                Hội Bạn bè Musée Du Pin cung cấp nhiều chương trình thành viên
              khác nhau (thanh niên, cá nhân và cặp đôi, gia đình), với mức giá
              từ 350.000đ đến 2.800.000đ.
            </p>
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
          <h3 className="visit-info-title">VÀO VÀ RA</h3>
          <p className="visit-info-text">
            Hãy lên kế hoạch trước những gì bạn muốn làm tại bảo tàng vì khi đã
            ra khỏi bảo tàng sẽ không được vào lại.
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
