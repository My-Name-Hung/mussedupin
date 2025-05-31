import React, { useCallback, useEffect, useRef, useState } from "react";
import { getAssetUrl } from "../../utils/getAssetUrl";

const OptimizedVideo = ({
  src,
  poster,
  className = "",
  width,
  height,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
  priority = false,
  onLoadStart,
  onCanPlay,
  onError,
  style = {},
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [showPlayButton, setShowPlayButton] = useState(!autoPlay);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

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
        rootMargin: "100px 0px", // Load video earlier than images
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Video event handlers
  const handleLoadStart = useCallback(() => {
    setIsLoading(true);
    onLoadStart?.();
  }, [onLoadStart]);

  const handleCanPlay = useCallback(() => {
    setIsLoaded(true);
    setIsLoading(false);
    onCanPlay?.();
  }, [onCanPlay]);

  const handleError = useCallback(() => {
    setIsError(true);
    setIsLoading(false);
    onError?.();
  }, [onError]);

  const handlePlayClick = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.play();
      setShowPlayButton(false);
    }
  }, []);

  // Preload metadata when in view
  useEffect(() => {
    if (isInView && videoRef.current && !isLoaded && !isLoading) {
      videoRef.current.load();
    }
  }, [isInView, isLoaded, isLoading]);

  return (
    <div
      ref={containerRef}
      className={`optimized-video-container ${className}`}
      style={{
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#000",
        ...style,
        ...(width && height && { aspectRatio: `${width} / ${height}` }),
      }}
      {...props}
    >
      {/* Poster image placeholder */}
      {poster && !isLoaded && (
        <div
          className="video-poster"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${getAssetUrl(poster)})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            transition: "opacity 0.3s ease",
            opacity: isLoaded ? 0 : 1,
          }}
        />
      )}

      {/* Video element */}
      {(priority || isInView) && (
        <video
          ref={videoRef}
          width={width}
          height={height}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline={playsInline}
          preload="metadata"
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.5s ease",
            opacity: isLoaded ? 1 : 0,
            transform: "translateZ(0)", // Hardware acceleration
          }}
        >
          {/* Multiple source formats for better compatibility */}
          <source
            src={getAssetUrl(src.replace(/\.mp4$/, ".webm"))}
            type="video/webm"
          />
          <source src={getAssetUrl(src)} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Play button overlay */}
      {showPlayButton && !autoPlay && (priority || isInView) && (
        <button
          className="video-play-button"
          onClick={handlePlayClick}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            border: "none",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "24px",
            color: "#333",
            transition: "all 0.3s ease",
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 1)";
            e.target.style.transform = "translate(-50%, -50%) scale(1.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
            e.target.style.transform = "translate(-50%, -50%) scale(1)";
          }}
        >
          ▶
        </button>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div
          className="video-loading"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "50px",
            height: "50px",
            border: "4px solid rgba(255, 255, 255, 0.3)",
            borderTop: "4px solid #fff",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            zIndex: 5,
          }}
        />
      )}

      {/* Error state */}
      {isError && (
        <div
          className="video-error"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "#fff",
            fontSize: "16px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "8px",
          }}
        >
          ⚠️ Video không thể tải
          <br />
          <small>Vui lòng thử lại sau</small>
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

export default OptimizedVideo;
