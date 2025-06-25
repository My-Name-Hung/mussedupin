import React, { useState } from "react";
import "./FeedbackModal.css";

const FeedbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Cảm ơn bạn đã gửi phản hồi! Chúng tôi sẽ phản hồi sớm nhất có thể.",
        });
        setTimeout(() => {
          onClose();
          setFormData({ name: "", email: "", feedback: "" });
          setSubmitStatus(null);
        }, 3000);
      } else {
        throw new Error(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setSubmitStatus({
        type: "error",
        message: "Có lỗi xảy ra khi gửi phản hồi. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="feedback-modal-overlay">
      <div className="feedback-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <div className="modal-header">
          <h2>Gửi phản hồi</h2>
        </div>

        {submitStatus && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Họ và tên</label>
            <div className="input-container">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Nhập họ và tên của bạn"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-container">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Nhập địa chỉ email của bạn"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="feedback">Nội dung phản hồi</label>
            <div className="input-container">
              <textarea
                id="feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                required
                placeholder="Nhập nội dung phản hồi của bạn"
                rows="5"
              />
            </div>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang gửi..." : "Gửi phản hồi"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackModal;
