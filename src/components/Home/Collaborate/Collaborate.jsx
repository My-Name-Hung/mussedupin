import React, { useEffect, useState } from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import "./Collaborate.css";

const Collaborate = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const collaborators = [
    {
      image:
        "https://boutique.louvre.fr/files/contents/400564/697889-5b1c2d67-xl/harry-nuriev-2.jpg",
      title: "Harry Nuriev",
    },
    {
      image:
        "https://boutique.louvre.fr/files/contents/400549/695234-89885e78-xl/philippe-apeloig.jpg",
      title: "Philippe Apeloig",
    },
    {
      image:
        "https://boutique.louvre.fr/files/contents/400573/697532-920cc925-xl/barbapapa-2.jpg",
      title: "Barbapapa",
    },
    {
      image:
        "https://boutique.louvre.fr/files/contents/400578/695362-10bf7f9a-xl/jean-michel-othoniel-2.jpg",
      title: "Jean-Michel Othoniel",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % collaborators.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [isMobile]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="collaborate">
      <div className="collaborate-container">
        <div className="collaborate-header">
          <h2 className="collaborate-title">Sự hợp tác</h2>
          <Link to="/collaborate" className="collaborate-view-all">
            Xem tất cả <IoIosArrowRoundForward />
          </Link>
        </div>
        <div className="slideshow-container">
          <div
            className="slides-wrapper"
            style={
              isMobile
                ? { transform: `translateX(-${currentSlide * 100}%)` }
                : {}
            }
          >
            {collaborators.map((item, index) => (
              <div key={index} className="slide">
                <Link
                  to={`/collaborate/${encodeURIComponent(item.title)}`}
                  className="slide-image-container"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="slide-image"
                  />
                  <h3 className="slide-title">{item.title}</h3>
                </Link>
              </div>
            ))}
          </div>
          {isMobile && (
            <div className="dots-navigation">
              {collaborators.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${currentSlide === index ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Collaborate;
