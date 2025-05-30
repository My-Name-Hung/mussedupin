import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TranslatedText from "../../../components/TranslatedText";
import "./DelveInto.css";

// Import optimized images
import congchieng from "../../../assets/home/DelveInto/congchien_hero.webp";
import dantrung from "../../../assets/home/DelveInto/DanT'rung_hero.webp";
import gui from "../../../assets/home/DelveInto/Gui_hero.webp";
import longda from "../../../assets/home/DelveInto/LongDaDa_hero.webp";
import phunu from "../../../assets/home/DelveInto/phunu_hero.webp";
import thong2 from "../../../assets/home/DelveInto/Thông 2.webp";

const DelveInto = () => {
  const gridRef = useRef(null);
  const navigate = useNavigate();

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

  const handleExploreClick = () => {
    navigate("/collection", { state: { scrollTo: "complete-collection" } });
  };

  return (
    <section className="delve-into-section">
      <div className="delve-into-container">
        <h2 className="delve-into-title">
          <TranslatedText>Khám phá Musée Du Pin</TranslatedText>
        </h2>

        <div className="delve-into-grid" ref={gridRef}>
          <div className="grid-item grid-item-1">
            <img src={thong2} className="grid-image" />
          </div>

          <div className="grid-item grid-item-2">
            <img src={dantrung} alt="Đàn T'rưng" className="grid-image" />
          </div>

          <div className="grid-item grid-item-3">
            <img src={gui} alt="Chiếc Gùi Tây Nguyên" className="grid-image" />
          </div>

          <div className="grid-item grid-item-4">
            <img src={longda} alt="Lồng Đa Đa" className="grid-image" />
          </div>

          <div className="grid-item grid-item-5">
            <img src={phunu} alt="Điêu Khắc" className="grid-image" />
          </div>

          <div className="grid-item grid-item-6">
            <img src={congchieng} className="grid-image" />
          </div>
        </div>

        <div className="explore-button-container">
          <button className="explore-button" onClick={handleExploreClick}>
            <TranslatedText>Khám phá</TranslatedText>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DelveInto;
