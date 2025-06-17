import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { sampleProducts } from "../../../pages/CategoryDetail/CategoryDetail";
import "./Bestseller.css";

const Bestseller = () => {
  const [randomProducts, setRandomProducts] = useState([]);

  useEffect(() => {
    // Filter trending products
    const trendingProducts = sampleProducts.filter(
      (product) => product.isTrending
    );

    // Get 3 random products
    const shuffled = [...trendingProducts].sort(() => 0.5 - Math.random());
    setRandomProducts(shuffled.slice(0, 3));
  }, []); // Empty dependency array means this runs once on mount

  return (
    <section className="bestseller">
      <div className="bestseller-container">
        <div className="bestseller-header">
          <h2 className="bestseller-title">Sản phẩm bán chạy nhất</h2>
          <Link to="/bestseller" className="bestseller-view-all">
            Xem tất cả <IoIosArrowRoundForward />
          </Link>
        </div>
        <div className="bestseller-grid">
          {randomProducts.map((product) => (
            <div key={product.id} className="bestseller-card">
              <Link to={`/product/${product.id}`}>
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
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bestseller;
