import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Select from "react-select";
import "./RegisterModal.css";
import SuccessModal from "./SuccessModal";

const RegisterModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
    },
  });

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Fetch provinces on component mount
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(
          "https://provinces.open-api.vn/api/?depth=1"
        );
        const data = await response.json();
        setProvinces(data);
      } catch (err) {
        console.error("Error fetching provinces:", err);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts when province changes
  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedProvince) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/p/${selectedProvince}?depth=2`
          );
          const data = await response.json();
          setDistricts(data.districts);
          setSelectedDistrict("");
          setSelectedWard("");
          setWards([]);
        } catch (err) {
          console.error("Error fetching districts:", err);
        }
      }
    };
    fetchDistricts();
  }, [selectedProvince]);

  // Fetch wards when district changes
  useEffect(() => {
    const fetchWards = async () => {
      if (selectedDistrict) {
        try {
          const response = await fetch(
            `https://provinces.open-api.vn/api/d/${selectedDistrict}?depth=2`
          );
          const data = await response.json();
          setWards(data.wards);
          setSelectedWard("");
        } catch (err) {
          console.error("Error fetching wards:", err);
        }
      }
    };
    fetchWards();
  }, [selectedDistrict]);

  // Update address when selections change
  useEffect(() => {
    const selectedProvinceName =
      provinces.find((p) => p.code === parseInt(selectedProvince))?.name || "";
    const selectedDistrictName =
      districts.find((d) => d.code === parseInt(selectedDistrict))?.name || "";
    const selectedWardName =
      wards.find((w) => w.code === parseInt(selectedWard))?.name || "";

    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        state: selectedProvinceName,
        city: selectedDistrictName,
        street: selectedWardName ? `${selectedWardName}` : "",
      },
    }));
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    provinces,
    districts,
    wards,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    try {
      const response = await fetch(
        "https://mussedupin.onrender.com/api/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            address: formData.address,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(data.message);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Hiển thị modal thành công
        setShowSuccessModal(true);

        // Đóng modal đăng ký sau 2.5s
        setTimeout(() => {
          onClose();
          window.location.reload();
        }, 2500);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại sau.");
    }
  };

  // Custom styles for react-select
  const selectStyles = {
    control: (base) => ({
      ...base,
      minHeight: "44px",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      borderColor: "#2c2f11",
      "&:hover": {
        borderColor: "#3d4117",
      },
    }),
    option: (base, { isFocused, isSelected }) => ({
      ...base,
      backgroundColor: isSelected
        ? "#2c2f11"
        : isFocused
        ? "rgba(44, 47, 17, 0.1)"
        : "white",
      color: isSelected ? "white" : "#2c2f11",
      "&:active": {
        backgroundColor: "#2c2f11",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#6b7280",
    }),
    singleValue: (base) => ({
      ...base,
      color: "#2c2f11",
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: "white",
      zIndex: 9999,
    }),
  };

  // Format options for react-select
  const provinceOptions = provinces.map((province) => ({
    value: province.code,
    label: province.name,
  }));

  const districtOptions = districts.map((district) => ({
    value: district.code,
    label: district.name,
  }));

  const wardOptions = wards.map((ward) => ({
    value: ward.code,
    label: ward.name,
  }));

  // Handle select changes
  const handleProvinceChange = (selectedOption) => {
    setSelectedProvince(selectedOption ? selectedOption.value.toString() : "");
  };

  const handleDistrictChange = (selectedOption) => {
    setSelectedDistrict(selectedOption ? selectedOption.value.toString() : "");
  };

  const handleWardChange = (selectedOption) => {
    setSelectedWard(selectedOption ? selectedOption.value.toString() : "");
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-container">
          <button className="close-button" onClick={onClose}>
            <FaTimes />
          </button>

          <h2 className="modal-title">Đăng ký tài khoản</h2>
          <p className="modal-subtitle">Tạo tài khoản để mua sắm dễ dàng hơn</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label>* Họ và tên</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                placeholder="Họ và tên"
              />
            </div>

            <div className="form-group">
              <label>* Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label>* Số điện thoại</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Số điện thoại"
              />
            </div>

            <div className="form-group">
              <label>* Mật khẩu</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Mật khẩu"
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

            <div className="form-group">
              <label>* Xác nhận mật khẩu</label>
              <div className="password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Xác nhận mật khẩu"
                  minLength="6"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>* Tỉnh/Thành phố</label>
              <Select
                value={provinceOptions.find(
                  (option) => option.value === parseInt(selectedProvince)
                )}
                onChange={handleProvinceChange}
                options={provinceOptions}
                placeholder="Tìm kiếm Tỉnh/Thành phố"
                noOptionsMessage={() => "Không tìm thấy kết quả"}
                styles={selectStyles}
                isSearchable={true}
                isClearable={true}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-group">
              <label>* Quận/Huyện</label>
              <Select
                value={districtOptions.find(
                  (option) => option.value === parseInt(selectedDistrict)
                )}
                onChange={handleDistrictChange}
                options={districtOptions}
                placeholder="Tìm kiếm Quận/Huyện"
                noOptionsMessage={() => "Không tìm thấy kết quả"}
                styles={selectStyles}
                isSearchable={true}
                isClearable={true}
                isDisabled={!selectedProvince}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-group">
              <label>* Phường/Xã</label>
              <Select
                value={wardOptions.find(
                  (option) => option.value === parseInt(selectedWard)
                )}
                onChange={handleWardChange}
                options={wardOptions}
                placeholder="Tìm kiếm Phường/Xã"
                noOptionsMessage={() => "Không tìm thấy kết quả"}
                styles={selectStyles}
                isSearchable={true}
                isClearable={true}
                isDisabled={!selectedDistrict}
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>

            <div className="form-group">
              <label>Số nhà, tên đường</label>
              <input
                type="text"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                placeholder="Số nhà, tên đường"
              />
            </div>

            <button type="submit" className="register-button">
              Đăng ký
            </button>
          </form>
        </div>
      </div>

      <SuccessModal
        isOpen={showSuccessModal}
        message="Chào mừng bạn đến với cửa hàng của chúng tôi!"
        onClose={() => setShowSuccessModal(false)}
        title="Đăng ký thành công!"
      />
    </>
  );
};

export default RegisterModal;
