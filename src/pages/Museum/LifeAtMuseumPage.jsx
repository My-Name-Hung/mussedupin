import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
import { getImageUrl } from "../../utils/cloudinary";
import "./LifeAtMuseumPage.css";

// Helper function to create URL-friendly slugs from titles
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Khám phá Bảo tàng Thông | Lâm Đồng TV",
    titleEn: "Discover Musée Du Pin | Lam Dong TV",
    date: "8 THÁNG 6 NĂM 2025",
    image: "https://i.ytimg.com/vi/3Diuvj86K1M/maxresdefault.jpg",
    excerpt:
      "Hành trình khám phá không gian nghệ thuật độc đáo giữa rừng thông Đà Lạt, nơi hội tụ và giao thoa của nghệ thuật đương đại và văn hóa bản địa.",
    category: "Video",
    subcategory: "Giới thiệu",
    youtubeUrl: "https://youtu.be/3Diuvj86K1M?si=_Obk6XAH3dFvYqEL&sfnsn=mo",
    content: "",
  },

  // Add more news items here to test pagination...
];

const LifeAtMuseumPage = () => {
  const { currentLang } = useTranslation();
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [displayCount, setDisplayCount] = useState(10);

  // Get all unique categories and subcategories from news data
  const getCategories = () => {
    const categories = new Set();
    newsData.forEach((item) => {
      if (item.category) categories.add(item.category);
    });
    return ["All", ...Array.from(categories)];
  };

  const categories = getCategories();

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Filter news based on selected category
  const getFilteredNews = () => {
    if (selectedFilter === "All") {
      return newsData;
    }
    return newsData.filter(
      (item) =>
        item.category === selectedFilter || item.subcategory === selectedFilter
    );
  };

  // Get displayed news based on filter and display count
  const getDisplayedNews = () => {
    const filteredNews = getFilteredNews();
    return filteredNews.slice(0, displayCount);
  };

  // Handle load more
  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 10);
  };

  // Handle news item click
  const handleNewsClick = (newsItem, e) => {
    e.preventDefault();
    if (newsItem.youtubeUrl) {
      window.open(newsItem.youtubeUrl, "_blank");
    }
  };

  return (
    <div className="life-museum-page">
      {/* Hero Section */}
      <section className="lm-hero animate-section">
        <div className="lm-hero-img-wrapper">
          <img
            className="lm-hero-img"
            src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784642/collections/louvre-sunset.jpg"
            alt="Musée Du Pin - Hero"
          />
        </div>
        <div className="lm-hero-overlay"></div>
        <div className="lm-hero-content">
          <h1 className="lm-hero-title">TIN TỨC</h1>
        </div>
      </section>

      {/* News Section */}
      <section className="lm-news-section animate-section">
        <div className="lm-section-header">
          <h2 className="lm-section-title">Tất cả tin tức</h2>
        </div>

        {/* Filters */}
        <div className="lm-filter-container">
          <div className="lm-filter-label">Lọc theo:</div>
          <div className="lm-filter-options">
            {categories.map((category) => (
              <button
                key={category}
                className={`lm-filter-option ${
                  selectedFilter === category ? "active" : ""
                }`}
                onClick={() => setSelectedFilter(category)}
              >
                {category === "All" ? "Tất cả" : category}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="lm-news-grid">
          {getDisplayedNews().map((newsItem) => (
            <article
              key={newsItem.id}
              className="lm-news-item"
              data-type={newsItem.youtubeUrl ? "video" : "article"}
            >
              <Link
                to={`/life-at-the-museum/${createSlug(newsItem.title)}`}
                onClick={(e) => handleNewsClick(newsItem, e)}
              >
                <div className="lm-news-image-container">
                  <img
                    src={
                      newsItem.useCloudinary
                        ? getImageUrl(newsItem.image)
                        : newsItem.image
                    }
                    alt={newsItem.title}
                    className="lm-news-image"
                  />
                  {newsItem.youtubeUrl && (
                    <div className="lm-news-play-button">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  )}
                  <div className="lm-news-categories">
                    <span className="lm-news-category">
                      {newsItem.category}
                    </span>
                    <span className="lm-news-subcategory">
                      {newsItem.subcategory}
                    </span>
                  </div>
                </div>
                <div className="lm-news-content">
                  <h3 className="lm-news-title">
                    {currentLang === "en" ? (
                      <span className="notranslate">{newsItem.titleEn}</span>
                    ) : (
                      newsItem.title
                    )}
                  </h3>
                  <p className="lm-news-excerpt">{newsItem.excerpt}</p>
                  <time className="lm-news-date">{newsItem.date}</time>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {/* Load More Button - only show if newsData has more than 10 items */}
        {newsData.length > 10 && getFilteredNews().length > displayCount && (
          <button className="lm-see-more-button" onClick={handleLoadMore}>
            <span className="lm-plus-icon">+</span> Xem thêm bài viết
          </button>
        )}
      </section>
    </div>
  );
};

export default LifeAtMuseumPage;
