import React, { useEffect, useRef, useState } from "react";
import { getAssetUrl } from "../../utils/getAssetUrl";

const OptimizedImage = ({
  src,
  alt,
  className = "",
  width,
  height,
  priority = false,
  sizes = "100vw",
  loading = "lazy",
  onLoad,
  onError,
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef(null);
  const placeholderRef = useRef(null);

  // Generate responsive image URLs
  const generateSrcSet = (imageSrc) => {
    const baseName = imageSrc.replace(/\.[^/.]+$/, "");
    const extension = imageSrc.match(/\.[^/.]+$/)?.[0] || ".webp";

    return [
      `${getAssetUrl(`${baseName}_480w${extension}`)} 480w`,
      `${getAssetUrl(`${baseName}_768w${extension}`)} 768w`,
      `${getAssetUrl(`${baseName}_1024w${extension}`)} 1024w`,
      `${getAssetUrl(`${baseName}_1200w${extension}`)} 1200w`,
      `${getAssetUrl(imageSrc)} 1920w`,
    ].join(", ");
  };

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px",
      }
    );

    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setIsError(true);
    onError?.();
  };

  // Generate low quality placeholder
  const placeholderSrc = getAssetUrl(
    `${src.replace(/\.[^/.]+$/, "")}_placeholder.webp`
  );

  return (
    <div
      ref={placeholderRef}
      className={`optimized-image-container ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#f0f0f0",
        ...style,
        ...(width && height && { aspectRatio: `${width} / ${height}` }),
      }}
      {...props}
    >
      {/* Low quality placeholder */}
      {!priority && !isInView && (
        <div
          className="image-placeholder"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${placeholderSrc})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(10px)",
            transform: "scale(1.1)",
            transition: "opacity 0.3s ease",
            opacity: isLoaded ? 0 : 1,
          }}
        />
      )}

      {/* Main image */}
      {(priority || isInView) && (
        <picture>
          {/* WebP source */}
          <source
            srcSet={generateSrcSet(src.replace(/\.[^/.]+$/, ".webp"))}
            sizes={sizes}
            type="image/webp"
          />

          {/* Fallback source */}
          <source
            srcSet={generateSrcSet(src)}
            sizes={sizes}
            type="image/jpeg"
          />

          <img
            ref={imgRef}
            src={getAssetUrl(src)}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : loading}
            decoding="async"
            onLoad={handleLoad}
            onError={handleError}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.3s ease",
              opacity: isLoaded ? 1 : 0,
              transform: "translateZ(0)", // Force hardware acceleration
            }}
          />
        </picture>
      )}

      {/* Loading indicator */}
      {!isLoaded && !isError && (priority || isInView) && (
        <div
          className="image-loading"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40px",
            height: "40px",
            border: "3px solid #f3f3f3",
            borderTop: "3px solid #b38741",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
      )}

      {/* Error state */}
      {isError && (
        <div
          className="image-error"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          ⚠️ Failed to load image
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          100% {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default OptimizedImage;
