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
import "./ArtistDetail.css";

// Artist details data
const artistsData = {
  "Albrecht Dürer": {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Albrecht_D%C3%BCrer_-_Self-Portrait_-_WGA6938.jpg/800px-Albrecht_D%C3%BCrer_-_Self-Portrait_-_WGA6938.jpg",
    bio: "Albrecht Dürer (1471-1528) là một họa sĩ, thợ khắc và nhà lý luận nghệ thuật người Đức thời Phục Hưng. Ông được coi là một trong những nghệ sĩ vĩ đại nhất của thời kỳ Phục Hưng phương Bắc và là người tiên phong trong việc sử dụng kỹ thuật khắc gỗ và khắc đồng.",
    achievements:
      "Dürer đã tạo ra nhiều kiệt tác trong nghệ thuật khắc gỗ và khắc đồng, bao gồm các tác phẩm nổi tiếng như 'Knight, Death and the Devil' (1513), 'Melencolia I' (1514) và 'Saint Jerome in his Study' (1514). Ông cũng là người đầu tiên phát triển lý thuyết về tỷ lệ cơ thể người trong nghệ thuật phương Tây.",
    influence:
      "Ảnh hưởng của ông đến nghệ thuật châu Âu là rất lớn, đặc biệt trong lĩnh vực in ấn và minh họa. Ông cũng là một trong những nghệ sĩ đầu tiên tự vẽ chân dung và viết tự truyện, góp phần định hình vai trò của nghệ sĩ trong xã hội thời Phục Hưng.",
    stats: {
      works: 374,
      exhibitions: 89,
      awards: 12,
    },
  },
  "Antonio Canova": {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Antonio_Canova_Selfportrait_1792.jpg/800px-Antonio_Canova_Selfportrait_1792.jpg",
    bio: "Antonio Canova (1757-1822) là một nhà điêu khắc người Ý, được coi là nghệ sĩ vĩ đại nhất của trường phái Tân cổ điển. Các tác phẩm của ông nổi tiếng với vẻ đẹp lý tưởng và kỹ thuật điêu luyện trong việc xử lý đá cẩm thạch.",
    achievements:
      "Canova đã tạo ra nhiều kiệt tác điêu khắc, trong đó có 'Psyche Revived by Cupid's Kiss', 'The Three Graces', và tượng của Napoleon Bonaparte. Ông được mệnh danh là 'nhà điêu khắc của các vị vua' và được trao tước hiệu Marquis of Ischia.",
    influence:
      "Phong cách của ông đã định hình nên nghệ thuật điêu khắc châu Âu trong thế kỷ 19 và ảnh hưởng sâu sắc đến sự phát triển của trường phái Tân cổ điển. Kỹ thuật xử lý đá cẩm thạch của ông vẫn được nghiên cứu và ngưỡng mộ đến ngày nay.",
    stats: {
      works: 256,
      exhibitions: 67,
      awards: 15,
    },
  },
  "Albrecht Altdorfer": {
    image:
      "https://i0.wp.com/www.myddoa.com/wp-content/uploads/2018/02/albrecht-altdorfer-self-portrait-1530.jpg?resize=908%2C1024&ssl=1",
    bio: "Albrecht Altdorfer (1480-1538) là một họa sĩ, kiến trúc sư và thợ khắc người Đức thời Phục Hưng. Ông được biết đến như một trong những người tiên phong trong việc phát triển phong cách phong cảnh độc lập trong nghệ thuật phương Tây.",
    achievements:
      "Tác phẩm nổi tiếng nhất của ông là 'The Battle of Alexander at Issus', một kiệt tác về nghệ thuật phong cảnh và lịch sử. Ông cũng là người đầu tiên vẽ phong cảnh thuần túy không có nhân vật trong nghệ thuật châu Âu.",
    influence:
      "Altdorfer là người đầu tiên thực sự phát triển thể loại tranh phong cảnh thuần túy trong nghệ thuật phương Tây. Phong cách độc đáo của ông trong việc kết hợp phong cảnh với các chủ đề tôn giáo và thần thoại đã ảnh hưởng sâu sắc đến các thế hệ họa sĩ sau này.",
    stats: {
      works: 189,
      exhibitions: 45,
      awards: 8,
    },
  },
  "Leonardo da Vinci": {
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Leonardo_self.jpg/800px-Leonardo_self.jpg",
    bio: "Leonardo da Vinci (1452-1519) là một thiên tài đa năng người Ý thời kỳ Phục Hưng. Ông là họa sĩ, nhà điêu khắc, kiến trúc sư, nhà khoa học, nhà phát minh, nhà giải phẫu học, nhà toán học và nhà viết văn.",
    achievements:
      "Những kiệt tác nổi tiếng nhất của ông bao gồm 'Mona Lisa', 'Bữa tiệc cuối cùng', và 'Người Vitruvian'. Các phát minh của ông bao gồm máy bay, xe tăng, tàu ngầm và nhiều thiết bị cơ khí tiên tiến khác.",
    influence:
      "Da Vinci được coi là biểu tượng của 'Người phục hưng toàn năng' và là một trong những nghệ sĩ có ảnh hưởng nhất trong lịch sử nghệ thuật. Các nghiên cứu của ông về giải phẫu, quang học và cơ học đã đi trước thời đại hàng thế kỷ.",
    stats: {
      works: 234,
      exhibitions: 156,
      awards: 23,
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
  const decodedArtistName = decodeURIComponent(artistName);
  const artistInfo = artistsData[decodedArtistName];

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
    // Filter products for this artist
    const products = sampleProducts.filter(
      (product) => product.artist === decodedArtistName
    );
    setArtistProducts(products);
    setAllArtistProducts(products);
    setFilteredProducts(products);
    setFilteredCount(products.length);
    setPreviewCount(products.length);
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
    <div className="artist-detail">
      <Link to="/contents/artists" className="back-button-artists">
        <IoIosArrowBack />
        <span>Quay lại</span>
      </Link>

      <div className="artists-detail-hero">
        <img
          src="https://boutique.louvre.fr/files/contents/400859/698402-55c8eeab-bannerxl/contents-698402.jpg"
          alt={decodedArtistName}
          className="hero-image"
        />
        <h1 className="hero-title">{decodedArtistName}</h1>
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
                  <img src={product.image} alt={product.title} />
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
              <h2>{decodedArtistName}</h2>
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
              <img src={product.image} alt={product.title} />
              <div className="artist-product-content">
                <h3>{product.title}</h3>
                <p>{product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="result-pager-artists">
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
