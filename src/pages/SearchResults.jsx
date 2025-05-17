import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SAMPLE_IMAGES } from "../assets/assets";
import TranslatedText from "../components/TranslatedText";
import "../styles/SearchResults.css";
import logo from "../assets/Logo/icon.jpg";

// Mock data - trong ứng dụng thực tế, bạn sẽ cần truy vấn dữ liệu từ API hoặc cơ sở dữ liệu
const mockDatabase = [
  {
    id: 1,
    title: "Mona Lisa",
    type: "Painting",
    artist: "Leonardo da Vinci",
    year: "1503",
    image: SAMPLE_IMAGES.monalisa,
    description:
      "The Mona Lisa is a half-length portrait painting by Italian artist Leonardo da Vinci.",
  },
  {
    id: 2,
    title: "Venus de Milo",
    type: "Sculpture",
    artist: "Alexandros of Antioch",
    year: "130-100 BC",
    image: SAMPLE_IMAGES.venusdemilo,
    description:
      "The Venus de Milo is an ancient Greek statue and one of the most famous works of ancient Greek sculpture.",
  },
  {
    id: 3,
    title: "Liberty Leading the People",
    type: "Painting",
    artist: "Eugène Delacroix",
    year: "1830",
    image: SAMPLE_IMAGES.libertyLeading,
    description:
      "Liberty Leading the People is a painting by Eugène Delacroix commemorating the July Revolution of 1830.",
  },
  {
    id: 4,
    title: "The Raft of the Medusa",
    type: "Painting",
    artist: "Théodore Géricault",
    year: "1818–1819",
    image: SAMPLE_IMAGES.raftOfMedusa,
    description:
      "The Raft of the Medusa is an oil painting by the French Romantic painter and lithographer Théodore Géricault.",
  },
  {
    id: 5,
    title: "The Coronation of Napoleon",
    type: "Painting",
    artist: "Jacques-Louis David",
    year: "1805–1807",
    image: SAMPLE_IMAGES.coronationNapoleon,
    description:
      "The Coronation of Napoleon is a painting completed in 1807 by Jacques-Louis David.",
  },
];

const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mô phỏng việc tìm kiếm từ cơ sở dữ liệu
    const searchInDatabase = (searchQuery) => {
      const lowercaseQuery = searchQuery.toLowerCase();
      return mockDatabase.filter(
        (item) =>
          item.title.toLowerCase().includes(lowercaseQuery) ||
          item.artist.toLowerCase().includes(lowercaseQuery) ||
          item.description.toLowerCase().includes(lowercaseQuery) ||
          item.type.toLowerCase().includes(lowercaseQuery)
      );
    };

    // Mô phỏng độ trễ của API
    const timer = setTimeout(() => {
      const searchResults = searchInDatabase(query);
      setResults(searchResults);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // Nếu không có kết quả và không còn loading, chuyển hướng đến trang 404
  useEffect(() => {
    if (!loading && results.length === 0 && query) {
      window.location.href = "/not-found";
    }
  }, [loading, results, query]);

  return (
    <div className="search-results-page">

      <div className="search-results-container">
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

        <div className="search-input-container">
          <h2 className="search-title">
            <TranslatedText>Search</TranslatedText>
          </h2>
          <div className="search-bar">
            <input
              type="text"
              value={query}
              onChange={(e) =>
                (window.location.href = `/search-results?q=${encodeURIComponent(
                  e.target.value
                )}`)
              }
              className="search-input"
              placeholder="Search"
            />
            <button type="button" className="search-button">
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

        <div className="search-filters">
          <button className="filter-button active">
            <TranslatedText>All</TranslatedText>
          </button>
          <button className="filter-button">
            <TranslatedText>Exhibition</TranslatedText>
          </button>
          <button className="filter-button">
            <TranslatedText>Artwork</TranslatedText>
          </button>
        </div>

        <div className="results-header">
          <h2 className="results-count">
            {loading ? (
              <TranslatedText>Searching...</TranslatedText>
            ) : (
              <TranslatedText>
                {results.length} RESULTS FOUND FOR « {query} » :
              </TranslatedText>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="loading-indicator">
            <div className="spinner"></div>
          </div>
        ) : (
          <div className="results-grid">
            {results.map((item) => (
              <div className="result-card" key={item.id}>
                <div className="result-image-container">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="result-image"
                  />
                </div>
                <div className="result-info">
                  <h3 className="result-title">{item.title}</h3>
                  <p className="result-artist">
                    {item.artist}, {item.year}
                  </p>
                  <p className="result-type">{item.type}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
