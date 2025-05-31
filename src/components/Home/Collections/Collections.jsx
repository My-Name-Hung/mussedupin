import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../../../components/TranslatedText";
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
    title: "K'ho chăn nuôi",
    artist: "Trưng bày",
    image: "Lồng Đa Đa.webp",
    alt: "K'ho chăn nuôi",
    description:
      "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên. Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
  },
  {
    id: 3,
    title: "K'ho điêu khắc",
    artist: "Trưng bày",
    image: "Điêu Khắc.webp",
    alt: "K'ho điêu khắc",
    description:
      "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa. Tác phẩm mang đậm phong cách mộc mạc nhưng đầy chiều sâu văn hóa, phản ánh vẻ đẹp nội tâm, tinh thần kiên cường và vai trò quan trọng của người phụ nữ trong đời sống cộng đồng K'ho.",
  },
  {
    id: 4,
    title: "K'ho lễ hội",
    artist: "Trưng bày",
    image: "36 (2).webp",
    alt: "K'ho lễ hội",
    description:
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin, đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
  },
  {
    id: 5,
    title: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
    artist: "Tham quan",
    image: "Nồi Đất.webp",
    alt: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
    description:
      "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn, thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình",
  },
  {
    id: 6,
    title: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
    artist: "Tham quan",
    image: "Chiếc Gùi.webp",
    alt: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
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

  // Enhanced auto-scroll animation with performance optimization
  useEffect(() => {
    if (!isVisible || isPaused) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
      return;
    }

    if (isDesktop && contentWidth <= containerWidth * 1.5) {
      return;
    }

    const baseScrollSpeed = isMobile ? 0.5 : isDesktop ? 0.8 : 1.2;
    const maxScroll = contentWidth - containerWidth;

    const animate = (timestamp) => {
      if (!lastTimestampRef.current) lastTimestampRef.current = timestamp;
      const elapsed = timestamp - lastTimestampRef.current;

      let scrollSpeed = baseScrollSpeed;

      if (isDesktop) {
        scrollSpeed =
          baseScrollSpeed * (Math.min(contentWidth / 4000, 1.2) + 0.3);
      } else {
        scrollSpeed =
          baseScrollSpeed * (Math.min(contentWidth / 3000, 1.5) + 0.2);
      }

      setScrollPosition((prevPosition) => {
        const easing = isDesktop
          ? 1 - Math.sin((prevPosition / maxScroll) * Math.PI) * 0.15
          : 1 - Math.sin((prevPosition / maxScroll) * Math.PI) * 0.1;

        const newPosition =
          prevPosition + scrollSpeed * (elapsed / 16) * easing;

        if (newPosition >= maxScroll) {
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

  // Update scroll position with hardware acceleration
  useEffect(() => {
    if (scrollContainerRef.current) {
      if (isMobile) {
        scrollContainerRef.current.style.transform = `translateX(-${scrollPosition}px)`;
      } else {
        scrollContainerRef.current.scrollLeft = scrollPosition;
      }
    }
  }, [scrollPosition, isMobile]);

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

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

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

    if (Math.abs(touchVelocity) > 0.5) {
      const momentum = touchVelocity * 100;
      const targetScroll = scrollPosition + momentum;

      const startScroll = scrollPosition;
      const startTime = Date.now();
      const duration = 500;

      const animateMomentum = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

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
          setTimeout(() => {
            setIsPaused(false);
          }, 1000);
        }
      };

      requestAnimationFrame(animateMomentum);
    } else {
      setTimeout(() => {
        setIsPaused(false);
      }, 1000);
    }
  }, [touchVelocity, scrollPosition, contentWidth, containerWidth]);

  const handleTouchMove = useCallback(
    (e) => {
      if (isUserInteracting && scrollContainerRef.current) {
        const touchX = e.touches[0].clientX;
        const diff = touchStartX - touchX;

        const now = Date.now();
        const deltaTime = now - lastTouchTime;
        const deltaX = touchX - lastTouchX;
        setTouchVelocity(deltaX / deltaTime);

        setLastTouchX(touchX);
        setLastTouchTime(now);

        setScrollPosition((prev) => {
          const sensitivity = 1.2;
          const newPosition = prev + diff * sensitivity;
          setTouchStartX(touchX);

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
    },
    [
      isUserInteracting,
      touchStartX,
      lastTouchTime,
      lastTouchX,
      containerWidth,
      contentWidth,
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
                src={item.image}
                alt={item.alt}
                className="collection-image"
                priority={index < 5}
                width={itemSize.width}
                height={itemSize.height}
                sizes="(max-width: 768px) 280px, (max-width: 1200px) 320px, 350px"
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
    });
  }, [hoverItemIndex, handleItemHover, handleItemLeave]);

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
            <div className="collection-inner-container">{collectionItems}</div>
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

export default React.memo(Collections);
