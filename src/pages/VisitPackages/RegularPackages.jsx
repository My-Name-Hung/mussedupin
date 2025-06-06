import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./VisitPackages.css";

const RegularPackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: "dem-huyen-thoai",
      title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
      orientation: "landscape",
      description:
        "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
      price: "499.000",
      time: "19:00 - 21:00",
      schedule: "T3-T5 hàng tuần",
      details: [
        "Tham quan có hướng dẫn viên các không gian bảo tàng",
        "Trải nghiệm sân khấu tương tác điện ảnh với câu chuyện K'Ho",
        "01 thức uống + 01 snack",
        "Thước phim điện ảnh",
      ],
    },
    {
      id: "giai-dieu-dai-ngan",
      title: "GIAI ĐIỆU ĐẠI NGÀN - LẮNG NGHE THÔNG HÁT",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
      orientation: "landscape",
      description: "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
      price: "799.000",
      time: "19:00 - 22:30",
      schedule: "Thứ 6-T7-CN",
      details: ["Rượu vang", "Thức ăn nhẹ", "Âm nhạc theo chủ đề"],
    },
    {
      id: "uom-mam-sang-tao",
      title: "ƯƠM MẦM SÁNG TẠO",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
      orientation: "portrait",
      description: "Các gói trải nghiệm cho bé",
      price: "299.000",
      time: "Sáng: 8h - 12h, Chiều: 14h - 18h",
      details: [
        "Workshop: Tay nặn tay vẽ hoặc chế tác đồ thủ công từ thông",
        "Chụp ảnh nghệ thuật tại bảo tàng",
        "01 thức uống + 01 snack",
      ],
    },
  ];

  return (
    <div className="packages-container">
      <div className="packages-hero">
        <button className="back-button1" onClick={() => navigate("/visit")}>
          <MdArrowBack />
        </button>
        <div className="hero-image-container">
          <img
            src="https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859"
            alt="Chương trình định kỳ"
            className="hero-image portrait"
          />
        </div>
        <div className="packages-hero-content">
          <h1 className="packages-title">Chương trình định kỳ</h1>
        </div>
      </div>

      <div className="packages-content">
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="visit-cardss"
              onClick={() => navigate(`/visit/package/${pkg.id}`)}
            >
              <div className="visit-cards-img-wrap">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className={`visit-cards-img ${pkg.orientation}`}
                />
                <div className="visit-cards-overlay" />
                <div className="visit-card-content">
                  <h2>{pkg.title}</h2>
                  <p>{pkg.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RegularPackages;
