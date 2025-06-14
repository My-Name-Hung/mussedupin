import React, { useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import "./SuccessModal.css";

const SuccessModal = ({ isOpen, message, onClose, title }) => {
  useEffect(() => {
    if (isOpen) {
      // Tự động đóng modal sau 2.5s
      const timer = setTimeout(() => {
        onClose();
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-container">
        <div className="success-icon">
          <FaCheckCircle />
        </div>
        <h2 className="success-title">{title || "Thành công!"}</h2>
        <p className="success-message">{message}</p>
      </div>
    </div>
  );
};

export default SuccessModal;
