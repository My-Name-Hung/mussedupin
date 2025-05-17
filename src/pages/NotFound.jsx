import React from "react";
import { Link, useLocation } from "react-router-dom";
import TranslatedText from "../components/TranslatedText";
import logo from "../assets/Logo/icon.jpg";
import "../styles/NotFound.css";

const NotFound = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";

  return (
    <div className="not-found-page">

      <div className="not-found-container">
        <div className="breadcrumb">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="breadcrumb-logo"
            />
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-label">
            <TranslatedText>Search results</TranslatedText>
          </span>
        </div>

        <div className="not-found-content">
          <h1 className="not-found-title">
            <TranslatedText>No results found</TranslatedText>
          </h1>

          <p className="not-found-message">
            <TranslatedText>
              We couldn't find any results for your search: « {query} »
            </TranslatedText>
          </p>

          <div className="not-found-suggestions">
            <h2>
              <TranslatedText>Suggestions:</TranslatedText>
            </h2>
            <ul>
              <li>
                <TranslatedText>
                  Check the spelling of your search term
                </TranslatedText>
              </li>
              <li>
                <TranslatedText>Try using more general keywords</TranslatedText>
              </li>
              <li>
                <TranslatedText>Try using different keywords</TranslatedText>
              </li>
              <li>
                <TranslatedText>
                  Browse our collections by category
                </TranslatedText>
              </li>
            </ul>
          </div>

          <div className="search-again-container">
            <h3 className="search-again-title">
              <TranslatedText>Try another search</TranslatedText>
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
                placeholder="Search"
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
              <TranslatedText>Return to home page</TranslatedText>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
