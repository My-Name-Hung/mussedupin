import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import "./DuPinPlus.css";

// Sample data for videos - replace with your actual content
const allVideos = [
  {
    id: 1,
    title: "The restoration of the Arc du Carrousel",
    subtitle: "[ENG subtitles]",
    description:
      "Discover the meticulous restoration process of this iconic monument, revealing the techniques and expertise of museum conservators.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "7 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Restoration",
  },
  {
    id: 2,
    title: "The restoration of the Napoleon-III apartments",
    subtitle: "",
    description:
      "An in-depth look at the restoration of these opulent apartments, showcasing the attention to detail in preserving historical interiors.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "10 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Restoration",
  },
  {
    id: 3,
    title: "The Salle des Etats",
    subtitle: "",
    description:
      "Explore the history and significance of this grand hall and its collection of masterpieces that have shaped art history.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "4 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Collections",
  },
  {
    id: 4,
    title: "« Forêt » by Anne Teresa De Keersmaeker",
    subtitle: "[EN subtitles]",
    description:
      "A captivating performance by renowned choreographer Anne Teresa De Keersmaeker, bringing contemporary dance into dialogue with classical art.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "7 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Performances",
  },
  {
    id: 5,
    title: "Virtual Tour: Egyptian Antiquities",
    subtitle: "",
    description:
      "Take a virtual journey through one of the most comprehensive collections of Egyptian artifacts, guided by expert curators.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "9 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Virtual Tours",
  },
  {
    id: 6,
    title: "Behind the Scenes: Restoration Workshop",
    subtitle: "",
    description:
      "Gain exclusive access to the museum's restoration workshops where skilled artisans preserve priceless treasures for future generations.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "6 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Behind the Scenes",
  },
  {
    id: 7,
    title: "The Making of a Special Exhibition",
    subtitle: "",
    description:
      "Follow the journey of creating a major exhibition from concept to opening night, revealing the curatorial process.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "12 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Behind the Scenes",
  },
  {
    id: 8,
    title: "The Renaissance Collection Highlights",
    subtitle: "",
    description:
      "A guided tour through the exquisite Renaissance collection, exploring the techniques and stories behind these masterpieces.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "8 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Collections",
  },
  {
    id: 9,
    title: "Conservation of Ancient Sculptures",
    subtitle: "[ENG subtitles]",
    description:
      "Witness the delicate process of conserving ancient marble sculptures, combining traditional techniques with cutting-edge technology.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "11 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Restoration",
  },
  {
    id: 10,
    title: "Artistic Dialogues: Contemporary Meets Classical",
    subtitle: "",
    description:
      "Explore the fascinating dialogues between contemporary artists and classical masterpieces in this thought-provoking documentary.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "15 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Art History",
  },
  {
    id: 11,
    title: "Virtual Tour: Greek and Roman Antiquities",
    subtitle: "",
    description:
      "Experience the grandeur of classical antiquity through this immersive virtual tour of iconic sculptures and artifacts.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "9 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Virtual Tours",
  },
  {
    id: 12,
    title: "Music in the Museum: Classical Concert Series",
    subtitle: "[EN subtitles]",
    description:
      "Enjoy performances from the museum's concert series, where music resonates among masterpieces in perfect harmony.",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual YouTube ID
    duration: "14 min",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    category: "Performances",
  },
];

// Extract unique categories for the filter
const categories = [
  "All",
  ...new Set(allVideos.map((video) => video.category)),
];

const DuPinPlus = () => {
  const [videos, setVideos] = useState(allVideos);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter videos based on category and search query
  useEffect(() => {
    let filteredVideos = allVideos;

    // Apply category filter
    if (activeCategory !== "All") {
      filteredVideos = filteredVideos.filter(
        (video) => video.category === activeCategory
      );
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filteredVideos = filteredVideos.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.description.toLowerCase().includes(query)
      );
    }

    setVideos(filteredVideos);
  }, [activeCategory, searchQuery]);

  // Handle video selection and modal
  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
    document.body.style.overflow = "auto";
  };

  // Close modal when clicking outside the content
  const handleModalBackdropClick = (e) => {
    if (e.target.classList.contains("video-modal")) {
      closeModal();
    }
  };

  return (
    <div className="dupin-plus-page">
      <Helmet>
        <title>Musée Du Pin+ | Museum Video Archive</title>
        <meta
          name="description"
          content="Explore our collection of videos, virtual tours, and behind-the-scenes content from the museum."
        />
      </Helmet>

      <header className="dupin-plus-header">
        <div className="header-content">
          <h1 className="page-title">MUSÉE DU PIN +</h1>
          <p className="page-subtitle">
            <TranslatedText>
              Discover our exclusive video content, virtual tours, and
              behind-the-scenes features
            </TranslatedText>
          </p>
        </div>
      </header>

      <section className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search videos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button className="search-button">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                d="M15 15l6 6m-11-4a7 7 0 110-14 7 7 0 010 14z"
              />
            </svg>
          </button>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-button ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="videos-grid">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              key={video.id}
              className="video-card"
              onClick={() => openVideoModal(video)}
            >
              <div className="video-thumbnail-container">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="video-thumbnail"
                  loading="lazy"
                />
                <div className="play-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 100 100" className="play-icon">
                      <circle cx="50" cy="50" r="45" className="play-circle" />
                      <polygon
                        points="40,30 70,50 40,70"
                        className="play-triangle"
                      />
                    </svg>
                  </div>
                </div>
                <div className="video-duration">{video.duration}</div>
              </div>
              <div className="video-info">
                <span className="video-category">{video.category}</span>
                <h3 className="video-title">{video.title}</h3>
                {video.subtitle && (
                  <span className="video-subtitle">{video.subtitle}</span>
                )}
                <p className="video-description">{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <h3>No videos found</h3>
            <p>Try adjusting your search or filter criteria</p>
          </div>
        )}
      </section>

      {/* Video Modal - Same as in DuPin component */}
      {showModal && (
        <div className="video-modal" onClick={handleModalBackdropClick}>
          <div className="video-modal-content">
            <button className="close-modal" onClick={closeModal}>
              ×
            </button>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-info">
              <div className="video-modal-header">
                <h3 className="video-modal-title">{selectedVideo.title}</h3>
                {selectedVideo.subtitle && (
                  <p className="video-modal-subtitle">
                    {selectedVideo.subtitle}
                  </p>
                )}
                <span className="video-modal-category">
                  {selectedVideo.category}
                </span>
                <span className="video-modal-duration">
                  {selectedVideo.duration}
                </span>
              </div>
              <p className="video-modal-description">
                {selectedVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DuPinPlus;
