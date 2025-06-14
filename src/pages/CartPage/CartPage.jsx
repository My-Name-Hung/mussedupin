import React, { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import LoginModal from "../../components/Auth/LoginModal";
import Notification from "../../components/Notification/Notification";
import PaymentPage from "../PaymentPage/PaymentPage";
import "./CartPage.css";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [savedItems, setSavedItems] = useState([]);
  const [promoCode, setPromoCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountRate, setDiscountRate] = useState(0);
  const [quantities, setQuantities] = useState({});
  const [showQuantityDropdown, setShowQuantityDropdown] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [orderStatus, setOrderStatus] = useState({});

  useEffect(() => {
    loadCartItems();
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const loadCartItems = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const saved = JSON.parse(localStorage.getItem("savedItems")) || [];
    setCartItems(cart);
    setSavedItems(saved);

    // Initialize quantities state
    const quantityState = {};
    cart.forEach((item) => {
      quantityState[item.id] = item.quantity;
    });
    setQuantities(quantityState);

    // Load order status
    const status = JSON.parse(localStorage.getItem("orderStatus")) || {};
    setOrderStatus(status);
  };

  const updateQuantity = (itemId, newQuantity) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    setQuantities({ ...quantities, [itemId]: newQuantity });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const saveForLater = (item) => {
    // Remove from cart
    removeFromCart(item.id);

    // Add to saved items
    const updatedSavedItems = [...savedItems, item];
    setSavedItems(updatedSavedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
  };

  const moveToCart = (item) => {
    // Remove from saved items
    const updatedSavedItems = savedItems.filter(
      (savedItem) => savedItem.id !== item.id
    );
    setSavedItems(updatedSavedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));

    // Add to cart
    const updatedCart = [...cartItems, { ...item, quantity: 1 }];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeSavedItem = (itemId) => {
    const updatedSavedItems = savedItems.filter((item) => item.id !== itemId);
    setSavedItems(updatedSavedItems);
    localStorage.setItem("savedItems", JSON.stringify(updatedSavedItems));
  };

  const PROMO_CODES = {
    langnghethonghat: {
      rate: 0.5,
      message: "Mã giảm giá 50% đã được áp dụng thành công",
    },
    baotangthong: {
      rate: 0.25,
      message: "Mã giảm giá 25% đã được áp dụng thành công",
    },
  };

  const applyPromoCode = () => {
    const promoInfo = PROMO_CODES[promoCode.toLowerCase()];

    if (promoInfo) {
      setDiscountApplied(true);
      setDiscountRate(promoInfo.rate);
      setNotificationMessage(promoInfo.message);
      setNotificationType("success");
      setShowNotification(true);
    } else {
      setDiscountApplied(false);
      setDiscountRate(0);
      setNotificationMessage("Mã giảm giá không hợp lệ");
      setNotificationType("error");
      setShowNotification(true);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);

    return discountApplied ? subtotal * (1 - discountRate) : subtotal;
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowPaymentPage(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    setShowPaymentPage(true);
  };

  const handleOrderReceived = (orderId) => {
    const updatedStatus = { ...orderStatus };
    delete updatedStatus[orderId];
    setOrderStatus(updatedStatus);
    localStorage.setItem("orderStatus", JSON.stringify(updatedStatus));

    // Remove items from cart
    const updatedCart = cartItems.filter(
      (item) => !item.orderId || item.orderId !== orderId
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (showPaymentPage) {
    return (
      <PaymentPage
        cartItems={cartItems}
        onClose={() => setShowPaymentPage(false)}
        onOrderComplete={(orderId) => {
          const newStatus = { ...orderStatus, [orderId]: "ordered" };
          setOrderStatus(newStatus);
          localStorage.setItem("orderStatus", JSON.stringify(newStatus));
        }}
      />
    );
  }

  return (
    <div className="cart-page">
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      <Notification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
        type={notificationType}
      />

      <h1 className="cart-title">Giỏ hàng của tôi</h1>

      <div className="cart-actions-top">
        <button className="checkout-button" onClick={handleCheckout}>
          Đi đến thanh toán
        </button>
        <Link to="/" className="continue-shopping">
          Tiếp tục mua sắm
        </Link>
      </div>

      <div className="cart-content">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="item-details">
              <h3>{item.name}</h3>

              <div className="quantity-selector">
                <div
                  className="quantity-display"
                  onClick={() =>
                    setShowQuantityDropdown(
                      item.id === showQuantityDropdown ? null : item.id
                    )
                  }
                >
                  <span>{quantities[item.id]}</span>
                  {showQuantityDropdown === item.id ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>

                {showQuantityDropdown === item.id && (
                  <div className="quantity-dropdown">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i + 1}
                        className="quantity-option"
                        onClick={() => {
                          updateQuantity(item.id, i + 1);
                          setShowQuantityDropdown(null);
                        }}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <p className="item-price">
                {(item.price * quantities[item.id]).toLocaleString()}đ
              </p>

              <div className="item-actions">
                <button
                  className="remove-item"
                  onClick={() => removeFromCart(item.id)}
                >
                  Xóa khỏi giỏ hàng
                </button>
                <button
                  className="save-for-later"
                  onClick={() => saveForLater(item)}
                >
                  Lưu để xem sau
                </button>
              </div>

              <div className="promo-code">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá"
                  value={promoCode}
                  className="promo-code-input"
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <button className="apply-promo" onClick={applyPromoCode}>
                  Áp dụng
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="cart-total">
          <div className="total-amount">
            Tổng cộng: {calculateTotal().toLocaleString()}đ
          </div>
          <p className="shipping-note">
            Không bao gồm chi phí vận chuyển, hãy chọn tùy chọn vận chuyển
            trước.
          </p>
        </div>

        <div className="product-payment-notes">
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

        <div className="cart-actions-bottom">
          <button className="checkout-button">Đi đến thanh toán</button>
          <Link to="/category" className="continue-shopping">
            Tiếp tục mua sắm
          </Link>
        </div>

        {savedItems.length > 0 && (
          <section className="related-products-payment">
            <h2>Các mục được lưu lại để xem sau</h2>
            <p className="subtitle">
              Các mặt hàng này chỉ được lưu trữ trong giỏ hàng của bạn để sử
              dụng sau.
            </p>

            <div className="saved-items">
              {savedItems.map((item) => (
                <div key={item.id} className="saved-item">
                  <img src={item.image} alt={item.name} />
                  <h3>{item.name}</h3>
                  <p className="price">{item.price.toLocaleString()}đ</p>
                  <div className="saved-item-actions">
                    <button onClick={() => removeSavedItem(item.id)}>
                      Xóa khỏi giỏ hàng
                    </button>
                    <button onClick={() => moveToCart(item)}>
                      Thêm vào giỏ hàng
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {Object.entries(orderStatus).length > 0 && (
          <section className="order-status-section">
            <h2>Trạng thái đơn hàng</h2>
            {Object.entries(orderStatus).map(([orderId, status]) => (
              <div key={orderId} className="order-status-item">
                <p>Mã đơn hàng: {orderId}</p>
                <p>Trạng thái: Đã đặt hàng</p>
                <button
                  className="confirm-received-button"
                  onClick={() => handleOrderReceived(orderId)}
                >
                  Xác nhận đã nhận hàng
                </button>
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default CartPage;
