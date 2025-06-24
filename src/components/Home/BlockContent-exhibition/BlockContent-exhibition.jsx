import React from "react";
import "./BlockContent-exhibition.css";

const BlockContentExhibition = () => {
  const exhibitionData = {
    image:
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750658293/hoithaonghethuat/hoithaonghethuat.jpg",
    title: "Tay nặn tay vẽ",
    subtitle: "24 tháng 1 năm 2025 - 21 tháng 7 năm 2025",
    description:
      "Tay nặn tay vẽ – workshop nghệ thuật đặc biệt của chương trình lưu trú nghệ thuật MDP-AR.Là lúc con được sáng tạo nên chính những điều đẹp nhất về Tổ quốc, quê hương, sở thích,... trong tim mình.",
  };

  return (
    <section className="block-content-exhibition-section">
      <div className="block-content-exhibition-container">
        <div className="block-content-exhibition-image-wrapper">
          <img
            src={exhibitionData.image}
            alt={exhibitionData.title}
            className="block-content-exhibition-image"
          />
        </div>
        <div className="block-content-exhibition-content">
          <h2 className="block-content-exhibition-title">
            {exhibitionData.title}
          </h2>
          <div className="block-content-exhibition-subtitle">
            {exhibitionData.subtitle}
          </div>
          <p className="block-content-exhibition-description">
            {exhibitionData.description}
          </p>
          <button className="block-content-exhibition-button">
            <a href="/contents/exhibitions">Khám phá tất cả sản phẩm</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlockContentExhibition;
