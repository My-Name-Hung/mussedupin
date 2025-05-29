import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import bauho from "../../../assets/home/Highlights/Bauholo_cards.webp";
import congchieng from "../../../assets/home/Highlights/congchien_cards.webp";
import cheghosanh from "../../../assets/home/Highlights/Lehoi_cards.webp";
import longda from "../../../assets/home/Highlights/LongDaDa_cards.webp";
import noidat from "../../../assets/home/Highlights/noidat_cards.webp";
import phunu from "../../../assets/home/Highlights/phunu_cards.webp";
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
    title: "K'ho điêu khắc",
    description:
      "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa.",
    image: phunu,
    alt: "K'ho điêu khắc",
    tag: "Trưng bày",
    link: "/exhibition-details/tuong-phu-nu",
    featured: false,
  },
  {
    id: 4,
    title: "K'ho lễ hội",
    description:
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin, đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa. ",
    image: cheghosanh,
    alt: "K'ho lễ hội",
    tag: "Trưng bày",
    link: "/exhibition-details/che-gho-sanh",
    featured: false,
  },
  {
    id: 5,
    title: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
    description:
      "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn, thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình",
    image: noidat,
    alt: "K'ho săn bắn, hái lượm, trồng trọt, chăn nuôi",
    tag: "Tham quan",
    link: "/exhibition-details/noi-dat",
    featured: false,
  },
  {
    id: 6,
    title: "K'ho sinh hoạt thường nhật",
    description:
      "Được khoét rỗng từ quả hồ lô khô, vật phẩm này thường được dùng để đựng nước, rượu cần hoặc làm nhạc cụ truyền thống",
    image: bauho,
    alt: "K'ho sinh hoạt thường nhật",
    tag: "Trưng bày",
    link: "/exhibition-details/bau-ho-lo",
    featured: false,
  },
  {
    id: 7,
    title: "Phức Tầng",
    description:
      "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
    image: thong2,
    alt: "Phức Tầng",
    tag: "Tham Quan",
    link: "/exhibition-details/phuc-tang",
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
          {/* Mamluks - Large feature card (left) */}
          <div
            className={`highlight-card-wrapper highlight-card-large ${
              visibleCards[0] ? "visible" : ""
            }`}
            style={{ transitionDelay: "0s" }}
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

          {/* Louvre Couture - medium card (right top) */}
          <div
            className={`highlight-card-wrapper highlight-card-medium ${
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
                      <TranslatedText>{highlightsData[1].title}</TranslatedText>
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

        {/* Second row */}
        <div className="highlights-row highlights-row-2">
          {/* Left side - Two small cards side by side */}
          <div className="highlights-row-2-left">
            {/* Cimabue */}
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

            {/* The Met au Louvre */}
            <div
              className={`highlight-card-wrapper highlight-card-small ${
                visibleCards[3] ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <div className="highlight-card">
                <div className="card-tag">
                  <span>
                    <TranslatedText>{highlightsData[3].tag}</TranslatedText>
                  </span>
                </div>
                <Link to={highlightsData[3].link} className="card-link-wrapper">
                  <div className="card-image-container">
                    <img
                      src={highlightsData[3].image}
                      alt={highlightsData[3].alt}
                      className="card-image"
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <span className="card-title-text">
                        <TranslatedText>
                          {highlightsData[3].title}
                        </TranslatedText>
                      </span>
                    </h3>
                    <p className="card-description">
                      <TranslatedText>
                        {highlightsData[3].description}
                      </TranslatedText>
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - The Experience of Nature */}
          <div
            className={`highlight-card-wrapper highlight-card-medium ${
              visibleCards[4] ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.4s" }}
          >
            <div className="highlight-card">
              <div className="card-tag">
                <span>
                  <TranslatedText>{highlightsData[4].tag}</TranslatedText>
                </span>
              </div>
              <Link to={highlightsData[4].link} className="card-link-wrapper">
                <div className="card-image-container">
                  <img
                    src={highlightsData[4].image}
                    alt={highlightsData[4].alt}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      <TranslatedText>{highlightsData[4].title}</TranslatedText>
                    </span>
                  </h3>
                  <p className="card-description">
                    <TranslatedText>
                      {highlightsData[4].description}
                    </TranslatedText>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row - remaining items */}
        <div className="highlights-row highlights-row-3">
          {/* The Louvre's Masterpieces */}
          <div
            className={`highlight-card-wrapper highlight-card-small ${
              visibleCards[5] ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.5s" }}
          >
            <div className="highlight-card">
              <div className="card-tag">
                <span>
                  <TranslatedText>{highlightsData[5].tag}</TranslatedText>
                </span>
              </div>
              <Link to={highlightsData[5].link} className="card-link-wrapper">
                <div className="card-image-container">
                  <img
                    src={highlightsData[5].image}
                    alt={highlightsData[5].alt}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      <TranslatedText>{highlightsData[5].title}</TranslatedText>
                    </span>
                  </h3>
                  <p className="card-description">
                    <TranslatedText>
                      {highlightsData[5].description}
                    </TranslatedText>
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* De toutes beautés */}
          <div
            className={`highlight-card-wrapper highlight-card-small ${
              visibleCards[6] ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.6s" }}
          >
            <div className="highlight-card">
              <div className="card-tag">
                <span>
                  <TranslatedText>{highlightsData[6].tag}</TranslatedText>
                </span>
              </div>
              <Link to={highlightsData[6].link} className="card-link-wrapper">
                <div className="card-image-container">
                  <img
                    src={highlightsData[6].image}
                    alt={highlightsData[6].alt}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      <TranslatedText>{highlightsData[6].title}</TranslatedText>
                    </span>
                  </h3>
                  <p className="card-description">
                    <TranslatedText>
                      {highlightsData[6].description}
                    </TranslatedText>
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
