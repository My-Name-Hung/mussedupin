import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { sampleProducts } from "../CategoryDetail/CategoryDetail";
import "./Artists.css";

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const artists = useMemo(() => {
    // Get unique artists and count their products
    const artistCounts = {};

    // Iterate through each category and its products
    Object.values(sampleProducts).forEach((products) => {
      products.forEach((product) => {
        artistCounts[product.artist] = (artistCounts[product.artist] || 0) + 1;
      });
    });

    // Convert to array and sort by count
    return Object.entries(artistCounts)
      .map(([name, count]) => ({
        name,
        count,
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784840/logo/icon.png",
      }))
      .sort((a, b) => b.count - a.count);
  }, []);

  const filteredArtists = useMemo(() => {
    return artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [artists, searchTerm]);

  const featuredArtists = artists.slice(0, 4);

  return (
    <div className="artists-page">
      <h1 className="artists-title">Nghệ sĩ</h1>

      <section className="artists-exhibition">
        <h2 className="section-title">Điểm nổi bật</h2>
        <div className="artists-exhibition-grid">
          {featuredArtists.map((artist, index) => (
            <Link
              to={`/contents/artists/${encodeURIComponent(artist.name)}`}
              key={index}
              className="artists-exhibition-item"
            >
              <div className="artist-image">
                <img src={artist.image} alt={artist.name} />
              </div>
              <h3 className="artist-name">{artist.name}</h3>
              <p className="artist-count">{artist.count} sản phẩm</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="all-artists">
        <h2 className="section-title">Tất cả nghệ sĩ</h2>
        <div className="search-artists">
          <input
            type="text"
            placeholder="Tìm kiếm nghệ sĩ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <p className="artists-count">{filteredArtists.length} nghệ sĩ</p>
        <div className="artists-list">
          {filteredArtists.map((artist, index) => (
            <Link
              to={`/contents/artists/${encodeURIComponent(artist.name)}`}
              key={index}
              className="artist-list-item"
            >
              <span className="artist-list-name">{artist.name}</span>
              <span className="artist-list-count">{artist.count} sản phẩm</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Artists;
