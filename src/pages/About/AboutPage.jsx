import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAssets } from "../../hooks/useAssets";
import "./AboutPage.css";

import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const AboutPage = () => {
  const { assets, getAssetUrl } = useAssets();
  const { translate } = useTranslation();
  const [activeSection, setActiveSection] = useState("intro");
  const videoRef = useRef(null);
  const sectionRefs = {
    intro: useRef(null),
    about: useRef(null),
    nhamatthong: useRef(null),
    contact: useRef(null),
  };

  // Find the hero image and other images/videos by filename
  const heroAsset = assets.find((a) => a.filename === "louvre-sunset.webp");
  const khonggianAsset = assets.find((a) => a.filename === "khonggian.webp");
  const nhaAsset = assets.find((a) => a.filename === "nha.webp");
  const nhaVideoAsset = assets.find(
    (a) => a.filename === "NhaMatThong_Resize.mp4"
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      Object.entries(sectionRefs).forEach(([key, ref]) => {
        if (ref.current) {
          const { offsetTop, offsetHeight } = ref.current;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(key);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", () => {
        setIsVideoLoaded(true);
      });
    }
  }, []);

  const scrollToSection = (sectionId) => {
    sectionRefs[sectionId].current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="about-page">
      {/* Navigation Sidebar */}
      <nav className="about-nav">
        <ul>
          <li>
            <button
              className={activeSection === "intro" ? "active" : ""}
              onClick={() => scrollToSection("intro")}
            >
              Giới thiệu
            </button>
          </li>
          <li>
            <button
              className={activeSection === "about" ? "active" : ""}
              onClick={() => scrollToSection("about")}
            >
              Về chúng tôi
            </button>
          </li>
          <li>
            <button
              className={activeSection === "nhamatthong" ? "active" : ""}
              onClick={() => scrollToSection("nhamatthong")}
            >
              Nhà Mắt Thông
            </button>
          </li>
          <li>
            <button
              className={activeSection === "contact" ? "active" : ""}
              onClick={() => scrollToSection("contact")}
            >
              Liên hệ
            </button>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <div className="about-hero">
        {heroAsset && (
          <img
            src={heroAsset.url || getAssetUrl(heroAsset.filename)}
            alt="Bảo tàng Du Pin"
          />
        )}
        <div className="hero-overlay">
          <h1>{translate("about") || "GIỚI THIỆU"}</h1>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section" ref={sectionRefs.about}>
        <div className="about-container">
          <h2 className="section-title">Về chúng tôi</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Bảo tàng Thông - Musée Du Pin được xây dựng vào năm 2024 tại
                thành phố Đà Lạt, là nơi lưu giữ và trưng bày những giá trị văn
                hóa đặc sắc của vùng đất cao nguyên. Với sứ mệnh bảo tồn và phát
                huy những giá trị văn hóa truyền thống, chúng tôi tự hào là cầu
                nối giữa quá khứ và hiện tại.
              </p>
            </div>
            <div className="about-images">
              <figure>
                {khonggianAsset && (
                  <img
                    src={
                      khonggianAsset.url || getAssetUrl(khonggianAsset.filename)
                    }
                    alt="Không gian bảo tàng"
                  />
                )}
                <figcaption>Không gian trưng bày nghệ thuật</figcaption>
              </figure>
              <figure>
                {nhaAsset && (
                  <img
                    src={nhaAsset.url || getAssetUrl(nhaAsset.filename)}
                    alt="Kiến trúc bảo tàng"
                  />
                )}
                <figcaption>Kiến trúc độc đáo của bảo tàng</figcaption>
              </figure>
            </div>
          </div>
        </div>
      </section>

      {/* Nha Mat Thong Section */}
      <section className="nhamatthong-section" ref={sectionRefs.nhamatthong}>
        <div className="nhamatthong-container">
          <h2 className="section-title">
            NHÀ MẮT THÔNG - Tinh hoa kiến trúc của thiên nhiên
          </h2>
          <div className="nhamatthong-content">
            <div className="nhamatthong-video">
              {nhaVideoAsset && (
                <video autoPlay muted loop playsInline>
                  <source
                    src={
                      nhaVideoAsset.url || getAssetUrl(nhaVideoAsset.filename)
                    }
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
            <div className="nhamatthong-text">
              <p>
                Giữa lòng Đà Lạt, Nhà Mắt Thông hiện lên như một khúc ca dịu
                dàng của thiên nhiên và sự sáng tạo. Lấy cảm hứng từ hình dáng
                mắt thông khô – biểu tượng của sự trường tồn và nét đẹp tự
                nhiên, mỗi phiên bản Nhà Mắt Thông là một câu chuyện riêng, mang
                đậm dấu ấn của đất trời Đà Lạt.
              </p>
              <p>
                Từ Thông Mơ thanh thoát không cửa, Thông Lãng nên thơ với cửa
                kính trong suốt như 1 bungalow khép kín, đến Thông Ngọc sang
                trọng với đầy đủ nội thất bếp tiện nghi và Thông Vương kiêu hãnh
                hai tầng quyền lực. Mỗi thiết kế đều là một tác phẩm nghệ thuật,
                gợi lên sự giao thoa giữa hiện đại và vẻ đẹp nguyên sơ.
              </p>
              <p>
                Những ngôi nhà này không chỉ là nơi trú ngụ, mà còn là điểm chạm
                của cảm xúc, nơi con người tìm lại sự an yên giữa vòng tay của
                thiên nhiên. Đó là nơi để lữ khách thả mình trong giai điệu rì
                rào của thông xanh, cảm nhận từng hơi thở trong lành và để tâm
                hồn lặng yên lắng nghe những câu chuyện cổ tích từ đại ngàn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="contact-section"
        ref={sectionRefs.contact}
        id="contact-section"
      >
        <div className="contact-container">
          <h2 className="section-title">Liên hệ</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-details">
                <h3>Bảo tàng Thông - Musée Du Pin</h3>
                <p>
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>29-31 Đống Đa, Phường 3, Đà Lạt</span>
                </p>
                <p>
                  <FaPhone className="contact-icon" />
                  <span>862356368</span>
                </p>
                <p>
                  <FaEnvelope className="contact-icon" />
                  <span>baotangthong2024@gmail.com</span>
                </p>
              </div>
            </div>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6347163633855!2d108.44256451806218!3d11.923690928634585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317113472aaa2ceb%3A0xb2d96d24754e2a02!2zMjkgxJDhu5FuZyDEkGEsIFBoxrDhu51uZyAzLCDEkMOgIEzhuqF0LCBMw6JtIMSQ4buTbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1748493614119!5m2!1svi!2s"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
