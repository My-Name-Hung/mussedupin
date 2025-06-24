import { useEffect, useState } from "react";
import "./Hero.css";

const images = [
  "https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru.jpg?updatedAt=1749267196332",
  "https://ik.imagekit.io/8u8lkoqkkm/Luutru.jpg?updatedAt=1749267196093",
  "https://ik.imagekit.io/8u8lkoqkkm/Chuongtrinhdinhky.jpg?updatedAt=1749267196289",
  "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
  "https://ik.imagekit.io/8u8lkoqkkm/Honnui_Doc.jpg?updatedAt=1749269171601",
  "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
  "https://ik.imagekit.io/8u8lkoqkkm/Dangsuong_Doc.jpg?updatedAt=1749269171830",
  "https://ik.imagekit.io/8u8lkoqkkm/loirung_doc.png?updatedAt=1749269173624",
  "https://ik.imagekit.io/8u8lkoqkkm/DemThong_Trong.jpg?updatedAt=1749312390412",
  "https://ik.imagekit.io/8u8lkoqkkm/bongcay-doc.png?updatedAt=1750002737327",
  "https://ik.imagekit.io/8u8lkoqkkm/Tourdemhuyenthoai_Trong.jpg?updatedAt=1749312109881",
  "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Trong.jpg?updatedAt=1749311873117",
  "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
];

const Hero = () => {
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    // Select a random image on component mount
    const randomIndex = Math.floor(Math.random() * images.length);
    setBackgroundImage(images[randomIndex]);
  }, []);

  return (
    <section className="hero-container-home">
      <div
        className="hero-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="hero-content">
          <h1 className="hero-titles">
            TRANG ĐẶT VÉ CHÍNH THỨC <br />
            <p className="hero-titles-sub notranslate">Musée Du Pin</p>
          </h1>
          <button className="book-ticket-button">
            <a href="/checkout/package">Đặt vé</a>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
