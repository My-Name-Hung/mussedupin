import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import TranslatedText from "../../../components/TranslatedText";
import "./DelveInto.css";

// Import images used in the grid
import artImage2 from "../../../assets/home/collections/beautes.jpg";
import artImage3 from "../../../assets/home/collections/couture.jpg";
import louvreInterior from "../../../assets/home/collections/louvre-sunset.jpg";
import artImage5 from "../../../assets/home/collections/Masterpieces.jpg";
import artImage6 from "../../../assets/home/collections/Nature.jpg";
import artImage7 from "../../../assets/home/collections/portrait.jpg";

const DelveInto = () => {
  const gridRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Add visibility detection with enhanced threshold
  useEffect(() => {
    const options = {
      threshold: [0.05, 0.1, 0.2, 0.5, 0.8],
      rootMargin: "0px 0px 100px 0px",
    };

    const handleVisibilityChange = (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        // Use a smoother transition based on intersection ratio
        const ratio = Math.min(entry.intersectionRatio * 2, 1);
        if (ratio > 0.1) {
          setIsVisible(true);

          // Apply parallax effect when section comes into view
          if (sectionRef.current) {
            sectionRef.current.style.transform = "translateY(0)";
            sectionRef.current.style.opacity = "1";
          }
        }
      } else if (entry.intersectionRatio === 0) {
        setIsVisible(false);
      }
    };

    const observer = new IntersectionObserver(handleVisibilityChange, options);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Parallax scrolling effect
  useEffect(() => {
    const handleParallax = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const scrolled =
            (windowHeight - rect.top) / (windowHeight + rect.height);
          setScrollProgress(Math.min(Math.max(scrolled, 0), 1));
        }
      }
    };

    window.addEventListener("scroll", handleParallax);
    return () => window.removeEventListener("scroll", handleParallax);
  }, []);

  // Add mouse movement effect for grid items
  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");

    const handleMouseMove = (e) => {
      gridItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate mouse position as percentage of the element
        const mouseX = Math.floor((x / rect.width) * 100);
        const mouseY = Math.floor((y / rect.height) * 100);

        item.style.setProperty("--mouse-x", `${mouseX}%`);
        item.style.setProperty("--mouse-y", `${mouseY}%`);
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate parallax offset for items
  const getParallaxOffset = (index) => {
    const baseOffset = scrollProgress * 15;
    return baseOffset + (index % 3) * 5;
  };

  return (
    <section
      className={`delve-into-section ${isVisible ? "visible" : ""}`}
      ref={sectionRef}
      style={{
        opacity: isVisible ? 1 : 0.8,
        transform: `translateY(${isVisible ? 0 : 30}px)`,
      }}
    >
      <div
        className="delve-into-background"
        style={{ opacity: 0.05 + scrollProgress * 0.1 }}
      ></div>

      {/* Decorative elements */}
      <div className="decorative-element decorative-dot"></div>
      <div className="decorative-element decorative-line"></div>
      <div className="decorative-element decorative-circle"></div>

      <div className="delve-into-container">
        <h2
          className="delve-into-title"
          style={{
            transform: `translateX(5%) skewY(2deg) translateY(${
              scrollProgress * -15
            }px)`,
          }}
        >
          <TranslatedText>DELVE INTO THE MUSÉE DU PIN</TranslatedText>
        </h2>

        <div
          className={`delve-into-grid ${isVisible ? "visible" : ""}`}
          ref={gridRef}
        >
          <div
            className="grid-item grid-item-1"
            style={{
              transform: `perspective(1000px) rotateY(-2deg) rotateX(1deg) translateY(${getParallaxOffset(
                1
              )}px)`,
              animationDelay: `0.1s`,
            }}
          >
            <img
              src={artImage2}
              alt="Spring by Giuseppe Arcimboldo"
              className="grid-image"
            />
          </div>

          <div
            className="grid-item grid-item-2"
            style={{
              transform: `perspective(1000px) rotateY(1.5deg) rotateX(-1deg) translateY(${getParallaxOffset(
                2
              )}px)`,
              animationDelay: `0.2s`,
            }}
          >
            <img
              src={artImage5}
              alt="La Grande Odalisque by Jean Auguste Dominique Ingres"
              className="grid-image"
            />
          </div>

          <div
            className="grid-item grid-item-3"
            style={{
              transform: `perspective(1000px) rotateY(-1.5deg) rotateX(1.5deg) translateY(${getParallaxOffset(
                3
              )}px)`,
              animationDelay: `0.3s`,
            }}
          >
            <img
              src={artImage7}
              alt="Mona Lisa by Leonardo da Vinci"
              className="grid-image"
            />
          </div>

          <div
            className="grid-item grid-item-4"
            style={{
              transform: `perspective(1000px) rotateX(1deg) translateY(${
                getParallaxOffset(4) - 10
              }px)`,
              animationDelay: `0.15s`,
            }}
          >
            <img
              src={artImage3}
              alt="Liberty Leading the People by Eugène Delacroix"
              className="grid-image"
            />
          </div>

          <div
            className="grid-item grid-item-5"
            style={{
              transform: `perspective(1000px) rotateY(2deg) rotateX(-0.5deg) translateY(${getParallaxOffset(
                5
              )}px)`,
              animationDelay: `0.25s`,
            }}
          >
            <img
              src={louvreInterior}
              alt="Interior of the Louvre museum"
              className="grid-image"
            />
          </div>

          <div
            className="grid-item grid-item-6"
            style={{
              transform: `perspective(1000px) rotateY(1.5deg) rotateX(-1.5deg) translateY(${getParallaxOffset(
                6
              )}px)`,
              animationDelay: `0.35s`,
            }}
          >
            <img
              src={artImage6}
              alt="Islamic decorative arts - gold vase"
              className="grid-image"
            />
          </div>
        </div>

        <div
          className="explore-button-container"
          style={{
            transform: `skewY(2deg) translateY(${scrollProgress * -10}px)`,
          }}
        >
          <Link to="/collection" className="explore-button">
            <TranslatedText>Explore</TranslatedText>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DelveInto;
