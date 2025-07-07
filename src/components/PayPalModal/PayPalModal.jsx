import React from "react";
import PayPalButton from "../PayPalButton/PayPalButton";
import "./PayPalModal.css";

const PayPalModal = ({ isOpen, onClose, amount, onSuccess, onError }) => {
  if (!isOpen) return null;

  return (
    <div className="paypal-modal-overlay">
      <div className="paypal-modal">
        <div className="paypal-modal-header">
          <h2>Thanh toán qua PayPal</h2>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="paypal-modal-content">
          <PayPalButton
            amount={amount}
            onSuccess={(order) => {
              onSuccess(order);
              onClose();
            }}
            onError={onError}
          />
        </div>
      </div>
    </div>
  );
};

export default PayPalModal;
