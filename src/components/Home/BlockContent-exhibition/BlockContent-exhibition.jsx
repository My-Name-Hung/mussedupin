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

  const scrollToCategories = () => {
    const categoriesSection = document.querySelector(".categories-section");
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="block-content-exhibition">
      <div className="exhibition-container">
        <div className="exhibition-image-wrapper">
          <img
            src={exhibitionData.image}
            alt={exhibitionData.title}
            className="exhibition-image"
          />
        </div>
        <div className="exhibition-content">
          <h2 className="exhibition-title">{exhibitionData.title}</h2>
          <div className="exhibition-subtitle">{exhibitionData.subtitle}</div>
          <p className="exhibition-description">{exhibitionData.description}</p>
          <button className="exhibition-button" onClick={scrollToCategories}>
            Khám phá tất cả sản phẩm
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlockContentExhibition;
