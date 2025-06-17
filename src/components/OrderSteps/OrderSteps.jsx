import React from "react";
import { FaCheck } from "react-icons/fa";
import "./OrderSteps.css";

const OrderSteps = ({ currentStep, onStepClick }) => {
  const steps = [
    { number: 1, title: "Thông tin nhận hàng" },
    { number: 2, title: "Thanh toán đơn hàng" },
    { number: 3, title: "Hoàn tất" },
  ];

  const handleStepClick = (stepNumber) => {
    // Chỉ cho phép click vào các step trước step hiện tại
    if (stepNumber < currentStep) {
      onStepClick(stepNumber);
    }
  };

  return (
    <div className="order-steps">
      {steps.map((step, index) => (
        <div
          key={step.number}
          className={`step ${currentStep === step.number ? "active" : ""} ${
            currentStep > step.number ? "completed clickable" : ""
          }`}
          onClick={() => handleStepClick(step.number)}
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
 