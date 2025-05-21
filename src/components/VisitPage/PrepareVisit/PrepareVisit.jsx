import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import TranslatedText from "../../TranslatedText";
import "./PrepareVisit.css";

// Hero section background image
import modernImg from "../../../assets/home/collections/ANewLook.jpg";
import luxuryImg from "../../../assets/home/collections/couture.jpg";
import heroImage from "../../../assets/home/collections/louvre-sunset.jpg";
import budgetImg from "../../../assets/home/collections/mamluks.jpg";
import traditionalImg from "../../../assets/home/collections/Nature.jpg";

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

// Placeholder images for amenities and homestay sections
// In a real application, you'd import actual image files
const placeholderImage = "";
const informationDeskImg = placeholderImage;
const cloakroomImg = placeholderImage;
const equipmentImg = placeholderImage;
const wifiImg = placeholderImage;
const toiletsImg = placeholderImage;
const parkingImg = placeholderImage;
const lostFoundImg = placeholderImage;
const babySpaceImg = placeholderImage;

const PrepareVisit = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("hours");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [showScrollButton, setShowScrollButton] = useState(false);
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

    // Show/hide scroll button
    if (window.scrollY > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
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
      title: "Information Desks",
      description:
        "Two information desks, where visitors can ask any questions to staff members and pick up the museum map. Brochures in 8 languages are available under the Pyramid.",
      image: informationDeskImg,
      icon: "info",
      details: "Our multilingual staff is available from 9am to 7pm daily.",
    },
    {
      id: "cloakroom",
      title: "Cloakroom",
      description:
        "Self-service lockers are available free of charge beneath the Pyramid. Visitors are advised to use the lockers at the entrance. All items placed in the museum lockers must be collected the same day.",
      image: cloakroomImg,
      icon: "hanger",
      details:
        "Free storage for bags up to 55×35×20 cm. Larger items not permitted.",
    },
    {
      id: "equipment",
      title: "Loan of Equipment",
      description:
        "Walking sticks, folding stools, pushchairs, baby carriers, multifunctional rolling chair and wheelchairs are available free of charge from the visitor reception area beneath the Pyramid.",
      image: equipmentImg,
      icon: "stroller",
      details: "Contact our help desk for more information",
    },
    {
      id: "wifi",
      title: "Free Wi-Fi",
      description:
        "The 'Musée Du Pin' network is available under the Pyramid and in the exhibition rooms. The free WiFi connection has one hour limit and can be renewed as many times as needed.",
      image: wifiImg,
      icon: "wifi",
      details: "Connection speed: 50 Mbps",
    },
    {
      id: "toilets",
      title: "Toilets",
      description:
        "Toilets can found in the welcome area under the Pyramid and throughout the museum. There is a baby changing table.",
      image: toiletsImg,
      icon: "toilet",
      details: "All restrooms are accessible to visitors with reduced mobility",
    },
    {
      id: "car-park",
      title: "Car Park",
      description:
        "An underground car park is located at 1 Avenue du Général Lemonnier, from which you can access the museum via the Carrousel entrance. It is especially open 7 days a week from 7am to 11pm.",
      image: parkingImg,
      icon: "parking",
      details:
        "Visitors with disabilities are entitled to a reduced car park rate. This rate can be negotiated at the payment office just before payment.",
    },
    {
      id: "lost-found",
      title: "Lost and Found",
      description:
        "Lost something? If you are still in the museum, head to the Help Desk under the Pyramid and a member of staff should be able to help you.",
      image: lostFoundImg,
      icon: "help",
      details:
        "For items found after your visit, fill out a report form on our website",
    },
    {
      id: "baby-space",
      title: "Baby Space",
      description:
        "The Studio – a special area designed with families in mind, located on the ground floor of the Richelieu wing – has a baby space equipped with a bottle warmer, a microwave oven and a nursing chair.",
      image: babySpaceImg,
      icon: "baby",
      details: "Everything you need for comfort and care with your baby",
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

      {/* Artistic floating elements */}
      <div className="floating-element one"></div>
      <div className="floating-element two"></div>
      <div className="floating-element three"></div>

      <div className="prepare-hero-content">
        <h1 className="prepare-hero-title">
          <TranslatedText>PLAN YOUR VISIT</TranslatedText>
        </h1>
        <p className="prepare-hero-subtitle">
          <TranslatedText>
            Everything you need to know before coming to the museum
          </TranslatedText>
        </p>

        <div className="prepare-hero-cta">
          <Link to="/tickets" className="prepare-hero-button">
            <TranslatedText>Get Tickets</TranslatedText>
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
              <TranslatedText>Opening Hours</TranslatedText>
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
              <TranslatedText>Tickets</TranslatedText>
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
              <TranslatedText>Memberships</TranslatedText>
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
              <TranslatedText>Amenities</TranslatedText>
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
              <TranslatedText>Homestay</TranslatedText>
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
              <TranslatedText>FAQ</TranslatedText>
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
                <TranslatedText>Hours</TranslatedText>
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
                scrollToSection("membership");
              }}
            >
              <span className="mobile-nav-icon">
                <FaUsers />
              </span>
              <span className="mobile-nav-label">
                <TranslatedText>Members</TranslatedText>
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
                <TranslatedText>Services</TranslatedText>
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
                <TranslatedText>Stay</TranslatedText>
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
                <TranslatedText>FAQ</TranslatedText>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };


  // Render Hours Section
  const renderHoursSection = () => (
    <section
      className="prepare-section hours-section"
      id="hours"
      ref={sectionRefs.hours}
    >
      <div className="prepare-section-container">
        <div className="prepare-section-header">
          <div className="section-badge">
            <FaClock />
          </div>
          <h2 className="prepare-section-title">
            <TranslatedText>OPENING HOURS</TranslatedText>
            <span className="title-underline"></span>
          </h2>
          <p className="prepare-section-description">
            <TranslatedText>
              Plan your visit with our current opening schedule
            </TranslatedText>
          </p>
        </div>

        <div className="museum-info-wrapper">
          <div className="museum-info-image">
            <img src={heroImage} alt="Musée Du Pin" />
          </div>
          <div className="museum-info-content">
            <div className="museum-status-bar">
              <h3 className="museum-title">
                <TranslatedText>Musée Du Pin</TranslatedText>
              </h3>
              <div className={`museum-status ${statusClass}`}>
                <span className="status-dot"></span>
                <span className="status-text">
                  <TranslatedText>{statusText}</TranslatedText>
                </span>
              </div>
            </div>

            <div className="museum-hours">
              <div className="hours-row">
                <div className="hours-time">
                  <TranslatedText>Monday</TranslatedText>
                </div>
                <div className="hours-days">
                  <TranslatedText>7:00 AM - 21:00 PM</TranslatedText>
                </div>
              </div>
              <div className="hours-row">
                <div className="hours-time">
                  <TranslatedText>Tuesday</TranslatedText>
                </div>
                <div className="hours-days">
                  <TranslatedText>7:00 AM - 21:00 PM</TranslatedText>
                </div>
              </div>
              <div className="hours-row">
                <div className="hours-time">
                  <TranslatedText>Wednesday</TranslatedText>
                </div>
                <div className="hours-days">
                  <TranslatedText>7:00 AM - 21:00 PM</TranslatedText>
                </div>
              </div>
              <div className="hours-row">
                <div className="hours-time">
                  <TranslatedText>Thursday</TranslatedText>
                </div>
                <div className="hours-days">
                  <TranslatedText>7:00 AM - 21:00 PM</TranslatedText>
                </div>
              </div>
              <div className="hours-row">
                <div className="hours-time">
                  <TranslatedText>Friday</TranslatedText>
                </div>
                <div className="hours-days">
                  <TranslatedText>7:00 AM - 21:00 PM</TranslatedText>
                </div>
              </div>
              <div className="hours-row">
                <div className="hours-time">
                  <TranslatedText>Saturday</TranslatedText>
                </div>
                <div className="hours-days">
                  <TranslatedText>7:00 AM - 21:00 PM</TranslatedText>
                </div>
              </div>
              <div className="hours-row">
                <div className="hours-time">
                  <TranslatedText>Sunday</TranslatedText>
                </div>
                <div className="hours-days">
                  <TranslatedText>7:00 AM - 21:00 PM</TranslatedText>
                </div>
              </div>
            </div>

            <div className="museum-notes">
              <div className="note-item">
                <div className="note-label">
                  <TranslatedText>Public Holidays</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>
                    The museum is closed on January 1, May 1, and December 25.
                  </TranslatedText>
                </div>
              </div>
              <div className="note-item">
                <div className="note-label">
                  <TranslatedText>Night Visits</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>
                    Extended hours until 10:00 PM on Fridays with special guided
                    tours.
                  </TranslatedText>
                </div>
              </div>
              <div className="note-item">
                <div className="note-label">
                  <TranslatedText>Last Admission</TranslatedText>
                </div>
                <div className="note-value">
                  <TranslatedText>
                    Visitors may enter up to 30 minutes before closing time.
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
    <section
      className="prepare-section tickets-section"
      id="tickets"
      ref={sectionRefs.tickets}
    >
      <div className="prepare-section-container">
        <div className="prepare-section-header">
          <div className="section-badge">
            <FaTicketAlt />
          </div>
          <h2 className="prepare-section-title">
            <TranslatedText>TICKETS & PRICING</TranslatedText>
            <span className="title-underline"></span>
          </h2>
          <p className="prepare-section-description">
            <TranslatedText>
              Choose the right ticket option for your museum experience
            </TranslatedText>
          </p>
        </div>

        <div className="tickets-container">
          <div className="ticket-card featured">
            <div className="ticket-header">
              <h3 className="ticket-title">
                <TranslatedText>General Admission</TranslatedText>
              </h3>
              <div className="ticket-price">
                <span className="price-value">€15</span>
              </div>
            </div>
            <div className="ticket-content">
              <ul className="ticket-features">
                <li>
                  <TranslatedText>
                    Access to all permanent collections
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>
                    Audio guide available (additional €5)
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>Valid for one day</TranslatedText>
                </li>
              </ul>
              <div className="ticket-notes">
                <TranslatedText>
                  Free for visitors under 18 and EU residents under 26
                </TranslatedText>
              </div>
              <button className="ticket-button">
                <TranslatedText>Book Now</TranslatedText>
              </button>
            </div>
          </div>

          <div className="ticket-card">
            <div className="ticket-header">
              <h3 className="ticket-title">
                <TranslatedText>Exhibition Pass</TranslatedText>
              </h3>
              <div className="ticket-price">
                <span className="price-value">€25</span>
              </div>
            </div>
            <div className="ticket-content">
              <ul className="ticket-features">
                <li>
                  <TranslatedText>
                    Access to all permanent collections
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>
                    All temporary exhibitions included
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>Audio guide included</TranslatedText>
                </li>
                <li>
                  <TranslatedText>Valid for one day</TranslatedText>
                </li>
              </ul>
              <button className="ticket-button">
                <TranslatedText>Book Now</TranslatedText>
              </button>
            </div>
          </div>

          <div className="ticket-card">
            <div className="ticket-header">
              <h3 className="ticket-title">
                <TranslatedText>Museum Pass</TranslatedText>
              </h3>
              <div className="ticket-price">
                <span className="price-value">€45</span>
              </div>
            </div>
            <div className="ticket-content">
              <ul className="ticket-features">
                <li>
                  <TranslatedText>
                    Unlimited access for 3 consecutive days
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>
                    All collections and exhibitions included
                  </TranslatedText>
                </li>
                <li>
                  <TranslatedText>Skip-the-line privileges</TranslatedText>
                </li>
                <li>
                  <TranslatedText>10% discount at museum shops</TranslatedText>
                </li>
              </ul>
              <button className="ticket-button">
                <TranslatedText>Book Now</TranslatedText>
              </button>
            </div>
          </div>
        </div>

        <div className="tickets-info">
          <div className="info-block">
            <h4 className="info-title">
              <TranslatedText>Free Admission</TranslatedText>
            </h4>
            <p className="info-text">
              <TranslatedText>
                Entry is free for visitors under 18 years old, EU residents
                under 26 years old, disabled visitors and one companion, and for
                everyone on the first Friday of each month.
              </TranslatedText>
            </p>
          </div>
          <div className="info-block">
            <h4 className="info-title">
              <TranslatedText>Group Visits</TranslatedText>
            </h4>
            <p className="info-text">
              <TranslatedText>
                Special rates available for groups of 10 or more people. Please
                contact our group reservations department at least two weeks in
                advance.
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
      className="prepare-section membership-section"
      id="membership"
      ref={sectionRefs.membership}
    >
      <div className="prepare-section-container">
        <div className="prepare-section-header">
          <div className="section-badge">
            <FaUsers />
          </div>
          <h2 className="prepare-section-title">
            <TranslatedText>MEMBERSHIPS</TranslatedText>
            <span className="title-underline"></span>
          </h2>
          <p className="prepare-section-description">
            <TranslatedText>
              Become a member and enjoy exclusive benefits and unlimited access
            </TranslatedText>
          </p>
        </div>

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

          <div className="membership-cards">
            <div className="membership-card">
              <div className="membership-card-header">
                <h4 className="membership-card-title">
                  <TranslatedText>Youth Membership</TranslatedText>
                </h4>
                <div className="membership-card-price">
                  <span className="price-value">€15</span>
                  <span className="price-period">/year</span>
                </div>
              </div>
              <div className="membership-card-content">
                <ul className="membership-benefits">
                  <li>
                    <TranslatedText>
                      For visitors under 26 years old
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Unlimited access to collections
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>Special events for members</TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      10% discount in museum shops
                    </TranslatedText>
                  </li>
                </ul>
                <button className="membership-card-button">
                  <TranslatedText>Join Now</TranslatedText>
                </button>
              </div>
            </div>

            <div className="membership-card featured">
              <div className="membership-card-header">
                <div className="card-badge">
                  <TranslatedText>Most Popular</TranslatedText>
                </div>
                <h4 className="membership-card-title">
                  <TranslatedText>Solo Membership</TranslatedText>
                </h4>
                <div className="membership-card-price">
                  <span className="price-value">€60</span>
                  <span className="price-period">/year</span>
                </div>
              </div>
              <div className="membership-card-content">
                <ul className="membership-benefits">
                  <li>
                    <TranslatedText>
                      Unlimited access for one person
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Fast-track entry to exhibitions
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Access to member-only events
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      15% discount in museum shops
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Subscription to quarterly magazine
                    </TranslatedText>
                  </li>
                </ul>
                <button className="membership-card-button featured">
                  <TranslatedText>Join Now</TranslatedText>
                </button>
              </div>
            </div>

            <div className="membership-card">
              <div className="membership-card-header">
                <h4 className="membership-card-title">
                  <TranslatedText>Family Membership</TranslatedText>
                </h4>
                <div className="membership-card-price">
                  <span className="price-value">€120</span>
                  <span className="price-period">/year</span>
                </div>
              </div>
              <div className="membership-card-content">
                <ul className="membership-benefits">
                  <li>
                    <TranslatedText>
                      Covers 2 adults and up to 4 children
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Unlimited access for the family
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      Special access to family workshops
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      20% discount on educational programs
                    </TranslatedText>
                  </li>
                  <li>
                    <TranslatedText>
                      15% discount in museum shops
                    </TranslatedText>
                  </li>
                </ul>
                <button className="membership-card-button">
                  <TranslatedText>Join Now</TranslatedText>
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
      {/* Decorative elements */}
      <div className="decorative-lines"></div>
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>
      <div className="decorative-dots-pattern"></div>

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
      question: "Can I visit the museum for free? Do I have to book tickets?",
      answer:
        "The museum offers free admission to several categories of visitors including those under 18 years old, EU residents under 26, and disabled visitors with a companion. Free entry is also available to everyone on the first Friday of each month from 6 PM (except July and August). We recommend booking a time slot in advance, even for free-admission visitors, especially during peak seasons.",
    },
    {
      question: "How can I buy a ticket at concession price?",
      answer:
        "Concession tickets are available for young adults aged 18-25 from countries outside the EU, holders of the Education Pass, and members of partner organizations. You must present a valid ID or membership card at the entrance. Concession tickets can be purchased online or at the ticket office.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Tickets are non-refundable once purchased. However, in case of museum closure for exceptional reasons, we will offer a refund or an alternative date. For special circumstances, please contact our visitor services at visitor@museedupin.com with your booking reference and reasons for requesting a refund.",
    },
    {
      question: "Which entrance do I use if I have bought tickets online?",
      answer:
        "Visitors with e-tickets can enter through the Pyramid entrance (main entrance) or the Porte des Lions entrance. The Carrousel entrance is reserved for groups and museum pass holders. Your e-ticket includes a QR code that will be scanned at the entrance. We recommend arriving 15 minutes before your reserved time slot.",
    },
    {
      question: "Are prams allowed in the museum?",
      answer:
        "Yes, prams and strollers are allowed in the museum. However, during very busy periods, you may be asked to leave larger strollers at the cloakroom and use baby carriers instead, which are available free of charge. All galleries and exhibition spaces are accessible with strollers via elevators.",
    },
    {
      question: "What items are not allowed in the museum?",
      answer:
        "Items not permitted inside the museum include large bags and suitcases (larger than 55×35×20 cm), tripods, selfie sticks, flash photography equipment, food and drinks (except water bottles), and sharp objects. These items must be left in the cloakroom. We also prohibit touching the artworks, smoking, and using mobile phones in the galleries.",
    },
  ];

  // Enhanced Homestay Section
  const renderHomestaySection = () => (
    <section
      className="prepare-section homestay-section"
      id="homestay"
      ref={sectionRefs.homestay}
    >
      {/* Decorative elements */}
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>
      <div className="decorative-square"></div>
      <div className="decorative-dot"></div>

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
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>

      <div className="faq-container">
        <div className="faq-header">
          <div className="section-badge">
            <FaQuestion />
          </div>
          <h2 className="faq-title">
            <TranslatedText>Frequently asked questions</TranslatedText>
          </h2>
          <p className="faq-subtitle">
            <TranslatedText>Answers from the Musée Du Pin.</TranslatedText>
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
            <TranslatedText>Didn't find your answer?</TranslatedText>
          </h3>
          <p className="faq-footer-text">
            <TranslatedText>
              Contact our support team for more information.
            </TranslatedText>
          </p>
          <button className="contact-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <TranslatedText>Contact Us</TranslatedText>
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
