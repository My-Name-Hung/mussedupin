import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VNPayReturn.css";

const VNPayReturn = () => {
  const [status, setStatus] = useState("processing");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyPayment = () => {
      const searchParams = new URLSearchParams(location.search);
      const vnp_ResponseCode = searchParams.get("vnp_ResponseCode");
      const vnp_TransactionStatus = searchParams.get("vnp_TransactionStatus");

      // Verify the payment response
      if (vnp_ResponseCode === "00" && vnp_TransactionStatus === "00") {
        setStatus("success");
        setMessage("Thanh toán thành công!");
        // Clear cart after successful payment
        localStorage.removeItem("cart");
        localStorage.removeItem("cartDiscount");
      } else {
        setStatus("failed");
        setMessage("Thanh toán thất bại hoặc bị hủy.");
      }
    };

    verifyPayment();
  }, [location]);

  const handleContinue = () => {
    if (status === "success") {
      navigate("/"); // Navigate to home page or order history
    } else {
      navigate("/cart"); // Return to cart if payment failed
    }
  };

  return (
    <div className="vnpay-return">
      <div className="vnpay-return-container">
        <div className={`payment-status ${status}`}>
          <div className="status-icon">{status === "success" ? "✓" : "✕"}</div>
          <h2>
            {status === "success"
              ? "Thanh toán thành công"
              : "Thanh toán thất bại"}
          </h2>
          <p>{message}</p>
          <button onClick={handleContinue}>
            {status === "success" ? "Tiếp tục mua sắm" : "Thử lại"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VNPayReturn;
