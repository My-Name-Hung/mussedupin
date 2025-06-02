import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./DuPin.css";

// Sample video data - replace with your actual YouTube videos
const videoData = [
  {
    id: 1,
    title:
      "Góc nhìn từ Bảo Tàng Thông – Một lát cắt Đà Lạt trọn vẹn trong ánh chiều tà!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aozcRuYVPKw", // Replace with actual YouTube ID
    duration: "11s",
    thumbnail:
      "https://i.ytimg.com/vi/aozcRuYVPKw/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
  {
    id: 2,
    title:
      "Góc nhìn từ Bảo Tàng Thông – Một lát cắt Đà Lạt trọn vẹn trong ánh chiều tà!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aozcRuYVPKw", // Replace with actual YouTube ID
    duration: "11s",
    thumbnail:
      "https://i.ytimg.com/vi/aozcRuYVPKw/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
  {
    id: 3,
    title:
      "Góc nhìn từ Bảo Tàng Thông – Một lát cắt Đà Lạt trọn vẹn trong ánh chiều tà!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aozcRuYVPKw", // Replace with actual YouTube ID
    duration: "11s",
    thumbnail:
      "https://i.ytimg.com/vi/aozcRuYVPKw/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
  {
    id: 4,
    title:
      "Góc nhìn từ Bảo Tàng Thông – Một lát cắt Đà Lạt trọn vẹn trong ánh chiều tà!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aozcRuYVPKw", // Replace with actual YouTube ID
    duration: "11s",
    thumbnail:
      "https://i.ytimg.com/vi/aozcRuYVPKw/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
];

const DuPin = () => {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const animationRef = useRef(null);
  const lastTimestampRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCardIndex, setActiveCardIndex] = useState(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Check if mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Ẩn gợi ý swipe sau 5 giây
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

  // Handle visibility detection with enhanced threshold
  useEffect(() => {
    const options = {
      threshold: [0.05, 0.1, 0.2, 0.5, 0.8],
      rootMargin: "0px 0px 100px 0px",
    };

    const handleVisibilityChange = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Use a smoother transition based on intersection ratio
        const ratio = Math.min(entry.intersectionRatio * 2, 1);
        if (ratio > 0.1) {
          setIsVisible(true);

          // Apply parallax effect when section comes into view
          if (sectionRef.current) {
            sectionRef.current.style.transform = "translateY(0)";
            sectionRef.current.style.opacity = "1";
          }
        }
      } else if (entry.intersectionRatio === 0) {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(handleVisibilityChange, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Parallax scrolling effect
  useEffect(() => {
    const handleParallax = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrolled =
            (windowHeight - rect.top) / (windowHeight + rect.height);
          setScrollProgress(Math.min(Math.max(scrolled, 0), 1));
        }
      }
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  // Calculate widths for scroll animation with improved precision
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

    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(calculateWidths);
      resizeObserver.observe(scrollContainerRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
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

  // Enhanced auto-scroll animation with variable speed
  useEffect(() => {
    if (
      !isVisible ||
      contentWidth <= containerWidth ||
      isPaused ||
      isUserInteracting
    ) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // Dynamic speed based on screen size and content width
    const baseScrollSpeed = isMobile ? 0.5 : 1;
    const maxScroll = contentWidth - containerWidth;

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const elapsed = timestamp - lastTimestampRef.current;

      // More refined speed calculation with easing
      const scrollSpeed =
        baseScrollSpeed *
        (Math.min(contentWidth / 3500, 1.5) + 0.3) *
        (1 + Math.sin(scrollProgress * Math.PI) * 0.2);

      setScrollPosition((prevPosition) => {
        // Changed from subtraction to addition for left-to-right direction
        const newPosition =
          prevPosition +
          scrollSpeed *
            (elapsed / 16) *
            (1 - Math.sin((prevPosition / maxScroll) * Math.PI) * 0.15);

        // Loop transition for left-to-right direction
        if (newPosition >= maxScroll) {
          return 0;
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
  }, [
    isVisible,
    containerWidth,
    contentWidth,
    isPaused,
    isMobile,
    isUserInteracting,
  ]);

  // Update scroll position with optimized transforms
  useEffect(() => {
    if (scrollContainerRef.current) {
      // Use hardware-accelerated transforms for better performance
      if (isMobile) {
        scrollContainerRef.current.style.transform = `translateX(-${scrollPosition}px)`;
      } else {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }

      // Determine which card is most visible/centered
      if (scrollContainerRef.current.children[0]) {
        const items = scrollContainerRef.current.children[0].children;
        const containerCenter = containerWidth / 2;

        // Update center calculation for left-to-right direction
        const adjustedCenter = isMobile
          ? containerCenter - scrollPosition
          : containerCenter + scrollPosition;

        let minDistance = Infinity;
        let activeIndex = null;

        Array.from(items).forEach((item, index) => {
          const rect = item.getBoundingClientRect();
          const itemCenter = rect.left + rect.width / 2;
          const distance = Math.abs(itemCenter - adjustedCenter);

          if (distance < minDistance) {
            minDistance = distance;
            activeIndex = index;
          }
        });

        setActiveCardIndex(activeIndex);
      }
    }
  }, [scrollPosition, isMobile, containerWidth, contentWidth]);

  // Cải thiện xử lý touch event trên mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setIsUserInteracting(true);
    setTouchStartX(e.touches[0].clientX);
    setShowSwipeHint(false); // Ẩn gợi ý khi người dùng tương tác
  };

  const handleTouchEnd = () => {
    setIsUserInteracting(false);
    // Trì hoãn trước khi tiếp tục auto-scroll
    setTimeout(() => {
      if (!isPaused) {
        setIsPaused(false);
      }
    }, 1200);
  };

  const handleTouchMove = (e) => {
    if (isUserInteracting && scrollContainerRef.current) {
      const touchX = e.touches[0].clientX;
      const diff = touchStartX - touchX;

      // Cập nhật vị trí scroll dựa trên chuyển động của ngón tay
      setScrollPosition((prev) => {
        const newPosition = prev + diff * 1.2; // Độ nhạy khi vuốt
        setTouchStartX(touchX);

        if (newPosition < 0) return 0;
        if (newPosition > contentWidth - containerWidth)
          return contentWidth - containerWidth;

        return newPosition;
      });
    }
  };

  // Enhanced hover/touch interaction
  const handleMouseEnter = (index) => {
    setIsPaused(true);
    setActiveCardIndex(index);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    setActiveCardIndex(null);
  };

  // Enhanced video selection and modal
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setShowModal(false);
    // Add fade out animation before removing
    const modal = document.querySelector(".video-modal");
    if (modal) {
      modal.classList.add("closing");
      setTimeout(() => {
        setSelectedVideo(null);
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }, 300);
    } else {
      setSelectedVideo(null);
      document.body.style.overflow = "auto";
    }
  };

  // Close modal when clicking outside the content
  const handleModalBackdropClick = (e) => {
    if (e.target.classList.contains("video-modal")) {
      closeModal();
    }
  };

  // Calculate parallax offset for items
  const getParallaxOffset = (index) => {
    const baseOffset = scrollProgress * 15;
    return baseOffset + (index % 3) * 5;
  };

  return (
    <section className="dupin-section" id="dupin" ref={sectionRef}>
      <div
        className="dupin-background"
        style={{ opacity: 0.05 + scrollProgress * 0.1 }}
      ></div>

      <div
        className="dupin-header"
        style={{ transform: `translateY(${scrollProgress * -20}px)` }}
      >
        <h2 className="dupin-title">
          MUSÉE DU PIN +
        </h2>
        <div className="dupin-subtitle">
          
            Khám phá nội dung kỹ thuật số độc quyền của chúng tôi
          
        </div>
      </div>

      <div className={`dupin-gallery-container ${isVisible ? "visible" : ""}`}>
        {isMobile && showSwipeHint && (
          <div className="swipe-hint">
            <span className="swipe-text">
              Swipe to explore
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
          className="dupin-gallerys"
          ref={scrollContainerRef}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={handleTouchMove}
          style={isMobile ? { overflow: "visible" } : {}}
        >
          <div className="dupin-inner-container">
            {videoData.map((video, index) => (
              <div
                key={video.id}
                className={`dupin-item ${
                  activeCardIndex === index ? "active" : ""
                }`}
                style={{
                  animationDelay: `${index * 0.15 + 0.1}s`,
                  transform: `translateY(${getParallaxOffset(index)}px)`,
                }}
                onMouseEnter={() => handleMouseEnter(index)}
              >
                <div
                  className="dupin-video-wrapper"
                  onClick={() => openVideoModal(video)}
                >
                  <div className="dupin-thumbnail-container">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="dupin-thumbnail"
                      loading="lazy"
                    />
                    <span className="dupin-category">{video.category}</span>
                    <div className="dupin-gradient-overlay"></div>
                    <div className="play-button">
                      <svg viewBox="0 0 100 100" className="play-icon">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          className="play-circle"
                        />
                        <polygon
                          points="40,30 70,50 40,70"
                          className="play-triangle"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="dupin-overlay">
                    <div className="dupin-info">
                     
                      <div className="dupin-meta">
                        <span className="video-tag">
                          VIDEO
                        </span>
                        <span className="video-duration">{video.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="scroll-indicator">
          <div className="scroll-track">
            <div
              className="scroll-thumb"
              style={{
                width: `${(containerWidth / contentWidth) * 100}%`,
                left: `${(scrollPosition / contentWidth) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      </div>

      <div
        className="dupin-footer"
        style={{ transform: `translateY(${scrollProgress * -10}px)` }}
      >
        <Link to="/dupinplus" className="view-all-link">
          Nội dung thêm trên Musée Du Pin+
          <span className="arrow-icon">→</span>
        </Link>
      </div>

      {/* Video Modal with enhanced animation */}
      {showModal && (
        <div className="video-modal" onClick={handleModalBackdropClick}>
          <div className="video-modal-content">
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-info">
              <div className="video-modal-category">
                {selectedVideo.category}
              </div>
              <h3 className="video-modal-title">{selectedVideo.title}</h3>
              {selectedVideo.subtitle && (
                <p className="video-modal-subtitle">{selectedVideo.subtitle}</p>
              )}
              <p className="video-modal-duration">{selectedVideo.duration}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DuPin;
