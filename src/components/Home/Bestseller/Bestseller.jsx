import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import "./Bestseller.css";

const Bestseller = () => {
  const products = [
    {
      image:
        "https://boutique.louvre.fr/files/products/14345/382707-50b91573-l/aphrodite-known-as-the-venus.jpg",
      title: "Tượng thần Vệ Nữ thành Milo - Từ 16 đến 50 cm",
      price: "từ 220.000đ",
    },
    {
      image:
        "https://boutique.louvre.fr/files/products/33085/375660-5778adc3-l/products-375660.jpg",
      title: "Bảo tàng Louvre Dobble",
      price: "từ 120.000đ",
    },
    {
      image:
        "https://boutique.louvre.fr/files/products/20306/379595-4481f68b-l/odalisque-criss-cross-bracelet.jpg",
      title: "Vòng tay dạng vòng chéo Odalisque",
      price: "từ 500.000đ",
    },
  ];

  return (
    <section className="bestseller">
      <div className="bestseller-container">
        <div className="bestseller-header">
          <h2 className="bestseller-title">Sản phẩm bán chạy nhất</h2>
          <a href="#" className="bestseller-view-all">
            Xem tất cả <IoIosArrowRoundForward />
          </a>
        </div>
        <div className="bestseller-grid">
          {products.map((product, index) => (
            <div key={index} className="bestseller-card">
              <div className="card-image-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-image"
                />
              </div>
              <div className="card-content">
                <h3 className="card-title">{product.title}</h3>
                <p className="card-price">{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
