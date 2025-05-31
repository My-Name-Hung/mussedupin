import React from "react";
import logo from "../../assets/Logo/logo-icon.webp";
import "./Loading.css";

const Loading = ({ progress, priorityDone, children }) => {
  return (
    <div className={`loading-screen ${priorityDone ? "priority-loaded" : ""}`}>
      <div className="loading-content">
        <div className="logo-container">
          <img
            src={logo}
            alt="Musée Du Pin Logo"
            className="loading-logo"
            fetchPriority="high"
            onError={(e) => {
              console.error("Error loading logo:", e);
              e.target.style.display = "none";
            }}
          />
        </div>
        <h1 className="loading-title">Musée Du Pin</h1>
        <div className="loading-bar-container">
          <div
            className="loading-bar"
            style={{
              width: `${progress}%`,
              transition: priorityDone ? "width 0.3s ease-out" : "none",
            }}
          ></div>
        </div>
        <div className="loading-text">
          {priorityDone ? (
            <span>Đang tải nội dung bổ sung ({progress}%)</span>
          ) : (
            <span>Đang tải nội dung chính ({progress}%)</span>
          )}
        </div>
      </div>

      {/* Render children in background when priority content is loaded */}
      <div
        className={`loading-background-content ${
          priorityDone ? "visible" : ""
        }`}
      >
        {priorityDone && children}
      </div>
    </div>
  );
};

export default Loading;
