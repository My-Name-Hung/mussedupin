import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../../../contexts/TranslationContext";
import { getImageUrls } from "../../../utils/cloudinary";
import "./VisitInfo.css";

import { FaCar, FaMountain, FaSearch } from "react-icons/fa";
import { FaMattressPillow, FaShop } from "react-icons/fa6";
import { IoBed } from "react-icons/io5";
import { MdOutlineSquareFoot } from "react-icons/md";
import { PiMotorcycleBold } from "react-icons/pi";
import { TbToolsKitchen2 } from "react-icons/tb";

const VisitInfo = () => {
  const { currentLang } = useTranslation();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("amenities");
  const [isMobile] = useState(false);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef(null);
  const heroRef = useRef(null);
  const detailsSidebarRef = useRef(null);
  const bookingSidebarRef = useRef(null);

  // Add new state for slideshow
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState(0);
  const autoPlayRef = useRef(null);
  const slideShowImages = [
    "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932474/hxeghpjapx0q1lnd9of7.png",
    "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932472/ljwetq9g8dmz5edvbuxp.png",
    "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932465/xcuejk2gd0rqykopuexl.png",
    "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932465/trpbrtxdkgipem7yn72y.png",
    "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932462/kgr44fu7ifporveofmhf.png",
    "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932462/b2qkklmo1grw1ushz83d.png",
    "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932457/wnggxcv1dn4b6meviasq.png",
  ];

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStartX) return;

    const touchEndX = e.touches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      setTouchStartX(0);
    }
  };

  // Handle autoplay
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slideShowImages.length);
      }, 5000); // Change slide every 5 seconds
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, slideShowImages.length]);

  // Handle manual navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideShowImages.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? slideShowImages.length - 1 : prev - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Homestay filter and detail states
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);
  const [showBookingSidebar, setShowBookingSidebar] = useState(false);
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",

    specialRequests: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBookingData, setSuccessBookingData] = useState(null);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeFaq, setActiveFaq] = useState(null);

  // Add new state for capacity selection
  const [selectedCapacity, setSelectedCapacity] = useState({});

  const sectionRefs = {
    amenities: useRef(null),
    homestay: useRef(null),
    faq: useRef(null),
  };

  // Add price calculation helper
  const calculatePrice = (homestayId) => {
    const selectedOption = selectedCapacity[homestayId];
    if (selectedOption) {
      return selectedOption.price;
    }
    const homestay = homestayData.find((h) => h.id === homestayId);
    return homestay ? homestay.price : 0;
  };

  // Handle query parameters and hash links when component mounts
  useEffect(() => {
    // Get the section from query parameter
    const params = new URLSearchParams(location.search);
    const sectionFromQuery = params.get("section");

    // Get the hash from the URL
    const hash = location.hash.replace("#", "");

    // Use section from query parameter first, then hash
    const targetSection = sectionFromQuery || hash;

    // If there's a target section and it corresponds to one of our sections, set it as active
    if (targetSection && sectionRefs[targetSection]) {
      setActiveSection(targetSection);

      // Add a small delay to ensure DOM is fully loaded
      setTimeout(() => {
        // Scroll to the section
        sectionRefs[targetSection].current?.scrollIntoView({
          behavior: "smooth",
        });
      }, 300);
    }
  }, [location]);

  // Filter homestays when category changes
  useEffect(() => {
    filterHomestays(activeCategory);
  }, [activeCategory]);

  // Handle scroll
  const handleScroll = useCallback(() => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    lastScrollTop.current = st <= 0 ? 0 : st;

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      // Handle scroll end
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  // Filter homestays based on selected category
  const filterHomestays = (category) => {
    if (category === "all") {
      setFilteredHomestays(homestayData);
    } else {
      const filtered = homestayData.filter((homestay) =>
        homestay.category.includes(category)
      );
      setFilteredHomestays(filtered);
    }
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Scroll to section with URL hash update
  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId];
    if (section && section.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  // Helper function to get localized content
  const getLocalizedContent = (field) => {
    if (typeof field === "object" && (field.vi || field.en)) {
      return field[currentLang] || field.en;
    }
    return field;
  };

  // Open details sidebar for a homestay
  const openDetailsSidebar = (homestay) => {
    // Create a new object with localized content
    const localizedHomestay = {
      ...homestay,
      description: getLocalizedContent(homestay.description),
      location: getLocalizedContent(homestay.location),
      roomType: getLocalizedContent(homestay.roomType),
      beds: getLocalizedContent(homestay.beds),
      amenities: Array.isArray(homestay.amenities)
        ? homestay.amenities
        : getLocalizedContent(homestay.amenities),
      rules: Array.isArray(homestay.rules)
        ? homestay.rules
        : getLocalizedContent(homestay.rules),
      cancellation: getLocalizedContent(homestay.cancellation),
      capacityOptions: homestay.capacityOptions?.map((option) => ({
        ...option,
        description: getLocalizedContent(option.description),
      })),
    };

    setSelectedHomestay(localizedHomestay);
    setShowDetailsSidebar(true);

    // Make sure booking sidebar is closed
    setShowBookingSidebar(false);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    // Add a small delay to ensure the sidebar is rendered
    setTimeout(() => {
      if (detailsSidebarRef.current) {
        detailsSidebarRef.current.scrollTop = 0;
      }
    }, 100);
  };

  // Close details sidebar
  const closeDetailsSidebar = () => {
    setShowDetailsSidebar(false);
    document.body.style.overflow = "auto";
  };

  // Helper function to get current price based on selected capacity
  const getCurrentPrice = (homestayId) => {
    const selectedCapacityOption = selectedCapacity[homestayId];
    return (
      selectedCapacityOption?.price ||
      homestayData.find((h) => h.id === homestayId)?.price ||
      0
    );
  };

  // Update openBookingSidebar
  const openBookingSidebar = (homestay) => {
    const localizedHomestay = {
      ...homestay,
      description: getLocalizedContent(homestay.description),
      location: getLocalizedContent(homestay.location),
      roomType: getLocalizedContent(homestay.roomType),
      beds: getLocalizedContent(homestay.beds),
      amenities: Array.isArray(homestay.amenities)
        ? homestay.amenities
        : getLocalizedContent(homestay.amenities),
      rules: Array.isArray(homestay.rules)
        ? homestay.rules
        : getLocalizedContent(homestay.rules),
      cancellation: getLocalizedContent(homestay.cancellation),
      capacityOptions: homestay.capacityOptions?.map((option) => ({
        ...option,
        description: getLocalizedContent(option.description),
      })),
      price: getCurrentPrice(homestay.id),
    };

    setSelectedHomestay(localizedHomestay);
    setShowBookingSidebar(true);
    setShowDetailsSidebar(false);
    document.body.style.overflow = "hidden";
  };

  // Close booking sidebar
  const closeBookingSidebar = () => {
    setShowBookingSidebar(false);
    document.body.style.overflow = "auto";
  };

  // Handle booking form input changes
  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData({
      ...bookingFormData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  // Validate booking form
  const validateForm = () => {
    const errors = {};

    if (!bookingFormData.name.trim()) {
      errors.name = "Vui lòng nhập họ và tên";
    }

    if (!bookingFormData.email.trim()) {
      errors.email = "Vui lòng nhập địa chỉ email";
    } else if (!/\S+@\S+\.\S+/.test(bookingFormData.email)) {
      errors.email = "Địa chỉ email không hợp lệ";
    }

    if (!bookingFormData.phone.trim()) {
      errors.phone = "Vui lòng nhập số điện thoại";
    }

    if (!bookingFormData.checkIn) {
      errors.checkIn = "Vui lòng chọn ngày nhận phòng";
    }

    if (!bookingFormData.checkOut) {
      errors.checkOut = "Vui lòng chọn ngày trả phòng";
    } else if (
      bookingFormData.checkIn &&
      new Date(bookingFormData.checkOut) <= new Date(bookingFormData.checkIn)
    ) {
      errors.checkOut = "Ngày trả phòng phải sau ngày nhận phòng";
    }

    return errors;
  };

  // Update handleBookingSubmit
  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      const currentPrice = getCurrentPrice(selectedHomestay.id);
      const nights = Math.max(
        1,
        Math.ceil(
          (new Date(bookingFormData.checkOut) -
            new Date(bookingFormData.checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      );

      const formattedData = {
        homestay: selectedHomestay?.title,
        price: currentPrice,
        totalPrice: currentPrice * nights,
        location: selectedHomestay?.location,
        host: selectedHomestay?.host,
        checkIn: bookingFormData.checkIn,
        checkOut: bookingFormData.checkOut,
        selectedTime: selectedTime,
        nights: nights,
        ...bookingFormData,
        date: new Date().toISOString(),
      };

      setSuccessBookingData(formattedData);

      try {
        const bookingServerUrl = "https://mussedupin.onrender.com/api/bookings";
        const serverResponse = await fetch(bookingServerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (!serverResponse.ok) {
          throw new Error("Không thể lưu đặt phòng lên máy chủ");
        }
      } catch (serverError) {
        console.error("Không thể lưu lên máy chủ đặt phòng:", serverError);
      }

      setShowBookingSidebar(false);
      setShowSuccessModal(true);
      setBookingFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",

        specialRequests: "",
      });
      setSelectedTime(null);
    } catch (error) {
      console.error("Lỗi khi gửi đặt phòng:", error);
      alert("Đã xảy ra lỗi khi gửi đặt phòng. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    document.body.style.overflow = "auto";
  };

  // Amenities data
  const amenitiesData = [
    {
      id: "information-desk",
      title: "Quầy thông tin",
      description:
        "Offline: Là nơi du khách có thể hỏi đáp các thắc mắc và nhận hướng dẫn. Tại đây nhân viên có thể giao tiếp bằng 2 ngôn ngữ: Anh- Việt trực từ 8h-23h hàng ngày\n\nOnline: Du khách có thể kết bạn zalo, line, viber để nhận thông tin và được tư vấn 24/7",
      image: "room1.jpg",
      icon: "info",
      details: "Hỗ trợ đa ngôn ngữ: Anh - Việt",
    },
    {
      id: "cloakroom",
      title: "Khu vực gửi đồ",
      description:
        "Nằm phía sau khu vực Khánh Tiết. Nhân viên sẽ hướng dẫn và nhận/trả đồ gửi.",
      image: "room2.jpg",
      icon: "hanger",
      details: "Dịch vụ gửi đồ có nhân viên hỗ trợ",
    },
    {
      id: "vehicle-rental",
      title: "Cho thuê oto xe máy",
      description: "Bảo Tàng Thông có sẵn xe máy và oto cho khách thuê.",
      image: "vehicle.jpg",
      icon: "stroller",
      details: "Dịch vụ cho thuê phương tiện di chuyển",
    },
    {
      id: "wifi",
      title: "Wifi miễn phí",
      description:
        "Mạng wifi tốc độ cao phủ khắp Bảo Tàng. Tốc độ kết nối 50Mbps",
      image: "wifi.jpg",
      icon: "wifi",
      details: "Kết nối internet tốc độ cao",
    },
    {
      id: "restroom",
      title: "Nhà vệ sinh",
      description:
        "Nhà vệ sinh có thể được tìm thấy tại khu vực Trưng bày tổng hợp ở sảnh tầng 1. Nhà vệ sinh có thể tiếp cận được cho người khuyết tật",
      image: "restroom.jpg",
      icon: "toilet",
      details: "Tiện nghi vệ sinh phù hợp cho mọi đối tượng",
    },
    {
      id: "parking",
      title: "Bãi đậu xe",
      description:
        "Bãi đậu xe nằm ngay trong khuôn viên của Bảo Tàng. Chú ý theo sát sự hướng dẫn của nhân viên Bảo Tàng",
      image: "parking.jpg",
      icon: "parking",
      details: "Bãi đỗ xe trong khuôn viên",
    },
    {
      id: "lost-found",
      title: "Đồ thất lạc",
      description:
        "Nếu bạn vẫn còn trong Bảo tàng, hãy đến Quầy tiếp đón tại sảnh Khánh Tiết. Nếu bạn đã rời khỏi Bảo Tàng, hãy liên hệ cho hotline của bảo tàng để hỗ trợ tìm kiếm và quý khách có thể quay lại nhận trong 30 ngày.",
      image: "lost-found.jpg",
      icon: "help",
      details: "Dịch vụ tìm đồ thất lạc",
    },
    {
      id: "souvenir",
      title: "Hàng lưu niệm",
      description:
        "Quý khách có thể tìm kiếm trên mục Cửa hàng Lưu niệm để đặt mua online rất nhiều sản phẩm đặc biệt của Bảo Tàng Thông và sẽ được giao ship tận nơi cho quý khách.",
      image: "souvenir.jpg",
      icon: "store",
      details: "Cửa hàng lưu niệm online với giao hàng tận nơi",
    },
  ];

  // Homestay data with expanded information for detailed view
  const homestayData = [
    // Chill 1
    {
      id: "room1",
      title: {
        vi: "Bình Yên I",
        en: "The Chill I",
      },
      description: {
        vi: "Căn phòng được thiết kế như 1 nơi trú ẩn yên bình để tận hưởng Đà Lạt",
        en: "A quiet space where the soul finds healing.",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20I-%20The%20Chill%20I/z6735017008335_1f53d54c8c667e714237c694c6fb2bf0.jpg?updatedAt=1751274193309",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 2,
          originalPrice: 1800000,
          discountPercentage: 0,
          price: 1800000,
          description: {
            vi: "Phù hợp cho 2 người",
            en: "Suitable for 2 people",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 1800000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Bình yên", "Phục vụ bữa sáng"],
        en: ["Recommended", "Peaceful", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "1 giường kings size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 35m2",
          },
          {
            icon: FaMountain,
            text: "View: ban công view đồi",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng ấm",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "1 king size bed",
          },
          {
            icon: FaMattressPillow,
            text: "Soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 35m2",
          },
          {
            icon: FaMountain,
            text: "View: balcony facing hill",
          },
          {
            icon: TbToolsKitchen2,
            text: "Warm water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20I-%20The%20Chill%20I/z6735017010424_c5b5d136ffaa05d5e408ad90609b90e9.jpg?updatedAt=1751274193547",
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20I-%20The%20Chill%20I/z6735017013301_84ce9b1c810327e7b57fe8a2f5e22b6a.jpg?updatedAt=1751274193462",
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20I-%20The%20Chill%20I/z6735017020976_93d6bcd5ab2b41226790e91f84997612.jpg?updatedAt=1751274193461",
      ],
    },
    // Chill 2
    {
      id: "room2",
      title: {
        vi: "Bình Yên II",
        en: "The Chill II",
      },
      description: {
        vi: "Căn phòng gợi nhắc về những tháng ngày tuổi trẻ nhiều ước mơ và hoài bão.",
        en: "The room reminds of youthful days filled with dreams and aspirations.",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20II-%20The%20Chill%20II/z6735017019144_2e97325679ec2dbf6248ee217d2c005e.jpg?updatedAt=1751274217344",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 2,
          originalPrice: 1600000,
          discountPercentage: 0,
          price: 1600000,
          description: {
            vi: "Phù hợp cho 2 người",
            en: "Suitable for 2 people",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 1600000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Bình yên", "Phục vụ bữa sáng"],
        en: ["Recommended", "Peaceful", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "1 giường kings size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: ban công view đồi và vườn dâu",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng ấm",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "1 king size bed",
          },
          {
            icon: FaMattressPillow,
            text: "Soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: balcony facing hill and strawberry garden",
          },
          {
            icon: TbToolsKitchen2,
            text: "Warm water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20II-%20The%20Chill%20II/z6735017028190_4bdb8e9026399940cbee00981cc6c901.jpg?updatedAt=1751274217128",
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20II-%20The%20Chill%20II/z6735017048095_70539aee860e54a572e65d6d8894cfaf.jpg?updatedAt=1751274217824",
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20II-%20The%20Chill%20II/z6735017022334_9cfa421a31bbc0ccd98d0b48f74c68d7.jpg?updatedAt=1751274218002",
      ],
    },
    // Cánh diều
    {
      id: "room3",
      title: {
        vi: "Cánh diều",
        en: "The Kite",
      },
      description: {
        vi: "Căn phòng được thiết kế với ý tưởng như 1 cánh diều cưỡi gió bay trên bầu trời Đà Lạt.",
        en: "The room is designed with inspiration from a kite soaring in the sky of Đà Lạt.",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/C%C3%A1nh%20di%E1%BB%81u-%20The%20Kite/404%20-%201.png?updatedAt=1751274406678",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 3,
          originalPrice: 1600000,
          discountPercentage: 0,
          price: 1600000,
          description: {
            vi: "Phù hợp cho 3 người",
            en: "Suitable for 3 people",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 1600000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Phục vụ bữa sáng"],
        en: ["Recommended", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "2 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: thung lũng",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng ấm",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "2 queen size beds",
          },
          {
            icon: FaMattressPillow,
            text: "Soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: valley",
          },
          {
            icon: TbToolsKitchen2,
            text: "Warm water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/C%C3%A1nh%20di%E1%BB%81u-%20The%20Kite/404%20-%202.png?updatedAt=1751274405347",
        "https://ik.imagekit.io/8u8lkoqkkm/C%C3%A1nh%20di%E1%BB%81u-%20The%20Kite/404%20-%204.png?updatedAt=1751274406373",
        "https://ik.imagekit.io/8u8lkoqkkm/C%C3%A1nh%20di%E1%BB%81u-%20The%20Kite/404%20-%203.png?updatedAt=1751274407347",
      ],
    },
    // Dâu Tây
    {
      id: "room4",
      title: {
        vi: "Dâu Tây",
        en: "Strawberry",
      },
      description: {
        vi: "Căn phòng được thiết kế lấy cảm hứng từ quả dâu tây Đà Lạt.",
        en: "The room is designed with inspiration from the strawberry of Đà Lạt.",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/D%C3%A2u%20t%C3%A2y-%20Strawberry/z6735068946993_6566743fb95325c53d9b69e966e2ae4a.jpg?updatedAt=1751274423030",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 2,
          originalPrice: 2000000,
          discountPercentage: 0,
          price: 2000000,
          description: {
            vi: "Phù hợp cho 2 người lớn và 1 trẻ em",
            en: "Suitable for 2 adults and 1 child",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 2000000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Phổ biến", "Phục vụ bữa sáng"],
        en: ["Popular", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "1 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm cứng",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 35m2",
          },
          {
            icon: FaMountain,
            text: "View: balcony hướng đồi thông, vườn dâu",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng già",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "1 queen size bed",
          },
          {
            icon: FaMattressPillow,
            text: "Firm mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 35m2",
          },
          {
            icon: FaMountain,
            text: "View: balcony facing pine hill and strawberry garden",
          },
          {
            icon: TbToolsKitchen2,
            text: "Hot water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/D%C3%A2u%20t%C3%A2y-%20Strawberry/z6735068946993_6566743fb95325c53d9b69e966e2ae4a.jpg?updatedAt=1751274423030",
      ],
    },
    // Tuổi ấu thơ - The childhood
    {
      id: "room5",
      title: {
        vi: "Tuổi ấu thơ",
        en: "The Childhood",
      },
      description: {
        vi: "Căn phòng được thiết kế để lưu giữ những kỉ niệm thời thơ ấu",
        en: "The room is designed to preserve childhood memories",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Tu%E1%BB%95i%20%E1%BA%A5u%20th%C6%A1-%20The%20Childhood/z6735013755648_e134fda3141c25a0a9fc67efa73d00de.jpg?updatedAt=1751274451818",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 4,
          originalPrice: 2500000,
          discountPercentage: 0,
          price: 2500000,
          description: {
            vi: "Phù hợp cho 4 người 2 giường",
            en: "Suitable for 4 people 2 beds",
          },
        },
        {
          capacity: 5,
          originalPrice: 3000000,
          discountPercentage: 0,
          price: 3000000,
          description: {
            vi: "Phù hợp cho 5 người 3 giường",
            en: "Suitable for 5 people 3 beds",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 2500000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Phổ biến", "Ưa thích", "Phục vụ bữa sáng"],
        en: ["Popular", "Favorite", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "2 giường queen size và 1 giường twin",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm mềm kết hợp cứng",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: thung lũng",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng già",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "2 queen size beds and 1 twin bed",
          },
          {
            icon: FaMattressPillow,
            text: "Soft and firm mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: valley",
          },
          {
            icon: TbToolsKitchen2,
            text: "Hot water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/Tu%E1%BB%95i%20%E1%BA%A5u%20th%C6%A1-%20The%20Childhood/z6735015414889_8182efceb44c665d14cccab4af6c22d5.jpg?updatedAt=1751274450072",
        "https://ik.imagekit.io/8u8lkoqkkm/Tu%E1%BB%95i%20%E1%BA%A5u%20th%C6%A1-%20The%20Childhood/z6735015437354_27e632b3dae9519ab10ab29fdd0b83dc.jpg?updatedAt=1751274451715",
        "https://ik.imagekit.io/8u8lkoqkkm/Tu%E1%BB%95i%20%E1%BA%A5u%20th%C6%A1-%20The%20Childhood/z6735015432747_e1b425b09fae43c72ebd35d6346d26f9.jpg?updatedAt=1751274451957",
      ],
    },
    // Toa tàu - The train
    {
      id: "room6",
      title: {
        vi: "Toa tàu",
        en: "The Train",
      },
      description: {
        vi: "Căn phòng được thiết kế lấy cảm hứng từ toa xe lửa cổ Đà Lạt",
        en: "The room is designed with inspiration from the old train carriage of Đà Lạt",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Toa%20t%C3%A0u-%20The%20Train/z6735013970930_367d839a1762df6694ba9fde11f52475.jpg?updatedAt=1751274451540",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 4,
          originalPrice: 2600000,
          discountPercentage: 0,
          price: 2600000,
          description: {
            vi: "Phù hợp cho 4 người 2 giường",
            en: "Suitable for 4 people 2 beds",
          },
        },
        {
          capacity: 5,
          originalPrice: 3200000,
          discountPercentage: 0,
          price: 3200000,
          description: {
            vi: "Phù hợp cho 5 người 3 giường",
            en: "Suitable for 5 people 3 beds",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 2600000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Truyền thống", "Bao gồm bữa sáng"],
        en: ["Recommended", "Traditional", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "3 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm cứng",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 35m2",
          },
          {
            icon: FaMountain,
            text: "View: ban công hướng đồi",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng già",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "3 queen size beds",
          },
          {
            icon: FaMattressPillow,
            text: "Firm mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 35m2",
          },
          {
            icon: FaMountain,
            text: "View: balcony facing hill",
          },
          {
            icon: TbToolsKitchen2,
            text: "Hot water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/Toa%20t%C3%A0u-%20The%20Train/z6735013964771_3b247b38f20745fe94884841d38fe804.jpg?updatedAt=1751274450576",
        "https://ik.imagekit.io/8u8lkoqkkm/Toa%20t%C3%A0u-%20The%20Train/z6735014096525_05d0b212d9e6a930811003b02bb71cd4.jpg?updatedAt=1751274452100",
        "https://ik.imagekit.io/8u8lkoqkkm/Toa%20t%C3%A0u-%20The%20Train/z6735014101876_72374c25ca14f96e1ce8040d596f3800.jpg?updatedAt=1751274452125",
      ],
    },
    // Thác đổ - The Fall
    {
      id: "room7",
      title: {
        vi: "Thác đổ",
        en: "The Fall",
      },
      description: {
        vi: "Căn phòng được thiết kế lấy cảm hứng từ hình ảnh thác nước hùng vĩ",
        en: "The room is designed with inspiration from majestic waterfall imagery",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Th%C3%A1c%20%C4%91%E1%BB%95-%20The%20Fall/z6735013550592_06292038d263699476dd8144aa005946.jpg?updatedAt=1751274451608",

      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 6,
          originalPrice: 3000000,
          discountPercentage: 0,
          price: 3000000,
          description: {
            vi: "Phù hợp cho 6 người",
            en: "Suitable for 6 people",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 3000000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Truyền thống", "Bao gồm bữa sáng"],
        en: ["Recommended", "Traditional", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "3 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm cứng kết hợp mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 33m2",
          },
          {
            icon: FaMountain,
            text: "View: ban công hướng đồi và vườn dâu",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng già",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "3 queen size beds",
          },
          {
            icon: FaMattressPillow,
            text: "Firm and soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 33m2",
          },
          {
            icon: FaMountain,
            text: "View: balcony facing hill and strawberry garden",
          },
          {
            icon: TbToolsKitchen2,
            text: "Hot water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/Th%C3%A1c%20%C4%91%E1%BB%95-%20The%20Fall/z6735013550592_06292038d263699476dd8144aa005946.jpg?updatedAt=1751274451608",
      ],
    },
    // Đồi thông -The Pine Hill
    {
      id: "room8",
      title: {
        vi: "Đồi thông",
        en: "The Pine Hill",
      },
      description: {
        vi: "Căn phòng được thiết kế lấy cảm hứng từ những đồi thông xanh ngát Đà Lạt",
        en: "The room is designed with inspiration from the pine hills of Đà Lạt",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/%C4%90%E1%BB%93i%20Th%C3%B4ng-%20The%20Pine%20Hill/z6735015682281_4f24f3571385b7a2b97d36acd8ba8113.jpg?updatedAt=1751274459265",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 4,
          originalPrice: 2500000,
          discountPercentage: 0,
          price: 2500000,
          description: {
            vi: "Phù hợp cho 4 người 2 giường",
            en: "Suitable for 4 people 2 beds",
          },
        },
        {
          capacity: 5,
          originalPrice: 3000000,
          discountPercentage: 0,
          price: 3000000,
          description: {
            vi: "Phù hợp cho 5 người 3 giường",
            en: "Suitable for 5 people 3 beds",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 2500000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Truyền thống", "Bao gồm bữa sáng"],
        en: ["Recommended", "Traditional", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "3 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm cứng kết hợp mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 33m2",
          },
          {
            icon: FaMountain,
            text: "View: ban công hướng đồi và vườn dâu",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng già",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "3 queen size beds",
          },
          {
            icon: FaMattressPillow,
            text: "Firm and soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 33m2",
          },
          {
            icon: FaMountain,
            text: "View: balcony facing hill and strawberry garden",
          },
          {
            icon: TbToolsKitchen2,
            text: "Hot water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/%C4%90%E1%BB%93i%20Th%C3%B4ng-%20The%20Pine%20Hill/z6735015651739_dd2f31f8ccdc5ae1358d841e5aa339e3.jpg?updatedAt=1751274452128",
        "https://ik.imagekit.io/8u8lkoqkkm/%C4%90%E1%BB%93i%20Th%C3%B4ng-%20The%20Pine%20Hill/z6735015656377_198f2a9fee105f5a84f871cf035e5f05.jpg?updatedAt=1751274456308",
        "https://ik.imagekit.io/8u8lkoqkkm/%C4%90%E1%BB%93i%20Th%C3%B4ng-%20The%20Pine%20Hill/z6735015681039_b9e5db9d15115a6704e041f7ac2213a2.jpg?updatedAt=1751274457855",
      ],
    },
    //  Hoa ban Trắng - Bauhinia
    {
      id: "room9",
      title: {
        vi: "Hoa ban trắng",
        en: "White Bauhinia",
      },
      description: {
        vi: "Căn phòng được thiết kế lấy cảm hứng từ loài hoa Ban Trắng",
        en: "The room is designed with inspiration from the white Bauhinia flower.",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Hoa%20Ban%20Tr%E1%BA%AFng-%20Bauhinia/z6735015913658_0a13ac137c59ccacc8e376f1d7f63ce8.jpg?updatedAt=1751274467967",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 3,
          originalPrice: 1600000,
          discountPercentage: 0,
          price: 1600000,
          description: {
            vi: "Phù hợp cho 3 người",
            en: "Suitable for 3 people",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 1600000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Mới sửa sang"],
        en: ["Recommended", "Newly renovated"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "2 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: panorama nhìn thung lũng",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng già",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "2 queen size beds",
          },
          {
            icon: FaMattressPillow,
            text: "Soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: panoramic valley view",
          },
          {
            icon: TbToolsKitchen2,
            text: "Hot water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/Hoa%20Ban%20Tr%E1%BA%AFng-%20Bauhinia/z6735015923186_fb855bfe42041484c06d0353b44d1b60.jpg?updatedAt=1751274468374",
        "https://ik.imagekit.io/8u8lkoqkkm/Hoa%20Ban%20Tr%E1%BA%AFng-%20Bauhinia/z6735015923187_251ad2d47355a5578157b82480eb7b95.jpg?updatedAt=1751274467506",
        "https://ik.imagekit.io/8u8lkoqkkm/Hoa%20Ban%20Tr%E1%BA%AFng-%20Bauhinia/z6735015922844_0a7c9d60d7894368b407ce87bc5b3150.jpg?updatedAt=1751274467244",
      ],
    },
    //  Hoài niệm - The Memory
    {
      id: "room10",
      title: {
        vi: "Hoài niệm",
        en: "The Memory",
      },
      description: {
        vi: "Căn phòng được thiết kế với ý tưởng gợi nhắc về những ký ức Đà Lạt xưa",
        en: "The room is designed with inspiration from the memories of Đà Lạt past.",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0i%20Ni%E1%BB%87m-%20The%20Memory/z6735016111786_26063d0dd74c1796f25a106e4e7e48cb.jpg?updatedAt=1751274468488",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 4,
          originalPrice: 1800000,
          discountPercentage: 0,
          price: 1800000,
          description: {
            vi: "Phù hợp cho 4 người",
            en: "Suitable for 4 people",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 1800000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Truyền thống", "Bao gồm bữa sáng"],
        en: ["Recommended", "Traditional", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "2 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 33m2",
          },
          {
            icon: FaMountain,
            text: "View: Ban công view đồi và vườn dâu",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng ấm",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "2 queen size beds",
          },
          {
            icon: FaMattressPillow,
            text: "Soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 33m2",
          },
          {
            icon: FaMountain,
            text: "View: Balcony facing hill and strawberry garden",
          },
          {
            icon: TbToolsKitchen2,
            text: "Warm water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0i%20Ni%E1%BB%87m-%20The%20Memory/z6735016139332_9e4c468a4db746027f4835319416b5d1.jpg?updatedAt=1751274469979",
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0i%20Ni%E1%BB%87m-%20The%20Memory/z6735016113451_2c39f07f4a532e6486fc3f89a454faf6.jpg?updatedAt=1751274468667",
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0i%20Ni%E1%BB%87m-%20The%20Memory/z6735016139166_47732a3209a66ed5ec0769c69885f790.jpg?updatedAt=1751274468172",
      ],
    },
    // Hoàng hôn - The sunset
    {
      id: "room11",
      title: {
        vi: "Hoàng hôn Đà Lạt",
        en: "The Sunset",
      },
      description: {
        vi: "Căn phòng được thiết kế lấy cảm hứng từ bầu trời hoàng hôn rực đỏ Đà Lạt.",
        en: "The room is designed with inspiration from the sunset of Đà Lạt.",
      },
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0ng%20h%C3%B4n-%20The%20Sunset/z6735016357613_e2751dcece85c553aaa0c8e54f9e5d11.jpg?updatedAt=1751274470184",
      highlights: {
        vi: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Gần trung tâm",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Đánh giá cao",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "An toàn 24/7",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Phòng rộng rãi",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Dịch vụ chuyên nghiệp",
          },
        ],
        en: [
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bus.svg?s=600x",
            text: "Near center",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/like.svg?s=600x",
            text: "Highly rated",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/SafetyFeatures.svg?s=600x",
            text: "24/7 security",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/bedKing.svg?s=600x",
            text: "Spacious room",
          },
          {
            icon: "https://cdn6.agoda.net/images/property/highlights/hotel.svg?s=600x",
            text: "Professional service",
          },
        ],
      },
      capacityOptions: [
        {
          capacity: 4,
          originalPrice: 1800000,
          discountPercentage: 0,
          price: 1800000,
          description: {
            vi: "Phù hợp cho 4 người",
            en: "Suitable for 4 people",
          },
        },
      ],
      selectedCapacityIndex: 0, // Default to first option
      price: 1800000, // Default price updated to match capacityOptions
      rating: 4.8,
      tags: {
        vi: ["Đề xuất", "Truyền thống", "Bao gồm bữa sáng"],
        en: ["Recommended", "Traditional", "Breakfast included"],
      },
      category: [
        "popular",
        "recommended",
        "budget-friendly",
        "top-rated",
        "breakfast-included",
      ],
      amenities: {
        vi: [
          {
            icon: IoBed,
            text: "2 giường queen size",
          },
          {
            icon: FaMattressPillow,
            text: "Nệm mềm",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Diện tích: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: hoàng hôn thung lũng",
          },
          {
            icon: TbToolsKitchen2,
            text: "Nước nóng ấm",
          },
        ],
        en: [
          {
            icon: IoBed,
            text: "2 queen size beds",
          },
          {
            icon: FaMattressPillow,
            text: "Soft mattress",
          },
          {
            icon: MdOutlineSquareFoot,
            text: "Area: 30m2",
          },
          {
            icon: FaMountain,
            text: "View: valley sunset",
          },
          {
            icon: TbToolsKitchen2,
            text: "Warm water",
          },
        ],
      },
      rules: {
        vi: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
        en: ["No smoking", "No pets", "No parties"],
      },
      cancellation: {
        vi: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
        en: "Free cancellation up to 48 hours before check-in",
      },
      gallery: [
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0ng%20h%C3%B4n-%20The%20Sunset/z6735016690802_762b3a5d04bcb103be8152d001aa15d7.jpg?updatedAt=1751274474962",
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0ng%20h%C3%B4n-%20The%20Sunset/z6735016523535_29ce25f6fc23a6a23e581953b38fe622.jpg?updatedAt=1751274474498",
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0ng%20h%C3%B4n-%20The%20Sunset/z6735016246537_1ff98d5fc90a563c082cb96def7ae557.jpg?updatedAt=1751274470104",
      ],
    },
  ];

  // FAQ data with more detailed answers
  const faqData = [
    {
      question: {
        vi: "Tôi muốn biết giờ hoạt động của Bảo Tàng Thông?",
        en: "What are the opening hours of Musée Du Pin?",
      },
      answer: {
        vi: (
          <>
            Bạn có thể tìm hiểu giờ mở cửa của Bảo Tàng trong mục{" "}
            <a href="/visit" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Giờ mở cửa & chi phí các gói trải nghiệm</strong>
            </a>
          </>
        ),
        en: (
          <>
            You can find our opening hours in the{" "}
            <a href="/visit" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Opening Hours & Experience Packages</strong>
            </a>
          </>
        ),
      },
    },
    {
      question: {
        vi: "Tôi muốn biết đường đi tới Bảo tàng Thông?",
        en: "How do I get to Musée Du Pin?",
      },
      answer: {
        vi: (
          <>
            Bạn có thể tìm hiểu đường đi đến Bảo Tàng và từ Bảo Tàng đi đến các
            địa điểm khác trong mục{" "}
            <a
              href="/museum-map"
              style={{ cursor: "pointer", color: "#2c2f11" }}
            >
              <strong>Bản đồ, đường đi & chỉ dẫn</strong>
            </a>
          </>
        ),
        en: (
          <>
            You can find directions to and from the museum in our{" "}
            <a
              href="/museum-map"
              style={{ cursor: "pointer", color: "#2c2f11" }}
            >
              <strong>Map, Directions & Guide</strong>
            </a>
          </>
        ),
      },
    },
    {
      question: {
        vi: "Tôi muốn trải nghiệm ở Bảo Tàng Thông thì trả phí như thế nào?",
        en: "What are the admission fees for Musée Du Pin?",
      },
      answer: {
        vi: (
          <>
            Bạn có thể tìm hiểu chi tiết các gói trải nghiệm và chi phí tham
            khảo tại mục{" "}
            <a href="/visit" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Giờ mở cửa & chi phí các gói trải nghiệm</strong>
            </a>
          </>
        ),
        en: (
          <>
            You can find detailed information about experience packages and fees
            in our{" "}
            <a href="/visit" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Opening Hours & Experience Packages</strong>
            </a>
          </>
        ),
      },
    },
    {
      question: {
        vi: "Bảo Tàng Thông có những hoạt động nào?",
        en: "What activities are available at Musée Du Pin?",
      },
      answer: {
        vi: (
          <>
            Bảo Tàng Thông có nhiều hoạt động đa dạng, từ triển lãm thường trực
            đến các workshop nghệ thuật và chương trình giáo dục. Vui lòng xem
            mục{" "}
            <a href="/" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Khám phá</strong>
            </a>
            và{" "}
            <a href="/" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Trải nghiệm</strong>
            </a>{" "}
            để biết thêm chi tiết.
          </>
        ),
        en: (
          <>
            Musée Du Pin offers a variety of activities, from permanent
            exhibitions to art workshops and educational programs. Please check
            our{" "}
            <a href="/" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Explore</strong>
            </a>
            and{" "}
            <a href="/" style={{ cursor: "pointer", color: "#2c2f11" }}>
              <strong>Experience</strong>
            </a>{" "}
            sections for more details.
          </>
        ),
      },
    },

    {
      question: {
        vi: "Bảo Tàng Thông có các hoạt động nào cho trẻ em?",
        en: "What activities are available for children?",
      },
      answer: {
        vi: (
          <>
            Có rất nhiều hoạt động workshop giáo dục cho trẻ em, bạn có thể tham
            khảo tại mục{" "}
            <a
              href="/visit/regular"
              style={{ cursor: "pointer", color: "#2c2f11" }}
            >
              <strong>Các Chương Trình Định Kỳ</strong>
            </a>
          </>
        ),
        en: (
          <>
            We offer many educational workshops for children. You can find more
            information in our{" "}
            <a
              href="/visit/regular"
              style={{ cursor: "pointer", color: "#2c2f11" }}
            >
              <strong>Regular Programs section</strong>
            </a>
          </>
        ),
      },
    },
    {
      question: {
        vi: "Những vật dụng nào không được phép mang vào bảo tàng?",
        en: "What items are not allowed in the museum?",
      },
      answer: {
        vi: "Các vật dụng không được phép mang vào bảo tàng gồm đồ ăn thức uống (trừ chai nước), và các vật sắc nhọn. Những vật dụng này phải được gửi tại phòng gửi đồ. Chúng tôi cũng cấm chạm vào tác phẩm nghệ thuật, hút thuốc trong không gian trưng bày.",
        en: "Food and beverages (except water bottles) and sharp objects are not allowed in the museum. These items must be stored in the cloakroom. We also prohibit touching artworks and smoking in exhibition spaces.",
      },
    },
    {
      question: {
        vi: "Có cho phép xe đẩy em bé vào bảo tàng không?",
        en: "Are strollers allowed in the museum?",
      },
      answer: {
        vi: "Có, xe đẩy và nôi em bé được phép vào bảo tàng. Tuy nhiên, trong thời điểm đông khách, bạn có thể được yêu cầu gửi xe đẩy lớn tại phòng gửi đồ và sử dụng địu em bé thay thế.",
        en: "Yes, strollers and baby carriers are allowed in the museum. However, during peak hours, you may be asked to store large strollers in the cloakroom and use baby carriers instead.",
      },
    },
    {
      question: {
        vi: "Tôi có thể mang thú cưng vào Bảo Tàng không?",
        en: "Are pets allowed in the museum?",
      },
      answer: {
        vi: "Thật tiếc, bạn không thể mang thú cưng vào Bảo Tàng",
        en: "Sorry, pets are not allowed in the museum",
      },
    },
    {
      question: {
        vi: "Trong trường hợp để quên đồ tại Bảo Tàng thì tôi phải làm gì?",
        en: "What should I do if I lose something at the museum?",
      },
      answer: {
        vi: "Bạn cần thông báo cho hệ thống hỗ trợ online qua Zalo, fb Mes, Line, Viber để được khoanh vùng tìm kiếm đồ thất lạc. Bảo Tàng sẽ hỗ trợ hết sức cho quý khách nhưng không chịu trách nhiệm về việc này.",
        en: "Please notify our online support system via Zalo, Facebook Messenger, Line, or Viber to help locate your lost items. The museum will assist you but cannot be held responsible for lost items.",
      },
    },
    {
      question: {
        vi: "Bảo Tàng Thông có lắp máy lạnh không?",
        en: "Does the Musée Du Pin have air conditioning?",
      },
      answer: {
        vi: "Bảo Tàng Thông hướng đến sứ mệnh bảo tồn thông và không khí trong lành nên không cung cấp máy điều hòa, nhưng các căn phòng được thiết kế và lắp đặt các thiết bị đặc biệt để đảm bảo nhiệt độ phòng luôn ở mức 22-25 độ. Quý khách lưu ý không được hút thuốc trong phòng.",
        en: "Pine Museum aims to preserve pine and fresh air so it does not provide air conditioning, but the rooms are designed and equipped with special equipment to ensure the room temperature is always at 22-25 degrees. Please note that smoking is not allowed in the rooms.",
      },
    },
  ];

  // Render Hero Section with Slideshow
  const renderHero = () => (
    <div className="visitinfo-hero" ref={heroRef}>
      <div
        className="visitinfo-hero-image-container"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        {/* Navigation Buttons */}
        <button className="slide-nav prev" onClick={prevSlide}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path
              d="M15 18l-6-6 6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button className="slide-nav next" onClick={nextSlide}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path
              d="M9 18l6-6-6-6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Slides */}
        <div
          className="slides-container"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slideShowImages.map((image, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? "active" : ""}`}
            >
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="visitinfo-hero-image"
              />
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {slideShowImages.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );

  // Render Navigation Bar
  const renderNavigationBar = () => {
    // Don't render the navigation bar on mobile
    if (isMobile) return null;

    return (
      <>
        {/* <div
          className={`visitinfo-nav-container ${isNavSticky ? "sticky" : ""} ${
            navScrolled ? "scrolled-right" : ""
          }`}
          ref={(el) => {
            navRef.current = el;
            horizontalNavRef.current = el;
          }}
          onTouchStart={handleNavTouchStart}
          onTouchMove={handleNavTouchMove}
        >
          <div className="visitinfo-nav">
            <ul className="visitinfo-nav-list">
              <li
                className={`visitinfo-nav-item ${
                  activeSection === "amenities" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => scrollToSection("amenities")}
                  className="visitinfo-nav-button"
                >
                  Tiện ích
                </button>
                <span className="visitinfo-nav-indicator"></span>
              </li>
              <li
                className={`visitinfo-nav-item ${
                  activeSection === "homestay" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => scrollToSection("homestay")}
                  className="visitinfo-nav-button"
                >
                  Lưu trú
                </button>
                <span className="visitinfo-nav-indicator"></span>
              </li>
              <li
                className={`visitinfo-nav-item ${
                  activeSection === "faq" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => scrollToSection("faq")}
                  className="visitinfo-nav-button"
                >
                  Hỏi đáp
                </button>
                <span className="visitinfo-nav-indicator"></span>
              </li>
            </ul>
          </div>
        </div> */}
      </>
    );
  };

  // Function to create ripple effect on touch
  const createRippleEffect = (event) => {
    const button = event.currentTarget;

    // Check if button is still in the DOM
    if (!button || !document.body.contains(button)) {
      return;
    }

    const ripple = document.createElement("span");
    ripple.className = "ripple-circle";

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    // Handle touch events
    const clientX =
      event.clientX || (event.touches && event.touches[0].clientX);
    const clientY =
      event.clientY || (event.touches && event.touches[0].clientY);

    if (!clientX || !clientY) return;

    const offsetX = clientX - rect.left - size / 2;
    const offsetY = clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${offsetX}px`;
    ripple.style.top = `${offsetY}px`;

    // Add ripple to button
    button.appendChild(ripple);

    // Remove ripple after animation
    const removeRipple = () => {
      if (ripple && document.body.contains(ripple)) {
        ripple.remove();
      }
    };

    setTimeout(removeRipple, 800);
  };

  // Render Amenities Section
  const renderAmenitiesSection = () => (
    <section
      className="amenities-section"
      id="amenities"
      ref={sectionRefs.amenities}
    >
      {/* Decorative elements */}
      <div className="decorative-lines"></div>
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>
      <div className="decorative-dots-pattern"></div>

      <div className="section-tag">TIỆN ÍCH</div>

      <div className="visitinfo-section-container">
        <div className="visitinfo-section-header">
          <h2 className="visitinfo-section-title">
            <span>Tiện nghi và thoải mái</span>
            <span className="title-underline"></span>
          </h2>
          <p className="visitinfo-section-description">
            Bảo tàng cung cấp nhiều dịch vụ để đảm bảo điều kiện tham quan tốt
            nhất. Nhân viên luôn sẵn sàng trong bảo tàng để cung cấp thông tin
            cập nhật về bảo tàng và các hoạt động.
          </p>
        </div>

        <div className="amenities-container">
          {amenitiesData.map((amenity, index) => (
            <div
              className={`amenity-card desktop-enhanced ${
                index % 3 === 0 ? "wide" : ""
              }`}
              key={amenity.id}
              style={{
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, ${
                  index % 4 === 0
                    ? "#1E2A3B, #152231"
                    : index % 4 === 1
                    ? "#2A1E3B, #231522"
                    : index % 4 === 2
                    ? "#3B1E2A, #311522"
                    : "#1E3B2A, #152315"
                })`,
                borderLeft: `3px solid ${
                  index % 4 === 0
                    ? "#00d1b2"
                    : index % 4 === 1
                    ? "#7c4dff"
                    : index % 4 === 2
                    ? "#ff4081"
                    : "#00e676"
                }`,
              }}
              onClick={createRippleEffect}
            >
              <div className="amenity-content-wrapper">
                <div className="amenity-icon-container">
                  <div
                    className="amenity-icon"
                    style={{
                      color:
                        index % 4 === 0
                          ? "#00d1b2"
                          : index % 4 === 1
                          ? "#7c4dff"
                          : index % 4 === 2
                          ? "#ff4081"
                          : "#00e676",
                    }}
                  >
                    {renderIcon(amenity.icon)}
                  </div>
                  <div className="amenity-icon-backdrop"></div>
                </div>
                <div className="amenity-card-content">
                  <h3 className="amenity-title">
                    {typeof amenity.title === "object"
                      ? amenity.title[currentLang]
                      : amenity.title}
                  </h3>
                  <p className="amenity-description">
                    {typeof amenity.description === "object"
                      ? amenity.description[currentLang]
                      : amenity.description}
                  </p>
                  <div className="amenity-card-details">
                    {typeof amenity.details === "object"
                      ? amenity.details[currentLang]
                      : amenity.details}
                  </div>
                </div>
              </div>
              <div className="amenity-card-decorations">
                <div className="decoration-circle"></div>
                <div className="decoration-line"></div>
                <div className="decoration-dots"></div>
              </div>
              <div className="amenity-card-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Format price to VND
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Add capacity selection handler
  const handleCapacityChange = (homestayId, capacityIndex) => {
    const homestay = homestayData.find((h) => h.id === homestayId);
    if (homestay && homestay.capacityOptions) {
      const option = homestay.capacityOptions[capacityIndex];
      setSelectedCapacity({
        ...selectedCapacity,
        [homestayId]: {
          index: capacityIndex,
          price: option.price,
          capacity: option.capacity,
        },
      });

      // If this is the currently selected homestay, update its price
      if (selectedHomestay && selectedHomestay.id === homestayId) {
        setSelectedHomestay({
          ...selectedHomestay,
          price: option.price,
        });
      }
    }
  };

  // Modify the homestay card render to include capacity options
  const renderHomestayCard = (homestay) => (
    <div
      className="homestay-card modern"
      key={homestay.id}
      onClick={() => openDetailsSidebar(homestay)}
      style={{ cursor: "pointer" }}
    >
      <div className="homestay-card-image">
        <img
          src={getImageUrls(homestay.image)}
          alt={getLocalizedContent(homestay.title)}
          className="notranslate"
        />
        {(() => {
          const tags = homestay.tags;
          if (!tags) return null;

          const tagsToRender =
            typeof tags === "object" && !Array.isArray(tags)
              ? tags[currentLang] || []
              : tags;

          return (
            Array.isArray(tagsToRender) &&
            tagsToRender.map(
              (tag, index) =>
                index < 1 && (
                  <div
                    className="homestay-card-tag notranslate"
                    key={`${homestay.id}-tag-${index}`}
                  >
                    {tag}
                  </div>
                )
            )
          );
        })()}
      </div>
      <div className="homestay-card-content">
        <h3 className="homestay-card-title notranslate">
          {getLocalizedContent(homestay.title)}
        </h3>
        <p className="homestay-card-description notranslate">
          {getLocalizedContent(homestay.description)}
        </p>

        {/* Add highlights */}
        {homestay.amenities && (
          <div className="homestay-highlights">
            {getLocalizedContent(homestay.amenities).map((amenities, index) => (
              <div key={index} className="highlight-item">
                {React.createElement(amenities.icon, {
                  size: 20,
                  className: "highlight-icon",
                })}
                <span className="highlight-text notranslate">
                  {amenities.text}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Add capacity options */}
        {homestay.capacityOptions && (
          <div className="capacity-options">
            {homestay.capacityOptions.map((option, index) => (
              <div
                key={index}
                className={`capacity-option ${
                  selectedCapacity[homestay.id]?.index === index
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleCapacityChange(homestay.id, index)}
              >
                <div className="capacity-icon">
                  <i className="fas fa-user-friends"></i>
                </div>
                <div className="capacity-description">
                  {option.description[currentLang]}
                </div>
                <div className="capacity-price">
                  {option.originalPrice && option.discountPercentage ? (
                    <>
                      <div className="original-price">
                        <span className="original-price-value">
                          {formatPrice(option.originalPrice)}
                        </span>
                        <span className="discount-badge">
                          -{option.discountPercentage}%
                        </span>
                      </div>
                      <div className="final-price">
                        {formatPrice(option.price)}
                        <span className="price-unit">/ đêm</span>
                      </div>
                    </>
                  ) : (
                    <div className="final-price">
                      {formatPrice(option.price)}
                      <span className="price-unit">/ đêm</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="homestay-card-footer">
          {/* <div className="homestay-card-price">
            {homestay.capacityOptions[homestay.selectedCapacityIndex]
              .originalPrice &&
            homestay.capacityOptions[homestay.selectedCapacityIndex]
              .discountPercentage ? (
              <>
                <div className="original-price">
                  <span className="original-price-value">
                    {formatPrice(
                      homestay.capacityOptions[homestay.selectedCapacityIndex]
                        .originalPrice
                    )}
                  </span>
                  <span className="discount-badge">
                    -
                    {
                      homestay.capacityOptions[homestay.selectedCapacityIndex]
                        .discountPercentage
                    }
                    %
                  </span>
                </div>
                <div className="final-price">
                  {formatPrice(
                    homestay.capacityOptions[homestay.selectedCapacityIndex]
                      .price
                  )}
                </div>
              </>
            ) : (
              <div className="final-price">
                {formatPrice(
                  homestay.capacityOptions[homestay.selectedCapacityIndex].price
                )}
              </div>
            )}
            <span className="price-unit">/ đêm</span>
          </div> */}
          <div className="homestay-card-actions">
            <button
              className="btn-view"
              onClick={() => openDetailsSidebar(homestay)}
            >
              Xem chi tiết
            </button>
            <button
              className="btn-book"
              onClick={() => openBookingSidebar(homestay)}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Update the renderHomestaySection to use the new renderHomestayCard
  const renderHomestaySection = () => (
    <section
      className="homestay-section"
      id="homestay"
      ref={sectionRefs.homestay}
    >
      <div className="section-tag">LƯU TRÚ</div>

      {/* Decorative elements */}
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>
      <div className="decorative-square"></div>
      <div className="decorative-dot"></div>

      <div className="visitinfo-section-container">
        <div className="visitinfo-section-header">
          <h2 className="visitinfo-section-title modern">
            <span>
              TRẢI NGHIỆM CẢM GIÁC THĂNG HOA KHI SỐNG TRONG MỘT TÁC PHẨM NGHỆ
              THUẬT
            </span>
            <span className="title-accent"></span>
          </h2>
          <p className="visitinfo-section-description">
            🛏️ 16 căn phòng - là 16 mảnh cảm xúc của Đà Lạt: <br />
            <div className="room-feature">🌲 Sắc xanh Đồi Thông</div>
            <div className="room-feature">🌅 Ánh chiều Hoàng Hôn</div>
            <div className="room-feature">🌸 Nét dịu dàng của Oải Hương</div>
            <div className="room-feature">
              🚂 Hay Toa Xe Lửa cũ gợi Ký Ức xưa...
            </div>
            <div className="room-feature">
              RedPine là nơi lý tưởng để bạn trốn khỏi nhịp sống và sạc lại năng
              lượng.
            </div>
          </p>
        </div>

        <div className="homestay-categories-wrapper">
          <div
            className="homestay-categories"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "50px",
              justifyContent: "flex-start",
            }}
          >
            <div
              className={`homestay-category ${
                activeCategory === "all" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              Tất cả lựa chọn
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "popular" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("popular")}
            >
              Phổ biến
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "top-rated" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("top-rated")}
            >
              Đánh giá cao
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "breakfast-included" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("breakfast-included")}
            >
              Phục vụ bữa sáng
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "recommended" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("recommended")}
            >
              Đề xuất
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "budget-friendly" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("budget-friendly")}
            >
              Giá tốt
            </div>
          </div>
        </div>

        <div className="homestay-grid modern">
          {filteredHomestays.map((homestay) => renderHomestayCard(homestay))}
        </div>
      </div>
    </section>
  );

  // Render FAQ Section
  const renderFAQSection = () => (
    <section className="faq-section" id="faq" ref={sectionRefs.faq}>
      <div className="faq-container">
        <div className="faq-header">
          <h2 className="faq-title">
            <span>
              {currentLang === "en"
                ? "Frequently Asked Questions"
                : "Câu hỏi thường gặp"}
            </span>
          </h2>
          <p className="faq-subtitle">
            {currentLang === "en"
              ? "Answers from Musée Du Pin"
              : "Câu trả lời từ Bảo tàng Thông"}
          </p>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => {
            // Get the correct language version of question and answer
            const question =
              typeof faq.question === "string"
                ? faq.question
                : faq.question[currentLang];
            const answer =
              typeof faq.answer === "string"
                ? faq.answer
                : faq.answer[currentLang];

            return (
              <div
                className={`faq-item ${activeFaq === index ? "active" : ""}`}
                key={index}
                style={{ "--animation-order": index }}
              >
                <div className="faq-highlight"></div>
                <div className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{question}</span>
                </div>
                <div className="faq-answer">
                  <p>{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );

  // Render Homestay Details Sidebar
  const renderHomestayDetailsSidebar = () => {
    if (!selectedHomestay || !showDetailsSidebar) return null;

    const gallery = selectedHomestay.gallery || [];

    // Helper function to get localized content
    const getLocalizedContent = (field) => {
      if (typeof field === "object") {
        return field[currentLang] || field.en; // Fallback to English if current language not found
      }
      return field;
    };

    return (
      <div
        className={`homestay-details-sidebar ${
          showDetailsSidebar ? "open" : ""
        }`}
        ref={detailsSidebarRef}
      >
        <div className="details-sidebar-header">
          <button className="close-sidebar" onClick={closeDetailsSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="notranslate">
            {getLocalizedContent(selectedHomestay.title)}
          </h2>
          <div style={{ width: "32px" }}></div>
        </div>

        <div className="details-sidebar-content">
          <div className="homestay-gallery">
            <div className="gallery-main" onClick={() => openGalleryModal(0)}>
              <img
                src={getImageUrls(gallery[0] || selectedHomestay.image)}
                alt={selectedHomestay.title}
              />
              <div className="gallery-zoom-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="gallery-thumbnails">
              {gallery.map((img, index) => (
                <div
                  className={`gallery-thumbnail ${
                    activeImageIndex === index ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setActiveImageIndex(index);
                    openGalleryModal(index);
                  }}
                >
                  <img
                    src={getImageUrls(img)}
                    alt={`${selectedHomestay.title} - hình ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="homestay-details-info">
            <p className="homestay-details-description">
              {getLocalizedContent(selectedHomestay.description)}
            </p>

            {/* Highlights */}
            {selectedHomestay.highlights && (
              <div className="homestay-details-highlights">
                <h3>Điểm nổi bật</h3>
                <div className="highlights-grid">
                  {getLocalizedContent(selectedHomestay.highlights).map(
                    (highlight, index) => (
                      <div key={index} className="highlight-item">
                        <img
                          src={highlight.icon}
                          alt={highlight.text}
                          className="highlight-icon"
                        />
                        <span className="highlight-text notranslate">
                          {highlight.text}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Capacity Options */}
            {selectedHomestay.capacityOptions && (
              <div className="capacity-options">
                {selectedHomestay.capacityOptions.map((option, index) => (
                  <div
                    key={index}
                    className={`capacity-option ${
                      selectedCapacity[selectedHomestay.id]?.index === index
                        ? "selected"
                        : ""
                    }`}
                    onClick={() =>
                      handleCapacityChange(selectedHomestay.id, index)
                    }
                  >
                    <div className="capacity-icon">
                      <i className="fas fa-user-friends"></i>
                    </div>
                    <div className="capacity-description">
                      {option.description[currentLang]}
                    </div>
                    <div className="capacity-price">
                      {option.originalPrice && option.discountPercentage ? (
                        <>
                          <div className="original-price">
                            <span className="original-price-value">
                              {formatPrice(option.originalPrice)}
                            </span>
                            <span className="discount-badge">
                              -{option.discountPercentage}%
                            </span>
                          </div>
                          <div className="final-price">
                            {formatPrice(option.price)}
                          </div>
                        </>
                      ) : (
                        <div className="final-price">
                          {formatPrice(option.price)}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="homestay-details-section">
              <h3>Tiện nghi</h3>
              <ul className="amenities-list">
                {(Array.isArray(selectedHomestay.amenities)
                  ? selectedHomestay.amenities
                  : getLocalizedContent(selectedHomestay.amenities)
                ).map((amenity, index) => (
                  <li key={index}>
                    {React.createElement(amenity.icon, {
                      size: 14,
                      className: "amenity-icon",
                    })}
                    {amenity.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="homestay-details-section">
              <h3>Nội quy</h3>
              <ul className="rules-list">
                {(Array.isArray(selectedHomestay.rules)
                  ? selectedHomestay.rules
                  : getLocalizedContent(selectedHomestay.rules)
                ).map((rule, index) => (
                  <li key={index}>{rule}</li>
                ))}
              </ul>
            </div>

            <div className="homestay-details-section">
              <h3>Chính sách hủy phòng</h3>
              <p>{getLocalizedContent(selectedHomestay.cancellation)}</p>
            </div>
          </div>

          <div className="homestay-booking-card">
            <div className="booking-card-price">
              <span className="price-value">
                {formatPrice(
                  selectedCapacity[selectedHomestay.id]?.price ||
                    selectedHomestay.price
                )}
              </span>
              <span className="price-unit">mỗi đêm</span>
            </div>
            <button
              className="btn-book-now"
              onClick={() => openBookingSidebar(selectedHomestay)}
            >
              Đặt ngay
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Booking Sidebar
  const renderBookingSidebar = () => {
    if (!selectedHomestay) return null;

    // Get the current price based on capacity selection
    const currentPrice =
      selectedCapacity[selectedHomestay.id]?.price || selectedHomestay.price;

    return (
      <div
        className={`booking-sidebar ${showBookingSidebar ? "open" : ""}`}
        ref={bookingSidebarRef}
      >
        <div className="booking-sidebar-header modern">
          <button className="close-sidebar" onClick={closeBookingSidebar}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2>Đặt phòng</h2>
          <div></div>
        </div>

        <div className="booking-sidebar-content">
          {isSubmitting && (
            <div
              className="sending-status"
              role="progressbar"
              aria-label="Đang gửi thông tin đặt phòng"
            ></div>
          )}

          <div className="booking-homestay-info modern">
            <img
              src={getImageUrls(selectedHomestay.image)}
              alt={getLocalizedContent(selectedHomestay.title)}
            />
            <div>
              <h3>{getLocalizedContent(selectedHomestay.title)}</h3>
              <div className="booking-homestay-location">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="currentColor"
                  />
                </svg>
                <span>{selectedHomestay.location}</span>
              </div>
              <div className="booking-homestay-price">
                <span className="price-value">{formatPrice(currentPrice)}</span>
                <span className="price-unit">mỗi đêm</span>
              </div>
            </div>
          </div>

          <form className="booking-form modern" onSubmit={handleBookingSubmit}>
            {updateBookingForm()}

            <div className={`form-group ${formErrors.name ? "has-error" : ""}`}>
              <label htmlFor="name">Họ và tên</label>
              <input
                type="text"
                id="name"
                name="name"
                value={bookingFormData.name}
                onChange={handleBookingInputChange}
                placeholder="Nhập họ và tên của bạn"
              />
              {formErrors.name && (
                <div className="error-message">{formErrors.name}</div>
              )}
            </div>

            <div
              className={`form-group ${formErrors.email ? "has-error" : ""}`}
            >
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={bookingFormData.email}
                onChange={handleBookingInputChange}
                placeholder="Nhập địa chỉ email của bạn"
              />
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
            </div>

            <div
              className={`form-group ${formErrors.phone ? "has-error" : ""}`}
            >
              <label htmlFor="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={bookingFormData.phone}
                onChange={handleBookingInputChange}
                placeholder="Nhận số điện thoại của bạn"
              />
              {formErrors.phone && (
                <div className="error-message">{formErrors.phone}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">Yêu cầu</label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={bookingFormData.specialRequests}
                onChange={handleBookingInputChange}
                placeholder="Bạn có yêu cầu hoặc yêu cầu đặc biệt nào không?"
                rows="3"
              ></textarea>
            </div>

            <div className="booking-summary modern">
              <div className="summary-row">
                <span>Giá mỗi đêm</span>
                <span>{formatPrice(currentPrice)}</span>
              </div>

              {bookingFormData.checkIn && bookingFormData.checkOut && (
                <>
                  <div className="summary-row">
                    <span>Số đêm</span>
                    <span>
                      {Math.max(
                        1,
                        Math.ceil(
                          (new Date(bookingFormData.checkOut) -
                            new Date(bookingFormData.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        )
                      )}
                    </span>
                  </div>

                  <div className="summary-row total">
                    <span>Tổng cộng</span>
                    <span>
                      {formatPrice(
                        currentPrice *
                          Math.max(
                            1,
                            Math.ceil(
                              (new Date(bookingFormData.checkOut) -
                                new Date(bookingFormData.checkIn)) /
                                (1000 * 60 * 60 * 24)
                            )
                          )
                      )}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="btn-submit-booking modern"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>Đang xử lý...</span>
                </>
              ) : (
                "Hoàn tất đặt phòng"
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Render Success Modal
  const renderSuccessModal = () => {
    if (!successBookingData || !showSuccessModal) return null;

    // Use the saved data from successBookingData instead of recalculating
    const totalPrice = successBookingData.totalPrice || 0;

    return (
      <div
        className={`booking-success-modal ${showSuccessModal ? "open" : ""}`}
      >
        <div className="success-modal-content">
          <div className="success-icon">
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                fill="#fff"
              />
            </svg>
          </div>

          <h2 className="success-title">Đặt phòng thành công!</h2>

          <div className="success-animation">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 10 + 6}px`,
                  background: `${
                    ["#1e3a8a", "#2563eb", "#3b82f6", "#bfdbfe", "#f8fafc"][
                      Math.floor(Math.random() * 5)
                    ]
                  }`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random(),
                  animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              ></div>
            ))}
          </div>

          <p className="success-message">
            Cảm ơn bạn đã đặt phòng. Chúng tôi đã gửi xác nhận đến email của
            bạn. Bộ phận chăm sóc khách hàng sẽ sớm liên hệ với bạn để cung cấp
            thêm thông tin chi tiết.
          </p>

          <div className="success-details">
            <div className="success-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
              <span>Chủ sỡ hữu: {successBookingData.host}</span>
            </div>

            <div className="success-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <span>{successBookingData.location}</span>
            </div>

            <div className="success-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"
                  fill="currentColor"
                />
              </svg>
              <span>
                {new Date(successBookingData.checkIn).toLocaleDateString()} -{" "}
                {new Date(successBookingData.checkOut).toLocaleDateString()}
                <span className="booking-nights">
                  ({successBookingData.nights} đêm)
                </span>
              </span>
            </div>

            <div className="success-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  fill="currentColor"
                />
              </svg>
              <span>
                Tổng: <span className="total-price">${totalPrice}</span>
              </span>
            </div>
          </div>

          <button className="btn-close-success" onClick={closeSuccessModal}>
            Đóng
          </button>
        </div>
      </div>
    );
  };

  // Helper function to render icons
  const renderIcon = (icon) => {
    const commonAttributes = {
      width: isMobile ? "30" : "32",
      height: isMobile ? "30" : "32",
      fill: "none",
      stroke: "#00d1b2",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    switch (icon) {
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case "hanger":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
            <path d="M12 8v3l-8 9h16l-8-9V8"></path>
          </svg>
        );
      case "stroller":
        return (
          <PiMotorcycleBold size={isMobile ? 28 : 32} color="currentColor" />
        );

      case "wifi":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        );
      case "toilet":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M6 4h12v4H6z"></path>
            <path d="M6 8h12v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"></path>
            <path d="M10 8v8"></path>
            <path d="M14 8v8"></path>
          </svg>
        );
      case "parking":
        return <FaCar size={isMobile ? 28 : 32} color="currentColor" />;
      case "help":
        return <FaSearch size={isMobile ? 28 : 32} color="currentColor" />;
      case "store":
        return <FaShop size={isMobile ? 28 : 32} color="currentColor" />;
      case "amenities":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
      case "homestay":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
          </svg>
        );
      case "faq":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  // Add keyframes for animations
  useEffect(() => {
    // Create style element for animations
    const styleEl = document.createElement("style");

    // Add keyframes
    styleEl.innerHTML = `
      @keyframes modalFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes fall {
        0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(1000px) rotate(360deg); opacity: 0; }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    document.head.appendChild(styleEl);

    return () => {
      styleEl.remove();
    };
  }, []);

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Open gallery modal
  const openGalleryModal = (index) => {
    setActiveImageIndex(index);
    setShowGalleryModal(true);
  };

  // Update booking form
  const updateBookingForm = () => {
    return (
      <div className="booking-form-fields">
        <div className="form-group">
          <label htmlFor="checkIn">Ngày nhận phòng</label>
          <input
            type="date"
            id="checkIn"
            name="checkIn"
            value={bookingFormData.checkIn}
            onChange={handleBookingInputChange}
            min={new Date().toISOString().split("T")[0]}
          />
          {formErrors.checkIn && (
            <div className="error-message">{formErrors.checkIn}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="checkOut">Ngày trả phòng</label>
          <input
            type="date"
            id="checkOut"
            name="checkOut"
            value={bookingFormData.checkOut}
            onChange={handleBookingInputChange}
            min={
              bookingFormData.checkIn || new Date().toISOString().split("T")[0]
            }
          />
          {formErrors.checkOut && (
            <div className="error-message">{formErrors.checkOut}</div>
          )}
        </div>
      </div>
    );
  };

  // Render Gallery Modal
  const renderGalleryModal = () => {
    if (!showGalleryModal || !selectedHomestay) return null;

    const gallery = selectedHomestay.gallery || [];

    const handlePrevImage = () => {
      setActiveImageIndex((prev) =>
        prev === 0 ? gallery.length - 1 : prev - 1
      );
    };

    const handleNextImage = () => {
      setActiveImageIndex((prev) =>
        prev === gallery.length - 1 ? 0 : prev + 1
      );
    };

    return (
      <div className={`gallery-modal ${showGalleryModal ? "open" : ""}`}>
        <button
          className="gallery-close-btn"
          onClick={() => setShowGalleryModal(false)}
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="gallery-image-container">
          <button className="gallery-nav-btn prev" onClick={handlePrevImage}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <img
            src={getImageUrls(gallery[activeImageIndex])}
            alt={`${selectedHomestay.title} - hình ${activeImageIndex + 1}`}
          />

          <button className="gallery-nav-btn next" onClick={handleNextImage}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="gallery-thumbnails-row">
          {gallery.map((img, index) => (
            <div
              key={index}
              className={`gallery-thumbnail ${
                activeImageIndex === index ? "active" : ""
              }`}
              onClick={() => setActiveImageIndex(index)}
            >
              <img
                src={getImageUrls(img)}
                alt={`${selectedHomestay.title} - thumbnail ${index + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="gallery-counter">
          {activeImageIndex + 1} / {gallery.length}
        </div>
      </div>
    );
  };

  // Add renderMobileBottomNav function
  const renderMobileBottomNav = () => {
    if (!isMobile) return null;

    return (
      <nav className="mobile-bottom-nav">
        <ul className="mobile-nav-list">
          <li
            className={`mobile-button-item ${
              activeSection === "amenities" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("amenities")}
              className="mobile-nav-button"
            >
              <div className="mobile-nav-icon">{renderIcon("amenities")}</div>
              <span className="mobile-nav-label">Tiện ích</span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "homestay" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("homestay")}
              className="mobile-nav-button"
            >
              <div className="mobile-nav-icon">{renderIcon("homestay")}</div>
              <span className="mobile-nav-label">Lưu trú</span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "faq" ? "active" : ""
            }`}
          >
            <button
              onClick={() => scrollToSection("faq")}
              className="mobile-nav-button"
            >
              <div className="mobile-nav-icon">{renderIcon("faq")}</div>
              <span className="mobile-nav-label">Hỏi đáp</span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  return (
    <div className="visitinfo-container">
      {renderHero()}
      {renderNavigationBar()}
      {renderAmenitiesSection()}
      {renderHomestaySection()}
      {renderFAQSection()}
      {renderHomestayDetailsSidebar()}
      {renderBookingSidebar()}
      {renderSuccessModal()}
      {renderGalleryModal()}
      {renderMobileBottomNav()}
    </div>
  );
};

export default VisitInfo;
