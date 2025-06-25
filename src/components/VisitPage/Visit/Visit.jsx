import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/cloudinary";
import "./Visit.css";

// Hero section background image

const Visit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hours");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [visibleSections, setVisibleSections] = useState({
    hours: false,
    tickets: false,
    membership: false,
  });
  const sectionRefs = {
    hours: useRef(null),
    tickets: useRef(null),
    membership: useRef(null),
  };
  const navRef = useRef(null);
  const heroRef = useRef(null);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchDirection, setTouchDirection] = useState(null);
  const [animatedSections, setAnimatedSections] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [ripples, setRipples] = useState([]);
  const rippleTimeout = useRef(null);
  const scrollTimeout = useRef(null);
  const [navScrolled, setNavScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const horizontalNavRef = useRef(null);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollTop = useRef(0);
  const [playingVideo, setPlayingVideo] = useState({});
  const [hoveredBlock, setHoveredBlock] = useState(null);
  const tooltipTimeout = useRef();

  // Handle hash links when component mounts
  useEffect(() => {
    // Get the hash from the URL
    const hash = location.hash.replace("#", "");

    // If there's a hash and it corresponds to one of our sections, set it as active
    if (hash && sectionRefs[hash]) {
      setActiveSection(hash);

      // Add a small delay to ensure DOM is fully loaded
      setTimeout(() => {
        // Scroll to the section
        sectionRefs[hash].current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location]);

  // Update getCurrentDayTimeInfo function
  // Remove: const getCurrentDayTimeInfo = () => { ... };

  // Enhanced handleScroll to track scroll direction for hiding navbar
  const handleScroll = useCallback(() => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrollingDown(st > lastScrollTop.current && st > 200);
    lastScrollTop.current = st <= 0 ? 0 : st;

    // Original scroll handling logic
    if (heroRef.current && navRef.current) {
      const heroBottom = heroRef.current.getBoundingClientRect().bottom;
      const navHeight = navRef.current.offsetHeight;

      if (heroBottom <= navHeight) {
        setIsNavSticky(true);
      } else {
        setIsNavSticky(false);
      }
    }

    // Determine which section is in view
    let currentSection = "hours";
    const scrollPosition = window.scrollY + (isMobile ? 80 : 100); // Smaller offset for mobile

    // Check sections in reverse order (from bottom to top)
    if (
      sectionRefs.membership.current &&
      scrollPosition >=
        sectionRefs.membership.current.offsetTop - (isMobile ? 120 : 150)
    ) {
      currentSection = "membership";
    } else if (
      sectionRefs.tickets.current &&
      scrollPosition >=
        sectionRefs.tickets.current.offsetTop - (isMobile ? 120 : 150)
    ) {
      currentSection = "tickets";
    }

    setActiveSection(currentSection);
  }, [isMobile]);

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

  // Track horizontal nav scroll position
  useEffect(() => {
    const handleNavScroll = () => {
      if (horizontalNavRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } =
          horizontalNavRef.current;
        // Check if scrolled to the right edge
        const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 20;
        setNavScrolled(isAtEnd);

        // Add or remove scrolled-right class
        if (isAtEnd) {
          horizontalNavRef.current.classList.add("scrolled-right");
        } else {
          horizontalNavRef.current.classList.remove("scrolled-right");
        }
      }
    };

    const navContainer = horizontalNavRef.current;
    if (navContainer) {
      navContainer.addEventListener("scroll", handleNavScroll);
      // Check initial scroll position
      handleNavScroll();
    }

    return () => {
      if (navContainer) {
        navContainer.removeEventListener("scroll", handleNavScroll);
      }
    };
  }, []);

  // Enhanced touch handling for horizontal nav
  const handleNavTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleNavTouchMove = (e) => {
    if (!horizontalNavRef.current) return;

    const touchX = e.touches[0].clientX;
    const diff = touchStartX - touchX;

    // Smooth scroll for better touch experience
    horizontalNavRef.current.scrollLeft += diff / 1.5;
    setTouchStartX(touchX);
  };

  // Thêm vào handle touch events cho mobile
  const handleTouchStart = useCallback((e) => {
    setTouchStartY(e.touches[0].clientY);
  }, []);

  const handleTouchMove = useCallback(
    (e) => {
      const touchY = e.touches[0].clientY;
      const diff = touchStartY - touchY;

      // Xác định hướng vuốt
      if (diff > 30) {
        setTouchDirection("down");
      } else if (diff < -30) {
        setTouchDirection("up");
      }
    },
    [touchStartY]
  );

  const handleTouchEnd = useCallback(() => {
    setTouchDirection(null);
  }, []);

  // Thêm vào logic để nâng cao hiệu ứng visible khi scroll
  useEffect(() => {
    const handleScrollAnimation = () => {
      const sections = document.querySelectorAll(".visit-section");

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.85) {
          if (!animatedSections.includes(section.id)) {
            setAnimatedSections((prev) => [...prev, section.id]);
            section.classList.add("visible");
          }
        }
      });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    // Kích hoạt ngay khi component mount
    handleScrollAnimation();

    return () => {
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, [animatedSections]);

  // Thêm touch events khi component mount
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Thêm smooth scroll effect khi click vào các tabs
  const smoothScrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      // Adjust the offset for mobile and desktop differently
      const yOffset = isMobile ? -70 : isNavSticky ? -70 : -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  // Cải thiện handleNavClick để dùng smoothScrollTo
  const handleNavClick = (section) => {
    setActiveSection(section);

    // Update URL với hash
    window.history.pushState(null, "", `#${section}`);

    // Sử dụng smooth scroll mới
    smoothScrollTo(section);
  };

  // Hàm điều hướng về trang chủ
  const navigateToHome = () => {
    window.location.href = "/";
  };

  // Add this useEffect for section visibility detection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          setVisibleSections((prev) => ({
            ...prev,
            [sectionId]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, options);

    // Observe each section
    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Thêm effect ripple cho các buttons
  const createRipple = useCallback((event) => {
    const button = event.currentTarget;
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();

    // Determine if event is touch or mouse
    const clientX =
      event.clientX || (event.touches && event.touches[0].clientX);
    const clientY =
      event.clientY || (event.touches && event.touches[0].clientY);

    if (!clientX || !clientY) return;

    const ripple = {
      id: Date.now(),
      left: clientX - rect.left - radius,
      top: clientY - rect.top - radius,
      width: diameter,
      height: diameter,
    };

    setRipples((prev) => [...prev, ripple]);

    clearTimeout(rippleTimeout.current);
    rippleTimeout.current = setTimeout(() => {
      setRipples([]);
    }, 600);
  }, []);

  // Cập nhật trạng thái scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);

      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
      }, 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Cải thiện cách hiển thị hero background với hiệu ứng nghệ thuật
  const renderArtisticHero = () => (
    <div className="visit-hero" ref={heroRef}>
      <div className="visit-hero-image-container">
        <img
          src={getImageUrl("Thông 4.webp", {
            width: 1920,
            height: 1080,
            crop: "fill",
          })}
          alt="Musée Du Pin"
          className="visit-hero-image"
        />
        <div className="visit-hero-overlay"></div>
      </div>
    </div>
  );

  // Render the horizontal nav with enhanced mobile support
  const renderNavigationBar = () => {
    // Don't render the navigation bar on mobile
    if (isMobile) return null;

    return (
      <div
        className={`visit-nav-container ${isNavSticky ? "sticky" : ""} ${
          navScrolled ? "scrolled-right" : ""
        }`}
        ref={(el) => {
          navRef.current = el;
          horizontalNavRef.current = el;
        }}
        onTouchStart={handleNavTouchStart}
        onTouchMove={handleNavTouchMove}
      >
        <div className="visit-nav">
          <ul className="visit-nav-list">
            <li
              className={`visit-nav-item ${
                activeSection === "hours" ? "active" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  createRipple(e);
                  handleNavClick("hours");
                }}
                className="visit-nav-button"
              >
                Thời gian tham quan
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.left,
                      top: ripple.top,
                      width: ripple.width,
                      height: ripple.height,
                    }}
                  />
                ))}
              </button>
              <span className="visit-nav-indicator"></span>
            </li>
            <li
              className={`visit-nav-item ${
                activeSection === "tickets" ? "active" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  createRipple(e);
                  handleNavClick("tickets");
                }}
                className="visit-nav-button"
              >
                Giá vé
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.left,
                      top: ripple.top,
                      width: ripple.width,
                      height: ripple.height,
                    }}
                  />
                ))}
              </button>
              <span className="visit-nav-indicator"></span>
            </li>
            <li
              className={`visit-nav-item ${
                activeSection === "membership" ? "active" : ""
              }`}
            >
              <button
                onClick={(e) => {
                  createRipple(e);
                  handleNavClick("membership");
                }}
                className="visit-nav-button"
              >
                Thành viên
                {ripples.map((ripple) => (
                  <span
                    key={ripple.id}
                    className="ripple"
                    style={{
                      left: ripple.left,
                      top: ripple.top,
                      width: ripple.width,
                      height: ripple.height,
                    }}
                  />
                ))}
              </button>
              <span className="visit-nav-indicator"></span>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  // Update ticket options data
  const experiencePackages = {
    nonResidential: [
      {
        id: "loi-rung",
        title: "LỐI RỪNG",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description: "Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.",
        details: [
          "Thưởng thức trà Atiso chào mừng",
          "Tham quan tự do các không gian bảo tàng: hiện vật K'Ho, chân dung Yersin bằng vỏ thông, bộ sưu tập tranh Đà Lạt",
          "1 phần nước uống tự chọn",
        ],
        price: "150.000VND - 250.000VND/người",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Lối Rừng",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "dang-suong",
        title: "DÁNG SƯƠNG",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description:
          "Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
          "1 phần nước uống tự chọn",
        ],
        price: "350.000VND - 450.000VND/người",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Dáng Sương",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "nghe-nhan",
        title: "NGHỆ NHÂN",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description:
          "Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Workshop vẽ tranh, dệt thổ cẩm hoặc nặn gốm (120 phút)",
          "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
        ],
        price: "399.000VND - 599.000VND/người",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Nghệ Nhân",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "hon-nui",
        title: "HỒN NÚI",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Leaflet%20H%E1%BB%93n%20N%C3%BAi.png?updatedAt=1749083706305",
        description:
          "Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
          "Lựa chọn Tour Khám phá rừng nguyên sinh hoặc Worshop",
          "Bữa trưa nhẹ gồm 01 món ăn và 01 thức uống",
        ],
        price: "799.000VND - 999.000VND/người",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm. Tour rừng tối thiểu 5 khách để đảm bảo an toàn",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Hồn Núi",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "lua-thieng",
        title: "LỬA THIÊNG / Pind' Amour",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
        description:
          "Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm",
        details: [
          "Thưởng thức welcome drink chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Chụp ảnh nghệ thuật tại bảo tàng (30 phút)",
          'Trải nghiệm sân khấu Pind\'amour với chương trình Vin Acoustic "Thông Hát" và rượu vang thượng hạng và 01 phần ăn nhẹ',
        ],
        time: "18h - 22h30",
        price: "999.000VND - 1.999.000VND/người",
        note: "Không áp dụng cho trẻ em",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Lửa Thiêng",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
    ],
    residential: [
      {
        id: "dem-thong",
        title: "ĐÊM THÔNG",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description:
          "Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên.",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
          "Lưu trú 1 đêm",
          "Bữa sáng với đặc sản địa phương",
        ],
        price: "499.000VND - 899.000VND/người",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Đêm Thông",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "bong-cay-konia",
        title: "BÓNG CÂY KƠNIA",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description:
          "Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
          "Lưu trú 1 đêm",
          "Bữa sáng với đặc sản địa phương",
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Tour khám phá rừng nguyên sinh ngàn năm",
          "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
        ],
        price: "Liên hệ trực tiếp +84 86 235 6368",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Bóng Cây Kônia",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "truong-ca-langbiang",
        title: "TRƯỜNG CA LANGBIANG",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/daa23646b65e02005b4f.jpg?updatedAt=1749083704100",
        description:
          "Trải nghiệm toàn diện như bản trường ca sống động nhất về Đà Lạt – từ nghệ thuật, thiên nhiên đến âm nhạc. Trọn vẹn cảm xúc 5 giác quan",
        details: [
          "Đưa đón từ sân bay Liên Khương bằng xe VIP",
          "Lưu trú 1 đêm tại phòng nghệ thuật",
          "Tour VIP tham quan toàn bộ bảo tàng + Rừng nguyên sinh",
          'Chương trình "Thông Hát" riêng tư + Rượu vang hảo hạng',
          "Workshop Vẽ tranh, dệt thổ cẩm hoặc nấu ăn cùng nghệ nhân",
          "Bộ ảnh nghệ thuật chuyên nghiệp",
        ],
        price: "Liên hệ trực tiếp +84 86 235 6368",
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Trường Ca Langbiang",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
    ],
    regular: [
      {
        id: "dem-huyen-thoai",
        title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description:
          "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
        details: [
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Trải nghiệm sân khấu tương tác điện ảnh với câu chuyện K'Ho",
          "01 thức uống + 01 snack",
          "Thước phim điện ảnh",
        ],
        time: "19h - 21h (T3-T5 hàng tuần)",
        price: "499.000VND/người",
        video: {
          id: "aozcRuYVPKw",
          title: "Tour Đêm Huyền Thoại Langbiang",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "giai-dieu-dai-ngan",
        title: "GIAI ĐIỆU ĐẠI NGÀN - LẮNG NGHE THÔNG HÁT",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description: "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
        details: ["Rượu vang", "Thức ăn nhẹ", "Âm nhạc theo chủ đề"],
        time: "19h - 22h30 (Thứ 6-T7-CN)",
        price: "799.000VND/người",
        video: {
          id: "aozcRuYVPKw",
          title: "Giai Điệu Đại Ngàn - Lắng Nghe Thông Hát",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
      {
        id: "uom-mam-sang-tao",
        title: "ƯƠM MẦM SÁNG TẠO",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        description: "Các gói trải nghiệm cho bé",
        details: [
          "Workshop: Tay nặn tay vẽ hoặc chế tác đồ thủ công từ thông",
          "Chụp ảnh nghệ thuật tại bảo tàng",
          "01 thức uống + 01 snack",
        ],
        time: "Sáng: 8h - 12h, Chiều: 14h - 18h",
        price: "299.000VND/người",
        video: {
          id: "aozcRuYVPKw",
          title: "Ươm Mầm Sáng Tạo",
          thumbnail: "https://img.youtube.com/vi/aozcRuYVPKw/maxresdefault.jpg",
        },
      },
    ],
  };

  // Update renderTicketOptions function
  const handlePlayVideo = (pkgId) => {
    setPlayingVideo((prev) => ({ ...prev, [pkgId]: true }));
  };

  // Helper to extract Youtube videoId from url or id
  const getYoutubeId = (urlOrId) => {
    if (!urlOrId) return "";
    if (urlOrId.length === 11 && !urlOrId.includes("http")) return urlOrId;
    const match =
      urlOrId.match(/[?&]v=([^&#]+)/) || urlOrId.match(/youtu\.be\/([^?&#]+)/);
    return match ? match[1] : urlOrId;
  };

  const renderPackage = (pkg) => {
    const videoId = pkg.video?.id || "";
    return (
      <div key={pkg.id} className="package-block">
        <h2 className="package-main-title">{pkg.mainTitle}</h2>
        <h3 className="package-title">{pkg.title}</h3>
        <div className="package-image-block">
          <img className="package-image-full" src={pkg.image} alt={pkg.title} />
        </div>
        <div className="package-content-block">
          <div className="package-description">{pkg.description}</div>
          <ul className="package-details-list">
            {pkg.details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
          {pkg.time && (
            <div className="package-time">Thời gian: {pkg.time}</div>
          )}
          <div className="package-price-block">
            <span className="package-price-label">Chi phí tham khảo:</span>
            <span className="package-price-value">{pkg.price}</span>
            {pkg.childPrice && (
              <span className="package-child-price">
                Trẻ em: {pkg.childPrice}
              </span>
            )}
          </div>
          {pkg.note && <div className="package-note">{pkg.note}</div>}
        </div>
        {pkg.video && (
          <div className="package-video-block">
            {!playingVideo[pkg.id] ? (
              <div
                className="video-thumbnail-wrapper"
                onClick={() => handlePlayVideo(pkg.id)}
              >
                <img
                  className="video-thumbnail"
                  src={
                    pkg.video.thumbnail ||
                    `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                  }
                  alt={`Video về ${pkg.title}`}
                  loading="lazy"
                />
                <div className="play-button-overlay">
                  <svg viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="rgba(255,255,255,0.2)"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="rgba(255,255,255,0.3)"
                    />
                    <polygon
                      points="40,30 70,50 40,70"
                      fill="#ffffff"
                      transform="translate(0,0)"
                    />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="video-iframe-wrapper">
                <iframe
                  src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                  title={`Video về ${pkg.title}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderTicketOptions = () => (
    <div className="ticket-options">
      <h2 className="package-main-title">Các gói trải nghiệm</h2>

      <div className="visit-cards">
        <div
          className="visit-card visit-card-vertical"
          onClick={() => navigate("/visit/non-residential")}
        >
          <div className="visit-card-img-wrap">
            <img
              src="https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru.jpg?updatedAt=1749267196332"
              alt="Gói không lưu trú"
              className="visit-card-img"
            />
            <div className="visit-card-overlay" />
            <div className="visit-card-content">
              <h2>Gói không lưu trú</h2>
              <p>
                Trải nghiệm nghệ thuật và văn hóa trong ngày tại Musée Du Pin
              </p>
            </div>
          </div>
        </div>

        <div
          className="visit-card visit-card-vertical"
          onClick={() => navigate("/visit/residential")}
        >
          <div className="visit-card-img-wrap">
            <img
              src="https://ik.imagekit.io/8u8lkoqkkm/Luutru.jpg?updatedAt=1749267196093"
              alt="Gói lưu trú"
              className="visit-card-img"
            />
            <div className="visit-card-overlay" />
            <div className="visit-card-content">
              <h2>Gói lưu trú</h2>
              <p>
                Nghỉ dưỡng và trải nghiệm nghệ thuật trọn vẹn tại Musée Du Pin
              </p>
            </div>
          </div>
        </div>

        <div
          className="visit-card visit-card-vertical"
          onClick={() => navigate("/visit/regular")}
        >
          <div className="visit-card-img-wrap">
            <img
              src="https://ik.imagekit.io/8u8lkoqkkm/Chuongtrinhdinhky.jpg?updatedAt=1749267196289"
              alt="Chương trình định kỳ"
              className="visit-card-img"
            />
            <div className="visit-card-overlay" />
            <div className="visit-card-content">
              <h2>Chương trình định kỳ</h2>
              <p>
                Các sự kiện nghệ thuật đặc sắc diễn ra thường xuyên tại Musée Du
                Pin
              </p>
            </div>
          </div>
        </div>

        <div
          className="visit-card visit-card-vertical"
          onClick={() => navigate("/visit/art-rooms")}
        >
          <div className="visit-card-img-wrap">
            <img
              src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932457/wnggxcv1dn4b6meviasq.png"
              alt="Các căn phòng nghệ thuật"
              className="visit-card-img"
            />
            <div className="visit-card-overlay" />
            <div className="visit-card-content">
              <h2>CÁC CĂN PHÒNG NGHỆ THUẬT</h2>
              <p>Khám phá không gian nghệ thuật độc đáo trong từng căn phòng</p>
            </div>
          </div>
        </div>

        <div
          className="visit-card visit-card-vertical"
          onClick={() => navigate("/visit/package/chup-anh-nghe-thuat")}
        >
          <div className="visit-card-img-wrap">
            <img
              src="https://ik.imagekit.io/8u8lkoqkkm/chupanhnghethuat_doc.jpg?updatedAt=1750298609358"
              alt="Chụp ảnh nghệ thuật"
              className="visit-card-img"
            />
            <div className="visit-card-overlay" />
            <div className="visit-card-content">
              <h2>Chụp ảnh nghệ thuật</h2>
              <p>
                Sở hữu những tấm ảnh nghệ thuật độc đáo trong không gian Bảo
                Tàng
              </p>
            </div>
          </div>
        </div>

        <div
          className="visit-card visit-card-vertical"
          onClick={() => navigate("/visit/package/phim-dien-anh")}
        >
          <div className="visit-card-img-wrap">
            <img
              src="https://ik.imagekit.io/8u8lkoqkkm/phimdienanh_doc.jpg?updatedAt=1750298609321"
              alt="Phim điện ảnh"
              className="visit-card-img"
            />
            <div className="visit-card-overlay" />
            <div className="visit-card-content">
              <h2>Phim điện ảnh</h2>
              <p>
                Lưu giữ kỷ niệm chuyến đi bằng thước phim điện ảnh chuyên nghiệp
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`package-group-content ${
          visibleSections.nonResidential ? "open" : ""
        }`}
      >
        {experiencePackages.nonResidential.map((pkg) => renderPackage(pkg))}
      </div>
      <div
        className={`package-group-content ${
          visibleSections.residential ? "open" : ""
        }`}
      >
        {experiencePackages.residential.map((pkg) => renderPackage(pkg))}
      </div>
      <div
        className={`package-group-content ${
          visibleSections.regular ? "open" : ""
        }`}
      >
        {experiencePackages.regular.map((pkg) => renderPackage(pkg))}
      </div>
    </div>
  );

  // Add ripple effect for better touch feedback
  const createRippleEffect = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple-circle";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 800);
  };

  // Add a bottom navbar for mobile
  const renderBottomNavbar = () => {
    if (!isMobile) return null;

    return (
      <nav
        className={`mobile-bottom-nav fixed-mobile-element ${
          isScrollingDown ? "hidden" : ""
        }`}
      >
        <ul className="mobile-nav-lists">
          <li
            className={`mobile-button-item ${
              activeSection === "hours" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                handleNavClick("hours");
              }}
            >
              <span className="mobile-nav-icon">
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
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </span>
              <span className="mobile-nav-label">Thời gian</span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "tickets" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                handleNavClick("tickets");
              }}
            >
              <span className="mobile-nav-icon">
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
                  <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                  <line x1="1" y1="10" x2="23" y2="10"></line>
                </svg>
              </span>
              <span className="mobile-nav-label">
                Giờ mở cửa & <br /> Chi phí
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "membership" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                handleNavClick("membership");
              }}
            >
              <span className="mobile-nav-icon">
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
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              <span className="mobile-nav-label">Thành viên</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Update the renderMobileScrollTop function to avoid duplication with App.jsx's ScrollToTopButton
  const renderMobileScrollTop = () => {
    // Don't render if we're not on mobile or not scrolled enough
    if (!isMobile || !isScrolling) return null;

    // Check if we're rendering inside the App component where ScrollToTopButton is already used
    const isStandaloneMode = !document.querySelector(".app");

    // Only render in standalone mode
    if (!isStandaloneMode) return null;

    return (
      <button
        className={`mobile-scroll-top fixed-mobile-element visible`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
            fill="currentColor"
          />
        </svg>
      </button>
    );
  };

  // Update useEffect to use our enhanced scroll handler
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  const handleBlockHover = (block) => {
    setHoveredBlock(block);
    clearTimeout(tooltipTimeout.current);
    tooltipTimeout.current = setTimeout(() => setHoveredBlock(null), 3000);
  };
  const handleBlockLeave = () => {
    setHoveredBlock(null);
    clearTimeout(tooltipTimeout.current);
  };

  // return updated component with enhanced mobile support
  return (
    <div
      className={`visit-page ${
        touchDirection ? `touch-${touchDirection}` : ""
      } ${isScrolling ? "is-scrolling" : ""} ${isMobile ? "mobile-view" : ""}`}
    >
      {/* Fix for mobile fixed elements - invisible div creates proper stacking context */}
      {isMobile && (
        <div
          id="mobile-fixed-elements-fix"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: -1,
          }}
        ></div>
      )}

      {/* Hero Section */}
      {renderArtisticHero()}

      {/* Horizontal Navigation */}
      {renderNavigationBar()}

      {/* Hours & Admission Section */}
      <section
        className={`hours-section ${visibleSections.hours ? "visible" : ""}`}
        id="hours"
        ref={sectionRefs.hours}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title main-title">Giờ mở cửa</h2>
          <div className="hours-blocks">
            <div
              className="hours-block"
              onMouseEnter={() => handleBlockHover("nonres")}
              onMouseLeave={handleBlockLeave}
              onClick={() => navigate("/visit/non-residential")}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className="hours-block-icon">
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    stroke="#95a125"
                    strokeWidth="2"
                    fill="#f8f8f3"
                  />
                  <path
                    d="M18 10v8l6 3"
                    stroke="#95a125"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="hours-block-title">Gói không lưu trú</h3>
              <ul className="hours-block-list">
                <li>
                  Giờ mở cửa từ <b>8h-23h</b> hằng ngày
                </li>
                <li>Chi phí theo từng gói dưới đây</li>
              </ul>
              {hoveredBlock === "nonres" && (
                <div className="hours-tooltip">Click để xem chi tiết</div>
              )}
            </div>
            <div
              className="hours-block"
              onMouseEnter={() => handleBlockHover("res")}
              onMouseLeave={handleBlockLeave}
              onClick={() => navigate("/visit/residential")}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <div className="hours-block-icon">
                <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
                  <circle
                    cx="18"
                    cy="18"
                    r="16"
                    stroke="#00695c"
                    strokeWidth="2"
                    fill="#f8f8f3"
                  />
                  <path
                    d="M18 8v10l7 4"
                    stroke="#00695c"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="hours-block-title">Gói có lưu trú</h3>
              <ul className="hours-block-list">
                <li>
                  Giờ mở cửa: <b>24/24</b>
                </li>
                <li>Chi phí theo từng gói dưới đây</li>
              </ul>
              {hoveredBlock === "res" && (
                <div className="hours-tooltip">Click để xem chi tiết</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Ticket Prices Section */}
      <section
        className={` ${visibleSections.tickets ? "visible" : ""}`}
        id="tickets"
        ref={sectionRefs.tickets}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>CHI PHÍ CÁC GÓI TRẢI NGHIỆM</span>
          </h2>

          <div className="ticket-intro">
            <div className="ticket-image-container">
              <img
                src="https://ik.imagekit.io/8u8lkoqkkm/V%C3%A9%20Th%C3%B4ng%20H%C3%A0nh.png?updatedAt=1750336796162"
                alt="Vé tham quan Musée Du Pin"
                className="ticket-illustration"
                loading="lazy"
              />
            </div>
            <p className="ticket-description">
              Một vé cho phép bạn truy cập vào các bộ sưu tập và các chương
              trình triển lãm của Musée Du Pin, cũng như đến bảo tàng để trải
              nghiệm các gói lưu trú tuyệt vời.
            </p>
            <div className="ticket-note">
              Vé có thể được mua trực tiếp tại điểm khi số lượng khách tham quan
              ở bảo tàng thấp (tùy theo sẵn có).
            </div>
          </div>

          {renderTicketOptions()}
          <div className="payment-section">
            <h3 className="section-subtitle">Phương thức thanh toán</h3>
            <p className="payment-details">
              Các phương thức thanh toán được chấp nhận tại quầy vé bảo tàng bao
              gồm tiền mặt, thẻ ngân hàng và chuyển khoản.
            </p>
          </div>
        </div>
      </section>

      {/* Membership Section */}
      <section
        className={` ${visibleSections.membership ? "visible" : ""}`}
        id="membership"
        ref={sectionRefs.membership}
      >
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>THÀNH VIÊN</span>
          </h2>

          <div className="membership-info">
            <h3 className="membership-heading">
              Trở thành thành viên của Hội Bạn bè Musée Du Pin
            </h3>
            <p className="membership-description">
              Hội Bạn bè Musée Du Pin cung cấp nhiều chương trình thành viên
              khác nhau (thanh niên, cá nhân và cặp đôi, gia đình), với mức giá
              từ 350.000đ đến 2.800.000đ.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile-enhanced info box */}
      <div
        className={`visit-info-box ${isMobile ? "mobile-info-box" : ""}`}
        onClick={navigateToHome}
      >
        <div className="visit-info-icon">
          <svg viewBox="0 0 100 100" width="40" height="40">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#00695c"
              strokeWidth="2"
            />
            <path d="M45,30 L55,30 L55,40 L45,40 Z" fill="#00695c" />
            <path d="M45,45 L55,45 L55,70 L45,70 Z" fill="#00695c" />
          </svg>
        </div>
        <div className="visit-info-content">
          <h3 className="visit-info-title">VÀO VÀ RA</h3>
          <p className="visit-info-text">
            Hãy lên kế hoạch trước những gì bạn muốn làm tại bảo tàng vì khi đã
            ra khỏi bảo tàng sẽ không được vào lại.
          </p>
        </div>
      </div>

      {/* Mobile scroll to top button */}
      {renderMobileScrollTop()}

      {/* Mobile Bottom Navigation */}
      {renderBottomNavbar()}
    </div>
  );
};

export default Visit;
