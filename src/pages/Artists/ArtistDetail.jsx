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
import {
  getAnPhamImageUrl,
  getHoiThaoNgheThuatImageUrl,
  getInTheoYeuCauImageUrl,
  getKhuyenTaiImageUrl,
  getSanPhamTuThongImageUrl,
  getThoCamImageUrl,
  getThoiTrangImageUrl,
} from "../../utils/cloudinary";
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import "./ArtistDetail.css";

// Artist details data
const artistsData = {
  "Musée Du Pin": {
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784840/logo/logo-icon.webp",
    bio: "Nghệ thuật là sự tôn vinh thiên nhiên.",
    achievements:
      "Musée Du Pin – một dự án nghệ thuật độc lập và tiên phong – được kiến tạo để tôn vinh, gìn giữ và kể lại những giá trị nguyên bản của Đà Lạt",
    influence:
      "Musée Du Pin gìn giữ vẻ đẹp từ khí hậu, rừng Thông và cảnh quan đến kiến trúc, lịch sử và văn hóa dân tộc bản địa vùng cao nguyên.",
    stats: {
      works: 374,
      exhibitions: 89,
      awards: 12,
    },
  },
};

const ArtistDetail = () => {
  const { artistName } = useParams();
  const [artistProducts, setArtistProducts] = useState([]);
  const [allArtistProducts, setAllArtistProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewCount, setPreviewCount] = useState(0);
  const [displayedPages, setDisplayedPages] = useState([]);
  const decodedArtistName = decodeURIComponent(artistName);
  const artistInfo = artistsData[decodedArtistName];

  // Get Cloudinary image URL based on category
  const getImageUrl = (category, filename) => {
    if (!filename) return "";

    switch (category) {
      case "khuyentai":
        return getKhuyenTaiImageUrl(filename);
      case "anpham":
        return getAnPhamImageUrl(filename);
      case "in-theo-yeu-cau":
        return getInTheoYeuCauImageUrl(filename);
      case "hoi-thao-nghe-thuat":
        return getHoiThaoNgheThuatImageUrl(filename);
      case "thoi-trang":
        return getThoiTrangImageUrl(filename);
      case "thocam":
        return getThoCamImageUrl(filename);
      case "san-pham-tu-thong":
      case "sanphamtuthong":
        return getSanPhamTuThongImageUrl(filename);
      default:
        return filename;
    }
  };

  // Calculate min and max prices from products
  const priceRange = useMemo(() => {
    const prices = allArtistProducts.map((product) =>
      parseInt(product.price.replace(/[^\d]/g, ""))
    );
    return {
      min: 0,
      max: Math.max(...prices, 0),
    };
  }, [allArtistProducts]);

  const [selectedFilters, setSelectedFilters] = useState({
    types: [],
    publishYears: [],
    priceRange: [priceRange.min, priceRange.max],
  });

  const [openSections, setOpenSections] = useState({
    types: false,
    publishYears: false,
    priceRange: false,
  });

  useEffect(() => {
    // Get all products from all categories and filter for this artist
    const allProducts = [];
    Object.entries(sampleProducts).forEach(([category, products]) => {
      products.forEach((product) => {
        if (product.artist === decodedArtistName) {
          // Add category to each product if not exists
          allProducts.push({
            ...product,
            category: product.category || category,
            images: product.images || [product.image],
          });
        }
      });
    });

    // Get 5 random products for featured section
    const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
    const featuredProducts = shuffled.slice(0, 5);

    setArtistProducts(featuredProducts);
    setAllArtistProducts(allProducts);
    setFilteredProducts(allProducts);
    setFilteredCount(allProducts.length);
    setPreviewCount(allProducts.length);
  }, [decodedArtistName]);

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
      const yearMatch =
        filters.publishYears.length === 0 ||
        filters.publishYears.includes(product.publishYear);
      const price = parseInt(product.price.replace(/[^\d]/g, ""));
      const priceMatch =
        price >= filters.priceRange[0] && price <= filters.priceRange[1];

      return typeMatch && yearMatch && priceMatch;
    });
  };

  // Update preview count whenever filters change
  useEffect(() => {
    const filtered = filterProducts(allArtistProducts, selectedFilters);
    setPreviewCount(filtered.length);
  }, [selectedFilters, allArtistProducts]);

  // Apply filters
  const applyFilters = () => {
    const filtered = filterProducts(allArtistProducts, selectedFilters);
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
    setShowFilters(false);
    setCurrentPage(1);
  };

  // Reset filters
  const resetFilters = () => {
    const initialFilters = {
      types: [],
      publishYears: [],
      priceRange: [priceRange.min, priceRange.max],
    };
    setSelectedFilters(initialFilters);
    setFilteredProducts(allArtistProducts);
    setFilteredCount(allArtistProducts.length);
    setPreviewCount(allArtistProducts.length);
    setCurrentPage(1);
  };

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

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Pagination
  const productsPerPage = 5;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  // Update pagination logic
  useEffect(() => {
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const currentSet = Math.floor((currentPage - 1) / 5);
    const pages = [];

    for (
      let i = currentSet * 5 + 1;
      i <= Math.min((currentSet + 1) * 5, totalPages);
      i++
    ) {
      pages.push(i);
    }

    setDisplayedPages(pages);
  }, [currentPage, filteredProducts.length]);

  return (
    <div className="artist-detail">
      <Link to="/contents/artists" className="back-button-artists">
        <IoIosArrowBack />
        <span>Quay lại</span>
      </Link>

      <div className="artists-detail-hero">
        <img
          src={artistInfo.image}
          alt={decodedArtistName}
          className="hero-image"
        />
        <h1 className="hero-title notranslate">{decodedArtistName}</h1>
      </div>

      <section className="artists-detail-product">
        <h2 className="section-title">Sản phẩm nổi bật</h2>
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
          {artistProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="artists-detail-item"
              >
                <div className="product-image">
                  <img
                    src={getImageUrl(
                      product.category,
                      product.images?.[0] || product.image
                    )}
                    alt={product.title}
                  />
                </div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {artistInfo && (
        <section className="artists-detail-info">
          <div className="artists-detail-info-container">
            <div className="artist-image">
              <img src={artistInfo.image} alt={decodedArtistName} />
            </div>
            <div className="artist-info">
              <h2 className="notranslate">{decodedArtistName}</h2>
              <p>{artistInfo.bio}</p>
              <p>
                <strong>Thành tựu:</strong> {artistInfo.achievements}
              </p>
              <p>
                <strong>Ảnh hưởng:</strong> {artistInfo.influence}
              </p>
              <div className="artist-stats">
                <div className="stat-item">
                  <h3>{artistInfo.stats.works}</h3>
                  <p>Tác phẩm</p>
                </div>
                <div className="stat-item">
                  <h3>{artistInfo.stats.exhibitions}</h3>
                  <p>Triển lãm</p>
                </div>
                <div className="stat-item">
                  <h3>{artistInfo.stats.awards}</h3>
                  <p>Giải thưởng</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="artists-all-products">
        <h2 className="artists-all-products-title">Tất cả sản phẩm</h2>

        <div className="sort-product-artists">
          <div className="total-products-artists">
            <span className="total-count-artists">{filteredCount}</span>
            <span>sản phẩm</span>
          </div>
          <div className="sort-dropdown-container-artists">
            <div
              className={`sort-dropdown-header-artists ${
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
              <div className="sort-dropdown-menu-artists">
                <div
                  className={`sort-option-artists ${
                    sortOrder === "default" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("default")}
                >
                  <strong>lựa chọn của chúng tôi</strong>
                </div>
                <div
                  className={`sort-option-artists ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                  giá tăng dần
                </div>
                <div
                  className={`sort-option-artists ${
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

        <div className="artists-products-grid">
          {currentProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="artist-product-card"
              key={product.id}
            >
              <div className="artist-product-image">
                <img
                  src={getImageUrl(
                    product.category,
                    product.images?.[0] || product.image
                  )}
                  alt={product.title}
                />
              </div>
              <div className="artist-product-content">
                <h3 className="artist-product-title">{product.title}</h3>
                <p className="artist-product-price">{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="result-pager-artists">
          {displayedPages.map((page) => (
            <button
              key={page}
              className={currentPage === page ? "active" : ""}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          {Math.ceil(filteredProducts.length / productsPerPage) >
            displayedPages[displayedPages.length - 1] && (
            <>
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
                  handlePageChange(
                    Math.min(
                      displayedPages[displayedPages.length - 1] + 1,
                      totalPages
                    )
                  )
                }
                disabled={
                  displayedPages[displayedPages.length - 1] >= totalPages
                }
              >
                <MdKeyboardDoubleArrowRight />
              </button>
            </>
          )}
        </div>
      </section>

      <button
        className="filter-button-artists"
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
        <div className="search-filters-modal-artists">
          <div className="search-filters-content-artists">
            <div className="search-filters-header-artists">
              <h2 className="search-filters-title-artists">Bộ lọc</h2>
              <button
                className="close-filters-button-artists"
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
                  {Array.from(
                    new Set(allArtistProducts.map((p) => p.type))
                  ).map((type) => (
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
                  ))}
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
                    new Set(allArtistProducts.map((p) => p.publishYear))
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
            className="apply-filters-button-artists"
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

export default ArtistDetail;
