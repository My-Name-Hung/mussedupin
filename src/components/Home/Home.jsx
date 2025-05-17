import React, { useEffect, useState } from "react";
import TranslatedText from "../../components/TranslatedText";
import Collections from "./Collections/Collections";
import DelveInto from "./DelveInto/DelveInto";
import DuPin from "./DuPin/DuPin";
import Hero from "./Hero/Hero";
import Highlights from "./Highlights/Highlights";

function Home() {
  const [showPrepareVisitBar, setShowPrepareVisitBar] = useState(false);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Handle when the Highlights section becomes visible
  const handleHighlightsVisible = () => {
    setShowPrepareVisitBar(true);
    setHideNavbar(true);
  };

  // Handle when the Highlights section is no longer visible
  const handleHighlightsHidden = () => {
    setShowPrepareVisitBar(false);
    setHideNavbar(false);
  };

  // Icon cho Online Boutique
  const BoutiqueIcon = () => (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M11.57 2c-1.78 0-3.2 1.28-3.2 2.86V7H5.14a.71.71 0 0 0-.72.64L3 21.21a.72.72 0 0 0 .72.79h15.71a.71.71 0 0 0 .72-.79L18.72 7.64A.71.71 0 0 0 18 7h-3.22V4.86c0-1.58-1.43-2.86-3.21-2.86zM9.8 4.86c0-.8.8-1.43 1.78-1.43 1 0 1.8.64 1.8 1.43V7h-3.6V4.86zm7.57 3.57 1.28 12.14H4.51L5.79 8.43h2.57v1.43a.71.71 0 1 0 1.43 0V8.43h3.57v1.43a.71.71 0 1 0 1.43 0V8.43h2.57z"></path>
    </svg>
  );

  // Icon cho Tickets
  const TicketIcon = () => (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="currentColor"
      focusable="false"
      aria-hidden="true"
    >
      <path d="M9.13.5a.9.9 0 0 1 1.28 0l1.17 1.18c.2.2.3.5.25.79a1.48 1.48 0 0 0 1.7 1.7c.3-.04.59.05.79.25l1.17 1.17a.9.9 0 0 1 0 1.28L6.87 15.5a.9.9 0 0 1-1.28 0L.51 10.41a.9.9 0 0 1 0-1.28zm.64.78L1.28 9.77l4.95 4.95 8.49-8.49-1.1-1.1c-.74.15-1.52-.1-2.08-.67s-.82-1.34-.7-2.14L9.77 1.28zm.53 5.13c.1-.1.25-.1.35 0l.35.35c.1.1.1.26 0 .36l-4.59 4.6a.27.27 0 0 1-.36 0l-.35-.36a.25.25 0 0 1 0-.36l4.6-4.59zm-2.24-.59c.1-.1.26-.1.35 0l.36.35c.1.1.1.26 0 .36L5 10.3c-.1.1-.26.1-.36 0l-.35-.35a.25.25 0 0 1 0-.36l3.77-3.77z"></path>
    </svg>
  );

  return (
    <div className="home-container">
      {/* Add className to control navbar visibility */}
      <div className={`home-content ${hideNavbar ? "hide-navbar" : ""}`}>
        {/* Phần Hero - Hiển thị banner chính của trang */}
        <Hero />

        {/* Phần Highlights - Hiển thị các điểm nổi bật của bảo tàng */}
        <Highlights
          onVisible={handleHighlightsVisible}
          onHidden={handleHighlightsHidden}
        />

        {/* Phần Collections - Hiển thị các bộ sưu tập */}
        <Collections />

        {/* Phần DuPin - Hiển thị thông tin về DuPin */}
        <DuPin />

        {/* Phần DelveInto - Hiển thị phần tìm hiểu thêm */}
        <DelveInto />
      </div>

      {/* Prepare your visit bar */}
      {!isMobile && (
        <div
          className={`prepare-visit-bar ${
            showPrepareVisitBar ? "visible" : ""
          }`}
        >
          <div className="prepare-visit-content">
            <div className="prepare-visit-left">
              <TranslatedText>PREPARE YOUR VISIT</TranslatedText>
            </div>
            <div className="prepare-visit-center">
              <div className="prepare-visit-museum-status">
                <TranslatedText>The museum is open today</TranslatedText>
              </div>
              <div className="prepare-visit-time">
                <span>7:00 AM</span>
                <span className="prepare-visit-time-arrow">→</span>
                <span>21:00 PM</span>
              </div>
            </div>
            <div className="prepare-visit-right">
              <a href="/tickets" className="prepare-visit-button">
                <TicketIcon />
              </a>
              <a href="/visit" className="prepare-visit-button">
                <BoutiqueIcon />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
