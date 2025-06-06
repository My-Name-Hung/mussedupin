import React, { useEffect, useState } from "react";
import {
  FaCalendarAlt,
  FaCommentAlt,
  FaEnvelope,
  FaPhone,
  FaPlay,
  FaUser,
  FaUsers,
} from "react-icons/fa";
import { MdArrowBack, MdClose, MdError } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import "./PackageDetail.css";

const PackageDetail = () => {
  const { id } = useParams();
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

  const handleBack = () => {
    navigate(-1);
  };

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
  };

  const openBookingModal = () => {
    setShowBookingModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeBookingModal = () => {
    setShowBookingModal(false);
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
    }

    if (!bookingFormData.date) {
      errors.date = "Vui lòng chọn ngày";
    }

    if (!bookingFormData.time) {
      errors.time = "Vui lòng chọn giờ";
    }

    if (!bookingFormData.guests || bookingFormData.guests < 1) {
      errors.guests = "Vui lòng chọn ít nhất 1 khách";
    }

    return errors;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data for submission
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

      // Send to booking server
      const bookingServerUrl =
        "https://mussedupin.onrender.com/api/experience-bookings";
      const serverResponse = await fetch(bookingServerUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!serverResponse.ok) {
        throw new Error("Không thể gửi yêu cầu đặt vé");
      }

      const responseData = await serverResponse.json();
      console.log("Đặt vé thành công:", responseData);

      setShowBookingModal(false);
      setShowSuccessModal(true);

      // Reset form data
      setBookingFormData({
        name: "",
        email: "",
        phone: "",
        date: "",
        time: "",
        guests: 1,
        specialRequests: "",
      });
    } catch (error) {
      console.error("Lỗi khi gửi đặt vé:", error);
      alert("Đã xảy ra lỗi khi gửi đặt vé. Vui lòng thử lại.");
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
    // Fetch package data from experiencePackages based on id
    const allPackages = {
      "loi-rung": {
        title: "LỐI RỪNG",
        description: "Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.",
        fullDescription: `Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        price: "150.000 - 250.000",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà Atiso chào mừng",
          "Tham quan tự do các không gian bảo tàng: hiện vật K'Ho, chân dung Yersin bằng vỏ thông, bộ sưu tập tranh Đà Lạt",
          "1 phần nước uống tự chọn",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Lối Rừng",
        },
      },
      "dang-suong": {
        title: "DÁNG SƯƠNG",
        description:
          "Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận",
        fullDescription: `Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        price: "350.000 - 450.000",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
          "1 phần nước uống tự chọn",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Khám Phá Dáng Sương",
        },
      },
      "nghe-nhan": {
        title: "NGHỆ NHÂN",
        description:
          "Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ",
        fullDescription: `Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
        price: "399.000 - 599.000",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Workshop vẽ tranh, dệt thổ cẩm hoặc nặn gốm (120 phút)",
          "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Workshop Nghệ Nhân",
        },
      },
      "hon-nui": {
        title: "HỒN NÚI",
        description:
          "Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan",
        fullDescription: `Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Leaflet%20H%E1%BB%93n%20N%C3%BAi.png?updatedAt=1749083706305",
        price: "799.000 - 999.000",
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
          id: "aozcRuYVPKw",
          title: "Trải Nghiệm Hồn Núi",
        },
      },
      "lua-thieng": {
        title: "LỬA THIÊNG / Pind' Amour",
        description:
          "Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm",
        fullDescription: `Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
        price: "999.000 - 1.999.000",
        time: "18:00 - 22:30",
        note: "Không áp dụng cho trẻ em",
        details: [
          "Thưởng thức welcome drink chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng (30 phút)",
          'Trải nghiệm sân khấu Pind\'amour với chương trình Vin Acoustic "Thông Hát" và rượu vang thượng hạng và 01 phần ăn nhẹ',
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Đêm Lửa Thiêng",
        },
      },
      "dem-thong": {
        title: "ĐÊM THÔNG",
        description:
          "Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên",
        fullDescription: `Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
        price: "499.000 - 899.000",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
          "Lưu trú 1 đêm",
          "Bữa sáng với đặc sản địa phương",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Đêm Thông",
        },
      },
      "bong-cay-konia": {
        title: "BÓNG CÂY KƠNIA",
        description:
          "Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp",
        fullDescription: `Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
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
          id: "aozcRuYVPKw",
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
          id: "aozcRuYVPKw",
          title: "Trường Ca Langbiang",
        },
      },
      "dem-huyen-thoai": {
        title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
        description:
          "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
        fullDescription: `Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
        price: "499.000",
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
          "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
        price: "799.000",
        time: "19:00 - 22:30",
        schedule: "Thứ 6-T7-CN",
        details: ["Rượu vang", "Thức ăn nhẹ", "Âm nhạc theo chủ đề"],
        video: {
          id: "aozcRuYVPKw",
          title: "Giai Điệu Đại Ngàn",
        },
      },
      "uom-mam-sang-tao": {
        title: "ƯƠM MẦM SÁNG TẠO",
        description: "Các gói trải nghiệm cho bé",
        fullDescription: `Các gói trải nghiệm cho bé`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
        price: "299.000",
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
    };

    setPackageData(allPackages[id] || null);
  }, [id]);

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
          <h1>{packageData.title}</h1>
          <p>{packageData.description}</p>
        </div>
      </div>

      <div className="package-detail-content">
        <button className="book-now-button" onClick={openBookingModal}>
          Đặt vé ngay
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
                  : `${packageData.price}đ/người`}
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
      <div className={`video-modal ${isVideoModalOpen ? "active" : ""}`}>
        <div className="modal-content">
          <button className="close-modal2" onClick={closeVideoModal}>
            <MdClose />
          </button>
          <iframe
            src={
              isVideoModalOpen
                ? `https://www.youtube.com/embed/${packageData.video.id}?autoplay=1&rel=0&modestbranding=1`
                : ""
            }
            title={packageData.video.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      </div>

      {/* Booking Modal */}
      <div className={`booking-modal ${showBookingModal ? "active" : ""}`}>
        <div className="booking-modal-container">
          <button className="booking-close-button" onClick={closeBookingModal}>
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
                className={`form-group ${formErrors.email ? "has-error" : ""}`}
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
                className={`form-group ${formErrors.phone ? "has-error" : ""}`}
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
                className={`form-group ${formErrors.guests ? "has-error" : ""}`}
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

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="success-modal">
          <div className="success-modal-content">
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="40" height="40">
                <path
                  d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                  fill="#fff"
                />
              </svg>
            </div>
            <h2 className="success-title">Đặt vé thành công!</h2>
            <p className="success-message">
              Cảm ơn bạn đã đặt vé. Chúng tôi đã gửi xác nhận đến email của bạn.
              Bộ phận chăm sóc khách hàng sẽ sớm liên hệ với bạn để cung cấp
              thêm thông tin chi tiết.
            </p>
            <button
              className="btn-close-success"
              onClick={() => setShowSuccessModal(false)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageDetail;
