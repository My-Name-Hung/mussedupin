import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TranslatedText from "../TranslatedText";
import "./ExhibitionDetail.css";

// Import the exhibition data (in a real app, this would be fetched from an API)
import ANewLook from "../../assets/home/highlights/ANewLook.jpg";
import beauties from "../../assets/home/highlights/beautes.jpg";
import couture from "../../assets/home/highlights/couture.jpg";
import mamluks from "../../assets/home/highlights/mamluks.jpg";
import masterpieces from "../../assets/home/highlights/Masterpieces.jpg";
import nature from "../../assets/home/highlights/Nature.jpg";
import portrait from "../../assets/home/highlights/portrait.jpg";
import themetau from "../../assets/home/highlights/TheMetAU.jpg";

// Combined data for both exhibitions and guided tours
const allItemsData = {
  // Exhibitions
  mamluks: {
    id: "mamluks",
    title: "Mamluks",
    subtitle: "1250-1517",
    description:
      "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective.",
    date: "30 April - 28 July 2025",
    location: "West Wing, Floor 1",
    image: mamluks,
    alt: "Golden decorated vessel from Mamluk period",
    tag: "Exhibition",
    longDescription: [
      "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective.",
      "The Mamluks were a dynasty of slave soldiers who established a sultanate stretching from Egypt to Syria and the holy cities of Islam. They were great builders and patrons of art, and their legacy remains in the form of mosques, mausoleums, and madrasas throughout Cairo and other major cities.",
      "This exhibition brings together over 200 artifacts including metalwork, ceramics, textiles, manuscripts, and architectural elements from museums and collections around the world, offering visitors a rare opportunity to explore this fascinating period of Islamic history.",
    ],
    curators: ["Dr. Sarah Johnson", "Prof. Ahmed Mahmoud"],
    type: "exhibition",
  },
  couture: {
    id: "couture",
    title: "Musée Du Pin Couture",
    subtitle: "Art and Fashion: Statement Pieces",
    description:
      "A new perspective on decorative arts through the prism of contemporary fashion design.",
    date: "24 January - 21 July 2025",
    location: "East Wing, Floor 2",
    image: couture,
    alt: "Fashion exhibit featuring historical and contemporary pieces",
    tag: "Exhibition",
    longDescription: [
      "A new perspective on decorative arts through the prism of contemporary fashion design.",
      "The exhibition explores the fascinating relationship between art and fashion, showcasing how contemporary designers draw inspiration from historical art and decorative arts traditions.",
      "Featuring works by leading fashion designers alongside the historical artworks that inspired them, this exhibition offers a unique dialogue between past and present, tradition and innovation.",
    ],
    curators: ["Marie Leblanc", "Jean-Paul Gautier"],
    type: "exhibition",
  },
  cimabue: {
    id: "cimabue",
    title: "A New Look at Cimabue",
    subtitle: "At the Origins of Italian Painting",
    description:
      "For the first time, the Musée Du Pin is dedicating an exhibition to Cimabue, one of the most important artists of the 13th century.",
    date: "22 January - 12 May 2025",
    location: "South Wing, Floor 3",
    image: ANewLook,
    alt: "Religious painting by Cimabue",
    tag: "Exhibition",
    longDescription: [
      "For the first time, the Musée Du Pin is dedicating an exhibition to Cimabue, one of the most important artists of the 13th century.",
      "Cenni di Pepo, known as Cimabue, was a Florentine painter and creator of mosaics who played a key role in the early Renaissance. This exhibition brings together his rare surviving works from collections across Europe.",
      "Through paintings, drawings, and archival documents, visitors will discover how Cimabue broke with the rigid Byzantine tradition to develop a more naturalistic style that would influence later artists like Giotto and Duccio.",
    ],
    curators: ["Dr. Isabella Romano", "Dr. Francesco Bianci"],
    type: "exhibition",
  },
  "met-au-dupin": {
    id: "met-au-dupin",
    title: "The Met au Musée Du Pin",
    subtitle: "Near Eastern Antiquities in Dialogue",
    description:
      "A special exhibition featuring artifacts from the Metropolitan Museum of Art in dialogue with the Musée Du Pin collection.",
    date: "29 February - 28 September 2025",
    location: "North Wing, Floor 1",
    image: themetau,
    alt: "Ancient Near Eastern artifact",
    tag: "Exhibition",
    longDescription: [
      "A special exhibition featuring artifacts from the Metropolitan Museum of Art in dialogue with the Musée Du Pin collection.",
      "This unique collaboration between two of the world's greatest museums brings together treasures from ancient Mesopotamia, Egypt, and Persia, exploring connections and differences between these civilizations.",
      "The exhibition includes rare sculptures, reliefs, jewelry, and ceremonial objects, some of which have never before been displayed outside their home institutions.",
    ],
    curators: [
      "Dr. Michael Thompson (The Met)",
      "Dr. Claude Renoir (Musée Du Pin)",
    ],
    type: "exhibition",
  },
  "experience-nature": {
    id: "experience-nature",
    title: "The Experience of Nature",
    subtitle: "Art in Prague at the Court of Rudolf II",
    description:
      "The exhibition highlights the innovative aspect of the naturalistic art movement practiced in Prague at the Court of Rudolf II.",
    date: "19 March - 30 June 2025",
    location: "West Wing, Floor 2",
    image: nature,
    alt: "Naturalistic art from the Court of Rudolf II",
    tag: "Exhibition",
    longDescription: [
      "The exhibition highlights the innovative aspect of the naturalistic art movement practiced in Prague at the Court of Rudolf II.",
      "Emperor Rudolf II (1552-1612) was one of history's greatest art patrons, transforming Prague into a cultural center that attracted artists, scientists, and humanists from across Europe.",
      "This exhibition presents the remarkable scientific and artistic achievements of Rudolf's court, featuring botanical and zoological illustrations, still lifes, landscape paintings, and curiosity cabinet objects that reflect the period's fascination with natural phenomena and scientific discovery.",
    ],
    curators: ["Dr. Jana Kořínková", "Dr. Thomas Schmidt"],
    type: "exhibition",
  },
  "portrait-king-charles": {
    id: "portrait-king-charles",
    title: "The Portrait of King Charles I",
    subtitle: "Conservation and Restoration",
    description:
      "The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year of conservation treatment.",
    date: "Permanent Exhibition",
    location: "East Wing, Floor 3",
    image: portrait,
    alt: "Portrait of King Charles I by Anthony van Dyck",
    tag: "Exhibition",
    longDescription: [
      "The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year of conservation treatment.",
      "This iconic portrait, painted in 1635, is one of the most important works in the Musée Du Pin's collection. The recent conservation project has revealed details that had been obscured by discolored varnish and previous restorations.",
      "The exhibition documents the conservation process, exploring the techniques used by Van Dyck and the historical context of this remarkable royal portrait.",
    ],
    curators: [
      "Blaise Ducos, Executive Curator of Flemish and Dutch Paintings",
    ],
    type: "exhibition",
  },

  // Guided Tours
  masterpieces: {
    id: "masterpieces",
    title: "The Musée Du Pin Masterpieces",
    subtitle: "Essential Highlights Tour",
    description:
      "What exactly is a masterpiece? Follow this trail to discover the most celebrated works in our collection!",
    duration: "1 hour 30 minutes",
    schedule: "Daily at 10:00 AM and 2:00 PM",
    image: masterpieces,
    alt: "Mona Lisa painting",
    tag: "Guided Tour",
    longDescription: [
      "What exactly is a masterpiece? Follow this trail to discover the most celebrated works in our collection!",
      "This guided tour takes visitors to the most famous and important works in the Musée Du Pin, including paintings, sculptures, and decorative arts from various periods and cultures.",
      "Expert guides provide insights into the history, technique, and significance of each masterpiece, helping visitors understand why these works have achieved such enduring fame.",
    ],
    highlights: [
      "The Mona Lisa",
      "Venus de Milo",
      "Victory of Samothrace",
      "Liberty Leading the People",
    ],
    price: "€25 per person",
    type: "tour",
  },
  beautes: {
    id: "beautes",
    title: "De toutes beautés !",
    subtitle: "Beauty Through the Ages",
    description:
      "Rituals, objects and representations of beauty, a retrospective trail through the Musée Du Pin",
    duration: "1 hour 15 minutes",
    schedule: "Tuesday, Thursday, Saturday at 11:30 AM",
    image: beauties,
    alt: "Beauty exhibition poster",
    tag: "Guided Tour",
    longDescription: [
      "Rituals, objects and representations of beauty, a retrospective trail through the Musée Du Pin",
      "This thematic tour explores how concepts of beauty have evolved across different cultures and time periods, from ancient Egypt to modern times.",
      "Visitors will discover cosmetic objects, jewelry, portraits, and sculptures that reflect changing ideals of beauty and their cultural significance.",
    ],
    highlights: [
      "Egyptian cosmetic items",
      "Roman beauty artifacts",
      "Renaissance portraits",
      "Art Nouveau jewelry",
    ],
    price: "€22 per person",
    type: "tour",
  },
  "hidden-treasures": {
    id: "hidden-treasures",
    title: "Hidden Treasures",
    subtitle: "Off the Beaten Path",
    description:
      "Discover the lesser-known but equally magnificent works in our vast collection.",
    duration: "2 hours",
    schedule: "Wednesday and Friday at 1:30 PM",
    image: ANewLook,
    alt: "Hidden treasures of the museum",
    tag: "Guided Tour",
    longDescription: [
      "Discover the lesser-known but equally magnificent works in our vast collection.",
      "This tour takes you through galleries and rooms that are often overlooked by visitors, revealing hidden masterpieces and fascinating stories.",
      "From small curiosities to overlooked masterworks, this tour provides a different perspective on the museum's collections and history.",
    ],
    highlights: [
      "Ancient artifacts from lesser-known civilizations",
      "Rare manuscripts and books",
      "Decorative arts from private royal collections",
      "Experimental works by famous artists",
    ],
    price: "€28 per person",
    type: "tour",
  },
  "palace-history": {
    id: "palace-history",
    title: "The Palace History",
    subtitle: "From Royal Residence to Museum",
    description:
      "Explore the fascinating history of our building and its transformation into one of the world's greatest museums.",
    duration: "1 hour 45 minutes",
    schedule: "Monday, Thursday, Saturday at 10:30 AM",
    image: portrait,
    alt: "Palace architecture and history",
    tag: "Guided Tour",
    longDescription: [
      "Explore the fascinating history of our building and its transformation into one of the world's greatest museums.",
      "This tour focuses on the architecture and history of the palace itself, from its origins as a royal fortress in the late 12th century to its evolution into a museum.",
      "Visitors will learn about the various expansions and renovations over the centuries, the kings and queens who lived here, and key historical events that took place within these walls.",
    ],
    highlights: [
      "Medieval foundations",
      "Royal apartments",
      "Revolutionary history",
      "Modern architectural additions",
    ],
    price: "€24 per person",
    type: "tour",
  },
};

const ExhibitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedVisible, setRelatedVisible] = useState(false);

  // Refs for animation elements
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const relatedRef = useRef(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're just using our static data
    setTimeout(() => {
      const foundItem = allItemsData[id];
      if (foundItem) {
        setItem(foundItem);
        setLoading(false);

        // Add animation to hero section
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
      } else {
        setError("Item not found");
        setLoading(false);
      }
    }, 300); // Simulating a brief loading time

    // Set up intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === relatedRef.current) {
            console.log("Related section is visible now");
            setRelatedVisible(true);
          }
          // Each observed element has a data-id attribute we can use
          if (entry.target.dataset.id) {
            console.log(
              `Element with id ${entry.target.dataset.id} is visible`
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe main content section for scroll animations
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // Observe related items section
    if (relatedRef.current) {
      observer.observe(relatedRef.current);
    }

    // Backup mechanism: force visibility after 2 seconds if not triggered by observer
    const backupTimer = setTimeout(() => {
      setRelatedVisible(true);
    }, 2000);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (relatedRef.current) observer.unobserve(relatedRef.current);
      clearTimeout(backupTimer);
    };
  }, [id]);

  // Handler for back button to maintain tab selection
  const handleBackClick = (e) => {
    e.preventDefault();
    // Navigate based on the type of item
    if (item.type === "exhibition") {
      navigate("/exhibitions");
    } else {
      navigate("/exhibitions?tab=guided-tours");
    }
  };

  if (loading) {
    return (
      <div className="exhibition-detail-loading">
        <div className="loading-spinner"></div>
        <p>
          <TranslatedText>Loading...</TranslatedText>
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="exhibition-detail-error">
        <h2>
          <TranslatedText>Item Not Found</TranslatedText>
        </h2>
        <p>
          <TranslatedText>
            Sorry, we couldn't find the requested item.
          </TranslatedText>
        </p>
        <Link to="/exhibitions" className="back-button">
          <TranslatedText>Back to Exhibitions</TranslatedText>
        </Link>
      </div>
    );
  }

  return (
    <div className="exhibition-detail-page">
      {/* Hero Section */}
      <div className="exhibition-detail-hero" ref={heroRef}>
        <div className="exhibition-detail-hero-image">
          <img src={item.image} alt={item.alt} />
          <div className="exhibition-detail-hero-overlay"></div>
        </div>
        <div className="exhibition-detail-hero-content">
          <div className="exhibition-detail-tag">
            <span>
              <TranslatedText>{item.tag}</TranslatedText>
            </span>
          </div>
          <h1 className="exhibition-detail-title">
            <TranslatedText>{item.title}</TranslatedText>
          </h1>
          <h2 className="exhibition-detail-subtitle">
            <TranslatedText>{item.subtitle}</TranslatedText>
          </h2>
        </div>
      </div>

      {/* Main Content */}
      <div
        className="exhibition-detail-content"
        ref={contentRef}
        data-id="main-content"
      >
        <div className="exhibition-detail-info">
          <div className="exhibition-detail-meta">
            {item.type === "exhibition" ? (
              <>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Dates</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.date}</TranslatedText>
                  </p>
                </div>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Location</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.location}</TranslatedText>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Duration</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.duration}</TranslatedText>
                  </p>
                </div>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Schedule</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.schedule}</TranslatedText>
                  </p>
                </div>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Price</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.price}</TranslatedText>
                  </p>
                </div>
              </>
            )}

            <div className="meta-button">
              {item.type === "exhibition" ? (
                <Link to="/tickets" className="cta-button">
                  <TranslatedText>Get Tickets</TranslatedText>
                </Link>
              ) : (
                <Link to="/tickets" className="cta-button">
                  <TranslatedText>Book This Tour</TranslatedText>
                </Link>
              )}
            </div>
          </div>

          <div className="exhibition-detail-description">
            {item.longDescription.map((paragraph, index) => (
              <p key={index}>
                <TranslatedText>{paragraph}</TranslatedText>
              </p>
            ))}

            {item.type === "exhibition" && (
              <div className="exhibition-detail-curators">
                <h3>
                  <TranslatedText>Curators</TranslatedText>
                </h3>
                <ul>
                  {item.curators.map((curator, index) => (
                    <li key={index}>
                      <TranslatedText>{curator}</TranslatedText>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.type === "tour" && (
              <div className="exhibition-detail-highlights">
                <h3>
                  <TranslatedText>Tour Highlights</TranslatedText>
                </h3>
                <ul>
                  {item.highlights.map((highlight, index) => (
                    <li key={index}>
                      <TranslatedText>{highlight}</TranslatedText>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Items Section */}
        <div
          className={`related-items ${relatedVisible ? "visible" : ""}`}
          ref={relatedRef}
          data-id="related-section"
        >
          <h2>
            <TranslatedText>You May Also Like</TranslatedText>
          </h2>
          <div className="related-items-grid">
            {Object.values(allItemsData)
              .filter(
                (relatedItem) =>
                  relatedItem.id !== id && relatedItem.type === item.type
              )
              .slice(0, 3)
              .map((relatedItem, index) => (
                <div
                  key={relatedItem.id}
                  className="related-item-card"
                  style={{ "--card-index": index }}
                >
                  <Link
                    to={`/exhibition-details/${relatedItem.id}`}
                    state={{
                      fromTab:
                        item.type === "tour" ? "guided-tours" : "exhibitions",
                    }}
                  >
                    <div className="related-item-image">
                      <img src={relatedItem.image} alt={relatedItem.alt} />
                    </div>
                    <div className="related-item-content">
                      <h3>
                        <TranslatedText>{relatedItem.title}</TranslatedText>
                      </h3>
                      <p>
                        <TranslatedText>
                          {relatedItem.type === "exhibition"
                            ? relatedItem.date
                            : relatedItem.duration}
                        </TranslatedText>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="back-link">
          <a href="#" onClick={handleBackClick} className="back-button">
            <span className="arrow-icon">←</span>
            <TranslatedText>
              Back to{" "}
              {item.type === "exhibition" ? "Exhibitions" : "Guided Tours"}
            </TranslatedText>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetail;
