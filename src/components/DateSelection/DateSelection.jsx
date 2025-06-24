import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./DateSelection.css";

const DateSelection = ({ selectedDate, onDateChange }) => {
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3); // Allow booking up to 3 months in advance

  const tileDisabled = ({ date }) => {
    // Disable past dates
    if (date < new Date().setHours(0, 0, 0, 0)) {
      return true;
    }
    // Optionally disable specific dates or conditions
    return false;
  };

  const formatShortWeekday = (locale, date) => {
    const days = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    return days[date.getDay()];
  };

  return (
    <div className="date-selection-container">
      <h2>Chọn ngày</h2>
      <Calendar
        onChange={onDateChange}
        value={selectedDate}
        minDate={minDate}
        maxDate={maxDate}
        locale="vi-VN"
        calendarType="gregory"
        formatShortWeekday={formatShortWeekday}
        tileDisabled={tileDisabled}
        showNeighboringMonth={false}
        next2Label={null}
        prev2Label={null}
        navigationLabel={({ date }) => {
          const months = [
            "Tháng 1",
            "Tháng 2",
            "Tháng 3",
            "Tháng 4",
            "Tháng 5",
            "Tháng 6",
            "Tháng 7",
            "Tháng 8",
            "Tháng 9",
            "Tháng 10",
            "Tháng 11",
            "Tháng 12",
          ];
          return `${months[date.getMonth()]} ${date.getFullYear()}`;
        }}
      />
    </div>
  );
};

export default DateSelection;
