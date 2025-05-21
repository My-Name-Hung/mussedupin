import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TranslatedText from "../../TranslatedText";
import "./Visit.css";

// Hero section background image
import heroImage from "../../../assets/home/collections/louvre-sunset.jpg";

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
    const statusText = "open today from 7:00 AM to 21:00 PM";
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
        <img src={heroImage} alt="Musée Du Pin" className="visit-hero-image" />
        <div className="visit-hero-overlay"></div>
      </div>
      <div className="visit-hero-content">
        <h1 className="visit-hero-title">
          <TranslatedText>HOURS & ADMISSION</TranslatedText>
        </h1>
        <p className="visit-hero-subtitle">
          <TranslatedText>Plan and book your visit</TranslatedText>
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
                <TranslatedText>When to visit</TranslatedText>
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
                <TranslatedText>Ticket prices</TranslatedText>
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
                <TranslatedText>Memberships</TranslatedText>
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
        <img src={heroImage} alt="Musée Du Pin" />
        {isMobile && <div className="info-image-overlay"></div>}
      </div>

      <div className="museum-info-content">
        <div className="museum-status-bar">
          <div className={`museum-status ${statusClass}`}>
            <span className="status-dot"></span>
            <TranslatedText>The museum is {statusText}</TranslatedText>
          </div>
        </div>

        <div className="museum-hours">
          <div className={`hours-row ${isMobile ? "touch-friendly" : ""}`}>
            <div className="hours-time">
              <span>
                <TranslatedText>7:00 AM → 21:00 PM</TranslatedText>
              </span>
            </div>
            <div className="hours-days">
              <span>
                <TranslatedText>Monday to Sunday</TranslatedText>
              </span>
            </div>
          </div>
        </div>

        <div className="museum-notes">
          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">
              <TranslatedText>Last entry:</TranslatedText>
            </div>
            <div className="note-value">
              <TranslatedText>1 hour before closing</TranslatedText>
            </div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">
              <TranslatedText>Clearing of rooms:</TranslatedText>
            </div>
            <div className="note-value">
              <TranslatedText>30 minutes before closing</TranslatedText>
            </div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">
              <TranslatedText>Public holidays:</TranslatedText>
            </div>
            <div className="note-value">
              <TranslatedText>
                the Musée Du Pin is closed on 1 January, 1 May and 25 December.
                It remains open on all other public holidays unless they fall on
                a Tuesday, the museum's day of closure.
              </TranslatedText>
            </div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">
              <TranslatedText>The Cour Carrée</TranslatedText>
            </div>
            <div className="note-value">
              <TranslatedText>closes at 11pm.</TranslatedText>
            </div>
          </div>

          <div className={`note-item ${isMobile ? "touch-friendly" : ""}`}>
            <div className="note-label">
              <TranslatedText>The Cour Carrée</TranslatedText>
            </div>
            <div className="note-value">
              <TranslatedText>
                will be closed from 7 April to 25 June 2025.
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
            <TranslatedText>General admission</TranslatedText>
          </div>
        </div>
        <div className="ticket-price">
          <TranslatedText>$22.00</TranslatedText>
        </div>
      </div>

      <div className={`ticket-option ${isMobile ? "touch-card" : ""}`}>
        <div className="ticket-option-details">
          <div className="ticket-type">
            <TranslatedText>
              Under 18 year olds, under 26 year old residents of the EEA
            </TranslatedText>
          </div>
          <a href="#" className="ticket-link" onClick={handleFullListClick}>
            <TranslatedText>
              See full list of visitors eligible for free admission
            </TranslatedText>
          </a>
        </div>
        <div className="ticket-price highlighted">
          <TranslatedText>FREE</TranslatedText>
        </div>
      </div>

      <div className={`ticket-option ${isMobile ? "touch-card" : ""}`}>
        <div className="ticket-option-details">
          <div className="ticket-type">
            <TranslatedText>
              Are you coming in a group (7 or more people)?
            </TranslatedText>
          </div>
          <a href="#" className="ticket-link" onClick={handleGroupPricesClick}>
            <TranslatedText>See group prices</TranslatedText>
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
                <TranslatedText>When to visit</TranslatedText>
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
                <TranslatedText>Tickets</TranslatedText>
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
                <TranslatedText>Memberships</TranslatedText>
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
              <TranslatedText>WHEN TO VISIT</TranslatedText>
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
        className={`visit-section tickets-section ${
          visibleSections.tickets ? "visible" : ""
        }`}
        id="tickets"
        ref={sectionRefs.tickets}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>
              <TranslatedText>TICKET PRICES</TranslatedText>
            </span>
          </h2>

          <div className="ticket-intro">
            <p className="ticket-description">
              <TranslatedText>
                A ticket gives you access to the permanent collections and
                temporary exhibitions of the Musée Du Pin, as well as to the
                Eugène-Delacroix National Museum the same day and the day after
                your visit of the Musée Du Pin museum.
              </TranslatedText>
            </p>
            <div className="ticket-note">
              <TranslatedText>
                Tickets may be purchased on site when museum attendance is low
                (subject to availability).
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
                  VISITORS ELIGIBLE FOR FREE ADMISSION
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
                  Time-slot bookings are recommended, including for
                  free-admission visitors.
                </TranslatedText>
              </p>

              <p className="section-subtitle">
                <TranslatedText>
                  Admission is free for the following visitors:
                </TranslatedText>
              </p>

              <div className="visitor-category">
                <h4 className="category-title">
                  <TranslatedText>Under 18s</TranslatedText>
                </h4>
                <p className="category-details">
                  <TranslatedText>Proof of ID required.</TranslatedText>
                </p>
              </div>

              <div className="visitor-category">
                <h4 className="category-title">
                  <TranslatedText>
                    Under 26 year-old residents of the European Economic Area
                    (EU, Norway, Iceland, and Liechtenstein)
                  </TranslatedText>
                </h4>
                <p className="category-details">
                  <TranslatedText>
                    Proof of ID and residency required.
                  </TranslatedText>
                </p>
              </div>

              <div className="visitor-category">
                <h4 className="category-title">
                  <TranslatedText>All visitors</TranslatedText>
                </h4>
                <p className="category-details">
                  <TranslatedText>
                    On the first Friday of the month after 6 p.m. (except in
                    July and August)
                  </TranslatedText>
                </p>
              </div>

              <div className="visitor-category-separator">
                <TranslatedText>And:</TranslatedText>
              </div>

              <div className="visitor-categories-grid">
                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>
                      Disabled visitors and the person accompanying them
                    </TranslatedText>
                  </h4>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>
                      Art teachers (plastic arts, archeology, applied arts,
                      architecture and art history only)
                    </TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Present proof of subject taught.
                    </TranslatedText>
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>
                      Artists affiliated to the AIAP (Association Internationale
                      des Arts Plastiques)
                    </TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Present valid membership card or certificate.
                    </TranslatedText>
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>ICOM and ICOMOS members</TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Present valid membership card.
                    </TranslatedText>
                  </p>
                </div>

                <div className="visitor-category">
                  <h4 className="category-title">
                    <TranslatedText>Journalists</TranslatedText>
                  </h4>
                  <p className="category-details">
                    <TranslatedText>
                      Present national or international press card.
                    </TranslatedText>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="tours-activities-section">
            <h3 className="section-subtitle">
              <TranslatedText>Tours & activities</TranslatedText>
            </h3>

            <div className="ticket-options">
              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      FULL PRICE - Guided tours, storytime and workshops
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      This price does not include admission to the museum.
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>$12.00</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      COMBINED TICKET - Guided tours, storytime and workshops +
                      Musée Du Pin
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      Including museum admission ticket
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>$31.00</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      REDUCED PRICE - Guided tours, storytime and workshops
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      Reduced rate with restrictions
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>$9.00</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      GROUP PRICE (7-25 people) - Guided tours
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      Price per person, advance booking required
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>$8.00</TranslatedText>
                </div>
              </div>

              <div className="ticket-option">
                <div className="ticket-option-details">
                  <div className="ticket-type">
                    <TranslatedText>
                      SCHOOL GROUPS - Guided educational tours
                    </TranslatedText>
                  </div>
                  <p className="ticket-details">
                    <TranslatedText>
                      For primary and secondary school groups, includes
                      educational materials
                    </TranslatedText>
                  </p>
                </div>
                <div className="ticket-price">
                  <TranslatedText>$5.00</TranslatedText>
                </div>
              </div>
            </div>
          </div>

          <div className="payment-section">
            <h3 className="section-subtitle">
              <TranslatedText>Payment methods</TranslatedText>
            </h3>
            <p className="payment-details">
              <TranslatedText>
                The payment methods accepted at the museum ticket office are
                cash, bank card and 'Chèques-Vacances' holiday vouchers.
              </TranslatedText>
            </p>
            <div className="payment-image">
              <img src={heroImage} alt="Payment at Musée Du Pin" />
            </div>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section
        className={`visit-section membership-section ${
          visibleSections.membership ? "visible" : ""
        }`}
        id="membership"
        ref={sectionRefs.membership}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>
              <TranslatedText>MEMBERSHIPS</TranslatedText>
            </span>
          </h2>

          <div className="membership-info">
            <h3 className="membership-heading">
              <TranslatedText>
                Become a member of the Amis du Musée Du Pin
              </TranslatedText>
            </h3>
            <p className="membership-description">
              <TranslatedText>
                The Amis du Musée Du Pin offers a range of membership programmes
                (youth, solo and duo, family), with prices ranging from €15 to
                €120.
              </TranslatedText>
            </p>

            <div className="membership-card-image">
              <img src={heroImage} alt="Amis du Musée Du Pin membership card" />
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
            <TranslatedText>ADMISSION AND EXIT</TranslatedText>
          </h3>
          <p className="visit-info-text">
            <TranslatedText>
              Think ahead of everything you would like to do at the museum as
              any exit is final.
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
