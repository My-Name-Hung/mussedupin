import React from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";
import "./SuccessModal.css";

const SuccessModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="success-modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="success-content">
          <FaCheckCircle className="success-icon" />
          <h2>Thành công!</h2>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
