import React from "react";
import { Link } from "react-router-dom";
import "./Categories.css";

const categories = [
  {
    title: "Xuất bản",
    image: "https://i.ibb.co/Lh29M4PG/image.png",
    link: "/category/xuat-ban",
  },
  {
    title: "Hội thảo nghệ thuật",
    image: "https://i.ibb.co/jvfVkvCH/image.png",
    link: "/category/hoi-thao-nghe-thuat",
  },
  {
    title: "In theo yêu cầu",
    image: "https://i.ibb.co/R4c4kK0z/image.png",
    link: "/category/in-theo-yeu-cau",
  },
  {
    title: "Hình ảnh và văn phòng phẩm",
    image: "https://i.ibb.co/cSkG7X1P/image.png",
    link: "/category/hinh-anh-va-van-phong-pham",
  },
  {
    title: "Thời trang và phụ kiện",
    image: "https://i.ibb.co/rfq5jtZ9/image.png",
    link: "/category/thoi-trang-va-phu-kien",
  },
  {
    title: "Đồ trang sức",
    image: "https://i.ibb.co/HDhWtrpF/image.png",
    link: "/category/do-trang-suc",
  },
  {
    title: "Đồ gia dụng",
    image: "https://i.ibb.co/Dfm9DJLy/image.png",
    link: "/category/do-gia-dung",
  },
  {
    title: "Trẻ em",
    image: "https://i.ibb.co/KpBVKTDy/image.png",
    link: "/category/tre-em",
  },
];

const Categories = () => {
  return (
    <section className="categories-section">
      <h2 className="categories-title">DANH MỤC</h2>
      <div className="categories-grid">
        {categories.map((category, index) => (
          <Link to={category.link} key={index} className="category-card">
            <div className="category-image-container">
              <img
                src={category.image}
                alt={category.title}
                className="category-image"
              />
            </div>
            <h3 className="category-title">
              <span className="title-text">{category.title}</span>
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
