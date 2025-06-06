import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./VisitPackages.css";

const ResidentialPackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: "dem-thong",
      title: "ĐÊM THÔNG",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
      orientation: "landscape",
      description:
        "Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên.",
      price: "499.000 - 899.000",
      details: [
        "Thưởng thức trà atiso chào mừng",
        "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
        "Lưu trú 1 đêm",
        "Bữa sáng với đặc sản địa phương",
      ],
    },
    {
      id: "bong-cay-konia",
      title: "BÓNG CÂY KƠNIA",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
      orientation: "landscape",
      description:
        "Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp",
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
    },
    {
      id: "truong-ca-langbiang",
      title: "TRƯỜNG CA LANGBIANG",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/daa23646b65e02005b4f.jpg?updatedAt=1749083704100",
      orientation: "portrait",
      description:
        "Trải nghiệm toàn diện như bản trường ca sống động nhất về Đà Lạt – từ nghệ thuật, thiên nhiên đến âm nhạc. Trọn vẹn cảm xúc 5 giác quan",
      price: "Liên hệ: +84 86 235 6368",
      details: [
        "Đưa đón từ sân bay Liên Khương bằng xe VIP",
        "Lưu trú 1 đêm tại phòng nghệ thuật",
        "Tour VIP tham quan toàn bộ bảo tàng + Rừng nguyên sinh",
        'Chương trình "Thông Hát" riêng tư + Rượu vang hảo hạng',
        "Workshop Vẽ tranh, dệt thổ cẩm hoặc nấu ăn cùng nghệ nhân",
        "Bộ ảnh nghệ thuật chuyên nghiệp",
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
            src="https://ik.imagekit.io/8u8lkoqkkm/daa23646b65e02005b4f.jpg?updatedAt=1749083704100"
            alt="Gói lưu trú"
            className="hero-image portrait"
          />
        </div>
        <div className="packages-hero-content">
          <h1 className="packages-title">Gói lưu trú</h1>
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

export default ResidentialPackages;
