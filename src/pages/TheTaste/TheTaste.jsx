import React from "react";
import { useNavigate } from "react-router-dom";
import "./TheTaste.css";

const cards = [
  {
    id: "restaurant",
    title: "Nghệ thuật vị giác",
    description: "Nghệ thuật vị giác",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(1).png?updatedAt=1749000543046",
  },
  {
    id: "cafe",
    title: "Nghệ thuật vị giác",
    description: "Nghệ thuật vị giác",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(2).png?updatedAt=1749000540091",
  },
];

const TheTaste = () => {
  const navigate = useNavigate();

  const handleCardClick = (cardId) => {
    navigate(`/the-taste/${cardId}`);
  };

  return (
    <div className="thetaste-container">
      <div className="thetaste-hero">
        <img
          src="https://ik.imagekit.io/8u8lkoqkkm/image(4).png?updatedAt=1749000545941"
          alt="Khuôn viên bảo tàng"
          className="thetaste-hero-img"
        />
        <div className="thetaste-hero-overlay" />
        <div className="thetaste-hero-content">
          <h1>Nghệ thuật vị giác</h1>
          <p>Nghệ thuật vị giác</p>
        </div>
      </div>
      <div className="thetaste-cards">
        {cards.map((card, idx) => (
          <div
            className="thetaste-card"
            key={idx}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="thetaste-card-img-wrap">
              <img
                src={card.image}
                alt={card.title}
                className="thetaste-card-img"
              />
              <div className="thetaste-card-overlay" />
              <div className="thetaste-card-content">
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

export default TheTaste;
