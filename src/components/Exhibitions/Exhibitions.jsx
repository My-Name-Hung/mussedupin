import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAssets } from "../../hooks/useAssets";
import TranslatedText from "../TranslatedText";

// Import hero image
// import hero from "../../assets/home/Hero/louvre-sunset.webp";

// Import optimized images
// import langbiang from "../../assets/home/About/nha.webp";
// import bauho from "../../assets/home/Exhibitions/Bauholo_cards.webp";
// import thong2 from "../../assets/home/Exhibitions/Thông 2.webp";

import "./Exhibitions.css";

// Exhibition data based on highlights
const exhibitionsData = [
  {
    id: 1,
    title: "Không gian nghệ thuật Langbiang",
    subtitle: "",
    description:
      "Khi nghệ thuật không chỉ để ngắm, mà để sống cùng và sống trong. Không có tủ kính ngăn cách. Không có rào chắn giữa người và hiện vật. Langbiang không đơn thuần là một căn phòng, mà là một vùng ký ức sống, nơi hồn cốt của núi rừng thở trong từng vật phẩm, cháy trong từng ngọn lửa bếp, ngân nga trong từng tiếng cồng chiêng.",
    date: "30 tháng 4 - 28 tháng 7 2025",
    image: "langbiang.webp",
    alt: "Không gian nghệ thuật Langbiang",
    tag: "Trưng bày",
    link: "/exhibition-details/langbiang-khong-gian",
    featured: true,
  },
  {
    id: 2,
    title: "Phức tầng",
    subtitle: "Thiên nhiên",
    description:
      "In lên mây, những hàng thông điệp khúc,\nTrên triền dốc, những nếp nhà khảm vào nhau,\nBao than thở chất chồng in bóng mặt hồ.\nTrong lòng lữ khách độc hành\nTrái thông khô mở vảy.",
    date: "24 tháng 1 - 21 tháng 7 2025",
    image: "thong2.webp",
    alt: "Đà Lạt những phức tầng trầm mặc",
    tag: "Trưng bày",
    link: "/exhibition-details/phuc-tang-tram-mac",
    featured: false,
  },

  // {
  //   id: 2,
  //   title: "K'ho chăn nuôi",
  //   subtitle: "Lồng đa đa",
  //   description:
  //     "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên. Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
  //   date: "24 tháng 1 - 21 tháng 7 2025",
  //   image: longda,
  //   alt: "K'ho chăn nuôi",
  //   tag: "Trưng bày",
  //   link: "/exhibition-details/long-da-da",
  //   featured: false,
  // },
  // {
  //   id: 3,
  //   title: "K'ho điêu khắc",
  //   subtitle: "Tượng phụ nữ",
  //   description:
  //     "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa. Tác phẩm mang đậm phong cách mộc mạc nhưng đầy chiều sâu văn hóa, phản ánh vẻ đẹp nội tâm, tinh thần kiên cường và vai trò quan trọng của người phụ nữ trong đời sống cộng đồng K'ho.",
  //   date: "22 tháng 1 - 12 tháng 5 2025",
  //   image: phunu,
  //   alt: "K'ho điêu khắc",
  //   tag: "Trưng bày",
  //   link: "/exhibition-details/tuong-phu-nu",
  //   featured: false,
  // },
  // {
  //   id: 4,
  //   title: "K'ho lễ hội",
  //   subtitle: "Ché Ghò Sành",
  //   description:
  //     "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin, đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
  //   date: "29 tháng 2 - 28 tháng 9 2025",
  //   image: cheghosanh,
  //   alt: "K'ho lễ hội",
  //   tag: "Trưng bày",
  //   link: "/exhibition-details/che-gho-sanh",
  //   featured: false,
  // },
  // {
  //   id: 5,
  //   title: "K'ho sinh hoạt thường nhật",
  //   subtitle: "Nồi đất",
  //   description:
  //     "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn, thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình",
  //   date: "Trưng bày thường xuyên",
  //   image: noidat,
  //   alt: "K'ho sinh hoạt thường nhật",
  //   tag: "Trưng bày",
  //   link: "/exhibition-details/noi-dat",
  //   featured: false,
  // },
  // {
  //   id: 6,
  //   title: "Vật liệu",
  //   subtitle: "Chất liệu K'ho",
  //   description:
  //     "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên. Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
  //   date: "Trưng bày thường xuyên",
  //   image: hoabantrang,
  //   alt: "Vật liệu",
  //   tag: "Trưng bày",
  //   link: "/exhibition-details/vat-lieu",
  //   featured: false,
  // },
];

// Sample guided tours data
const guidedToursData = [
  {
    id: 1,
    title: "K'ho sinh hoạt thường nhật",
    subtitle: "Bầu hồ lô",
    description:
      "Được khoét rỗng từ quả hồ lô khô, vật phẩm này thường được dùng để đựng nước, rượu cần hoặc làm nhạc cụ truyền thống",
    duration: "1 tiếng 30 phút",
    image: "bauho.webp",
    alt: "K'ho sinh hoạt thường nhật",
    tag: "Tham quan",
    link: "/exhibition-details/bau-ho-lo",
    featured: true,
  },
];

const Exhibitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const heroRef = useRef(null);
  const { assets, getAssetUrl } = useAssets();

  // Check for tab parameter in URL
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam === "guided-tours" ? "guided-tours" : "exhibitions"
  );
  const [pageLoaded, setPageLoaded] = useState(false);

  // Effect to handle loading animation
  useEffect(() => {
    setPageLoaded(true);

    // Add a small animation to the hero section
    if (heroRef.current) {
      heroRef.current.style.opacity = "0";
      heroRef.current.style.transform = "translateY(20px)";

      setTimeout(() => {
        heroRef.current.style.opacity = "1";
        heroRef.current.style.transform = "translateY(0)";
        heroRef.current.style.transition =
          "opacity 0.8s ease, transform 0.8s ease";
      }, 100);
    }
  }, []);

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    setActiveTab(tab);

    // Update URL without page reload
    navigate(
      `/exhibitions${tab === "guided-tours" ? "?tab=guided-tours" : ""}`,
      { replace: true }
    );
  };

  // Effect to update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = queryParams.get("tab");
    if (tabFromUrl === "guided-tours" && activeTab !== "guided-tours") {
      setActiveTab("guided-tours");
    } else if (!tabFromUrl && activeTab !== "exhibitions") {
      setActiveTab("exhibitions");
    }
  }, [location.search]);

  // Map exhibitionData and guidedToursData to use asset URLs
  const exhibitionsDataWithAssets = exhibitionsData.map((item) => {
    const asset = assets.find(
      (a) => a.filename && item.image.includes(a.filename)
    );
    return asset
      ? { ...item, image: asset.url || getAssetUrl(asset.filename) }
      : item;
  });
  const guidedToursDataWithAssets = guidedToursData.map((item) => {
    const asset = assets.find(
      (a) => a.filename && item.image.includes(a.filename)
    );
    return asset
      ? { ...item, image: asset.url || getAssetUrl(asset.filename) }
      : item;
  });
  const activeData =
    activeTab === "exhibitions"
      ? exhibitionsDataWithAssets
      : guidedToursDataWithAssets;

  return (
    <div className="exhibitions-page">
      {/* Hero Section with background image */}
      <div className="exhibitions-hero" ref={heroRef}>
        <div className="exhibitions-hero-overlay">
          {/* <img src={hero} alt="Bảo tàng" /> */}
        </div>
        <div className="exhibitions-hero-content">
          <h1 className="exhibitions-hero-title">
            <TranslatedText>
              {activeTab === "exhibitions" ? "TRƯNG BÀY" : "THAM QUAN"}
            </TranslatedText>
          </h1>
          <p className="exhibitions-hero-subtitle">
            <TranslatedText>
              {activeTab === "exhibitions"
                ? "Khám phá các cuộc trưng bày hiện tại và sắp tới"
                : "Khám phá bảo tàng cùng hướng dẫn viên chuyên nghiệp"}
            </TranslatedText>
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="exhibitions-tabs-container">
        <div className="exhibitions-tabs">
          <button
            className={`tab-button ${
              activeTab === "exhibitions" ? "active" : ""
            }`}
            onClick={() => handleTabChange("exhibitions")}
            aria-label="Hiển thị trưng bày"
          >
            <TranslatedText>TRƯNG BÀY</TranslatedText>
          </button>
          <button
            className={`tab-button ${
              activeTab === "guided-tours" ? "active" : ""
            }`}
            onClick={() => handleTabChange("guided-tours")}
            aria-label="Hiển thị tham quan"
          >
            <TranslatedText>THAM QUAN</TranslatedText>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="exhibitions-container">
        {/* Featured Exhibition */}
        {activeData.filter((item) => item.featured).length > 0 && (
          <div className="featured-exhibition">
            {activeData
              .filter((item) => item.featured)
              .map((item) => (
                <div
                  key={item.id}
                  className={`exhibition-card-wrapper featured ${
                    pageLoaded ? "visible" : ""
                  }`}
                >
                  <div className="exhibition-card featured-card">
                    <div className="card-tag">
                      <span>
                        <TranslatedText>{item.tag}</TranslatedText>
                      </span>
                    </div>
                    <Link to={item.link} className="card-link-wrapper">
                      <div className="card-image-container">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="card-image"
                          loading="eager"
                        />
                      </div>
                      <div className="card-content">
                        <h2 className="card-title">
                          <TranslatedText>{item.title}</TranslatedText>
                        </h2>
                        {/* <h3 className="card-subtitle">
                          <TranslatedText>{item.subtitle}</TranslatedText>
                        </h3> */}
                        <p className="card-description">
                          <TranslatedText>{item.description}</TranslatedText>
                        </p>
                        <div className="card-footer">
                          <span className="card-date">
                            <TranslatedText>
                              {activeTab === "exhibitions"
                                ? item.date
                                : `Thời gian: ${item.duration}`}
                            </TranslatedText>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Grid of Exhibitions */}
        <div className="exhibitions-grid" ref={gridRef}>
          {activeData
            .filter((item) => !item.featured)
            .map((item, index) => (
              <div
                key={item.id}
                className={`exhibition-card-wrapper ${
                  pageLoaded ? "visible" : ""
                }`}
                style={{
                  transitionDelay: !pageLoaded ? `${index * 0.1}s` : "0s",
                }}
              >
                <div className="exhibition-card">
                  <div className="card-tag">
                    <span>
                      <TranslatedText>{item.tag}</TranslatedText>
                    </span>
                  </div>
                  <Link to={item.link} className="card-link-wrapper">
                    <div className="card-image-container">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="card-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="card-content">
                      <h2 className="card-title">
                        <TranslatedText>{item.title}</TranslatedText>
                      </h2>
                      {/* <h3 className="card-subtitle">
                        <TranslatedText>{item.subtitle}</TranslatedText>
                      </h3> */}
                      <p className="card-description">
                        <TranslatedText>{item.description}</TranslatedText>
                      </p>
                      <div className="card-footer">
                        <span className="card-date">
                          <TranslatedText>
                            {activeTab === "exhibitions"
                              ? item.date
                              : `Thời gian: ${item.duration}`}
                          </TranslatedText>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {/* Add a See Past Link */}
        {/* <div className="see-past-link">
          <Link
            to={
              activeTab === "exhibitions"
                ? "/past-exhibitions"
                : "/past-guided-tours"
            }
          >
            <TranslatedText>
              {activeTab === "exhibitions"
                ? "Xem các trưng bày trước"
                : "Xem các chuyến tham quan trước"}
            </TranslatedText>
            <span className="arrow-icon">→</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Exhibitions;
