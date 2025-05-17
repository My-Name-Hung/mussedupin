import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../../../components/TranslatedText";
import "./Collections.css";

// Import existing images from the project
import painting1 from "../../../assets/home/collections/ANewLook.jpg";
import painting2 from "../../../assets/home/collections/beautes.jpg";
import painting3 from "../../../assets/home/collections/couture.jpg";
import heroImage from "../../../assets/home/collections/louvre-sunset.jpg";
import painting4 from "../../../assets/home/collections/mamluks.jpg";
import painting5 from "../../../assets/home/collections/Masterpieces.jpg";
import painting6 from "../../../assets/home/collections/Nature.jpg";
import painting7 from "../../../assets/home/collections/portrait.jpg";
import painting8 from "../../../assets/home/collections/TheMetAu.jpg";

const collectionsData = [
  {
    id: 1,
    title: "The Floor Planers",
    artist: "Gustave Caillebotte",
    image: painting1,
    alt: "The Floor Planers painting by Gustave Caillebotte",
  },
  {
    id: 2,
    title: "La Goulue arriving at the Moulin Rouge",
    artist: "Henri de Toulouse-Lautrec",
    image: painting2,
    alt: "Painting by Henri de Toulouse-Lautrec",
  },
  {
    id: 3,
    title: "Water Lilies",
    artist: "Claude Monet",
    image: painting3,
    alt: "Water Lilies by Claude Monet",
  },
  {
    id: 4,
    title: "Noon: Rest from Work",
    artist: "Vincent van Gogh",
    image: painting4,
    alt: "Noon: Rest from Work by Vincent van Gogh",
  },
  {
    id: 5,
    title: "Buddha in the Garden",
    artist: "Odilon Redon",
    image: painting5,
    alt: "Buddha in the Garden by Odilon Redon",
  },
  {
    id: 6,
    title: "Vanity Table",
    artist: "French Decorative Arts",
    image: painting6,
    alt: "Gold vanity table from French decorative arts collection",
  },
  {
    id: 7,
    title: "Twilight Landscape",
    artist: "Eugène Jansson",
    image: painting7,
    alt: "Twilight Landscape by Eugène Jansson",
  },
  {
    id: 8,
    title: "Dr. Gachet",
    artist: "Vincent van Gogh",
    image: painting8,
    alt: "Portrait of Dr. Gachet by Vincent van Gogh",
  },
  {
    id: 9,
    title: "Notre-Dame View",
    artist: "Henri Matisse",
    image: heroImage,
    alt: "Notre-Dame View by Henri Matisse",
  },
  {
    id: 10,
    title: "Woman with Hat",
    artist: "Henri Matisse",
    image: painting5,
    alt: "Woman with Hat by Henri Matisse",
  },
];

// Define wave pattern offsets for each item
const getWaveOffset = (index) => {
  // Create a wavy pattern with alternating up and down positions
  const patterns = [-25, 35, -15, 20, -30, 40, -20, 30, -10, 25];

  return patterns[index % patterns.length];
};

// Define varied sizes for more artistic layout
const getItemSize = (index) => {
  const sizes = [
    { width: 280, height: 320 },
    { width: 260, height: 340 },
    { width: 290, height: 300 },
    { width: 270, height: 330 },
    { width: 300, height: 310 },
  ];

  return sizes[index % sizes.length];
};

const Collections = () => {
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [hoverItemIndex, setHoverItemIndex] = useState(null);

  // Check device type
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsDesktop(width >= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle visibility detection with smoother threshold
  useEffect(() => {
    const options = {
      threshold: [0.1, 0.2, 0.5, 0.8],
      rootMargin: "0px 0px 100px 0px", // Preload before fully visible
    };

    const handleVisibilityChange = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Gradually fade in based on intersection ratio
        const ratio = Math.min(entry.intersectionRatio * 1.5, 1);
        if (ratio > 0.2) {
          setIsVisible(true);
        }
      } else if (entry.intersectionRatio === 0) {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(handleVisibilityChange, options);

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => {
      if (scrollContainerRef.current) {
        observer.unobserve(scrollContainerRef.current);
      }
    };
  }, []);

  // Calculate widths for scroll animation with debounce
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    const calculateWidths = () => {
      if (scrollContainerRef.current) {
        const containerWidth = scrollContainerRef.current.clientWidth;
        const contentWidth = scrollContainerRef.current.scrollWidth;

        setContainerWidth(containerWidth);
        setContentWidth(contentWidth);
      }
    };

    // Use ResizeObserver for more precise updates
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(calculateWidths);
      resizeObserver.observe(scrollContainerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback for browsers without ResizeObserver
      calculateWidths();

      let debounceTimer;
      const handleResize = () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(calculateWidths, 100);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        clearTimeout(debounceTimer);
      };
    }
  }, []);

  // Enhanced auto-scroll animation with variable speed and smoother transitions
  useEffect(() => {
    if (!isVisible || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // On desktop with enough width, don't scroll automatically
    if (isDesktop && contentWidth <= containerWidth * 1.5) {
      return;
    }

    // Enhanced scroll speed for desktop
    const baseScrollSpeed = isMobile ? 0.5 : isDesktop ? 0.8 : 1.2;
    const maxScroll = contentWidth - containerWidth;

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const elapsed = timestamp - lastTimestampRef.current;

      // Optimized speed calculation for desktop
      let scrollSpeed = baseScrollSpeed;

      if (isDesktop) {
        // Slower, more elegant scrolling for desktop users
        scrollSpeed =
          baseScrollSpeed *
          (Math.min(contentWidth / 4000, 1.2) + (isDesktop ? 0.3 : 0.5));
      } else {
        // Original speed calculation for other devices
        scrollSpeed =
          baseScrollSpeed *
          (Math.min(contentWidth / 3000, 1.5) + (isMobile ? 0.2 : 0.5));
      }

      setScrollPosition((prevPosition) => {
        // Enhanced easing function for desktop
        const easing = isDesktop
          ? 1 - Math.sin((prevPosition / maxScroll) * Math.PI) * 0.15
          : 1 - Math.sin((prevPosition / maxScroll) * Math.PI) * 0.1;

        const newPosition =
          prevPosition + scrollSpeed * (elapsed / 16) * easing;

        // Smooth loop with improved transition
        if (newPosition >= maxScroll) {
          // Enhanced transition for desktop
          return isDesktop ? 0.05 : 0.1;
        }
        return newPosition;
      });

      lastTimestampRef.current = timestamp;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      lastTimestampRef.current = null;
    };
  }, [isVisible, containerWidth, contentWidth, isPaused, isMobile, isDesktop]);

  // Update scroll position on DOM with performance optimization
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Use transform for better performance on all devices, including mobile
      scrollContainerRef.current.style.transform = `translateX(-${scrollPosition}px)`;
      scrollContainerRef.current.style.willChange = "transform"; // Performance hint
    }
  }, [scrollPosition]);

  // Enhanced item hover handlers for desktop
  const handleItemHover = (index) => {
    if (isDesktop) {
      setHoverItemIndex(index);
    }
  };

  const handleItemLeave = () => {
    if (isDesktop) {
      setHoverItemIndex(null);
    }
  };

  // Pause scrolling on hover or touch with improved mobile handling
  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);
  const handleTouchStart = () => setIsPaused(true);
  const handleTouchEnd = () => {
    // Add delay before resuming to improve mobile experience
    setTimeout(() => setIsPaused(false), 800); // Reduced delay for more responsive feel
  };

  return (
    <section className="collections-section" id="collections">
      <div className="collections-header">
        <h2 className="collections-title">
          <TranslatedText>The collections</TranslatedText>
        </h2>
        {isDesktop && (
          <p className="collections-subtitle">
            <TranslatedText>
              Explore our prestigious art collection
            </TranslatedText>
          </p>
        )}
      </div>

      <div
        className={`collections-gallery-container ${
          isVisible ? "visible" : ""
        } ${isDesktop ? "desktop-view" : ""} wavy-gallery`}
      >
        {isDesktop && <div className="shadow-effect"></div>}
        {isDesktop && <div className="left-fade"></div>}

        <div
          className="collections-gallery"
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={isMobile ? { overflow: "visible" } : {}}
        >
          <div className="collection-inner-container">
            {collectionsData.map((item, index) => {
              const waveOffset = getWaveOffset(index);
              const itemSize = getItemSize(index);

              return (
                <div
                  key={item.id}
                  className={`collection-item ${
                    hoverItemIndex === index ? "item-hovered" : ""
                  }`}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateY(${waveOffset}px)`,
                    width: `${itemSize.width}px`,
                    height: `${itemSize.height}px`,
                    transition: "transform 0.5s ease, scale 0.3s ease",
                  }}
                  onMouseEnter={() => handleItemHover(index)}
                  onMouseLeave={handleItemLeave}
                >
                  <Link to="/collections" className="collection-link">
                    <div className="collection-image-wrapper">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="collection-image"
                        loading={index < 5 ? "eager" : "lazy"}
                      />
                      <div className="collection-overlay">
                        <div className="collection-info">
                          <h3 className="collection-title">
                            <TranslatedText>{item.title}</TranslatedText>
                          </h3>
                          <p className="collection-artist">
                            <TranslatedText>{item.artist}</TranslatedText>
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="collections-footer">
        <Link to="/collections" className="view-all-link">
          <TranslatedText>View all collections</TranslatedText>
          <span className="arrow-icon">→</span>
        </Link>
      </div>
    </section>
  );
};

export default Collections;
