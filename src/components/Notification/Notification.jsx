import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./Notification.css";

const Notification = ({ message, isVisible, onClose, type = "success" }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Auto close after 3 seconds

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`notification-container ${type}`}>
      <div className="notification-content">
        {type === "success" ? (
          <FaCheckCircle className="notification-icon success" />
        ) : (
          <FaTimesCircle className="notification-icon error" />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default Notification;
