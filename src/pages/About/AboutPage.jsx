import React, { useEffect, useRef, useState } from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useTranslation } from "../../contexts/TranslationContext";
import "./AboutPage.css";

const translations = {
  nav: {
    vi: {
      intro: "Giới thiệu",
      about: "Về chúng tôi",
      nhamatthong: "Nhà Mắt Thông",
      contact: "Liên hệ",
    },
    en: {
      intro: "Introduction",
      about: "About Us",
      nhamatthong: "Pine Cone House",
      contact: "Contact",
    },
  },
  about: {
    vi: {
      title: "Về chúng tôi",
      content: [
        "<strong>Bảo Tàng Thông</strong> – một dự án nghệ thuật độc lập và tiên phong – được kiến tạo để tôn vinh, gìn giữ và kể lại những giá trị nguyên bản của Đà Lạt:",
        "Từ khí hậu, rừng Thông và cảnh quan thiên nhiên,",
        "Đến kiến trúc, lịch sử và văn hóa dân tộc bản địa vùng cao nguyên.",
        "Nơi nghệ thuật không nằm trong khung kính – mà sống cùng con người.",
        "<strong>Bảo Tàng Thông</strong> là bảo tàng đầu tiên triển khai <em>mô hình lưu trú nghệ thuật</em> – nơi du khách ngủ lại giữa không gian trưng bày, thở cùng ánh sáng, bóng nắng, và từng hiện vật biết kể chuyện.",
        "Với <strong>16 căn phòng - 16 chuyên đề</strong>, mỗi không gian là một lát cắt của vùng đất: từ cồng chiêng, bếp lửa, thổ cẩm, dược liệu… đến kiến trúc gỗ, khí hậu lạnh, văn hóa cư trú cao nguyên.",
        "Là nơi tạo ra các đề án bảo tồn Thông, lấy cảm hứng từ Thông như <strong>Nhà Mắt Thông</strong>, <strong>Sân khấu Tình Yêu Thông</strong>, đến những tour du khảo kết nối nghệ thuật & rừng đại ngàn...",
        "<strong>Bảo Tàng Thông</strong> cũng là điểm đến của cảm xúc. Là nơi bạn có thể trải nghiệm:",
        "• Khám phá cảm xúc 5 giác quan",
        "• Tay Nặn Tay Vẽ",
        "• Vị Tinh Hoa",
        "• Hồn Thổ Cẩm",
        "• Thì Thầm Langbiang",
        "• Tiếng Chày Khuya",
        "🎶 Và mỗi đêm, lắng nghe tiếng Thông Hát trong chương trình <strong>Vin Acoustique Art</strong> – nơi nghệ thuật và men rượu cùng ngân vang giữa lưng trời Đà Lạt trong 1 khán phòng mở được thiết kế đặc biệt.",
        '✨ Mỗi chương trình – một thông điệp giáo dục. Chúng tôi tin rằng: <em>"Hiện đại không có nghĩa là xóa bỏ lịch sử. Phát triển không đồng nghĩa với phá hủy thiên nhiên."',
        "Giữa nhịp sống vội vã, <strong>Bảo Tàng Thông</strong> là một khoảng lặng để tĩnh – hồi – chữa lành, để mỗi người tự bước vào cuộc gặp gỡ sâu sắc với chính mình và vùng đất này.",
      ],
    },
    en: {
      title: "About Us",
      content: [
        "<strong>Musée Du Pin</strong> – an independent and pioneering art project – was created to honor, preserve and retell the original values of Da Lat:",
        "From the climate, pine forests and natural landscapes,",
        "To the architecture, history and culture of the indigenous people of the highlands.",
        "Where art is not in a glass frame – but lives with people",
        "<strong>Musée Du Pin</strong> is the first museum to implement an art residency model - where visitors sleep in the middle of the exhibition space, breathe in the light, the sun, and each artifact tells a story.",
        "With <strong>16 rooms - 16 topics</strong>, each space is a slice of the land: from gongs, fireplaces, brocade, medicinal herbs... to wooden architecture, cold climate, and highland residential culture.",
        "It is a place that creates projects to preserve pine trees, inspired by pine trees such as the <strong>Cone scale House</strong>, <strong>Pin D'amour Stage</strong>, to tours connecting art and the great forest...",
        "<strong>Musée Du Pin</strong> is also a destination for emotions. It is a place where you can experience:",
        "• Discovering emotions of the 5 senses",
        "• Hand-Molding and Drawing",
        "• The Essence",
        "• The Soul of Brocade",
        "• Langbiang Whisper",
        "• The Sound of the Late Night Pestle",
        "🎶 And every night, listen to the sound of Pine Singing in the <strong>Vin Acoustique Art</strong> program - where art and wine resonate together in the sky of Da Lat in a specially designed open auditorium.",
        '✨ Each program - an educational message. We believe that: <em>"Modernity does not mean erasing history. Development does not mean destroying nature."</em>',
        "In the midst of the hustle and bustle of life, <strong>Musée Du Pin</strong> is a quiet place to meditate - reflect - heal, for each person to enter into a deep encounter with themselves and this land.",
      ],
    },
  },
  nhamatthong: {
    vi: {
      title: "BẢO TÀNG THÔNG – NƠI CẢM XÚC HÓA THÀNH HÌNH DÁNG",
      content: [
        "Có những nơi không chỉ để ngắm nhìn, mà để cảm nhận bằng tất cả giác quan. Bảo Tàng Thông là một nơi như thế—nơi kiến trúc, thiên nhiên và con người giao thoa, nơi từng đường nét khoáng đạt ôm trọn những xúc cảm lắng sâu, nơi sự tinh tế hiện hữu trong từng chi tiết nhỏ nhất.",
        "Dưới mái vòm cao rộng, ánh sáng len lỏi qua từng góc cạnh, chiếu rọi lên những bức tường mang màu thời gian, phản chiếu lên dáng hình con người trong không gian sang trọng mà vẫn đầy cá tính. Một chiếc ghế trầm mặc đặt bên ô cửa sổ rộng mở, nơi có thể lặng yên nhìn ra đồi thông xa thẳm.",
        "Một bậc thang uốn lượn, nơi bước chân ta nhẹ nhàng in lên sàn gỗ mát lành, như bước vào một dòng chảy cảm xúc bất tận.",
        "Ở đây, từng góc nhỏ đều có thể trở thành một khuôn hình hoàn hảo. Một dáng đứng bên vách tường hổ phách lấp lánh, một ánh mắt lặng lẽ soi mình vào tấm kính phản chiếu cả trời xanh.",
        "Bước chân đi qua hành lang dài, giữa những mảng sáng tối đan xen, ta như bước qua những mạch truyện đầy suy tư của thời gian.",
        "Bảo Tàng Thông không chỉ là một không gian để ghé thăm. Mà là một nơi để hòa mình, để chiêm nghiệm, để thấy chính mình trong những khoảng lặng rất riêng.",
      ],
    },
    en: {
      title: "MUSÉE DU PIN – WHERE EMOTIONS TAKE SHAPE",
      content: [
        "There are places that are not just to be seen, but to be felt with all the senses. Musée Du Pin is such a place—where architecture, nature and people intersect, where every open line embraces deep emotions, where sophistication exists in every smallest detail.",
        "Under the high and wide dome, light seeps through every corner, shining on the walls with the color of time, reflecting on the human figure in a luxurious yet unique space. A quiet chair is placed next to the wide open window, where you can quietly look out at the distant pine hills. A winding staircase, where our footsteps gently imprint on the cool wooden floor, like stepping into an endless flow of emotions.",
        "Here, every little corner can become a perfect frame. A figure standing next to a sparkling amber wall, a quiet gaze looking into a glass reflecting the blue sky. Walking through the long hallway, between the intertwined light and dark patches, we seem to walk through the thoughtful stories of time.",
        "Musée Du Pin is not just a place to visit. It is a place to immerse yourself, to contemplate, to find yourself in the silence.",
      ],
    },
  },
};

const AboutPage = () => {
  const [activeSection, setActiveSection] = useState("intro");
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef(null);
  const nhaMatThongVideoRef = useRef(null);
  const { currentLang, registerTranslations } = useTranslation();

  const sectionRefs = {
    intro: useRef(null),
    about: useRef(null),
    nhamatthong: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    registerTranslations("about", translations);
  }, [registerTranslations]);

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
              {translations.nav[currentLang].intro}
            </button>
          </li>
          <li>
            <button
              className={activeSection === "about" ? "active" : ""}
              onClick={() => scrollToSection("about")}
            >
              {translations.nav[currentLang].about}
            </button>
          </li>
          <li>
            <button
              className={activeSection === "nhamatthong" ? "active" : ""}
              onClick={() => scrollToSection("nhamatthong")}
            >
              {translations.nav[currentLang].nhamatthong}
            </button>
          </li>
          <li>
            <button
              className={activeSection === "contact" ? "active" : ""}
              onClick={() => scrollToSection("contact")}
            >
              {translations.nav[currentLang].contact}
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
          <h2 className="section-title">
            {translations.about[currentLang].title}
          </h2>
          <div className="about-content">
            <div className="text-contents">
              {translations.about[currentLang].content.map(
                (paragraph, index) => (
                  <p
                    key={index}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                )
              )}
            </div>
            <div className="about-images">
              <img
                src="https://res.cloudinary.com/dn0br7hj0/image/upload/about/museumday.png"
                alt={
                  currentLang === "en" ? "Museum space" : "Không gian bảo tàng"
                }
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
            {translations.nhamatthong[currentLang].title}
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
                {translations.nhamatthong[currentLang].content.map(
                  (paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  )
                )}
              </div>
              <div className="project-info">
                <div className="project-details">
                  <p>
                    <strong>
                      {currentLang === "en" ? "Project:" : "Dự án:"}
                    </strong>{" "}
                    Musée Du Pin
                  </p>
                  <p>
                    <strong>
                      {currentLang === "en" ? "Location:" : "Địa điểm:"}
                    </strong>{" "}
                    Dalat, Vietnam
                  </p>
                  <p>
                    <strong>
                      {currentLang === "en"
                        ? "Design Author:"
                        : "Tác giả thiết kế:"}
                    </strong>{" "}
                    Hanoi Amsterdam International Company
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
                <h3>
                  <>
                    {currentLang === "en"
                      ? <span className="notranslate">Musée Du Pin</span>
                      : "Bảo tàng Thông - Musée Du Pin"}
                  </>
                </h3>
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
