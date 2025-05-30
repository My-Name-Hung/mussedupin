import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./VisitorTrailDetailPage.css";

// Import trail images from collection folders
const dungcuImages = import.meta.glob(
  "../../assets/home/Collections/DungcuAmNhacTayNguyen/*.webp"
);
const khoChanNuoiImages = import.meta.glob(
  "../../assets/home/Collections/K_hoChanNuoi/*.webp"
);
const khoDieuKhacImages = import.meta.glob(
  "../../assets/home/Collections/K_hoDieuKhac/*.webp"
);
const khoLeHoiImages = import.meta.glob(
  "../../assets/home/Collections/K_hoLeHoi/*.webp"
);
const khoSanBanImages = import.meta.glob(
  "../../assets/home/Collections/K_hoSanBan_HaiLuomTrongTrotChanNuoi/*.webp"
);
const khoSinhHoatImages = import.meta.glob(
  "../../assets/home/Collections/K_hoSinhHoatThuongNhat/*.webp"
);
const phucTangImages = import.meta.glob(
  "../../assets/home/Collections/PhucTang/*.webp"
);
const vatlieuImages = import.meta.glob(
  "../../assets/home/Collections/VatLieu/*.webp"
);

// Import thumbnails for each category
import dungcuThumb from "../../assets/home/Collections/DungcuAmNhacTayNguyen/Cồng Chiên.webp";
import channuoiThumb from "../../assets/home/Collections/K_hoChanNuoi/Lồng Đa Đa.webp";
import dieukhacThumb from "../../assets/home/Collections/K_hoDieuKhac/Điêu Khắc.webp";
import lehoiThumb from "../../assets/home/Collections/K_hoLeHoi/Lễ Hội.webp";
import sanbanThumb from "../../assets/home/Collections/K_hoSanBan_HaiLuomTrongTrotChanNuoi/Chiếc Gùi.webp";
import sinhoatThumb from "../../assets/home/Collections/K_hoSinhHoatThuongNhat/Nồi Đất.webp";
import phuctangThumb from "../../assets/home/Collections/PhucTang/Thông 2.webp";
import vatlieuThumb from "../../assets/home/Collections/VatLieu/Hoa Ban Trắng.webp";

// SVG icons
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
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
);

const ArrowRightIcon = () => (
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
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const BackIcon = () => (
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
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
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
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const AudioIcon = () => (
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
    <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
);

const MapIcon = () => (
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
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

// Trail data
const trailsData = [
  {
    id: 1,
    title: "DỤNG CỤ ÂM NHẠC TÂY NGUYÊN",
    description:
      "Khám phá âm nhạc truyền thống của người Tây Nguyên qua các nhạc cụ độc đáo.",
    fullDescription:
      "Khám phá âm nhạc truyền thống của người Tây Nguyên qua các nhạc cụ độc đáo như cồng chiêng - biểu tượng văn hóa và tín ngưỡng thiêng liêng.",
    image: dungcuThumb,
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Cồng chiêng là nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, là biểu tượng văn hóa và tín ngưỡng thiêng liêng.",
    images: dungcuImages,
  },
  {
    id: 2,
    title: "K'HO CHĂN NUÔI",
    description:
      "Khám phá các công cụ và phương thức chăn nuôi truyền thống của người K'ho.",
    fullDescription:
      "Khám phá các công cụ và phương thức chăn nuôi truyền thống của người K'ho, từ lồng đa đa đến các vật dụng chăn nuôi khác.",
    image: channuoiThumb,
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Lồng đa đa của người K'ho được đan thủ công từ tre nứa, thể hiện sự khéo léo và mối liên kết với thiên nhiên.",
    images: khoChanNuoiImages,
  },
  {
    id: 3,
    title: "K'HO LỄ HỘI",
    description:
      "Tìm hiểu về các lễ hội truyền thống và nghi thức văn hóa của người K'ho.",
    fullDescription:
      "Tìm hiểu về các lễ hội truyền thống và nghi thức văn hóa của người K'ho thông qua các hiện vật như Ché Ghò Sành.",
    image: lehoiThumb,
    duration: "1H",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, là biểu tượng của sự giàu có và tín ngưỡng.",
    images: khoLeHoiImages,
  },
  {
    id: 4,
    title: "K'HO ĐIÊU KHẮC",
    description:
      "Chiêm ngưỡng nghệ thuật điêu khắc truyền thống của người K'ho.",
    fullDescription:
      "Chiêm ngưỡng nghệ thuật điêu khắc truyền thống của người K'ho qua các tác phẩm tượng và điêu khắc tinh xảo.",
    image: dieukhacThumb,
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Nghệ thuật điêu khắc K'ho thể hiện đặc trưng văn hóa và đời sống tinh thần của dân tộc.",
    images: khoDieuKhacImages,
  },
  {
    id: 5,
    title: "K'HO SĂN BẮN & HÁI LƯỢM",
    description:
      "Khám phá các công cụ săn bắn, hái lượm và canh tác truyền thống.",
    fullDescription:
      "Khám phá các công cụ săn bắn, hái lượm và canh tác truyền thống của người K'ho.",
    image: sanbanThumb,
    duration: "1H",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Chiếc gùi - vật dụng không thể thiếu trong đời sống của người K'ho, dùng để đựng nông sản và đồ đạc.",
    images: khoSanBanImages,
  },
  {
    id: 6,
    title: "K'HO SINH HOẠT THƯỜNG NHẬT",
    description: "Tìm hiểu về đời sống hàng ngày của người K'ho.",
    fullDescription:
      "Tìm hiểu về đời sống hàng ngày của người K'ho qua các vật dụng sinh hoạt như nồi đất, bầu hồ lô.",
    image: sinhoatThumb,
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Nồi đất và bầu hồ lô là những vật dụng thiết yếu trong sinh hoạt hàng ngày của người K'ho.",
    images: khoSinhHoatImages,
  },
  {
    id: 7,
    title: "PHỨC TẦNG",
    description: "Tham quan trải nghiệm thiên nhiên của đồi thông.",
    fullDescription:
      "Tham quan trải nghiệm thiên nhiên của đồi thông, từ các đồi thông đến các đồi thông khác.",
    image: phuctangThumb,
    duration: "1H",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Đồi thông là biểu tượng của sự bền vững và tín ngưỡng thiêng liêng trong đời sống người dân Tây Nguyên.",
    images: phucTangImages,
  },
  {
    id: 8,
    title: "VẬT LIỆU",
    description: "Tham quan vật liệu của người Tây Nguyên.",
    image: vatlieuThumb,
    duration: "30P",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Vật liệu là biểu tượng của sự bền vững và tín ngưỡng thiêng liêng trong đời sống người dân Tây Nguyên.",
    images: vatlieuImages,
  },
];

const VisitorTrailDetailPage = () => {
  const { id } = useParams();
  const [trail, setTrail] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    // Find the trail by id and preload image
    const foundTrail = trailsData.find((t) => t.id === parseInt(id));

    if (foundTrail) {
      // Preload hero image
      const img = new Image();
      img.src = foundTrail.image;
      img.onload = () => setImageLoaded(true);

      setTrail(foundTrail);
      document.title = `${foundTrail.title} | Musée Du Pin`;
    }
  }, [id]);

  if (!trail) {
    return <div className="trail-detail-page">Đang tải...</div>;
  }

  return (
    <div className="trail-detail-page">
      {/* Hero Section - Optimized with loading state */}
      <div className={`trail-detail-hero ${imageLoaded ? "loaded" : ""}`}>
        <img
          src={trail.image}
          alt={trail.title}
          className="trail-detail-hero-image"
          loading="eager"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />
        <div className="trail-detail-hero-overlay"></div>

        <Link to="/visitor-trails" className="trail-detail-back">
          <BackIcon /> Quay lại
        </Link>

        <div className="trail-detail-duration">
          <ClockIcon /> {trail.duration}
        </div>

        <div className="trail-detail-content">
          <h1 className="trail-detail-title">{trail.title}</h1>
          <p className="trail-detail-description">{trail.fullDescription}</p>
          <Link
            to={`/visitor-trails/${id}/experience/1`}
            className="trail-detail-start-btn"
          >
            Bắt đầu <ArrowRightIcon />
          </Link>
        </div>
      </div>

      {/* Accessibility Info - Add fade-in animation */}
      <div className="trail-detail-info animate-on-scroll">
        <h3 className="trail-detail-info-title">Mở cửa vào:</h3>
        <p className="trail-detail-info-content">{trail.accessibility}</p>
      </div>

      {/* Introduction - Add fade-in animation */}
      <div className="trail-detail-introduction animate-on-scroll">
        <h2 className="trail-detail-introduction-title">Giới thiệu</h2>
        <p className="trail-detail-introduction-content">
          {trail.introduction}
        </p>
      </div>

      {/* Museum Map Section - Add fade-in animation */}
      <div className="trail-detail-map-section animate-on-scroll">
        <div className="trail-detail-map-content">
          <h3 className="trail-detail-map-title">Cần trợ giúp tìm đường?</h3>
          <p className="trail-detail-map-description">
            Xem bản đồ tương tác của bảo tàng để biết chỉ dẫn, lối vào và vị trí
            các phòng.
          </p>
          <Link to="/museum-map" className="trail-detail-map-btn">
            <MapIcon /> Xem bản đồ bảo tàng
          </Link>
        </div>
      </div>
    </div>
  );
};

// Prevent unnecessary re-renders
export default React.memo(VisitorTrailDetailPage);
