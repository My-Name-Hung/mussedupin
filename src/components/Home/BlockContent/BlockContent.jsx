import React from "react";
import "./BlockContent.css";

const BlockContent = () => {
  const content = {
    title: "Khám phá bộ sưu tập của nghệ sĩ",
    artists: [
      "Da Vinci,",
      "Delacroix,",
      "Vigée le Brun,",
      "Ingres,Davit,",
      "Canova,Botticelli,",
      "Géricault,",
      "Arcimboldo,",
      "Lombardo,",
      "Vermeer,Clouet,",
      "của Tour...",
    ],
    cta: "Xem tất cả nghệ sĩ",
  };

  return (
    <section className="block-contents">
      <div className="content-container">
        <div className="content-wrapper">
          <h2 className="content-title">{content.title}</h2>
          <div className="artists-list">
            {content.artists.map((artist, index) => (
              <div key={index} className="artist-item">
                {artist}
              </div>
            ))}
          </div>
          <a href="#" className="content-cta">
            {content.cta}
          </a>
        </div>
      </div>
    </section>
  );
};

export default BlockContent;
