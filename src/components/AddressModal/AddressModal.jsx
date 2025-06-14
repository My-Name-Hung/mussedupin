import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./AddressModal.css";

const AddressModal = ({ isOpen, onClose, currentAddress, onSave }) => {
  const [address, setAddress] = useState({
    street: currentAddress?.street || "",
    city: currentAddress?.city || "",
    state: currentAddress?.state || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mussedupin.onrender.com/api/user/update-address",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ address }),
        }
      );

      const data = await response.json();
      if (data.success) {
        onSave(address);
        onClose();
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="address-modal">
        <button className="close-button" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>Thay đổi địa chỉ giao hàng</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Địa chỉ</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              placeholder="Số nhà, tên đường"
              required
            />
          </div>

          <div className="form-group">
            <label>Thành phố</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="Thành phố"
              required
            />
          </div>

          <div className="form-group">
            <label>Tỉnh/Thành phố</label>
            <input
              type="text"
              value={address.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              placeholder="Tỉnh/Thành phố"
              required
            />
          </div>

          <button type="submit" className="save-button">
            Lưu thay đổi
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressModal;
