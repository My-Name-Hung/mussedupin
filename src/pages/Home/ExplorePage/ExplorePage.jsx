import React from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import "./ExplorePage.css";

// Import some sample images for the explore page
import artImage2 from "../../../assets/home/collections/beautes.jpg";
import artImage3 from "../../../assets/home/collections/couture.jpg";
import artImage4 from "../../../assets/home/collections/mamluks.jpg";
import artImage5 from "../../../assets/home/collections/Masterpieces.jpg";
import artImage6 from "../../../assets/home/collections/Nature.jpg";
import artImage7 from "../../../assets/home/collections/portrait.jpg";

// Sample collection categories
const categories = [
  { id: 1, name: "Paintings", count: 48 },
  { id: 2, name: "Sculptures", count: 32 },
  { id: 3, name: "Decorative Arts", count: 24 },
  { id: 4, name: "Islamic Art", count: 18 },
  { id: 5, name: "Egyptian Antiquities", count: 20 },
  { id: 6, name: "Greek, Etruscan & Roman", count: 22 },
];

// Sample collection items
const collections = [
  {
    id: 1,
    title: "Renaissance Masterpieces",
    description:
      "Discover the iconic works from the Renaissance era that shaped art history.",
    image: artImage7,
    category: "Paintings",
  },
  {
    id: 2,
    title: "French Romanticism",
    description:
      "Explore the emotional intensity and dramatic expressions of French Romantic art.",
    image: artImage3,
    category: "Paintings",
  },
  {
    id: 3,
    title: "Islamic Decorative Arts",
    description:
      "Marvel at the intricate patterns and craftsmanship of Islamic decorative arts.",
    image: artImage6,
    category: "Decorative Arts",
  },
  {
    id: 4,
    title: "Classical Sculptures",
    description:
      "Admire the timeless beauty of classical sculptures from Greece and Rome.",
    image: artImage4,
    category: "Sculptures",
  },
  {
    id: 5,
    title: "Egyptian Treasures",
    description:
      "Journey through ancient Egypt's rich cultural and artistic heritage.",
    image: artImage5,
    category: "Egyptian Antiquities",
  },
  {
    id: 6,
    title: "Baroque Masterworks",
    description:
      "Experience the grandeur and drama of the Baroque artistic movement.",
    image: artImage2,
    category: "Paintings",
  },
];

const ExplorePage = () => {
  return (
    <div className="explore-page">
      <Helmet>
        <title>Explore | Musée Du Pin</title>
        <meta
          name="description"
          content="Explore the vast collections of the Musée Du Pin."
        />
      </Helmet>

      <header className="explore-header">
        <div className="header-content">
          <h1 className="explore-title">
            <TranslatedText>DELVE INTO THE MUSÉE DU PIN</TranslatedText>
          </h1>
          <p className="explore-subtitle">
            <TranslatedText>
              Discover our vast collections spanning thousands of years of art
              and history
            </TranslatedText>
          </p>
        </div>
      </header>

      <section className="explore-categories-section">
        <div className="explore-container">
          <h2 className="section-title">
            <TranslatedText>Browse by Category</TranslatedText>
          </h2>
          <div className="categories-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <h3 className="category-name">{category.name}</h3>
                <span className="category-count">
                  {category.count} Collections
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-collections-section">
        <div className="explore-container">
          <h2 className="section-title">
            <TranslatedText>Featured Collections</TranslatedText>
          </h2>
          <div className="collections-grid">
            {collections.map((collection) => (
              <div key={collection.id} className="collection-card">
                <div className="collection-image-container">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="collection-image"
                  />
                  <span className="collection-category">
                    {collection.category}
                  </span>
                </div>
                <div className="collection-info">
                  <h3 className="collection-title">{collection.title}</h3>
                  <p className="collection-description">
                    {collection.description}
                  </p>
                  <button className="view-collection-button">
                    <TranslatedText>View Collection</TranslatedText>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="explore-cta-section">
        <div className="explore-container">
          <div className="cta-content">
            <h2 className="cta-title">
              <TranslatedText>Plan Your Visit</TranslatedText>
            </h2>
            <p className="cta-text">
              <TranslatedText>
                Experience the Musée Du Pin Museum in person and immerse yourself
                in our world-class collections
              </TranslatedText>
            </p>
            <div className="cta-buttons">
              <a href="/tickets" className="cta-button primary">
                <TranslatedText>Book Tickets</TranslatedText>
              </a>
              <a href="/visit" className="cta-button secondary">
                <TranslatedText>Visitor Information</TranslatedText>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExplorePage;
