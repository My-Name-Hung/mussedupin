import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import ForgotPasswordModal from "./ForgotPasswordModal";
import "./LoginModal.css";
import RegisterModal from "./RegisterModal";
import SuccessModal from "./SuccessModal";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        showMessage(data.message);
        // Store token and user data
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        if (rememberMe) {
          localStorage.setItem("rememberMe", "true");
        }

        // Show success modal
        setShowSuccessModal(true);

        // Close modal after 2.5s
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2500);
      } else {
        showMessage(data.message, true);
      }
    } catch (err) {
      showMessage("Đăng nhập thất bại. Vui lòng thử lại sau.", true);
    }
  };

  if (!isOpen) return null;

  if (showRegister) {
    return (
      <RegisterModal isOpen={true} onClose={() => setShowRegister(false)} />
    );
  }

  if (showForgotPassword) {
    return (
      <ForgotPasswordModal
        isOpen={true}
        onClose={() => setShowForgotPassword(false)}
      />
    );
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="login-modal-container">
          <button className="close-button-login" onClick={onClose}>
            <FaTimes />
          </button>

          <h2 className="login-modal-title">Đăng nhập</h2>
          <p className="login-modal-subtitle">Bạn đã có tài khoản?</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label>* Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập email"
                required
              />
            </div>

            <div className="form-group">
              <label>* Mật khẩu</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                  required
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

            <div className="form-checkbox">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="remember-me" htmlFor="remember-me">
                Nhớ tôi nhé
              </label>
            </div>

            <button type="submit" className="login-button">
              Đăng nhập
            </button>

            <button
              type="button"
              className="forgot-password"
              onClick={() => setShowForgotPassword(true)}
            >
              Quên mật khẩu?
            </button>
          </form>

          <div className="register-section">
            <h3>Bạn chưa có tài khoản?</h3>
            <button
              className="register-button"
              onClick={() => setShowRegister(true)}
            >
              Tạo một tài khoản
            </button>
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        message="Chào mừng bạn đã quay trở lại!"
        onClose={() => setShowSuccessModal(false)}
        title="Đăng nhập thành công!"
      />
    </>
  );
};

export default LoginModal;
