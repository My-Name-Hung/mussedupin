import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/Logo/logo-icon.jpg";
import ExhibitionsAnother from "../../assets/Navbar/Exhibitions another-artwork.jpg";
import Exhibitions from "../../assets/Navbar/Exhibitions-artwork.jpg";
import artworkImg from "../../assets/Navbar/louvre-artwork.jpg";
import visitArtworkImg from "../../assets/Navbar/visit-louvre-artwork.jpg";

import TranslatedText from "../../components/TranslatedText";
import { useTranslation } from "../../context/TranslationContext";
import "./Navbar.css";

// Icon components
const SearchIcon = () => (
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
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const ChevronDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const ChevronRight = () => (
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
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

const MenuIcon = () => (
  <div className="menu-icon">
    <div className="line"></div>
    <div className="line"></div>
    <div className="line"></div>
  </div>
);

const HamburgerIcon = () => (
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
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

const ArrowRightIcon = () => (
  <svg
    width="20"
    height="20"
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
);

const CloseIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Icon cho Online Boutique
const BoutiqueIcon = () => (
  <svg
    className="btn-icon"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M11.57 2c-1.78 0-3.2 1.28-3.2 2.86V7H5.14a.71.71 0 0 0-.72.64L3 21.21a.72.72 0 0 0 .72.79h15.71a.71.71 0 0 0 .72-.79L18.72 7.64A.71.71 0 0 0 18 7h-3.22V4.86c0-1.58-1.43-2.86-3.21-2.86zM9.8 4.86c0-.8.8-1.43 1.78-1.43 1 0 1.8.64 1.8 1.43V7h-3.6V4.86zm7.57 3.57 1.28 12.14H4.51L5.79 8.43h2.57v1.43a.71.71 0 1 0 1.43 0V8.43h3.57v1.43a.71.71 0 1 0 1.43 0V8.43h2.57z"></path>
  </svg>
);

// Icon cho Tickets
const TicketIcon = () => (
  <svg
    className="btn-icon"
    viewBox="0 0 16 16"
    width="1em"
    height="1em"
    focusable="false"
    aria-hidden="true"
  >
    <path d="M9.13.5a.9.9 0 0 1 1.28 0l1.17 1.18c.2.2.3.5.25.79a1.48 1.48 0 0 0 1.7 1.7c.3-.04.59.05.79.25l1.17 1.17a.9.9 0 0 1 0 1.28L6.87 15.5a.9.9 0 0 1-1.28 0L.51 10.41a.9.9 0 0 1 0-1.28zm.64.78L1.28 9.77l4.95 4.95 8.49-8.49-1.1-1.1c-.74.15-1.52-.1-2.08-.67s-.82-1.34-.7-2.14L9.77 1.28zm.53 5.13c.1-.1.25-.1.35 0l.35.35c.1.1.1.26 0 .36l-4.59 4.6a.27.27 0 0 1-.36 0l-.35-.36a.25.25 0 0 1 0-.36l4.6-4.59zm-2.24-.59c.1-.1.26-.1.35 0l.36.35c.1.1.1.26 0 .36L5 10.3c-.1.1-.26.1-.36 0l-.35-.35a.25.25 0 0 1 0-.36l3.77-3.77z"></path>
  </svg>
);

// Icon cho close dropdown
const CloseDropdownIcon = () => (
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
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

// Icon cho patron
const PatronIcon = () => (
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
    <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
    <path d="M2 17l10 5 10-5"></path>
    <path d="M2 12l10 5 10-5"></path>
  </svg>
);

// Biểu tượng mạng xã hội
const FacebookIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const YoutubeIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
);

const PinterestIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M8 12h8"></path>
    <path d="M12 8v8"></path>
    <circle cx="12" cy="12" r="10"></circle>
  </svg>
);

const LinkedInIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

// Thêm ChevronUp icon
const ChevronUp = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

// Comprehensive search data - scans all content in the project
const searchData = [
  // Visit page sections
  {
    id: 1,
    title: "Hours & Admission",
    description: "Opening hours and admission information",
    category: "Visit",
    image: visitArtworkImg,
    path: "/visit#hours",
  },
  {
    id: 2,
    title: "When to Visit",
    description: "Best times to visit the museum",
    category: "Visit",
    image: visitArtworkImg,
    path: "/visit#hours",
  },
  {
    id: 3,
    title: "Ticket Prices",
    description: "Admission fees and ticket information",
    category: "Visit",
    image: visitArtworkImg,
    path: "/visit#tickets",
  },
  {
    id: 4,
    title: "Free Admission",
    description: "Visitors eligible for free entry",
    category: "Visit",
    image: visitArtworkImg,
    path: "/visit#tickets",
  },
  {
    id: 5,
    title: "Membership",
    description: "Become a member of the Musée Du Pin",
    category: "Visit",
    image: visitArtworkImg,
    path: "/visit#membership",
  },
  {
    id: 6,
    title: "Tours & Activities",
    description: "Guided tours and museum activities",
    category: "Visit",
    image: visitArtworkImg,
    path: "/visit#tickets",
  },
  {
    id: 7,
    title: "Payment Methods",
    description: "Accepted payment methods at the ticket office",
    category: "Visit",
    image: visitArtworkImg,
    path: "/visit#tickets",
  },

  // Exhibitions page sections
  {
    id: 8,
    title: "Current Exhibitions",
    description: "Exhibitions currently on display",
    category: "Exhibitions",
    image: Exhibitions,
    path: "/exhibitions#current",
  },
  {
    id: 9,
    title: "Upcoming Exhibitions",
    description: "Future exhibitions at the museum",
    category: "Exhibitions",
    image: Exhibitions,
    path: "/exhibitions#upcoming",
  },
  {
    id: 10,
    title: "Past Exhibitions",
    description: "Previous exhibitions at the museum",
    category: "Exhibitions",
    image: Exhibitions,
    path: "/exhibitions#past",
  },
  {
    id: 11,
    title: "Guided Tours",
    description: "Expert-led tours through the collections",
    category: "Exhibitions",
    image: ExhibitionsAnother,
    path: "/exhibitions?tab=guided-tours",
  },
  {
    id: 12,
    title: "Louvre Couture",
    description: "Art and fashion: statement pieces",
    category: "Exhibitions",
    image: Exhibitions,
    path: "/louvre-couture",
  },
  {
    id: 13,
    title: "Another Musée Du Pin",
    description: "Discover lesser-known treasures",
    category: "Exhibitions",
    image: ExhibitionsAnother,
    path: "/exhibitions?tab=guided-tours",
  },

  // Collections sections
  {
    id: 14,
    title: "Collection Highlights",
    description: "Masterpieces from our permanent collection",
    category: "Collections",
    image: artworkImg,
    path: "/collections#highlights",
  },
  {
    id: 15,
    title: "European Paintings",
    description: "Renaissance to Modern European art",
    category: "Collections",
    image: artworkImg,
    path: "/collections/european-paintings",
  },
  {
    id: 16,
    title: "Sculptures",
    description: "Ancient to contemporary sculptures",
    category: "Collections",
    image: artworkImg,
    path: "/collections/sculptures",
  },
  {
    id: 17,
    title: "Decorative Arts",
    description: "Furniture, ceramics and decorative objects",
    category: "Collections",
    image: artworkImg,
    path: "/collections/decorative-arts",
  },

  // Explore sections
  {
    id: 18,
    title: "The Palace",
    description: "History and architecture of the palace",
    category: "Explore",
    image: visitArtworkImg,
    path: "/the-palace",
  },
  {
    id: 19,
    title: "The Gardens",
    description: "Landscaped gardens and outdoor sculptures",
    category: "Explore",
    image: Exhibitions,
    path: "/the-gardens",
  },
  {
    id: 20,
    title: "Visitor Trails",
    description: "Curated routes through the museum",
    category: "Explore",
    image: ExhibitionsAnother,
    path: "/visitor-trails",
  },

  // Support and Shop
  {
    id: 21,
    title: "Online Boutique",
    description: "Museum shop with art-inspired items",
    category: "Shop",
    image: artworkImg,
    path: "/boutique",
  },
  {
    id: 22,
    title: "Support the Museum",
    description: "Ways to contribute to the museum",
    category: "Support",
    image: artworkImg,
    path: "/support",
  },
  {
    id: 23,
    title: "Become a Patron",
    description: "Individual, company and foundation support",
    category: "Support",
    image: artworkImg,
    path: "/support#patron",
  },

  // Practical information
  {
    id: 24,
    title: "Map & Directions",
    description: "How to find and navigate the museum",
    category: "Practical Info",
    image: visitArtworkImg,
    path: "/museum-map",
  },
  {
    id: 25,
    title: "Accessibility",
    description: "Services for visitors with disabilities",
    category: "Practical Info",
    image: visitArtworkImg,
    path: "/accessibility",
  },
  {
    id: 26,
    title: "FAQ",
    description: "Frequently asked questions",
    category: "Practical Info",
    image: visitArtworkImg,
    path: "/faq",
  },
  {
    id: 27,
    title: "Restaurants & Cafés",
    description: "Dining options at the museum",
    category: "Practical Info",
    image: visitArtworkImg,
    path: "/restaurants",
  },
  {
    id: 28,
    title: "Visitor Amenities",
    description: "Facilities and services for visitors",
    category: "Practical Info",
    image: visitArtworkImg,
    path: "/visit-info",
  },
];

const Navbar = () => {
  const { currentLanguage, changeLanguage, supportedLanguages, isTranslating } =
    useTranslation();
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showMobileLangDropdown, setShowMobileLangDropdown] = useState(false);
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

  // Mobile submenu states - Enable these features
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

    // Simulate scanning all project content
    setTimeout(() => {
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
    }, 300);
  };

  // Improved search result navigation with hash-based routing
  const handleSearchResultClick = (path) => {
    setShowSearchBox(false);
    setShowSearchResults(false);
    setSearchTerm("");
    setMobileSearchTerm("");

    // Handle navigation with hash fragments
    if (path.includes("#")) {
      const [pagePath, sectionId] = path.split("#");

      // If we're already on the correct page, just scroll to the section
      if (
        window.location.pathname === pagePath ||
        (pagePath === "/" && window.location.pathname === "")
      ) {
        // Find the element and scroll to it
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // Otherwise navigate to the page, then scroll to section
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

  // Lấy tên hiển thị của ngôn ngữ hiện tại
  const getCurrentLanguageName = () => {
    // Nếu chưa có currentLanguage, trả về "Tiếng Việt"
    if (!currentLanguage) return "Tiếng Việt";

    const lang = supportedLanguages.find(
      (lang) => lang.code === currentLanguage
    );
    // Nếu không tìm thấy ngôn ngữ hoặc là ngôn ngữ mặc định, trả về "Tiếng Việt"
    return lang ? lang.name : "Tiếng Việt";
  };

  // Thêm hàm xử lý khi nhấp vào liên kết trong mobile menu
  const handleNavItemClick = (path) => {
    setShowMobileMenu(false);
    navigate(path);
  };

  // Hàm để mở mobile submenu
  const openMobileSubmenu = (menuType) => {
    setCurrentMobileSubmenu(menuType);

    let items = [];
    let featured = null;

    // Thiết lập các mục cho từng loại submenu
    switch (menuType) {
      case "THAM QUAN":
        items = [
          { title: "Giờ mở cửa & vé vào cửa", path: "/visit" },
          { title: "Bản đồ, lối vào & chỉ dẫn", path: "/museum-map" },
          { title: "Giá vé", path: "/visit#tickets" },
          { title: "Thành viên", path: "/visit#membership" },
          { title: "Tiện ích cho khách tham quan", path: "/visit-info" },
          { title: "Cuộc sống tại bảo tàng", path: "/visit-info#homestay" },
          { title: "Câu hỏi thường gặp", path: "/visit-info#faq" },
        ];
        featured = {
          title: "Chuẩn bị cho chuyến tham quan",
          path: "/visit-info",
          image: visitArtworkImg,
          description:
            "Tất cả những điều bạn cần biết trước khi tham quan bảo tàng",
        };
        break;

      case "TRIỂN LÃM":
        items = [
          { title: "Triển lãm", path: "/exhibitions" },
          {
            title: "Tham quan có hướng dẫn",
            path: "/exhibitions?tab=guided-tours",
          },
        ];
        featured = {
          title: "Một Musée Du Pin khác",
          path: "/exhibitions?tab=guided-tours",
          image: ExhibitionsAnother,
          description:
            "Tận hưởng chuyến tham quan tránh xa đám đông và khám phá những kho báu ít người biết đến và khung cảnh tuyệt đẹp của 'một Musée Du Pin khác'",
        };
        break;

      case "KHÁM PHÁ":
        items = [
          { title: "Bộ sưu tập", path: "/collection" },
          { title: "Tin tức", path: "/life-at-the-museum" },
          { title: "Lộ trình tham quan", path: "/visitor-trails" },
        ];
        featured = {
          title: "Điểm nổi bật",
          path: "/visitor-trails",
          image: ExhibitionsAnother,
          description: "Các tác phẩm nổi bật",
        };
        break;

      case "XEM THÊM":
        items = [
          {
            title: "Cửa hàng trực tuyến",
            path: "https://online-museeduphin.netlify.app/",
          },
          {
            title: "Ghé thăm cửa hàng trực tuyến của chúng tôi",
            path: "/support",
          },
        ];
        featured = {
          title: "Trở thành Nhà bảo trợ!",
          path: "/support",
          image: artworkImg,
          description: "Cá nhân, công ty hoặc tổ chức",
        };
        break;

      default:
        break;
    }

    setSubmenuItems(items);
    setSubmenuFeatured(featured);
    setShowMobileSubmenu(true);

    // Tạo animation mượt mà
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

  // Cải thiện hàm xử lý thay đổi ngôn ngữ
  const handleLanguageChange = (langCode) => {
    setShowLangDropdown(false);
    setShowMobileLangDropdown(false);

    if (langCode !== currentLanguage) {
      changeLanguage(langCode);
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
        setShowLangDropdown(false);
      }
      if (
        mobileLangDropdownRef.current &&
        !mobileLangDropdownRef.current.contains(event.target)
      ) {
        setShowMobileLangDropdown(false);
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

  // Thêm phương thức trực tiếp để điều hướng
  const directNavigate = (path) => {
    window.location.href = path;
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
                <TranslatedText>
                  {`${searchResults.length} kết quả tìm kiếm cho "${
                    searchTerm || mobileSearchTerm
                  }"`}
                </TranslatedText>
                <button
                  type="button"
                  className="search-results-close-button"
                  onClick={() => setShowSearchResults(false)}
                  aria-label="Close search results"
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
              <h3>
                <TranslatedText>Không tìm thấy kết quả</TranslatedText>
              </h3>
              <p>
                <TranslatedText>
                  Chúng tôi không thể tìm thấy kết quả nào cho tìm kiếm của bạn.
                  Vui lòng thử từ khóa khác.
                </TranslatedText>
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

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
            <span>
              <TranslatedText>Tìm kiếm</TranslatedText>
            </span>
          </div>

          <div className="language-dropdown" ref={dropdownRef}>
            <div
              className="selected-language"
              onClick={() => setShowLangDropdown(!showLangDropdown)}
            >
              {getCurrentLanguageName()}
              {showLangDropdown ? <ChevronUp /> : <ChevronDown />}
            </div>

            {showLangDropdown && (
              <div className="language-options">
                <div className="language-header">Ngôn ngữ</div>
                {supportedLanguages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`language-option ${
                      currentLanguage === lang.code ? "active" : ""
                    }`}
                    onClick={() => handleLanguageChange(lang.code)}
                  >
                    {lang.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center section with logo */}
        <div className="logo-container">
          <Link to="/">
            <img className="logo" src={logo} alt="Museum Logo" />
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
            <Link to="/tickets" className="btn btn-filled">
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
        {/* <div
          className="mobile-menu-toggle"
          onClick={() => setShowMobileMenu(true)}
          aria-label="Open menu"
        >

        </div> */}

        <div className="mobile-logo">
          <div onClick={() => setShowMobileMenu(true)}>
            <img
              src={logo}
              alt="Musée Du Pin Logo"
              className="mobile-logo-image"
            />
          </div>
          <a href="/">
            <span className="museum-name-mobile">Musée Du Pin</span>
          </a>
        </div>

        <div className="right-section">
          <Link to="/tickets" className="btn btn-filled">
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
                to="/visit"
                onClick={(e) => {
                  e.preventDefault();
                  if (showVisitDropdown) {
                    setShowVisitDropdown(false);
                  } else {
                    setShowVisitDropdown(true);
                    if (showExhibitionsDropdown)
                      setShowExhibitionsDropdown(false);
                    if (showExploreDropdown) setShowExploreDropdown(false);
                    if (showSeeMoreDropdown) setShowSeeMoreDropdown(false);
                  }
                }}
              >
                <TranslatedText>THAM QUAN</TranslatedText>
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
                to="/exhibitions"
                onClick={(e) => {
                  e.preventDefault();
                  if (showExhibitionsDropdown) {
                    setShowExhibitionsDropdown(false);
                  } else {
                    setShowExhibitionsDropdown(true);
                    if (showVisitDropdown) setShowVisitDropdown(false);
                    if (showExploreDropdown) setShowExploreDropdown(false);
                    if (showSeeMoreDropdown) setShowSeeMoreDropdown(false);
                  }
                }}
              >
                <TranslatedText>TRIỂN LÃM VÀ SỰ KIỆN</TranslatedText>
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
                to="/explore"
                onClick={(e) => {
                  e.preventDefault();
                  if (showExploreDropdown) {
                    setShowExploreDropdown(false);
                  } else {
                    setShowExploreDropdown(true);
                    if (showVisitDropdown) setShowVisitDropdown(false);
                    if (showExhibitionsDropdown)
                      setShowExhibitionsDropdown(false);
                    if (showSeeMoreDropdown) setShowSeeMoreDropdown(false);
                  }
                }}
              >
                <TranslatedText>KHÁM PHÁ</TranslatedText>
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
              if (showVisitDropdown) setShowVisitDropdown(false);
              if (showExhibitionsDropdown) setShowExhibitionsDropdown(false);
              if (showExploreDropdown) setShowExploreDropdown(false);
            }
          }}
        >
          <span>
            <TranslatedText>XEM THÊM</TranslatedText>
          </span>
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
                <div className="search-input-label">
                  <TranslatedText>Tìm kiếm</TranslatedText>
                </div>
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
                  <h3>
                    <TranslatedText>Cửa hàng trực tuyến</TranslatedText>
                  </h3>
                  <Link
                    to="https://online-museeduphin.netlify.app/"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSeeMoreDropdown(false);
                      navigate("https://online-museeduphin.netlify.app/");
                    }}
                  >
                    <TranslatedText>
                      Ghé thăm cửa hàng trực tuyến của chúng tôi
                    </TranslatedText>
                  </Link>
                </div>

                <div
                  className="dropdown-menu-section"
                  style={{ marginTop: "30px" }}
                >
                  <h3>
                    <TranslatedText>Hỗ trợ Musée Du Pin</TranslatedText>
                  </h3>
                  <Link
                    to="/support"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSeeMoreDropdown(false);
                      navigate("/support");
                    }}
                  >
                    <TranslatedText>
                      Cá nhân, công ty hoặc tổ chức
                    </TranslatedText>
                  </Link>
                </div>
              </div>

              <div className="dropdown-right-section">
                <img
                  src={artworkImg}
                  alt="Classical Artwork"
                  className="dropdown-image"
                />

                <Link
                  to="/support"
                  className="dropdown-patron-button"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowSeeMoreDropdown(false);
                    navigate("/support");
                  }}
                >
                  <PatronIcon />
                  <TranslatedText>Trở thành Nhà bảo trợ!</TranslatedText>
                </Link>

                <div className="dropdown-image-caption">
                  <Link
                    to="/support"
                    className="dropdown-title-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowSeeMoreDropdown(false);
                      navigate("/support");
                    }}
                  >
                    <TranslatedText>Hỗ trợ Musée Du Pin →</TranslatedText>
                  </Link>
                  <p className="dropdown-description">
                    <TranslatedText>
                      Cá nhân, công ty hoặc tổ chức
                    </TranslatedText>
                  </p>
                </div>
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
                    onClick={() => {
                      navigate("/visit");
                      setShowVisitDropdown(false);
                    }}
                  >
                    <TranslatedText>Giờ mở cửa & vé vào cửa</TranslatedText>
                  </Link>
                  <Link
                    to="/visit#tickets"
                    className="dropdown-link"
                    onClick={() => {
                      navigate("/visit#tickets");
                      setShowVisitDropdown(false);
                    }}
                  >
                    <TranslatedText>Giá vé</TranslatedText>
                  </Link>
                  <Link
                    to="/visit#membership"
                    className="dropdown-link"
                    onClick={() => {
                      navigate("/visit#membership");
                      setShowVisitDropdown(false);
                    }}
                  >
                    <TranslatedText>Thành viên</TranslatedText>
                  </Link>
                </div>
              </div>

              <div className="dropdown-middle-section">
                <div className="dropdown-menu-section">
                  <Link
                    to="/visit-info"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVisitDropdown(false);
                      navigate("/visit-info");
                    }}
                  >
                    <TranslatedText>
                      Tiện ích cho khách tham quan
                    </TranslatedText>
                  </Link>
                  <Link
                    to="/homestay"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVisitDropdown(false);
                      navigate("/visit-info#homestay");
                    }}
                  >
                    <TranslatedText>Lưu trú</TranslatedText>
                  </Link>
                  <Link
                    to="/visit-info#faq"
                    className="dropdown-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVisitDropdown(false);
                      navigate("/visit-info#faq");
                    }}
                  >
                    <TranslatedText>Câu hỏi thường gặp</TranslatedText>
                  </Link>
                </div>
              </div>

              <div className="dropdown-right-section">
                <img
                  src={visitArtworkImg}
                  alt="Museum Gallery"
                  className="dropdown-image"
                />

                <div className="dropdown-image-caption">
                  <Link
                    to="/visit-info"
                    className="dropdown-title-link"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowVisitDropdown(false);
                      navigate("/visit-info");
                    }}
                  >
                    <TranslatedText>
                      Chuẩn bị cho chuyến tham quan
                    </TranslatedText>
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
                    <TranslatedText>
                      Tất cả những điều bạn cần biết trước khi tham quan bảo
                      tàng
                    </TranslatedText>
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
                  <button
                    type="button"
                    className="nav-button"
                    onClick={() => {
                      navigate("/exhibitions");
                      setShowExhibitionsDropdown(false);
                    }}
                  >
                    <TranslatedText>Triển lãm</TranslatedText>
                  </button>
                  <button
                    type="button"
                    className="nav-button"
                    onClick={() => {
                      navigate("/exhibitions?tab=guided-tours");
                      setShowExhibitionsDropdown(false);
                    }}
                  >
                    <TranslatedText>Tham quan có hướng dẫn</TranslatedText>
                  </button>
                </div>
              </div>

              <div className="dropdown-right-section exhibitions-features">
                <div className="exhibition-feature">
                  <div className="exhibition-feature-image">
                    <img src={ExhibitionsAnother} alt="Another" />
                    <div className="feature-tag">
                      <TranslatedText>Một Musée Du Pin khác</TranslatedText>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="exhibition-feature-title nav-button"
                    onClick={() => {
                      navigate("/exhibitions?tab=guided-tours");
                      setShowExhibitionsDropdown(false);
                    }}
                  >
                    <TranslatedText>Một Musée Du Pin khác</TranslatedText>
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
                  </button>
                  <p className="exhibition-feature-description">
                    <TranslatedText>
                      Tận hưởng chuyến tham quan tránh xa đám đông và khám phá
                      những kho báu ít người biết đến và khung cảnh tuyệt đẹp
                      của 'một Musée Du Pin khác'
                    </TranslatedText>
                  </p>
                </div>

                <div className="exhibition-feature">
                  <div className="exhibition-feature-image">
                    <img src={Exhibitions} alt="Couture" />
                    <div className="feature-tag">
                      <TranslatedText>Musée Du Pin Couture</TranslatedText>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="exhibition-feature-title nav-button"
                    onClick={() => {
                      navigate("/exhibitions");
                      setShowExhibitionsDropdown(false);
                    }}
                  >
                    <TranslatedText>Musée Du Pin Couture</TranslatedText>
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
                  </button>
                  <p className="exhibition-feature-description">
                    <TranslatedText>
                      Art and fashion: statement pieces. 24 January – 21 July
                      2025
                    </TranslatedText>
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
          className="dropdown-container exhibitions-dropdown"
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
                  <button
                    type="button"
                    className="nav-button"
                    onClick={() => {
                      navigate("/collection");
                      setShowExploreDropdown(false);
                    }}
                  >
                    <TranslatedText>Bộ sưu tập</TranslatedText>
                  </button>
                  <button
                    type="button"
                    className="nav-button"
                    onClick={() => {
                      navigate("/life-at-the-museum");
                      setShowExploreDropdown(false);
                    }}
                  >
                    <TranslatedText>Cuộc sống tại bảo tàng</TranslatedText>
                  </button>
                  <button
                    type="button"
                    className="nav-button"
                    onClick={() => {
                      setShowExploreDropdown(false);
                      directNavigate("/visitor-trails");
                    }}
                  >
                    <TranslatedText>Lộ trình tham quan</TranslatedText>
                  </button>

                  <button
                    type="button"
                    className="nav-button"
                    onClick={() => {
                      setShowExploreDropdown(false);
                      directNavigate("/the-gardens");
                    }}
                  >
                    <TranslatedText>Vườn</TranslatedText>
                  </button>
                </div>
              </div>

              <div className="dropdown-right-section exhibitions-features">
                <div className="exhibition-feature">
                  <div className="exhibition-feature-image">
                    <img src={ExhibitionsAnother} alt="Beyoncé" />
                    <div className="feature-tag">
                      <TranslatedText>Điểm nổi bật</TranslatedText>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="exhibition-feature-title nav-button"
                    onClick={() => {
                      setShowExploreDropdown(false);
                      directNavigate("/beyonce-jayz-louvre");
                    }}
                  >
                    <TranslatedText>
                      Beyoncé and Jay-Z's Louvre Highlights
                    </TranslatedText>
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
                  </button>
                  <p className="exhibition-feature-description">
                    <TranslatedText>Các tác phẩm video nổi bật</TranslatedText>
                  </p>
                </div>

                <div className="exhibition-feature">
                  <div className="exhibition-feature-image">
                    <img src={Exhibitions} alt="Restoration" />
                    <div className="feature-tag">
                      <TranslatedText>Video</TranslatedText>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="exhibition-feature-title nav-button"
                    onClick={() => {
                      setShowExploreDropdown(false);
                      directNavigate("/dupinplus");
                    }}
                  >
                    <TranslatedText>
                      Restoration of the Arc de Triomphe du Carrousel
                    </TranslatedText>
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
                  </button>
                  <p className="exhibition-feature-description">
                    <TranslatedText>
                      Discover the restoration of the Arc de Triomphe du
                      Carrousel
                    </TranslatedText>
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
          <div
            className="mobile-lang-selector"
            onClick={() => setShowMobileLangDropdown(!showMobileLangDropdown)}
            ref={mobileLangDropdownRef}
          >
            {getCurrentLanguageName()}{" "}
            {showMobileLangDropdown ? <ChevronUp /> : <ChevronDown />}
            {/* Mobile Language Dropdown */}
            {showMobileLangDropdown && (
              <div className="mobile-language-options">
                {supportedLanguages.map((lang) => (
                  <div
                    key={lang.code}
                    className={`mobile-language-option ${
                      currentLanguage === lang.code ? "active" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLanguageChange(lang.code);
                    }}
                  >
                    {lang.code === "vi" ? "Tiếng Việt" : "English"}
                  </div>
                ))}
              </div>
            )}
          </div>
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
            onClick={() => openMobileSubmenu("THAM QUAN")}
          >
            <TranslatedText>THAM QUAN</TranslatedText>
            <ChevronRight />
          </div>
          <div
            className="mobile-nav-item"
            onClick={() => openMobileSubmenu("TRIỂN LÃM")}
          >
            <TranslatedText>TRIỂN LÃM VÀ SỰ KIỆN</TranslatedText>
            <ChevronRight />
          </div>
          <div
            className="mobile-nav-item"
            onClick={() => openMobileSubmenu("KHÁM PHÁ")}
          >
            <TranslatedText>KHÁM PHÁ</TranslatedText>
            <ChevronRight />
          </div>
        </div>

        <div className="mobile-nav-divider"></div>

        <div className="mobile-secondary-links">
          <div
            className="mobile-secondary-item"
            onClick={() => handleNavItemClick("/boutique")}
          >
            <TranslatedText>Cửa hàng Lưu niệm</TranslatedText>
          </div>
          <div
            className="mobile-secondary-item"
            onClick={() => handleNavItemClick("/support")}
          >
            <TranslatedText>Hỗ trợ Musée Du Pin</TranslatedText>
          </div>
        </div>

        <div className="mobile-social-icons">
          <a
            href="https://www.facebook.com/museedulouvre"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Facebook"
            onClick={() => setShowMobileMenu(false)}
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/museelouvre/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Instagram"
            onClick={() => setShowMobileMenu(false)}
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/MuseeLouvre"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Twitter"
            onClick={() => setShowMobileMenu(false)}
          >
            <TwitterIcon />
          </a>
          <a
            href="https://www.youtube.com/user/louvre"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="YouTube"
            onClick={() => setShowMobileMenu(false)}
          >
            <YoutubeIcon />
          </a>
          <a
            href="https://www.pinterest.com/museedulouvre/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="Pinterest"
            onClick={() => setShowMobileMenu(false)}
          >
            <PinterestIcon />
          </a>
          <a
            href="https://www.linkedin.com/company/musee-du-louvre/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
            aria-label="LinkedIn"
            onClick={() => setShowMobileMenu(false)}
          >
            <LinkedInIcon />
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
              className="back-buttons"
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
              <TranslatedText>Quay lại</TranslatedText>
            </button>
            <h2 className="submenu-title">
              <TranslatedText>{currentMobileSubmenu}</TranslatedText>
            </h2>
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
                {submenuFeatured.title}
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
                alt={submenuFeatured.title}
                className="featured-image"
              />
              <p className="featured-description">
                {submenuFeatured.description}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Overlay during translation */}
      {isTranslating && (
        <div className="language-translation-overlay">
          <div className="translation-message">
            <span>Đang chuyển đổi ngôn ngữ...</span>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
