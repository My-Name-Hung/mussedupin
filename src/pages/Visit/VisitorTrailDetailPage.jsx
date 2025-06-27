import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getImageUrl } from "../../utils/cloudinary";
import "./VisitorTrailDetailPage.css";

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
    image: "Cồng Chiên.webp",
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Cồng chiêng là nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, là biểu tượng văn hóa và tín ngưỡng thiêng liêng.",
    images: [
      "Cồng Chiên.webp",
      "DSC_2473.webp",
      "DSC_2475.webp",
      "DSC_2486.webp",
      "DSC_2498.webp",
      "17 (2).webp",
      "17 (3).webp",
      "17 (4).webp",
      "17 (5).webp",
      "17 (7).webp",
      "38 (1).webp",
      "38 (2).webp",
    ],
  },
  {
    id: 2,
    title: "Hơi thở đại ngàn",
    description:
      "Khám phá các công cụ và phương thức chăn nuôi truyền thống của người K'ho.",
    fullDescription:
      "Khám phá các công cụ và phương thức chăn nuôi truyền thống của người K'ho, từ lồng đa đa đến các vật dụng chăn nuôi khác.",
    image: "Lồng Đa Đa.webp",
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Lồng đa đa của người K'ho được đan thủ công từ tre nứa, thể hiện sự khéo léo và mối liên kết với thiên nhiên.",
    images: [
      "Lồng Đa Đa.webp",
      "3 (1).webp",
      "3 (2).webp",
      "3 (3).webp",
      "3 (4).webp",
      "3.webp",
      "4 (2).webp",
    ],
  },
  {
    id: 3,
    title: "Lửa thiêng đêm núi",
    description:
      "Tìm hiểu về các lễ hội truyền thống và nghi thức văn hóa của người K'ho.",
    fullDescription:
      "Tìm hiểu về các lễ hội truyền thống và nghi thức văn hóa của người K'ho thông qua các hiện vật như Ché Ghò Sành.",
    image: "36 (2).webp",
    duration: "1H",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, là biểu tượng của sự giàu có và tín ngưỡng.",
    images: [
      "36 (1).webp",
      "36 (2).webp",
      "18 (2).webp",
      "18 (3).webp",
      "18 (4).webp",
      "Lễ Hội.webp",
    ],
  },
  {
    id: 4,
    title: "Hình hài bản sắc",
    description:
      "Chiêm ngưỡng nghệ thuật điêu khắc truyền thống của người K'ho.",
    fullDescription:
      "Chiêm ngưỡng nghệ thuật điêu khắc truyền thống của người K'ho qua các tác phẩm tượng và điêu khắc tinh xảo.",
    image: "Điêu Khắc.webp",
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Nghệ thuật điêu khắc K'ho thể hiện đặc trưng văn hóa và đời sống tinh thần của dân tộc.",
    images: [
      "Điêu Khắc.webp",
      "20 (1).webp",
      "20 (2).webp",
      "20 (3).webp",
      "20 (4).webp",
      "20 (5).webp",
      "21 (1).webp",
      "21 (2).webp",
      "21 (3).webp",
      "21 (4).webp",
      "21 (5).webp",
      "22 (1).webp",
      "22 (2).webp",
      "22 (3).webp",
      "22 (4).webp",
      "22 (5).webp",
      "23 (1).webp",
      "23 (2).webp",
      "23 (3).webp",
      "23 (4).webp",
      "23 (5).webp",
      "24 (1).webp",
      "24 (2).webp",
      "24 (3).webp",
      "24 (4).webp",
      "25 (1).webp",
      "25 (2).webp",
      "25 (3).webp",
      "26  (1).webp",
      "26  (2).webp",
      "26  (3).webp",
      "26  (4).webp",
      "26  (5).webp",
      "26  (6).webp",
      "27 (1).webp",
      "27 (2).webp",
      "27 (3).webp",
      "27 (4).webp",
      "27 (5).webp",
      "28 (1).webp",
      "28 (2).webp",
    ],
  },
  {
    id: 5,
    title: "Những mùa no ấm",
    description:
      "Khám phá các công cụ săn bắn, hái lượm và canh tác truyền thống.",
    fullDescription:
      "Khám phá các công cụ săn bắn, hái lượm và canh tác truyền thống của người K'ho.",
    image: "Chiếc Gùi.webp",
    duration: "1H",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Chiếc gùi - vật dụng không thể thiếu trong đời sống của người K'ho, dùng để đựng nông sản và đồ đạc.",
    images: [
      "Chiếc Gùi.webp",
      "1 (2).webp",
      "1(3).webp",
      "1(4).webp",
      "1.webp",
      "2 (1).webp",
      "2 (3).webp",
      "2 .webp",
      "5.webp",
      "6.webp",
      "7 (1).webp",
      "7 (2).webp",
      "7 (3).webp",
      "8 (1).webp",
      "8 (2).webp",
      "8 (3).webp",
      "9 (1).webp",
      "9 (2).webp",
      "9 (3).webp",
      "10 (1).webp",
      "10 (2).webp",
      "10 (3).webp",
      "11.webp",
      "12 (1).webp",
      "12 (2).webp",
      "13 (1).webp",
      "13 (2).webp",
      "13 (3).webp",
      "14 (1).webp",
      "14 (2).webp",
      "14 (3).webp",
      "15 (1).webp",
      "15 (2).webp",
      "15 (3).webp",
      "30 (1).webp",
      "30 (2).webp",
      "37 (2).webp",
      "37 (3).webp",
      "37 (4).webp",
      "45 (1).webp",
    ],
  },
  {
    id: 6,
    title: "Hơi ấm buôn làng",
    description: "Tìm hiểu về đời sống hàng ngày của người K'ho.",
    fullDescription:
      "Tìm hiểu về đời sống hàng ngày của người K'ho qua các vật dụng sinh hoạt như nồi đất, bầu hồ lô.",
    image: "Nồi Đất.webp",
    duration: "1H30",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Nồi đất và bầu hồ lô là những vật dụng thiết yếu trong sinh hoạt hàng ngày của người K'ho.",
    images: [
      "Nồi Đất.webp",
      "16 (1).webp",
      "16 (2).webp",
      "19 (1).webp",
      "19 (2).webp",
      "31 (1).webp",
      "31 (2).webp",
      "32 (1).webp",
      "32 (2).webp",
      "32 (3).webp",
      "33 (1).webp",
      "33 (2).webp",
      "34 (1).webp",
      "34 (2).webp",
      "35 (1).webp",
      "35 (2).webp",
      "39.webp",
      "40.webp",
      "41.webp",
      "42.webp",
      "43 (1).webp",
      "43 (2).webp",
      "46.webp",
    ],
  },
  {
    id: 7,
    title: "PHỨC TẦNG",
    description: "Tham quan trải nghiệm thiên nhiên của đồi thông.",
    fullDescription:
      "Tham quan trải nghiệm thiên nhiên của đồi thông, từ các đồi thông đến các đồi thông khác.",
    image: "Thông 2.webp",
    duration: "1H",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Đồi thông là biểu tượng của sự bền vững và tín ngưỡng thiêng liêng trong đời sống người dân Tây Nguyên.",
    images: [
      "Thông 1.webp",
      "Thông 2.webp",
      "Thông 3.webp",
      "Thông 4.webp",
      "Cô đơn.webp",
      "Gào thét.webp",
      "Lãng du.webp",
      "Mênh mang.webp",
      "Trầm mặc.webp",
    ],
  },
  {
    id: 8,
    title: "VẬT LIỆU",
    description: "Tham quan vật liệu của người Tây Nguyên.",
    image: "Hoa Ban Trắng.webp",
    duration: "30P",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Vật liệu là biểu tượng của sự bền vững và tín ngưỡng thiêng liêng trong đời sống người dân Tây Nguyên.",
    images: [
      "Hoa Ban Trắng.webp",
      "Bình yên 1.webp",
      "Bình Yên 2.webp",
      "Dâu tây.webp",
      "Hoài Niệm.webp",
      "Hoàng hôn.webp",
      "Thác đổ.webp",
      "Toa Tàu.webp",
      "Tuổi ấu thơ.webp",
      "Ống khói.webp",
    ],
  },
  {
    id: 9,
    title: "Redpine Art Studio",
    description: "Không gian lưu trú nghệ thuật giữa rừng thông Đà Lạt.",
    image: "luutrunghethuat.jpg",
    duration: "45P",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Redpine Art Studio là không gian lưu trú nghệ thuật độc đáo giữa rừng thông, nơi bạn có thể trải nghiệm nghệ thuật và thiên nhiên Đà Lạt.",
    images: [
      "thechillhood.jpg",
      "thechill1.jpg",
      "thechill2.jpg",
      "whitebauhinia.jpg",
      "thememory.jpg",
      "thesunset.jpg",
      "thetrain.jpg",
    ],
  },
  {
    id: 10,
    title: "Bề mặt ký ức",
    description: "Bộ sưu tập về ký ức và hoài niệm.",
    image: "Lửa.webp",
    duration: "45P",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Bộ sưu tập về ký ức và hoài niệm, từ các bức ảnh đến các đồ vật lưu trữ ký ức.",
    images: [
      "Bidoup.webp",
      "bình yên 1 (1).webp",
      "bình yên 1 (2).webp",
      "bình yên 2 (1).webp",
      "bình yên 2 (2).webp",
      "bình yên 2 (3).webp",
      "chiếc tổ (1).webp",
      "chiếc tổ (2).webp",
      "Đạ Lạch.webp",
      "dâu tây.webp",
      "Dung nham.webp",
      "ga xe lửa (1).webp",
      "ga xe lửa (2).webp",
      "ga xe lửa (3).webp",
      "ga xe lửa (4).webp",
      "ga xe lửa (5).webp",
      "ga xe lửa (6).webp",
      "ký ức.webp",
      "Langbiang3.webp",
      "Lửa.webp",
      "Dung nham.webp",
      "ống khói (2).webp",
      "ống khói (3).webp",
      "ống khói (4).webp",
      "Rạn 1.webp",
      "Rạn 2.webp",
      "Rạn 3.webp",
      "thác đổ (1).webp",
      "thác đổ (2).webp",
      "thác đổ (3).webp",
      "thác đổ (4).webp",
      "thác đổ (5).webp",
      "The Sunrise.webp",
      "The Sunset 1.webp",
      "The Sunset 2.webp",
      "Thông 1-1(1).webp",
      "Thông 1-1.webp",
      "Thông 1-2.webp",
      "Thông 1-3.webp",
      "Thông 2-1.webp",
      "Thông 2-2.webp",
      "Thông 3.webp",
      "Thông bì 1.webp",
      "Thông bì 2.webp",
      "Thông cháy 1.webp",
      "Thông cháy 2.webp",
    ],
  },
  {
    id: 11,
    title: "Thiên nhiên Đà Lạt",
    description: "Bộ sưu tập về thiên nhiên Đà Lạt.",
    image: "Gió.webp",
    duration: "45P",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Thiên nhiên Đà Lạt là một trong những điểm đến hấp dẫn nhất trong khu vực, với những dãy núi, thác nước và rừng thông tạo nên một khung cảnh tuyệt vời.",
    images: [
      "Sương sớm.webp",
      "Hoàng hôn Đà Lạt.webp",
      "Gió.webp",
      "Bình Minh.webp",
    ],
  },
  {
    id: 12,
    title: "Sắc màu Tây nguyên",
    description: "Bộ sưu tập về sắc màu Tây Nguyên.",
    image: "Đông.webp",
    duration: "45P",
    audioGuide: true,
    accessibility: "Thứ Hai, Thứ Tư, Thứ Năm, Thứ Sáu, Thứ Bảy và Chủ Nhật",
    introduction:
      "Sắc màu Tây Nguyên là một trong những điểm đến hấp dẫn nhất trong khu vực, với những dãy núi, thác nước và rừng thông tạo nên một khung cảnh tuyệt vời.",
    images: ["Đông.webp", "Xuân.webp", "Thu.webp", "Hạ.webp"],
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
      img.src = getImageUrl(foundTrail.image);
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
          src={getImageUrl(trail.image)}
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
            to={`/trail-experience/${id}`}
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
