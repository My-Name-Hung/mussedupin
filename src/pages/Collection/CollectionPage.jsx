import React, { useEffect, useRef, useState } from "react";
import TranslatedText from "../../components/TranslatedText";
import "./CollectionPage.css";

// Import images
import {
  default as heroImage2,
  default as painting1,
} from "../../assets/home/collections/ANewLook.jpg";
import painting2 from "../../assets/home/collections/beautes.jpg";
import painting3 from "../../assets/home/collections/couture.jpg";
import heroImage1 from "../../assets/home/collections/louvre-sunset.jpg";
import painting4, {
  default as heroImage3,
  default as painting5,
} from "../../assets/home/collections/Masterpieces.jpg";
import painting6 from "../../assets/home/collections/Nature.jpg";
import painting7 from "../../assets/home/collections/portrait.jpg";
import {
  default as heroImage4,
  default as painting8,
} from "../../assets/home/collections/TheMetAu.jpg";

// Collection data
const collectionData = {
  heroImages: [heroImage1, heroImage2, heroImage3, heroImage4],

  artworks: [
    {
      id: 1,
      title: "Young Girls at the Piano",
      artist: "Auguste Renoir",
      year: "1892",
      image: painting1,
      description:
        "In the early 1890s, friends and admirers of Renoir took exception to the fact that the French State had never made any official purchase from the painter, then almost fifty years old. In 1892, Stéphane Mallarmé, who knew and admired the artist, helped by Roger Marx, a young member of the Beaux Arts administration and open to new trends, took steps to bring Impressionist works into the national museums.",
      location: "Niveau supérieur, Salle 35",
      tags: ["Impressionism", "French", "19th Century"],
    },
    {
      id: 2,
      title: "The Caryatids",
      artist: "Jean Goujon",
      year: "1550-1551",
      image: painting2,
      description:
        "These sculptures by Jean Goujon are among the most recognizable works of French Renaissance sculpture. The Caryatids, female figures used as architectural supports, showcase Goujon's mastery of harmonious proportions and the evolving French style of the period.",
      location: "Aile Sully, Rez-de-chaussée",
      tags: ["Sculpture", "Renaissance", "French"],
    },
    {
      id: 3,
      title: "Liberty Leading the People",
      artist: "Eugène Delacroix",
      year: "1830",
      image: painting3,
      description:
        "Painted to commemorate the July Revolution of 1830, this iconic work shows Liberty personified as a woman leading the people forward over the bodies of the fallen. It has become an enduring symbol of freedom and the struggle against oppression in France and worldwide.",
      location: "Aile Denon, 1er étage",
      tags: ["Romanticism", "French", "19th Century"],
    },
    {
      id: 4,
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
      year: "1503-1519",
      image: painting4,
      description:
        "Perhaps the most famous painting in the world, the Mona Lisa's enigmatic smile and Leonardo's innovative techniques have fascinated viewers for centuries. This masterpiece exemplifies Leonardo's sfumato technique and his deep understanding of human anatomy and expression.",
      location: "Aile Denon, 1er étage, Salle des États",
      tags: ["Renaissance", "Italian", "Portrait"],
    },
    {
      id: 5,
      title: "Venus de Milo",
      artist: "Alexandros of Antioch",
      year: "c. 100 BCE",
      image: painting5,
      description:
        "Discovered in 1820 on the island of Milos, this Hellenistic marble sculpture represents Aphrodite (Venus), the Greek goddess of love and beauty. Despite the loss of her arms, the Venus de Milo remains one of the most celebrated sculptures from antiquity.",
      location: "Aile Sully, Rez-de-chaussée",
      tags: ["Sculpture", "Greek", "Hellenistic"],
    },
    {
      id: 6,
      title: "The Raft of the Medusa",
      artist: "Théodore Géricault",
      year: "1818-1819",
      image: painting6,
      description:
        "This monumental painting depicts the aftermath of the wreck of the French naval frigate Méduse. Géricault's dramatic composition and unflinching portrayal of human suffering make this a key work of Romanticism and an emotionally powerful indictment of political incompetence.",
      location: "Aile Denon, 1er étage",
      tags: ["Romanticism", "French", "19th Century"],
    },
    {
      id: 7,
      title: "The Wedding Feast at Cana",
      artist: "Paolo Veronese",
      year: "1563",
      image: painting7,
      description:
        "This massive canvas depicts the biblical story of Jesus turning water into wine at a wedding feast. Veronese populated the scene with contemporary Venetian figures in luxurious attire, creating an opulent Renaissance banquet that showcases his mastery of color and composition.",
      location: "Aile Denon, 1er étage",
      tags: ["Renaissance", "Italian", "Biblical"],
    },
    {
      id: 8,
      title: "Winged Victory of Samothrace",
      artist: "Unknown",
      year: "c. 200-190 BCE",
      image: painting8,
      description:
        "This Hellenistic sculpture of Nike, the Greek goddess of victory, was discovered on the island of Samothrace in 1863. The dynamic movement of the figure, with her wings spread and garments appearing windswept, creates a sense of triumph and motion that has influenced countless artists.",
      location: "Escalier Daru",
      tags: ["Sculpture", "Greek", "Hellenistic"],
    },
    {
      id: 9,
      title: "Michelangelo's Slaves",
      artist: "Michelangelo",
      year: "1513-1516",
      image: painting2,
      description:
        "These unfinished sculptures, known as the 'Captives' or 'Slaves', were originally intended for the tomb of Pope Julius II. They exemplify Michelangelo's concept of 'non-finito' and his belief that the sculptor's task was to liberate the figure from the stone.",
      location: "Aile Denon, Rez-de-chaussée",
      tags: ["Sculpture", "Renaissance", "Italian"],
    },
    {
      id: 10,
      title: "The Coronation of Napoleon",
      artist: "Jacques-Louis David",
      year: "1805-1807",
      image: painting3,
      description:
        "This massive painting depicts the coronation of Napoleon as Emperor of the French at Notre-Dame de Paris. David's meticulous attention to detail and masterful composition create a powerful political statement celebrating the new imperial regime.",
      location: "Aile Denon, 1er étage",
      tags: ["Neoclassicism", "French", "19th Century"],
    },
    {
      id: 11,
      title: "The Lacemaker",
      artist: "Johannes Vermeer",
      year: "c. 1669-1670",
      image: painting1,
      description:
        "This small but exquisite painting showcases Vermeer's mastery of light and his ability to convey the dignity of everyday labor. The lacemaker's intense concentration and the delicate rendering of the threads exemplify the artist's precision and sensitivity.",
      location: "Aile Richelieu, 2ème étage",
      tags: ["Dutch Golden Age", "Genre", "17th Century"],
    },
    {
      id: 12,
      title: "Egyptian Antiquities",
      artist: "Various Artists",
      year: "c. 3000 BCE - 30 BCE",
      image: painting5,
      description:
        "The Egyptian antiquities collection includes sarcophagi, mummies, jewelry, and everyday objects that provide insight into one of the world's oldest civilizations. These artifacts reflect the Egyptians' complex belief system and remarkable artistic achievements.",
      location: "Aile Sully, Niveau 0, 1, 2",
      tags: ["Ancient", "Egyptian", "Antiquities"],
    },
    {
      id: 13,
      title: "The Nike of Samothrace",
      artist: "Unknown Greek Artist",
      year: "c. 200-190 BCE",
      image: painting8,
      description:
        "Also known as the Winged Victory, this Hellenistic sculpture depicts Nike, the goddess of victory, as she descends from the heavens to the prow of a ship. The masterful rendering of the flowing drapery suggests a strong sea breeze, creating a sense of dynamic movement.",
      location: "Escalier Daru",
      tags: ["Sculpture", "Greek", "Hellenistic"],
    },
    {
      id: 14,
      title: "Portrait of François I",
      artist: "Jean Clouet",
      year: "c. 1530",
      image: painting7,
      description:
        "This elegant portrait depicts François I, the Renaissance king who founded the Louvre Palace and was a significant patron of the arts. Clouet's meticulous attention to detail captures both the king's majestic authority and his personal charisma.",
      location: "Aile Denon, 1er étage",
      tags: ["Renaissance", "Portrait", "French"],
    },
  ],

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

  highlights: [
    {
      id: 1,
      title: "The Renaissance Masters",
      category: "Renaissance",
      image: painting1,
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Explore the masterpieces of Italian Renaissance artists who changed the course of art history.",
    },
    {
      id: 2,
      title: "Classical Sculptures",
      category: "Sculpture",
      image: painting3,
      type: "image",
      artwork: 1,
      description:
        "Discover the beauty and elegance of classical sculpture from ancient Greece and Rome.",
    },
    {
      id: 3,
      title: "Impressionist Revolution",
      category: "Impressionism",
      image: painting7,
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Follow the revolutionary path of the Impressionists who changed how we see and experience art.",
    },
    {
      id: 4,
      title: "The Baroque Period",
      category: "Baroque",
      image: painting5,
      type: "image",
      artwork: 4,
      description:
        "Experience the drama, grandeur, and emotional intensity of Baroque masterpieces.",
    },
    {
      id: 5,
      title: "Islamic Art & Architecture",
      category: "Islamic Art",
      image: painting6,
      type: "video",
      youtubeId: "dQw4w9WgXcQ",
      description:
        "Discover the rich patterns, calligraphy, and architectural elements of Islamic artistic tradition.",
    },
    {
      id: 6,
      title: "Fashion Through the Ages",
      category: "Fashion",
      image: painting2,
      type: "image",
      artwork: 2,
      description:
        "See how clothing and adornment reflected cultural values and aesthetics throughout history.",
    },
  ],
};

const CollectionPage = () => {
  // State for hero section slideshow
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);

  // State for featured artwork
  const [selectedArtwork, setSelectedArtwork] = useState(0);

  // State for discover works gallery
  const discoverWorksRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // State for modals
  const [artworkModalOpen, setArtworkModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalClosing, setVideoModalClosing] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  // State for auto-scrolling functionality
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [manualInteraction, setManualInteraction] = useState(false);
  const userInteractionTimeout = useRef(null);

  // State for parallax effect on category cards
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const categoryGridRef = useRef(null);

  // Handle auto-rotating hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide(
        (prev) => (prev + 1) % collectionData.heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle section animations with debounce for better performance
  useEffect(() => {
    const animateSections = () => {
      const sections = document.querySelectorAll(".animate-section");

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (sectionTop < windowHeight * 0.75) {
          section.classList.add("visible");
        }
      });
    };

    // Debounce function to limit frequency of scroll event handling
    const debounce = (func, wait = 10, immediate = true) => {
      let timeout;
      return function () {
        const context = this,
          args = arguments;
        const later = function () {
          timeout = null;
          if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
      };
    };

    // Run once on mount
    animateSections();

    // Add scroll listener with debounce for better performance
    const debouncedAnimateSections = debounce(animateSections, 15);
    window.addEventListener("scroll", debouncedAnimateSections, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", debouncedAnimateSections);
    };
  }, []);

  // Use a more efficient intersection observer with fewer callbacks
  useEffect(() => {
    // Detect if we're on a mobile device to apply optimizations
    const isMobile = window.innerWidth <= 768;

    const observerOptions = {
      threshold: isMobile ? 0.1 : 0.15, // Lower threshold on mobile for earlier loading
      rootMargin: isMobile ? "100px" : "0px", // Bigger margin on mobile
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          // Unobserve after animation to save resources
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Only observe elements that are not already visible
    document
      .querySelectorAll(".animate-section:not(.visible)")
      .forEach((section) => {
        observer.observe(section);
      });

    return () => {
      // Cleanup
      observer.disconnect();
    };
  }, []);

  // Handle artwork selection
  const handleArtworkSelect = (index) => {
    setSelectedArtwork(index);
    document.getElementById("featured-artwork").scrollIntoView({
      behavior: "smooth",
    });
  };

  // Navigate through featured artworks
  const navigateArtwork = (direction) => {
    if (direction === "prev") {
      setSelectedArtwork(
        (prev) =>
          (prev - 1 + collectionData.artworks.length) %
          collectionData.artworks.length
      );
    } else {
      setSelectedArtwork((prev) => (prev + 1) % collectionData.artworks.length);
    }
  };

  // Handle category selection - navigate to a new route instead of opening modal
  const handleCategorySelect = (category, event) => {
    // Add click animation effect before navigation
    const card = event.currentTarget;
    card.style.transition = "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)";
    card.style.transform = "scale(1.05) translateY(-15px)";
    card.style.opacity = "0.8";

    // Use setTimeout to allow the animation to complete before navigation
    setTimeout(() => {
      window.location.href = `/collection/category/${
        category.id
      }/${category.title.toLowerCase().replace(/\s+/g, "-")}`;
    }, 400);
  };

  // Open artwork detail modal
  const openArtworkDetail = (highlight) => {
    // Find the artwork index based on the referenced ID
    const artworkIndex = collectionData.artworks.findIndex(
      (artwork) => artwork.id === highlight.artwork
    );

    if (artworkIndex !== -1) {
      // Set the selected artwork
      setSelectedArtwork(artworkIndex);

      // Scroll to the featured artwork section with smooth animation
      document.getElementById("featured-artwork").scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  // Open video modal with enhanced animation
  const openVideoModal = (highlight) => {
    // Add a more elaborate animation sequence to the clicked item
    const highlightElement = document.querySelector(
      `[data-highlight-id="${highlight.id}"]`
    );

    if (highlightElement) {
      // Add pulse effect to play button
      const playButton = highlightElement.querySelector(".cp-play-button");
      let ripple = null;

      if (playButton) {
        playButton.style.transform = "translate(-50%, -50%) scale(1.2)";
        playButton.style.opacity = "1";

        // Create ripple effect
        ripple = document.createElement("div");
        ripple.className = "cp-video-ripple";
        ripple.style.position = "absolute";
        ripple.style.top = "50%";
        ripple.style.left = "50%";
        ripple.style.transform = "translate(-50%, -50%)";
        ripple.style.width = "80px";
        ripple.style.height = "80px";
        ripple.style.borderRadius = "50%";
        ripple.style.background = "rgba(255, 255, 255, 0.2)";
        ripple.style.zIndex = "10";
        ripple.style.animation =
          "ripple-out 0.6s cubic-bezier(0.19, 1, 0.22, 1) forwards";

        highlightElement.appendChild(ripple);
      }

      // Add opening animation class
      highlightElement.classList.add("video-opening");

      // Apply transform to the image for zoom effect
      const img = highlightElement.querySelector(".cp-highlight-img");
      if (img) {
        img.style.transform = "scale(1.15)";
      }

      // Apply fade to the gradient
      const gradient = highlightElement.querySelector(".cp-highlight-gradient");
      if (gradient) {
        gradient.style.opacity = "0.9";
      }

      // Clean up animations after delay before opening modal
      setTimeout(() => {
        if (ripple) ripple.remove();
        highlightElement.classList.remove("video-opening");

        // Reset styles
        if (img) img.style.transform = "";
        if (gradient) gradient.style.opacity = "";
        if (playButton) {
          playButton.style.transform = "";
          playButton.style.opacity = "";
        }

        // Now open the modal
        setModalContent(highlight);
        setVideoModalOpen(true);
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }, 600);
    } else {
      // Fallback if element not found
      setModalContent(highlight);
      setVideoModalOpen(true);
      document.body.style.overflow = "hidden";
    }
  };

  // Close modals with animation
  const closeModal = () => {
    if (videoModalOpen) {
      setVideoModalClosing(true);
      setTimeout(() => {
        setVideoModalOpen(false);
        setVideoModalClosing(false);
        setModalContent(null);
        document.body.style.overflow = "auto"; // Re-enable scrolling
      }, 300);
    } else {
      setArtworkModalOpen(false);
      document.body.style.overflow = "auto";
    }
  };

  // Handle modal backdrop click to close
  const handleModalBackdropClick = (e) => {
    if (e.target.classList.contains("cp-modal")) {
      closeModal();
    }
  };

  // Handle download artwork
  const handleDownload = (artwork) => {
    const link = document.createElement("a");
    link.href = artwork.image;
    link.download = `${artwork.title.replace(/\s+/g, "-").toLowerCase()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle mouse events for dragging the gallery
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - discoverWorksRef.current.offsetLeft);
    setScrollLeft(discoverWorksRef.current.scrollLeft);
    setManualInteraction(true);
    setShowScrollIndicator(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);

    // Set a timeout to auto-resume scrolling after manual interaction
    if (userInteractionTimeout.current) {
      clearTimeout(userInteractionTimeout.current);
    }
    userInteractionTimeout.current = setTimeout(() => {
      setManualInteraction(false);
    }, 2000);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - discoverWorksRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    setScrollLeft(
      Math.max(0, Math.min(scrollLeft - walk, contentWidth - containerWidth))
    );
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX - discoverWorksRef.current.offsetLeft);
    setScrollLeft(discoverWorksRef.current.scrollLeft);
    setManualInteraction(true);
    setShowScrollIndicator(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].clientX - discoverWorksRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    setScrollLeft(
      Math.max(0, Math.min(scrollLeft - walk, contentWidth - containerWidth))
    );
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    // Add delay before resuming to improve mobile experience
    setTimeout(() => {
      if (userInteractionTimeout.current) {
        clearTimeout(userInteractionTimeout.current);
      }
      userInteractionTimeout.current = setTimeout(() => {
        setManualInteraction(false);
      }, 2000);
    }, 800);
  };

  // Handle scroll arrows
  const handleScroll = (direction) => {
    if (discoverWorksRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      discoverWorksRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle pause on hover handlers
  const handleMouseEnter = () => {
    setAutoScrollEnabled(false);
    setShowScrollIndicator(false);
  };

  const handleMouseLeave = () => {
    if (!isDragging) {
      setAutoScrollEnabled(true);
    }

    // Reset manual interaction flag after timeout
    if (!isDragging) {
      if (userInteractionTimeout.current) {
        clearTimeout(userInteractionTimeout.current);
      }
      userInteractionTimeout.current = setTimeout(() => {
        setManualInteraction(false);
      }, 2000);
    }
  };

  // Optimize the slideshow animation to be smoother and faster
  useEffect(() => {
    if (
      !discoverWorksRef.current ||
      !autoScrollEnabled ||
      isDragging ||
      manualInteraction
    ) {
      return () => {};
    }

    // Set CSS scroll behavior to auto for smoother animation
    if (discoverWorksRef.current.firstChild) {
      discoverWorksRef.current.firstChild.style.transition =
        "transform 0ms linear";
    }

    // Calculate widths once at the beginning of animation
    const containerWidth = discoverWorksRef.current.clientWidth;
    const contentWidth = discoverWorksRef.current.scrollWidth;
    setContainerWidth(containerWidth);
    setContentWidth(contentWidth);

    if (contentWidth <= containerWidth) return () => {};

    // Smoother animation with optimized timing
    let startTime = null;
    let animationFrameId = null;
    const duration = 50000; // 50 seconds for full scroll
    const maxScroll = contentWidth - containerWidth;

    // Use direct DOM manipulation for better performance
    const innerContainer = discoverWorksRef.current.firstChild;

    const animateScroll = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate scroll position with simple linear function - less calculations, smoother animation
      const scrollPos = (elapsed / duration) * maxScroll;

      // Reset when we reach the end
      if (scrollPos >= maxScroll) {
        startTime = timestamp;
        // Jump back to start without animation
        innerContainer.style.transform = `translateX(0px)`;
      } else {
        // Direct DOM manipulation instead of using React state for smoother animation
        innerContainer.style.transform = `translateX(-${scrollPos}px)`;
      }

      animationFrameId = requestAnimationFrame(animateScroll);
    };

    animationFrameId = requestAnimationFrame(animateScroll);

    // Clean up animation
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [autoScrollEnabled, isDragging, manualInteraction]);

  // Add ResizeObserver useEffect to update dimensions when window resizes
  useEffect(() => {
    if (!discoverWorksRef.current) return;

    const calculateWidths = () => {
      if (discoverWorksRef.current) {
        const containerWidth = discoverWorksRef.current.clientWidth;
        const contentWidth = discoverWorksRef.current.scrollWidth;

        setContainerWidth(containerWidth);
        setContentWidth(contentWidth);
      }
    };

    // Initial calculation
    calculateWidths();

    // Use ResizeObserver for more precise updates
    if (window.ResizeObserver) {
      const resizeObserver = new ResizeObserver(calculateWidths);
      resizeObserver.observe(discoverWorksRef.current);

      return () => {
        resizeObserver.disconnect();
      };
    } else {
      // Fallback for browsers without ResizeObserver
      const handleResize = () => calculateWidths();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  // Optimize mouse movement handler with throttling to improve performance
  const handleCategoryMouseMove = (e) => {
    // Skip on mobile (where mouse movement isn't relevant)
    if (window.innerWidth <= 768) return;

    if (!categoryGridRef.current) return;

    const { left, top, width, height } =
      categoryGridRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;

    setMousePosition({ x, y });
  };

  return (
    <div className="collection-page">
      {/* Hero Section */}
      <section className="cp-hero animate-section">
        <div className="cp-hero-slides-container">
          {collectionData.heroImages.map((image, index) => (
            <div
              key={index}
              className={`cp-hero-slide ${
                activeHeroSlide === index ? "active" : ""
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="cp-hero-overlay"></div>
        <div className="cp-hero-content">
          <h1 className="cp-hero-title">
            <span className="translated-text">EXPLORE THE COLLECTION</span>
          </h1>
          <p className="cp-hero-subtitle">
            <span className="translated-text">
              Discover masterpieces from around the world, spanning thousands of
              years of human creativity
            </span>
          </p>
        </div>
        <div className="cp-hero-scroll-indicator">
          <div className="cp-hero-scroll-mouse">
            <div className="cp-hero-scroll-wheel"></div>
          </div>
          <span>SCROLL</span>
        </div>
        <div
          className="diagonal-divider bottom enhanced"
          style={{ backgroundColor: "transparent" }}
        ></div>
      </section>

      {/* Discover the Works Section */}
      <section className="cp-discover-section animate-section">
        <div className="cp-section-header">
          <h2 className="cp-section-title">
            <TranslatedText>Discover the Works</TranslatedText>
          </h2>
          <div className="cp-section-divider"></div>
        </div>

        <div className="cp-discover-container">
          <div className="cp-discover-gradient-left"></div>
          <div className="cp-discover-gradient-right"></div>

          <div className="cp-scroll-arrows">
            <button
              className="cp-scroll-arrow cp-scroll-left"
              onClick={() => handleScroll("left")}
              aria-label="Scroll left"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            <button
              className="cp-scroll-arrow cp-scroll-right"
              onClick={() => handleScroll("right")}
              aria-label="Scroll right"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>

          <div
            className={`cp-discover-works cp-wavy-gallery ${
              isDragging ? "dragging" : ""
            }`}
            ref={discoverWorksRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={(e) => {
              handleMouseUp();
              handleMouseLeave(e);
            }}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseEnter={handleMouseEnter}
          >
            <div className="cp-discover-inner-container">
              {collectionData.artworks.map((artwork, index) => (
                <div
                  key={artwork.id}
                  className="cp-discover-artwork-item"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    transform: `translateY(${
                      index % 2 === 0
                        ? -35 - (index % 5) * 5
                        : index % 3 === 0
                        ? -20 - (index % 4) * 8
                        : index % 5 === 0
                        ? -40 + (index % 3) * 10
                        : 20 + (index % 4) * 12
                    }px) rotate(${index % 2 === 0 ? -1 : 1}deg)`,
                    width: `${250 + (index % 5) * 18}px`,
                    height: `${320 + (index % 4) * 25}px`,
                    "--delay": `${index * 0.7}s`,
                  }}
                  onClick={() => handleArtworkSelect(index)}
                >
                  <div className="artwork-frame">
                    <div className="artwork-image-container">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="artwork-image"
                        loading={index < 8 ? "eager" : "lazy"}
                      />
                      <div className="artwork-overlay">
                        <div className="artwork-info-hover">
                          <h3 className="artwork-title-hover">
                            {artwork.title}
                          </h3>
                          <p className="artwork-artist-hover">
                            {artwork.artist}
                          </p>
                          <p className="artwork-year-hover">{artwork.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`cp-scroll-indicator ${
              !showScrollIndicator ? "hidden" : ""
            }`}
          >
            <div className="cp-scroll-text">
              <TranslatedText>Scroll or drag to explore</TranslatedText>
            </div>
            <div className="cp-scroll-arrows-indicator">
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Collection Section */}
      <section className="cp-categories-section animate-section">
        <div className="diagonal-divider top white-to-black"></div>

        <div className="cp-categories-container">
          <div className="cp-categories-header">
            <h2 className="cp-categories-title">
              <TranslatedText>Complete Collection</TranslatedText>
            </h2>
            <p className="cp-categories-description">
              <TranslatedText>
                Explore our extensive collections organized by category
              </TranslatedText>
            </p>
          </div>

          <div
            className="cp-categories-grid"
            ref={categoryGridRef}
            onMouseMove={handleCategoryMouseMove}
          >
            {collectionData.categories.map((category, index) => (
              <div
                key={category.id}
                className="cp-category-card"
                onClick={(e) => handleCategorySelect(category, e)}
                style={{
                  transform: `perspective(1000px) 
                              rotateX(${mousePosition.y * 5}deg) 
                              rotateY(${-mousePosition.x * 5}deg)
                              translateZ(10px)`,
                  transition: "transform 0.1s ease",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="cp-category-image-container">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="cp-category-image"
                    loading="lazy"
                    style={{
                      transform: `translateX(${mousePosition.x * -15}px) 
                                 translateY(${mousePosition.y * -15}px)`,
                    }}
                  />
                  <div className="cp-category-overlay"></div>
                </div>
                <h3 className="cp-category-title">{category.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <div className="diagonal-divider bottom black-to-white"></div>
      </section>

      {/* Featured Artwork Section */}
      <section
        className="cp-featured-artwork-section animate-section"
        id="featured-artwork"
      >
        <div className="cp-featured-container">
          <div className="cp-featured-left">
            <div className="cp-featured-image-container">
              <img
                src={collectionData.artworks[selectedArtwork].image}
                alt={collectionData.artworks[selectedArtwork].title}
                className="cp-featured-image"
              />
              <div className="cp-artwork-tags">
                {collectionData.artworks[selectedArtwork].tags.map(
                  (tag, index) => (
                    <span key={index} className="cp-artwork-tag">
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="cp-featured-right">
            <div className="cp-featured-details">
              <h2 className="cp-featured-title">
                {collectionData.artworks[selectedArtwork].title}
              </h2>

              <div className="cp-artwork-metadata">
                <div className="cp-metadata-item">
                  <span className="cp-metadata-label">ARTIST</span>
                  <span className="cp-metadata-value">
                    {collectionData.artworks[selectedArtwork].artist}
                  </span>
                </div>

                <div className="cp-metadata-item">
                  <span className="cp-metadata-label">YEAR</span>
                  <span className="cp-metadata-value">
                    {collectionData.artworks[selectedArtwork].year}
                  </span>
                </div>

                <div className="cp-metadata-item">
                  <span className="cp-metadata-label">LOCATION</span>
                  <span className="cp-metadata-value">
                    {collectionData.artworks[selectedArtwork].location}
                  </span>
                </div>
              </div>

              <div className="cp-artwork-description">
                <p>{collectionData.artworks[selectedArtwork].description}</p>
              </div>

              <div className="cp-artwork-location">
                <div className="cp-location-icon">
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

                <div className="cp-location-details">
                  <h4 className="cp-location-title">Access</h4>
                  <p className="cp-location-description">
                    {collectionData.artworks[selectedArtwork].location}
                  </p>
                </div>
              </div>

              <a className="cp-visit-button" href="/visit">
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

        <div className="cp-artwork-navigation">
          <button
            className="cp-nav-button cp-prev-button"
            onClick={() => navigateArtwork("prev")}
            aria-label="Previous artwork"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
          </button>

          <div className="cp-nav-indicators">
            {collectionData.artworks.map((artwork, index) => (
              <button
                key={artwork.id}
                className={`cp-nav-indicator ${
                  selectedArtwork === index ? "active" : ""
                }`}
                onClick={() => setSelectedArtwork(index)}
                aria-label={`View ${artwork.title}`}
              ></button>
            ))}
          </div>

          <button
            className="cp-nav-button cp-next-button"
            onClick={() => navigateArtwork("next")}
            aria-label="Next artwork"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div className="diagonal-divider bottom white-to-black"></div>
      </section>

      {/* Immersive Collection Highlights Section */}
      <section className="cp-highlights-section animate-section">
        <div className="diagonal-divider top white-to-black"></div>

        <div className="cp-highlights-container">
          <h2 className="cp-highlights-title">
            <TranslatedText>Immersive Collection Highlights</TranslatedText>
          </h2>
          <p className="cp-highlights-description">
            <TranslatedText>
              Explore our most significant artworks through immersive videos and
              detailed imagery
            </TranslatedText>
          </p>

          <div className="cp-highlights-grid">
            {collectionData.highlights.map((highlight) => (
              <div
                key={highlight.id}
                className={`cp-highlight-item ${highlight.type}-item`}
                onClick={() =>
                  highlight.type === "video"
                    ? openVideoModal(highlight)
                    : openArtworkDetail(highlight)
                }
                data-highlight-id={highlight.id}
              >
                <div className="cp-highlight-thumbnail">
                  <img
                    src={highlight.image}
                    alt={highlight.title}
                    className="cp-highlight-img"
                    loading="lazy"
                  />

                  {highlight.type === "video" && (
                    <div className="cp-play-button">
                      <svg viewBox="0 0 100 100" className="cp-play-icon">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          className="cp-play-circle"
                        ></circle>
                        <polygon
                          points="40,30 70,50 40,70"
                          className="cp-play-triangle"
                        ></polygon>
                      </svg>
                      <span className="cp-video-indicator">WATCH VIDEO</span>
                    </div>
                  )}

                  <div className="cp-highlight-gradient"></div>
                  <span className="cp-highlight-category">
                    {highlight.category}
                  </span>
                </div>

                <div className="cp-highlight-content">
                  <h3 className="cp-highlight-title">{highlight.title}</h3>
                  <p className="cp-highlight-type">
                    {highlight.type === "video" ? (
                      <>
                        <span className="cp-video-icon">
                          <svg viewBox="0 0 24 24" width="16" height="16">
                            <path d="M8 5v14l11-7z" fill="currentColor"></path>
                          </svg>
                        </span>
                        <span className="cp-video-tag">VIDEO</span>
                      </>
                    ) : (
                      <span className="cp-image-tag">GALLERY</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="diagonal-divider bottom black-to-white"></div>
      </section>

      {/* Artwork Category Modal */}
      {artworkModalOpen && modalContent && modalContent.type === "category" && (
        <div className="cp-modal cp-category-modal" onClick={closeModal}>
          <div
            className="cp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cp-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            {/* Enhanced Category Hero Section */}
            <div
              className="cp-category-hero"
              style={{ backgroundImage: `url(${modalContent.category.image})` }}
            >
              <div className="cp-category-hero-overlay"></div>
              <div className="cp-category-hero-content">
                <button className="cp-back-button" onClick={closeModal}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
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
                </button>

                <h2 className="cp-category-hero-title">
                  {modalContent.category.title}
                </h2>
                <p className="cp-category-hero-description">
                  <TranslatedText>
                    Discover masterpieces of{" "}
                    {modalContent.category.title.toLowerCase()} from ancient to
                    modern times
                  </TranslatedText>
                </p>
              </div>
            </div>

            {/* Category Artworks Section */}
            <div className="cp-category-artworks-section">
              <div className="cp-category-artworks-container">
                <div className="cp-category-artworks-header">
                  <h3 className="cp-category-artworks-title">
                    <TranslatedText>Browse Collection</TranslatedText>
                  </h3>
                  <p className="cp-category-artworks-count">
                    <span>{modalContent.artworks.length}</span>{" "}
                    <TranslatedText>items</TranslatedText>
                  </p>
                </div>

                <div className="cp-category-artworks-grid">
                  {modalContent.artworks.map((artwork, index) => (
                    <div
                      key={artwork.id}
                      className="cp-category-artwork-card"
                      style={{ "--index": index }}
                      onClick={() => openArtworkDetail(artwork)}
                    >
                      <div className="cp-category-artwork-image-container">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          loading="lazy"
                        />
                        <div className="cp-category-artwork-overlay"></div>
                      </div>
                      <div className="cp-category-artwork-info">
                        <h3 className="cp-category-artwork-title">
                          {artwork.title}
                        </h3>
                        <p className="cp-category-artwork-artist">
                          {artwork.artist}
                        </p>
                        <p className="cp-category-artwork-year">
                          {artwork.year}
                        </p>
                        <div className="cp-category-artwork-tags">
                          {artwork.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="cp-category-artwork-tag"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Artwork Detail Modal */}
      {artworkModalOpen && modalContent && modalContent.type !== "category" && (
        <div className="cp-modal cp-artwork-modal" onClick={closeModal}>
          <div
            className="cp-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cp-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            <div className="cp-artwork-modal-body">
              <div className="cp-artwork-modal-image-container">
                <img
                  src={modalContent.image}
                  alt={modalContent.title}
                  className="cp-artwork-modal-image"
                />

                <div className="cp-artwork-modal-actions">
                  <button
                    className="cp-artwork-action-button cp-artwork-zoom"
                    title="Zoom"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>

                  <button
                    className="cp-artwork-action-button"
                    onClick={() => handleDownload(modalContent)}
                    title="Download"
                  >
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path
                        d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>

              <div className="cp-artwork-modal-details">
                <h3 className="cp-artwork-modal-title">{modalContent.title}</h3>

                <div className="cp-artwork-modal-metadata">
                  <div className="cp-artwork-modal-artist">
                    <span className="cp-metadata-label">
                      <TranslatedText>Artist</TranslatedText>:
                    </span>
                    <span className="cp-metadata-value">
                      {modalContent.artist}
                    </span>
                  </div>

                  <div className="cp-artwork-modal-year">
                    <span className="cp-metadata-label">
                      <TranslatedText>Year</TranslatedText>:
                    </span>
                    <span className="cp-metadata-value">
                      {modalContent.year}
                    </span>
                  </div>

                  <div className="cp-artwork-modal-location">
                    <span className="cp-metadata-label">
                      <TranslatedText>Location</TranslatedText>:
                    </span>
                    <span className="cp-metadata-value">
                      {modalContent.location}
                    </span>
                  </div>
                </div>

                <div className="cp-artwork-modal-tags">
                  {modalContent.tags &&
                    modalContent.tags.map((tag, index) => (
                      <span key={index} className="cp-artwork-modal-tag">
                        {tag}
                      </span>
                    ))}
                </div>

                <div className="cp-artwork-modal-description">
                  <p>{modalContent.description}</p>
                </div>

                <div className="cp-artwork-modal-visit">
                  <div className="cp-location-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
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

                  <div className="cp-artwork-modal-visit-info">
                    <h4 className="cp-visit-title">
                      <TranslatedText>Where to Find</TranslatedText>
                    </h4>
                    <p className="cp-visit-description">
                      {modalContent.location}
                    </p>
                  </div>
                </div>

                <a href="/visit" className="cp-artwork-modal-cta">
                  <TranslatedText>Plan Your Visit</TranslatedText>
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

      {/* Enhanced Video Modal with YouTube embedding */}
      {videoModalOpen && modalContent && (
        <div
          className={`cp-modal cp-video-modal ${
            videoModalClosing ? "closing" : ""
          }`}
          onClick={handleModalBackdropClick}
        >
          <div
            className="cp-modal-content cp-video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="cp-modal-close" onClick={closeModal}>
              <svg viewBox="0 0 24 24" width="24" height="24">
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </svg>
            </button>

            {/* Artistic Decorative Elements */}
            <div className="cp-video-decorative-element top-left"></div>
            <div className="cp-video-decorative-element bottom-right"></div>
            <div className="cp-video-decorative-element center"></div>

            <div className="cp-modal-video">
              <div className="cp-video-container">
                {/* Loading indicator */}
                <div className="cp-video-loading">
                  <div className="cp-video-loading-circle"></div>
                </div>

                {/* YouTube iframe */}
                <iframe
                  className="cp-youtube-frame"
                  src={`https://www.youtube.com/embed/${modalContent.youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
                  title={modalContent.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="cp-modal-video-details">
                <div className="cp-modal-video-header">
                  <h3 className="cp-modal-video-title">{modalContent.title}</h3>
                  <span className="cp-modal-video-category">
                    {modalContent.category}
                  </span>
                </div>
                <p className="cp-modal-video-description">
                  {modalContent.description}
                </p>

                {/* Related Videos Section */}
                <div className="cp-video-related">
                  <h4 className="cp-video-related-title">
                    <TranslatedText>Related Videos</TranslatedText>
                  </h4>
                  <div className="cp-video-related-items">
                    {collectionData.highlights
                      .filter(
                        (item) =>
                          item.id !== modalContent.id && item.type === "video"
                      )
                      .slice(0, 5)
                      .map((item) => (
                        <div
                          key={item.id}
                          className="cp-video-related-item"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalContent(item);
                          }}
                        >
                          <img src={item.image} alt={item.title} />
                          <p className="cp-video-related-item-title">
                            {item.title}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
