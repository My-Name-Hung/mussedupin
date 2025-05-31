import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../../../components/TranslatedText";
import { useAssets } from "../../../hooks/useAssets";
import "./Collections.css";

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
  const [touchStartX, setTouchStartX] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [touchVelocity, setTouchVelocity] = useState(0);
  const { assets, loading, error, getAssetUrl } = useAssets();

  // Check device type
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsDesktop(width >= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Hide swipe hint after 5 seconds
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isMobile]);

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
      // Use hardware-accelerated transforms for better performance
      if (isMobile) {
        scrollContainerRef.current.style.transform = `translateX(-${scrollPosition}px)`;
      } else {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }
  }, [scrollPosition, isMobile]);

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

  // Enhanced touch handling
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setIsUserInteracting(true);
    setTouchStartX(e.touches[0].clientX);
    setLastTouchX(e.touches[0].clientX);
    setLastTouchTime(Date.now());
    setShowSwipeHint(false); // Hide hint when user interacts
  };

  const handleTouchEnd = () => {
    setIsUserInteracting(false);

    // Apply momentum scrolling
    if (Math.abs(touchVelocity) > 0.5) {
      const momentum = touchVelocity * 100;
      const targetScroll = scrollPosition + momentum;

      // Animate to target with easing
      const startScroll = scrollPosition;
      const startTime = Date.now();
      const duration = 500;

      const animateMomentum = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Easing function
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const currentProgress = easeOut(progress);

        const newScroll =
          startScroll + (targetScroll - startScroll) * currentProgress;

        setScrollPosition(
          Math.max(0, Math.min(newScroll, contentWidth - containerWidth))
        );

        if (progress < 1) {
          requestAnimationFrame(animateMomentum);
        } else {
          // Resume auto-scroll after momentum ends and 1s delay
          setTimeout(() => {
            setIsPaused(false);
          }, 1000);
        }
      };

      requestAnimationFrame(animateMomentum);
    } else {
      // If no momentum, resume auto-scroll after 1s
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  };

  const handleTouchMove = (e) => {
    if (isUserInteracting && scrollContainerRef.current) {
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;

      // Calculate velocity
      const now = Date.now();
      const deltaTime = now - lastTouchTime;
      const deltaX = touchX - lastTouchX;
      setTouchVelocity(deltaX / deltaTime);

      // Update last position and time
      setLastTouchX(touchX);
      setLastTouchTime(now);

      // Update scroll position with improved sensitivity and smoothing
      setScrollPosition((prev) => {
        const sensitivity = 1.2;
        const newPosition = prev + diff * sensitivity;
        setTouchStartX(touchX);

        // Add resistance at edges
        if (newPosition < 0) {
          return Math.max(newPosition * 0.5, -containerWidth * 0.1);
        }
        if (newPosition > contentWidth - containerWidth) {
          const overscroll = newPosition - (contentWidth - containerWidth);
          return contentWidth - containerWidth + overscroll * 0.5;
        }

        return newPosition;
      });
    }
  };

  // Map collectionsData to use asset URLs
  const collectionsDataWithAssets = collectionsData.map((item) => {
    const asset = assets.find(
      (a) => a.filename && item.image.includes(a.filename)
    );
    return asset ? { ...item, image: getAssetUrl(asset.filename) } : item;
  });

  return (
    <section className="collections-section" id="collections">
      <div className="collections-content-container">
        <div className="collections-header">
          <h2 className="collections-title">
            <TranslatedText>Bộ sưu tập</TranslatedText>
          </h2>
          {isDesktop && (
            <p className="collections-subtitle">
              <TranslatedText>Khám phá bộ sưu tập nghệ thuật</TranslatedText>
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

          {isMobile && showSwipeHint && (
            <div className="swipe-hint">
              <span className="swipe-text">
                <TranslatedText>Trượt để khám phá</TranslatedText>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  height="18"
                  width="18"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  ></path>
                </svg>
              </span>
            </div>
          )}

          <div
            className="collections-gallery"
            ref={scrollContainerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
            style={isMobile ? { overflow: "visible" } : {}}
          >
            <div className="collection-inner-container">
              {collectionsDataWithAssets.map((item, index) => {
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
                    <Link to="/collection" className="collection-link">
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
          <Link to="/collection" className="view-all-link">
            <TranslatedText>Xem tất cả bộ sưu tập</TranslatedText>
            <span className="arrow-icon">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Collections;
