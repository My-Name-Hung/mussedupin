import React, { useEffect } from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
import "./VisitPackages.css";

const translations = {
  "dem-thong": {
    vi: {
      title: "ĐÊM THÔNG",
      description:
        "Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên.",
      details: [
        "Thưởng thức trà atiso chào mừng",
        "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
        "Lưu trú 1 đêm",
        "Bữa sáng với đặc sản địa phương",
      ],
    },
    en: {
      title: "PINE NIGHT",
      description:
        "A tranquil space for rest, connecting inner self with nature.",
      details: [
        "Welcome artichoke tea",
        "Tour and presentation about your art room accommodation",
        "One night stay",
        "Breakfast with local specialties",
      ],
    },
  },
  "bong-cay-konia": {
    vi: {
      title: "BÓNG CÂY KƠNIA",
      description:
        "Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp",
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
    en: {
      title: "KONIA TREE SHADE",
      description:
        "A journey exploring thousand-year-old primitive forests combined with luxury stays",
      details: [
        "Welcome artichoke tea",
        "Tour and presentation about your art room accommodation",
        "One night stay",
        "Breakfast with local specialties",
        "Guided museum space tours",
        "Ancient forest discovery tour",
        "Complimentary art photo session (1 hour)",
      ],
    },
  },
  "truong-ca-langbiang": {
    vi: {
      title: "TRƯỜNG CA LANGBIANG",
      description:
        "Trải nghiệm toàn diện như bản trường ca sống động nhất về Đà Lạt.",
      details: [
        "Đưa đón từ sân bay Liên Khương bằng xe VIP",
        "Lưu trú 1 đêm tại phòng nghệ thuật",
        "Tour VIP tham quan toàn bộ bảo tàng + Rừng nguyên sinh",
        'Chương trình "Thông Hát" riêng tư + Rượu vang hảo hạng',
        "Workshop Vẽ tranh, dệt thổ cẩm hoặc nấu ăn cùng nghệ nhân",
        "Bộ ảnh nghệ thuật chuyên nghiệp",
      ],
    },
    en: {
      title: "LANGBIANG EPIC",
      description: "The most vivid and comprehensive Da Lat experience.",
      details: [
        "VIP transfer from Lien Khuong airport",
        "One night stay in art room",
        "VIP tour of entire museum + Primitive forest",
        'Private "Pine Singing" program + Premium wine',
        "Painting, brocade weaving or cooking workshop with artisans",
        "Professional art photo collection",
      ],
    },
  },
};

const ResidentialPackages = () => {
  const navigate = useNavigate();
  const { currentLang, registerTranslations } = useTranslation();

  // Register translations on mount
  useEffect(() => {
    registerTranslations("residentialPackages", translations);
  }, [registerTranslations]);

  const packages = [
    {
      id: "dem-thong",
      title: translations["dem-thong"][currentLang].title,
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/DemThong_Ngoai.jpg?updatedAt=1749312390523",
      orientation: "landscape",
      description: translations["dem-thong"][currentLang].description,
      price: "499.000 - 899.000",
      details: translations["dem-thong"][currentLang].details,
    },
    {
      id: "bong-cay-konia",
      title: translations["bong-cay-konia"][currentLang].title,
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/bongcay-ngang.png?updatedAt=1750002737098",
      orientation: "landscape",
      description: translations["bong-cay-konia"][currentLang].description,
      price:
        currentLang === "en"
          ? "Contact: +84 86 235 6368"
          : "Liên hệ: +84 86 235 6368",
      details: translations["bong-cay-konia"][currentLang].details,
    },
    {
      id: "truong-ca-langbiang",
      title: translations["truong-ca-langbiang"][currentLang].title,
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/truongcaLBA_ngang.jpg?updatedAt=1749269172336",
      orientation: "square",
      description: translations["truong-ca-langbiang"][currentLang].description,
      price:
        currentLang === "en"
          ? "Contact: +84 86 235 6368"
          : "Liên hệ: +84 86 235 6368",
      details: translations["truong-ca-langbiang"][currentLang].details,
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
            src="https://ik.imagekit.io/8u8lkoqkkm/Luutru_Trong.jpg?updatedAt=1749268862975"
            alt={
              currentLang === "en" ? "Accommodation Packages" : "Gói lưu trú"
            }
            className="hero-image portrait"
          />
        </div>
        <div className="packages-hero-content">
          <h1 className="packages-title">
            {currentLang === "en" ? "ACCOMMODATION PACKAGES" : "GÓI LƯU TRÚ"}
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

export default ResidentialPackages;
