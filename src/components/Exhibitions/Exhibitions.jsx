import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils/cloudinary";

// Import hero image

// Import optimized images

import "./Exhibitions.css";

// Exhibition data based on highlights
const exhibitionsData = [
  {
    id: "langbiang-khong-gian",
    title: "Không gian nghệ thuật Langbiang",
    subtitle: "",
    description:
      "Khi nghệ thuật không chỉ để ngắm, mà để sống cùng và sống trong. Không có tủ kính ngăn cách. Không có rào chắn giữa người và hiện vật. Langbiang không đơn thuần là một căn phòng, mà là một vùng ký ức sống, nơi hồn cốt của núi rừng thở trong từng vật phẩm, cháy trong từng ngọn lửa bếp, ngân nga trong từng tiếng cồng chiêng.",
    date: "30 tháng 4 - 28 tháng 7 2025",
    image: "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
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
    image: "Thông 2.webp",
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
  // The Acoustic items
  {
    id: "pind-amour",
    title: "Khán phòng Pin d'amour",
    subtitle: "",
    description: "Khi âm thanh trở thành một tác phẩm nghệ thuật.",
    date: "Trưng bày thường xuyên",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour6.jpg?updatedAt=1750001274965",
    alt: "Khán phòng Pin d'amour",
    tag: "Âm thanh",
    link: "/the-acoustic/pind-amour",
    featured: false,
  },
  {
    id: "high-end",
    title: "Phòng nghe High-end",
    subtitle: "",
    description:
      "Nơi âm thanh được tái hiện với độ trung thực đến mức khiến bạn có cảm giác mình đang ngồi ngay trên sân khấu, đối diện với ca sĩ thật.",
    date: "Trưng bày thường xuyên",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(3).png?updatedAt=1749000530723",
    alt: "Phòng nghe High-end",
    tag: "Âm thanh",
    link: "/the-acoustic/high-end",
    featured: false,
  },
  // The Taste items
  {
    id: "restaurant",
    title: "Nghệ thuật vị giác",
    subtitle: "",
    description: "Nơi hội tụ tinh hoa ẩm thực Đà Lạt",
    date: "Mở cửa hàng ngày",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(1).png?updatedAt=1749000543046",
    alt: "Nhà hàng Bảo tàng",
    tag: "Ẩm thực",
    link: "/the-taste/restaurant",
    featured: false,
  },
  {
    id: "cafe",
    title: "Nghệ thuật vị giác",
    subtitle: "",
    description: "Nghệ thuật vị giác",
    date: "Mở cửa hàng ngày",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(2).png?updatedAt=1749000540091",
    alt: "Cafe Bảo tàng",
    tag: "Ẩm thực",
    link: "/the-taste/cafe",
    featured: false,
  },
  // Regular packages

  {
    id: "giai-dieu-dai-ngan",
    title: "GIAI ĐIỆU ĐẠI NGÀN - LẮNG NGHE THÔNG HÁT",
    subtitle: "",
    description: "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
    date: "Thứ 6-T7-CN, 19:00 - 22:30",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Trong.jpg?updatedAt=1749311873117",
    alt: "Giai điệu đại ngàn",
    tag: "Trải nghiệm",
    link: "/visit/package/giai-dieu-dai-ngan",
    featured: false,
  },
  {
    id: "uom-mam-sang-tao",
    title: "ƯƠM MẦM SÁNG TẠO",
    subtitle: "",
    description: "Các gói trải nghiệm cho bé",
    date: "Sáng: 8h - 12h, Chiều: 14h - 18h",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
    alt: "Ươm mầm sáng tạo",
    tag: "Trải nghiệm",
    link: "/visit/package/uom-mam-sang-tao",
    featured: false,
  },
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
    image: "46.webp",
    alt: "K'ho sinh hoạt thường nhật",
    tag: "Tham quan",
    link: "/exhibition-details/bau-ho-lo",
    featured: true,
  },
  {
    id: "dem-huyen-thoai",
    title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
    subtitle: "",
    description:
      "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
    date: "T3-T5 hàng tuần, 19:00 - 21:00",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Tourdemhuyenthoai_Ngoai.jpg?updatedAt=1749312109824",
    alt: "Tour đêm huyền thoại",
    tag: "Trải nghiệm",
    link: "/visit/package/dem-huyen-thoai",
    featured: false,
  },
];

const Exhibitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const heroRef = useRef(null);

  // Check for tab parameter in URL
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam === "guided-tours" ? "guided-tours" : "exhibitions"
  );
  const [isVisible, setIsVisible] = useState({});
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

    // Reset visibility state for new cards
    setIsVisible({});

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

  // Observe elements for animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Reset visibility on tab change
    // Add a small delay to allow DOM to update after tab change
    setTimeout(() => {
      // Observe all card elements
      const cards = document.querySelectorAll(".exhibition-card-wrapper");
      cards.forEach((card) => {
        observer.observe(card);
      });
    }, 100);

    return () => {
      // Clean up observer
      const cards = document.querySelectorAll(".exhibition-card-wrapper");
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [activeTab]);

  // Get active data based on current tab
  const activeData =
    activeTab === "exhibitions" ? exhibitionsData : guidedToursData;

  return (
    <div className="exhibitions-page">
      {/* Hero Section with background image */}
      <div className="exhibitions-hero" ref={heroRef}>
        <div className="exhibitions-hero-overlay">
          <img src={getImageUrl("louvre-sunset.jpg")} alt="Bảo tàng" />
        </div>
        <div className="exhibitions-hero-content">
          <h1 className="exhibitions-hero-title">
            {activeTab === "exhibitions" ? "TRƯNG BÀY" : "THAM QUAN"}
          </h1>
          <p className="exhibitions-hero-subtitle">
            {activeTab === "exhibitions"
              ? "Khám phá các cuộc trưng bày hiện tại và sắp tới"
              : "Khám phá bảo tàng cùng hướng dẫn viên chuyên nghiệp"}
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
            TRƯNG BÀY
          </button>
          <button
            className={`tab-button ${
              activeTab === "guided-tours" ? "active" : ""
            }`}
            onClick={() => handleTabChange("guided-tours")}
            aria-label="Hiển thị tham quan"
          >
            THAM QUAN
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
                    isVisible[`featured-${item.id}`] || pageLoaded
                      ? "visible"
                      : ""
                  }`}
                  data-id={`featured-${item.id}`}
                >
                  <div className="exhibition-card featured-card">
                    <div className="card-tag">
                      <span>{item.tag}</span>
                    </div>
                    <Link to={item.link} className="card-link-wrapper">
                      <div className="card-image-container">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.alt}
                          className="card-image"
                          loading="eager"
                          style={{
                            objectFit:
                              item.id === "langbiang-khong-gian"
                                ? "contain"
                                : "cover",
                          }}
                        />
                      </div>
                      <div className="card-content">
                        <h2 className="card-title">{item.title}</h2>
                        {/* <h3 className="card-subtitle">
                          {item.subtitle}
                        </h3> */}
                        <p className="card-description">{item.description}</p>
                        <div className="card-footer">
                          <span className="card-date">
                            {activeTab === "exhibitions"
                              ? item.date
                              : `Thời gian: ${item.duration}`}
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
                  isVisible[`regular-${item.id}`] ? "visible" : ""
                }`}
                data-id={`regular-${item.id}`}
                style={{
                  transitionDelay: !isVisible[`regular-${item.id}`]
                    ? `${index * 0.1}s`
                    : "0s",
                }}
              >
                <div className="exhibition-card">
                  <div className="card-tag">
                    <span>{item.tag}</span>
                  </div>
                  <Link to={item.link} className="card-link-wrapper">
                    <div className="card-image-container">
                      <img
                        src={getImageUrl(item.image)}
                        alt={item.alt}
                        className="card-image"
                        loading={index < 5 ? "eager" : "lazy"}
                        style={{
                          objectFit:
                            item.id === "langbiang-khong-gian"
                              ? "contain"
                              : "cover",
                        }}
                      />
                    </div>
                    <div className="card-content">
                      <h2 className="card-title">{item.title}</h2>
                      {/* <h3 className="card-subtitle">
                        {item.subtitle}
                      </h3> */}
                      <p className="card-description">{item.description}</p>
                      <div className="card-footer">
                        <span className="card-date">
                          {activeTab === "exhibitions"
                            ? item.date
                            : `Thời gian: ${item.duration}`}
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
            
              {activeTab === "exhibitions"
                ? "Xem các trưng bày trước"
                : "Xem các chuyến tham quan trước"}
            
            <span className="arrow-icon">→</span>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Exhibitions;
