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
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thechillhood.jpg",
      orientation: "landscape",
      description:
        "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
    },
    {
      id: "white-bauhunia",
      title: "",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846791/collections/whitebauhinia.jpg",
      orientation: "landscape",
      description:
        "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
    },
    {
      id: "the-chill-1",
      title: "",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846806/collections/thechill1.jpg",
      orientation: "landscape",
      description:
        "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
    },
    {
      id: "the-chill-2",
      title: "",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846806/collections/thechill2.jpg",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-memory",
      title: "",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846800/collections/thememory.jpg",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-sunset",
      title: "",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846798/collections/thesunset.jpg",
      orientation: "landscape",
      description:
        "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
    },
    {
      id: "the-train",
      title: "",
      image:
        "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846795/collections/thetrain.jpg",
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
