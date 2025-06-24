import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Notification from "../../components/Notification/Notification";
import {
  getAnPhamImageUrl,
  getDoTrangSucImageUrl,
  getHoiThaoNgheThuatImageUrl,
  getInTheoYeuCauImageUrl,
  getKhuyenTaiImageUrl,
  getSanPhamTuThongImageUrl,
  getThoCamImageUrl,
  getThoiTrangImageUrl,
} from "../../utils/cloudinary";
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import { exhibitionsData } from "../Exhibitions/Exhibitions";
import "./ProductDetails.css";

// Helper function to get image URL based on category
const getImageUrl = (category, filename) => {
  switch (category) {
    case "khuyentai":
      return getKhuyenTaiImageUrl(filename);
    case "anpham":
      return getAnPhamImageUrl(filename);
    case "in-theo-yeu-cau":
      return getInTheoYeuCauImageUrl(filename);
    case "hoi-thao-nghe-thuat":
      return getHoiThaoNgheThuatImageUrl(filename);
    case "thoi-trang-va-phu-kien":
      return getThoiTrangImageUrl(filename);
    case "do-trang-suc":
      return getDoTrangSucImageUrl(filename);
    case "thocam":
      return getThoCamImageUrl(filename);
    case "sanphamtuthong":
      return getSanPhamTuThongImageUrl(filename);
    default:
      return "";
  }
};

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [productSource, setProductSource] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showFullscreen, setShowFullscreen] = useState(false);
  const [fullscreenImageIndex, setFullscreenImageIndex] = useState(0);

  useEffect(() => {
    let foundProduct = null;
    let source = null;

    // First, try to find the product in exhibitionsData
    for (const exhibition of exhibitionsData) {
      const exhibitionProduct = exhibition.products.find(
        (p) => p.title === productId
      );
      if (exhibitionProduct) {
        foundProduct = {
          ...exhibitionProduct,
          exhibitionTitle: exhibition.title,
          exhibitionId: exhibition.id,
          exhibitionDate: exhibition.date,
          source: "exhibition",
        };
        source = {
          type: "exhibition",
          id: exhibition.id,
          title: exhibition.title,
          date: exhibition.date,
        };
        break;
      }
    }

    // If not found in exhibitions, try sampleProducts
    if (!foundProduct) {
      // Search through all categories in sampleProducts
      for (const category in sampleProducts) {
        const categoryProducts = sampleProducts[category];
        const catalogProduct = categoryProducts.find(
          (p) => p.id === productId || p.title === productId
        );
        if (catalogProduct) {
          foundProduct = {
            ...catalogProduct,
            source: "catalog",
          };
          source = {
            type: "catalog",
            category: category,
          };
          break;
        }
      }
    }

    setProduct(foundProduct);
    setProductSource(source);

    // Set related products based on source
    if (foundProduct) {
      let related = [];
      if (source.type === "exhibition") {
        // Get products from the same exhibition
        related = exhibitionsData
          .find((e) => e.id === source.id)
          .products.filter((p) => p.title !== foundProduct.title)
          .slice(0, 6);
      } else {
        // Get products from the same category
        related = sampleProducts[source.category]
          .filter((p) => p.id !== foundProduct.id)
          .slice(0, 6);
      }
      setRelatedProducts(related);
    }
  }, [productId]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleImageClick = () => {
    setShowImageModal(true);
  };

  const addToCart = () => {
    const cartItem = {
      id: product.title, // Using title as unique identifier
      name: product.title,
      price: parseFloat(product.price.replace(/[^\d]/g, "")),
      image: product.image,
      category: product.category, // Add category for image URL generation
      quantity: 1,
      source: productSource,
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if product already exists in cart
    const existingItemIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      existingCart[existingItemIndex].quantity += 1;
    } else {
      // Add new item if it doesn't exist
      existingCart.push(cartItem);
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(existingCart));

    // Dispatch event to update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));

    // Show notification
    setShowNotification(true);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleFullscreenPrev = () => {
    setFullscreenImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleFullscreenNext = () => {
    setFullscreenImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const openFullscreen = (index) => {
    setFullscreenImageIndex(index);
    setShowFullscreen(true);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details">
      <Notification
        message="Sản phẩm đã được thêm vào giỏ hàng thành công"
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <button onClick={handleGoBack} className="back-button-product">
        <IoIosArrowBack />
        <span>Quay lại</span>
      </button>

      <div className="product-main">
        <div className="product-image">
          <div className="slideshow-container-product">
            <button
              className="nav-button-product prev"
              onClick={handlePrevImage}
            >
              <MdNavigateBefore />
            </button>
            <img
              src={getImageUrl(
                product.category,
                product.images[currentImageIndex]
              )}
              alt={product.title}
              onClick={handleImageClick}
            />
            <button
              className="nav-button-product next"
              onClick={handleNextImage}
            >
              <MdNavigateNext />
            </button>
            {product.images.length > 1 && (
              <div className="image-counter-product">
                {currentImageIndex + 1} / {product.images.length}
              </div>
            )}
          </div>
        </div>

        <div className="product-info">
          <h1 className="product-title">{product.title}</h1>
          {productSource?.type === "exhibition" && (
            <>
              <p className="product-exhibition">
                Từ triển lãm: {productSource.title}
              </p>
              <p className="product-exhibition-date">
                Thời gian: {productSource.date}
              </p>
            </>
          )}
          <a className="product-price-detail">{product.price}</a>
          {productSource?.type === "catalog" && (
            <p className="product-category">
              Danh mục: {productSource.category}
            </p>
          )}
          {product.size && <p className="product-size">{product.size}</p>}

          <button className="add-to-cart" onClick={addToCart}>
            <BsCart3 />
            Thêm vào giỏ hàng
          </button>

          <div className="product-specs">
            <div
              className={`specs-header ${isSpecsOpen ? "open" : ""}`}
              onClick={() => setIsSpecsOpen(!isSpecsOpen)}
            >
              <h2>Thông tin sản phẩm</h2>
              <RiArrowDropDownLine />
            </div>
            {isSpecsOpen && (
              <div className="specs-content">
                <p>Tên sản phẩm: {product.title}</p>
                <p>Giá: {product.price}</p>
                {product.size && <p>Kích thước: {product.size}</p>}
                {productSource?.type === "exhibition" && (
                  <>
                    <p>Triển lãm: {productSource.title}</p>
                    <p>Thời gian: {productSource.date}</p>
                  </>
                )}
                {productSource?.type === "catalog" && (
                  <>
                    <p>Danh mục: {productSource.category}</p>
                    <p>Nghệ sĩ: {product.artist}</p>
                    <p>Năm xuất bản: {product.publishYear}</p>
                  </>
                )}
                <p>
                  Mã sản phẩm: {product.title.replace(/\s+/g, "").toLowerCase()}
                </p>
              </div>
            )}
          </div>

          <div className="product-notes">
            <div className="note-item">
              <span className="checkmark">✓</span>
              <p>Thanh toán an toàn</p>
            </div>
            <div className="note-item">
              <span className="checkmark">✓</span>
              <p>
                Hài lòng hoặc được hoàn lại tiền trong vòng 14 ngày để thay đổi
                quyết định
              </p>
            </div>
            <div className="note-item">
              <span className="checkmark">✓</span>
              <p>Giao hàng trong vòng 1 đến 2 ngày làm việc</p>
            </div>
          </div>
        </div>
      </div>

      {showImageModal && (
        <div className="image-modal">
          <button
            className="modal-close"
            onClick={() => setShowImageModal(false)}
          >
            <IoClose />
          </button>
          <div className="modal-grid">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="modal-image-container"
                onClick={() => openFullscreen(index)}
              >
                <img
                  src={getImageUrl(product.category, image)}
                  alt={`${product.title} ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {showFullscreen && (
        <div className="fullscreen-viewer">
          <button
            className="fullscreen-close"
            onClick={() => setShowFullscreen(false)}
          >
            <IoClose />
          </button>
          <button
            className="fullscreen-nav prev"
            onClick={handleFullscreenPrev}
          >
            <MdNavigateBefore />
          </button>
          <div className="fullscreen-image">
            <img
              src={getImageUrl(
                product.category,
                product.images[fullscreenImageIndex]
              )}
              alt={`${product.title} ${fullscreenImageIndex + 1}`}
            />
          </div>
          <button
            className="fullscreen-nav next"
            onClick={handleFullscreenNext}
          >
            <MdNavigateNext />
          </button>
        </div>
      )}

      <section className="related-products">
        <h2>
          {productSource?.type === "exhibition"
            ? `Sản phẩm liên quan từ triển lãm ${productSource.title}`
            : "Sản phẩm cùng danh mục"}
        </h2>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={4}
          navigation
          pagination={{ clickable: true }}
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
          {relatedProducts.map((relatedProduct) => (
            <SwiperSlide key={relatedProduct.title}>
              <Link
                to={`/product/${relatedProduct.title}`}
                className="related-product-card"
              >
                <div className="related-product-image">
                  <img
                    src={getImageUrl(
                      relatedProduct.category,
                      relatedProduct.image
                    )}
                    alt={relatedProduct.title}
                  />
                </div>
                <h3>{relatedProduct.title}</h3>
                <p className="price">{relatedProduct.price}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default ProductDetails;
