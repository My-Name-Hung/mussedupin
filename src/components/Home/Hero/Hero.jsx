import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getCurrentLanguage, translateText } from "../../../utils/translate";
import OptimizedVideo from "../../OptimizedVideo/OptimizedVideo";
import "./Hero.css";

// SVG Icons
const ArrowIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
    className="hours-arrow"
  >
    <path d="M17 8v3.25H2v1.5h15V16l5.24-4z"></path>
  </svg>
);

const TicketIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="1.5em"
    height="1.5em"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
    className="button-icon"
  >
    <path d="M9.13.5a.9.9 0 0 1 1.28 0l1.17 1.18c.2.2.3.5.25.79a1.48 1.48 0 0 0 1.7 1.7c.3-.04.59.05.79.25l1.17 1.17a.9.9 0 0 1 0 1.28L6.87 15.5a.9.9 0 0 1-1.28 0L.51 10.41a.9.9 0 0 1 0-1.28zm.64.78L1.28 9.77l4.95 4.95 8.49-8.49-1.1-1.1c-.74.15-1.52-.1-2.08-.67s-.82-1.34-.7-2.14L9.77 1.28zm.53 5.13c.1-.1.25-.1.35 0l.35.35c.1.1.1.26 0 .36l-4.59 4.6a.27.27 0 0 1-.36 0l-.35-.36a.25.25 0 0 1 0-.36l4.6-4.59zm-2.24-.59c.1-.1.26-.1.35 0l.36.35c.1.1.1.26 0 .36L5 10.3c-.1.1-.26.1-.36 0l-.35-.35a.25.25 0 0 1 0-.36l3.77-3.77z"></path>
  </svg>
);

const InfoIcon = () => (
  <svg
    viewBox="0 0 16 16"
    width="1.5em"
    height="1.5em"
    fill="currentColor"
    focusable="false"
    aria-hidden="true"
    className="button-icon"
  >
    <path d="M8 1a7 7 0 1 1 0 14A7 7 0 0 1 8 1zm0 .97a6.03 6.03 0 1 0 0 12.06A6.03 6.03 0 0 0 8 1.97zm0 2.14c.32 0 .58.26.58.58v4.28a.58.58 0 1 1-1.16 0V4.7c0-.32.26-.58.58-.58zm0 7.78a.78.78 0 1 0 0-1.56.78.78 0 0 0 0 1.56z"></path>
  </svg>
);

const ChevronDown = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="prepare-visit-arrow"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronUp = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="prepare-visit-arrow"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const Hero = () => {
  const [isPrepareOpen, setIsPrepareOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [translations, setTranslations] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const heroRef = useRef(null);

  // Handle video loading
  const handleVideoCanPlay = () => {
    console.log("Hero video loaded successfully");
    setIsVideoLoaded(true);
  };

  const handleVideoError = () => {
    console.error("Hero video failed to load");
  };

  // Load translations with optimization
  useEffect(() => {
    const loadTranslations = async () => {
      const language = getCurrentLanguage();
      setCurrentLanguage(language);

      // Use Promise.all for parallel translation loading
      const [
        titleText,
        welcomeText,
        museumOpenText,
        bookTicketText,
        prepareVisitText,
        prepareVisitCapsText,
        timeStartText,
        timeEndText,
      ] = await Promise.all([
        translateText("Escape with the", language),
        translateText("Welcome to the", language),
        translateText("The museum is open today", language),
        translateText("Book a ticket", language),
        translateText("Prepare your visit", language),
        translateText("Chuẩn bị tham quan", language),
        translateText("7:00 AM", language),
        translateText("21:00 PM", language),
      ]);

      const translatedTexts = {
        title: titleText + " Musée Du Pin",
        welcomeTitle: welcomeText + " Musée Du Pin",
        museumOpen: museumOpenText,
        bookTicket: bookTicketText,
        prepareVisit: prepareVisitText,
        prepareVisitCaps: prepareVisitCapsText,
        imgAlt: "Bảo tàng hoạt động từ - Musée Du Pin",
        timeStart: timeStartText,
        timeEnd: timeEndText,
      };

      setTranslations(translatedTexts);
    };

    loadTranslations();

    // Listen for language changes
    const handleLanguageChange = () => {
      const newLanguage = getCurrentLanguage();
      if (newLanguage !== currentLanguage) {
        setCurrentLanguage(newLanguage);
      }
    };

    window.addEventListener("storage", handleLanguageChange);
    return () => {
      window.removeEventListener("storage", handleLanguageChange);
    };
  }, [currentLanguage]);

  // Check mobile with debounce
  useEffect(() => {
    let timeoutId;
    const checkIfMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth <= 768);
      }, 100);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      clearTimeout(timeoutId);
    };
  }, []);

  const togglePrepareVisit = () => {
    setIsPrepareOpen(!isPrepareOpen);
  };

  return (
    <>
      <section className="hero-container" ref={heroRef}>
        <div className="hero-image-container">
          <OptimizedVideo
            src="0531_resize.mp4"
            poster="hero-poster.webp"
            autoPlay={true}
            muted={true}
            loop={true}
            playsInline={true}
            priority={true}
            width="1920"
            height="1080"
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
            className={`hero-video ${isVideoLoaded ? "loaded" : ""}`}
            style={{
              width: "100%",
              height: "100%",
            }}
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            {/* Add structured data for SEO */}
            <script type="application/ld+json">
              {JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Museum",
                name: "Musée Du Pin",
                description:
                  "Bảo tàng Thông - Nơi gìn giữ và nâng niu những giá trị Đà Lạt",
                openingHours: "Mo-Su 07:00-21:00",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "29-31 Đống Đa, Phường 3",
                  addressLocality: "Đà Lạt",
                  addressCountry: "VN",
                },
              })}
            </script>
          </div>
        </div>
      </section>

      {/* Mobile hero-info-panel khi toggle */}
      {isMobile && (
        <div className="mobile-hero-controller">
          <div className="mobile-prepare-visit" onClick={togglePrepareVisit}>
            <span>{translations.prepareVisitCaps || "Chuẩn bị tham quan"}</span>
            {isPrepareOpen ? <ChevronDown /> : <ChevronUp />}
          </div>
        </div>
      )}

      <div
        className={`hero-info-panel ${
          isPrepareOpen || !isMobile ? "open" : ""
        }`}
      >
        <div className="info-panel-content">
          <div className="info-panel-left">
            <h2 className="info-panel-title">Chào mừng đến với Musée Du Pin</h2>
            <p className="info-panel-status">Bảo tàng đang mở cửa</p>
            <p className="info-panel-hours">
              <span>{translations.timeStart || "7:00 AM"}</span>
              <ArrowIcon />
              <span>{translations.timeEnd || "21:00 PM"}</span>
            </p>
          </div>

          <div className="info-panel-separator"></div>

          <div className="info-panel-right">
            <Link
              to="/tickets"
              className="info-panel-button btn-primary"
              aria-label="Đặt vé tham quan bảo tàng"
            >
              <TicketIcon />
              Đặt vé
            </Link>
            <Link
              to="https://online-museeduphin.netlify.app/"
              className="info-panel-button btn-secondary"
              aria-label="Mua quà lưu niệm trực tuyến"
              target="_blank"
              rel="noopener noreferrer"
            >
              <InfoIcon />
              Quà lưu niệm
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
