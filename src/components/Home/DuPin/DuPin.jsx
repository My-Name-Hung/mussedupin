import React, { useCallback, useEffect, useRef, useState } from "react";
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
      "Sự hòa trộn phối ghép của màu sắc, vật liệu chất chứa bên trong những giá trị của vùng đất đại ngàn.",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "mhHVg1Hlq-Y", // Replace with actual YouTube ID
    duration: "22s",
    thumbnail:
      "https://i.ytimg.com/vi/mhHVg1Hlq-Y/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Kiến trúc",
  },
  {
    id: 3,
    title: "Nhà Mắt Thông- Tinh Hoa Kiến Trúc Giữa Lòng Thiên Nhiên",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "XHcN9NoTzd4", // Replace with actual YouTube ID
    duration: "1:19s",
    thumbnail:
      "https://i.ytimg.com/vi/XHcN9NoTzd4/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Kiến trúc",
  },
  {
    id: 4,
    title: "Chạm vào Langbiang Art Space",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "iphjfzjG-G4", // Replace with actual YouTube ID
    duration: "27s",
    thumbnail:
      "https://i.ytimg.com/vi/iphjfzjG-G4/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Live",
  },
  {
    id: 5,
    title:
      "Mỗi giọt sơn là một phần của câu chuyện, mỗi nét cọ là một phần tâm hồn",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "vGVCScsRiK4", // Replace with actual YouTube ID
    duration: "28s",
    thumbnail:
      "https://i.ytimg.com/vi/vGVCScsRiK4/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Kiến trúc",
  },
  {
    id: 6,
    title: "MỖI VẬT PHẨM – MỘT NÉT VĂN HOÁ LANGBIANG",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "y8O6GSFVedg", // Replace with actual YouTube ID
    duration: "1:36s",
    thumbnail:
      "https://i.ytimg.com/vi/y8O6GSFVedg/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Văn hóa",
  },
  {
    id: 7,
    title: "LANGBIANG - KHÔNG GIAN NGHỆ THUẬT SỐNG CÙNG VĂN HOÁ",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "1c6cPAkPXto", // Replace with actual YouTube ID
    duration: "32s",
    thumbnail:
      "https://i.ytimg.com/vi/1c6cPAkPXto/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Văn hóa",
  },
  {
    id: 8,
    title:
      "Sớm bình minh mờ sương trong hành trình lưu trú nghệ thuật tại Bảo Tàng Thông!",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "pE4CGNBrE1M", // Replace with actual YouTube ID
    duration: "16s",
    thumbnail:
      "https://i.ytimg.com/vi/pE4CGNBrE1M/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
  {
    id: 9,
    title: "ÂM THANH CỦA RỪNG, NHỊP ĐẬP CỦA LINH HỒN",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "pYAdoqUkVHo", // Replace with actual YouTube ID
    duration: "44s",
    thumbnail:
      "https://i.ytimg.com/vi/pYAdoqUkVHo/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Âm nhạc",
  },
  {
    id: 10,
    title:
      "Chỉ cần đi chậm lại, bạn sẽ thấy nơi đây vẫn còn nguyên những bình yên tưởng chừng đã mất",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "aTeAHvkXqDU", // Replace with actual YouTube ID
    duration: "38s",
    thumbnail:
      "https://i.ytimg.com/vi/aTeAHvkXqDU/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
  {
    id: 11,
    title: "Tiếng thông xào xạc hay lời kêu cứu lặng thầm?",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "MOtrdJzefmQ", // Replace with actual YouTube ID
    duration: "49s",
    thumbnail:
      "https://i.ytimg.com/vi/MOtrdJzefmQ/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
  {
    id: 12,
    title: "Có những câu chuyện chỉ có thể lắng nghe khi ta đủ tĩnh lặng.",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "qR2H15Q1nc8", // Replace with actual YouTube ID
    duration: "43s",
    thumbnail:
      "https://i.ytimg.com/vi/qR2H15Q1nc8/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Thiên nhiên",
  },
  {
    id: 13,
    title: "KHÉP LẠI MDP-AR MÙA 1: HÀNH TRÌNH NGHỆ THUẬT VÌ THIÊN NHIÊN ĐÀ LẠT",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "HDOx1dRhRY8", // Replace with actual YouTube ID
    duration: "40s",
    thumbnail:
      "https://i.ytimg.com/vi/HDOx1dRhRY8/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Live",
  },
  {
    id: 14,
    title: "NHẠC CỤ DÂN TỘC",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "epnBikruPUM", // Replace with actual YouTube ID
    duration: "1:24s",
    thumbnail:
      "https://i.ytimg.com/vi/epnBikruPUM/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
    category: "Âm nhạc",
  },
    {
    id: 14,
    title: "Có những câu chuyện chỉ có thể lắng nghe khi ta đủ tĩnh lặ<ng></ng>",
    subtitle: "Góc nhìn từ Bảo Tàng Thông",
    youtubeId: "EM-XJW7zyoo", // Replace with actual YouTube ID
    duration: "41s",
    thumbnail:
      "https://i.ytimg.com/vi/EM-XJW7zyoo/hqdefault.jpg?sqp=-oaymwFBCNACELwBSFryq4qpAzMIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB8AEB-AG2CIAC0AWKAgwIABABGD4gQihyMA8=&rs=AOn4CLCybz6fVtK17RW4ZlrHrBfDMcmiPw", // This will be replaced with actual thumbnails
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
  const [isDesktop, setIsDesktop] = useState(false);
  const [lastTouchX, setLastTouchX] = useState(0);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [touchVelocity, setTouchVelocity] = useState(0);

  // Check if mobile and desktop
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setIsMobile(width <= 768);
        setIsDesktop(width >= 1200);
      }, 100);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Hide swipe hint after 5 seconds on mobile
    if (isMobile) {
      const timer = setTimeout(() => {
        setShowSwipeHint(false);
      }, 5000);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [isMobile]);

  // Handle visibility detection with enhanced threshold
  const handleVisibilityChange = useCallback((entries) => {
    const entry = entries[0];
    if (entry.isIntersecting) {
      const ratio = Math.min(entry.intersectionRatio * 1.5, 1);
      if (ratio > 0.2) {
        setIsVisible(true);
      }
    } else if (entry.intersectionRatio === 0) {
      setIsVisible(false);
    }
  }, []);

  useEffect(() => {
    const options = {
      threshold: [0.1, 0.2, 0.5, 0.8],
      rootMargin: "0px 0px 100px 0px",
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
  }, [handleVisibilityChange]);

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

  // Enhanced auto-scroll animation with consistent speed
  useEffect(() => {
    if (!isVisible || isPaused || isUserInteracting) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    // Set constant speed for different devices
    const baseScrollSpeed = isMobile ? 0.8 : isDesktop ? 1.2 : 1;
    const maxScroll = contentWidth - containerWidth;
    let lastScrollTime = performance.now();

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const currentTime = performance.now();
      const timeDiff = currentTime - lastScrollTime;

      // Keep consistent frame timing
      const frameMultiplier = Math.min(timeDiff / 16.67, 2);
      const scrollSpeed = baseScrollSpeed * frameMultiplier;

      setScrollPosition((prevPosition) => {
        const newPosition = prevPosition + scrollSpeed;

        // Reset position when reaching the end
        if (newPosition >= maxScroll) {
          return 0;
        }
        return newPosition;
      });

      lastTimestampRef.current = timestamp;
      lastScrollTime = currentTime;
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
    isDesktop,
    isUserInteracting,
  ]);

  // Update scroll position with hardware acceleration
  useEffect(() => {
    if (scrollContainerRef.current) {
      const transform = `translateX(-${scrollPosition}px)`;
      scrollContainerRef.current.style.transform = transform;
      scrollContainerRef.current.style.willChange = "transform";
    }
  }, [scrollPosition]);

  // Enhanced touch handling with better performance
  const handleTouchStart = useCallback((e) => {
    setIsPaused(true);
    setIsUserInteracting(true);
    setTouchStartX(e.touches[0].clientX);
    setLastTouchX(e.touches[0].clientX);
    setLastTouchTime(Date.now());
    setShowSwipeHint(false);
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsUserInteracting(false);

    if (Math.abs(touchVelocity) > 0.3) {
      // Reduced threshold for more responsive feel
      const momentum = touchVelocity * 120; // Increased multiplier
      const targetScroll = scrollPosition + momentum;
      const startScroll = scrollPosition;
      const startTime = performance.now();
      const duration = Math.min(Math.abs(momentum) * 2, 800); // Dynamic duration

      const animateMomentum = () => {
        const elapsed = performance.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Enhanced easing function
        const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
        const currentProgress = easeOutExpo(progress);

        const newScroll =
          startScroll + (targetScroll - startScroll) * currentProgress;

        setScrollPosition(
          Math.max(0, Math.min(newScroll, contentWidth - containerWidth))
        );

        if (progress < 1) {
          requestAnimationFrame(animateMomentum);
        } else {
          setTimeout(() => setIsPaused(false), 500);
        }
      };

      requestAnimationFrame(animateMomentum);
    } else {
      setTimeout(() => setIsPaused(false), 500);
    }
  }, [touchVelocity, scrollPosition, contentWidth, containerWidth]);

  const handleTouchMove = useCallback(
    (e) => {
      if (isUserInteracting && scrollContainerRef.current) {
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;
        const now = performance.now();
        const deltaTime = now - lastTouchTime;
        const deltaX = touchX - lastTouchX;

        // Improved velocity calculation
        const newVelocity = deltaX / Math.max(deltaTime, 1);
        setTouchVelocity(newVelocity * 1.5); // Increased multiplier for smoother momentum

        setLastTouchX(touchX);
        setLastTouchTime(now);

        setScrollPosition((prev) => {
          const sensitivity = isMobile ? 1.5 : 1.2;
          const newPosition = prev + diff * sensitivity;
          setTouchStartX(touchX);

          // Enhanced elastic boundaries
          if (newPosition < 0) {
            return Math.max(newPosition * 0.3, -containerWidth * 0.1);
          }
          if (newPosition > contentWidth - containerWidth) {
            const overscroll = newPosition - (contentWidth - containerWidth);
            return contentWidth - containerWidth + overscroll * 0.3;
          }

          return newPosition;
        });
      }
    },
    [
      isUserInteracting,
      touchStartX,
      lastTouchTime,
      lastTouchX,
      containerWidth,
      contentWidth,
      isMobile,
    ]
  );

  // Enhanced hover/touch interaction
  const handleMouseEnter = useCallback(
    (index) => {
      if (!isMobile) {
        setIsPaused(true);
        setActiveCardIndex(index);
      }
    },
    [isMobile]
  );

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setTimeout(() => {
        setIsPaused(false);
        setActiveCardIndex(null);
      }, 50);
    }
  }, [isMobile]);

  // Enhanced video selection and modal
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeModal = () => {
    setShowModal(false);
    // Add fade out animation before removing
    const modal = document.querySelector(".video-modal-dupinhome");
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
    if (e.target.classList.contains("video-modal-dupinhome")) {
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
        <h2 className="dupin-title notranslate">MUSÉE DU PIN +</h2>
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
                        <span className="video-tag">VIDEO</span>
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
        <div className="video-modal-dupinhome" onClick={handleModalBackdropClick}>
          <div className="video-modal-dupinhome-content">
            <button className="close-modal-dupinhome" onClick={closeModal}>
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
            <div className="video-modal-dupinhome-info">
              <div className="video-modal-dupinhome-category">
                {selectedVideo.category}
              </div>
              <h3 className="video-modal-dupinhome-title">{selectedVideo.title}</h3>
              {selectedVideo.subtitle && (
                <p className="video-modal-dupinhome-subtitle">{selectedVideo.subtitle}</p>
              )}
              <p className="video-modal-dupinhome-duration">{selectedVideo.duration}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DuPin;
