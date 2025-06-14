import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressModal from "../../components/AddressModal/AddressModal";
import LoginModal from "../../components/Auth/LoginModal";
import OrderSteps from "../../components/OrderSteps/OrderSteps";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderCode, setOrderCode] = useState("");
  const [qrCode, setQrCode] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setShowLoginModal(true);
    } else {
      setIsLoggedIn(true);
      fetchUserInfo();
    }
    loadCartItems();
  }, []);

  const loadCartItems = () => {
    const items = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(items);
  };

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mussedupin.onrender.com/api/user/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setUserInfo(data.user);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    fetchUserInfo();
  };

  const handleAddressChange = () => {
    setShowAddressModal(true);
  };

  const handleAddressUpdate = (newAddress) => {
    setUserInfo({ ...userInfo, address: newAddress });
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const generateQRCode = async () => {
    const totalAmount = calculateTotal();
    const qrUrl = `https://api.vietqr.io/image/970418-113366668888-1kOIAUr.jpg?accountName=NGUYEN%20THANH%20HUNG&amount=${totalAmount}`;
    setQrCode(qrUrl);
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán");
        return;
      }
      if (paymentMethod === "bank") {
        await generateQRCode();
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      await createOrder();
    }
  };

  const createOrder = async () => {
    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId: userInfo.id,
            items: cartItems,
            totalAmount: calculateTotal(),
            shippingAddress: userInfo.address,
            paymentMethod,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setOrderCode(data.orderCode);
        setShowSuccessModal(true);
        localStorage.removeItem("cart");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="checkout-page">
      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => navigate("/cart")}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showAddressModal && (
        <AddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          currentAddress={userInfo?.address}
          onSave={handleAddressUpdate}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => navigate("/cart")}
          message={`Mã đơn hàng ${orderCode} đã được đặt thành công, chúng tôi sẽ sớm liên hệ bạn!`}
        />
      )}

      <OrderSteps currentStep={currentStep} />

      {isLoggedIn && userInfo && (
        <div className="checkout-content">
          <h1 className="checkout-title">Tùy chọn thanh toán</h1>

          {currentStep === 1 && (
            <>
              <section className="shipping-address">
                <h2>Địa chỉ giao hàng</h2>
                <div className="user-info">
                  <p>{userInfo.fullName}</p>
                  <p>
                    {userInfo.address?.street}, {userInfo.address?.city}
                  </p>
                  <p>{userInfo.phone}</p>
                  <p>{userInfo.email}</p>
                </div>
                <button
                  className="change-address-btn"
                  onClick={handleAddressChange}
                >
                  Thay đổi địa chỉ giao hàng
                </button>
              </section>

              <section className="cart-items">
                <h2>Sản phẩm đã chọn</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Số lượng: {item.quantity}</p>
                      <p className="price">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                ))}
              </section>

              <section className="payment-methods">
                <h2>Phương thức thanh toán</h2>
                <div
                  className={`payment-option ${
                    paymentMethod === "bank" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodSelect("bank")}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === "bank"}
                    onChange={() => {}}
                  />
                  <span>Thanh toán qua ngân hàng</span>
                </div>
                <div
                  className={`payment-option ${
                    paymentMethod === "cash" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodSelect("cash")}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === "cash"}
                    onChange={() => {}}
                  />
                  <span>Thanh toán tiền mặt</span>
                </div>
              </section>
            </>
          )}

          {currentStep === 2 && (
            <section className="order-confirmation">
              <h2>Xác nhận đơn hàng</h2>

              {paymentMethod === "bank" && (
                <div className="bank-payment">
                  <h3>Quét mã QR để thanh toán</h3>
                  {qrCode && (
                    <img src={qrCode} alt="QR Code" className="qr-code" />
                  )}
                  <p>Số tiền: {calculateTotal().toLocaleString()}đ</p>
                </div>
              )}

              <div className="order-summary">
                <h3>Thông tin đơn hàng</h3>
                <div className="summary-details">
                  <p>
                    <strong>Địa chỉ giao hàng:</strong>
                  </p>
                  <p>{userInfo.address?.street}</p>
                  <p>
                    {userInfo.address?.city}, {userInfo.address?.state}
                  </p>

                  <p>
                    <strong>Phương thức thanh toán:</strong>
                  </p>
                  <p>
                    {paymentMethod === "bank"
                      ? "Chuyển khoản ngân hàng"
                      : "Tiền mặt"}
                  </p>

                  <p>
                    <strong>Tổng tiền:</strong>{" "}
                    {calculateTotal().toLocaleString()}đ
                  </p>
                </div>
              </div>
            </section>
          )}

          <button
            className="next-step-btn"
            onClick={handleNextStep}
            style={{
              color: paymentMethod === "bank" ? "yellowgreen" : "white",
            }}
          >
            {currentStep === 1
              ? "Bước tiếp theo"
              : paymentMethod === "bank"
              ? "Đã thanh toán"
              : "Hoàn tất"}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
