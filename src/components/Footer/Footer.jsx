import React, { useState } from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../../assets/Logo/icon.jpg";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
import TranslatedText from "../TranslatedText";
import "./Footer.css";

const Footer = () => {
  const [openSections, setOpenSections] = useState([]);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSection = (index) => {
    setOpenSections((prev) => {
      if (prev.includes(index)) {
        return prev.filter((i) => i !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    navigate("/about");
    setTimeout(() => {
      const element = document.getElementById("contact-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <>
      <footer className="site-footer">
        <div className="footer-content">
          <div className="footer-sections">
            {/* About Section */}
            <div
              className={`footer-section ${
                openSections.includes(0) ? "open" : ""
              }`}
            >
              <h3 className="footer-heading" onClick={() => toggleSection(0)}>
                <TranslatedText>GIỚI THIỆU</TranslatedText>
              </h3>
              <ul className="footer-links">
                <li>
                  <Link to="/about">
                    <TranslatedText>
                      Bảo tàng Du Pin tại Việt Nam
                    </TranslatedText>
                  </Link>
                </li>
                <li>
                  <Link to="/visitor-rules">
                    <TranslatedText>Nội quy tham quan</TranslatedText>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Our Websites Section */}
            <div
              className={`footer-section ${
                openSections.includes(1) ? "open" : ""
              }`}
            >
              <h3 className="footer-heading" onClick={() => toggleSection(1)}>
                <TranslatedText>TRANG WEB CỦA CHÚNG TÔI</TranslatedText>
              </h3>
              <ul className="footer-links">
                <li>
                  <Link to="/tickets">
                    <TranslatedText>Dịch vụ đặt vé trực tuyến</TranslatedText>
                  </Link>
                </li>
                <li>
                  <Link to="https://online-museeduphin.netlify.app/">
                    <TranslatedText>Cửa hàng trực tuyến</TranslatedText>
                  </Link>
                </li>
                <li>
                  <Link to="/collection">
                    <TranslatedText>Bộ sưu tập</TranslatedText>
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div
              className={`footer-section ${
                openSections.includes(2) ? "open" : ""
              }`}
            >
              <h3 className="footer-heading" onClick={() => toggleSection(2)}>
                <TranslatedText>LIÊN HỆ</TranslatedText>
              </h3>
              <ul className="footer-links">
                <li>
                  <Link
                    to="/visit-info#faq"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/visit-info#faq");
                    }}
                  >
                    <TranslatedText>Câu hỏi thường gặp</TranslatedText>
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={handleContactClick}>
                    <TranslatedText>Liên hệ với chúng tôi</TranslatedText>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsFeedbackModalOpen(true);
                    }}
                  >
                    <TranslatedText>Gửi phản hồi cho chúng tôi!</TranslatedText>
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div
              className={`footer-section social-section ${
                openSections.includes(3) ? "open" : ""
              }`}
            >
              <h3 className="footer-heading" onClick={() => toggleSection(3)}>
                <TranslatedText>THEO DÕI CHÚNG TÔI</TranslatedText>
              </h3>
              <div className="social-icons">
                <a
                  href="https://www.facebook.com/BaoTangThongDalat"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal Links */}
          <div className="footer-legal">
            <div className="legal-links">
              <Link to="/legal-notice">
                <TranslatedText>Thông báo pháp lý</TranslatedText>
              </Link>
              <Link to="/privacy-policy">
                <TranslatedText>Chính sách bảo mật</TranslatedText>
              </Link>
              <Link to="/copyrights">
                <TranslatedText>Bản quyền</TranslatedText>
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="footer-logo">
            <Link to="/">
              <img src={logoImage} alt="Logo Bảo tàng Du Pin" />
            </Link>
          </div>
        </div>
      </footer>

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />
    </>
  );
};

export default Footer;
