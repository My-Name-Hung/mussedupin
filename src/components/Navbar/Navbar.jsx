import gsap from "gsap";
import React, { useEffect, useRef, useState } from "react";
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
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
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
      "https://ik.imagekit.io/8u8lkoqkkm/V%C3%A9%20Th%C3%B4ng%20H%C3%A0nh.png?updatedAt=1750336796162",
    path: "/visit#hours",
  },
  {
    id: 2,
    title: "Giá vé",
    description: "Thông tin về giá vé và các loại vé",
    category: "Trải nghiệm",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/V%C3%A9%20Th%C3%B4ng%20H%C3%A0nh.png?updatedAt=1750336796162",
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
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932455/hiavdsldaipshiwsfq8s.png",
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
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thechillhood.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-modern",
    title: "White Bauhunia",
    description:
      "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/whitebauhinia.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-luxury",
    title: "The chill 1",
    description:
      "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thechill1.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget1",
    title: "The Chill 2",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thechill2.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget2",
    title: "The Memory",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thememory.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget3",
    title: "The Sunset",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thesunset.jpg",
    path: "/visit-info#homestay",
  },
  {
    id: "room-budget4",
    title: "The Train",
    description:
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    category: "Lưu trú",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thetrain.jpg",
    path: "/visit-info#homestay",
  },

  // Add notranslate to all Musée Du Pin mentions in descriptions
  {
    id: "exhibition-feature",
    title: (
      <>
        Một <span className="notranslate">Musée Du Pin</span> khác
      </>
    ),
    description: (
      <>
        Tận hưởng chuyến tham quan tránh xa đám đông và khám phá những kho báu
        ít người biết đến và khung cảnh tuyệt đẹp của một{" "}
        <span className="notranslate">Musée Du Pin</span> khác
      </>
    ),
    category: "Triển lãm",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/V%C3%A9%20Th%C3%B4ng%20H%C3%A0nh.png?updatedAt=1750336796162",
    path: "/exhibitions?tab=guided-tours",
  },
];

const Navbar = () => {
  const { currentLang } = useTranslation();
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

  // Mobile submenu states
  const [showMobileSubmenu, setShowMobileSubmenu] = useState(false);
  const [currentMobileSubmenu, setCurrentMobileSubmenu] = useState("");
  const [submenuItems, setSubmenuItems] = useState([]);
  const [submenuFeatured, setSubmenuFeatured] = useState(null);

  const navigate = useNavigate();
  const navItemsRef = useRef([]);
  const dropdownRef = useRef(null);
  const mobileLangDropdownRef = useRef(null);
  const seeMoreRef = useRef(null);
  const visitRef = useRef(null);
  const exhibitionsRef = useRef(null);
  const exploreRef = useRef(null);
  const searchInputRef = useRef(null);
  const mobileSubmenuRef = useRef(null);
  const searchResultsRef = useRef(null);

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

  // Update mobile menu items based on language
  const getMobileMenuItems = () => {
    return {
      "Trải nghiệm": {
        title: currentLang === "en" ? "Experience" : "Trải nghiệm",
        items: [
          {
            title: currentLang === "en" ? "Opening Hours" : "Giờ mở cửa",
            path: "/visit",
          },
          {
            title:
              currentLang === "en"
                ? "Map, Entrances & Directions"
                : "Bản đồ, lối vào & chỉ dẫn",
            path: "/museum-map",
          },
          { title: "Các gói trải nghiệm", path: "/visit#tickets" },
          { title: "Thành viên", path: "/visit#membership" },
          {
            title: "Lưu trú trong các căn phòng nghệ thuật",
            path: "/visit-info",
          },
          { title: "Cuộc sống tại bảo tàng", path: "/visit-info#homestay" },
          { title: "Câu hỏi thường gặp", path: "/visit-info#faq" },
        ],
      },
      "TRIỂN LÃM": {
        title:
          currentLang === "en"
            ? "Art Stay & Exhibitions"
            : "Lưu trú nghệ thuật và Triển lãm",
        items: [
          {
            title: currentLang === "en" ? "Exhibitions" : "Triển lãm",
            path: "/exhibitions",
          },
          {
            title:
              currentLang === "en"
                ? "Guided Tours"
                : "Trải nghiệm có hướng dẫn",
            path: "/exhibitions?tab=guided-tours",
          },
          {
            title: currentLang === "en" ? "Art Stay" : "Lưu trú nghệ thuật",
            path: "/luu-tru-nghe-thuat",
          },
        ],
      },
      "KHÁM PHÁ": {
        title: currentLang === "en" ? "EXPLORE" : "KHÁM PHÁ",
        items: [
          {
            title: currentLang === "en" ? "Collections" : "Bộ sưu tập",
            path: "/collection",
          },
          { title: "Tin tức", path: "/life-at-the-museum" },
          { title: "Lộ trình tham quan", path: "/visitor-trails" },
          { title: "Âm Thanh Đẹp", path: "/the-acoustic" },
          { title: "Nghệ thuật vị giác", path: "/the-taste" },
          {
            title: "Không gian nghệ thuật và vườn trong Bảo Tàng",
            path: "/the-place",
          },
        ],
      },
      "XEM THÊM": {
        title: "Trở thành Nhà bảo trợ!",
        items: [
          {
            title: "Cửa hàng trực tuyến",
            path: "https://online-museeduphin.netlify.app/",
          },
          {
            title: "Ghé thăm cửa hàng trực tuyến của chúng tôi",
            path: "/support",
          },
        ],
        featured: {
          title: "Trở thành Nhà bảo trợ!",
          path: "/support",
          image:
            "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784655/collections/thechildhood.jpg",
          description: "Cá nhân, công ty hoặc tổ chức",
        },
      },
    };
  };

  // Update openMobileSubmenu to use translated menu items
  const openMobileSubmenu = (menuType) => {
    setCurrentMobileSubmenu(menuType);
    const menuItems = getMobileMenuItems();
    const currentMenu = menuItems[menuType];

    if (currentMenu) {
      setSubmenuItems(currentMenu.items);
      setSubmenuFeatured(currentMenu.featured);
      setShowMobileSubmenu(true);

      // Tạo animation mượt mà
      if (mobileSubmenuRef.current) {
        mobileSubmenuRef.current.classList.remove("hide");
        mobileSubmenuRef.current.classList.add("show");
      }
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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSeeMoreDropdown(false);
      }
      if (
        mobileLangDropdownRef.current &&
        !mobileLangDropdownRef.current.contains(event.target)
      ) {
        setShowMobileMenu(false);
      }

      // Don't automatically close dropdowns when clicking inside them
      // We'll only close them via the X button or Escape key
      // This is specifically for Visit, Exhibitions, and Explore dropdowns
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

  // Add GTranslate script to head
  useEffect(() => {
    // Add GTranslate settings
    const gtSettings = document.createElement("script");
    gtSettings.innerHTML = `window.gtranslateSettings = {
      "default_language": "vi",
      "native_language_names": true,
      "detect_browser_language": true,
      "languages": ["vi","en"],
      "wrapper_selector": ".gtranslate_wrapper"
    }`;
    document.head.appendChild(gtSettings);

    // Add GTranslate script
    const gtScript = document.createElement("script");
    gtScript.src = "https://cdn.gtranslate.net/widgets/latest/ln.js";
    gtScript.defer = true;
    document.head.appendChild(gtScript);

    return () => {
      document.head.removeChild(gtSettings);
      document.head.removeChild(gtScript);
    };
  }, []);

  // Update renderFeaturedContent function to be more robust
  const renderContent = (content) => {
    if (!content) return null;

    if (React.isValidElement(content)) {
      return content;
    }

    if (typeof content === "string") {
      if (content.includes("Musée Du Pin")) {
        return (
          <>
            {content.split("Musée Du Pin").map((part, index, array) => (
              <React.Fragment key={index}>
                {part}
                {index < array.length - 1 && (
                  <span className="notranslate">Musée Du Pin</span>
                )}
              </React.Fragment>
            ))}
          </>
        );
      }
      return content;
    }

    return content;
  };

  // Update in meta tags and document title
  useEffect(() => {
    document.title = `Musée Du Pin - ${currentMobileSubmenu || "Trang chủ"}`;
  }, [currentMobileSubmenu]);

  return (
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

          {/* GTranslate container for desktop */}
          <div className="gtranslate_wrapper"></div>
        </div>

        {/* Center section with logo */}
        <div className="logo-containers">
          <Link to="/">
            <img
              className="logo notranslate"
              src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784840/logo/logo-icon.webp"
              alt="Musée Du Pin"
              loading="lazy"
            />
          </Link>
        </div>

        {/* Desktop Navbar - Right Section */}
        <div className="desktop-right-section">
          <div className="buttons-container">
            <Link
              to="https://online-museeduphin.netlify.app/"
              className="btn btn-outline"
            >
              <BoutiqueIcon />
            </Link>
            <Link
              to="https://ticket-museeduphin.netlify.app/"
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
              alt="Musée Du Pin"
              className="mobile-logo-image notranslate"
              loading="lazy"
            />
          </div>
          <a href="/">
            <span className="museum-name-mobile notranslate">Musée Du Pin</span>
          </a>
        </div>

        <div className="right-section">
          <Link
            to="https://online-museeduphin.netlify.app/"
            className="btn btn-outline"
          >
            <BoutiqueIcon />
          </Link>
          <Link
            to="https://ticket-museeduphin.netlify.app/"
            className="btn btn-outline"
          >
            <TicketIcon />
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
                visitRef.current = el;
              }}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (showVisitDropdown) {
                    setShowVisitDropdown(false);
                  } else {
                    setShowVisitDropdown(true);
                    setShowExhibitionsDropdown(false);
                    setShowExploreDropdown(false);
                    setShowSeeMoreDropdown(false);
                  }
                }}
              >
                Trải nghiệm
                <div className="underline"></div>
              </Link>
            </li>
            <li
              className="nav-item"
              ref={(el) => {
                navItemsRef.current[1] = el;
                exhibitionsRef.current = el;
              }}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (showExhibitionsDropdown) {
                    setShowExhibitionsDropdown(false);
                  } else {
                    setShowExhibitionsDropdown(true);
                    setShowVisitDropdown(false);
                    setShowExploreDropdown(false);
                    setShowSeeMoreDropdown(false);
                  }
                }}
              >
                Lưu trú nghệ thuật và Triển lãm
                <div className="underline"></div>
              </Link>
            </li>
            <li
              className="nav-item"
              ref={(el) => {
                navItemsRef.current[2] = el;
                exploreRef.current = el;
              }}
            >
              <Link
                onClick={(e) => {
                  e.preventDefault();
                  if (showExploreDropdown) {
                    setShowExploreDropdown(false);
                  } else {
                    setShowExploreDropdown(true);
                    setShowVisitDropdown(false);
                    setShowExhibitionsDropdown(false);
                    setShowSeeMoreDropdown(false);
                  }
                }}
              >
                KHÁM PHÁ
                <div className="underline"></div>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="vertical-divider"></div>

        <div
          className="see-more"
          ref={seeMoreRef}
          onClick={() => {
            if (showSeeMoreDropdown) {
              setShowSeeMoreDropdown(false);
            } else {
              setShowSeeMoreDropdown(true);
              setShowVisitDropdown(false);
              setShowExhibitionsDropdown(false);
              setShowExploreDropdown(false);
            }
          }}
        >
          <span>XEM THÊM</span>
          <MenuIcon />
          <div className="underline"></div>
        </div>
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

      {/* See More Dropdown Menu */}
      {showSeeMoreDropdown && (
        <div
          className="dropdown-container see-more-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dropdown-content">
            <div className="dropdown-header">
              <button
                type="button"
                className="dropdown-close-button"
                onClick={() => setShowSeeMoreDropdown(false)}
                aria-label="Close dropdown"
              >
                <CloseDropdownIcon />
              </button>
            </div>

            <div className="dropdown-main-content">
              <div className="dropdown-left-section">
                <div className="dropdown-menu-section">
                  <h3>Cửa hàng trực tuyến</h3>
                  <Link
                    to="https://online-museeduphin.netlify.app/"
                    className="dropdown-link"
                    onClick={() => setShowSeeMoreDropdown(false)}
                  >
                    Ghé thăm cửa hàng trực tuyến của chúng tôi
                  </Link>
                </div>

                <div
                  className="dropdown-menu-section"
                  style={{ marginTop: "30px" }}
                >
                  <h3>
                    Hỗ trợ {" "} <span className="notranslate">Musée Du Pin</span>
                  </h3>
                  <Link
                    to="/support"
                    className="dropdown-link"
                    onClick={() => setShowSeeMoreDropdown(false)}
                  >
                    Cá nhân, công ty hoặc tổ chức
                  </Link>
                </div>
              </div>

              <div className="dropdown-right-section">
                <img
                  src="https://ik.imagekit.io/8u8lkoqkkm/image(4).png?updatedAt=1749394995088"
                  alt="Support"
                  loading="lazy"
                  className="dropdown-image"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Visit Dropdown Menu */}
      {showVisitDropdown && (
        <div
          className="dropdown-container visit-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dropdown-content">
            <div className="dropdown-header">
              <button
                type="button"
                className="dropdown-close-button"
                onClick={() => setShowVisitDropdown(false)}
                aria-label="Close dropdown"
              >
                <CloseDropdownIcon />
              </button>
            </div>

            <div className="dropdown-main-content">
              <div className="dropdown-left-section">
                <div className="dropdown-menu-section">
                  <Link
                    to="/visit"
                    className="dropdown-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Giờ mở cửa
                  </Link>
                  <Link
                    to="/museum-map"
                    className="dropdown-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Bản đồ, lối vào & chỉ dẫn
                  </Link>
                  <Link
                    to="/visit#tickets"
                    className="dropdown-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Các gói trải nghiệm
                  </Link>
                  <Link
                    to="/visit#membership"
                    className="dropdown-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Thành viên
                  </Link>
                </div>
              </div>

              <div className="dropdown-middle-section">
                <div className="dropdown-menu-section">
                  <Link
                    to="/visit-info"
                    className="dropdown-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Lưu trú trong các căn phòng nghệ thuật
                  </Link>
                  <Link
                    to="/visit-info#homestay"
                    className="dropdown-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Cuộc sống tại bảo tàng
                  </Link>
                  <Link
                    to="/visit-info#faq"
                    className="dropdown-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Câu hỏi thường gặp
                  </Link>
                </div>
              </div>

              <div className="dropdown-right-section">
                <img
                  src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/Th%C3%B4ng%202.webp"
                  alt="Chuẩn bị cho chuyến tham quan"
                  loading="lazy"
                  className="dropdown-image"
                />
                <div className="dropdown-image-caption">
                  <Link
                    to="/visit-info"
                    className="dropdown-title-link"
                    onClick={() => setShowVisitDropdown(false)}
                  >
                    Chuẩn bị cho chuyến tham quan
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <p className="dropdown-description">
                    Tất cả những điều bạn cần biết trước khi tham quan bảo tàng
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Exhibitions Dropdown Menu */}
      {showExhibitionsDropdown && (
        <div
          className="dropdown-container exhibitions-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dropdown-content">
            <div className="dropdown-header">
              <button
                type="button"
                className="dropdown-close-button"
                onClick={() => setShowExhibitionsDropdown(false)}
                aria-label="Close dropdown"
              >
                <CloseDropdownIcon />
              </button>
            </div>

            <div className="dropdown-main-content">
              <div className="dropdown-left-section">
                <div className="dropdown-menu-section">
                  <Link
                    to="/exhibitions"
                    className="dropdown-link"
                    onClick={() => setShowExhibitionsDropdown(false)}
                  >
                    Triển lãm
                  </Link>
                  <Link
                    to="/exhibitions?tab=guided-tours"
                    className="dropdown-link"
                    onClick={() => setShowExhibitionsDropdown(false)}
                  >
                    Trải nghiệm có hướng dẫn
                  </Link>
                  <Link
                    to="/luu-tru-nghe-thuat"
                    className="dropdown-link"
                    onClick={() => setShowExhibitionsDropdown(false)}
                  >
                    Lưu trú nghệ thuật
                  </Link>
                </div>
              </div>

              <div className="dropdown-right-section">
                <div className="exhibition-feature">
                  <div className="exhibition-feature-image">
                    <img
                      src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784658/collections/thesunset.jpg"
                      alt="Another Musée Du Pin"
                      loading="lazy"
                    />
                    <div className="feature-tag">
                      Một <span className="notranslate">Musée Du Pin</span> khác
                    </div>
                  </div>
                  <Link
                    to="/exhibitions?tab=guided-tours"
                    className="exhibition-feature-title"
                    onClick={() => setShowExhibitionsDropdown(false)}
                  >
                    <span className="text-left">Một</span>{" "}
                    <span className="notranslate">Musée Du Pin</span>{" "}
                    <span className="text-right">khác</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <p className="exhibition-feature-description">
                    Tận hưởng chuyến tham quan tránh xa đám đông và khám phá
                    những kho báu ít người biết đến và khung cảnh tuyệt đẹp của
                    một <span className="notranslate">Musée Du Pin</span> khác
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Explore Dropdown Menu */}
      {showExploreDropdown && (
        <div
          className="dropdown-container explore-dropdown"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="dropdown-content">
            <div className="dropdown-header">
              <button
                type="button"
                className="dropdown-close-button"
                onClick={() => setShowExploreDropdown(false)}
                aria-label="Close dropdown"
              >
                <CloseDropdownIcon />
              </button>
            </div>

            <div className="dropdown-main-content">
              <div className="dropdown-left-section">
                <div className="dropdown-menu-section">
                  <Link
                    to="/collection"
                    className="dropdown-link"
                    onClick={() => setShowExploreDropdown(false)}
                  >
                    Bộ sưu tập
                  </Link>
                  <Link
                    to="/life-at-the-museum"
                    className="dropdown-link"
                    onClick={() => setShowExploreDropdown(false)}
                  >
                    Tin tức
                  </Link>
                  <Link
                    to="/visitor-trails"
                    className="dropdown-link"
                    onClick={() => setShowExploreDropdown(false)}
                  >
                    Lộ trình tham quan
                  </Link>
                  <Link
                    to="/the-acoustic"
                    className="dropdown-link"
                    onClick={() => setShowExploreDropdown(false)}
                  >
                    Âm Thanh Đẹp
                  </Link>
                  <Link
                    to="/the-taste"
                    className="dropdown-link"
                    onClick={() => setShowExploreDropdown(false)}
                  >
                    Nghệ thuật vị giác
                  </Link>
                  <Link
                    to="/the-place"
                    className="dropdown-link"
                    onClick={() => setShowExploreDropdown(false)}
                  >
                    Không gian nghệ thuật và vườn trong Bảo Tàng
                  </Link>
                </div>
              </div>

              <div className="dropdown-right-section">
                <div className="exhibition-feature">
                  <div className="exhibition-feature-image">
                    <img
                      src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784658/collections/thesunset.jpg"
                      alt="Highlights"
                      loading="lazy"
                    />
                    <div className="feature-tag">Điểm nổi bật</div>
                  </div>
                  <Link
                    to="/visitor-trails"
                    className="exhibition-feature-title"
                    onClick={() => setShowExploreDropdown(false)}
                  >
                    Điểm nổi bật
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                  <p className="exhibition-feature-description">
                    Các tác phẩm nổi bật
                  </p>
                </div>
              </div>
            </div>
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
          {/* GTranslate container for mobile */}
          <div className="gtranslate_wrapper mobile"></div>
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
            onClick={() => openMobileSubmenu("Trải nghiệm")}
          >
            Trải nghiệm
            <ChevronRight />
          </div>
          <div
            className="mobile-nav-item"
            onClick={() => openMobileSubmenu("TRIỂN LÃM")}
          >
            Lưu trú nghệ thuật và Triển lãm
            <ChevronRight />
          </div>
          <div
            className="mobile-nav-item"
            onClick={() => openMobileSubmenu("KHÁM PHÁ")}
          >
            KHÁM PHÁ
            <ChevronRight />
          </div>
        </div>

        <div className="mobile-nav-divider"></div>

        <div className="mobile-secondary-links">
          <div
            className="mobile-secondary-item"
            onClick={() => handleNavItemClick("/boutique")}
          >
            Cửa hàng Lưu niệm
          </div>
          <div
            className="mobile-secondary-item"
            onClick={() => handleNavItemClick("/support")}
          >
            Hỗ trợ {" "} <span className="notranslate">Musée Du Pin</span>
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

          {submenuFeatured && (
            <div className="submenu-featured">
              <Link
                to={submenuFeatured.path}
                className="featured-title"
                onClick={() => {
                  setShowMobileSubmenu(false);
                  setShowMobileMenu(false);
                }}
              >
                {renderContent(submenuFeatured.title)}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
              <img
                src={submenuFeatured.image}
                alt={
                  typeof submenuFeatured.title === "string"
                    ? submenuFeatured.title
                    : "Featured content"
                }
                loading="lazy"
                className="featured-image"
              />
              <p className="featured-description">
                {renderContent(submenuFeatured.description)}
              </p>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
