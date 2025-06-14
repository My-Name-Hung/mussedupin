import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "./BlocksWrapper.css";

const BlocksWrapper = () => {
  const blocks = [
    {
      image: "https://i.postimg.cc/Wzp7Pp94/i-u-Kh-c.webp",
      title: "Điêu khắc",
      subtitle: "Xem tất cả sản phẩm",
      categoryLink: "/category/do-trang-suc",
    },
    {
      image:
        "https://boutique.louvre.fr/files/contents/400060/691026-ad27ca49-xxl/contents-691026.jpg",
      title: "Những sản phẩm nổi bật",
      subtitle: "Xem tất cả sản phẩm",
      categoryLink: "/category/xuat-ban",
    },
  ];

  return (
    <section className="blocks-wrapper">
      <div className="blocks-container">
        {blocks.map((block, index) => (
          <Link to={block.categoryLink} key={index} className="block">
            <div className="block-image-container">
              <img
                src={block.image}
                alt={block.title}
                className="block-image"
              />
            </div>
            <div className="block-content">
              <h2 className="block-title">{block.title}</h2>
              <div className="block-subtitle">
                {block.subtitle}
                <IoIosArrowRoundForward className="arrow-icon" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlocksWrapper;
