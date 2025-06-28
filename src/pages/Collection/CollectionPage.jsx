import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/cloudinary";
import "./CollectionPage.css";

// Collection data
const collectionData = {
  heroImages: [
    "Cồng Chiên.webp",
    "Lồng Đa Đa.webp",
    "36 (2).webp",
    "phunu_hero.webp",
    "Chiếc Gùi.webp",
    "Nồi đất.webp",
    "Thông 2.webp",
    "Hoa Ban Trắng.webp",
    "luutrunghethuat.jpg",
    "Lửa.webp",
    "Gió.webp",
    "Đông.webp",
  ],

  artworks: [
    {
      id: "dungcu-1",
      title: "Dụng cụ âm nhạc Tây Nguyên",
      artist: "Cồng chiêng",
      year: "2024",
      image: "Cồng Chiên.webp",
      description:
        "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng. Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
      location: "Khu trưng bày nhạc cụ",
      tags: ["Nhạc cụ", "Văn hóa", "Tây Nguyên"],
    },
    {
      id: "channuoi-1",
      title: "Hơi thở đại ngàn",
      artist: "Lồng đa đa",
      year: "2024",
      image: "Lồng Đa Đa.webp",
      description:
        "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên. Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
      location: "Khu trưng bày đời sống",
      tags: ["Đời sống", "Văn hóa", "K'ho"],
    },
    {
      id: "dieukhac-1",
      title: "Hình hài bản sắc",
      artist: "Tượng phụ nữ",
      year: "2024",
      image: "Điêu Khắc.webp",
      description:
        "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa.",
      location: "Khu trưng bày điêu khắc",
      tags: ["Điêu khắc", "Văn hóa", "K'ho"],
    },
    {
      id: "lehoi-1",
      title: "Những mùa no ấm",
      artist: "Ché Ghò Sành",
      year: "2024",
      image: "Chiếc Gùi.webp",
      description:
        "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin, đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
      location: "Khu trưng bày lễ hội",
      tags: ["Lễ hội", "Văn hóa", "K'ho"],
    },
    {
      id: "sinhoat-1",
      title: "Hơi ấm buôn làng",
      artist: "Nồi đất",
      year: "2024",
      image: "Nồi Đất.webp",
      description:
        "Muée Du Pin trưng bày nồi đất của người K'ho, đây là biểu tượng của sự phát triển và tiến bộ của dân tộc Tây Nguyên.",
      location: "Khu trưng bày đời sống",
      tags: ["Đời sống", "Văn hóa", "K'ho"],
    },
    {
      id: "sinhoat-2",
      title: "Lửa thiêng đêm núi",
      artist: "36 (2).webp",
      year: "2024",
      image: "46.webp",
      description:
        "Được khoét rỗng từ quả hồ lô khô, vật phẩm này thường được dùng để đựng nước, rượu cần hoặc làm nhạc cụ truyền thống",
      location: "Khu trưng bày đời sống",
      tags: ["Đời sống", "Văn hóa", "K'ho"],
    },
    {
      id: "phuctang-1",
      title: "Phức Tầng",
      artist: "Thông 2",
      year: "2025",
      image: "Thông 2.webp",
      description:
        "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
      location: "Khu trưng bày đời sống",
      tags: ["Đời sống", "Văn hóa", "Thiên nhiên"],
    },
    {
      id: "vatlieu-1",
      title: "Vật liệu",
      artist: "Chất liệu K'ho",
      year: "2024",
      image: "Hoa Ban Trắng.webp",
      description:
        "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên. Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
      location: "Khu trưng bày vật liệu",
      tags: ["Vật liệu", "Văn hóa", "K'ho"],
    },
    {
      id: "redpine-1",
      title: "Redpine Art Studio",
      artist: "Musée Du Pin",
      year: "2024",
      image: "luutrunghethuat.jpg",
      description:
        "Redpine Art Studio là không gian lưu trú nghệ thuật độc đáo giữa rừng thông, nơi bạn có thể trải nghiệm nghệ thuật và thiên nhiên Đà Lạt.",
      location: "Khu lưu trú nghệ thuật",
      tags: ["Lưu trú", "Nghệ thuật", "Đà Lạt"],
    },
    {
      id: "memory-1",
      title: "Bề mặt ký ức",
      artist: "Tham quan",
      year: "2024",
      image: "Lửa.webp",
      description: "Bề mặt ký ức.",
      location: "Khu trưng bày",
      tags: ["Tham quan", "Nghệ thuật", "Đà Lạt"],
    },
    {
      id: "nature-1",
      title: "Thiên nhiên Đà Lạt",
      artist: "Tham quan",
      year: "2024",
      image: "Gió.webp",
      description: "Thiên nhiên Đà Lạt.",
      location: "Khu trưng bày",
      tags: ["Tham quan", "Nghệ thuật", "Đà Lạt"],
    },
    {
      id: "color-1",
      title: "Sắc màu Tây nguyên",
      artist: "Tham quan",
      year: "2024",
      image: "Đông.webp",
      description: "Sắc màu Tây nguyên.",
      location: "Khu trưng bày",
      tags: ["Tham quan", "Nghệ thuật", "Đà Lạt"],
    },
  ],

  categories: [
    { id: 1, title: "Dụng cụ âm nhạc Tây Nguyên", image: "Cồng Chiên.webp" },
    { id: 2, title: "Hơi thở đại ngàn", image: "Lồng Đa Đa.webp" },
    { id: 3, title: "Lửa thiêng đêm núi", image: "36 (2).webp" },
    { id: 4, title: "Hình hài bản sắc", image: "phunu_hero.webp" },
    {
      id: 5,
      title: "Những mùa no ấm",
      image: "Chiếc Gùi.webp",
    },
    { id: 6, title: "Hơi ấm buôn làng", image: "Nồi Đất.webp" },
    { id: 7, title: "Phức Tầng", image: "Thông 2.webp" },
    { id: 8, title: "Vật liệu", image: "Hoa Ban Trắng.webp" },
    { id: 9, title: "Redpine Art Studio", image: "luutrunghethuat.jpg" },
    {
      id: 10,
      title: "Bề mặt ký ức",
      image: "Lửa.webp",
    },
    {
      id: 11,
      title: "Thiên nhiên Đà Lạt",
      image: "Gió.webp",
    },
    {
      id: 12,
      title: "Sắc màu Tây nguyên",
      image: "Đông.webp",
    },
  ],

  highlights: [
    {
      id: 1,
      title: "Nhạc cụ truyền thống",
      category: "Nhạc cụ",
      image: "Cồng Chiên.webp",
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Khám phá âm nhạc truyền thống của người Tây Nguyên qua các nhạc cụ độc đáo.",
    },
    {
      id: 2,
      title: "Hình hài bản sắc",
      category: "Điêu khắc",
      image: "Điêu Khắc.webp",
      type: "image",
      artwork: 1,
      description:
        "Nghệ thuật điêu khắc truyền thống của người K'ho qua các tác phẩm tiêu biểu.",
    },
    {
      id: 3,
      title: "Hơi ấm buôn làng",
      category: "Đời sống",
      image: "46.webp",
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Tìm hiểu về cuộc sống hàng ngày của người K'ho qua các vật dụng sinh hoạt.",
    },
    {
      id: 4,
      title: "Lửa thiêng đêm núi",
      category: "Lễ hội",
      image: "36 (2).webp",
      type: "image",
      artwork: 4,
      description:
        "Khám phá các lễ hội truyền thống và ý nghĩa văn hóa của người K'ho.",
    },
    {
      id: 5,
      title: "Hơi thở đại ngàn",
      category: "Chăn nuôi",
      image: "Lồng Đa Đa.webp",
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Tìm hiểu về hoạt động chăn nuôi và các công cụ truyền thống của người K'ho.",
    },
    {
      id: 6,
      title: "Những mùa no ấm",
      category: "Sinh hoạt",
      image: "Chiếc Gùi.webp",
      type: "image",
      artwork: 2,
      description:
        "Khám phá các hoạt động sinh hoạt văn hóa đặc trưng của người K'ho.",
    },
    {
      id: 7,
      title: "Vật liệu",
      category: "Vật liệu",
      image: "Hoa Ban Trắng.webp",
      type: "image",
      artwork: 1,
      description:
        "Khám phá các chất liệu truyền thống và ý nghĩa văn hóa của người K'ho.",
    },
  ],
};

const CollectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State for hero section slideshow
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // State for featured artwork
  const [selectedArtwork, setSelectedArtwork] = useState(0);

  // State for discover works gallery
  const discoverWorksRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // State for modals
  const [artworkModalOpen, setArtworkModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalClosing, setVideoModalClosing] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // State for auto-scrolling functionality - DISABLED
  // const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  // const [manualInteraction, setManualInteraction] = useState(false);
  const userInteractionTimeout = useRef(null);

  // State for parallax effect on category cards
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const categoryGridRef = useRef(null);

  // State for touch events
  const [lastTouchX, setLastTouchX] = useState(0);
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [touchVelocity, setTouchVelocity] = useState(0);

  // State for discover section video background
  const [isDiscoverVideoLoaded, setIsDiscoverVideoLoaded] = useState(false);
  const discoverVideoRef = useRef(null);

  // Add new state for current slide
  const [currentSlide, setCurrentSlide] = useState(1);

  // Handle auto-rotating hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide(
        (prev) => (prev + 1) % collectionData.heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Go to specific slide
  const goToHeroSlide = (index) => {
    setActiveHeroSlide(index);
  };

  // Handle section animations with debounce for better performance
  useEffect(() => {
    const animateSections = () => {
      const sections = document.querySelectorAll(".animate-section");

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("visible");
        }
      });
    };

    // Debounce function to limit frequency of scroll event handling
    const debounce = (func, wait = 10, immediate = true) => {
      let timeout;
      return function () {
        const context = this,
          args = arguments;
        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    // Run once on mount
    animateSections();

    // Add scroll listener with debounce for better performance
    const debouncedAnimateSections = debounce(animateSections, 15);
    window.addEventListener("scroll", debouncedAnimateSections, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", debouncedAnimateSections);
    };
  }, []);

  // Use a more efficient intersection observer with fewer callbacks
  useEffect(() => {
    // Detect if we're on a mobile device to apply optimizations
    const isMobile = window.innerWidth <= 768;

    const observerOptions = {
      threshold: isMobile ? 0.1 : 0.15, // Lower threshold on mobile for earlier loading
      rootMargin: isMobile ? "100px" : "0px", // Bigger margin on mobile
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Unobserve after animation to save resources
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Only observe elements that are not already visible
    document
      .querySelectorAll(".animate-section:not(.visible)")
      .forEach((section) => {
        observer.observe(section);
      });

    return () => {
      // Cleanup
      observer.disconnect();
    };
  }, []);

  // Handle artwork selection
  const handleArtworkSelect = (index) => {
    setSelectedArtwork(index);
    document.getElementById("featured-artwork").scrollIntoView({
      behavior: "smooth",
    });
  };

  // Navigate through featured artworks
  const navigateArtwork = (direction) => {
    if (direction === "prev") {
      setSelectedArtwork(
        (prev) =>
          (prev - 1 + collectionData.artworks.length) %
          collectionData.artworks.length
      );
    } else {
      setSelectedArtwork((prev) => (prev + 1) % collectionData.artworks.length);
    }
  };

  // Handle category selection - navigate to a new route instead of opening modal
  const handleCategorySelect = (category, event) => {
    // Add click animation effect before navigation
    const card = event.currentTarget;
    card.style.transition = "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
    card.style.transform = "scale(1.05) translateY(-15px)";
    card.style.opacity = "0.8";

    // Use setTimeout to allow the animation to complete before navigation
    setTimeout(() => {
      // Navigate to the correct route that matches App.jsx: /collection/:category
      navigate(`/collection/${category.id}`);
    }, 400);
  };

  // Open artwork detail modal
  const openArtworkDetail = (highlight) => {
    // Find the artwork index based on the referenced ID
    const artworkIndex = collectionData.artworks.findIndex(
      (artwork) => artwork.id === highlight.artwork
    );

    if (artworkIndex !== -1) {
      // Set the selected artwork
      setSelectedArtwork(artworkIndex);

      // Scroll to the featured artwork section with smooth animation
      document.getElementById("featured-artwork").scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Open video modal with enhanced animation
  const openVideoModal = (highlight) => {
    // Add a more elaborate animation sequence to the clicked item
    const highlightElement = document.querySelector(
      `[data-highlight-id="${highlight.id}"]`
    );

    if (highlightElement) {
      // Add pulse effect to play button
      const playButton = highlightElement.querySelector(".cp-play-button");
      let ripple = null;

      if (playButton) {
        playButton.style.transform = "translate(-50%, -50%) scale(1.2)";
        playButton.style.opacity = "1";

        // Create ripple effect
        ripple = document.createElement("div");
        ripple.className = "cp-video-ripple";
        ripple.style.position = "absolute";
        ripple.style.top = "50%";
        ripple.style.left = "50%";
        ripple.style.transform = "translate(-50%, -50%)";
        ripple.style.width = "80px";
        ripple.style.height = "80px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.2)";
        ripple.style.zIndex = "10";
        ripple.style.animation =
          "ripple-out 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards";

        highlightElement.appendChild(ripple);
      }

      // Add opening animation class
      highlightElement.classList.add("video-opening");

      // Apply transform to the image for zoom effect
      const img = highlightElement.querySelector(".cp-highlight-img");
      if (img) {
        img.style.transform = "scale(1.15)";
      }

      // Apply fade to the gradient
      const gradient = highlightElement.querySelector(".cp-highlight-gradient");
      if (gradient) {
        gradient.style.opacity = "0.9";
      }

      // Clean up animations after delay before opening modal
      setTimeout(() => {
        if (ripple) ripple.remove();
        highlightElement.classList.remove("video-opening");

        // Reset styles
        if (img) img.style.transform = "";
        if (gradient) gradient.style.opacity = "";
        if (playButton) {
          playButton.style.transform = "";
          playButton.style.opacity = "";
        }

        // Now open the modal
        setModalContent(highlight);
        setVideoModalOpen(true);
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }, 600);
    } else {
      // Fallback if element not found
      setModalContent(highlight);
      setVideoModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  // Close modals with animation
  const closeModal = () => {
    if (videoModalOpen) {
      setVideoModalClosing(true);
      setTimeout(() => {
        setVideoModalOpen(false);
        setVideoModalClosing(false);
        setModalContent(null);
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }, 300);
    } else {
      setArtworkModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  // Handle modal backdrop click to close
  const handleModalBackdropClick = (e) => {
    if (e.target.classList.contains("cp-modal")) {
      closeModal();
    }
  };

  // Handle download artwork
  const handleDownload = (artwork) => {
    const link = document.createElement("a");
    link.href = getImageUrl(artwork.image);
    link.download = `${artwork.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle mouse events for dragging the gallery
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - discoverWorksRef.current.offsetLeft);
    setScrollLeft(discoverWorksRef.current.scrollLeft);
    setShowScrollIndicator(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Set a timeout to auto-resume scrolling after manual interaction
    if (userInteractionTimeout.current) {
      clearTimeout(userInteractionTimeout.current);
    }
    userInteractionTimeout.current = setTimeout(() => {
      setShowScrollIndicator(true);
    }, 2000);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDragging || !discoverWorksRef.current) return;
      e.preventDefault();

      const x = e.pageX - discoverWorksRef.current.offsetLeft;
      const walk = (x - startX) * 2;

      requestAnimationFrame(() => {
        if (discoverWorksRef.current) {
          discoverWorksRef.current.scrollLeft = scrollLeft - walk;
        }
      });
    },
    [isDragging, startX, scrollLeft]
  );

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setScrollLeft(discoverWorksRef.current.scrollLeft);
    setShowScrollIndicator(false);
    setLastTouchX(e.touches[0].clientX);
    setLastTouchTime(Date.now());
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !discoverWorksRef.current) return;
    e.preventDefault();
    const touchX = e.touches[0].clientX;
    const diff = startX - touchX;

    // Calculate velocity
    const now = Date.now();
    const deltaTime = now - lastTouchTime;
    const deltaX = touchX - lastTouchX;
    setTouchVelocity(deltaX / deltaTime);

    // Update last position and time
    setLastTouchX(touchX);
    setLastTouchTime(now);

    // Update scroll position with improved sensitivity and smoothing
    const sensitivity = 1.2;
    const currentScroll = discoverWorksRef.current.scrollLeft;
    const newPosition = currentScroll + diff * sensitivity;
    setStartX(touchX);

    // Add resistance at edges
    if (newPosition < 0) {
      discoverWorksRef.current.scrollLeft = Math.max(
        newPosition * 0.5,
        -containerWidth * 0.1
      );
    } else if (newPosition > contentWidth - containerWidth) {
      const overscroll = newPosition - (contentWidth - containerWidth);
      discoverWorksRef.current.scrollLeft =
        contentWidth - containerWidth + overscroll * 0.5;
    } else {
      discoverWorksRef.current.scrollLeft = newPosition;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Apply momentum scrolling
    if (Math.abs(touchVelocity) > 0.5) {
      const momentum = touchVelocity * 100;
      const targetScroll = discoverWorksRef.current.scrollLeft + momentum;

      // Animate to target with easing
      const startScroll = discoverWorksRef.current.scrollLeft;
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

        if (discoverWorksRef.current) {
          // Add resistance at edges with smooth bounce
          if (newScroll < 0) {
            discoverWorksRef.current.scrollLeft = Math.max(newScroll * 0.5, 0);
          } else if (newScroll > contentWidth - containerWidth) {
            const overscroll = newScroll - (contentWidth - containerWidth);
            discoverWorksRef.current.scrollLeft =
              contentWidth - containerWidth + overscroll * 0.5;
          } else {
            discoverWorksRef.current.scrollLeft = newScroll;
          }
        }

        if (progress < 1) {
          requestAnimationFrame(animateMomentum);
        } else {
          // Resume auto-scroll after momentum ends and 1s delay
          setTimeout(() => {
            setShowScrollIndicator(true);
          }, 1000);
        }
      };

      requestAnimationFrame(animateMomentum);
    } else {
      // If no momentum, resume auto-scroll after 1s
      setTimeout(() => {
        setShowScrollIndicator(true);
      }, 1000);
    }
  };

  // Handle pause on hover handlers
  const handleMouseEnter = () => {
    setShowScrollIndicator(false);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setShowScrollIndicator(true);
    }

    // Reset manual interaction flag after timeout
    if (!isDragging) {
      if (userInteractionTimeout.current) {
        clearTimeout(userInteractionTimeout.current);
      }
      userInteractionTimeout.current = setTimeout(() => {
        setShowScrollIndicator(true);
      }, 2000);
    }
  };

  // Auto-scrolling functionality DISABLED - Users will manually drag/swipe

  // Optimize resize handling
  useEffect(() => {
    if (!discoverWorksRef.current) return;

    const calculateWidths = () => {
      requestAnimationFrame(() => {
        if (discoverWorksRef.current) {
          setContainerWidth(discoverWorksRef.current.clientWidth);
          setContentWidth(discoverWorksRef.current.scrollWidth);
        }
      });
    };

    const debouncedCalculateWidths = debounce(calculateWidths, 250);

    calculateWidths();
    window.addEventListener("resize", debouncedCalculateWidths);

    return () => {
      window.removeEventListener("resize", debouncedCalculateWidths);
    };
  }, []);

  // Debounce function
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Update scroll position handler
  const handleScroll = useCallback(() => {
    if (!discoverWorksRef.current) return;

    const scrollLeft = discoverWorksRef.current.scrollLeft;
    const itemWidth = 300; // Width of each item
    const currentItem = Math.round(scrollLeft / itemWidth) + 1;
    setCurrentSlide(currentItem);
  }, []);

  // Add scroll event listener
  useEffect(() => {
    const scrollContainer = discoverWorksRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }
  }, [handleScroll]);

  // Update navigation handlers
  const handlePrevClick = () => {
    if (!discoverWorksRef.current) return;
    const itemWidth = 300;
    discoverWorksRef.current.scrollLeft -= itemWidth;
  };

  const handleNextClick = () => {
    if (!discoverWorksRef.current) return;
    const itemWidth = 300;
    discoverWorksRef.current.scrollLeft += itemWidth;
  };

  // Optimize image loading in discover works section
  const renderDiscoverWorkItem = useCallback(
    (artwork, index) => (
      <div
        key={artwork.id}
        className="cp-discover-artwork-item"
        style={{
          animationDelay: `${index * 0.1}s`,
        }}
        onClick={() => handleArtworkSelect(index)}
      >
        <div className="artwork-frame">
          <div className="artwork-image-container">
            <img
              src={getImageUrl(artwork.image)}
              alt={artwork.title}
              className="artwork-image"
              loading={index < 4 ? "eager" : "lazy"}
              decoding="async"
              width="100%"
              height="100%"
            />
            <div className="artwork-info-overlay">
              <h3 className="artwork-title">{artwork.title}</h3>
              <p className="artwork-year">{artwork.year}</p>
            </div>
          </div>
        </div>
      </div>
    ),
    [handleArtworkSelect]
  );

  // Optimize mouse movement handler with throttling to improve performance
  const handleCategoryMouseMove = () => {
    // Removed unused variables and parameter to fix linter errors
  };

  // Scroll to anchor section if state.scrollTo is present
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 200);
      }
    }
  }, [location.state]);

  // Handle discover section video loading
  useEffect(() => {
    if (discoverVideoRef.current) {
      discoverVideoRef.current.addEventListener("loadeddata", () => {
        setIsDiscoverVideoLoaded(true);
      });
    }
  }, []);

  return (
    <div className="collection-page">
      {/* Hero Section */}
      <section className="cp-hero animate-section">
        <div
          className="cp-hero-slides-container"
          style={{
            display: "flex",
            width: "500%",
            height: "100%",
            position: "absolute",
            top: "0",
            left: "0",
            transform: `translateX(-${activeHeroSlide * 20}%)`,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {collectionData.heroImages.map((image, index) => (
            <div
              key={index}
              className={`cp-hero-slide ${
                activeHeroSlide === index ? "active" : ""
              }`}
              style={{
                width: "20%",
                height: "100%",
                flexShrink: 0,
                position: "relative",
                zIndex: index === activeHeroSlide ? 10 : 1,
              }}
            >
              <div className="cp-hero-image-container">
                <img
                  src={image.includes("http") ? image : getImageUrl(image)}
                  alt={`Hero slide ${index + 1}`}
                  className="cp-hero-image"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="cp-hero-overlay"></div>

        {/* Hero Slide Indicators */}
        <div className="cp-hero-indicators">
          {collectionData.heroImages.map((_, index) => (
            <button
              key={index}
              className={`cp-hero-indicator ${
                activeHeroSlide === index ? "active" : ""
              }`}
              onClick={() => goToHeroSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="cp-hero-content">
          <h1 className="cp-hero-title">
            <span className="translated-text">KHÁM PHÁ BỘ SƯU TẬP</span>
          </h1>
          <p className="cp-hero-subtitle">
            <span className="translated-text">
              Khám phá các kiệt tác từ khắp nơi, trải dài qua hàng nghìn năm
              sáng tạo của con người
            </span>
          </p>
        </div>

        <div
          className="diagonal-divider bottom enhanced"
          style={{ backgroundColor: "transparent" }}
        ></div>
      </section>

      {/* Discover the Works Section */}
      <section className="cp-discover-section animate-section">
        <div className="cp-discover-video-container">
          <video
            ref={discoverVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className={`cp-discover-video ${
              isDiscoverVideoLoaded ? "loaded" : ""
            }`}
          >
            <source
              src="https://res.cloudinary.com/dn0br7hj0/video/upload/v1748787810/about/Hero_Abouts_Resize.mp4"
              type="video/mp4"
            />
          </video>
          <div className="cp-discover-overlay"></div>
        </div>

        <div className="cp-discover-content">
          <div className="cp-section-header">
            <h2 className="cp-section-title">Khám Phá Tác Phẩm</h2>
            <div className="cp-section-divider"></div>
          </div>

          <div className="cp-discover-container">
            <div className="cp-discover-gradient-left"></div>
            <div className="cp-discover-gradient-right"></div>

            <button
              className="cp-discover-nav cp-discover-prev"
              onClick={handlePrevClick}
              aria-label="Previous artworks"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              className="cp-discover-nav cp-discover-next"
              onClick={handleNextClick}
              aria-label="Next artworks"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* <div className="cp-discover-counter">
              <span className="current">{currentSlide}</span>
              <span className="separator">/</span>
              <span className="total">{collectionData.artworks.length}</span>
            </div> */}

            <div
              className={`cp-discover-works cp-wavy-gallery ${
                isDragging ? "dragging" : ""
              }`}
              ref={discoverWorksRef}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseLeave={(e) => {
                handleMouseUp();
                handleMouseLeave(e);
              }}
              onMouseMove={handleMouseMove}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={handleMouseEnter}
            >
              <div className="cp-discover-inner-container">
                {collectionData.artworks.map((artwork, index) =>
                  renderDiscoverWorkItem(artwork, index)
                )}
              </div>
            </div>

            <div
              className={`cp-scroll-indicator ${
                !showScrollIndicator ? "hidden" : ""
              }`}
            >
              <div className="cp-scroll-text">Trượt để khám phá</div>
              <div className="cp-scroll-arrows-indicator">
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Collection Section */}
      <section className="cp-categories-section" id="complete-collection">
        <div className="cp-categories-container">
          <div className="cp-categories-header">
            <h2 className="cp-categories-title">Bộ Sưu Tập Hoàn Chỉnh</h2>
            <p className="cp-categories-description">
              Khám phá bộ sưu tập đa dạng của chúng tôi được tổ chức theo từng
              danh mục
            </p>
          </div>

          <div
            className="cp-categories-grid"
            ref={categoryGridRef}
            onMouseMove={handleCategoryMouseMove}
          >
            {collectionData.categories.map((category) => (
              <div
                key={category.id}
                className="cp-category-card"
                onClick={(e) => handleCategorySelect(category, e)}
              >
                <div className="cp-category-image-container">
                  <img
                    src={getImageUrl(category.image)}
                    alt={category.title}
                    className="cp-category-image"
                    loading="lazy"
                  />
                  <div className="cp-category-overlay"></div>
                </div>
                <h3 className="cp-category-title">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Artwork Section */}
      <section className="cp-featured-artwork-section" id="featured-artwork">
        <div className="cp-featured-container">
          <div className="cp-featured-left">
            <div className="cp-featured-image-container">
              <img
                src={getImageUrl(
                  collectionData.artworks[selectedArtwork].image
                )}
                alt={collectionData.artworks[selectedArtwork].title}
                className="cp-featured-image"
              />
              <div className="cp-artwork-tags">
                {collectionData.artworks[selectedArtwork].tags.map(
                  (tag, index) => (
                    <span key={index} className="cp-artwork-tag">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="cp-featured-right">
            <div className="cp-featured-details">
              <h2 className="cp-featured-title">
                {collectionData.artworks[selectedArtwork].title}
              </h2>

              <div className="cp-artwork-metadata">
                <div className="cp-metadata-item">
                  <span className="cp-metadata-label">Tác giả</span>
                  <span className="cp-metadata-value">
                    {collectionData.artworks[selectedArtwork].artist}
                  </span>
                </div>

                <div className="cp-metadata-item">
                  <span className="cp-metadata-label">Năm</span>
                  <span className="cp-metadata-value">
                    {collectionData.artworks[selectedArtwork].year}
                  </span>
                </div>

                {/* <div className="cp-metadata-item">
                  <span className="cp-metadata-label">Địa điểm</span>
                  <span className="cp-metadata-value">
                    {collectionData.artworks[selectedArtwork].location}
                  </span>
                </div> */}
              </div>

              <div className="cp-artwork-description">
                <p>{collectionData.artworks[selectedArtwork].description}</p>
              </div>

              <div className="cp-artwork-location">
                <div className="cp-location-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>

                <div className="cp-location-details">
                  <h4 className="cp-location-title">Địa điểm</h4>
                  <p className="cp-location-description">
                    {collectionData.artworks[selectedArtwork].location}
                  </p>
                </div>
              </div>

              <a className="cp-visit-button" href="/visit">
                Lập lịch thăm viếng
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="cp-artwork-navigation">
          <button
            className="cp-nav-button cp-prev-button"
            onClick={() => navigateArtwork("prev")}
            aria-label="Previous artwork"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div className="cp-nav-indicators">
            {collectionData.artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                className={`cp-nav-indicator ${
                  selectedArtwork === index ? "active" : ""
                }`}
                onClick={() => setSelectedArtwork(index)}
                aria-label={`View ${artwork.title}`}
              ></button>
            ))}
          </div>

          <button
            className="cp-nav-button cp-next-button"
            onClick={() => navigateArtwork("next")}
            aria-label="Next artwork"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </section>

      {/* Immersive Collection Highlights Section */}
      <section className="cp-highlights-section">
        <div className="cp-highlights-container">
          <h2 className="cp-categories-title">Điểm Nhấn Bộ Sưu Tập</h2>
          <p className="cp-highlights-description">
            Khám phá những tác phẩm nghệ thuật tiêu biểu nhất của chúng tôi
            thông qua video và hình ảnh chi tiết
          </p>

          <div className="cp-highlights-grid">
            {collectionData.highlights.map((highlight) => (
              <div
                key={highlight.id}
                className={`cp-highlight-item ${highlight.type}-item`}
                onClick={() =>
                  highlight.type === "video"
                    ? openVideoModal(highlight)
                    : openArtworkDetail(highlight)
                }
                data-highlight-id={highlight.id}
              >
                <div className="cp-highlight-thumbnail">
                  <img
                    src={getImageUrl(highlight.image)}
                    alt={highlight.title}
                    className="cp-highlight-img"
                    loading="lazy"
                  />

                  {highlight.type === "video" && (
                    <div className="cp-play-button">
                      <svg viewBox="0 0 100 100" className="cp-play-icon">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          className="cp-play-circle"
                        ></circle>
                        <polygon
                          points="40,30 70,50 40,70"
                          className="cp-play-triangle"
                        ></polygon>
                      </svg>
                      <span className="cp-video-indicator">WATCH VIDEO</span>
                    </div>
                  )}

                  <div className="cp-highlight-gradient"></div>
                  <span className="cp-highlight-category">
                    {highlight.category}
                  </span>
                </div>

                <div className="cp-highlight-content">
                  <h3 className="cp-highlight-title">{highlight.title}</h3>
                  <p className="cp-highlight-type">
                    {highlight.type === "video" ? (
                      <>
                        <span className="cp-video-icon">
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M8 5v14l11-7z" fill="currentColor"></path>
                          </svg>
                        </span>
                        <span className="cp-video-tag">VIDEO</span>
                      </>
                    ) : (
                      <span className="cp-image-tag">GALLERY</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artwork Category Modal */}
      {artworkModalOpen && modalContent && modalContent.type === "category" && (
        <div className="cp-modal cp-category-modal" onClick={closeModal}>
          <div
            className="cp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cp-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            {/* Enhanced Category Hero Section */}
            <div
              className="cp-category-hero"
              style={{
                backgroundImage: `url(${getImageUrl(
                  modalContent.category.image
                )})`,
              }}
            >
              <div className="cp-category-hero-overlay"></div>
              <div className="cp-category-hero-content">
                <button className="cp-back-button" onClick={closeModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 12H5M12 19l-7-7 7-7"></path>
                  </svg>
                  <span>Back to Collections</span>
                </button>

                <h2 className="cp-category-hero-title">
                  {modalContent.category.title}
                </h2>
                <p className="cp-category-hero-description">
                  Discover masterpieces of{" "}
                  {modalContent.category.title.toLowerCase()} from ancient to
                  modern times
                </p>
              </div>
            </div>

            {/* Category Artworks Section */}
            <div className="cp-category-artworks-section">
              <div className="cp-category-artworks-container">
                <div className="cp-category-artworks-header">
                  <h3 className="cp-category-artworks-title">
                    Browse Collection
                  </h3>
                  <p className="cp-category-artworks-count">
                    <span>{modalContent.artworks.length}</span> items
                  </p>
                </div>

                <div className="cp-category-artworks-grid">
                  {modalContent.artworks.map((artwork, index) => (
                    <div
                      key={artwork.id}
                      className="cp-category-artwork-card"
                      style={{ "--index": index }}
                      onClick={() => openArtworkDetail(artwork)}
                    >
                      <div className="cp-category-artwork-image-container">
                        <img
                          src={getImageUrl(artwork.image)}
                          alt={artwork.title}
                          loading="lazy"
                        />
                        <div className="cp-category-artwork-overlay"></div>
                      </div>
                      <div className="cp-category-artwork-info">
                        <h3 className="cp-category-artwork-title">
                          {artwork.title}
                        </h3>
                        <p className="cp-category-artwork-year">
                          {artwork.year}
                        </p>
                        <div className="cp-category-artwork-tags">
                          {artwork.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="cp-category-artwork-tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artwork Detail Modal */}
      {artworkModalOpen && modalContent && modalContent.type !== "category" && (
        <div className="cp-modal cp-artwork-modal" onClick={closeModal}>
          <div
            className="cp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cp-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            <div className="cp-artwork-modal-body">
              <div className="cp-artwork-modal-image-container">
                <img
                  src={getImageUrl(
                    collectionData.artworks[selectedArtwork].image
                  )}
                  alt={collectionData.artworks[selectedArtwork].title}
                  className="cp-artwork-modal-image"
                />

                <div className="cp-artwork-modal-actions">
                  <button
                    className="cp-artwork-action-button cp-artwork-zoom"
                    title="Phóng to"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>

                  <button
                    className="cp-artwork-action-button"
                    onClick={() =>
                      handleDownload(collectionData.artworks[selectedArtwork])
                    }
                    title="Tải xuống"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cp-artwork-modal-details">
                <h3 className="cp-artwork-modal-title">
                  {collectionData.artworks[selectedArtwork].title}
                </h3>

                <div className="cp-artwork-modal-metadata">
                  <div className="cp-artwork-modal-artist">
                    <span className="cp-metadata-label">Nghệ sĩ:</span>
                    <span className="cp-metadata-value">
                      {collectionData.artworks[selectedArtwork].artist}
                    </span>
                  </div>

                  <div className="cp-artwork-modal-year">
                    <span className="cp-metadata-label">Năm:</span>
                    <span className="cp-metadata-value">
                      {collectionData.artworks[selectedArtwork].year}
                    </span>
                  </div>

                  <div className="cp-artwork-modal-location">
                    <span className="cp-metadata-label">Vị trí:</span>
                    <span className="cp-metadata-value">
                      {collectionData.artworks[selectedArtwork].location}
                    </span>
                  </div>
                </div>

                <div className="cp-artwork-modal-tags">
                  {collectionData.artworks[selectedArtwork].tags &&
                    collectionData.artworks[selectedArtwork].tags.map(
                      (tag, index) => (
                        <span key={index} className="cp-artwork-modal-tag">
                          {tag}
                        </span>
                      )
                    )}
                </div>

                <div className="cp-artwork-modal-description">
                  <p>{collectionData.artworks[selectedArtwork].description}</p>
                </div>

                <div className="cp-artwork-modal-visit">
                  <div className="cp-location-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>

                  <div className="cp-artwork-modal-visit-info">
                    <h4 className="cp-visit-title">Vị trí trưng bày</h4>
                    <p className="cp-visit-description">
                      {collectionData.artworks[selectedArtwork].location}
                    </p>
                  </div>
                </div>

                <a href="/visit" className="cp-artwork-modal-cta">
                  Lên kế hoạch tham quan
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Video Modal with YouTube embedding */}
      {videoModalOpen && modalContent && (
        <div
          className={`cp-modal cp-video-modal ${
            videoModalClosing ? "closing" : ""
          }`}
          onClick={handleModalBackdropClick}
        >
          <div
            className="cp-modal-content cp-video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cp-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            {/* Artistic Decorative Elements */}
            <div className="cp-video-decorative-element top-left"></div>
            <div className="cp-video-decorative-element bottom-right"></div>
            <div className="cp-video-decorative-element center"></div>

            <div className="cp-modal-video">
              <div className="cp-video-container">
                {/* Loading indicator */}
                <div className="cp-video-loading">
                  <div className="cp-video-loading-circle"></div>
                </div>

                {/* YouTube iframe */}
                <iframe
                  className="cp-youtube-frame"
                  src={`https://www.youtube.com/embed/${modalContent.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                  title={modalContent.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="cp-modal-video-details">
                <div className="cp-modal-video-header">
                  <h3 className="cp-modal-video-title">{modalContent.title}</h3>
                  <span className="cp-modal-video-category">
                    {modalContent.category}
                  </span>
                </div>
                <p className="cp-modal-video-description">
                  {modalContent.description}
                </p>

                {/* Related Videos Section */}
                <div className="cp-video-related">
                  <h4 className="cp-video-related-title">Video Liên Quan</h4>
                  <div className="cp-video-related-items">
                    {collectionData.highlights
                      .filter(
                        (item) =>
                          item.id !== modalContent.id && item.type === "video"
                      )
                      .slice(0, 5)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="cp-video-related-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalContent(item);
                          }}
                        >
                          <img src={getImageUrl(item.image)} alt={item.title} />
                          <p className="cp-video-related-item-title">
                            {item.title}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
