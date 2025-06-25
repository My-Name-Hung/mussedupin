import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";

import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const nhaMatThongVideoRef = useRef(null);
  const sectionRefs = {
    intro: useRef(null),
    about: useRef(null),
    nhamatthong: useRef(null),
    contact: useRef(null),
  };

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
      <section className="about-heros" ref={sectionRefs.intro}>
        <div className="heros-video-container">
          <video
            ref={videoRef}
            autoPlay
            muted={isVideoMuted}
            loop
            playsInline
            className={`heros-video ${isVideoLoaded ? "loaded" : ""}`}
          >
            <source
              src={
                "https://res.cloudinary.com/dn0br7hj0/video/upload/v1748830865/about/TVC001_resize.mp4"
              }
              type="video/mp4"
            />
          </video>
          <button
            className="video-mute-button heros-mute-button"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.muted = !isVideoMuted;
                setIsVideoMuted(!isVideoMuted);
              }
            }}
            aria-label={isVideoMuted ? "Unmute video" : "Mute video"}
            style={{ position: "absolute", top: 20, right: 20, zIndex: 10 }}
          >
            {isVideoMuted ? (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16.5 12C16.5 10.23 15.5 8.71 14 7.97V10.18L16.45 12.63C16.48 12.43 16.5 12.22 16.5 12Z"
                  fill="currentColor"
                />
                <path
                  d="M19 12C19 12.94 18.8 13.82 18.46 14.64L19.97 16.15C20.63 14.91 21 13.5 21 12C21 7.72 18 4.14 14 3.23V5.29C16.89 6.15 19 8.83 19 12Z"
                  fill="currentColor"
                />
                <path
                  d="M4.27 3L3 4.27L7.73 9H3V15H7L12 20V13.27L16.25 17.52C15.58 18.04 14.83 18.46 14 18.7V20.77C15.38 20.45 16.63 19.82 17.68 18.96L19.73 21L21 19.73L12 10.73L4.27 3ZM12 4L9.91 6.09L12 8.18V4Z"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.5 8.71 14 7.97V16.02C15.5 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C16.89 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z"
                  fill="currentColor"
                />
              </svg>
            )}
          </button>
        </div>
        {/* <div className="heros-content">
          <h1 className="heros-title">Bảo tàng Thông - Musée Du Pin</h1>
          <p className="heros-subtitle">
              Nơi gìn giữ, nâng niu, những giá trị Đà Lạt
          </p>
        </div> */}
      </section>

      {/* About Section */}
      <section className="about-section" ref={sectionRefs.about}>
        <div className="about-container">
          <h2 className="section-title">Về chúng tôi</h2>
          <div className="about-content">
            <div className="text-contents">
              <p>
                <strong>Bảo Tàng Thông</strong> – một dự án nghệ thuật độc lập
                và tiên phong – được kiến tạo để tôn vinh, gìn giữ và kể lại
                những giá trị nguyên bản của Đà Lạt:
              </p>
              <ul>
                <li>Từ khí hậu, rừng Thông và cảnh quan thiên nhiên,</li>
                <li>
                  Đến kiến trúc, lịch sử và văn hóa dân tộc bản địa vùng cao
                  nguyên.
                </li>
              </ul>
              <p>
                Nơi nghệ thuật không nằm trong khung kính – mà sống cùng con
                người.
              </p>
              <p>
                <strong>Bảo Tàng Thông</strong> là bảo tàng đầu tiên triển khai{" "}
                <em>mô hình lưu trú nghệ thuật</em> – nơi du khách ngủ lại giữa
                không gian trưng bày, thở cùng ánh sáng, bóng nắng, và từng hiện
                vật biết kể chuyện.
              </p>
              <p>
                Với <strong>16 căn phòng - 16 chuyên đề</strong>, mỗi không gian
                là một lát cắt của vùng đất: từ cồng chiêng, bếp lửa, thổ cẩm,
                dược liệu… đến kiến trúc gỗ, khí hậu lạnh, văn hóa cư trú cao
                nguyên.
              </p>
              <p>
                Là nơi tạo ra các đề án bảo tồn Thông, lấy cảm hứng từ Thông như{" "}
                <strong>Nhà Mắt Thông</strong>,{" "}
                <strong>Sân khấu Tình Yêu Thông</strong>, đến những tour du khảo
                kết nối nghệ thuật & rừng đại ngàn...
              </p>
              <p>
                <strong>Bảo Tàng Thông</strong> cũng là điểm đến của cảm xúc. Là
                nơi bạn có thể trải nghiệm:
              </p>
              <ul>
                <li>Khám phá cảm xúc 5 giác quan</li>
                <li>Tay Nặn Tay Vẽ</li>
                <li>Vị Tinh Hoa</li>
                <li>Hồn Thổ Cẩm</li>
                <li>Thì Thầm Langbiang</li>
                <li>Tiếng Chày Khuya</li>
              </ul>
              <p>
                🎶 Và mỗi đêm, lắng nghe tiếng Thông Hát trong chương trình{" "}
                <strong>Vin Acoustique Art</strong> – nơi nghệ thuật và men rượu
                cùng ngân vang giữa lưng trời Đà Lạt trong 1 khán phòng mở được
                thiết kế đặc biệt.
              </p>
              <p>
                ✨ Mỗi chương trình – một thông điệp giáo dục. Chúng tôi tin
                rằng:{" "}
                <em>
                  "Hiện đại không có nghĩa là xóa bỏ lịch sử. Phát triển không
                  đồng nghĩa với phá hủy thiên nhiên."
                </em>
              </p>
              <p>
                Giữa nhịp sống vội vã, <strong>Bảo Tàng Thông</strong> là một
                khoảng lặng để tĩnh – hồi – chữa lành, để mỗi người tự bước vào
                cuộc gặp gỡ sâu sắc với chính mình và vùng đất này.
              </p>
            </div>
            {/* FLIP CARD */}
            <div className="about-images">
              <img
                src="https://res.cloudinary.com/dn0br7hj0/image/upload/about/museumday.png"
                alt="Không gian bảo tàng"
                className="about-museumday-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Nha Mat Thong Section */}
      <section className="nhamatthong-section" ref={sectionRefs.nhamatthong}>
        <div className="nhamatthong-container">
          <h2 className="section-title">
            BẢO TÀNG THÔNG – NƠI CẢM XÚC HÓA THÀNH HÌNH DÁNG
          </h2>
          <div className="nhamatthong-content">
            <div className="nhamatthong-video">
              <video ref={nhaMatThongVideoRef} autoPlay muted loop playsInline>
                <source
                  src="https://res.cloudinary.com/dn0br7hj0/video/upload/v1748849997/NMT.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="nhamatthong-text">
              <div className="text-content">
                <p>
                  Có những nơi không chỉ để ngắm nhìn, mà để cảm nhận bằng tất
                  cả giác quan. Bảo Tàng Thông là một nơi như thế—nơi kiến trúc,
                  thiên nhiên và con người giao thoa, nơi từng đường nét khoáng
                  đạt ôm trọn những xúc cảm lắng sâu, nơi sự tinh tế hiện hữu
                  trong từng chi tiết nhỏ nhất.
                </p>
                <p>
                  Dưới mái vòm cao rộng, ánh sáng len lỏi qua từng góc cạnh,
                  chiếu rọi lên những bức tường mang màu thời gian, phản chiếu
                  lên dáng hình con người trong không gian sang trọng mà vẫn đầy
                  cá tính. Một chiếc ghế trầm mặc đặt bên ô cửa sổ rộng mở, nơi
                  có thể lặng yên nhìn ra đồi thông xa thẳm. Một bậc thang uốn
                  lượn, nơi bước chân ta nhẹ nhàng in lên sàn gỗ mát lành, như
                  bước vào một dòng chảy cảm xúc bất tận.
                </p>
                <p>
                  Ở đây, từng góc nhỏ đều có thể trở thành một khuôn hình hoàn
                  hảo. Một dáng đứng bên vách tường hổ phách lấp lánh, một ánh
                  mắt lặng lẽ soi mình vào tấm kính phản chiếu cả trời xanh.
                  Bước chân đi qua hành lang dài, giữa những mảng sáng tối đan
                  xen, ta như bước qua những mạch truyện đầy suy tư của thời
                  gian.
                </p>
                <p>
                  Bảo Tàng Thông không chỉ là một không gian để ghé thăm. Mà là
                  một nơi để hòa mình, để chiêm nghiệm, để thấy chính mình trong
                  những khoảng lặng rất riêng.
                </p>
              </div>
              <div className="project-info">
                <div className="project-details">
                  <p>
                    <strong>Dự án:</strong> Musée Du Pin
                  </p>
                  <p>
                    <strong>Địa điểm:</strong> Dalat, Vietnam
                  </p>
                  <p>
                    <strong>Tác giả thiết kế:</strong> Hanoi Amsterdam
                    International Company
                  </p>
                </div>
              </div>
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
                  <a href="https://www.google.com/maps?ll=11.923688,108.444684&z=16&t=m&hl=vi&gl=US&mapclient=embed&q=29+%C4%90%E1%BB%91ng+%C4%90a+Ph%C6%B0%E1%BB%9Dng+3+%C4%90%C3%A0+L%E1%BA%A1t+L%C3%A2m+%C4%90%E1%BB%93ng">
                    29-31 Đống Đa, Phường 3, Đà Lạt
                  </a>
                </p>
                <p>
                  <FaPhone className="contact-icon" />
                  <a href="tel:0862356368">+84 862 356 368</a>
                </p>
                <p>
                  <FaEnvelope className="contact-icon" />
                  <a href="mailto:baotangthong2024@gmail.com">
                    baotangthong2024@gmail.com
                  </a>
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
