import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useCachedAsset from "../../../hooks/useCachedAsset";
import { getImageUrl } from "../../../utils/cloudinary";
import "./Highlights.css";

// Sample highlight data - in a real app, this would come from an API or CMS
const highlightsData = [
  {
    id: 1,
    title: "Không gian nghệ thuật Langbiang",
    description:
      "Khi nghệ thuật không chỉ để ngắm, mà để sống cùng và sống trong. Không có tủ kính ngăn cách. Không có rào chắn giữa người và hiện vật. Langbiang không đơn thuần là một căn phòng, mà là một vùng ký ức sống, nơi hồn cốt của núi rừng thở trong từng vật phẩm, cháy trong từng ngọn lửa bếp, ngân nga trong từng tiếng cồng chiêng.",
    image: "Langbiang.jpg",
    alt: "Langbiang",
    tag: "Trưng bày",
    link: "/exhibition-details/langbiang-khong-gian",
    featured: true,
  },
  {
    id: 2,
    title: "Phức Tầng",
    description:
      "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
    image: "Thông 2.webp",
    alt: "Phức Tầng",
    tag: "Tham Quan",
    link: "/exhibition-details/phuc-tang-tram-mac",
    featured: false,
  },
];

// Component for cached image
const CachedImage = ({
  src,
  alt,
  className,
  loading = "eager",
  highlightId,
}) => {
  const { url: cachedUrl, isLoaded } = useCachedAsset(getImageUrl(src));

  return (
    <img
      src={cachedUrl}
      alt={alt}
      className={className}
      loading={loading}
      style={{
        opacity: isLoaded ? 1 : 0.9,
        transition: "opacity 0.2s ease",
        objectFit: highlightId === 1 ? "contain" : "cover",
      }}
    />
  );
};

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
        <h2 className="highlights-title">ĐIỂM NỔI BẬT</h2>
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
                <span>{item.tag}</span>
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
                  <p className="card-description">{item.description}</p>
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
                <span>{highlightsData[0].tag}</span>
              </div>
              <Link to={highlightsData[0].link} className="card-link-wrapper">
                <div className="card-image-container">
                  <CachedImage
                    src={highlightsData[0].image}
                    alt={highlightsData[0].alt}
                    className="card-image"
                    loading="eager"
                    highlightId={highlightsData[0].id}
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      {highlightsData[0].title}
                    </span>
                  </h3>
                  <p className="card-description">
                    {highlightsData[0].description}
                  </p>
                </div>
              </Link>
            </div>
          </div>

          {/* Right column */}
          <div className="highlights-column">
            {/* K'ho chăn nuôi */}

            {/* Phức Tầng */}
            <div
              className={`highlight-card-wrapper highlight-card-small ${
                visibleCards[1] ? "visible" : ""
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <div className="highlight-card">
                <div className="card-tag">
                  <span>{highlightsData[1].tag}</span>
                </div>
                <Link to={highlightsData[1].link} className="card-link-wrapper">
                  <div className="card-image-container">
                    <CachedImage
                      src={highlightsData[1].image}
                      alt={highlightsData[1].alt}
                      className="card-image"
                      loading="eager"
                      highlightId={highlightsData[1].id}
                    />
                  </div>
                  <div className="card-content">
                    <h3 className="card-title">
                      <span className="card-title-text">
                        {highlightsData[1].title}
                      </span>
                    </h3>
                    <p className="card-description">
                      {highlightsData[1].description}
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
