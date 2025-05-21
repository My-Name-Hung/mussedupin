import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import logoImage from "../../assets/Logo/icon.jpg";
import TranslatedText from "../TranslatedText";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-sections">
          {/* About Section */}
          <div className="footer-section">
            <h3 className="footer-heading">
              <TranslatedText>ABOUT</TranslatedText>
            </h3>
            <ul className="footer-links">
              <li>
                <Link to="/about">
                  <TranslatedText>The Musée Du Pin in VietNam</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/visitor-rules">
                  <TranslatedText>Visitor rules</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/loans">
                  <TranslatedText>Loans and long-term loans</TranslatedText>
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Websites Section */}
          <div className="footer-section">
            <h3 className="footer-heading">
              <TranslatedText>OUR WEBSITES</TranslatedText>
            </h3>
            <ul className="footer-links">
              <li>
                <Link to="/tickets">
                  <TranslatedText>Online ticketing service</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/boutique">
                  <TranslatedText>Online Boutique Shop</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/collection">
                  <TranslatedText>Collection</TranslatedText>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3 className="footer-heading">
              <TranslatedText>CONTACT</TranslatedText>
            </h3>
            <ul className="footer-links">
              <li>
                <Link to="/faq">
                  <TranslatedText>FAQ</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <TranslatedText>Contact us</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/feedback">
                  <TranslatedText>Give us your feedback!</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/jobs">
                  <TranslatedText>Jobs</TranslatedText>
                </Link>
              </li>
              <li>
                <Link to="/private-events">
                  <TranslatedText>Private event and film shoots</TranslatedText>
                </Link>
              </li>
            </ul>
          </div>

          {/* Follow Us Section */}
          <div className="footer-section social-section">
            <h3 className="footer-heading">
              <TranslatedText>FOLLOW US</TranslatedText>
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
              <TranslatedText>Legal Notice</TranslatedText>
            </Link>
            <Link to="/privacy-policy">
              <TranslatedText>Privacy policy</TranslatedText>
            </Link>
            <Link to="/copyrights">
              <TranslatedText>Copyrights</TranslatedText>
            </Link>
          </div>
        </div>

        {/* Logo */}
        <div className="footer-logo">
          <Link to="/">
            <img src={logoImage} alt="Du Pin Musée Logo" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
