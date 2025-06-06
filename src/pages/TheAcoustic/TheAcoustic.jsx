import React from "react";
import { useNavigate } from "react-router-dom";
import "./TheAcoustic.css";

const cards = [
  {
    id: "pind-amour",
    title: "Khán phòng Pind'amour",
    description: "Khi âm thanh trở thành một tác phẩm nghệ thuật.",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/af7c0677fb7d4f23166c.jpg?updatedAt=1749174581167",
  },
  {
    id: "high-end",
    title: "Phòng nghe High-end",
    description:
      "Nơi âm thanh được tái hiện với độ trung thực đến mức khiến bạn có cảm giác mình đang ngồi ngay trên sân khấu, đối diện với ca sĩ thật.",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(3).png?updatedAt=1749000530723",
  },
];

const TheAcoustic = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`/the-acoustic/${cardId}`);
  };

  return (
    <div className="theacoustic-container">
      <div className="theacoustic-hero">
        <img
          src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784839/collections/louvre-sunset.jpg"
          alt="Khuôn viên bảo tàng"
          className="theacoustic-hero-img"
        />
        <div className="theacoustic-hero-overlay" />
        <div className="theacoustic-hero-content">
          <h1>ÂM THANH ĐẸP</h1>
          <p></p>
        </div>
      </div>
      <div className="theacoustic-cards">
        {cards.map((card, idx) => (
          <div
            className="theacoustic-card"
            key={idx}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="theacoustic-card-img-wrap">
              <img
                src={card.image}
                alt={card.title}
                className="thetaste-card-img"
              />
              <div className="theacoustic-card-overlay" />
              <div className="theacoustic-card-content">
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

export default TheAcoustic;
