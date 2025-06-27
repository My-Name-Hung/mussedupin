import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import useCachedAsset from "../../../hooks/useCachedAsset";
import "./Highlights.css";

// Combine all items from different sources
const allItems = [
  // Original highlights
  {
    id: "langbiang-khong-gian",
    title: "Không gian nghệ thuật Langbiang",
    description: {
      vi: "Khi nghệ thuật không chỉ để ngắm, mà để sống cùng và sống trong. Không có tủ kính ngăn cách. Không có rào chắn giữa người và hiện vật. Langbiang không đơn thuần là một căn phòng, mà là một vùng ký ức sống, nơi hồn cốt của núi rừng thở trong từng vật phẩm, cháy trong từng ngọn lửa bếp, ngân nga trong từng tiếng cồng chiêng.",
      en: "When art is not just to be viewed, but to be lived with and within. No glass cases. No barriers between people and artifacts. Langbiang is not just a room, but a living memory zone, where the soul of the forest breathes in every item, burns in every hearth fire, resonates in every gong sound.",
    },
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
    alt: "Langbiang",
    tag: {
      vi: "Trưng bày",
      en: "Exhibition",
    },
    link: "/exhibition-details/langbiang-khong-gian",
  },
  {
    id: "phuc-tang",
    title: "Phức Tầng",
    description: {
      vi: "Được Bảo tàng Thông bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
      en: "Musée Du Pin captures moments of nature rich in K'ho ethnic character, creating a beautiful picture of the Central Highlands.",
    },
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/Th%C3%B4ng%202.webp",
    alt: "Phức Tầng",
    tag: {
      vi: "Tham Quan",
      en: "Tour",
    },
    link: "/exhibition-details/phuc-tang-tram-mac",
  },
  {
    id: "dang-suong",
    title: "DÁNG SƯƠNG",
    description:
      "Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Dangsuong_Doc.jpg?updatedAt=1749269171830",
    alt: "Dáng Sương",
    tag: "Trải nghiệm",
    link: "/visit/package/dang-suong",
  },
  {
    id: "nghe-nhan",
    title: "NGHỆ NHÂN",
    description:
      "Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Thumbnail%20Ngh%E1%BB%87%20Nh%C3%A2n%20D%E1%BB%8Dc.png?updatedAt=1750322897358",
    alt: "Nghệ Nhân",
    tag: "Trải nghiệm",
    link: "/visit/package/nghe-nhan",
  },
  // From TheAcoustic
  {
    id: "pind-amour",
    title: "Khán phòng Pin d'amour",
    description: "Khi âm thanh trở thành một tác phẩm nghệ thuật.",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour6.jpg?updatedAt=1750001274965",
    alt: "Pin d'amour",
    tag: "Âm thanh",
    link: "/the-acoustic/pind-amour",
  },
  {
    id: "high-end",
    title: "Phòng nghe High-end",
    description:
      "Nơi âm thanh được tái hiện với độ trung thực đến mức khiến bạn có cảm giác mình đang ngồi ngay trên sân khấu, đối diện với ca sĩ thật.",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(3).png?updatedAt=1749000530723",
    alt: "High-end",
    tag: "Âm thanh",
    link: "/the-acoustic/high-end",
  },
  // From TheTaste
  {
    id: "restaurant",
    title: "Nghệ thuật vị giác",
    description: "Nghệ thuật vị giác",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(1).png?updatedAt=1749000543046",
    alt: "Restaurant",
    tag: "Ẩm thực",
    link: "/the-taste/restaurant",
  },
  {
    id: "cafe",
    title: "Nghệ thuật vị giác",
    description: "Nghệ thuật vị giác",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(2).png?updatedAt=1749000540091",
    alt: "Cafe",
    tag: "Ẩm thực",
    link: "/the-taste/cafe",
  },
  // From NonResidentialPackages
  {
    id: "lua-thieng",
    title: "LỬA THIÊNG / Pin D'amour",
    description:
      "Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
    alt: "Lửa Thiêng",
    tag: "Trải nghiệm",
    link: "/visit/package/lua-thieng",
  },
  // From ArtRooms
  {
    id: "the-childhood",
    title: "THE CHILDHOOD",
    description:
      "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thechillhood.jpg",
    alt: "The Childhood",
    tag: "Lưu trú",
    link: "/visit/package/the-childhood",
  },
  {
    id: "white-bauhunia",
    title: "WHITE BAUHUNIA",
    description:
      "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846791/collections/whitebauhinia.jpg",
    alt: "White Bauhunia",
    tag: "Lưu trú",
    link: "/visit/package/white-bauhunia",
  },
  // Additional packages from PackageDetail
  {
    id: "uom-mam-sang-tao",
    title: "ƯƠM MẦM SÁNG TẠO",
    description: "Workshop: Tay nặn tay vẽ hoặc chế tác đồ thủ công từ thông",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
    alt: "Ươm Mầm Sáng Tạo",
    tag: "Workshop",
    link: "/visit/package/uom-mam-sang-tao",
  },
  {
    id: "chup-anh-nghe-thuat",
    title: "CHỤP ẢNH NGHỆ THUẬT",
    description:
      "Du khách sẽ được sở hữu những tấm ảnh nghệ thuật của chính mình trong không gian Bảo Tàng",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/chupanhnghethuat_ngang.jpg?updatedAt=1750298609133",
    alt: "Chụp Ảnh Nghệ Thuật",
    tag: "Dịch vụ",
    link: "/visit/package/chup-anh-nghe-thuat",
  },
  {
    id: "phim-dien-anh",
    title: "PHIM ĐIỆN ẢNH",
    description:
      "Toàn bộ chuyến đi của du khách và gia đình sẽ được ê kíp đoàn làm phim ghi lại",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/phimdienanh_ngang.jpg?updatedAt=1750298609073",
    alt: "Phim Điện Ảnh",
    tag: "Dịch vụ",
    link: "/visit/package/phim-dien-anh",
  },
];

// Function to shuffle array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Component for cached image
const CachedImage = ({
  src,
  alt,
  className,
  loading = "eager",
  highlightId,
}) => {
  const { url: cachedUrl, isLoaded } = useCachedAsset(src);

  // Don't render the img element if src is empty or null
  if (!src) return null;

  return (
    <img
      src={cachedUrl || src} // Fallback to original src if cachedUrl is empty
      alt={alt}
      className={className}
      loading={loading}
      style={{
        opacity: isLoaded ? 1 : 0.9,
        transition: "opacity 0.2s ease",
        objectFit: highlightId === "langbiang-khong-gian" ? "contain" : "cover",
      }}
    />
  );
};

const Highlights = ({ onVisible, onHidden }) => {
  const { currentLang } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const highlightsRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState({});
  const [randomItems, setRandomItems] = useState([]);

  // Select random items on mount
  useEffect(() => {
    const shuffled = shuffleArray(allItems);
    setRandomItems(shuffled.slice(0, 5)); // Get first 5 items
  }, []);

  // Improved scroll detection for highlighting section
  useEffect(() => {
    const handleScroll = () => {
      if (highlightsRef.current) {
        const rect = highlightsRef.current.getBoundingClientRect();
        const isCurrentlyVisible =
          rect.top < window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 3;

        if (isCurrentlyVisible !== isVisible) {
          setIsVisible(isCurrentlyVisible);
          if (isCurrentlyVisible) {
            onVisible && onVisible();
          } else {
            onHidden && onHidden();
          }
        }

        // Check individual cards for staggered animations
        if (isCurrentlyVisible) {
          const cardElements = highlightsRef.current.querySelectorAll(
            ".highlight-card-wrapper"
          );
          cardElements.forEach((card, index) => {
            const cardRect = card.getBoundingClientRect();
            const isCardVisible = cardRect.top < window.innerHeight * 0.85;

            if (isCardVisible) {
              setVisibleCards((prev) => ({
                ...prev,
                [index]: true,
              }));
            }
          });
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isVisible, onVisible, onHidden]);

  return (
    <section id="highlights" className="highlights-section" ref={highlightsRef}>
      <div className="highlights-header">
        <h3 className="highlights-title">
          {currentLang === "en" ? "HIGHLIGHTS" : "ĐIỂM NỔI BẬT"}
        </h3>
      </div>

      {/* Mobile layout */}
      <div className="highlights-grid-mobile">
        {randomItems.map((item, index) => (
          <div
            key={item.id}
            className={`highlight-card-wrapper ${
              visibleCards[index] ? "visible" : ""
            }`}
            style={{
              transitionDelay: `${index * 0.01}s`,
            }}
          >
            <div className="highlight-card">
              <div className="card-tag">
                <span>{item.tag[currentLang]}</span>
              </div>
              <Link to={item.link} className="card-link-wrapper">
                <div className="card-image-container">
                  <CachedImage
                    src={item.image}
                    alt={item.alt}
                    className="card-image"
                    loading="eager"
                    highlightId={item.id}
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">{item.title}</span>
                  </h3>
                  <p className="card-description">
                    {typeof item.description === "object"
                      ? item.description[currentLang] || ""
                      : item.description || ""}
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop layout */}
      <div className="highlights-grid-desktop">
        <div className="highlights-layout">
          {/* Featured large card (2 columns) */}
          <div className="highlight-featured">
            <div
              className={`highlight-card-wrapper highlight-card-large ${
                visibleCards[0] ? "visible" : ""
              }`}
            >
              <div className="highlight-card">
                <div className="card-tag">
                  <span>{randomItems[0]?.tag[currentLang]}</span>
                </div>
                <Link to={randomItems[0]?.link} className="card-link-wrapper">
                  <div className="card-image-container">
                    <CachedImage
                      src={randomItems[0]?.image}
                      alt={randomItems[0]?.alt}
                      className="card-image"
                      loading="eager"
                      highlightId={randomItems[0]?.id}
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <span className="card-title-text">
                        {randomItems[0]?.title}
                      </span>
                    </h3>
                    <p className="card-description">
                      {typeof randomItems[0]?.description === "object"
                        ? randomItems[0]?.description[currentLang] || ""
                        : randomItems[0]?.description || ""}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right small card */}
          <div className="highlight-side">
            <div
              className={`highlight-card-wrapper highlight-card-small ${
                visibleCards[1] ? "visible" : ""
              }`}
            >
              <div className="highlight-card">
                <div className="card-tag">
                  <span>{randomItems[1]?.tag[currentLang]}</span>
                </div>
                <Link to={randomItems[1]?.link} className="card-link-wrapper">
                  <div className="card-image-container">
                    <CachedImage
                      src={randomItems[1]?.image}
                      alt={randomItems[1]?.alt}
                      className="card-image"
                      loading="eager"
                      highlightId={randomItems[1]?.id}
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <span className="card-title-text">
                        {randomItems[1]?.title}
                      </span>
                    </h3>
                    <p className="card-description">
                      {typeof randomItems[1]?.description === "object"
                        ? randomItems[1]?.description[currentLang] || ""
                        : randomItems[1]?.description || ""}
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom medium cards */}
          <div className="highlight-bottom">
            {randomItems.slice(2, 5).map((item, index) => (
              <div
                key={item.id}
                className={`highlight-card-wrapper highlight-card-medium ${
                  visibleCards[index + 2] ? "visible" : ""
                }`}
                style={{ transitionDelay: `${(index + 2) * 0.2}s` }}
              >
                <div className="highlight-card">
                  <div className="card-tag">
                    <span>{item.tag[currentLang]}</span>
                  </div>
                  <Link to={item.link} className="card-link-wrapper">
                    <div className="card-image-container">
                      <CachedImage
                        src={item.image}
                        alt={item.alt}
                        className="card-image"
                        loading="eager"
                        highlightId={item.id}
                      />
                    </div>
                    <div className="card-content">
                      <h3 className="card-title">
                        <span className="card-title-text">{item.title}</span>
                      </h3>
                      <p className="card-description">
                        {typeof item.description === "object"
                          ? item.description[currentLang] || ""
                          : item.description || ""}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
