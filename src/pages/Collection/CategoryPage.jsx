import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TranslatedText from "../../components/TranslatedText";
import "./CategoryPage.css";

// Import the same images for demo purposes
// In a real app, these would come from your data source
import painting1 from "../../assets/home/collections/ANewLook.jpg";
import painting2 from "../../assets/home/collections/beautes.jpg";
import painting3 from "../../assets/home/collections/couture.jpg";
import painting4 from "../../assets/home/collections/mamluks.jpg";
import painting5 from "../../assets/home/collections/Masterpieces.jpg";
import painting6 from "../../assets/home/collections/Nature.jpg";
import painting7 from "../../assets/home/collections/portrait.jpg";
import painting8 from "../../assets/home/collections/TheMetAu.jpg";

// Sample collection data (in a real app, fetch this from your API or database)
const collectionData = {
  categories: [
    { id: 1, title: "Painting", image: painting1 },
    { id: 2, title: "Sculpture", image: painting5 },
    { id: 3, title: "Decorative Arts", image: painting2 },
    { id: 4, title: "Ancient Art", image: painting3 },
    { id: 5, title: "Renaissance", image: painting7 },
    { id: 6, title: "Modern Art", image: painting4 },
    { id: 7, title: "Islamic Art", image: painting6 },
    { id: 8, title: "Asian Art", image: painting8 },
  ],
  artworks: [
    {
      id: 1,
      title: "Ottoman Iznik Tile",
      artist: "Unknown",
      year: "17th Century",
      image: painting6, // Placeholder image
      location: "Islamic Art Wing",
      tags: ["Ottoman", "Ceramic", "Decorative Arts"],
    },
    {
      id: 2,
      title: "The Caryatids",
      artist: "Jean Goujon",
      year: "1550-1551",
      image: painting2,
      location: "Aile Sully, Rez-de-chaussée",
      tags: ["Sculpture", "Renaissance", "French"],
    },
    {
      id: 3,
      title: "Liberty Leading the People",
      artist: "Eugène Delacroix",
      year: "1830",
      image: painting3,
      location: "Aile Denon, 1er étage",
      tags: ["Painting", "Romanticism", "French", "19th Century"],
    },
    {
      id: 4,
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: "1503-1519",
      image: painting4,
      location: "Aile Denon, 1er étage, Salle des États",
      tags: ["Painting", "Renaissance", "Italian", "Portrait"],
    },
    {
      id: 5,
      title: "Venus de Milo",
      artist: "Alexandros of Antioch",
      year: "c. 100 BCE",
      image: painting5,
      location: "Aile Sully, Rez-de-chaussée",
      tags: ["Sculpture", "Greek", "Hellenistic"],
    },
    {
      id: 6,
      title: "The Raft of the Medusa",
      artist: "Théodore Géricault",
      year: "1818-1819",
      image: painting6,
      location: "Aile Denon, 1er étage",
      tags: ["Painting", "Romanticism", "French", "19th Century"],
    },
    {
      id: 7,
      title: "The Wedding Feast at Cana",
      artist: "Paolo Veronese",
      year: "1563",
      image: painting7,
      location: "Aile Denon, 1er étage",
      tags: ["Painting", "Renaissance", "Italian", "Biblical"],
    },
    {
      id: 8,
      title: "Winged Victory of Samothrace",
      artist: "Unknown",
      year: "c. 200-190 BCE",
      image: painting8,
      location: "Escalier Daru",
      tags: ["Sculpture", "Greek", "Hellenistic"],
    },
    // Additional artworks to ensure all categories have items
    {
      id: 9,
      title: "Blue and White Porcelain Vase",
      artist: "Ming Dynasty Artisan",
      year: "c. 1500",
      image: painting8,
      location: "Asian Art Wing, Room 12",
      tags: ["Asian Art", "Ceramics", "Chinese", "Ming Dynasty"],
    },
    {
      id: 10,
      title: "Islamic Calligraphy Panel",
      artist: "Ottoman Master Calligrapher",
      year: "1780",
      image: painting6,
      location: "Islamic Art Gallery, Section 3",
      tags: ["Islamic Art", "Calligraphy", "Ottoman", "18th Century"],
    },
    {
      id: 11,
      title: "Art Deco Jewelry Box",
      artist: "Émile-Jacques Ruhlmann",
      year: "1925",
      image: painting2,
      location: "Decorative Arts Gallery, Modern Section",
      tags: ["Decorative Arts", "Art Deco", "French", "20th Century"],
    },
    {
      id: 12,
      title: "Ancient Egyptian Sarcophagus",
      artist: "Unknown Egyptian Artisan",
      year: "c. 1200 BCE",
      image: painting3,
      location: "Ancient Art Wing, Egyptian Gallery",
      tags: ["Ancient Art", "Egyptian", "Funerary Art", "New Kingdom"],
    },
  ],
  // Sample related artworks data
  relatedArtworks: [
    {
      id: 1,
      title: "Similar Works",
      description:
        "Explore artworks with similar styles, themes, or time periods",
      items: [2, 5, 8],
    },
    {
      id: 2,
      title: "From the Same Artist",
      description: "Discover more works by the same creator",
      items: [3, 7, 1],
    },
    {
      id: 3,
      title: "You Might Also Like",
      description: "Based on your interest in this category",
      items: [4, 6, 2],
    },
  ],
};

const CategoryPage = () => {
  const { id, title } = useParams();
  const [category, setCategory] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [modalSlide, setModalSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const artworksRef = useRef(null);
  const modalContentRef = useRef(null);
  const heroImageRef = useRef(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check initially
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Clean up
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Find the category and filter related artworks
  useEffect(() => {
    // Find the current category
    const foundCategory = collectionData.categories.find(
      (cat) => cat.id === parseInt(id)
    );

    if (foundCategory) {
      setCategory(foundCategory);

      // Filter artworks related to this category
      const categoryNameLower = foundCategory.title.toLowerCase();
      const filteredArtworks = collectionData.artworks.filter((artwork) => {
        // Match by tags
        return artwork.tags.some(
          (tag) =>
            tag.toLowerCase() === categoryNameLower ||
            tag.toLowerCase().includes(categoryNameLower) ||
            categoryNameLower.includes(tag.toLowerCase())
        );
      });

      setArtworks(filteredArtworks);

      // Simulate loading time for animation effects
      setTimeout(() => {
        setIsLoaded(true);
      }, 300);
    }
  }, [id, title]);

  // Close modal when pressing escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      } else if (e.key === "ArrowRight" && isModalOpen && selectedArtwork) {
        navigateModal(1);
      } else if (e.key === "ArrowLeft" && isModalOpen && selectedArtwork) {
        navigateModal(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, selectedArtwork]);

  // Handle mouse movement for parallax effect - only on non-mobile
  const handleMouseMove = (e) => {
    if (!artworksRef.current || isMobile) return;

    const { width, height } = artworksRef.current.getBoundingClientRect();
    const x = (e.clientX - width / 2) / (width / 2);
    const y = (e.clientY - height / 2) / (height / 2);

    setMousePosition({ x, y });
  };

  // Handle touch start for items (to improve touch experience)
  const handleTouchStart = (artwork, e) => {
    // Set a timeout to determine if it's a tap (not a scroll)
    const touchTimeout = setTimeout(() => {
      openArtworkModal(artwork);
    }, 200);

    // Store timeout ID on the element
    e.currentTarget.touchTimeout = touchTimeout;
  };

  // Handle touch end to clear timeout
  const handleTouchEnd = (e) => {
    if (e.currentTarget.touchTimeout) {
      clearTimeout(e.currentTarget.touchTimeout);
    }
  };

  // Handle touch move to cancel tap action
  const handleTouchMove = (e) => {
    if (e.currentTarget.touchTimeout) {
      clearTimeout(e.currentTarget.touchTimeout);
    }
  };

  const openArtworkModal = (artwork) => {
    setSelectedArtwork(artwork);

    // Find index of current artwork
    const currentIndex = artworks.findIndex((art) => art.id === artwork.id);
    setModalSlide(currentIndex);

    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    // Add closing animation class
    if (modalContentRef.current) {
      modalContentRef.current.classList.add("closing");

      setTimeout(() => {
        setIsModalOpen(false);
        document.body.style.overflow = "auto";
      }, 400);
    } else {
      setIsModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  // Separate handler for close button to ensure it works
  const handleCloseButtonClick = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  // Navigate between artworks in modal
  const navigateModal = (direction) => {
    const newIndex =
      (modalSlide + direction + artworks.length) % artworks.length;
    setModalSlide(newIndex);
    setSelectedArtwork(artworks[newIndex]);
  };

  // Handle hero image loaded
  const handleHeroImageLoaded = () => {
    setHeroLoaded(true);
  };

  // Download artwork image
  const handleDownload = (artwork) => {
    const link = document.createElement("a");
    link.href = artwork.image;
    link.download = `${artwork.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle swipe in modal for mobile navigation
  const handleSwipeStart = useRef({ x: 0, y: 0, time: 0 });

  const handleTouchStartModal = (e) => {
    const touch = e.touches[0];
    handleSwipeStart.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now(),
    };
  };

  const handleTouchEndModal = (e) => {
    if (e.changedTouches.length === 0) return;

    const touch = e.changedTouches[0];
    const distX = touch.clientX - handleSwipeStart.current.x;
    const distY = touch.clientY - handleSwipeStart.current.y;
    const time = Date.now() - handleSwipeStart.current.time;

    // Check if it's a horizontal swipe
    if (Math.abs(distX) > 50 && Math.abs(distY) < 100 && time < 300) {
      // Right to left swipe
      if (distX < 0) {
        navigateModal(1);
      }
      // Left to right swipe
      else {
        navigateModal(-1);
      }
    }
  };

  if (!category) {
    return (
      <div className="category-loading">
        <div className="spinner"></div>
        <p>
          <TranslatedText>Loading category...</TranslatedText>
        </p>
      </div>
    );
  }

  return (
    <div className="category-page">
      {/* Hero Section with Diagonal Divider */}
      <section
        className={`category-hero ${isLoaded ? "loaded" : ""} ${
          heroLoaded ? "image-loaded" : ""
        }`}
      >
        <div className="category-hero-slides-container">
          <div className="category-hero-slide active">
            <img
              ref={heroImageRef}
              src={category.image}
              alt={category.title}
              className="category-hero-img"
              onLoad={handleHeroImageLoaded}
            />
          </div>
        </div>
        <div className="category-hero-overlay"></div>
        <Link to="/collection" className="category-back-button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7"></path>
          </svg>
          <span>
            <TranslatedText>Back to Collections</TranslatedText>
          </span>
        </Link>
        <div className="category-hero-content">
          <h1 className="category-hero-title">{category.title}</h1>
        </div>
        <div className="category-hero-scroll-indicator">
          <div className="category-hero-scroll-mouse">
            <div className="category-hero-scroll-wheel"></div>
          </div>
          <span>SCROLL</span>
        </div>
      </section>

      {/* Artworks Grid with Artistic Animations */}
      <section
        className="category-artworks-section"
        ref={artworksRef}
        onMouseMove={handleMouseMove}
      >
        <div className="category-artworks-container">
          <header className="category-artworks-header">
            <h2 className="category-artworks-title">
              <TranslatedText>
                Browse {category.title} Collection
              </TranslatedText>
            </h2>
            <p className="category-artworks-count">
              <span>{artworks.length}</span>{" "}
              <TranslatedText>items</TranslatedText>
            </p>
          </header>

          <div className="category-artworks-grid">
            {artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`category-artwork-card ${isLoaded ? "appear" : ""}`}
                onClick={() => openArtworkModal(artwork)}
                onTouchStart={(e) => handleTouchStart(artwork, e)}
                onTouchEnd={handleTouchEnd}
                onTouchMove={handleTouchMove}
                style={{
                  "--index": index,
                  animationDelay: `${100 + index * 120}ms`,
                  transform: !isMobile
                    ? `perspective(1000px) 
                       rotateX(${mousePosition.y * 5}deg) 
                       rotateY(${-mousePosition.x * 5}deg)
                       translateZ(10px)`
                    : "none",
                }}
              >
                <div className="category-artwork-image-container">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="category-artwork-image"
                    loading="lazy"
                    style={{
                      transform: !isMobile
                        ? `translateX(${mousePosition.x * -15}px) 
                           translateY(${mousePosition.y * -15}px)`
                        : "none",
                    }}
                  />
                  <div className="category-artwork-overlay">
                    <div className="artwork-quick-info">
                      <h3 className="artwork-overlay-title">{artwork.title}</h3>
                      <p className="artwork-overlay-artist">{artwork.artist}</p>
                    </div>
                  </div>
                </div>
                <div className="category-artwork-info">
                  <h3 className="category-artwork-title">{artwork.title}</h3>
                  <p className="category-artwork-artist">{artwork.artist}</p>
                  <p className="category-artwork-year">{artwork.year}</p>
                  <div className="category-artwork-tags">
                    {artwork.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="category-artwork-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Improved Artwork Modal with swipe support */}
      {isModalOpen && selectedArtwork && (
        <div
          className="artwork-modal"
          onTouchStart={handleTouchStartModal}
          onTouchEnd={handleTouchEndModal}
        >
          <div className="artwork-modal-content" ref={modalContentRef}>
            <div className="artwork-modal-close-wrapper">
              <button
                type="button"
                className="artwork-modal-close"
                onClick={handleCloseButtonClick}
                aria-label="Close modal"
              >
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
            </div>

            <div className="artwork-modal-body">
              <div className="artwork-modal-image-container">
                <div className="artwork-image-frame">
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="artwork-modal-image"
                  />
                </div>

                <button
                  className="cp-artwork-download-button"
                  onClick={() => handleDownload(selectedArtwork)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  <span>
                    <TranslatedText>Download Image</TranslatedText>
                  </span>
                </button>
              </div>

              <div className="artwork-modal-details">
                <div className="artwork-modal-nav">
                  <div className="modal-nav-indicator">
                    <span>{modalSlide + 1}</span>/<span>{artworks.length}</span>
                  </div>
                </div>

                <h2 className="artwork-modal-title">{selectedArtwork.title}</h2>

                <div className="artwork-modal-metadata">
                  <div className="artwork-metadata-item">
                    <div className="metadata-label">ARTIST</div>
                    <div className="metadata-value">
                      {selectedArtwork.artist}
                    </div>
                  </div>

                  <div className="artwork-metadata-item">
                    <div className="metadata-label">YEAR</div>
                    <div className="metadata-value">{selectedArtwork.year}</div>
                  </div>

                  <div className="artwork-metadata-item">
                    <div className="metadata-label">LOCATION</div>
                    <div className="metadata-value">
                      {selectedArtwork.location}
                    </div>
                  </div>
                </div>

                <div className="artwork-modal-tags">
                  {selectedArtwork.tags.map((tag, index) => (
                    <span key={index} className="artwork-modal-tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="artwork-modal-description">
                  <p>{selectedArtwork.description}</p>
                </div>

                <div className="artwork-modal-location">
                  <div className="location-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="location-details">
                    <h4 className="location-title">Access</h4>
                    <p className="location-info">{selectedArtwork.location}</p>
                  </div>
                </div>

                <a href="/visit" className="artwork-visit-button">
                  Plan Your Visit
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
