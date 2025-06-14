import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import "./ForgotPasswordModal.css";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: reset code, 3: new password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const showMessage = (message, isError = false) => {
    if (isError) {
      setError(message);
      setSuccess("");
    } else {
      setSuccess(message);
      setError("");
    }

    setTimeout(() => {
      setError("");
      setSuccess("");
    }, 2500);
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showMessage(data.message);
        setStep(2);
      } else {
        showMessage(data.message, true);
      }
    } catch (error) {
      showMessage("Không thể gửi mã xác nhận. Vui lòng thử lại sau.", true);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/auth/verify-reset-code",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, resetCode }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showMessage(data.message);
        setStep(3);
      } else {
        showMessage(data.message, true);
      }
    } catch (error) {
      showMessage("Không thể xác thực mã. Vui lòng thử lại sau.", true);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, resetCode, newPassword }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showMessage(data.message);
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        showMessage(data.message, true);
      }
    } catch (error) {
      showMessage("Không thể đặt lại mật khẩu. Vui lòng thử lại sau.", true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <h2 className="modal-title">Quên mật khẩu?</h2>
        <p className="modal-subtitle">
          {step === 1
            ? "Vui lòng nhập địa chỉ email bạn đã sử dụng khi tạo tài khoản."
            : step === 2
            ? "Nhập mã xác nhận 6 chữ số đã được gửi đến email của bạn."
            : "Nhập mật khẩu mới cho tài khoản của bạn."}
        </p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {step === 1 && (
          <form onSubmit={handleSendCode} className="forgot-password-form">
            <div className="form-group">
              <label>* Địa chỉ Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập địa chỉ email"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Gửi mã xác nhận
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyCode} className="forgot-password-form">
            <div className="form-group">
              <label>* Mã xác nhận</label>
              <input
                type="text"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                placeholder="Nhập mã 6 chữ số"
                required
                pattern="[0-9]{6}"
                maxLength="6"
              />
            </div>

            <button type="submit" className="submit-button">
              Xác nhận
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handleResetPassword} className="forgot-password-form">
            <div className="form-group">
              <label>* Mật khẩu mới</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Đặt lại mật khẩu
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
