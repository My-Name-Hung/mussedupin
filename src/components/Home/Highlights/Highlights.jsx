import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import congchieng from "../../../assets/home/Highlights/congchien_cards.webp";
import hoabantrang from "../../../assets/home/Highlights/Hoa Ban Trắng.webp";
import longda from "../../../assets/home/Highlights/LongDaDa_cards.webp";
import thong2 from "../../../assets/Home/Highlights/Thông 2.webp";
import TranslatedText from "../../../components/TranslatedText";

import "./Highlights.css";

// Sample highlight data - in a real app, this would come from an API or CMS
const highlightsData = [
  {
    id: 1,
    title: "Dụng cụ âm nhạc Tây Nguyên",
    description:
      "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng. Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
    image: congchieng,
    alt: "Dụng cụ âm nhạc Tây Nguyên",
    tag: "Trưng bày",
    link: "/exhibition-details/cong-chieng",
    featured: true,
  },
  {
    id: 2,
    title: "K'ho chăn nuôi",
    description:
      "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên. Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
    image: longda,
    alt: "K'ho chăn nuôi",
    tag: "Trưng bày",
    link: "/exhibition-details/long-da-da",
    featured: false,
  },
  {
    id: 3,
    title: "Phức Tầng",
    description:
      "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
    image: thong2,
    alt: "Phức Tầng",
    tag: "Tham Quan",
    link: "/exhibition-details/phuc-tang",
    featured: false,
  },
  {
    id: 4,
    title: "Vật liệu",
    description:
      "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên. Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
    image: hoabantrang,
    alt: "Vật liệu",
    tag: "Trưng bày",
    link: "/exhibition-details/vat-lieu",
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
          {/* Featured card (left) */}
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
            {/* K'ho chăn nuôi */}
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

            {/* Phức Tầng */}
            <div
              className={`highlight-card-wrapper highlight-card-small ${
                visibleCards[2] ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="highlight-card">
                <div className="card-tag">
                  <span>
                    <TranslatedText>{highlightsData[2].tag}</TranslatedText>
                  </span>
                </div>
                <Link to={highlightsData[2].link} className="card-link-wrapper">
                  <div className="card-image-container">
                    <img
                      src={highlightsData[2].image}
                      alt={highlightsData[2].alt}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <span className="card-title-text">
                        <TranslatedText>
                          {highlightsData[2].title}
                        </TranslatedText>
                      </span>
                    </h3>
                    <p className="card-description">
                      <TranslatedText>
                        {highlightsData[2].description}
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
