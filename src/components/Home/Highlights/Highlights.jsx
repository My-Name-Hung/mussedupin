import React, { useEffect, useRef, useState } from "react";
import ANewLook from "../../../assets/home/highlights/ANewLook.jpg";
import beauties from "../../../assets/home/highlights/beautes.jpg";
import couture from "../../../assets/home/highlights/couture.jpg";
import mamluks from "../../../assets/home/highlights/mamluks.jpg";
import masterpieces from "../../../assets/home/highlights/Masterpieces.jpg";
import nature from "../../../assets/home/highlights/Nature.jpg";
import portrait from "../../../assets/home/highlights/portrait.jpg";
import themetau from "../../../assets/home/highlights/TheMetAU.jpg";
import TranslatedText from "../../../components/TranslatedText";

import "./Highlights.css";

// Sample highlight data - in a real app, this would come from an API or CMS
const highlightsData = [
  {
    id: 1,
    title: "Mamluks",
    description:
      "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective. From 30 April to 28 July 2025",
    image: mamluks,
    alt: "Golden decorated vessel from Mamluk period",
    tag: "Exhibition",
    link: "/exhibitions/mamluks",
    featured: true,
  },
  {
    id: 2,
    title: "Musée Du Pin Couture. Art and fashion: statement pieces",
    description:
      "A new perspective on decorative arts through the prism of contemporary fashion design. From 24 January to 21 July 2025",
    image: couture,
    alt: "Fashion exhibit featuring historical and contemporary pieces",
    tag: "Exhibition",
    link: "/exhibitions/couture",
    featured: false,
  },
  {
    id: 3,
    title: "A New Look at Cimabue. At the Origins of Italian Painting",
    description:
      "For the first time, the Musée Du Pin is dedicating an exhibition to Cimabue, one of the most important artists of the 13th century. From 22 January to 12 May 2025",
    image: ANewLook,
    alt: "Religious painting by Cimabue",
    tag: "Exhibition",
    link: "/exhibitions/cimabue",
    featured: false,
  },
  {
    id: 4,
    title: "The Met au Musée Du Pin",
    description:
      "Near Eastern Antiquities in Dialogue. 29 February 2024 – 28 September 2025",
    image: themetau,
    alt: "Ancient Near Eastern artifact",
    tag: "Exhibition",
    link: "/exhibitions/met-au-dupin",
    featured: false,
  },
  {
    id: 5,
    title: "The Experience of Nature. Art in Prague at the Court of Rudolf II",
    description:
      "The exhibition highlights the innovative aspect of the naturalistic art movement practiced in Prague at the Court of Rudolf II. From 19 March to 30 June 2025",
    image: nature,
    alt: "Naturalistic art from the Court of Rudolf II",
    tag: "Exhibition",
    link: "/exhibitions/experience-nature",
    featured: false,
  },
  {
    id: 6,
    title: "The Musée Du Pin Masterpieces",
    description:
      "What exactly is a masterpiece? Follow this trail to find out!",
    image: masterpieces,
    alt: "Mona Lisa painting",
    tag: "Visitor trail",
    link: "/visitor-trails/masterpieces",
    featured: false,
  },
  {
    id: 7,
    title: "De toutes beautés !",
    description:
      "Rituals, objects and representations of beauty, a retrospective trail through the Musée Du Pin",
    image: beauties,
    alt: "Beauty exhibition poster",
    tag: "Guided tours",
    link: "/visitor-trails/beautes",
    featured: false,
  },
  {
    id: 8,
    title: "The Portrait of King Charles I",
    description:
      "The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year of conservation treatment. Blaise Ducos, Executive Curator of Flemish and Dutch Paintings, discusses this masterpiece.",
    image: portrait,
    alt: "Portrait of King Charles I by Anthony van Dyck",
    tag: "News",
    link: "/news/portrait-king-charles",
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
          <TranslatedText>HIGHLIGHTS</TranslatedText>
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
              transitionDelay: `${index * 0.1}s`,
            }}
          >
            <div className="highlight-card">
              <div className="card-tag">
                <span>
                  <TranslatedText>{item.tag}</TranslatedText>
                </span>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link-wrapper"
              >
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
              </a>
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
              <a
                href={highlightsData[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link-wrapper"
              >
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
              </a>
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
              <a
                href={highlightsData[1].link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link-wrapper"
              >
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
              </a>
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
                <a
                  href={highlightsData[2].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link-wrapper"
                >
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
                </a>
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
                <a
                  href={highlightsData[3].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link-wrapper"
                >
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
                </a>
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
              <a
                href={highlightsData[4].link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link-wrapper"
              >
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
              </a>
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
              <a
                href={highlightsData[5].link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link-wrapper"
              >
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
              </a>
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
              <a
                href={highlightsData[6].link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link-wrapper"
              >
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
              </a>
            </div>
          </div>

          {/* The Portrait of King Charles I */}
          <div
            className={`highlight-card-wrapper highlight-card-small ${
              visibleCards[7] ? "visible" : ""
            }`}
            style={{ transitionDelay: "0.7s" }}
          >
            <div className="highlight-card">
              <div className="card-tag">
                <span>
                  <TranslatedText>{highlightsData[7].tag}</TranslatedText>
                </span>
              </div>
              <a
                href={highlightsData[7].link}
                target="_blank"
                rel="noopener noreferrer"
                className="card-link-wrapper"
              >
                <div className="card-image-container">
                  <img
                    src={highlightsData[7].image}
                    alt={highlightsData[7].alt}
                    className="card-image"
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">
                    <span className="card-title-text">
                      <TranslatedText>{highlightsData[7].title}</TranslatedText>
                    </span>
                  </h3>
                  <p className="card-description">
                    <TranslatedText>
                      {highlightsData[7].description}
                    </TranslatedText>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Highlights;
