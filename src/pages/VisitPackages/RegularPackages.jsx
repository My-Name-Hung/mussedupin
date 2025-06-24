import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./VisitPackages.css";

const translations = {
  "dem-huyen-thoai": {
    vi: {
      title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
      description:
        "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
      details: [
        "Tham quan có hướng dẫn viên các không gian bảo tàng",
        "Trải nghiệm sân khấu tương tác điện ảnh với câu chuyện K'Ho",
        "01 thức uống + 01 snack",
        "Thước phim điện ảnh",
      ],
    },
    en: {
      title: "LANGBIANG LEGENDARY NIGHT TOUR",
      description:
        "Interactive mini-show where visitors become characters exploring cultural mysteries",
      details: [
        "Guided museum space tours",
        "Interactive cinematic stage experience with K'Ho story",
        "01 drink + 01 snack",
        "Cinematic film strip",
      ],
    },
  },
  "giai-dieu-dai-ngan": {
    vi: {
      title: "GIAI ĐIỆU ĐẠI NGÀN - LẮNG NGHE THÔNG HÁT",
      description: "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
      details: ["Rượu vang", "Thức ăn nhẹ", "Âm nhạc theo chủ đề"],
    },
    en: {
      title: "GREAT FOREST MELODIES - PINE RUSTLING",
      description: "Monthly themed acoustic concerts",
      details: ["Wine", "Light refreshments", "Themed music"],
    },
  },
  "uom-mam-sang-tao": {
    vi: {
      title: "ƯƠM MẦM SÁNG TẠO",
      description: "Các gói trải nghiệm cho bé",
      details: [
        "Workshop: Tay nặn tay vẽ hoặc chế tác đồ thủ công từ thông",
        "Chụp ảnh nghệ thuật tại bảo tàng",
        "01 thức uống + 01 snack",
      ],
    },
    en: {
      title: "CREATIVE SEEDLINGS",
      description: "Experience packages for children",
      details: [
        "Workshop: Hand molding, drawing or pine crafting",
        "Artistic photography at the museum",
        "01 drink + 01 snack",
      ],
    },
  },
};

const RegularPackages = () => {
  const navigate = useNavigate();
  const [currentLang, setCurrentLang] = useState("vi");

  // Listen for language changes from GTranslate
  useEffect(() => {
    const checkLanguage = () => {
      const htmlLang = document.documentElement.lang;
      setCurrentLang(htmlLang === "en" ? "en" : "vi");
    };

    // Initial check
    checkLanguage();

    // Create observer to watch for changes in html lang attribute
    const observer = new MutationObserver(checkLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => observer.disconnect();
  }, []);

  const packages = [
    {
      id: "dem-huyen-thoai",
      title: translations["dem-huyen-thoai"][currentLang].title,
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Tourdemhuyenthoai_Ngoai.jpg?updatedAt=1749312109824",
      orientation: "landscape",
      description: translations["dem-huyen-thoai"][currentLang].description,
      price: "499.000",
      time: "19:00 - 21:00",
      schedule: currentLang === "en" ? "Tue-Thu weekly" : "T3-T5 hàng tuần",
      details: translations["dem-huyen-thoai"][currentLang].details,
    },
    {
      id: "giai-dieu-dai-ngan",
      title: translations["giai-dieu-dai-ngan"][currentLang].title,
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Ngoai.jpg?updatedAt=1749312109958",
      orientation: "landscape",
      description: translations["giai-dieu-dai-ngan"][currentLang].description,
      price: "799.000",
      time: "19:00 - 22:30",
      schedule: currentLang === "en" ? "Fri-Sat-Sun" : "Thứ 6-T7-CN",
      details: translations["giai-dieu-dai-ngan"][currentLang].details,
    },
    {
      id: "uom-mam-sang-tao",
      title: translations["uom-mam-sang-tao"][currentLang].title,
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/uommamsangtao_Ngoai.jpg?updatedAt=1749311934281",
      orientation: "landscape",
      description: translations["uom-mam-sang-tao"][currentLang].description,
      price: "299.000",
      time:
        currentLang === "en"
          ? "Morning: 8am - 12pm, Afternoon: 2pm - 6pm"
          : "Sáng: 8h - 12h, Chiều: 14h - 18h",
      details: translations["uom-mam-sang-tao"][currentLang].details,
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
            src="https://ik.imagekit.io/8u8lkoqkkm/Chuongtrinhdinhky_Trong.jpg?updatedAt=1749268863163"
            alt={
              currentLang === "en" ? "Regular Programs" : "Chương trình định kỳ"
            }
            className="hero-image portrait"
          />
        </div>
        <div className="packages-hero-content">
          <h1 className="packages-title">
            {currentLang === "en" ? "REGULAR PROGRAMS" : "CHƯƠNG TRÌNH ĐỊNH KỲ"}
          </h1>
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
