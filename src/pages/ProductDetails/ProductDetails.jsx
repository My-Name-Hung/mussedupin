import React, { useEffect, useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoIosArrowBack } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Notification from "../../components/Notification/Notification";
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import { exhibitionsData } from "../Exhibitions/Exhibitions";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [productSource, setProductSource] = useState(null);

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
      const catalogProduct = sampleProducts.find(
        (p) => p.title === productId || p.id.toString() === productId
      );
      if (catalogProduct) {
        foundProduct = {
          ...catalogProduct,
          source: "catalog",
        };
        source = {
          type: "catalog",
          category: catalogProduct.type,
        };
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
        related = sampleProducts
          .filter(
            (p) =>
              p.type === foundProduct.type && p.title !== foundProduct.title
          )
          .slice(0, 6);
      }
      setRelatedProducts(related);
    }
  }, [productId]);

  const addToCart = () => {
    const cartItem = {
      id: product.title, // Using title as unique identifier
      name: product.title,
      price: parseFloat(product.price.replace(/[^\d]/g, "")),
      image: product.image,
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
          <img src={product.image} alt={product.title} />
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
          {productSource?.type === "catalog" && (
            <p className="product-category">
              Danh mục: {productSource.category}
            </p>
          )}
          <p className="product-price">{product.price}</p>

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
              <p>Thanh toán an toàn bởi Verifone</p>
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
                  <img src={relatedProduct.image} alt={relatedProduct.title} />
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
