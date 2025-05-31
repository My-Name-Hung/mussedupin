import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TranslatedText from "../../TranslatedText";
import "./VisitInfo.css";

// Images - we'll import placeholder images from assets
import cloakroomImg from "../../../assets/home/Collections/congchien_cards.webp";
import equipmentImg from "../../../assets/home/Collections/DanT'rung_cards.webp";
import babySpaceImg from "../../../assets/home/Collections/Lehoi_cards.webp";
import wifiImg from "../../../assets/home/Collections/LongDaDa_cards.webp";
import toiletsImg from "../../../assets/home/Collections/noidat_cards.webp";
import parkingImg from "../../../assets/home/Collections/phunu_cards.webp";
import heroImage from "../../../assets/home/Hero/louvre-sunset.webp";

// Homestay images
import modernImg from "../../../assets/home/Collections/congchien_cards.webp";
import luxuryImg from "../../../assets/home/Collections/DanT'rung_cards.webp";
import budgetImg from "../../../assets/home/Collections/Gui_cards.webp";
import traditionalImg from "../../../assets/home/Collections/Lehoi_cards.webp";

// Additional homestay images for galleries
import room4 from "../../../assets/home/Collections/Bauholo_cards.webp";
import room1 from "../../../assets/home/Collections/LongDaDa_cards.webp";
import room2 from "../../../assets/home/Collections/noidat_cards.webp";
import room3 from "../../../assets/home/Collections/phunu_cards.webp";

import { FaBaby, FaCar, FaSearch } from "react-icons/fa";

// Remove all import lines for images
import { useAssets } from "../../../hooks/useAssets";

const VisitInfo = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("amenities");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const lastScrollTop = useRef(0);
  const scrollTimeout = useRef(null);

  const { assets, getAssetUrl } = useAssets();

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
    guests: 1,
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

  const sectionRefs = {
    amenities: useRef(null),
    homestay: useRef(null),
    faq: useRef(null),
  };

  const navRef = useRef(null);
  const heroRef = useRef(null);
  const horizontalNavRef = useRef(null);
  const detailsSidebarRef = useRef(null);
  const bookingSidebarRef = useRef(null);

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

  // Enhanced handleScroll to track scroll direction for hiding navbar
  const handleScroll = useCallback(() => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
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

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      // Handle scroll end
    }, 150);
  }, []);

  // Update useEffect to use our enhanced scroll handler
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [handleScroll]);

  // Filter homestays when category changes
  useEffect(() => {
    filterHomestays(activeCategory);
  }, [activeCategory]);

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

  // Handle touch events for horizontal nav scrolling on mobile
  const handleNavTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleNavTouchMove = (e) => {
    if (!horizontalNavRef.current) return;

    const touchX = e.touches[0].clientX;
    const diff = touchStartX - touchX;
    const scrollLeft = horizontalNavRef.current.scrollLeft;

    if (diff > 5) {
      // Scrolling right
      setNavScrolled(true);
    } else if (diff < -5 && scrollLeft === 0) {
      // Scrolling left and at the beginning
      setNavScrolled(false);
    }
  };

  // Open details sidebar for a homestay
  const openDetailsSidebar = (homestay) => {
    setSelectedHomestay(homestay);
    setShowDetailsSidebar(true);

    // Make sure booking sidebar is closed
    setShowBookingSidebar(false);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    // Add a small delay to ensure the sidebar is rendered with the selected homestay
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

  // Open booking sidebar for a homestay
  const openBookingSidebar = (homestay) => {
    setSelectedHomestay(homestay);
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

    if (!bookingFormData.guests || bookingFormData.guests < 1) {
      errors.guests = "Vui lòng chọn ít nhất 1 khách";
    }

    return errors;
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data for submission
      const formattedData = {
        homestay: selectedHomestay?.title,
        price: selectedHomestay?.price,
        location: selectedHomestay?.location,
        host: selectedHomestay?.host,
        checkIn: bookingFormData.checkIn,
        checkOut: bookingFormData.checkOut,
        selectedTime: selectedTime,
        nights: Math.max(
          1,
          Math.ceil(
            (new Date(bookingFormData.checkOut) -
              new Date(bookingFormData.checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        ),
        totalPrice:
          selectedHomestay?.price *
          Math.max(
            1,
            Math.ceil(
              (new Date(bookingFormData.checkOut) -
                new Date(bookingFormData.checkIn)) /
                (1000 * 60 * 60 * 24)
            )
          ),
        ...bookingFormData,
        date: new Date().toISOString(),
      };

      // Save the booking data before reset
      setSuccessBookingData(formattedData);

      // Try to save to booking server
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

        console.log(
          "Đã lưu đặt phòng lên máy chủ:",
          await serverResponse.json()
        );
      } catch (serverError) {
        console.error("Không thể lưu lên máy chủ đặt phòng:", serverError);
      }

      // Show success modal even if server call fails (for demonstration purposes)
      setShowBookingSidebar(false);
      setShowSuccessModal(true);

      // Reset form data
      setBookingFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
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
      description: "Hai quầy thông tin...",
      image: "Bauholo_cards.webp",
      icon: "info",
      details: "Nhân viên đa ngôn ngữ làm việc từ 9:00 đến 19:00 hàng ngày.",
    },
    {
      id: "cloakroom",
      title: "Phòng gửi đồ",
      description:
        "Tủ khóa tự phục vụ miễn phí dưới Tháp. Khách tham quan nên sử dụng tủ khóa tại lối vào. Tất cả các vật dụng gửi trong tủ khóa phải được lấy lại trong cùng ngày.",
      image: cloakroomImg,
      icon: "hanger",
      details:
        "Gửi miễn phí cho túi có kích thước tối đa 55×35×20 cm. Không nhận vật dụng lớn hơn.",
    },
    {
      id: "equipment",
      title: "Cho mượn thiết bị",
      description:
        "Gậy chống, ghế xếp, xe đẩy trẻ em, địu em bé, ghế đa năng có bánh xe và xe lăn được cung cấp miễn phí tại khu vực tiếp đón khách dưới Tháp.",
      image: equipmentImg,
      icon: "stroller",
      details: "Liên hệ quầy hỗ trợ để biết thêm thông tin",
    },
    {
      id: "wifi",
      title: "Wi-Fi Miễn phí",
      description:
        "Mạng 'Musée Du Pin' có sẵn dưới Tháp và trong các phòng trưng bày. Kết nối Wi-Fi miễn phí có giới hạn một giờ và có thể được gia hạn nhiều lần theo nhu cầu.",
      image: wifiImg,
      icon: "wifi",
      details: "Tốc độ kết nối: 50 Mbps",
    },
    {
      id: "toilets",
      title: "Nhà vệ sinh",
      description:
        "Nhà vệ sinh có thể được tìm thấy tại khu vực đón tiếp dưới Tháp và khắp bảo tàng. Có bàn thay tã cho em bé.",
      image: toiletsImg,
      icon: "toilet",
      details: "Tất cả nhà vệ sinh đều tiếp cận được cho người khuyết tật",
    },
    {
      id: "car-park",
      title: "Bãi đậu xe",
      description:
        "Bãi đậu xe ngầm nằm tại số 1 Đại lộ Général Lemonnier, từ đó bạn có thể vào bảo tàng qua lối vào Carrousel. Mở cửa 7 ngày một tuần từ 7:00 đến 23:00.",
      image: parkingImg,
      icon: "parking",
      details:
        "Khách tham quan khuyết tật được hưởng giá đậu xe ưu đãi. Giá này có thể được thương lượng tại quầy thanh toán trước khi trả tiền.",
    },
    {
      id: "baby-space",
      title: "Khu vực cho em bé",
      description:
        "Studio – khu vực đặc biệt được thiết kế dành cho gia đình, nằm ở tầng trệt của cánh Richelieu – có khu vực dành cho em bé được trang bị máy hâm sữa, lò vi sóng và ghế cho con bú.",
      image: babySpaceImg,
      icon: "baby",
      details: "Mọi thứ bạn cần cho sự thoải mái và chăm sóc em bé",
    },
  ];

  // Homestay data with expanded information for detailed view
  const homestayData = [
    {
      id: "traditional",
      title: "Nhà nghỉ truyền thống",
      description: "Nhà ở địa phương đích thực...",
      image: "Lehoi_cards.webp",
      price: 2800000,
      rating: 4.8,
      tags: ["Đề xuất", "Truyền thống", "Bao gồm bữa sáng"],
      category: ["popular", "recommended"],
      location: "Cách bảo tàng 5 phút đi bộ",
      host: "Musée Du Pin",
      roomType: "Phòng riêng trong nhà truyền thống",
      beds: "1 giường đôi",
      amenities: [
        "Wi-Fi miễn phí",
        "Bao gồm bữa sáng",
        "Điều hòa nhiệt độ",
        "Vườn",
        "Phòng tắm riêng",
      ],
      rules: ["Không hút thuốc", "Không thú cưng", "Không tổ chức tiệc"],
      cancellation: "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
      gallery: [traditionalImg, room1, room2, room3],
      reviews: [
        {
          author: "Jean-Pierre",
          rating: 5,
          comment: "Trải nghiệm truyền thống tuyệt vời với bữa sáng ngon!",
        },
        {
          author: "Sarah",
          rating: 4.5,
          comment: "Ngôi nhà đẹp và chủ nhà rất thân thiện. Rất đáng để ở.",
        },
      ],
    },
    {
      id: "modern",
      title: "Căn hộ hiện đại",
      description:
        "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
      image: modernImg,
      price: 4200000,
      rating: 4.9,
      tags: ["Đánh giá cao", "Sang trọng", "Vị trí trung tâm"],
      category: ["popular", "top-rated"],
      location: "Cách bảo tàng 10 phút đi bộ",
      host: "Musée Du Pin",
      roomType: "Toàn bộ căn hộ",
      beds: "1 giường king, 1 giường sofa",
      amenities: [
        "Wi-Fi miễn phí",
        "Bếp đầy đủ",
        "Máy giặt/sấy",
        "TV thông minh",
        "Thang máy",
        "View thành phố",
      ],
      rules: ["Không hút thuốc", "Cho phép thú cưng", "Không tổ chức tiệc"],
      cancellation: "Hủy miễn phí đến 24 giờ trước khi nhận phòng",
      gallery: [modernImg, room4, room1, room2],
      reviews: [
        {
          author: "Lisa",
          rating: 5,
          comment: "Căn hộ đẹp với view tuyệt vời! Rất sạch sẽ và hiện đại.",
        },
        {
          author: "David",
          rating: 4.8,
          comment: "Vị trí tuyệt vời và trang bị đầy đủ. Sẽ quay lại!",
        },
      ],
    },
    {
      id: "luxury",
      title: "Biệt thự sang trọng",
      description:
        "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
      image: luxuryImg,
      price: 8200000,
      rating: 5.0,
      tags: ["Cao cấp", "Riêng tư", "Dịch vụ đầy đủ"],
      category: ["top-rated", "luxury"],
      location: "Cách bảo tàng 15 phút lái xe",
      host: "Musée Du Pin",
      roomType: "Toàn bộ biệt thự",
      beds: "2 giường king, 1 giường queen",
      amenities: [
        "Wi-Fi miễn phí",
        "Hồ bơi",
        "Bếp đầy đủ",
        "Vườn",
        "Bãi đậu xe",
        "Dịch vụ dọn phòng hàng ngày",
        "Lễ tân",
      ],
      rules: [
        "Không hút thuốc trong nhà",
        "Không thú cưng",
        "Cho phép tổ chức sự kiện với sự đồng ý trước",
      ],
      cancellation: "Hủy miễn phí đến 7 ngày trước khi nhận phòng",
      gallery: [luxuryImg, room3, room4, room2],
      reviews: [
        {
          author: "James",
          rating: 5,
          comment: "Sang trọng tuyệt đối! Biệt thự vượt quá mong đợi.",
        },
        {
          author: "Sophia",
          rating: 5,
          comment:
            "Dịch vụ xuất sắc và cơ sở vật chất tuyệt vời. Xứng đáng với giá tiền!",
        },
      ],
    },
    {
      id: "budget",
      title: "Phòng giá rẻ",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
      image: budgetImg,
      price: 1750000,
      rating: 4.5,
      tags: ["Giá tốt", "Thuận tiện", "Đáng giá"],
      category: ["recommended", "budget-friendly"],
      location: "Cách bảo tàng 20 phút đi tàu điện ngầm",
      host: "Musée Du Pin",
      roomType: "Phòng riêng trong căn hộ chung",
      beds: "1 giường đôi",
      amenities: [
        "Wi-Fi miễn phí",
        "Phòng tắm chung",
        "Bếp chung",
        "Máy giặt",
        "Gần ga tàu điện ngầm",
      ],
      rules: ["Không hút thuốc", "Không thú cưng", "Yên tĩnh sau 22:00"],
      cancellation: "Hủy miễn phí đến 24 giờ trước khi nhận phòng",
      gallery: [budgetImg, room1, room3, room4],
      reviews: [
        {
          author: "Michael",
          rating: 4.3,
          comment: "Giá trị tuyệt vời và vị trí thuận tiện gần tàu điện ngầm.",
        },
        {
          author: "Anna",
          rating: 4.7,
          comment:
            "Phòng sạch sẽ và thoải mái. Claire là một chủ nhà rất nhiệt tình!",
        },
      ],
    },
  ];

  // FAQ data with more detailed answers
  const faqData = [
    {
      question:
        "Tôi có thể tham quan bảo tàng miễn phí không? Tôi có cần đặt vé không?",
      answer:
        "Bảo tàng miễn phí vé vào cửa cho một số đối tượng bao gồm người dưới 18 tuổi, cư dân EU dưới 26 tuổi và khách tham quan khuyết tật cùng người đi kèm. Vào cửa miễn phí cũng được áp dụng cho tất cả mọi người vào thứ Sáu đầu tiên của mỗi tháng từ 18:00 (trừ tháng 7 và tháng 8). Chúng tôi khuyến nghị đặt khung giờ trước, kể cả đối với khách được miễn phí vé, đặc biệt là trong mùa cao điểm.",
    },
    {
      question: "Làm thế nào để mua vé ưu đãi?",
      answer:
        "Vé ưu đãi dành cho thanh niên từ 18-25 tuổi đến từ các nước ngoài EU, người có Thẻ Giáo dục, và thành viên của các tổ chức đối tác. Bạn phải xuất trình CMND/CCCD hợp lệ hoặc thẻ thành viên tại cổng vào. Vé ưu đãi có thể được mua trực tuyến hoặc tại quầy vé.",
    },
    {
      question: "Tôi có thể được hoàn tiền không?",
      answer:
        "Vé không được hoàn tiền sau khi mua. Tuy nhiên, trong trường hợp bảo tàng đóng cửa vì lý do đặc biệt, chúng tôi sẽ hoàn tiền hoặc đổi ngày khác. Đối với các trường hợp đặc biệt, vui lòng liên hệ dịch vụ khách tham quan tại visitor@museedupin.com kèm mã đặt chỗ và lý do yêu cầu hoàn tiền.",
    },
    {
      question: "Tôi sử dụng lối vào nào nếu đã mua vé trực tuyến?",
      answer:
        "Khách có vé điện tử có thể vào qua lối vào Tháp (lối vào chính) hoặc lối vào Porte des Lions. Lối vào Carrousel dành cho các đoàn và người có thẻ bảo tàng. Vé điện tử của bạn có mã QR sẽ được quét tại lối vào. Chúng tôi khuyến nghị đến trước 15 phút so với khung giờ đã đặt.",
    },
    {
      question: "Có cho phép xe đẩy em bé vào bảo tàng không?",
      answer:
        "Có, xe đẩy và nôi em bé được phép vào bảo tàng. Tuy nhiên, trong thời điểm đông khách, bạn có thể được yêu cầu gửi xe đẩy lớn tại phòng gửi đồ và sử dụng địu em bé thay thế, được cung cấp miễn phí. Tất cả các phòng trưng bày và không gian triển lãm đều có thể tiếp cận bằng xe đẩy thông qua thang máy.",
    },
    {
      question: "Những vật dụng nào không được phép mang vào bảo tàng?",
      answer:
        "Các vật dụng không được phép mang vào bảo tàng bao gồm túi xách và vali lớn (kích thước lớn hơn 55×35×20 cm), giá ba chân, gậy selfie, thiết bị chụp ảnh có đèn flash, đồ ăn thức uống (trừ chai nước), và các vật sắc nhọn. Những vật dụng này phải được gửi tại phòng gửi đồ. Chúng tôi cũng cấm chạm vào tác phẩm nghệ thuật, hút thuốc, và sử dụng điện thoại di động trong phòng trưng bày.",
    },
  ];

  // Map amenitiesData and homestayData to use asset URLs
  const amenitiesDataWithAssets = amenitiesData.map((item) => {
    const asset = assets.find(
      (a) => a.filename && item.image.includes(a.filename)
    );
    return asset ? { ...item, image: getAssetUrl(asset.filename) } : item;
  });

  // Render Hero Section
  const renderHero = () => (
    <div className="visitinfo-hero" ref={heroRef}>
      <div className="visitinfo-hero-image-container">
        <img
          src={heroImage}
          alt="Nội thất bảo tàng"
          className="visitinfo-hero-image"
        />
      </div>
      <div className="visitinfo-hero-overlay"></div>
      <div className="visitinfo-hero-content">
        <h1 className="visitinfo-hero-title">
          <TranslatedText>TIỆN ÍCH CHO KHÁCH THAM QUAN</TranslatedText>
        </h1>
        <p className="visitinfo-hero-subtitle">
          <TranslatedText>
            Mọi thứ bạn cần cho một chuyến tham quan thoải mái
          </TranslatedText>
        </p>
      </div>
    </div>
  );

  // Render Navigation Bar
  const renderNavigationBar = () => {
    // Don't render the navigation bar on mobile
    if (isMobile) return null;

    return (
      <>
        <div
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
                  <TranslatedText>Tiện ích</TranslatedText>
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
                  <TranslatedText>Lưu trú</TranslatedText>
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
                  <TranslatedText>Hỏi đáp</TranslatedText>
                </button>
                <span className="visitinfo-nav-indicator"></span>
              </li>
            </ul>
          </div>
        </div>
      </>
    );
  };

  // Function to create ripple effect on touch
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
            <span>
              <TranslatedText>Tiện nghi và thoải mái</TranslatedText>
            </span>
            <span className="title-underline"></span>
          </h2>
          <p className="visitinfo-section-description">
            <TranslatedText>
              Bảo tàng cung cấp nhiều dịch vụ để đảm bảo điều kiện tham quan tốt
              nhất. Nhân viên luôn sẵn sàng trong bảo tàng để cung cấp thông tin
              cập nhật về bảo tàng và các hoạt động.
            </TranslatedText>
          </p>
        </div>

        <div className="amenities-container">
          {amenitiesDataWithAssets.map((amenity, index) => (
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
                    <TranslatedText>{amenity.title}</TranslatedText>
                  </h3>
                  <p className="amenity-description">
                    <TranslatedText>{amenity.description}</TranslatedText>
                  </p>
                  <div className="amenity-card-details">
                    <TranslatedText>{amenity.details}</TranslatedText>
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

  // Render Homestay Section
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
              <TranslatedText>
                Trải nghiệm cuộc sống địa phương gần bảo tàng
              </TranslatedText>
            </span>
            <span className="title-accent"></span>
          </h2>
          <p className="visitinfo-section-description">
            <TranslatedText>
              Hòa mình vào văn hóa địa phương với các lựa chọn lưu trú được chọn
              lọc kỹ càng gần bảo tàng. Trải nghiệm sự hiếu khách đích thực
              trong những không gian được thiết kế nghệ thuật.
            </TranslatedText>
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
              <TranslatedText>Tất cả lựa chọn</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "popular" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("popular")}
            >
              <TranslatedText>Phổ biến</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "top-rated" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("top-rated")}
            >
              <TranslatedText>Đánh giá cao</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "recommended" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("recommended")}
            >
              <TranslatedText>Đề xuất</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "budget-friendly" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("budget-friendly")}
            >
              <TranslatedText>Giá tốt</TranslatedText>
            </div>
          </div>
        </div>

        <div className="homestay-grid modern">
          {filteredHomestays.map((homestay) => (
            <div className="homestay-card modern" key={homestay.id}>
              <div className="homestay-card-image">
                <img src={homestay.image} alt={homestay.title} />
                {homestay.tags.map(
                  (tag, index) =>
                    index < 1 && (
                      <div className="homestay-card-tag" key={index}>
                        <TranslatedText>{tag}</TranslatedText>
                      </div>
                    )
                )}
              </div>
              <div className="homestay-card-content">
                <h3 className="homestay-card-title">
                  <TranslatedText>{homestay.title}</TranslatedText>
                </h3>
                <p className="homestay-card-description">
                  <TranslatedText>{homestay.description}</TranslatedText>
                </p>
                <div className="homestay-card-location">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>
                    <TranslatedText>{homestay.location}</TranslatedText>
                  </span>
                </div>
                <div className="homestay-card-footer">
                  <div className="homestay-card-price">
                    <span className="price-value">
                      {formatPrice(homestay.price)}
                    </span>
                    <span className="price-unit">
                      <TranslatedText>mỗi đêm</TranslatedText>
                    </span>
                  </div>
                  <div className="homestay-card-actions">
                    <button
                      className="btn-view"
                      onClick={() => openDetailsSidebar(homestay)}
                    >
                      <TranslatedText>Xem chi tiết</TranslatedText>
                    </button>
                    <button
                      className="btn-book"
                      onClick={() => openBookingSidebar(homestay)}
                    >
                      <TranslatedText>Đặt ngay</TranslatedText>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Render FAQ Section
  const renderFAQSection = () => (
    <section className="faq-section" id="faq" ref={sectionRefs.faq}>
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>

      <div className="faq-container">
        <div className="faq-header">
          <h2
            className="faq-title"
            style={{
              fontFamily:
                "'Mythical-Prince', 'LouvreSerif', Georgia, 'Times New Roman', serif",
            }}
          >
            <span>
              <TranslatedText>Câu hỏi thường gặp</TranslatedText>
            </span>
          </h2>
          <p className="faq-subtitle">
            <TranslatedText>Câu trả lời từ Bảo tàng Du Pin.</TranslatedText>
          </p>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              key={index}
              style={{ "--animation-order": index }}
            >
              <div className="faq-highlight"></div>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <span>
                  <TranslatedText>{faq.question}</TranslatedText>
                </span>
              </div>
              <div className="faq-answer">
                <p>
                  <TranslatedText>{faq.answer}</TranslatedText>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3 className="faq-footer-title">
            <TranslatedText>Didn't find your answer?</TranslatedText>
          </h3>
          <p className="faq-footer-text">
            <TranslatedText>
              Contact our support team for more information.
            </TranslatedText>
          </p>
          <button className="contact-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <TranslatedText>Contact Us</TranslatedText>
          </button>
        </div>
      </div>

      {renderMobileScrollTop()}
    </section>
  );

  // Render Homestay Details Sidebar
  const renderHomestayDetailsSidebar = () => {
    if (!selectedHomestay || !showDetailsSidebar) return null;

    const gallery = selectedHomestay.gallery || [];

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
          <h2>{selectedHomestay.title}</h2>
          <div style={{ width: "32px" }}></div>
        </div>

        <div className="details-sidebar-content">
          <div className="homestay-gallery">
            <div className="gallery-main" onClick={() => openGalleryModal(0)}>
              <img
                src={gallery[0] || selectedHomestay.image}
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
                    src={img}
                    alt={`${selectedHomestay.title} - hình ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="homestay-details-info">
            <h3 className="homestay-details-subtitle">
              {selectedHomestay.roomType}
            </h3>

            <p className="homestay-details-description">
              {selectedHomestay.description}
            </p>

            <div className="homestay-details-location">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <span>{selectedHomestay.location}</span>
            </div>

            <div className="homestay-details-host">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>Chủ sở hữu</TranslatedText>:{" "}
                {selectedHomestay.host}
              </span>
            </div>

            <div className="homestay-details-beds">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M20 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-5zm-4-2H8V7h8v3z"
                  fill="currentColor"
                />
              </svg>
              <span>{selectedHomestay.beds}</span>
            </div>

            <div className="homestay-details-section">
              <h3>
                <TranslatedText>Tiện nghi</TranslatedText>
              </h3>
              <ul className="amenities-list">
                {selectedHomestay.amenities.map((amenity, index) => (
                  <li key={index}>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        fill="currentColor"
                      />
                    </svg>
                    <TranslatedText>{amenity}</TranslatedText>
                  </li>
                ))}
              </ul>
            </div>

            <div className="homestay-details-section">
              <h3>
                <TranslatedText>Nội quy</TranslatedText>
              </h3>
              <ul className="rules-list">
                {selectedHomestay.rules.map((rule, index) => (
                  <li key={index}>
                    <TranslatedText>{rule}</TranslatedText>
                  </li>
                ))}
              </ul>
            </div>

            <div className="homestay-details-section">
              <h3>
                <TranslatedText>Chính sách hủy phòng</TranslatedText>
              </h3>
              <p>
                <TranslatedText>{selectedHomestay.cancellation}</TranslatedText>
              </p>
            </div>
          </div>

          <div className="homestay-booking-card">
            <div className="booking-card-price">
              <span className="price-value">
                {formatPrice(selectedHomestay.price)}
              </span>
              <span className="price-unit">
                <TranslatedText>mỗi đêm</TranslatedText>
              </span>
            </div>
            <button
              className="btn-book-now"
              onClick={() => openBookingSidebar(selectedHomestay)}
            >
              <TranslatedText>Đặt ngay</TranslatedText>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Booking Sidebar
  const renderBookingSidebar = () => {
    if (!selectedHomestay) return null;

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
          <h2>
            <TranslatedText>Đặt phòng</TranslatedText>
          </h2>
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
            <img src={selectedHomestay.image} alt={selectedHomestay.title} />
            <div>
              <h3>
                <TranslatedText>{selectedHomestay.title}</TranslatedText>
              </h3>
              <div className="booking-homestay-location">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="currentColor"
                  />
                </svg>
                <span>
                  <TranslatedText>{selectedHomestay.location}</TranslatedText>
                </span>
              </div>
              <div className="booking-homestay-price">
                <span className="price-value">
                  {formatPrice(selectedHomestay.price)}
                </span>
                <span className="price-unit">
                  <TranslatedText>mỗi đêm</TranslatedText>
                </span>
              </div>
            </div>
          </div>

          <form className="booking-form modern" onSubmit={handleBookingSubmit}>
            {updateBookingForm()}

            <div className={`form-group ${formErrors.name ? "has-error" : ""}`}>
              <label htmlFor="name">
                <TranslatedText>Họ và tên</TranslatedText>
              </label>
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
              <label htmlFor="email">
                <TranslatedText>Email</TranslatedText>
              </label>
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
              <label htmlFor="phone">
                <TranslatedText>Số điện thoại</TranslatedText>
              </label>
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

            <div
              className={`form-group ${formErrors.guests ? "has-error" : ""}`}
            >
              <label htmlFor="guests">
                <TranslatedText>Số lượng khách</TranslatedText>
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={bookingFormData.guests}
                onChange={handleBookingInputChange}
                min="1"
                max="10"
              />
              {formErrors.guests && (
                <div className="error-message">{formErrors.guests}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">
                <TranslatedText>Yêu cầu</TranslatedText>
              </label>
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
                <span>
                  <TranslatedText>Giá mỗi đêm</TranslatedText>
                </span>
                <span>{formatPrice(selectedHomestay.price)}</span>
              </div>

              {bookingFormData.checkIn && bookingFormData.checkOut && (
                <>
                  <div className="summary-row">
                    <span>
                      <TranslatedText>Số đêm</TranslatedText>
                    </span>
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
                    <span>
                      <TranslatedText>Tổng cộng</TranslatedText>
                    </span>
                    <span>
                      {formatPrice(
                        selectedHomestay.price *
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
                  <span>
                    <TranslatedText>Đang xử lý...</TranslatedText>
                  </span>
                </>
              ) : (
                <TranslatedText>Hoàn tất đặt phòng</TranslatedText>
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

          <h2 className="success-title">
            <TranslatedText>Đặt phòng thành công!</TranslatedText>
          </h2>

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
            <TranslatedText>
              Cảm ơn bạn đã đặt phòng. Chúng tôi đã gửi xác nhận đến email của
              bạn. Bộ phận chăm sóc khách hàng sẽ sớm liên hệ với bạn để cung
              cấp thêm thông tin chi tiết.
            </TranslatedText>
          </p>

          <div className="success-details">
            <div className="success-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>Chủ sỡ hữu</TranslatedText>:{" "}
                {successBookingData.host}
              </span>
            </div>

            <div className="success-detail-item">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>{successBookingData.location}</TranslatedText>
              </span>
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
                <TranslatedText>Tổng</TranslatedText>:{" "}
                <span className="total-price">${totalPrice}</span>
              </span>
            </div>
          </div>

          <button className="btn-close-success" onClick={closeSuccessModal}>
            <TranslatedText>Đóng</TranslatedText>
          </button>
        </div>
      </div>
    );
  };

  // Render mobile scroll to top button
  const renderMobileScrollTop = () => {
    if (!isMobile) return null;

    return (
      <button
        className="mobile-scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Cuộn lên đầu trang"
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <circle cx="8" cy="18" r="2"></circle>
            <circle cx="16" cy="18" r="2"></circle>
            <path d="M8 18h8l4-12H8"></path>
            <path d="M6 10h12"></path>
          </svg>
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
      case "baby":
        return <FaBaby size={isMobile ? 28 : 32} color="currentColor" />;
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
          <label htmlFor="checkIn">
            <TranslatedText>Ngày nhận phòng</TranslatedText>
          </label>
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
          <label htmlFor="checkOut">
            <TranslatedText>Ngày trả phòng</TranslatedText>
          </label>
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
            src={gallery[activeImageIndex]}
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
                src={img}
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
    </div>
  );
};

export default VisitInfo;
