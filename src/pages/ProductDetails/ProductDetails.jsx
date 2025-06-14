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
import "./ProductDetails.css";

// Import the sample products from CategoryDetail
import { sampleProducts } from "../CategoryDetail/CategoryDetail";

const ProductDetails = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Find the current product
    const currentProduct = sampleProducts.find(
      (p) => p.id === parseInt(productId)
    );
    setProduct(currentProduct);

    // Get related products (excluding current product)
    const related = sampleProducts
      .filter((p) => p.id !== parseInt(productId))
      .slice(0, 6);
    setRelatedProducts(related);
  }, [productId]);

  const addToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.title,
      price: parseFloat(product.price.replace(/[^\d]/g, "")),
      image: product.image,
      quantity: 1,
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
    navigate(-1); // Go back to previous page
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
              <h2>Đặc trưng</h2>
              <RiArrowDropDownLine />
            </div>
            {isSpecsOpen && (
              <div className="specs-content">
                <p>Số trang : 168</p>
                <p>Số lượng hình ảnh minh họa : 102</p>
                <p>Kích thước : 16,5x24x2,2cm</p>
                <p>Ngày xuất bản : 16 tháng 1 năm 2025</p>
                <p>Tác giả : {product.artist}</p>
                <p>Thẩm quyền giải quyết : MX037124</p>
                <p>EAN : 9788833672724</p>
                <p>Kích thước của cuốn sách : Bìa mềm có nắp đậy</p>
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
        <h2>Bạn cũng có thể thích</h2>
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
            <SwiperSlide key={relatedProduct.id}>
              <Link
                to={`/product/${relatedProduct.id}`}
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
