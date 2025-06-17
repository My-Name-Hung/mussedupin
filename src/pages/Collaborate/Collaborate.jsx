import React from "react";
import { Link } from "react-router-dom";
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import "./Collaborate.css";

const Collaborate = () => {
  // Group products by brand
  const brandProducts = {
    "Harry Nuriev": sampleProducts.filter((p) => [1, 2, 3].includes(p.id)),
    "Philippe Apeloig": sampleProducts.filter((p) => [4, 5, 6].includes(p.id)),
    Barbapapa: sampleProducts.filter((p) => [7, 8].includes(p.id)),
    "Jean-Michel Othoniel": sampleProducts.filter((p) => p.id === 9),
  };

  return (
    <div className="collaborate-page">
      <h1 className="collaborate-page-title">Nhãn hàng hợp tác</h1>
      <section className="card-image-collaborate">
        <div className="card-grid-collaborate">
          {Object.entries(brandProducts).map(([brand, products]) => (
            <div key={brand} className="card-item-collaborate">
              <Link to={`/collaborate/${encodeURIComponent(brand)}`}>
                <img
                  src={products[0]?.image}
                  alt={brand}
                  className="card-image"
                />
                <div className="card-content-collaborate">
                  <h3 className="card-title">{brand}</h3>
                  <p className="card-product-count">
                    {products.length} sản phẩm
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Collaborate;
