import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaBars,
  FaChevronDown,
  FaChevronRight,
  FaChevronUp,
  FaFacebook,
  FaGift,
  FaInstagram,
  FaSearch,
  FaShoppingBag,
  FaTicketAlt,
  FaTimes,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { IoIosArrowRoundForward, IoIosArrowBack } from "react-icons/io";
import { RiShoppingBag4Fill } from "react-icons/ri";
import { SiTiktok } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import LoginModal from "../Auth/LoginModal";
import "./Navbar.css";

// Icon components using react-icons
const SearchIcon = () => <FaSearch size={16} />;
const ChevronDown = () => <FaChevronDown size={14} />;
const ChevronRight = () => <FaChevronRight size={16} />;
const MenuIcon = () => (
  <div className="menu-icon">
    <div className="line"></div>
    <div className="line"></div>
    <div className="line"></div>
  </div>
);
const HamburgerIcon = () => <FaBars size={24} />;
const ArrowRightIcon = () => <FaArrowRight size={20} />;
const CloseIcon = () => <FaTimes size={24} />;
const BoutiqueIcon = () => <FaShoppingBag className="btn-icon" />;
const TicketIcon = () => <FaTicketAlt className="btn-icon" />;
const CloseDropdownIcon = () => <FaTimes size={24} />;
const PatronIcon = () => <FaGift size={24} />;

// Social media icons
const FacebookIcon = () => <FaFacebook size={18} />;
const InstagramIcon = () => <FaInstagram size={18} />;
const TikTokIcon = () => <SiTiktok size={18} />;
const YoutubeIcon = () => <FaYoutube size={18} />;
const ChevronUp = () => <FaChevronUp size={14} />;

// Comprehensive search data - scans all content in the project
const searchData = [
  // Visit page sections
  {
    id: 1,
    title: "Giờ mở cửa & vé vào cửa",
    description: "Thông tin về giờ mở cửa và vé vào cửa bảo tàng",
    category: "Trải nghiệm",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/Th%C3%B4ng%202.webp",
    path: "/visit#hours",
  },
  {
    id: 2,
    title: "Giá vé",
    description: "Thông tin về giá vé và các loại vé",
    category: "Trải nghiệm",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/Th%C3%B4ng%202.webp",
    path: "/visit#tickets",
  },
  {
    id: 3,
    title: "Thành viên",
    description: "Thông tin về chương trình thành viên và đặc quyền",
    category: "Trải nghiệm",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/Th%C3%B4ng%202.webp",
    path: "/visit#membership",
  },
  {
    id: 4,
    title: "Nội quy tham quan",
    description: "Quy định và nội quy khi tham quan bảo tàng",
    category: "Trải nghiệm",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/Th%C3%B4ng%202.webp",
    path: "/visitor-rules",
  },

  // Exhibitions sections
  {
    id: 5,
    title: "Triển lãm",
    description: "Các triển lãm hiện tại và sắp tới",
    category: "Triển lãm",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784685/collections/N%E1%BB%93i%20%C4%90%E1%BA%A5t.webp",
    path: "/exhibitions",
  },
  {
    id: 6,
    title: "Trải nghiệm có hướng dẫn",
    description: "Các tour tham quan có hướng dẫn viên",
    category: "Triển lãm",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784685/collections/N%E1%BB%93i%20%C4%90%E1%BA%A5t.webp",
    path: "/exhibitions?tab=guided-tours",
  },

  // Explore sections
  {
    id: 7,
    title: "Bộ sưu tập",
    description: "Khám phá bộ sưu tập nghệ thuật của bảo tàng",
    category: "Khám phá",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784658/collections/thesunset.jpg",
    path: "/collection",
  },
  {
    id: 8,
    title: "Lộ trình tham quan",
    description: "Các lộ trình tham quan được đề xuất",
    category: "Khám phá",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784658/collections/thesunset.jpg",
    path: "/visitor-trails",
  },
  {
    id: 9,
    title: "Vườn",
    description: "Khám phá khu vườn của bảo tàng",
    category: "Khám phá",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784685/collections/N%E1%BB%93i%20%C4%90%E1%BA%A5t.webp",
    path: "/the-gardens",
  },

  // Support sections
  {
    id: 10,
    title: "Hỗ trợ khách tham quan",
    description: "Thông tin hỗ trợ và hướng dẫn cho khách tham quan",
    category: "Hỗ trợ",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "/support",
  },
  {
    id: 11,
    title: "FAQ",
    description: "Câu hỏi thường gặp và giải đáp",
    category: "Hỗ trợ",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "/visit-info#faq",
  },
  {
    id: 12,
    title: "Trở thành Nhà bảo trợ",
    description: "Thông tin về chương trình bảo trợ bảo tàng",
    category: "Hỗ trợ",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "/support#patron",
  },

  // Shop sections
  {
    id: 13,
    title: "Cửa hàng trực tuyến",
    description: "Mua sắm các sản phẩm lưu niệm từ bảo tàng",
    category: "Mua sắm",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "https://online-museeduphin.netlify.app/",
  },

  // Add room search data
  {
    id: "room-traditional",
    title: "The ChildHood",
    description:
      "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-modern",
    title: "White Bauhunia",
    description:
      "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784658/collections/thesunset.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-luxury",
    title: "The chill 1",
    description:
      "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget1",
    title: "The Chill 2",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784658/collections/thesunset.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget2",
    title: "The Memory",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget3",
    title: "The Sunset",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784658/collections/thesunset.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget4",
    title: "The Train",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
    path: "/visit-info#homestay",
  },
];

const Navbar = () => {
  const [showSearchBox, setShowSearchBox] = useState(false);
  const [showSeeMoreDropdown, setShowSeeMoreDropdown] = useState(false);
  const [showVisitDropdown, setShowVisitDropdown] = useState(false);
  const [showExhibitionsDropdown, setShowExhibitionsDropdown] = useState(false);
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [mobileSearchTerm, setMobileSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // Mobile submenu states
  const [showMobileSubmenu, setShowMobileSubmenu] = useState(false);
  const [currentMobileSubmenu, setCurrentMobileSubmenu] = useState("");
  const [submenuItems, setSubmenuItems] = useState([]);

  const navigate = useNavigate();
  const navItemsRef = useRef([]);
  const seeMoreRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSubmenuRef = useRef(null);
  const searchResultsRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Add GTranslate script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.gtranslate.net/widgets/latest/ln.js";
    script.defer = true;
    document.body.appendChild(script);

    window.gtranslateSettings = {
      default_language: "vi",
      native_language_names: true,
      detect_browser_language: true,
      languages: ["vi", "en"],
      wrapper_selector: ".gtranslate_wrapper",
      flags: false,
      switcher_text_color: "#666",
      switcher_arrow_color: "#666",
      switcher_border_color: "#ccc",
      switcher_background_color: "#fff",
      switcher_background_shadow_color: "#efefef",
      switcher_background_hover_color: "#fff",
      dropdown_text_color: "#000",
      dropdown_hover_color: "#fff",
      dropdown_background_color: "#eee",
      url_structure: "none",
      custom_domains: false,
      no_translate_class: "notranslate",
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle search functionality
  const handleSearchInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 1) {
      performSearch(value);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Mobile search input change handler
  const handleMobileSearchInputChange = (e) => {
    const value = e.target.value;
    setMobileSearchTerm(value);

    if (value.trim().length > 1) {
      performSearch(value);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  // Enhanced search to scan all content
  const performSearch = (query) => {
    setIsSearching(true);
    setShowSearchResults(true);

    // Search in real-time without delay
    const results = searchData.filter((item) => {
      const searchTermLower = query.toLowerCase();
      const titleMatch = item.title.toLowerCase().includes(searchTermLower);
      const descriptionMatch = item.description
        .toLowerCase()
        .includes(searchTermLower);
      const categoryMatch = item.category
        .toLowerCase()
        .includes(searchTermLower);

      return titleMatch || descriptionMatch || categoryMatch;
    });

    // Sort results with exact title matches first
    results.sort((a, b) => {
      const aExactMatch = a.title.toLowerCase() === query.toLowerCase();
      const bExactMatch = b.title.toLowerCase() === query.toLowerCase();

      if (aExactMatch && !bExactMatch) return -1;
      if (!aExactMatch && bExactMatch) return 1;

      // Sort by category as secondary criteria
      return a.category.localeCompare(b.category);
    });

    setSearchResults(results);
    setIsSearching(false);
  };

  // Improved search result navigation with hash-based routing
  const handleSearchResultClick = (path) => {
    setShowSearchBox(false);
    setShowSearchResults(false);
    setSearchTerm("");
    setMobileSearchTerm("");
    setShowMobileMenu(false); // Close mobile menu

    // Handle external links
    if (path.startsWith("http")) {
      window.open(path, "_blank");
      return;
    }

    // Handle internal navigation with hash fragments
    if (path.includes("#")) {
      const [pagePath, sectionId] = path.split("#");

      // If we're already on the correct page, just scroll to the section
      if (
        window.location.pathname === pagePath ||
        (pagePath === "/" && window.location.pathname === "")
      ) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Navigate to the page, then scroll to section
        navigate(path);
      }
    } else {
      // Regular page navigation without hash
      navigate(path);
    }
  };

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event) => {
      // We're removing this condition so clicking outside won't close the search results
      // Only the X button will close it now

      // Keep the search input click handler to allow focus/interactions
      if (
        searchInputRef.current &&
        searchInputRef.current.contains(event.target)
      ) {
        // Allow clicks on the search input
        return;
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Thêm hàm xử lý khi nhấp vào liên kết trong mobile menu
  const handleNavItemClick = (path) => {
    setShowMobileMenu(false);
    navigate(path);
  };

  // Hàm để mở mobile submenu
  const openMobileSubmenu = (menuType) => {
    setCurrentMobileSubmenu(menuType);

    let items = [];

    switch (menuType) {
      case "GÓI KHÔNG LƯU TRÚ":
        items = [
          { title: "Lối rừng", path: "/visit/package/loi-rung" },
          { title: "Dáng sương", path: "/visit/package/dang-suong" },
          { title: "Nghệ nhân", path: "/visit/package/nghe-nhan" },
          { title: "Hồn núi", path: "/visit/package/hon-nui" },
          { title: "Lửa thiêng", path: "/visit/package/lua-thieng" },
        ];
        break;
      case "GÓI LƯU TRÚ":
        items = [
          { title: "Đêm thông", path: "/visit/package/dem-thong" },
          { title: "Bóng cây HơNia", path: "/visit/package/bong-cay-konia" },
          {
            title: "Trường ca Langbiang",
            path: "/visit/package/truong-ca-langbiang",
          },
        ];
        break;
      case "CÁC CĂN PHÒNG NGHỆ THUẬT":
        items = [
          { title: "The ChildHood", path: "/visit/package/the-childhood" },
          { title: "White Bauhunia", path: "/visit/package/white-bauhunia" },
          { title: "The chill 1", path: "/visit/package/the-chill-1" },
          { title: "The chill 2", path: "/visit/package/the-chill-2" },
          { title: "The Memory", path: "/visit/package/the-memory" },
          { title: "The Sunset", path: "/visit/package/the-sunset" },
          { title: "The Train", path: "/visit/package/the-train" },
        ];
        break;
      case "CÁC CHƯƠNG TRÌNH ĐỊNH KỲ":
        items = [
          {
            title: "Tour đêm huyền thoại LangBiang",
            path: "/visit/package/dem-huyen-thoai",
          },
          {
            title: "Giai điệu đại ngàn - Lắng nghe thông hát",
            path: "/visit/package/giai-dieu-dai-ngan",
          },
          {
            title: "Ươm mầm sáng tạo",
            path: "/visit/package/uom-mam-sang-tao",
          },
        ];
        break;
      default:
        break;
    }

    setSubmenuItems(items);
    setShowMobileSubmenu(true);

    if (mobileSubmenuRef.current) {
      mobileSubmenuRef.current.classList.remove("hide");
      mobileSubmenuRef.current.classList.add("show");
    }
  };

  // Hàm để đóng mobile submenu
  const closeMobileSubmenu = () => {
    if (mobileSubmenuRef.current) {
      mobileSubmenuRef.current.classList.remove("show");
      mobileSubmenuRef.current.classList.add("hide");

      // Đợi animation hoàn thành trước khi ẩn submenu
      setTimeout(() => {
        setShowMobileSubmenu(false);
      }, 300);
    } else {
      setShowMobileSubmenu(false);
    }
  };

  // Hiệu ứng hover cho các menu items
  useEffect(() => {
    navItemsRef.current.forEach((item) => {
      if (!item) return;

      const link = item.querySelector("a");
      const underline = item.querySelector(".underline");

      if (!link || !underline) return;

      const tl = gsap.timeline({ paused: true });

      // Hiệu ứng underline ngắn chạy từ trong ra ngoài
      tl.fromTo(
        underline,
        {
          width: "0%",
        },
        {
          width: "30%",
          duration: 0.3,
          ease: "power2.out",
        }
      );

      link.addEventListener("mouseenter", () => tl.play());
      link.addEventListener("mouseleave", () => tl.reverse());

      return () => {
        link.removeEventListener("mouseenter", () => tl.play());
        link.removeEventListener("mouseleave", () => tl.reverse());
      };
    });

    // Hiệu ứng cho See More
    if (seeMoreRef.current) {
      const underline = seeMoreRef.current.querySelector(".underline");

      if (underline) {
        const tl = gsap.timeline({ paused: true });

        tl.fromTo(
          underline,
          {
            width: "0%",
          },
          {
            width: "100%",
            duration: 0.3,
            ease: "power2.out",
          }
        );

        seeMoreRef.current.addEventListener("mouseenter", () => tl.play());
        seeMoreRef.current.addEventListener("mouseleave", () => {
          if (!showSeeMoreDropdown) {
            tl.reverse();
          }
        });

        return () => {
          seeMoreRef.current?.removeEventListener("mouseenter", () =>
            tl.play()
          );
          seeMoreRef.current?.removeEventListener("mouseleave", () =>
            tl.reverse()
          );
        };
      }
    }
  }, [showSeeMoreDropdown]);

  // Focus input khi search box hiển thị
  useEffect(() => {
    if (showSearchBox && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearchBox]);

  // Xử lý click bên ngoài để đóng dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      // Only close language dropdowns when clicking outside
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Disable scroll khi hiển thị dropdown
  useEffect(() => {
    if (
      showSeeMoreDropdown ||
      showMobileMenu ||
      showVisitDropdown ||
      showExhibitionsDropdown ||
      showExploreDropdown
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [
    showSeeMoreDropdown,
    showMobileMenu,
    showVisitDropdown,
    showExhibitionsDropdown,
    showExploreDropdown,
  ]);

  // Xử lý tìm kiếm
  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (!searchTerm.trim()) return; // Không thực hiện tìm kiếm nếu input trống

    performSearch(searchTerm);
  };

  // Xử lý tìm kiếm từ mobile menu
  const handleMobileSearch = (e) => {
    if (e) e.preventDefault();
    if (!mobileSearchTerm.trim()) return;

    performSearch(mobileSearchTerm);
  };

  // Tắt search box khi nhấn phím Escape
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        if (showSearchBox) {
          setShowSearchBox(false);
        }
        if (showSeeMoreDropdown) {
          setShowSeeMoreDropdown(false);
        }
        if (showMobileMenu) {
          setShowMobileMenu(false);
        }
        if (showVisitDropdown) {
          setShowVisitDropdown(false);
        }
        if (showExhibitionsDropdown) {
          setShowExhibitionsDropdown(false);
        }
        if (showExploreDropdown) {
          setShowExploreDropdown(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [
    showSearchBox,
    showSeeMoreDropdown,
    showMobileMenu,
    showVisitDropdown,
    showExhibitionsDropdown,
    showExploreDropdown,
  ]);

  // Load user data on component mount
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setCurrentUser(JSON.parse(userData));
    }
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("rememberMe");
    setCurrentUser(null);
    setShowUserDropdown(false);
    window.location.reload();
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // User button component
  const UserButton = () => {
    if (currentUser) {
      return (
        <div className="user-dropdown" ref={userDropdownRef}>
          <button
            className="btn btn-outline user-btn"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <FaUser size={16} />
          </button>
          {showUserDropdown && (
            <div className="user-dropdown-menu">
              <div className="user-info">
                <FaUser size={24} className="user-icon" />
                <div className="user-details">
                  <span className="user-name">{currentUser.fullName}</span>
                  <span className="user-email">{currentUser.email}</span>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <button className="logout-button" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          )}
        </div>
      );
    }

    return (
      <button
        className="btn btn-filled"
        onClick={() => setShowLoginModal(true)}
      >
        <FaUser size={16} />
      </button>
    );
  };

  // Render search results
  const renderSearchResults = () => {
    if (!showSearchResults) return null;

    return (
      <div className="search-results-container" ref={searchResultsRef}>
        <div className="search-results-list">
          <div className="search-results-header">
            {isSearching ? (
              <div className="search-loading"></div>
            ) : (
              <div className="search-results-title">
                <div className="search-results-count">
                  {`${searchResults.length} kết quả tìm kiếm cho "${
                    searchTerm || mobileSearchTerm
                  }"`}
                </div>
                <button
                  type="button"
                  className="search-results-close-button"
                  onClick={() => setShowSearchResults(false)}
                  aria-label="Đóng kết quả tìm kiếm"
                >
                  <CloseIcon />
                </button>
              </div>
            )}
          </div>

          {isSearching ? (
            <div className="search-loading"></div>
          ) : searchResults.length > 0 ? (
            <div className="search-results-items">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className={`search-result-item ${
                    result.path.includes("#") ? "section-link" : ""
                  }`}
                  onClick={() => handleSearchResultClick(result.path)}
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    loading="lazy"
                    className="search-result-image"
                  />
                  <div className="search-result-content">
                    <h4 className="search-result-title">{result.title}</h4>
                    <p className="search-result-description">
                      {result.description}
                    </p>
                    <span className="search-result-category">
                      {result.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="search-no-results">
              <h3>Không tìm thấy kết quả</h3>
              <p>
                Chúng tôi không thể tìm thấy kết quả nào cho tìm kiếm của bạn.
                Vui lòng thử từ khóa khác.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Add effect to handle external mobile menu triggers
  useEffect(() => {
    const handleMobileMenuShow = () => {
      setShowMobileMenu(true);
    };

    const handleMobileMenuHide = () => {
      setShowMobileMenu(false);
    };

    // Listen for mobile menu class changes
    const mobileMenuOverlay = document.querySelector(".mobile-menu-overlay");
    if (mobileMenuOverlay) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class"
          ) {
            if (mobileMenuOverlay.classList.contains("show")) {
              handleMobileMenuShow();
            } else {
              handleMobileMenuHide();
            }
          }
        });
      });

      observer.observe(mobileMenuOverlay, {
        attributes: true,
      });

      return () => observer.disconnect();
    }
  }, []);

  // Add event listener for opening dropdowns
  useEffect(() => {
    const handleOpenNavDropdown = (event) => {
      const dropdownType = event.detail.type;

      // Close all dropdowns first
      setShowVisitDropdown(false);
      setShowExhibitionsDropdown(false);
      setShowExploreDropdown(false);
      setShowSeeMoreDropdown(false);
      setShowMobileMenu(false);

      // Scroll to top
      window.scrollTo(0, 0);

      // Open the requested dropdown
      switch (dropdownType) {
        case "KHÁM PHÁ":
          setShowExploreDropdown(true);
          break;
        case "Trải nghiệm":
          setShowVisitDropdown(true);
          break;
        default:
          break;
      }
    };

    window.addEventListener("openNavDropdown", handleOpenNavDropdown);
    return () => {
      window.removeEventListener("openNavDropdown", handleOpenNavDropdown);
    };
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate page transition
    setTimeout(() => {
      window.location.href = "https://museedupin.netlify.app/";
    }, 500);
  };

  return (
    <>
      <div className="comeback-banner">
        <img
          src="https://ik.imagekit.io/8u8lkoqkkm/comeback.jpg?updatedAt=1750746004933"
          alt="Back to Musée Du Pin"
        />
        <a href="https://museedupin.netlify.app" target="_blank">
          <IoIosArrowBack size={20} />
          Trở về trang chủ
        </a>
      </div>
      <header className="navbar-container">
        {/* Desktop Navbar */}
        <div className="navbar-top">
          {/* Left section with search and language */}
          <div className="left-section">
            <div
              className="search-container"
              onClick={() => setShowSearchBox(true)}
            >
              <SearchIcon />
              <span>Tìm kiếm</span>
            </div>

            {/* Replace language dropdown with GTranslate */}
            <div className="gtranslate_wrapper"></div>
          </div>

          {/* Center section with logo */}
          <div className="logo-container">
            <Link to="/">
              <img
                className="logo"
                src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784840/logo/logo-icon.webp"
                alt="Museum Logo"
                loading="lazy"
              />
            </Link>
          </div>

          {/* Desktop Navbar - Right Section */}
          <div className="desktop-right-section">
            <div className="buttons-container">
              <Link
                to="https://online-museeduphin.netlify.app/"
                className="btn btn-filled"
              >
                <BoutiqueIcon />
              </Link>
              <UserButton />
              <Link
                to="https://online-museeduphin.netlify.app/"
                className="btn btn-filled"
              >
                <TicketIcon />
              </Link>
            </div>

            <div
              className="menu-toggle"
              onClick={() => setShowSearchBox(!showSearchBox)}
            >
              <MenuIcon />
            </div>
          </div>

          {/* Mobile elements */}
          <div className="mobile-logo">
            <div onClick={() => setShowMobileMenu(true)}>
              <img
                src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784840/logo/logo-icon.webp"
                alt="Musée Du Pin Logo"
                className="mobile-logo-image notranslate"
                loading="lazy"
              />
            </div>
            <a href="/">
              <span className="museum-name-mobile notranslate">
                Musée Du Pin
              </span>
            </a>
          </div>

          <div className="right-section">
            <UserButton />
            <Link
              to="https://online-museeduphin.netlify.app/"
              target="_blank"
              className="btn btn-outline cart-btn"
            >
              <RiShoppingBag4Fill size={16} />
            </Link>
          </div>
        </div>

        <div className="divider"></div>

        {/* Desktop Navbar Bottom Section */}
        <div className="navbar-bottom">
          <nav className="main-nav">
            <ul>
              <li
                className="nav-item"
                ref={(el) => {
                  navItemsRef.current[0] = el;
                }}
              >
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openMobileSubmenu("GÓI KHÔNG LƯU TRÚ");
                  }}
                >
                  GÓI KHÔNG LƯU TRÚ
                  <div className="underline"></div>
                </Link>
              </li>
              <li
                className="nav-item"
                ref={(el) => {
                  navItemsRef.current[1] = el;
                }}
              >
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openMobileSubmenu("GÓI LƯU TRÚ");
                  }}
                >
                  GÓI LƯU TRÚ
                  <div className="underline"></div>
                </Link>
              </li>
              <li
                className="nav-item"
                ref={(el) => {
                  navItemsRef.current[2] = el;
                }}
              >
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openMobileSubmenu("CÁC CHƯƠNG TRÌNH ĐỊNH KỲ");
                  }}
                >
                  CÁC CHƯƠNG TRÌNH ĐỊNH KỲ
                  <div className="underline"></div>
                </Link>
              </li>
              <li
                className="nav-item"
                ref={(el) => {
                  navItemsRef.current[3] = el;
                }}
              >
                <Link
                  to="#"
                  onClick={(e) => {
                    e.preventDefault();
                    openMobileSubmenu("CÁC CĂN PHÒNG NGHỆ THUẬT");
                  }}
                >
                  CÁC CĂN PHÒNG NGHỆ THUẬT
                  <div className="underline"></div>
                </Link>
              </li>
              <li
                className="nav-item"
                ref={(el) => {
                  navItemsRef.current[4] = el;
                }}
              >
                <Link to="/visit/package/chup-anh-nghe-thuat">
                  CHỤP ẢNH NGHỆ THUẬT
                  <div className="underline"></div>
                </Link>
              </li>
              <li
                className="nav-item"
                ref={(el) => {
                  navItemsRef.current[5] = el;
                }}
              >
                <Link to="/visit/package/phim-dien-anh">
                  PHIM ĐIỆN ẢNH
                  <div className="underline"></div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Search Box as Overlay */}
        {showSearchBox && (
          <div className="search-below-navbar">
            <div className="search-box-container">
              <div className="search-box-inner">
                <div
                  className={`search-input-wrapper ${
                    isFocused || searchTerm ? "has-value" : ""
                  }`}
                >
                  <SearchIcon />
                  <div className="search-input-label">Tìm kiếm</div>
                  <input
                    type="text"
                    placeholder={isFocused ? "" : "Tìm kiếm"}
                    value={searchTerm}
                    onChange={handleSearchInputChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    ref={searchInputRef}
                    className="search-input"
                  />
                </div>
                <button
                  type="button"
                  className={`search-submit-button ${
                    searchTerm.trim() ? "active" : ""
                  }`}
                  onClick={handleSearch}
                  aria-label="Submit search"
                  disabled={!searchTerm.trim()}
                >
                  <ArrowRightIcon />
                </button>
              </div>
              <button
                type="button"
                className="search-close-button"
                onClick={() => {
                  setShowSearchBox(false);
                  // Don't close search results when closing the search box
                  // Only the X in the search results should close them
                }}
                aria-label="Close search"
              >
                <CloseIcon />
              </button>
              {/* Render search results */}
              {renderSearchResults()}
            </div>
          </div>
        )}

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${showMobileMenu ? "show" : ""}`}>
          <div className="mobile-menu-header">
            <button
              className="mobile-close-button"
              onClick={() => setShowMobileMenu(false)}
              aria-label="Close menu"
            >
              <CloseIcon />
            </button>
            {/* Add GTranslate to mobile menu */}
            <div className="gtranslate_wrapper"></div>
          </div>

          <div className="mobile-search">
            <form onSubmit={handleMobileSearch}>
              <div className="mobile-search-input">
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  value={mobileSearchTerm}
                  onChange={handleMobileSearchInputChange}
                />
                <button
                  type="submit"
                  className="mobile-search-button"
                  disabled={!mobileSearchTerm.trim()}
                >
                  <ArrowRightIcon />
                </button>
              </div>
            </form>
            {/* Render mobile search results */}
            {renderSearchResults()}
          </div>

          <div className="mobile-nav-links">
            <div
              className="mobile-nav-item"
              onClick={() => openMobileSubmenu("GÓI KHÔNG LƯU TRÚ")}
            >
              GÓI KHÔNG LƯU TRÚ
              <ChevronRight />
            </div>
            <div
              className="mobile-nav-item"
              onClick={() => openMobileSubmenu("GÓI LƯU TRÚ")}
            >
              GÓI LƯU TRÚ
              <ChevronRight />
            </div>
            <div
              className="mobile-nav-item"
              onClick={() => openMobileSubmenu("CÁC CHƯƠNG TRÌNH ĐỊNH KỲ")}
            >
              CÁC CHƯƠNG TRÌNH ĐỊNH KỲ
              <ChevronRight />
            </div>
            <div
              className="mobile-nav-item"
              onClick={() => openMobileSubmenu("CÁC CĂN PHÒNG NGHỆ THUẬT")}
            >
              CÁC CĂN PHÒNG NGHỆ THUẬT
              <ChevronRight />
            </div>
            <div
              className="mobile-nav-item"
              onClick={() =>
                handleNavItemClick("/visit/package/chup-anh-nghe-thuat")
              }
            >
              CHỤP ẢNH NGHỆ THUẬT
              <ChevronRight />
            </div>
            <div
              className="mobile-nav-item"
              onClick={() => handleNavItemClick("/visit/package/phim-dien-anh")}
            >
              PHIM ĐIỆN ẢNH
              <ChevronRight />
            </div>
          </div>

          <div className="mobile-nav-divider"></div>

          <div className="mobile-secondary-links">
            <div className="mobile-secondary-item">
              <a href="https://online-museeduphin.netlify.app/" target="_blank">
                Cửa hàng lưu niệm <IoIosArrowRoundForward />
              </a>
            </div>
            <div className="mobile-secondary-item">
              <a href="https://museedupin.netlify.app/support" target="_blank">
                Hỗ trợ <span className="notranslate">Musée Du Pin</span>
                <IoIosArrowRoundForward />
              </a>
            </div>
          </div>

          <div className="mobile-social-icons">
            <a
              href="https://www.facebook.com/BaoTangThongDalat"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Facebook"
              onClick={() => setShowMobileMenu(false)}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://www.tiktok.com/@baotangthongdalat?_t=ZS-8wcfw9TGrnm&_r=1"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="TikTok"
              onClick={() => setShowMobileMenu(false)}
            >
              <TikTokIcon />
            </a>
            <a
              href="https://www.youtube.com/channel/UCyxLbhgBPZ3KnGD_KeLCo9A"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="YouTube"
              onClick={() => setShowMobileMenu(false)}
            >
              <YoutubeIcon />
            </a>
          </div>
        </div>

        {/* Mobile Submenu */}
        {showMobileSubmenu && (
          <div
            className={`mobile-submenu ${showMobileSubmenu ? "show" : "hide"}`}
            ref={mobileSubmenuRef}
          >
            <div className="submenu-header">
              <button
                className="back-buttonss"
                onClick={closeMobileSubmenu}
                aria-label="Back to main menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M15 18l-6-6 6-6" />
                </svg>
                Quay lại
              </button>
              <h2 className="submenu-title">{currentMobileSubmenu}</h2>
            </div>

            <div className="submenu-items">
              {submenuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.path}
                  className="submenu-item"
                  onClick={() => {
                    setShowMobileSubmenu(false);
                    setShowMobileMenu(false);
                  }}
                >
                  {item.title}
                  <ChevronRight />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Login Modal */}
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
        />
      </header>
    </>
  );
};

export default Navbar;
