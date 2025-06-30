import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "./BlocksWrapper.css";

const BlocksWrapper = () => {
  const blocks = [
    {
      image:
        "https://res.cloudinary.com/dco63bsah/image/upload/v1750338666/sanphamtuthong/Tranh%20A4%2002.jpg",
      title: "Sản phẩm từ Thông",
      subtitle: "Xem tất cả sản phẩm",
      categoryLink: "/category/sanphamtuthong",
      description: "Khám phá những tác phẩm được tạo tác từ Thông độc đáo",
    },
    {
      image:
        "https://res.cloudinary.com/dco63bsah/image/upload/v1750338666/inyeucau/BTT01405-HDR.webp",
      title: "Sản phẩm nổi bật",
      subtitle: "Xem tất cả sản phẩm",
      categoryLink: "/bestseller",
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
                loading="lazy"
              />
            </div>
            <div className="block-content">
              <h2 className="block-title">{block.title}</h2>
              <p className="block-description">{block.description}</p>
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
