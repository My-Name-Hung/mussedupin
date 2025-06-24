import React, { useState } from "react";
import "./TimeSelection.css";

const TimeSelection = ({ selectedTime, onTimeChange }) => {
  const [activeTab, setActiveTab] = useState("morning");

  const generateTimeSlots = (start, end) => {
    const slots = [];
    let current = start;
    while (current <= end) {
      const hour = Math.floor(current);
      const minute = (current % 1) * 60;
      slots.push(
        `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`
      );
      current += 0.5; // 30 minute intervals
    }
    return slots;
  };

  const morningSlots = generateTimeSlots(8, 13.5); // 8:00 to 13:30
  const afternoonSlots = generateTimeSlots(14, 23); // 14:00 to 23:00

  return (
    <div className="time-selection-container">
      <h2>Chọn thời gian</h2>
      <div className="time-tabs">
        <button
          className={`tab ${activeTab === "morning" ? "active" : ""}`}
          onClick={() => setActiveTab("morning")}
        >
          Buổi sáng & trưa
        </button>
        <button
          className={`tab ${activeTab === "afternoon" ? "active" : ""}`}
          onClick={() => setActiveTab("afternoon")}
        >
          Buổi chiều
        </button>
      </div>
      <div className="time-slots">
        {(activeTab === "morning" ? morningSlots : afternoonSlots).map(
          (time) => (
            <label key={time} className="time-slot">
              <input
                type="radio"
                name="time"
                value={time}
                checked={selectedTime === time}
                onChange={(e) => onTimeChange(e.target.value)}
              />
              <span>{time}</span>
            </label>
          )
        )}
      </div>
    </div>
  );
};

export default TimeSelection;
