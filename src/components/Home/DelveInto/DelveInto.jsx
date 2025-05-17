import React, { useEffect, useRef } from "react";
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

  return (
    <section className="delve-into-section">
      <div className="delve-into-container">
        <h2 className="delve-into-title">
          <TranslatedText>DELVE INTO THE MUSÉE DU PIN</TranslatedText>
        </h2>

        <div className="delve-into-grid" ref={gridRef}>
          <div className="grid-item grid-item-1">
            <img
              src={artImage2}
              alt="Spring by Giuseppe Arcimboldo"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-2">
            <img
              src={artImage5}
              alt="La Grande Odalisque by Jean Auguste Dominique Ingres"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-3">
            <img
              src={artImage7}
              alt="Mona Lisa by Leonardo da Vinci"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-4">
            <img
              src={artImage3}
              alt="Liberty Leading the People by Eugène Delacroix"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-5">
            <img
              src={louvreInterior}
              alt="Interior of the Louvre museum"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-6">
            <img
              src={artImage6}
              alt="Islamic decorative arts - gold vase"
              className="grid-image"
            />
          </div>
        </div>

        <div className="explore-button-container">
          <Link to="/explore" className="explore-button">
            <TranslatedText>Explore</TranslatedText>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DelveInto;
