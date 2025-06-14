import React from "react";
import { FaCheck } from "react-icons/fa";
import "./OrderSteps.css";

const OrderSteps = ({ currentStep }) => {
  const steps = [
    { number: 1, title: "Thông tin nhận hàng" },
    { number: 2, title: "Thanh toán đơn hàng" },
    { number: 3, title: "Hoàn tất" },
  ];

  return (
    <div className="order-steps">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`step ${currentStep === step.number ? "active" : ""} ${
            currentStep > step.number ? "completed" : ""
          }`}
        >
          <div className="step-indicator">
            {currentStep > step.number ? (
              <FaCheck className="check-icon" />
            ) : (
              <span>{step.number}</span>
            )}
          </div>
          <span className="step-title">{step.title}</span>
          {index < steps.length - 1 && <div className="step-line" />}
        </div>
      ))}
    </div>
  );
};

export default OrderSteps;
