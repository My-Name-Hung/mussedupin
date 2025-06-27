import React, { useCallback, useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaCommentAlt,
  FaEnvelope,
  FaPause,
  FaPhone,
  FaPlay,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdArrowBack, MdClose, MdError } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "./PackageDetail.css";

const PackageDetail = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [imageOrientation, setImageOrientation] = useState("landscape");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    specialRequests: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handleBack = () => {
    try {
      navigate(-1);
    } catch (error) {
      console.error("Navigation error:", error);
      // Fallback if navigation fails
      window.history.back();
    }
  };

  // Cleanup effect for body overflow
  useEffect(() => {
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Handle video modal
  const openVideoModal = () => {
    setIsVideoModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Handle booking modal
  const openBookingModal = () => {
    setShowBookingModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
    document.body.style.overflow = "auto";
  };

  // Handle success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    document.body.style.overflow = "auto";
  };

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
    } else if (
      !/^[0-9]{10}$/.test(bookingFormData.phone.replace(/[^0-9]/g, ""))
    ) {
      errors.phone = "Số điện thoại không hợp lệ";
    }

    if (!bookingFormData.date) {
      errors.date = "Vui lòng chọn ngày";
    } else {
      const selectedDate = new Date(bookingFormData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        errors.date = "Ngày không hợp lệ";
      }
    }

    if (!bookingFormData.guests || bookingFormData.guests < 1) {
      errors.guests = "Vui lòng chọn ít nhất 1 khách";
    }

    return errors;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // Debug log

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors); // Debug log
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    console.log("Submitting form data:", bookingFormData); // Debug log

    try {
      const formattedData = {
        package: packageData?.title,
        price: packageData?.price,
        name: bookingFormData.name,
        email: bookingFormData.email,
        phone: bookingFormData.phone,
        date: bookingFormData.date,
        guests: bookingFormData.guests,
        specialRequests: bookingFormData.specialRequests,
      };

      console.log("Sending data to server:", formattedData); // Debug log

      const bookingServerUrl =
        "https://mussedupin.onrender.com/api/experience-bookings";
      const serverResponse = await fetch(bookingServerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      console.log("Server response status:", serverResponse.status); // Debug log

      if (!serverResponse.ok) {
        const errorData = await serverResponse.json();
        console.error("Server error:", errorData); // Debug log
        throw new Error(errorData.message || "Không thể gửi yêu cầu đặt vé");
      }

      const responseData = await serverResponse.json();
      console.log("Booking success:", responseData); // Debug log

      closeBookingModal();
      setShowSuccessModal(true);

      // Reset form data
      setBookingFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        guests: 1,
        specialRequests: "",
      });
    } catch (error) {
      console.error("Booking error:", error); // Debug log
      alert(error.message || "Đã xảy ra lỗi khi gửi đặt vé. Vui lòng thử lại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    // Detect image orientation when image loads
    if (packageData) {
      const img = new Image();
      img.src = packageData.image;
      img.onload = () => {
        const orientation = getImageOrientation(img.width, img.height);
        setImageOrientation(orientation);
      };
    }
  }, [packageData]);

  const getImageOrientation = (width, height) => {
    const ratio = width / height;
    if (ratio > 1.2) return "landscape";
    if (ratio < 0.8) return "portrait";
    return "square";
  };

  useEffect(() => {
    // Fetch package data from experiencePackages based on packageId
    const allPackages = {
      "loi-rung": {
        title: "LỐI RỪNG",
        description: "Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.",
        fullDescription: `Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/loirung_doc.png?updatedAt=1749269173624",
        price: "150.000 - 250.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà Atiso chào mừng",
          "Tham quan tự do các không gian bảo tàng: hiện vật K'Ho, chân dung Yersin bằng vỏ thông, bộ sưu tập tranh Đà Lạt",
          "1 phần nước uống tự chọn",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: `Trải nghiệm Lối Rừng tại <span class="notranslate">Musée Du Pin</span>`,
        },
      },
      "dang-suong": {
        title: "DÁNG SƯƠNG",
        description:
          "Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận",
        fullDescription: `Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Dangsuong_Doc.jpg?updatedAt=1749269171830",
        price: "350.000 - 450.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
          "1 phần nước uống tự chọn",
        ],
        video: {
          id: "gJL4YdOunvA",
          title: "Khám Phá Dáng Sương",
        },
      },
      "nghe-nhan": {
        title: "NGHỆ NHÂN",
        description:
          "Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ",
        fullDescription: `Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Thumbnail%20Ngh%E1%BB%87%20Nh%C3%A2n%20D%E1%BB%8Dc.png?updatedAt=1750322897358",
        price: "399.000 - 599.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Workshop vẽ tranh, dệt thổ cẩm hoặc nặn gốm (120 phút)",
          "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
        ],
        video: {
          id: "1lVoCgIxUm4",
          title: "Workshop Nghệ Nhân",
        },
      },
      "hon-nui": {
        title: "HỒN NÚI",
        description:
          "Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan",
        fullDescription: `Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Honnui_Doc.jpg?updatedAt=1749269171601",
        price: "799.000 - 999.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm. Tour rừng tối thiểu 5 khách để đảm bảo an toàn",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
          "Lựa chọn Tour Khám phá rừng nguyên sinh hoặc Worshop (vẽ tranh, dệt thổ cẩm, làm gốm,...)",
          "Bữa trưa nhẹ gồm 01 món ăn và 01 thức uống",
        ],
        video: {
          id: "3hr-yyLqAy4",
          title: "Trải Nghiệm Hồn Núi",
        },
      },
      "lua-thieng": {
        title: "LỬA THIÊNG / Pin d'Amour",
        description:
          "Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm",
        fullDescription: `Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
        price: "999.000 - 1.999.000đ",
        time: "18:00 - 22:30",
        note: "Không áp dụng cho trẻ em",
        details: [
          "Thưởng thức welcome drink chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng (30 phút)",
          'Trải nghiệm sân khấu Pind\'amour với chương trình Vin Acoustic "Thông Hát" và rượu vang thượng hạng và 01 phần ăn nhẹ',
        ],
        video: {
          id: "_qP_eGPzVJE",
          title: "Đêm Lửa Thiêng",
        },
      },
      "dem-thong": {
        title: "ĐÊM THÔNG",
        description:
          "Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên",
        fullDescription: `Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/DemThong_Trong.jpg?updatedAt=1749312390412",
        price: "499.000 - 899.000đ",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
          "Lưu trú 1 đêm",
          "Bữa sáng với đặc sản địa phương",
        ],
        video: {
          id: "Ja3XeTu-r54",
          title: "Đêm Thông",
        },
      },
      "bong-cay-konia": {
        title: "BÓNG CÂY KƠNIA",
        description:
          "Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp",
        fullDescription: `Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/bongcay-doc.png?updatedAt=1750002737327",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
          "Lưu trú 1 đêm",
          "Bữa sáng với đặc sản địa phương",
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Tour khám phá rừng nguyên sinh ngàn năm",
          "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
        ],
        video: {
          id: "2zuGLmyZgfU",
          title: "Bóng Cây Kơnia",
        },
      },
      "truong-ca-langbiang": {
        title: "TRƯỜNG CA LANGBIANG",
        description:
          "Trải nghiệm toàn diện như bản trường ca sống động nhất về Đà Lạt – từ nghệ thuật, thiên nhiên đến âm nhạc. Trọn vẹn cảm xúc 5 giác quan",
        fullDescription: `Trải nghiệm toàn diện như bản trường ca sống động nhất về Đà Lạt – từ nghệ thuật, thiên nhiên đến âm nhạc. Trọn vẹn cảm xúc 5 giác quan`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/daa23646b65e02005b4f.jpg?updatedAt=1749083704100",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Đưa đón từ sân bay Liên Khương bằng xe VIP",
          "Lưu trú 1 đêm tại phòng nghệ thuật",
          "Tour VIP tham quan toàn bộ bảo tàng + Rừng nguyên sinh",
          'Chương trình "Thông Hát" riêng tư + Rượu vang hảo hạng',
          "Workshop Vẽ tranh, dệt thổ cẩm hoặc nấu ăn cùng nghệ nhân",
          "Bộ ảnh nghệ thuật chuyên nghiệp",
        ],
        video: {
          id: "OI6r5SW9BiM",
          title: "Trường Ca Langbiang",
        },
      },
      "dem-huyen-thoai": {
        title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
        description:
          "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
        fullDescription: `Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Tourdemhuyenthoai_Trong.jpg?updatedAt=1749312109881",
        price: "499.000đ",
        time: "19:00 - 21:00",
        schedule: "T3-T5 hàng tuần",
        details: [
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Trải nghiệm sân khấu tương tác điện ảnh với câu chuyện K'Ho",
          "01 thức uống + 01 snack",
          "Thước phim điện ảnh",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Đêm Huyền Thoại Langbiang",
        },
      },
      "giai-dieu-dai-ngan": {
        title: "GIAI ĐIỆU ĐẠI NGÀN - LẮNG NGHE THÔNG HÁT",
        description: "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
        fullDescription: `Hòa nhạc acoustic với chủ đề thay đổi hàng tháng`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Trong.jpg?updatedAt=1749311873117",
        price: "799.000đ",
        time: "19:00 - 22:30",
        schedule: "Thứ 6-T7-CN",
        details: ["Rượu vang", "Thức ăn nhẹ", "Âm nhạc theo chủ đề"],
        video: {
          id: "aozcRuYVPKw",
          title: "Giai Điệu Đại Ngàn",
        },
      },
      "uom-mam-sang-tao": {
        title: "",
        description: "",
        fullDescription: ``,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
        price: "299.000đ",
        time: "Sáng: 8h - 12h, Chiều: 14h - 18h",
        details: [
          "Workshop: Tay nặn tay vẽ hoặc chế tác đồ thủ công từ thông",
          "Chụp ảnh nghệ thuật tại bảo tàng",
          "01 thức uống + 01 snack",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Ươm Mầm Sáng Tạo",
        },
      },
      "chup-anh-nghe-thuat": {
        title: "CHỤP ẢNH NGHỆ THUẬT",
        description:
          "Du khách sẽ được sở hữu những tấm ảnh nghệ thuật của chính mình trong không gian Bảo Tàng",
        fullDescription: `Du khách sẽ được sở hữu những tấm ảnh nghệ thuật của chính mình trong không gian Bảo Tàng hay trong từng căn phòng art studio, cùng với nghệ nhân hay nhân vật theo chủ đề. Bảo Tàng Thông cung cấp trang phục, đạo cụ riêng phù hợp với từng không gian`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/chupanhnghethuat_ngang.jpg?updatedAt=1750298609133",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Chụp ảnh trong không gian Bảo Tàng",
          "Chụp ảnh trong các phòng art studio",
          "Trang phục và đạo cụ theo chủ đề",
          "Chụp ảnh cùng nghệ nhân hoặc nhân vật theo chủ đề",
          "Hậu kỳ và chỉnh sửa chuyên nghiệp",
          "Album ảnh kỹ thuật số chất lượng cao",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Chụp ảnh nghệ thuật tại Musée Du Pin",
        },
      },
      "phim-dien-anh": {
        title: "PHIM ĐIỆN ẢNH",
        description:
          "Toàn bộ chuyến đi của du khách và gia đình sẽ được ê kíp đoàn làm phim ghi lại",
        fullDescription: `Toàn bộ chuyến đi của du khách và gia đình sẽ được ê kíp đoàn làm phim ghi lại với thiết bị máy móc hiện đại để chọn lọc tạo ra 1 thước phim điện ảnh riêng về hành trình du khảo.`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/phimdienanh_ngang.jpg?updatedAt=1750298609073",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Quay phim bằng thiết bị hiện đại",
          "Ê-kíp quay phim chuyên nghiệp",
          "Kịch bản và góc máy được lên kế hoạch chi tiết",
          "Hậu kỳ và dựng phim chuyên nghiệp",
          "Phim được chỉnh màu điện ảnh",
          "Bản phim chất lượng cao trên nhiều định dạng",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Dịch vụ quay phim tại Musée Du Pin",
        },
      },
      "the-childhood": {
        title: "THE CHILDHOOD",
        description: "",
        fullDescription:
          "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thechillhood.jpg",
        price: "2.800.000đ/đêm",
        details: [
          "Phòng nghỉ thoải mái",
          "Trang trí truyền thống",
          "Bữa ăn tự nấu",
          "Không gian riêng tư",
          "Trải nghiệm văn hóa địa phương",
        ],
      },
      "white-bauhunia": {
        title: "WHITE BAUHUNIA",
        description: "",
        fullDescription:
          "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846791/collections/whitebauhinia.jpg",
        price: "4.200.000đ/đêm",
        details: [
          "Thiết kế hiện đại",
          "Đầy đủ tiện nghi",
          "Vị trí thuận tiện",
          "Dịch vụ cao cấp",
          "View thành phố",
        ],
      },
      "the-chill-1": {
        title: "THE CHILL 1",
        description: "",
        fullDescription:
          "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846806/collections/thechill1.jpg",
        price: "8.200.000đ/đêm",
        details: [
          "Biệt thự riêng biệt",
          "Vườn riêng",
          "Dịch vụ cao cấp",
          "View thành phố",
          "Không gian rộng rãi",
        ],
      },
      "the-chill-2": {
        title: "THE CHILL 2",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846806/collections/thechill2.jpg",
        price: "1.750.000đ/đêm",
        details: [
          "Phòng riêng thoải mái",
          "Giá cả hợp lý",
          "Gần phương tiện công cộng",
          "Tiện nghi đầy đủ",
          "Không gian chung rộng rãi",
        ],
      },
      "the-memory": {
        title: "THE MEMORY",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846800/collections/thememory.jpg",
        price: "1.750.000đ/đêm",
        details: [
          "Thiết kế hoài cổ",
          "Không gian yên tĩnh",
          "Tiện nghi hiện đại",
          "View đẹp",
          "Dịch vụ chu đáo",
        ],
      },
      "the-sunset": {
        title: "THE SUNSET",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846798/collections/thesunset.jpg",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "View hoàng hôn tuyệt đẹp",
          "Ban công riêng",
          "Nội thất cao cấp",
          "Dịch vụ 24/7",
          "Không gian yên tĩnh",
        ],
      },
      "the-train": {
        title: "THE TRAIN",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846795/collections/thetrain.jpg",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Thiết kế độc đáo",
          "Trải nghiệm mới lạ",
          "Tiện nghi hiện đại",
          "View đặc biệt",
          "Dịch vụ chuyên nghiệp",
        ],
      },
    };

    setPackageData(allPackages[packageId] || null);
  }, [packageId]);

  const uomMamImages = [
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/ec5380fd71cac5949cdb.jpg?updatedAt=1749190760752",
      type: "square",
    },
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/104d88e679d1cd8f94c0.jpg?updatedAt=1749190760422",
      type: "landscape",
    },
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/f91639aadf9d6bc3328c.jpg?updatedAt=1749190760319",
      type: "landscape",
    },
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/41b08d7b7a4cce12975d.jpg?updatedAt=1749190759948",
      type: "landscape",
    },
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/da6cbec84ffffba1a2ee.jpg?updatedAt=1749190759848",
      type: "landscape",
    },
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/dddd4a06bb310f6f5620.jpg?updatedAt=1749190760200",
      type: "portrait",
    },
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/d72092f863cfd7918ede.jpg?updatedAt=1749190759140",
      type: "portrait",
    },
    {
      url: "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
      type: "portrait",
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) =>
      prev === uomMamImages.length - 1 ? 0 : prev + 1
    );
  }, [uomMamImages.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? uomMamImages.length - 1 : prev - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (packageId === "uom-mam-sang-tao" && isPlaying) {
      const timer = setInterval(() => {
        nextSlide();
      }, 1500);

      return () => clearInterval(timer);
    }
  }, [packageId, nextSlide, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleBookNow = () => {
    navigate(`/checkout/package/${packageId}`);
  };

  if (!packageData) {
    return (
      <div className="package-detail-container">
        <button className="back-button2" onClick={handleBack}>
          <MdArrowBack />
        </button>
        <div className="package-not-found">
          <h1>Không tìm thấy gói trải nghiệm</h1>
          <p>Xin lỗi, gói trải nghiệm bạn đang tìm kiếm không tồn tại.</p>
        </div>
      </div>
    );
  }

  if (packageId === "uom-mam-sang-tao") {
    return (
      <div className="package-detail-container">
        <button className="back-button2" onClick={handleBack}>
          <MdArrowBack />
        </button>

        <div className="hero-slideshow-container">
          <div className="hero-slides">
            <div className="bg-hero-overlay" />
            {uomMamImages.map((image, index) => (
              <div
                key={index}
                className={`hero-slide ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                <img
                  src={image.url}
                  alt={`Slide ${index + 1}`}
                  className={`hero-slide-image ${image.type}`}
                />
              </div>
            ))}
          </div>

          <button className="slide-nav prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="slide-nav next" onClick={nextSlide}>
            <FaChevronRight />
          </button>

          <div className="slide-dots">
            {uomMamImages.map((_, index) => (
              <button
                key={index}
                className={`slide-dot ${
                  index === currentSlide ? "active" : ""
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          <button className="slideshow-control" onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <div className="hero-content">
            <h1>{packageData?.title}</h1>
            <p>{packageData?.description}</p>
          </div>
        </div>

        <div className="package-detail-content">
          <button className="book-now-button">
            <a href="https://ticket-museeduphin.netlify.app/" target="_blank">
              Đặt vé ngay
            </a>
          </button>
          <div className="content-wrapper">
            <div className="content-left">
              <h2>Chi tiết gói trải nghiệm</h2>
              <ul className="package-details-list">
                {packageData.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>

              <div className="package-price-info">
                <h2>Chi phí</h2>
                <p className="price">
                  {packageData.price.includes("Liên hệ")
                    ? packageData.price
                    : `${packageData.price}/người`}
                </p>
                {packageData.childPrice && (
                  <p className="child-price">
                    Trẻ em: {packageData.childPrice}
                  </p>
                )}
                {packageData.time && (
                  <p className="time">
                    <strong>Thời gian:</strong> {packageData.time}
                  </p>
                )}
                {packageData.schedule && (
                  <p className="schedule">
                    <strong>Lịch trình:</strong> {packageData.schedule}
                  </p>
                )}
                {packageData.note && (
                  <p className="note">
                    <strong>Lưu ý:</strong> {packageData.note}
                  </p>
                )}
              </div>
            </div>

            <div className="content-right">
              {packageData.video && (
                <div className="package-video-section">
                  <h2>Video giới thiệu</h2>
                  <div
                    className="video-thumbnail-wrapper"
                    onClick={openVideoModal}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${packageData.video.id}/maxresdefault.jpg`}
                      alt={packageData.video.title}
                      className="video-thumbnail"
                    />
                    <div className="play-button-overlay">
                      <FaPlay />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Video Modal */}
        {isVideoModalOpen && (
          <div className="video-modal active">
            <div className="modal-content">
              <button className="close-modal2" onClick={closeVideoModal}>
                <MdClose />
              </button>
              {packageData?.video && (
                <iframe
                  src={`https://www.youtube.com/embed/${packageData.video.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={packageData.video.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ width: "100%", height: "100%" }}
                />
              )}
            </div>
          </div>
        )}

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="booking-modal active">
            <div className="booking-modal-container">
              <button
                className="booking-close-button"
                onClick={closeBookingModal}
              >
                <MdClose />
              </button>
              <div className="booking-modal-header">
                <h2>Đặt vé {packageData?.title}</h2>
              </div>
              <div className="booking-modal-content">
                <form
                  className="booking-form modern"
                  onSubmit={handleBookingSubmit}
                >
                  <div className="form-group full-width">
                    <div className="booking-package-info">
                      <div className="booking-price-row">
                        <span className="price-label">Giá:</span>
                        <span className="price-value">
                          {packageData.price.includes("Liên hệ")
                            ? packageData.price
                            : `${packageData.price}/người`}
                        </span>
                      </div>
                      {packageData?.childPrice && (
                        <div className="booking-price-row">
                          <span className="price-label">Trẻ em:</span>
                          <span className="price-value">
                            {packageData.childPrice}
                          </span>
                        </div>
                      )}
                      {packageData?.time && (
                        <div className="booking-price-row">
                          <span className="price-label">Thời gian:</span>
                          <span className="price-value">
                            {packageData.time}
                          </span>
                        </div>
                      )}
                      {packageData?.schedule && (
                        <div className="booking-price-row">
                          <span className="price-label">Lịch trình:</span>
                          <span className="price-value">
                            {packageData.schedule}
                          </span>
                        </div>
                      )}
                      {packageData?.note && (
                        <div className="booking-note">
                          <strong>Lưu ý:</strong> {packageData.note}
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`form-group ${
                      formErrors.name ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="name">
                      <FaUser />
                      Họ và tên
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
                      <div className="error-message">
                        <MdError />
                        {formErrors.name}
                      </div>
                    )}
                  </div>

                  <div
                    className={`form-group ${
                      formErrors.email ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="email">
                      <FaEnvelope />
                      Email
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
                      <div className="error-message">
                        <MdError />
                        {formErrors.email}
                      </div>
                    )}
                  </div>

                  <div
                    className={`form-group ${
                      formErrors.phone ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="phone">
                      <FaPhone />
                      Số điện thoại
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={bookingFormData.phone}
                      onChange={handleBookingInputChange}
                      placeholder="Nhập số điện thoại của bạn"
                    />
                    {formErrors.phone && (
                      <div className="error-message">
                        <MdError />
                        {formErrors.phone}
                      </div>
                    )}
                  </div>

                  <div
                    className={`form-group ${
                      formErrors.date ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="date">
                      <FaCalendarAlt />
                      Ngày tham quan
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={bookingFormData.date}
                      onChange={handleBookingInputChange}
                      min={new Date().toISOString().split("T")[0]}
                    />
                    {formErrors.date && (
                      <div className="error-message">
                        <MdError />
                        {formErrors.date}
                      </div>
                    )}
                  </div>

                  <div
                    className={`form-group ${
                      formErrors.guests ? "has-error" : ""
                    }`}
                  >
                    <label htmlFor="guests">
                      <FaUsers />
                      Số lượng khách
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
                      <div className="error-message">
                        <MdError />
                        {formErrors.guests}
                      </div>
                    )}
                  </div>

                  <div className="form-group full-width">
                    <label htmlFor="specialRequests">
                      <FaCommentAlt />
                      Yêu cầu đặc biệt
                    </label>
                    <textarea
                      id="specialRequests"
                      name="specialRequests"
                      value={bookingFormData.specialRequests}
                      onChange={handleBookingInputChange}
                      placeholder="Nhập yêu cầu đặc biệt của bạn (nếu có)"
                      rows="3"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="btn-submit-booking"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="booking-spinner"></div>
                        <span>Đang xử lý...</span>
                      </>
                    ) : (
                      "Hoàn tất đặt vé"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="success-modal">
            <div className="success-modal-content">
              <div className="success-icon-wrapper">
                <svg className="success-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              </div>
              <h2 className="success-title">Đặt vé thành công!</h2>
              <p className="success-message">
                Đã gửi yêu cầu đặt vé thành công, chúng tôi sẽ sớm liên hệ bạn!
              </p>
              <button className="btn-close-success" onClick={closeSuccessModal}>
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="package-detail-container">
      <button className="back-button2" onClick={handleBack}>
        <MdArrowBack />
      </button>
      <div className="package-detail-hero">
        <img
          src={packageData.image}
          alt={packageData.title}
          className={`package-detail-hero-img ${imageOrientation}`}
        />
        <div className="package-detail-hero-overlay" />
        <div className="package-detail-hero-content">
          {/* <h1>{packageData.title}</h1> */}
          <p>{packageData.description}</p>
        </div>
      </div>

      <div className="package-detail-content">
        <button className="book-now-button">
          <a href="https://ticket-museeduphin.netlify.app/" target="_blank">
            Đặt vé ngay
          </a>
        </button>
        <div className="content-wrapper">
          <div className="content-left">
            <h2>Chi tiết gói trải nghiệm</h2>
            <ul className="package-details-list">
              {packageData.details.map((detail, index) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>

            <div className="package-price-info">
              <h2>Chi phí</h2>
              <p className="price">
                {packageData.price.includes("Liên hệ")
                  ? packageData.price
                  : `${packageData.price}/người`}
              </p>
              {packageData.childPrice && (
                <p className="child-price">Trẻ em: {packageData.childPrice}</p>
              )}
              {packageData.time && (
                <p className="time">
                  <strong>Thời gian:</strong> {packageData.time}
                </p>
              )}
              {packageData.schedule && (
                <p className="schedule">
                  <strong>Lịch trình:</strong> {packageData.schedule}
                </p>
              )}
              {packageData.note && (
                <p className="note">
                  <strong>Lưu ý:</strong> {packageData.note}
                </p>
              )}
            </div>
          </div>

          <div className="content-right">
            {packageData.video && (
              <div className="package-video-section">
                <h2>Video giới thiệu</h2>
                <div
                  className="video-thumbnail-wrapper"
                  onClick={openVideoModal}
                >
                  <img
                    src={`https://img.youtube.com/vi/${packageData.video.id}/maxresdefault.jpg`}
                    alt={packageData.video.title}
                    className="video-thumbnail"
                  />
                  <div className="play-button-overlay">
                    <FaPlay />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoModalOpen && (
        <div className="video-modal active">
          <div className="modal-content">
            <button className="close-modal2" onClick={closeVideoModal}>
              <MdClose />
            </button>
            {packageData?.video && (
              <iframe
                src={`https://www.youtube.com/embed/${packageData.video.id}?autoplay=1&rel=0&modestbranding=1`}
                title={packageData.video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ width: "100%", height: "100%" }}
              />
            )}
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="booking-modal active">
          <div className="booking-modal-container">
            <button
              className="booking-close-button"
              onClick={closeBookingModal}
            >
              <MdClose />
            </button>
            <div className="booking-modal-header">
              <h2>Đặt vé {packageData?.title}</h2>
            </div>
            <div className="booking-modal-content">
              <form
                className="booking-form modern"
                onSubmit={handleBookingSubmit}
              >
                <div className="form-group full-width">
                  <div className="booking-package-info">
                    <div className="booking-price-row">
                      <span className="price-label">Giá:</span>
                      <span className="price-value">
                        {packageData.price.includes("Liên hệ")
                          ? packageData.price
                          : `${packageData.price}/người`}
                      </span>
                    </div>
                    {packageData?.childPrice && (
                      <div className="booking-price-row">
                        <span className="price-label">Trẻ em:</span>
                        <span className="price-value">
                          {packageData.childPrice}
                        </span>
                      </div>
                    )}
                    {packageData?.time && (
                      <div className="booking-price-row">
                        <span className="price-label">Thời gian:</span>
                        <span className="price-value">{packageData.time}</span>
                      </div>
                    )}
                    {packageData?.schedule && (
                      <div className="booking-price-row">
                        <span className="price-label">Lịch trình:</span>
                        <span className="price-value">
                          {packageData.schedule}
                        </span>
                      </div>
                    )}
                    {packageData?.note && (
                      <div className="booking-note">
                        <strong>Lưu ý:</strong> {packageData.note}
                      </div>
                    )}
                  </div>
                </div>

                <div
                  className={`form-group ${formErrors.name ? "has-error" : ""}`}
                >
                  <label htmlFor="name">
                    <FaUser />
                    Họ và tên
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
                    <div className="error-message">
                      <MdError />
                      {formErrors.name}
                    </div>
                  )}
                </div>

                <div
                  className={`form-group ${
                    formErrors.email ? "has-error" : ""
                  }`}
                >
                  <label htmlFor="email">
                    <FaEnvelope />
                    Email
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
                    <div className="error-message">
                      <MdError />
                      {formErrors.email}
                    </div>
                  )}
                </div>

                <div
                  className={`form-group ${
                    formErrors.phone ? "has-error" : ""
                  }`}
                >
                  <label htmlFor="phone">
                    <FaPhone />
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={bookingFormData.phone}
                    onChange={handleBookingInputChange}
                    placeholder="Nhập số điện thoại của bạn"
                  />
                  {formErrors.phone && (
                    <div className="error-message">
                      <MdError />
                      {formErrors.phone}
                    </div>
                  )}
                </div>

                <div
                  className={`form-group ${formErrors.date ? "has-error" : ""}`}
                >
                  <label htmlFor="date">
                    <FaCalendarAlt />
                    Ngày tham quan
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={bookingFormData.date}
                    onChange={handleBookingInputChange}
                    min={new Date().toISOString().split("T")[0]}
                  />
                  {formErrors.date && (
                    <div className="error-message">
                      <MdError />
                      {formErrors.date}
                    </div>
                  )}
                </div>

                <div
                  className={`form-group ${
                    formErrors.guests ? "has-error" : ""
                  }`}
                >
                  <label htmlFor="guests">
                    <FaUsers />
                    Số lượng khách
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
                    <div className="error-message">
                      <MdError />
                      {formErrors.guests}
                    </div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="specialRequests">
                    <FaCommentAlt />
                    Yêu cầu đặc biệt
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    value={bookingFormData.specialRequests}
                    onChange={handleBookingInputChange}
                    placeholder="Nhập yêu cầu đặc biệt của bạn (nếu có)"
                    rows="3"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="btn-submit-booking"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="booking-spinner"></div>
                      <span>Đang xử lý...</span>
                    </>
                  ) : (
                    "Hoàn tất đặt vé"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <div className="success-icon-wrapper">
              <svg className="success-icon" viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
              </svg>
            </div>
            <h2 className="success-title">Đặt vé thành công!</h2>
            <p className="success-message">
              Đã gửi yêu cầu đặt vé thành công, chúng tôi sẽ sớm liên hệ bạn!
            </p>
            <button className="btn-close-success" onClick={closeSuccessModal}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
