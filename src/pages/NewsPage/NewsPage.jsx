import React, { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import "./NewsPage.css";

const NewsPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [previewCount, setPreviewCount] = useState(0);

  // Get new products
  const newProducts = sampleProducts.filter((product) => product.isNew);

  // Calculate min and max prices from products
  const priceRange = {
    min: 0,
    max: Math.max(
      ...newProducts.map((product) =>
        parseInt(product.price.replace(/[^\d]/g, ""))
      )
    ),
  };

  const [openSections, setOpenSections] = useState({
    types: false,
    artists: false,
    publishYears: false,
    priceRange: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    types: [],
    artists: [],
    publishYears: [],
    priceRange: [priceRange.min, priceRange.max],
  });

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Filter products based on current filters
  const filterProducts = (products, filters) => {
    return products.filter((product) => {
      const typeMatch =
        filters.types.length === 0 || filters.types.includes(product.type);
      const artistMatch =
        filters.artists.length === 0 ||
        filters.artists.includes(product.artist);
      const yearMatch =
        filters.publishYears.length === 0 ||
        filters.publishYears.includes(product.publishYear);
      const price = parseInt(product.price.replace(/[^\d]/g, ""));
      const priceMatch =
        price >= filters.priceRange[0] && price <= filters.priceRange[1];

      return typeMatch && artistMatch && yearMatch && priceMatch;
    });
  };

  // Update filtered products when filters change
  useEffect(() => {
    const filtered = filterProducts(newProducts, selectedFilters);
    setPreviewCount(filtered.length);
  }, [selectedFilters]);

  // Apply filters
  const applyFilters = () => {
    const filtered = filterProducts(newProducts, selectedFilters);
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
    setShowFilters(false);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    const initialFilters = {
      types: [],
      artists: [],
      publishYears: [],
      priceRange: [priceRange.min, priceRange.max],
    };
    setSelectedFilters(initialFilters);
    setFilteredProducts(newProducts);
    setFilteredCount(newProducts.length);
    setPreviewCount(newProducts.length);
    setCurrentPage(1);
  };

  // Initialize filtered products
  useEffect(() => {
    setFilteredProducts(newProducts);
    setFilteredCount(newProducts.length);
    setPreviewCount(newProducts.length);
  }, []);

  // Handle sort change
  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortDropdown(false);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === "default") {
        return a.id - b.id;
      }
      const priceA = parseInt(a.price.replace(/\D/g, ""));
      const priceB = parseInt(b.price.replace(/\D/g, ""));
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setFilteredProducts(sorted);
  };

  // Pagination
  const productsPerPage = 10;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="news-page">
      <h1 className="news-page-title">Sản phẩm mới</h1>

      <div className="sort-news">
        <div className="total-products">
          <span className="total-count">{filteredCount}</span>
          <span>sản phẩm</span>
        </div>
        <div className="sort-dropdown-container">
          <div
            className={`sort-dropdown-header ${
              showSortDropdown ? "active" : ""
            }`}
            onClick={() => setShowSortDropdown(!showSortDropdown)}
          >
            <span>
              Sắp xếp theo:{" "}
              {sortOrder === "asc"
                ? "giá tăng dần"
                : sortOrder === "desc"
                ? "giá giảm dần"
                : "lựa chọn của chúng tôi"}
            </span>
            <RiArrowDropDownLine
              className={showSortDropdown ? "rotated" : ""}
            />
          </div>
          {showSortDropdown && (
            <div className="sort-dropdown-menu">
              <div
                className={`sort-option ${
                  sortOrder === "default" ? "active" : ""
                }`}
                onClick={() => handleSortChange("default")}
              >
                <strong>lựa chọn của chúng tôi</strong>
              </div>
              <div
                className={`sort-option ${sortOrder === "asc" ? "active" : ""}`}
                onClick={() => handleSortChange("asc")}
              >
                giá tăng dần
              </div>
              <div
                className={`sort-option ${
                  sortOrder === "desc" ? "active" : ""
                }`}
                onClick={() => handleSortChange("desc")}
              >
                giá giảm dần
              </div>
            </div>
          )}
        </div>
      </div>

      <section className="card-image-news">
        <div className="card-grid-news">
          {currentProducts.map((product) => (
            <div key={product.id} className="card-item-news">
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-image"
                />
                <div className="news-content">
                  <h3 className="card-title">{product.title}</h3>
                  <p className="card-price">{product.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <div className="result-pager-news">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={currentPage === i + 1 ? "active" : ""}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          <MdKeyboardArrowRight />
        </button>
        <button
          onClick={() =>
            handlePageChange(Math.min(currentPage + 10, totalPages))
          }
          disabled={currentPage + 10 > totalPages}
        >
          <MdKeyboardDoubleArrowRight />
        </button>
      </div>

      <button
        className="filter-button"
        onClick={() => {
          setShowFilters(true);
          if (!showFilters) {
            resetFilters();
          }
        }}
      >
        {showFilters ? `Kết quả (${previewCount})` : "Bộ lọc"}
      </button>

      {showFilters && (
        <div className="search-filters-modal-news">
          <div className="search-filters-content">
            <div className="search-filters-header">
              <h2 className="search-filters-title">Bộ lọc</h2>
              <button
                className="close-filters-button"
                onClick={() => setShowFilters(false)}
                aria-label="Đóng bộ lọc"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Types Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("types")}
              >
                <h3>Thể loại</h3>
                <RiArrowDropDownLine
                  className={openSections.types ? "rotated" : ""}
                />
              </div>
              {openSections.types && (
                <div className="filter-options">
                  {Array.from(new Set(newProducts.map((p) => p.type))).map(
                    (type) => (
                      <label key={type} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedFilters.types.includes(type)}
                          onChange={(e) => {
                            const newTypes = e.target.checked
                              ? [...selectedFilters.types, type]
                              : selectedFilters.types.filter((t) => t !== type);
                            setSelectedFilters((prev) => ({
                              ...prev,
                              types: newTypes,
                            }));
                          }}
                        />
                        <span>{type}</span>
                      </label>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Artists Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("artists")}
              >
                <h3>Nghệ sĩ</h3>
                <RiArrowDropDownLine
                  className={openSections.artists ? "rotated" : ""}
                />
              </div>
              {openSections.artists && (
                <div className="filter-options">
                  {Array.from(new Set(newProducts.map((p) => p.artist))).map(
                    (artist) => (
                      <label key={artist} className="filter-option">
                        <input
                          type="checkbox"
                          checked={selectedFilters.artists.includes(artist)}
                          onChange={(e) => {
                            const newArtists = e.target.checked
                              ? [...selectedFilters.artists, artist]
                              : selectedFilters.artists.filter(
                                  (a) => a !== artist
                                );
                            setSelectedFilters((prev) => ({
                              ...prev,
                              artists: newArtists,
                            }));
                          }}
                        />
                        <span>{artist}</span>
                      </label>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Publish Years Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("publishYears")}
              >
                <h3>Thời gian xuất bản</h3>
                <RiArrowDropDownLine
                  className={openSections.publishYears ? "rotated" : ""}
                />
              </div>
              {openSections.publishYears && (
                <div className="filter-options">
                  {Array.from(
                    new Set(newProducts.map((p) => p.publishYear))
                  ).map((year) => (
                    <label key={year} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters.publishYears.includes(year)}
                        onChange={(e) => {
                          const newYears = e.target.checked
                            ? [...selectedFilters.publishYears, year]
                            : selectedFilters.publishYears.filter(
                                (y) => y !== year
                              );
                          setSelectedFilters((prev) => ({
                            ...prev,
                            publishYears: newYears,
                          }));
                        }}
                      />
                      <span>{year}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("priceRange")}
              >
                <h3>Giá cả</h3>
                <RiArrowDropDownLine
                  className={openSections.priceRange ? "rotated" : ""}
                />
              </div>
              {openSections.priceRange && (
                <div className="price-range-slider">
                  <div className="price-range-inputs">
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.priceRange[0]}
                      onChange={(e) => {
                        const minValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            Math.min(minValue, prev.priceRange[1]),
                            prev.priceRange[1],
                          ],
                        }));
                      }}
                    />
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.priceRange[1]}
                      onChange={(e) => {
                        const maxValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            prev.priceRange[0],
                            Math.max(maxValue, prev.priceRange[0]),
                          ],
                        }));
                      }}
                    />
                  </div>
                  <div className="price-range-values">
                    <span>{formatPrice(selectedFilters.priceRange[0])}</span>
                    <span>{formatPrice(selectedFilters.priceRange[1])}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="apply-filters-button"
            onClick={applyFilters}
            disabled={previewCount === 0}
          >
            Kết quả ({previewCount})
          </button>
        </div>
      )}
    </div>
  );
};

export default NewsPage;
