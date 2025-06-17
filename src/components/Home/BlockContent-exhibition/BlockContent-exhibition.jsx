import React from "react";
import "./BlockContent-exhibition.css";

const BlockContentExhibition = () => {
  const exhibitionData = {
    image:
      "https://boutique.louvre.fr/files/contents/400725/697667-6ad49766-side/louvre-couture.jpg",
    title: "Thời trang Louvre",
    subtitle: "24 tháng 1 năm 2025 - 21 tháng 7 năm 2025",
    description:
      "Là một di tích lịch sử và là kho báu không lỗ nơi hội tụ thẩm mỹ của thế giới, Louvre truyền cảm hứng cho nhiều thế giới sáng tạo. Đối với thế giới thời trang, vốn rất thích tìm đến nghệ thuật, bảo tàng đã mở cửa cho một cuộc triển lãm dưới hình thức đối thoại...",
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
