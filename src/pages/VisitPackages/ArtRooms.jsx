import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./VisitPackages.css";

const ArtRooms = () => {
  const navigate = useNavigate();

  const rooms = [
    {
      id: "the-childhood",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Tu%E1%BB%95i%20%E1%BA%A5u%20th%C6%A1-%20The%20Childhood/z6735013755648_e134fda3141c25a0a9fc67efa73d00de.jpg?updatedAt=1751274451818",
      orientation: "landscape",
      description:
        "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
    },
    {
      id: "white-bauhunia",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Hoa%20Ban%20Tr%E1%BA%AFng-%20Bauhinia/z6735015913658_0a13ac137c59ccacc8e376f1d7f63ce8.jpg?updatedAt=1751274467967",
      orientation: "landscape",
      description:
        "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
    },
    {
      id: "the-chill-1",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20I-%20The%20Chill%20I/z6735017008335_1f53d54c8c667e714237c694c6fb2bf0.jpg?updatedAt=1751274193309",
      orientation: "landscape",
      description:
        "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
    },
    {
      id: "the-chill-2",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20II-%20The%20Chill%20II/z6735017019144_2e97325679ec2dbf6248ee217d2c005e.jpg?updatedAt=1751274217344",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-memory",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0i%20Ni%E1%BB%87m-%20The%20Memory/z6735016111786_26063d0dd74c1796f25a106e4e7e48cb.jpg?updatedAt=1751274468488",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-sunset",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0ng%20h%C3%B4n-%20The%20Sunset/z6735016357613_e2751dcece85c553aaa0c8e54f9e5d11.jpg?updatedAt=1751274470184",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-train",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Toa%20t%C3%A0u-%20The%20Train/z6735013970930_367d839a1762df6694ba9fde11f52475.jpg?updatedAt=1751274451540",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-pine-hill",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/%C4%90%E1%BB%93i%20Th%C3%B4ng-%20The%20Pine%20Hill/z6735015682281_4f24f3571385b7a2b97d36acd8ba8113.jpg?updatedAt=1751274459265",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-fall",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Th%C3%A1c%20%C4%91%E1%BB%95-%20The%20Fall/z6735013550592_06292038d263699476dd8144aa005946.jpg?updatedAt=1751274451608",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-kite",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/C%C3%A1nh%20di%E1%BB%81u-%20The%20Kite/404%20-%201.png?updatedAt=1751274406678",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-strawberry",
      title: "",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/D%C3%A2u%20t%C3%A2y-%20Strawberry/z6735068946993_6566743fb95325c53d9b69e966e2ae4a.jpg?updatedAt=1751274423030",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
  ];

  return (
    <div className="packages-container">
      <div className="packages-hero">
        <button className="back-button1" onClick={() => navigate("/visit")}>
          <MdArrowBack />
        </button>
        <div className="hero-image-container">
          <img
            src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748841943/collections/luutrunghethuat.jpg"
            alt="Các căn phòng nghệ thuật"
            className="hero-image landscape"
          />
        </div>
        <div className="packages-hero-content">
          <h1 className="packages-title"></h1>
        </div>
      </div>

      <div className="packages-content">
        <div className="packages-grid">
          {rooms.map((room) => (
            <div
              key={room.id}
              className="visit-cardss"
              onClick={() => navigate(`/visit/package/${room.id}`)}
            >
              <div className="visit-cards-img-wrap">
                <img
                  src={room.image}
                  alt={room.title}
                  className={`visit-cards-img ${room.orientation}`}
                />
                <div className="visit-cards-overlay" />
                <div className="visit-card-content">
                  <h2>{room.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArtRooms;
