import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { sampleProducts } from "../../../pages/CategoryDetail/CategoryDetail";
import "./BlockContent.css";

const BlockContent = () => {
  const artists = useMemo(() => {
    // Get unique artists and count their products from all categories
    const artistCounts = Object.values(sampleProducts)
      .flat()
      .reduce((acc, product) => {
      acc[product.artist] = (acc[product.artist] || 0) + 1;
      return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(artistCounts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);
  }, []);

  return (
    <section className="block-contents">
      <div className="content-container">
        <div className="content-wrapper">
          <h2 className="content-title">Khám phá bộ sưu tập của nghệ sĩ</h2>
          <div className="artists-list">
            {artists.slice(0, 10).map((artist, index) => (
              <Link
                key={index}
                to={`/contents/artists/${encodeURIComponent(artist.name)}`}
                className="artist-item"
              >
                {artist.name}
              </Link>
            ))}
          </div>
          <Link to="/contents/artists" className="content-cta">
            Xem tất cả nghệ sĩ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlockContent;
