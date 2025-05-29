import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/Logo/icon.jpg";
import TranslatedText from "../components/TranslatedText";
import "../styles/NotFound.css";

const NotFound = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="breadcrumb">
          <Link to="/">
            <img src={logo} alt="Logo" className="breadcrumb-logo" />
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-label">
            <TranslatedText>Kết quả tìm kiếm</TranslatedText>
          </span>
        </div>

        <div className="not-found-content">
          <h1 className="not-found-title">
            <TranslatedText>Không tìm thấy kết quả</TranslatedText>
          </h1>

          <p className="not-found-message">
            <TranslatedText>
              Chúng tôi không thể tìm thấy kết quả nào cho tìm kiếm của bạn: «{" "}
              {query} »
            </TranslatedText>
          </p>

          <div className="not-found-suggestions">
            <h2>
              <TranslatedText>Gợi ý:</TranslatedText>
            </h2>
            <ul>
              <li>
                <TranslatedText>
                  Kiểm tra chính tả của từ khóa tìm kiếm
                </TranslatedText>
              </li>
              <li>
                <TranslatedText>Thử sử dụng từ khóa chung hơn</TranslatedText>
              </li>
              <li>
                <TranslatedText>Thử sử dụng từ khóa khác</TranslatedText>
              </li>
              <li>
                <TranslatedText>
                  Duyệt bộ sưu tập của chúng tôi theo danh mục
                </TranslatedText>
              </li>
            </ul>
          </div>

          <div className="search-again-container">
            <h3 className="search-again-title">
              <TranslatedText>Thử tìm kiếm khác</TranslatedText>
            </h3>

            <div className="search-bar">
              <input
                type="text"
                defaultValue={query}
                onChange={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = `/search-results?q=${encodeURIComponent(
                      e.target.value
                    )}`;
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    window.location.href = `/search-results?q=${encodeURIComponent(
                      e.target.value
                    )}`;
                  }
                }}
                className="search-input"
                placeholder="Tìm kiếm"
              />
              <button
                type="button"
                className="search-button"
                onClick={(e) => {
                  const input = e.target
                    .closest(".search-bar")
                    .querySelector("input");
                  window.location.href = `/search-results?q=${encodeURIComponent(
                    input.value
                  )}`;
                }}
              >
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="back-to-home">
            <Link to="/" className="home-link">
              <TranslatedText>Quay lại trang chủ</TranslatedText>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
