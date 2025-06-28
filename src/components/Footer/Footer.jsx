import React, { useState } from "react";
import { FaFacebook, FaYoutube } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import FeedbackModal from "../FeedbackModal/FeedbackModal";
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
    navigate("https://museedupin.netlify.app/about");
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
                GIỚI THIỆU
              </h3>
              <ul className="footer-links">
                <li>
                  <Link
                    to="https://museedupin.netlify.app/about"
                    target="_blank"
                  >
                    <span className="notranslate">Musée Du Pin</span> Việt Nam
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://museedupin.netlify.app/visitor-rules"
                    target="_blank"
                  >
                    Nội quy tham quan
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
                TRANG WEB CỦA CHÚNG TÔI
              </h3>
              <ul className="footer-links">
                <li>
                  <Link
                    to="https://online-museeduphin.netlify.app/"
                    target="_blank"
                  >
                    Dịch vụ đặt vé trực tuyến
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://museedupin.netlify.app/collection"
                    target="_blank"
                  >
                    Bộ sưu tập
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
                LIÊN HỆ
              </h3>
              <ul className="footer-links">
                <li>
                  <Link
                    to="https://museedupin.netlify.app/visit-info#faq"
                    target="_blank"
                  >
                    Câu hỏi thường gặp
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={handleContactClick}>
                    Liên hệ với chúng tôi
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
                    Gửi phản hồi cho chúng tôi!
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
                THEO DÕI CHÚNG TÔI
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
                  href="https://www.tiktok.com/@baotangthongdalat?_t=ZS-8wcfw9TGrnm&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                >
                  <SiTiktok />
                </a>
                <a
                  href="https://www.youtube.com/channel/UCyxLbhgBPZ3KnGD_KeLCo9A"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal Links */}
          <div className="footer-legal">
            <div className="legal-links">
              <Link to="/legal-notice">Thông báo pháp lý</Link>
              <Link to="/privacy-policy">Chính sách bảo mật</Link>
              <Link to="/copyrights">Bản quyền</Link>
            </div>
          </div>

          {/* Logo */}
          <div className="footer-logo">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784840/logo/icon.png"
                alt={`Bảo tàng Thông - ${String.fromCharCode(160)}Musée Du Pin`}
                className="notranslate"
              />
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
