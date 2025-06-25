import React from "react";
import { useNavigate } from "react-router-dom";
import "./ThePlace.css";

const cards = [
  {
    id: "langbiang",
    title: "Không gian nghệ thuật Langbiang",
    description: "Văn hóa và nghệ thuật của vùng đất Đà Lạt.",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784839/about/khonggian.jpg",
  },
  {
    id: "exhibition",
    title: "Phòng triển lãm chủ đề",
    description:
      "16 phòng trưng bày với các chủ đề đa dạng, từ thiên nhiên, lịch sử đến nghệ thuật.",
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784839/about/khonggian.jpg",
  },
];

const ThePlace = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`/the-place/${cardId}`);
  };

  return (
    <div className="theplace-container">
      <div className="theplace-hero">
        <img
          src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784839/collections/louvre-sunset.jpg"
          alt="Không gian bảo tàng Thông"
          className="theplace-hero-img"
        />
        <div className="theplace-hero-overlay" />
        <div className="theplace-hero-content">
          <h1>KHÔNG GIAN NGHỆ THUẬT VÀ VƯỜN TRONG BẢO TÀNG</h1>
          <p>
            Khám phá không gian nghệ thuật độc đáo, nơi giao thoa giữa thiên
            nhiên, văn hóa và sáng tạo.
          </p>
        </div>
      </div>
      <div className="theplace-cards">
        {cards.map((card, idx) => (
          <div
            className="theplace-card"
            key={idx}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="theplace-card-img-wrap">
              <img
                src={card.image}
                alt={card.title}
                className="theplace-card-img"
              />
              <div className="theplace-card-overlay" />
              <div className="theplace-card-content">
                <h2>{card.title}</h2>
                <p>{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThePlace;
