import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import TranslatedText from "../TranslatedText";

// Import the exhibition data from Highlights.jsx
import hero from "../../assets/home/hero/louvre-sunset.jpg";
import ANewLook from "../../assets/home/highlights/ANewLook.jpg";
import beauties from "../../assets/home/highlights/beautes.jpg";
import couture from "../../assets/home/highlights/couture.jpg";
import mamluks from "../../assets/home/highlights/mamluks.jpg";
import masterpieces from "../../assets/home/highlights/Masterpieces.jpg";
import nature from "../../assets/home/highlights/Nature.jpg";
import portrait from "../../assets/home/highlights/portrait.jpg";
import themetau from "../../assets/home/highlights/TheMetAU.jpg";
import "./Exhibitions.css";

// Sample exhibition data - similar to highlightsData
const exhibitionsData = [
  {
    id: 1,
    title: "Mamluks",
    subtitle: "1250-1517",
    description:
      "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective.",
    date: "30 April - 28 July 2025",
    image: mamluks,
    alt: "Golden decorated vessel from Mamluk period",
    tag: "Exhibition",
    link: "/exhibition-details/mamluks",
    featured: true,
  },
  {
    id: 2,
    title: "The Experience of Nature",
    subtitle: "Art in Prague at the Court of Rudolf II",
    description:
      "The exhibition highlights the innovative aspect of the naturalistic art movement practiced in Prague at the Court of Rudolf II.",
    date: "19 March - 30 June 2025",
    image: nature,
    alt: "Naturalistic art from the Court of Rudolf II",
    tag: "Exhibition",
    link: "/exhibition-details/experience-nature",
    featured: false,
  },
  {
    id: 3,
    title: "Musée Du Pin Couture",
    subtitle: "Art and Fashion: Statement Pieces",
    description:
      "A new perspective on decorative arts through the prism of contemporary fashion design.",
    date: "24 January - 21 July 2025",
    image: couture,
    alt: "Fashion exhibit featuring historical and contemporary pieces",
    tag: "Exhibition",
    link: "/exhibition-details/couture",
    featured: false,
  },
  {
    id: 4,
    title: "A New Look at Cimabue",
    subtitle: "At the Origins of Italian Painting",
    description:
      "For the first time, the Musée Du Pin is dedicating an exhibition to Cimabue, one of the most important artists of the 13th century.",
    date: "22 January - 12 May 2025",
    image: ANewLook,
    alt: "Religious painting by Cimabue",
    tag: "Exhibition",
    link: "/exhibition-details/cimabue",
    featured: false,
  },
  {
    id: 5,
    title: "The Met au Musée Du Pin",
    subtitle: "Near Eastern Antiquities in Dialogue",
    description:
      "A special exhibition featuring artifacts from the Metropolitan Museum of Art in dialogue with the Musée Du Pin collection.",
    date: "29 February - 28 September 2025",
    image: themetau,
    alt: "Ancient Near Eastern artifact",
    tag: "Exhibition",
    link: "/exhibition-details/met-au-dupin",
    featured: false,
  },
  {
    id: 6,
    title: "The Portrait of King Charles I",
    subtitle: "Conservation and Restoration",
    description:
      "The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year of conservation treatment.",
    date: "Permanent Exhibition",
    image: portrait,
    alt: "Portrait of King Charles I by Anthony van Dyck",
    tag: "Exhibition",
    link: "/exhibition-details/portrait-king-charles",
    featured: false,
  },
];

// Sample guided tours data
const guidedToursData = [
  {
    id: 1,
    title: "The Musée Du Pin Masterpieces",
    subtitle: "Essential Highlights Tour",
    description:
      "What exactly is a masterpiece? Follow this trail to discover the most celebrated works in our collection!",
    duration: "1 hour 30 minutes",
    image: masterpieces,
    alt: "Mona Lisa painting",
    tag: "Guided Tour",
    link: "/guided-tour-details/masterpieces",
    featured: true,
  },
  {
    id: 2,
    title: "De toutes beautés !",
    subtitle: "Beauty Through the Ages",
    description:
      "Rituals, objects and representations of beauty, a retrospective trail through the Musée Du Pin",
    duration: "1 hour 15 minutes",
    image: beauties,
    alt: "Beauty exhibition poster",
    tag: "Guided Tour",
    link: "/guided-tour-details/beautes",
    featured: false,
  },
  {
    id: 3,
    title: "Hidden Treasures",
    subtitle: "Off the Beaten Path",
    description:
      "Discover the lesser-known but equally magnificent works in our vast collection.",
    duration: "2 hours",
    image: ANewLook,
    alt: "Hidden treasures of the museum",
    tag: "Guided Tour",
    link: "/guided-tour-details/hidden-treasures",
    featured: false,
  },
  {
    id: 4,
    title: "The Palace History",
    subtitle: "From Royal Residence to Museum",
    description:
      "Explore the fascinating history of our building and its transformation into one of the world's greatest museums.",
    duration: "1 hour 45 minutes",
    image: portrait,
    alt: "Palace architecture and history",
    tag: "Guided Tour",
    link: "/guided-tour-details/palace-history",
    featured: false,
  },
];

const Exhibitions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gridRef = useRef(null);
  const heroRef = useRef(null);

  // Check for tab parameter in URL
  const queryParams = new URLSearchParams(location.search);
  const tabParam = queryParams.get("tab");

  const [activeTab, setActiveTab] = useState(
    tabParam === "guided-tours" ? "guided-tours" : "exhibitions"
  );
  const [isVisible, setIsVisible] = useState({});
  const [pageLoaded, setPageLoaded] = useState(false);

  // Effect to handle loading animation
  useEffect(() => {
    setPageLoaded(true);

    // Add a small animation to the hero section
    if (heroRef.current) {
      heroRef.current.style.opacity = "0";
      heroRef.current.style.transform = "translateY(20px)";

      setTimeout(() => {
        heroRef.current.style.opacity = "1";
        heroRef.current.style.transform = "translateY(0)";
        heroRef.current.style.transition =
          "opacity 0.8s ease, transform 0.8s ease";
      }, 100);
    }
  }, []);

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    if (tab === activeTab) return;

    setActiveTab(tab);

    // Reset visibility state for new cards
    setIsVisible({});

    // Update URL without page reload
    navigate(
      `/exhibitions${tab === "guided-tours" ? "?tab=guided-tours" : ""}`,
      { replace: true }
    );
  };

  // Effect to update active tab when URL changes
  useEffect(() => {
    const tabFromUrl = queryParams.get("tab");
    if (tabFromUrl === "guided-tours" && activeTab !== "guided-tours") {
      setActiveTab("guided-tours");
    } else if (!tabFromUrl && activeTab !== "exhibitions") {
      setActiveTab("exhibitions");
    }
  }, [location.search]);

  // Observe elements for animation on scroll
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible((prev) => ({
            ...prev,
            [entry.target.dataset.id]: true,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Reset visibility on tab change
    // Add a small delay to allow DOM to update after tab change
    setTimeout(() => {
      // Observe all card elements
      const cards = document.querySelectorAll(".exhibition-card-wrapper");
      cards.forEach((card) => {
        observer.observe(card);
      });
    }, 100);

    return () => {
      // Clean up observer
      const cards = document.querySelectorAll(".exhibition-card-wrapper");
      cards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, [activeTab]);

  // Get active data based on current tab
  const activeData =
    activeTab === "exhibitions" ? exhibitionsData : guidedToursData;

  return (
    <div className="exhibitions-page">
      {/* Hero Section with background image */}
      <div className="exhibitions-hero" ref={heroRef}>
        <div className="exhibitions-hero-overlay">
          <img src={hero} alt="Museum exterior" />
        </div>
        <div className="exhibitions-hero-content">
          <h1 className="exhibitions-hero-title">
            <TranslatedText>
              {activeTab === "exhibitions" ? "EXHIBITIONS" : "GUIDED TOURS"}
            </TranslatedText>
          </h1>
          <p className="exhibitions-hero-subtitle">
            <TranslatedText>
              {activeTab === "exhibitions"
                ? "Discover our current and upcoming exhibitions"
                : "Explore the museum with our expert guides"}
            </TranslatedText>
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="exhibitions-tabs-container">
        <div className="exhibitions-tabs">
          <button
            className={`tab-button ${
              activeTab === "exhibitions" ? "active" : ""
            }`}
            onClick={() => handleTabChange("exhibitions")}
            aria-label="Show exhibitions"
          >
            <TranslatedText>EXHIBITIONS</TranslatedText>
          </button>
          <button
            className={`tab-button ${
              activeTab === "guided-tours" ? "active" : ""
            }`}
            onClick={() => handleTabChange("guided-tours")}
            aria-label="Show guided tours"
          >
            <TranslatedText>GUIDED TOURS</TranslatedText>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="exhibitions-container">
        {/* Featured Exhibition */}
        {activeData.filter((item) => item.featured).length > 0 && (
          <div className="featured-exhibition">
            {activeData
              .filter((item) => item.featured)
              .map((item) => (
                <div
                  key={item.id}
                  className={`exhibition-card-wrapper featured ${
                    isVisible[`featured-${item.id}`] || pageLoaded
                      ? "visible"
                      : ""
                  }`}
                  data-id={`featured-${item.id}`}
                >
                  <div className="exhibition-card featured-card">
                    <div className="card-tag">
                      <span>
                        <TranslatedText>{item.tag}</TranslatedText>
                      </span>
                    </div>
                    <Link to={item.link} className="card-link-wrapper">
                      <div className="card-image-container">
                        <img
                          src={item.image}
                          alt={item.alt}
                          className="card-image"
                          loading="eager"
                        />
                      </div>
                      <div className="card-content">
                        <h2 className="card-title">
                          <TranslatedText>{item.title}</TranslatedText>
                        </h2>
                        <h3 className="card-subtitle">
                          <TranslatedText>{item.subtitle}</TranslatedText>
                        </h3>
                        <p className="card-description">
                          <TranslatedText>{item.description}</TranslatedText>
                        </p>
                        <div className="card-footer">
                          <span className="card-date">
                            <TranslatedText>
                              {activeTab === "exhibitions"
                                ? item.date
                                : `Duration: ${item.duration}`}
                            </TranslatedText>
                          </span>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Grid of Exhibitions */}
        <div className="exhibitions-grid" ref={gridRef}>
          {activeData
            .filter((item) => !item.featured)
            .map((item, index) => (
              <div
                key={item.id}
                className={`exhibition-card-wrapper ${
                  isVisible[`regular-${item.id}`] ? "visible" : ""
                }`}
                data-id={`regular-${item.id}`}
                style={{
                  transitionDelay: !isVisible[`regular-${item.id}`]
                    ? `${index * 0.1}s`
                    : "0s",
                }}
              >
                <div className="exhibition-card">
                  <div className="card-tag">
                    <span>
                      <TranslatedText>{item.tag}</TranslatedText>
                    </span>
                  </div>
                  <Link to={item.link} className="card-link-wrapper">
                    <div className="card-image-container">
                      <img
                        src={item.image}
                        alt={item.alt}
                        className="card-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="card-content">
                      <h2 className="card-title">
                        <TranslatedText>{item.title}</TranslatedText>
                      </h2>
                      <h3 className="card-subtitle">
                        <TranslatedText>{item.subtitle}</TranslatedText>
                      </h3>
                      <p className="card-description">
                        <TranslatedText>{item.description}</TranslatedText>
                      </p>
                      <div className="card-footer">
                        <span className="card-date">
                          <TranslatedText>
                            {activeTab === "exhibitions"
                              ? item.date
                              : `Duration: ${item.duration}`}
                          </TranslatedText>
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {/* Add a See Past Link */}
        <div className="see-past-link">
          <Link
            to={
              activeTab === "exhibitions"
                ? "/past-exhibitions"
                : "/past-guided-tours"
            }
          >
            <TranslatedText>
              {activeTab === "exhibitions"
                ? "See past exhibitions"
                : "See past guided tours"}
            </TranslatedText>
            <span className="arrow-icon">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Exhibitions;
