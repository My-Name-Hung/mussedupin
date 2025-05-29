import React from "react";
import logo from "../../assets/Logo/icon.jpg";
import "./Loading.css";

const Loading = ({ progress }) => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="logo-container">
          <img
            src={logo}
            alt="Musée Du Pin Logo"
            className="loading-logo"
            onError={(e) => {
              console.error("Error loading logo:", e);
              e.target.style.display = "none";
            }}
          />
        </div>
        <h1 className="loading-title">Musée Du Pin</h1>
        <div className="loading-bar-container">
          <div className="loading-bar" style={{ width: `${progress}%` }}></div>
        </div>
        <div className="loading-text">{progress}%</div>
      </div>
    </div>
  );
};

export default Loading;
