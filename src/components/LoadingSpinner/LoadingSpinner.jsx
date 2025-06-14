import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = "small", color = "white" }) => {
  return (
    <div
      className={`loading-spinner ${size}`}
      style={{
        borderColor: color,
        borderTopColor: "transparent",
      }}
    />
  );
};

export default LoadingSpinner;
