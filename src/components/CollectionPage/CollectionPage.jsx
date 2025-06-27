import { useCallback, useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const CollectionPage = () => {
  const [loadedImages, setLoadedImages] = useState({});
  const imageObserver = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [slideDirection, setSlideDirection] = useState(null);

  const galleryRef = useRef(null);
  const scrollTimeout = useRef(null);

  const handleImageLoad = (imageId) => {
    setLoadedImages((prev) => ({
      ...prev,
      [imageId]: true,
    }));
  };

  useEffect(() => {
    imageObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            imageObserver.current.unobserve(img);
          }
        });
      },
      {
        rootMargin: "50px 0px",
        threshold: 0.01,
      }
    );

    return () => {
      if (imageObserver.current) {
        imageObserver.current.disconnect();
      }
    };
  }, []);

  const renderHeroImage = (image, index) => (
    <div className="cp-hero-image-container">
      <div className="cp-image-shimmer" />
      <LazyLoadImage
        key={index}
        src={getImageUrl(image)}
        alt={`Hero slide ${index + 1}`}
        className={`cp-hero-image cp-image-blur-up ${
          loadedImages[`hero-${index}`] ? "loaded" : ""
        }`}
        effect="blur"
        afterLoad={() => handleImageLoad(`hero-${index}`)}
        threshold={50}
        placeholderSrc={getImageUrl(image, { width: 50, quality: 10 })}
      />
    </div>
  );

  const renderArtworkImage = (artwork, index) => (
    <div className="artwork-image-container">
      <div className="cp-image-shimmer" />
      <LazyLoadImage
        src={getImageUrl(artwork.image)}
        alt={artwork.title}
        className={`artwork-image cp-image-blur-up ${
          loadedImages[`artwork-${index}`] ? "loaded" : ""
        }`}
        effect="blur"
        afterLoad={() => handleImageLoad(`artwork-${index}`)}
        threshold={50}
        placeholderSrc={getImageUrl(artwork.image, { width: 50, quality: 10 })}
      />
    </div>
  );

  const renderCategoryCard = (category, index) => (
    <div
      key={category.id}
      className="cp-category-card"
      onClick={(e) => handleCategorySelect(category, e)}
    >
      <div className="cp-category-image-container">
        <div className="cp-image-shimmer" />
        <LazyLoadImage
          src={getImageUrl(category.image)}
          alt={category.title}
          className={`cp-category-image cp-image-blur-up ${
            loadedImages[`category-${index}`] ? "loaded" : ""
          }`}
          effect="blur"
          afterLoad={() => handleImageLoad(`category-${index}`)}
          threshold={50}
          placeholderSrc={getImageUrl(category.image, {
            width: 50,
            quality: 10,
          })}
        />
      </div>
      <h3 className="cp-category-title">{category.title}</h3>
    </div>
  );

  const scrollToItem = useCallback((index, direction) => {
    if (!galleryRef.current) return;

    setIsScrolling(true);
    setSlideDirection(direction);

    const container = galleryRef.current;
    const items = container.getElementsByClassName("cp-discover-artwork-item");

    if (items[index]) {
      // Update classes for animation
      Array.from(items).forEach((item, idx) => {
        const diff = idx - index;
        item.classList.remove("active", "prev", "next", "far");

        if (diff === 0) {
          item.classList.add("active");
        } else if (diff === -1) {
          item.classList.add("prev");
        } else if (diff === 1) {
          item.classList.add("next");
        } else {
          item.classList.add("far");
        }
      });

      // Scroll to position
      const itemWidth = items[0].offsetWidth;
      const scrollPosition = index * (itemWidth + 24);

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });

      setActiveIndex(index);

      // Reset states after animation
      setTimeout(() => {
        setIsScrolling(false);
        setSlideDirection(null);
      }, 600);
    }
  }, []);

  const handlePrev = useCallback(() => {
    if (isScrolling) return;
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToItem(newIndex, "prev");
  }, [activeIndex, isScrolling, scrollToItem]);

  const handleNext = useCallback(() => {
    if (isScrolling) return;
    if (!galleryRef.current) return;

    const items = galleryRef.current.getElementsByClassName(
      "cp-discover-artwork-item"
    );
    const newIndex = Math.min(items.length - 1, activeIndex + 1);
    scrollToItem(newIndex, "next");
  }, [activeIndex, isScrolling, scrollToItem]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!galleryRef.current) return;

    const diff = touchStart - touchEnd;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    const handleScroll = () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      scrollTimeout.current = setTimeout(() => {
        const scrollLeft = gallery.scrollLeft;
        const itemWidth = gallery.getElementsByClassName(
          "cp-discover-artwork-item"
        )[0].offsetWidth;
        const newIndex = Math.round(scrollLeft / (itemWidth + 24));

        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
          scrollToItem(newIndex);
        }
      }, 150);
    };

    gallery.addEventListener("scroll", handleScroll);
    return () => gallery.removeEventListener("scroll", handleScroll);
  }, [activeIndex, scrollToItem]);

  return (
    <div className="collection-page">
      <section className="cp-hero animate-section">
        <div className="cp-hero-slides-container">
          {collectionData.heroImages.map((image, index) => (
            <div
              key={index}
              className={`cp-hero-slide ${
                activeHeroSlide === index ? "active" : ""
              }`}
            >
              {renderHeroImage(image, index)}
            </div>
          ))}
        </div>
      </section>

      <div className="cp-discover-section">
        <div
          className={`cp-discover-works ${isScrolling ? "scrolling" : ""} ${
            slideDirection ? `sliding-${slideDirection}` : ""
          }`}
          ref={galleryRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="cp-discover-nav cp-discover-prev"
            onClick={handlePrev}
            disabled={activeIndex === 0 || isScrolling}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M15 18l-6-6 6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="cp-discover-nav cp-discover-next"
            onClick={handleNext}
            disabled={
              activeIndex === collectionData.artworks.length - 1 || isScrolling
            }
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path
                d="M9 18l6-6-6-6"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <div className="cp-discover-inner-container">
            {collectionData.artworks.map((artwork, index) => (
              <div
                key={artwork.id}
                className={`cp-discover-artwork-item ${
                  index === activeIndex
                    ? "active"
                    : index === activeIndex - 1
                    ? "prev"
                    : index === activeIndex + 1
                    ? "next"
                    : "far"
                }`}
                onClick={() => !isScrolling && scrollToItem(index)}
              >
                {renderArtworkImage(artwork, index)}
              </div>
            ))}
          </div>

          <div className="cp-discover-progress">
            {collectionData.artworks.map((_, index) => (
              <div
                key={index}
                className={`cp-discover-progress-dot ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => scrollToItem(index)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="cp-categories-grid">
        {collectionData.categories.map((category, index) =>
          renderCategoryCard(category, index)
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
