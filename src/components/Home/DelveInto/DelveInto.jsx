import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../../utils/cloudinary";
import "./DelveInto.css";

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
    // Get the navbar component's functions
    const navbarElement = document.querySelector("header.navbar-container");
    if (navbarElement) {
      // Show mobile menu first
      const mobileMenu = navbarElement.querySelector(".mobile-menu-overlay");
      if (mobileMenu) {
        mobileMenu.classList.add("show");
      }

      // Find and click the "KHÁM PHÁ" menu item to trigger its submenu
      setTimeout(() => {
        const khamPhaMenuItem = Array.from(
          navbarElement.querySelectorAll(".mobile-nav-item")
        ).find((item) => item.textContent.includes("KHÁM PHÁ"));
        if (khamPhaMenuItem) {
          khamPhaMenuItem.click();
        }
      }, 100);
    }
  };

  return (
    <section className="delve-into-section">
      <div className="delve-into-container">
        <h2 className="delve-into-title">Khám phá Musée Du Pin</h2>

        <div className="delve-into-grid" ref={gridRef}>
          <div className="grid-item grid-item-1">
            <img
              src={getImageUrl("Thông 2.webp")}
              alt="Thông 2"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-2">
            <img
              src={getImageUrl("DanTrung_hero.webp")}
              alt="Đàn T'rưng"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-3">
            <img
              src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784650/collections/Gui_hero.webp"
              alt="Chiếc Gùi Tây Nguyên"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-4">
            <img
              src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784647/collections/LongDaDa_hero.webp"
              alt="Lồng Đa Đa"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-5">
            <img
              src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784644/collections/phunu_hero.webp"
              alt="Điêu Khắc"
              className="grid-image"
            />
          </div>

          <div className="grid-item grid-item-6">
            <img
              src={getImageUrl("Cồng chiên.webp")}
              alt="Cồng Chiên"
              className="grid-image"
            />
          </div>
        </div>

        <div className="explore-button-container">
          <button className="explore-button" onClick={handleExploreClick}>
            Khám phá
          </button>
        </div>
      </div>
    </section>
  );
};

export default DelveInto;
