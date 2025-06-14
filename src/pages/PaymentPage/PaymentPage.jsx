import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import "./PaymentPage.css";

const PaymentPage = ({ cartItems, onClose, onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [editAddress, setEditAddress] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mussedupin.onrender.com/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleAddressUpdate = async (newAddress) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mussedupin.onrender.com/api/user/update-address",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ address: newAddress }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setUserData({ ...userData, address: newAddress });
        setShowAddressModal(false);
        setEditAddress(null);
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handlePayment = async () => {
    if (paymentMethod === "zalopay") {
      try {
        const response = await fetch(
          "https://mussedupin.onrender.com/api/payment/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              items: cartItems,
              address: userData.address,
              paymentMethod: "zalopay",
            }),
          }
        );
        const data = await response.json();
        if (data.success) {
          window.location.href = data.order_url; // Redirect to ZaloPay payment page
        }
      } catch (error) {
        console.error("Error creating ZaloPay order:", error);
      }
    } else {
      setShowConfirmModal(true);
    }
  };

  const confirmOrder = async () => {
    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/orders/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            items: cartItems,
            address: userData.address,
            paymentMethod: paymentMethod,
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        setShowConfirmModal(false);
        setShowSuccessModal(true);
        onOrderComplete(data.orderId);
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div
      className="payment-page"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dn0br7hj0/image/upload/background/Background2.webp")',
        backgroundRepeat: "repeat",
        backgroundPosition: "top center",
        backgroundSize: "300px",
        imageRendering: "-webkit-optimize-contrast",
      }}
    >
      <div className="order-steps">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`step ${currentStep >= step ? "completed" : ""}`}
          >
            {currentStep > step ? (
              <FaCheck className="step-icon" />
            ) : (
              <span className="step-number">{step}</span>
            )}
            <span className="step-label">
              {step === 1
                ? "Địa chỉ"
                : step === 2
                ? "Vận chuyển"
                : step === 3
                ? "Thanh toán"
                : "Xác nhận"}
            </span>
          </div>
        ))}
      </div>

      <section className="shipping-section">
        <h2
          className="section-title"
          style={{ fontFamily: "Roboo, sans-serif" }}
        >
          Tùy chọn vận chuyển
        </h2>

        <div className="shipping-address">
          <h3 style={{ fontFamily: "Roboo, sans-serif" }}>Địa chỉ giao hàng</h3>
          {userData && (
            <div className="user-info">
              <p>{userData.fullName}</p>
              <p>
                {userData.address.street}, {userData.address.city},{" "}
                {userData.address.state}
              </p>
              <p>{userData.phone}</p>
              <p>{userData.email}</p>
            </div>
          )}
          <button
            className="change-address"
            onClick={() => setShowAddressModal(true)}
          >
            Thay đổi địa chỉ giao hàng
          </button>
        </div>

        <div className="cart-items">
          <h3>Sản phẩm đã chọn</h3>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="item-details">
                <h4>{item.name}</h4>
                <p>Số lượng: {item.quantity}</p>
                <p>Giá: {item.price.toLocaleString()}đ</p>
              </div>
            </div>
          ))}
        </div>

        <div className="payment-methods">
          <h3>Phương thức thanh toán</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="zalopay"
                checked={paymentMethod === "zalopay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Thanh toán qua ZaloPay
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="cash"
                checked={paymentMethod === "cash"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Thanh toán tiền mặt khi nhận hàng
            </label>
          </div>
        </div>

        <button
          className="continue-button"
          onClick={handlePayment}
          disabled={!paymentMethod}
        >
          Tiếp tục
        </button>
      </section>

      {showAddressModal && (
        <AddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          onSubmit={handleAddressUpdate}
          currentAddress={editAddress || userData?.address}
        />
      )}

      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={confirmOrder}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          message="Đơn hàng đã được đặt thành công, chúng tôi sẽ sớm liên hệ bạn!"
          onClose={() => {
            setShowSuccessModal(false);
            onClose();
          }}
        />
      )}
    </div>
  );
};

const AddressModal = ({ isOpen, onClose, onSubmit, currentAddress }) => {
  const [address, setAddress] = useState(
    currentAddress || {
      street: "",
      city: "",
      state: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Thay đổi địa chỉ giao hàng</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              required
            />
          </div>
          <div className="form-group">
            <label>Thành phố</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Tỉnh/Thành phố</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Lưu thay đổi</button>
            <button type="button" onClick={onClose}>
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Xác nhận đơn hàng</h2>
        <p>Bạn có chắc chắn muốn đặt đơn hàng này?</p>
        <div className="modal-actions">
          <button onClick={onConfirm}>Xác nhận</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

const SuccessModal = ({ isOpen, message, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2>Thành công!</h2>
        <p>{message}</p>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default PaymentPage;
