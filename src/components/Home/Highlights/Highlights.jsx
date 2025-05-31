import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import langbiang from "../../../assets/Home/Exhibitions/Langbiang.webp";
import thong2 from "../../../assets/Home/Exhibitions/Thông 2.webp";

import TranslatedText from "../../../components/TranslatedText";

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
    image: langbiang,
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
    image: thong2,
    alt: "Đà Lạt những phức tầng trầm mặc",
    tag: "Trưng bày",
    link: "/exhibition-details/phuc-tang-tram-mac",
    featured: false,
  },
  
];

const Highlights = ({ onVisible, onHidden }) => {
  const [isVisible, setIsVisible] = useState(false);
  const highlightsRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState({});

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
        {highlightsData.map((item, index) => (
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
                  <TranslatedText>{highlightsData[0].tag}</TranslatedText>
                </span>
              </div>
              <Link to={highlightsData[0].link} className="card-link-wrapper">
                <div className="card-image-container">
                  <img
                    src={highlightsData[0].image}
                    alt={highlightsData[0].alt}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      <TranslatedText>{highlightsData[0].title}</TranslatedText>
                    </span>
                  </h3>
                  <p className="card-description">
                    <TranslatedText>
                      {highlightsData[0].description}
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
                    <TranslatedText>{highlightsData[1].tag}</TranslatedText>
                  </span>
                </div>
                <Link to={highlightsData[1].link} className="card-link-wrapper">
                  <div className="card-image-container">
                    <img
                      src={highlightsData[1].image}
                      alt={highlightsData[1].alt}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <span className="card-title-text">
                        <TranslatedText>
                          {highlightsData[1].title}
                        </TranslatedText>
                      </span>
                    </h3>
                    <p className="card-description">
                      <TranslatedText>
                        {highlightsData[1].description}
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
