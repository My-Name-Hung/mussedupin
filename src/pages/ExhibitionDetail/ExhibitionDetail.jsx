import React, { useEffect, useMemo, useState } from "react";
import { IoIosArrowBack, IoMdClose } from "react-icons/io";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { exhibitionsData } from "../Exhibitions/Exhibitions";
import "./ExhibitionDetail.css";

const ExhibitionDetail = () => {
  const { exhibitionId } = useParams();
  const [exhibition, setExhibition] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewCount, setPreviewCount] = useState(0);
  const [selectedFilters, setSelectedFilters] = useState({
    price: [0, 1000000],
    productNames: [],
    searchTerm: "",
  });
  const [openSections, setOpenSections] = useState({
    price: false,
    productNames: false,
  });

  useEffect(() => {
    const currentExhibition = exhibitionsData.find(
      (ex) => ex.id === parseInt(exhibitionId)
    );
    setExhibition(currentExhibition);
    if (currentExhibition) {
      setFilteredProducts(currentExhibition.products);
      setPreviewCount(currentExhibition.products.length);
    }
  }, [exhibitionId]);

  // Calculate price range from products
  const priceRange = useMemo(() => {
    if (!exhibition) return { min: 0, max: 1000000 };
    const prices = exhibition.products.map((product) =>
      parseInt(product.price.replace(/[^\d]/g, ""))
    );
    return {
      min: 0,
      max: Math.max(...prices),
    };
  }, [exhibition]);

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Update preview count whenever filters change
  useEffect(() => {
    if (!exhibition) return;

    const filtered = filterProducts(exhibition.products, selectedFilters);
    setPreviewCount(filtered.length);
  }, [selectedFilters, exhibition]);

  // Filter products based on current filters
  const filterProducts = (products, filters) => {
    return products.filter((product) => {
      const price = parseInt(product.price.replace(/[^\d]/g, ""));
      const priceMatch = price >= filters.price[0] && price <= filters.price[1];

      const nameMatch =
        filters.productNames.length === 0 ||
        filters.productNames.includes(product.title);

      const searchMatch =
        !filters.searchTerm ||
        product.title.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return priceMatch && nameMatch && searchMatch;
    });
  };

  // Apply filters
  const applyFilters = () => {
    if (!exhibition) return;

    const filtered = filterProducts(exhibition.products, selectedFilters);
    setFilteredProducts(filtered);
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    if (!exhibition) return;

    const initialFilters = {
      price: [priceRange.min, priceRange.max],
      productNames: [],
      searchTerm: "",
    };
    setSelectedFilters(initialFilters);
    setFilteredProducts(exhibition.products);
    setPreviewCount(exhibition.products.length);
  };

  if (!exhibition) {
    return <div>Loading...</div>;
  }

  // Handle sort change
  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortDropdown(false);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === "default") {
        return 0;
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

  return (
    <div className="exhibition-detail-page">
      <Link
        to="/contents/exhibitions"
        className="exhibition-detail-page-back-button"
      >
        <IoIosArrowBack />
        <span>Quay lại</span>
      </Link>

      <div className="exhibition-detail-page-hero">
        <div
          className="exhibition-detail-page-hero-background"
          style={{ backgroundImage: `url(${exhibition.image})` }}
        >
          <div className="exhibition-detail-page-hero-overlay"></div>
        </div>
        <div className="exhibition-detail-page-hero-content">
          <h1 className="exhibition-detail-page-hero-title">
            {exhibition.title}
          </h1>
          <p className="exhibition-detail-page-hero-date">{exhibition.date}</p>
          <img
            src={exhibition.image}
            alt={exhibition.title}
            className="exhibition-detail-page-hero-image"
          />
        </div>
      </div>

      <section className="exhibition-detail-page-product">
        <h2 className="exhibition-detail-page-section-title">
          Sản phẩm nổi bật
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={4}
          navigation
          pagination={{
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '"></span>';
            },
          }}
          autoplay={false}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 30,
            },
          }}
        >
          {exhibition.products.map((product) => (
            <SwiperSlide key={product.title}>
              <Link
                to={`/product/${product.title}`}
                className="exhibition-detail-page-item"
              >
                <div className="exhibition-detail-page-product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <h3 className="exhibition-detail-page-product-title">
                  {product.title}
                </h3>
                <p className="exhibition-detail-page-product-price">
                  {product.price}
                </p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <section className="exhibition-detail-page-info">
        <div className="exhibition-detail-page-info-container">
          <div className="exhibition-detail-page-info-image">
            <img src={exhibition.image} alt={exhibition.title} />
          </div>
          <div className="exhibition-detail-page-info-content">
            <h2 className="exhibition-detail-page-info-title">
              {exhibition.title}
            </h2>
            <p className="exhibition-detail-page-info-description">
              Triển lãm {exhibition.title} là một sự kiện nghệ thuật đặc biệt,
              mang đến cho khách tham quan cơ hội khám phá và trải nghiệm những
              tác phẩm độc đáo và ý nghĩa.
            </p>
            <div className="exhibition-detail-page-stats">
              <div className="exhibition-detail-page-stat-item">
                <h3>{exhibition.products.length}</h3>
                <p>Sản phẩm</p>
              </div>
              <div className="exhibition-detail-page-stat-item">
                <h3>
                  {exhibition.status === "inprogress"
                    ? "Đang diễn ra"
                    : "Đã kết thúc"}
                </h3>
                <p>Trạng thái</p>
              </div>
              <div className="exhibition-detail-page-stat-item">
                <h3>{exhibition.date}</h3>
                <p>Thời gian</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="exhibition-detail-page-all-products">
        <h2 className="exhibition-detail-page-all-products-title">
          Tất cả sản phẩm
        </h2>

        <div className="exhibition-detail-page-sort">
          <div className="exhibition-detail-page-total-products">
            <span className="exhibition-detail-page-total-count">
              {filteredProducts.length}
            </span>
            <span>sản phẩm</span>
          </div>
          <div className="exhibition-detail-page-sort-dropdown">
            <div
              className={`exhibition-detail-page-sort-header ${
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
              <div className="exhibition-detail-page-sort-menu">
                <div
                  className={`exhibition-detail-page-sort-option ${
                    sortOrder === "default" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("default")}
                >
                  <strong>lựa chọn của chúng tôi</strong>
                </div>
                <div
                  className={`exhibition-detail-page-sort-option ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                  giá tăng dần
                </div>
                <div
                  className={`exhibition-detail-page-sort-option ${
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

        <div className="exhibition-detail-page-products-grid">
          {currentProducts.map((product) => (
            <Link
              to={`/product/${product.title}`}
              className="exhibition-detail-page-product-card"
              key={product.title}
            >
              <img src={product.image} alt={product.title} />
              <div className="exhibition-detail-page-product-content">
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="exhibition-detail-page-pager">
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
      </section>

      <button
        className="exhibition-detail-page-filter-button"
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
        <div className="exhibition-detail-page-filters-modal">
          <div className="exhibition-detail-page-filters-content">
            <div className="exhibition-detail-page-filters-header">
              <h2 className="exhibition-detail-page-filters-title">Bộ lọc</h2>
              <button
                className="exhibition-detail-page-close-filters"
                onClick={() => setShowFilters(false)}
                aria-label="Đóng bộ lọc"
              >
                <IoMdClose />
              </button>
            </div>

            {/* Search Input */}
            <div className="exhibition-detail-page-search-section">
              <input
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
                value={selectedFilters.searchTerm}
                onChange={(e) => {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                  }));
                }}
                className="exhibition-detail-page-search-input"
              />
            </div>

            {/* Price Range Section */}
            <div className="exhibition-detail-page-filter-section">
              <div
                className="exhibition-detail-page-filter-header"
                onClick={() => toggleSection("price")}
              >
                <h3>Giá cả</h3>
                <RiArrowDropDownLine
                  className={openSections.price ? "rotated" : ""}
                />
              </div>
              {openSections.price && (
                <div className="exhibition-detail-page-price-range">
                  <div className="exhibition-detail-page-price-inputs">
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.price[0]}
                      onChange={(e) => {
                        const minValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          price: [
                            Math.min(minValue, prev.price[1]),
                            prev.price[1],
                          ],
                        }));
                      }}
                    />
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.price[1]}
                      onChange={(e) => {
                        const maxValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          price: [
                            prev.price[0],
                            Math.max(maxValue, prev.price[0]),
                          ],
                        }));
                      }}
                    />
                  </div>
                  <div className="exhibition-detail-page-price-values">
                    <span>{formatPrice(selectedFilters.price[0])}</span>
                    <span>{formatPrice(selectedFilters.price[1])}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Product Names Section */}
            <div className="exhibition-detail-page-filter-section">
              <div
                className="exhibition-detail-page-filter-header"
                onClick={() => toggleSection("productNames")}
              >
                <h3>Sản phẩm</h3>
                <RiArrowDropDownLine
                  className={openSections.productNames ? "rotated" : ""}
                />
              </div>
              {openSections.productNames && (
                <div className="exhibition-detail-page-filter-options">
                  {exhibition.products
                    .filter((product) =>
                      product.title
                        .toLowerCase()
                        .includes(selectedFilters.searchTerm.toLowerCase())
                    )
                    .map((product) => (
                      <label
                        key={product.title}
                        className="exhibition-detail-page-filter-option"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.productNames.includes(
                            product.title
                          )}
                          onChange={(e) => {
                            const newNames = e.target.checked
                              ? [...selectedFilters.productNames, product.title]
                              : selectedFilters.productNames.filter(
                                  (name) => name !== product.title
                                );
                            setSelectedFilters((prev) => ({
                              ...prev,
                              productNames: newNames,
                            }));
                          }}
                        />
                        <span>{product.title}</span>
                        <span className="price">{product.price}</span>
                      </label>
                    ))}
                </div>
              )}
            </div>
          </div>

          <button
            className="exhibition-detail-page-apply-filters"
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

export default ExhibitionDetail;
