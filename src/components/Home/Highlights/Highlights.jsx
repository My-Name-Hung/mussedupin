import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import TranslatedText from "../../../components/TranslatedText";
import { useAssets } from "../../../hooks/useAssets";

import "./Highlights.css";

// Sample highlight data - in a real app, this would come from an API or CMS
const highlightsData = [
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
];

const Highlights = ({ onVisible, onHidden }) => {
  const { assets, loading, error, getAssetUrl } = useAssets();
  const [isVisible, setIsVisible] = useState(false);
  const highlightsRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState({});

  // Map highlightsData to use asset URLs
  const highlightsDataWithAssets = highlightsData.map((item) => {
    const asset = assets.find(
      (a) => a.filename && item.image.includes(a.filename)
    );
    return asset
      ? { ...item, image: asset.url || getAssetUrl(asset.filename) }
      : item;
  });

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
        <h2 className="highlights-title">
          <TranslatedText>ĐIỂM NỔI BẬT</TranslatedText>
        </h2>
      </div>

      {/* Mobile layout */}
      <div className="highlights-grid-mobile">
        {highlightsDataWithAssets.map((item, index) => (
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
                <span>
                  <TranslatedText>{item.tag}</TranslatedText>
                </span>
              </div>
              <Link to={item.link} className="card-link-wrapper">
                <div className="card-image-container">
                  <img src={item.image} alt={item.alt} className="card-image" />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      <TranslatedText>{item.title}</TranslatedText>
                    </span>
                  </h3>
                  <p className="card-description">
                    <TranslatedText>{item.description}</TranslatedText>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop layout - exactly matching Louvre.fr image */}
      <div className="highlights-grid-desktop">
        {/* First row */}
        <div className="highlights-row highlights-row-1">
          {/* Không gian nghệ thuật Langbiang */}
          <div
            className={`highlight-card-wrapper highlight-card-large ${
              visibleCards[0] ? "visible" : ""
            }`}
          >
            <div className="highlight-card">
              <div className="card-tag">
                <span>
                  <TranslatedText>
                    {highlightsDataWithAssets[0].tag}
                  </TranslatedText>
                </span>
              </div>
              <Link
                to={highlightsDataWithAssets[0].link}
                className="card-link-wrapper"
              >
                <div className="card-image-container">
                  <img
                    src={highlightsDataWithAssets[0].image}
                    alt={highlightsDataWithAssets[0].alt}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      <TranslatedText>
                        {highlightsDataWithAssets[0].title}
                      </TranslatedText>
                    </span>
                  </h3>
                  <p className="card-description">
                    <TranslatedText>
                      {highlightsDataWithAssets[0].description}
                    </TranslatedText>
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="highlights-column">
            {/* Phức Tầng */}
            <div
              className={`highlight-card-wrapper highlight-card-small ${
                visibleCards[1] ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <div className="highlight-card">
                <div className="card-tag">
                  <span>
                    <TranslatedText>
                      {highlightsDataWithAssets[1].tag}
                    </TranslatedText>
                  </span>
                </div>
                <Link
                  to={highlightsDataWithAssets[1].link}
                  className="card-link-wrapper"
                >
                  <div className="card-image-container">
                    <img
                      src={highlightsDataWithAssets[1].image}
                      alt={highlightsDataWithAssets[1].alt}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <span className="card-title-text">
                        <TranslatedText>
                          {highlightsDataWithAssets[1].title}
                        </TranslatedText>
                      </span>
                    </h3>
                    <p className="card-description">
                      <TranslatedText>
                        {highlightsDataWithAssets[1].description}
                      </TranslatedText>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
