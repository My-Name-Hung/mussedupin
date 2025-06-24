import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import "./CartFooter.css";

const CartFooter = ({
  selectedDate,
  selectedTime,
  totalAmount,
  tickets,
  onNextStep,
  currentStep,
}) => {
  const [showCart, setShowCart] = useState(false);

  const toggleCart = () => {
    setShowCart(!showCart);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "numeric",
      day: "numeric",
    });
  };

  return (
    <>
      <div className="cart-footer">
        <div className="cart-footer-content">
          <div className="cart-footer-left">
            <div className="selected-datetime">
              {selectedDate && (
                <span className="date">
                  {formatDate(selectedDate)}
                  {selectedTime && ` lúc ${selectedTime}`}
                </span>
              )}
            </div>
            <div className="total-amounts">
              <span>Tổng cộng:</span>
              <span className="amount">{totalAmount?.toLocaleString()}đ</span>
            </div>
          </div>

          <button className="toggle-cart" onClick={toggleCart}>
            {showCart ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </button>

          <div className="cart-footer-right">
            <button className="next-step" onClick={onNextStep}>
              {currentStep === 4 ? "Hoàn tất" : "Kế tiếp"}
            </button>
          </div>
        </div>
      </div>

      {showCart && (
        <div className="cart-modal">
          <div className="cart-modal-content">
            <h3>Giỏ hàng của bạn</h3>
            {tickets.map((ticket, index) => (
              <div key={index} className="cart-item">
                <h4>{ticket.title}</h4>
                <p className="quantity">Số lượng: {ticket.quantity}</p>
                <p className="visitors">
                  {ticket.visitors.map((v) => v.name).join(", ")}
                </p>
                <p className="datetime">
                  {formatDate(selectedDate)} {selectedTime}
                </p>
                <p className="price">
                  {(ticket.price * ticket.quantity).toLocaleString()}đ
                </p>
              </div>
            ))}
            <div className="cart-total">
              <span>Tổng cộng:</span>
              <span>{totalAmount?.toLocaleString()}đ</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartFooter;
