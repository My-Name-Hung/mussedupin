import React from "react";
import { Link } from "react-router-dom";
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import "./Collaborate.css";

const Collaborate = () => {
  // Get all products from all categories and group them by brand
  const allProducts = Object.values(sampleProducts).flat();

  const brandProducts = {
    "Harry Nuriev": allProducts.filter((p) =>
      [1, 2, 3].includes(Number(p.id.split("-")[1]))
    ),
    "Philippe Apeloig": allProducts.filter((p) =>
      [4, 5, 6].includes(Number(p.id.split("-")[1]))
    ),
    Barbapapa: allProducts.filter((p) =>
      [7, 8].includes(Number(p.id.split("-")[1]))
    ),
    "Jean-Michel Othoniel": allProducts.filter(
      (p) => Number(p.id.split("-")[1]) === 9
    ),
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
