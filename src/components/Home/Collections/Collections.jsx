import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../../../components/TranslatedText";
import "./Collections.css";

// Import optimized images
import bauho from "../../../assets/home/Collections/Bauholo_cards.webp";
import congchieng from "../../../assets/home/Collections/congchien_cards.webp";
import cheghosanh from "../../../assets/home/Collections/Lehoi_cards.webp";
import longda from "../../../assets/home/Collections/LongDaDa_cards.webp";
import noidat from "../../../assets/home/Collections/noidat_cards.webp";
import phunu from "../../../assets/home/Collections/phunu_cards.webp";
import thong2 from "../../../assets/home/Collections/Thông 2.webp";
const collectionsData = [
  {
    id: 1,
    title: "Dụng cụ âm nhạc Tây Nguyên",
    artist: "Trưng bày",
    image: congchieng,
    alt: "Dụng cụ âm nhạc Tây Nguyên",
    description:
      "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng. Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
  },
  {
    id: 2,
    title: "K'ho chăn nuôi",
    artist: "Trưng bày",
    image: longda,
    alt: "K'ho chăn nuôi",
    description:
      "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên. Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
  },
  {
    id: 3,
    title: "K'ho điêu khắc",
    artist: "Trưng bày",
    image: phunu,
    alt: "K'ho điêu khắc",
    description:
      "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa. Tác phẩm mang đậm phong cách mộc mạc nhưng đầy chiều sâu văn hóa, phản ánh vẻ đẹp nội tâm, tinh thần kiên cường và vai trò quan trọng của người phụ nữ trong đời sống cộng đồng K'ho.",
  },
  {
    id: 4,
    title: "K'ho lễ hội",
    artist: "Trưng bày",
    image: cheghosanh,
    alt: "K'ho lễ hội",
    description:
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin, đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
  },
  {
    id: 5,
    title: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
    artist: "Tham quan",
    image: noidat,
    alt: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
    description:
      "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn, thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình",
  },
  {
    id: 6,
    title: "K'ho sinh hoạt thường nhật",
    artist: "Tham quan",
    image: bauho,
    alt: "K'ho sinh hoạt thường nhật",
    description:
      "Được khoét rỗng từ quả hồ lô khô, vật phẩm này thường được dùng để đựng nước, rượu cần hoặc làm nhạc cụ truyền thống",
  },
  {
    id: 7,
    title: "Phức Tầng",
    artist: "Tham quan",
    image: thong2,
    alt: "Phức Tầng",
    description:
      "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
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
  const [touchStartX, setTouchStartX] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

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
    setShowSwipeHint(false); // Hide hint when user interacts
  };

  const handleTouchEnd = () => {
    setIsUserInteracting(false);
    // Delay before resuming auto-scroll
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

      // Update scroll position based on finger movement
      setScrollPosition((prev) => {
        const newPosition = prev + diff * 1.2; // Swipe sensitivity
        setTouchStartX(touchX);

        if (newPosition < 0) return 0;
        if (newPosition > contentWidth - containerWidth)
          return contentWidth - containerWidth;

        return newPosition;
      });
    }
  };

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
