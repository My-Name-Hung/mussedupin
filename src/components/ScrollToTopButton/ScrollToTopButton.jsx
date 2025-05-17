import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TranslatedText from "../TranslatedText";
import "./ScrollToTopButton.css";

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

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

  useEffect(() => {
    // Reset visibility on page change
    setVisible(false);

    const setupObserver = () => {
      // Try to find significant page sections by various selectors
      const firstSection =
        document.querySelector("section:first-of-type") ||
        document.querySelector(".hero-container") ||
        document.querySelector(".dupin-plus-header") ||
        document.querySelector("header:first-of-type") ||
        document.querySelector(".main-content") ||
        document.querySelector("main > div:first-child");

      // Use either explicit second section or just use scroll position as fallback
      const secondSection =
        document.querySelector("section:nth-of-type(2)") ||
        document.querySelector(".highlights-section") ||
        document.querySelector(".collections-section") ||
        document.querySelector(".filter-section");

      // If we can't find proper sections, fall back to scroll position
      if (!firstSection || !secondSection) {
        // Fallback: Use scroll position
        const handleScroll = () => {
          // Show button when scrolled down more than 200px on mobile, 300px on desktop
          const scrollThreshold = isMobile ? 200 : 300;
          const scrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          setVisible(scrollTop > scrollThreshold);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }

      // Observer options
      const options = {
        root: null,
        rootMargin: isMobile ? "-5% 0px" : "-10% 0px", // More sensitive on mobile
        threshold: 0,
      };

      // Observer for the first section (to hide button when at top)
      const firstSectionObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(false);
        }
      }, options);

      // Observer for the second section (to show button when scrolled down)
      const secondSectionObserver = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setVisible(true);
        }
      }, options);

      firstSectionObserver.observe(firstSection);
      secondSectionObserver.observe(secondSection);

      return () => {
        firstSectionObserver.disconnect();
        secondSectionObserver.disconnect();
      };
    };

    // Wait for the DOM to be fully loaded before setting up observers
    const timer = setTimeout(() => {
      setupObserver();
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, isMobile]); // Re-run when route changes or mobile status changes

  const scrollToTop = () => {
    // Smoother scroll on desktop, faster on mobile
    window.scrollTo({
      top: 0,
      behavior: isMobile ? "auto" : "smooth",
    });
  };

  return (
    <button
      className={`scroll-to-top-button ${visible ? "visible" : ""}`}
      onClick={scrollToTop}
      aria-label={<TranslatedText>Scroll to top</TranslatedText>}
    >
      <svg
        viewBox="0 0 16 16"
        width="1em"
        height="1em"
        focusable="false"
        fill="currentColor"
        aria-hidden="true"
        className="SvgRWrapper"
      >
        <path d="m3.7 6.7 3.8-3.8V15h1V2.9l3.8 3.8.7-.7-5-5-5 5z"></path>
      </svg>
    </button>
  );
};

export default ScrollToTopButton;
