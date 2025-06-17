import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Exhibitions.css";

export const exhibitionsData = [
  {
    id: 1,
    image:
      "https://boutique.louvre.fr/files/contents/400994/779027-318c7112-side/passion-for-china.png",
    title: "A Passion for China",
    date: "5/14/25 - 8/25/25",
    status: "close",
    products: [
      {
        title: "sản phẩm trưng bày 1",
        price: "230.000đ",
        image:
          "https://boutique.louvre.fr/files/products/62897/779731-9b3c0f69-l/products-779731.jpg",
      },
      {
        title: "sản phẩm trưng bày 2",
        price: "200.000đ",
        image: "https://i.ibb.co/zWtyhrtR/image.png",
      },
      {
        title: "sản phẩm trưng bày 3",
        price: "210.000đ",
        image: "https://i.ibb.co/zVKd61Z1/image.png",
      },
      {
        title: "sản phẩm trưng bày 4",
        price: "400.000đ",
        image: "https://i.ibb.co/sdvBZYVJ/image.png",
      },
      {
        title: "sản phẩm trưng bày 5",
        price: "450.000đ",
        image: "https://i.ibb.co/PZ9NmgYG/image.png",
      },
      {
        title: "sản phẩm trưng bày 6",
        price: "330.000đ",
        image: "https://i.ibb.co/zWgYbmbw/image.png",
      },
    ],
  },
  {
    id: 2,
    image:
      "https://boutique.louvre.fr/files/contents/400834/779024-eb327bbe-side/mamlouks.png",
    title: "Mamluks",
    date: "4/30/25 - 7/28/25",
    status: "inprogress",
    products: [
      {
        title: "sản phẩm trưng bày 1",
        price: "230.000đ",
        image:
          "https://boutique.louvre.fr/files/products/62897/779731-9b3c0f69-l/products-779731.jpg",
      },
      {
        title: "sản phẩm trưng bày 2",
        price: "200.000đ",
        image: "https://i.ibb.co/zWtyhrtR/image.png",
      },
      {
        title: "sản phẩm trưng bày 3",
        price: "210.000đ",
        image: "https://i.ibb.co/zVKd61Z1/image.png",
      },
      {
        title: "sản phẩm trưng bày 4",
        price: "400.000đ",
        image: "https://i.ibb.co/sdvBZYVJ/image.png",
      },
      {
        title: "sản phẩm trưng bày 5",
        price: "450.000đ",
        image: "https://i.ibb.co/PZ9NmgYG/image.png",
      },
      {
        title: "sản phẩm trưng bày 6",
        price: "330.000đ",
        image: "https://i.ibb.co/zWgYbmbw/image.png",
      },
    ],
  },
  {
    id: 3,
    image:
      "https://boutique.louvre.fr/files/contents/400725/697667-6ad49766-side/louvre-couture.jpg",
    title: "Louvre Couture",
    date: "1/24/25 - 7/21/25",
    status: "close",
    products: [
      {
        title: "sản phẩm trưng bày 1",
        price: "230.000đ",
        image:
          "https://boutique.louvre.fr/files/products/62897/779731-9b3c0f69-l/products-779731.jpg",
      },
      {
        title: "sản phẩm trưng bày 2",
        price: "200.000đ",
        image: "https://i.ibb.co/zWtyhrtR/image.png",
      },
      {
        title: "sản phẩm trưng bày 3",
        price: "210.000đ",
        image: "https://i.ibb.co/zVKd61Z1/image.png",
      },
      {
        title: "sản phẩm trưng bày 4",
        price: "400.000đ",
        image: "https://i.ibb.co/sdvBZYVJ/image.png",
      },
      {
        title: "sản phẩm trưng bày 5",
        price: "450.000đ",
        image: "https://i.ibb.co/PZ9NmgYG/image.png",
      },
      {
        title: "sản phẩm trưng bày 6",
        price: "330.000đ",
        image: "https://i.ibb.co/zWgYbmbw/image.png",
      },
    ],
  },
  {
    id: 4,
    image:
      "https://boutique.louvre.fr/files/contents/400833/699113-60081989-side/the-experience-of-nature.jpg",
    title: "The Experience of Nature",
    date: "3/19/25 - 6/30/25",
    status: "inprogress",
    products: [
      {
        title: "sản phẩm trưng bày 1",
        price: "230.000đ",
        image:
          "https://boutique.louvre.fr/files/products/62897/779731-9b3c0f69-l/products-779731.jpg",
      },
      {
        title: "sản phẩm trưng bày 2",
        price: "200.000đ",
        image: "https://i.ibb.co/zWtyhrtR/image.png",
      },
      {
        title: "sản phẩm trưng bày 3",
        price: "210.000đ",
        image: "https://i.ibb.co/zVKd61Z1/image.png",
      },
      {
        title: "sản phẩm trưng bày 4",
        price: "400.000đ",
        image: "https://i.ibb.co/sdvBZYVJ/image.png",
      },
      {
        title: "sản phẩm trưng bày 5",
        price: "450.000đ",
        image: "https://i.ibb.co/PZ9NmgYG/image.png",
      },
      {
        title: "sản phẩm trưng bày 6",
        price: "330.000đ",
        image: "https://i.ibb.co/zWgYbmbw/image.png",
      },
    ],
  },
  {
    id: 5,
    image:
      "https://boutique.louvre.fr/files/contents/400719/697656-ded2e116-side/guillon-lethiere-born-in-guadeloupe.jpg",
    title: "Guillon Lethière, Born in Guadeloupe",
    date: "11/13/24 - 2/17/25",
    status: "close",
    products: [
      {
        title: "sản phẩm trưng bày 1",
        price: "230.000đ",
        image: "https://i.ibb.co/jj6YfzR/image.png",
      },
      {
        title: "sản phẩm trưng bày 2",
        price: "200.000đ",
        image: "https://i.ibb.co/JWWczW5L/image.png",
      },
      {
        title: "sản phẩm trưng bày 3",
        price: "210.000đ",
        image: "https://i.ibb.co/5XC6CtrM/image.png",
      },
    ],
  },
  {
    id: 6,
    image:
      "https://boutique.louvre.fr/files/contents/400712/697623-d0826c75-side/figures-of-the-fool-from.jpg",
    title: "Figures of the Fool",
    date: "10/16/24 - 2/3/25",
    status: "close",
    products: [
      {
        title: "sản phẩm trưng bày 1",
        price: "230.000đ",
        image:
          "https://boutique.louvre.fr/files/products/62897/779731-9b3c0f69-l/products-779731.jpg",
      },
      {
        title: "sản phẩm trưng bày 2",
        price: "200.000đ",
        image: "https://i.ibb.co/zWtyhrtR/image.png",
      },
      {
        title: "sản phẩm trưng bày 3",
        price: "210.000đ",
        image: "https://i.ibb.co/zVKd61Z1/image.png",
      },
      {
        title: "sản phẩm trưng bày 4",
        price: "400.000đ",
        image: "https://i.ibb.co/sdvBZYVJ/image.png",
      },
      {
        title: "sản phẩm trưng bày 5",
        price: "450.000đ",
        image: "https://i.ibb.co/PZ9NmgYG/image.png",
      },
      {
        title: "sản phẩm trưng bày 6",
        price: "330.000đ",
        image: "https://i.ibb.co/zWgYbmbw/image.png",
      },
      {
        title: "sản phẩm trưng bày 7",
        price: "230.000đ",
        image: "https://i.ibb.co/jj6YfzR/image.png",
      },
      {
        title: "sản phẩm trưng bày 8",
        price: "200.000đ",
        image: "https://i.ibb.co/JWWczW5L/image.png",
      },
      {
        title: "sản phẩm trưng bày 9",
        price: "210.000đ",
        image: "https://i.ibb.co/5XC6CtrM/image.png",
      },
    ],
  },
];

const Exhibitions = () => {
  const [showInProgress, setShowInProgress] = useState(false);

  const filteredExhibitions = showInProgress
    ? exhibitionsData.filter((exhibition) => exhibition.status === "inprogress")
    : exhibitionsData;

  return (
    <div className="exhibitions-page-container">
      <div className="exhibitions-page-header">
        <h1 className="exhibitions-page-title">TRIỂN LÃM</h1>
        <div className="exhibitions-page-count">
          <span>{filteredExhibitions.length} Triển lãm</span>
          <div className="exhibitions-page-toggle-container">
            <label className="exhibitions-page-toggle">
              <input
                type="checkbox"
                checked={showInProgress}
                onChange={() => setShowInProgress(!showInProgress)}
              />
              <span className="exhibitions-page-slider"></span>
            </label>
            <span>Đang diễn ra</span>
          </div>
        </div>
      </div>

      <div className="exhibitions-page-grid">
        {filteredExhibitions.map((exhibition) => (
          <Link
            to={`/contents/exhibitions/${exhibition.id}`}
            key={exhibition.id}
            className="exhibitions-page-card"
          >
            <div className="exhibitions-page-card-image">
              <img
                src={exhibition.image}
                alt={exhibition.title}
                loading="lazy"
              />
              <div
                className={`exhibitions-page-card-status ${exhibition.status}`}
              >
                {exhibition.status === "inprogress"
                  ? "Đang diễn ra"
                  : "Đã kết thúc"}
              </div>
            </div>
            <div className="exhibitions-page-card-info">
              <h2>{exhibition.title}</h2>
              <p className="exhibitions-page-card-date">{exhibition.date}</p>
              <p className="exhibitions-page-card-products">
                {exhibition.products.length} sản phẩm
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Exhibitions;
