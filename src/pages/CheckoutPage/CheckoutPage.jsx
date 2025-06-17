import CryptoJS from "crypto-js";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AddressModal from "../../components/AddressModal/AddressModal";
import LoginModal from "../../components/Auth/LoginModal";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
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
  const [discountInfo, setDiscountInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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
    // Load discount info
    const savedDiscount = localStorage.getItem("cartDiscount");
    if (savedDiscount) {
      setDiscountInfo(JSON.parse(savedDiscount));
    }
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

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTotal = () => {
    return discountInfo ? discountInfo.total : calculateSubtotal();
  };

  const generateQRCode = async () => {
    const totalAmount = calculateTotal();
    const qrUrl = `https://api.vietqr.io/image/970418-3144068052-1kOIAUr.jpg?accountName=NGUYEN%20THANH%20HUNG&amount=${totalAmount}`;
    setQrCode(qrUrl);
  };

  // Add VNPAY integration functions
  const generateVNPayURL = async (amount) => {
    const tmnCode = "2Y102M9Q";
    const secretKey = "V78RAFZJ7WFQO8P8DDJQZ4TA1V44QK1S";
    const returnUrl = "http://localhost:3000/vnpay-return";

    const now = new Date();
    const yy = now.getFullYear().toString();
    const MM = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    const createDate = `${yy}${MM}${dd}${hh}${mm}${ss}`;

    const orderId = String(Math.floor(Math.random() * 1000000));

    const rawParams = {
      vnp_Amount: String(Math.round(amount * 100)),
      vnp_Command: "pay",
      vnp_CreateDate: createDate,
      vnp_CurrCode: "VND",
      vnp_IpAddr: window.location.hostname, // sử dụng hostname thực
      vnp_Locale: "vn",
      vnp_OrderInfo: `Thanh toan don hang ${orderId}`,
      vnp_OrderType: "billpayment",
      vnp_ReturnUrl: returnUrl,
      vnp_TmnCode: tmnCode,
      vnp_TxnRef: orderId,
      vnp_Version: "2.1.0",
    };

    const sortedParams = {};
    Object.keys(rawParams)
      .sort()
      .forEach((key) => {
        const v = rawParams[key];
        sortedParams[key] = encodeURIComponent(v).replace(/%20/g, "+");
      });

    const signData = Object.entries(sortedParams)
      .map(([k, v]) => `${k}=${v}`)
      .join("&");

    const hmac = CryptoJS.HmacSHA512(signData, secretKey);
    const secureHash = hmac.toString(CryptoJS.enc.Hex).toUpperCase();

    const queryString = signData; // đã encode & sort
    return `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html?${queryString}&vnp_SecureHash=${secureHash}`;
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      if (!paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán");
        return;
      }
      setIsLoading(true);

      if (paymentMethod === "vnpay") {
        try {
          const totalAmount = calculateTotal();
          const vnpayUrl = await generateVNPayURL(totalAmount);
          window.location.href = vnpayUrl;
          return;
        } catch (error) {
          console.error("Error generating VNPAY URL:", error);
          alert("Có lỗi xảy ra khi tạo URL thanh toán VNPAY");
          setIsLoading(false);
          return;
        }
      }

      if (paymentMethod === "bank") {
        await generateQRCode();
      }

      setCurrentStep(2);
      setIsLoading(false);
    } else if (currentStep === 2) {
      setIsLoading(true);
      await createOrder();
      setIsLoading(false);
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
            discountInfo: discountInfo,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setOrderCode(data.orderCode);
        setShowSuccessModal(true);
        localStorage.removeItem("cart");
        localStorage.removeItem("cartDiscount");
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  const handleStepChange = (stepNumber) => {
    setCurrentStep(stepNumber);
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

      <OrderSteps currentStep={currentStep} onStepClick={handleStepChange} />

      {isLoggedIn && userInfo && (
        <div className="checkout-content">
          {currentStep > 1 && (
            <button
              className="back-step-btn"
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={isLoading}
            >
              <FaArrowLeft /> Quay lại
            </button>
          )}

          {currentStep === 1 && (
            <>
              <section className="shipping-address">
                <h2>Địa chỉ giao hàng</h2>
                <div className="user-info">
                  <p>
                    <strong>Họ tên:</strong> {userInfo.fullName}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {userInfo.phone}
                  </p>
                  <p>
                    <strong>Email:</strong> {userInfo.email}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {userInfo.address?.street}
                  </p>
                  <p>
                    <strong>Thành phố:</strong> {userInfo.address?.city}
                  </p>
                  <p>
                    <strong>Tỉnh/Thành phố:</strong> {userInfo.address?.state}
                  </p>
                </div>
                <button
                  className="change-address-btn"
                  onClick={handleAddressChange}
                >
                  Thay đổi địa chỉ giao hàng
                </button>
              </section>

              <section className="cart-items-checkout">
                <h2>Sản phẩm đã chọn</h2>
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item-checkout">
                    <img src={item.image} alt={item.name} />
                    <div className="item-details-checkout">
                      <h3>{item.name}</h3>
                      <p>Số lượng: {item.quantity}</p>
                      <p className="price">
                        {(item.price * item.quantity).toLocaleString()}đ
                      </p>
                    </div>
                  </div>
                ))}

                <div className="checkout-summary">
                  <div className="summary-row">
                    <span>Tạm tính:</span>
                    <span>{calculateSubtotal().toLocaleString()}đ</span>
                  </div>

                  {discountInfo && discountInfo.applied && (
                    <div className="summary-row discount">
                      <span>Giảm giá ({discountInfo.rate * 100}%):</span>
                      <span>
                        -
                        {(
                          calculateSubtotal() * discountInfo.rate
                        ).toLocaleString()}
                        đ
                      </span>
                    </div>
                  )}

                  <div className="summary-row total">
                    <span>Tổng cộng:</span>
                    <span>{calculateTotal().toLocaleString()}đ</span>
                  </div>
                </div>
              </section>

              <section className="payment-methods">
                <h2>Phương thức thanh toán</h2>
                <div
                  className={`payment-option ${
                    paymentMethod === "vnpay" ? "selected" : ""
                  }`}
                  onClick={() => handlePaymentMethodSelect("vnpay")}
                >
                  <input
                    type="radio"
                    checked={paymentMethod === "vnpay"}
                    onChange={() => {}}
                  />
                  <span>Thanh toán qua VNPAY</span>
                </div>
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
                  {/* <p>Số tiền: {calculateTotal().toLocaleString()}đ</p> */}
                </div>
              )}

              <div className="order-summary">
                <h3>Thông tin đơn hàng</h3>
                <div className="summary-details">
                  <p>
                    <strong>Địa chỉ giao hàng:</strong>
                    {userInfo.address?.street}
                  </p>
                  <p>
                    <strong>Thành phố:</strong>
                    {userInfo.address?.city}
                  </p>
                  <p>
                    <strong>Tỉnh/Thành phố:</strong>
                    {userInfo.address?.state}
                  </p>

                  <p>
                    <strong>Phương thức thanh toán:</strong>
                    {paymentMethod === "bank"
                      ? "Chuyển khoản ngân hàng"
                      : paymentMethod === "vnpay"
                      ? "Thanh toán qua VNPAY"
                      : "Tiền mặt"}
                  </p>

                  <p>
                    <strong>Tạm tính:</strong>
                    {calculateSubtotal().toLocaleString()}đ
                  </p>

                  {discountInfo && discountInfo.applied && (
                    <p>
                      <strong>Giảm giá ({discountInfo.rate * 100}%):</strong>-
                      {(
                        calculateSubtotal() * discountInfo.rate
                      ).toLocaleString()}
                      đ
                    </p>
                  )}

                  <p className="total-price">
                    <strong>Tổng tiền:</strong>
                    {calculateTotal().toLocaleString()}đ
                  </p>
                </div>
              </div>
            </section>
          )}

          <button
            className="next-step-btn"
            onClick={handleNextStep}
            disabled={isLoading}
            style={{
              color: paymentMethod === "bank" ? "yellowgreen" : "white",
            }}
          >
            {isLoading ? (
              <LoadingSpinner
                color={paymentMethod === "bank" ? "yellowgreen" : "white"}
              />
            ) : currentStep === 1 ? (
              "Bước tiếp theo"
            ) : paymentMethod === "bank" ? (
              "Đã thanh toán"
            ) : paymentMethod === "vnpay" ? (
              "Đã thanh toán qua VNPAY"
            ) : (
              "Hoàn tất"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
