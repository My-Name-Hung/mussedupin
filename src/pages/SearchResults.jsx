import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SAMPLE_IMAGES } from "../assets/assets";
import logo from "../assets/Logo/icon.webp";
import TranslatedText from "../components/TranslatedText";
import "../styles/SearchResults.css";

// Mock data - trong ứng dụng thực tế, bạn sẽ cần truy vấn dữ liệu từ API hoặc cơ sở dữ liệu
const mockDatabase = [
  {
    id: 1,
    title: "Mona Lisa",
    type: "Tranh",
    artist: "Leonardo da Vinci",
    year: "1503",
    image: SAMPLE_IMAGES.monalisa,
    description:
      "Mona Lisa là một bức chân dung nửa người do nghệ sĩ người Ý Leonardo da Vinci vẽ.",
  },
  {
    id: 2,
    title: "Venus de Milo",
    type: "Tượng",
    artist: "Alexandros of Antioch",
    year: "130-100 TCN",
    image: SAMPLE_IMAGES.venusdemilo,
    description:
      "Venus de Milo là một bức tượng Hy Lạp cổ đại và là một trong những tác phẩm điêu khắc Hy Lạp cổ đại nổi tiếng nhất.",
  },
  {
    id: 3,
    title: "Tự do dẫn dắt nhân dân",
    type: "Tranh",
    artist: "Eugène Delacroix",
    year: "1830",
    image: SAMPLE_IMAGES.libertyLeading,
    description:
      "Tự do dẫn dắt nhân dân là một bức tranh của Eugène Delacroix kỷ niệm cuộc Cách mạng tháng 7 năm 1830.",
  },
  {
    id: 4,
    title: "Bè của Medusa",
    type: "Tranh",
    artist: "Théodore Géricault",
    year: "1818–1819",
    image: SAMPLE_IMAGES.raftOfMedusa,
    description:
      "Bè của Medusa là một bức tranh sơn dầu của họa sĩ và nhà in thạch bản lãng mạn người Pháp Théodore Géricault.",
  },
  {
    id: 5,
    title: "Lễ đăng quang của Napoleon",
    type: "Tranh",
    artist: "Jacques-Louis David",
    year: "1805–1807",
    image: SAMPLE_IMAGES.coronationNapoleon,
    description:
      "Lễ đăng quang của Napoleon là một bức tranh hoàn thành năm 1807 của Jacques-Louis David.",
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
            <img src={logo} alt="Logo" className="breadcrumb-logo" />
          </Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-label">
            <TranslatedText>Kết quả tìm kiếm</TranslatedText>
          </span>
        </div>

        <div className="search-input-container">
          <h2 className="search-title">
            <TranslatedText>Tìm kiếm</TranslatedText>
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
              placeholder="Tìm kiếm"
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
            <TranslatedText>Tất cả</TranslatedText>
          </button>
          <button className="filter-button">
            <TranslatedText>Triển lãm</TranslatedText>
          </button>
          <button className="filter-button">
            <TranslatedText>Tác phẩm</TranslatedText>
          </button>
        </div>

        <div className="results-header">
          <h2 className="results-count">
            {loading ? (
              <TranslatedText>Đang tìm kiếm...</TranslatedText>
            ) : (
              <TranslatedText>
                {results.length} KẾT QUẢ TÌM THẤY CHO « {query} » :
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
