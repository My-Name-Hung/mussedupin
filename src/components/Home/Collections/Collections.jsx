import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../../utils/cloudinary";
import OptimizedImage from "../../OptimizedImage/OptimizedImage";
import "./Collections.css";

// Collections data - memoized to prevent unnecessary re-creation
const collectionsData = [
  {
    id: 1,
    title: "Dụng cụ âm nhạc Tây Nguyên",
    artist: "Trưng bày",
    image: "Cồng Chiên.webp",
    alt: "Dụng cụ âm nhạc Tây Nguyên",
    description:
      "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng. Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
  },
  {
    id: 2,
    title: "Hơi thở đại ngàn",
    artist: "Trưng bày",
    image: "Lồng Đa Đa.webp",
    alt: "Hơi thở đại ngàn",
    description:
      "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên. Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
  },
  {
    id: 3,
    title: "Hình hài bản sắc",
    artist: "Trưng bày",
    image: "Điêu Khắc.webp",
    alt: "Hình hài bản sắc",
    description:
      "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa. Tác phẩm mang đậm phong cách mộc mạc nhưng đầy chiều sâu văn hóa, phản ánh vẻ đẹp nội tâm, tinh thần kiên cường và vai trò quan trọng của người phụ nữ trong đời sống cộng đồng K'ho.",
  },
  {
    id: 4,
    title: "Lửa thiêng đêm núi",
    artist: "Trưng bày",
    image: "36 (2).webp",
    alt: "Lửa thiêng đêm núi",
    description:
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin, đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
  },
  {
    id: 5,
    title: "Hơi ấm buôn làng",
    artist: "Tham quan",
    image: "Nồi Đất.webp",
    alt: "Hơi ấm buôn làng",
    description:
      "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn, thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình",
  },
  {
    id: 6,
    title: "Những mùa no ấm",
    artist: "Tham quan",
    image: "Chiếc Gùi.webp",
    alt: "Những mùa no ấm",
    description: "Chiếc gùi",
  },
  {
    id: 7,
    title: "Phức Tầng",
    artist: "Tham quan",
    image: "Thông 2.webp",
    alt: "Phức Tầng",
    description:
      "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
  },
  {
    id: 8,
    title: "Vật liệu",
    artist: "Tham quan",
    image: "Hoa Ban Trắng.webp",
    alt: "Vật liệu",
    description: "Vật liệu",
  },
  {
    id: 9,
    title: "Redpine Art Studio",
    artist: "Lưu trú",
    image: "luutrunghethuat.jpg",
    alt: "Redpine Art Studio - Lưu trú nghệ thuật giữa rừng thông Đà Lạt",
    description:
      "Redpine Art Studio là không gian lưu trú nghệ thuật độc đáo giữa rừng thông, nơi bạn có thể trải nghiệm nghệ thuật và thiên nhiên Đà Lạt.",
  },
  {
    id: 10,
    title: "Bề mặt ký ức",
    artist: "Tham quan",
    image: "Lửa.webp",
    alt: "Bề mặt ký ức",
    description: "Bề mặt ký ức.",
  },
    {
    id: 11,
    title: "Thiên nhiên Đà Lạt",
    artist: "Tham quan",
    image: "Gió.webp",
    alt: "Thiên nhiên Đà Lạt",
    description: "Thiên nhiên Đà Lạt.",
  },
  {
    id: 12,
    title: "Sắc màu Tây nguyên",
    artist: "Tham quan",
    image: "Đông.webp",
    alt: "Sắc màu Tây nguyên",
    description: "Sắc màu Tây nguyên.",
  },
];

// Memoized utility functions
const getWaveOffset = (index) => {
  const patterns = [-25, 35, -15, 20, -30, 40, -20, 30, -10, 25];
  return patterns[index % patterns.length];
};

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

  // Optimized device type detection with debounce
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

  // Optimized intersection observer
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

  // Calculate widths for scroll animation with ResizeObserver
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

  // Update scroll position with hardware acceleration
  useEffect(() => {
    if (scrollContainerRef.current) {
      const transform = `translateX(-${scrollPosition}px)`;
      scrollContainerRef.current.style.transform = transform;
      scrollContainerRef.current.style.willChange = "transform";
    }
  }, [scrollPosition]);

  // Enhanced auto-scroll animation with consistent speed
  useEffect(() => {
    if (!isVisible || isPaused) {
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
  }, [isVisible, containerWidth, contentWidth, isPaused, isMobile, isDesktop]);

  // Memoized event handlers for better performance
  const handleItemHover = useCallback(
    (index) => {
      if (isDesktop) {
        setHoverItemIndex(index);
      }
    },
    [isDesktop]
  );

  const handleItemLeave = useCallback(() => {
    if (isDesktop) {
      setHoverItemIndex(null);
    }
  }, [isDesktop]);

  // Update mouse event handlers
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setIsPaused(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      // Shorter delay for smoother transition
      setTimeout(() => setIsPaused(false), 50);
    }
  }, [isMobile]);

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

  // Memoized collection items
  const collectionItems = useMemo(() => {
    return collectionsData.map((item, index) => {
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
              <OptimizedImage
                src={getImageUrl(item.image)}
                alt={item.alt}
                className="collection-image"
                priority={index < 5}
                width={itemSize.width}
                height={itemSize.height}
                sizes="(max-width: 768px) 280px, (max-width: 1200px) 320px, 350px"
              />
              <div className="collection-overlay">
                <div className="collection-info">
                  <h3 className="collection-title">{item.title}</h3>
                  <p className="collection-artist">{item.artist}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }, [hoverItemIndex, handleItemHover, handleItemLeave]);

  return (
    <section className="collections-section" id="collections">
      <div className="collections-content-container">
        <div className="collections-header">
          <h3 className="collections-title">Bộ sưu tập</h3>
          {isDesktop && (
            <p className="collections-subtitle">
              Khám phá bộ sưu tập nghệ thuật
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
                Trượt để khám phá
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
            <div className="collection-inner-container">{collectionItems}</div>
          </div>
        </div>

        <div className="collections-footer">
          <Link to="/collection" className="view-all-links">
            Xem tất cả bộ sưu tập
            <span className="arrow-icon">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Collections);
