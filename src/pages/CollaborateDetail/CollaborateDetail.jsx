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
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import "./CollaborateDetail.css";

// Brand details data
const brandsData = {
  "Harry Nuriev": {
    image:
      "https://boutique.louvre.fr/files/contents/400564/697889-5b1c2d67-xl/harry-nuriev-2.jpg",
    bio: "Harry Nuriev là một nhà thiết kế nội thất và kiến trúc sư người Nga, người sáng lập Crosby Studios. Anh nổi tiếng với phong cách thiết kế độc đáo kết hợp giữa nghệ thuật đương đại và chức năng thực tiễn.",
    achievements:
      "Nuriev đã tạo ra nhiều không gian triển lãm và cửa hàng bán lẻ độc đáo trên khắp thế giới. Các tác phẩm của anh đã được trưng bày tại Design Miami và nhiều triển lãm quốc tế khác.",
    influence:
      "Phong cách thiết kế của Nuriev đã tạo ra một làn sóng mới trong thiết kế nội thất đương đại, với việc sử dụng màu sắc đơn sắc và các hình khối hình học táo bạo.",
    stats: {
      works: 145,
      exhibitions: 42,
      awards: 15,
    },
  },
  "Philippe Apeloig": {
    image:
      "https://boutique.louvre.fr/files/contents/400549/695234-89885e78-xl/philippe-apeloig.jpg",
    bio: "Philippe Apeloig là một nhà thiết kế đồ họa người Pháp nổi tiếng thế giới. Ông được biết đến với phong cách typography độc đáo và thiết kế poster sáng tạo cho các tổ chức văn hóa.",
    achievements:
      "Apeloig đã thiết kế nhiều logo và nhận diện thương hiệu cho các tổ chức văn hóa lớn như Bảo tàng Louvre, Musée d'Orsay và Théâtre du Châtelet.",
    influence:
      "Công việc của ông đã góp phần định hình nên diện mạo của thiết kế đồ họa đương đại Pháp và truyền cảm hứng cho nhiều thế hệ nhà thiết kế.",
    stats: {
      works: 278,
      exhibitions: 56,
      awards: 23,
    },
  },
  Barbapapa: {
    image:
      "https://boutique.louvre.fr/files/contents/400573/697532-920cc925-xl/barbapapa-2.jpg",
    bio: "Barbapapa là một series nhân vật hoạt hình nổi tiếng được tạo ra bởi Annette Tison và Talus Taylor vào năm 1970. Các nhân vật có khả năng thay đổi hình dạng đã trở thành biểu tượng văn hóa.",
    achievements:
      "Series đã được dịch ra hơn 30 ngôn ngữ và phát sóng tại nhiều quốc gia. Thương hiệu đã phát triển thành nhiều sản phẩm từ sách đến đồ chơi và thời trang.",
    influence:
      "Barbapapa đã ảnh hưởng đến văn hóa đại chúng và thiết kế nhân vật hoạt hình, đặc biệt trong việc kết hợp giáo dục với giải trí.",
    stats: {
      works: 156,
      exhibitions: 34,
      awards: 12,
    },
  },
  "Jean-Michel Othoniel": {
    image:
      "https://boutique.louvre.fr/files/contents/400578/695362-10bf7f9a-xl/jean-michel-othoniel-2.jpg",
    bio: "Jean-Michel Othoniel là một nghệ sĩ đương đại người Pháp, nổi tiếng với các tác phẩm điêu khắc thủy tinh quy mô lớn. Ông là nghệ sĩ đầu tiên được mời tạo ra tác phẩm cố định cho Bảo tàng Louvre.",
    achievements:
      "Othoniel đã tạo ra 'Les Belles Danses' cho khu vườn của Bảo tàng Louvre và nhiều tác phẩm công cộng quy mô lớn trên khắp thế giới.",
    influence:
      "Công việc của ông đã mở ra một hướng mới trong nghệ thuật đương đại, đặc biệt trong việc sử dụng thủy tinh như một chất liệu điêu khắc.",
    stats: {
      works: 189,
      exhibitions: 67,
      awards: 18,
    },
  },
};

const CollaborateDetail = () => {
  const { brandName } = useParams();
  const [brandProducts, setBrandProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filteredCount, setFilteredCount] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [previewCount, setPreviewCount] = useState(0);
  const decodedBrandName = decodeURIComponent(brandName);
  const brandInfo = brandsData[decodedBrandName];

  // Calculate min and max prices from products
  const priceRange = useMemo(() => {
    const prices = brandProducts.map((product) =>
      parseInt(product.price.replace(/[^\d]/g, ""))
    );
    return {
      min: 0,
      max: Math.max(...prices, 0),
    };
  }, [brandProducts]);

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
    // Filter products for this brand
    const products = sampleProducts.filter((product) => {
      if (decodedBrandName === "Harry Nuriev") {
        return [1, 2, 3].includes(product.id);
      } else if (decodedBrandName === "Philippe Apeloig") {
        return [4, 5, 6].includes(product.id);
      } else if (decodedBrandName === "Barbapapa") {
        return [7, 8].includes(product.id);
      } else if (decodedBrandName === "Jean-Michel Othoniel") {
        return product.id === 9;
      }
      return false;
    });
    setBrandProducts(products);
    setFilteredProducts(products);
    setFilteredCount(products.length);
    setPreviewCount(products.length);
  }, [decodedBrandName]);

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
    const filtered = filterProducts(brandProducts, selectedFilters);
    setPreviewCount(filtered.length);
  }, [selectedFilters, brandProducts]);

  // Apply filters
  const applyFilters = () => {
    const filtered = filterProducts(brandProducts, selectedFilters);
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
    setFilteredProducts(brandProducts);
    setFilteredCount(brandProducts.length);
    setPreviewCount(brandProducts.length);
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
    <div className="collaborate-detail">
      <Link to="/collaborate" className="back-button-collaborate">
        <IoIosArrowBack />
        <span>Quay lại</span>
      </Link>

      <div className="collaborate-detail-hero">
        <img
          src={brandInfo.image}
          alt={decodedBrandName}
          className="hero-image"
        />
        <h1 className="hero-title">{decodedBrandName}</h1>
      </div>

      <section className="collaborate-detail-product">
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
          {brandProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="collaborate-detail-item"
              >
                <div className="product-image">
                  <img src={product.image} alt={product.title} />
                </div>
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">{product.price}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {brandInfo && (
        <section className="collaborate-detail-info">
          <div className="collaborate-detail-info-container">
            <div className="brand-image">
              <img src={brandInfo.image} alt={decodedBrandName} />
            </div>
            <div className="brand-info">
              <h2>{decodedBrandName}</h2>
              <p>{brandInfo.bio}</p>
              <p>
                <strong>Thành tựu:</strong> {brandInfo.achievements}
              </p>
              <p>
                <strong>Ảnh hưởng:</strong> {brandInfo.influence}
              </p>
              <div className="brand-stats">
                <div className="stat-item">
                  <h3>{brandInfo.stats.works}</h3>
                  <p>Tác phẩm</p>
                </div>
                <div className="stat-item">
                  <h3>{brandInfo.stats.exhibitions}</h3>
                  <p>Triển lãm</p>
                </div>
                <div className="stat-item">
                  <h3>{brandInfo.stats.awards}</h3>
                  <p>Giải thưởng</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="collaborate-all-products">
        <h2 className="collaborate-all-products-title">Tất cả sản phẩm</h2>

        <div className="sort-product-collaborate">
          <div className="total-products-collaborate">
            <span className="total-count-collaborate">{filteredCount}</span>
            <span>sản phẩm</span>
          </div>
          <div className="sort-dropdown-container-collaborate">
            <div
              className={`sort-dropdown-header-collaborate ${
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
              <div className="sort-dropdown-menu-collaborate">
                <div
                  className={`sort-option-collaborate ${
                    sortOrder === "default" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("default")}
                >
                  <strong>lựa chọn của chúng tôi</strong>
                </div>
                <div
                  className={`sort-option-collaborate ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                  giá tăng dần
                </div>
                <div
                  className={`sort-option-collaborate ${
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

        <div className="collaborate-products-grid">
          {currentProducts.map((product) => (
            <Link
              to={`/product/${product.id}`}
              className="collaborate-product-card"
              key={product.id}
            >
              <img src={product.image} alt={product.title} />
              <div className="collaborate-product-content">
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="result-pager-collaborate">
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
        className="filter-button-collaborate"
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
        <div className="search-filters-modal-collaborate">
          <div className="search-filters-content-collaborate">
            <div className="search-filters-header-collaborate">
              <h2 className="search-filters-title-collaborate">Bộ lọc</h2>
              <button
                className="close-filters-button-collaborate"
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
                  {Array.from(new Set(brandProducts.map((p) => p.type))).map(
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
                    new Set(brandProducts.map((p) => p.publishYear))
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
            className="apply-filters-button-collaborate"
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

export default CollaborateDetail;
