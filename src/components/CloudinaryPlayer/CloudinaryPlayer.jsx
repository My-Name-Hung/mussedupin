import React from "react";

const CloudinaryPlayer = ({
  cloudName,
  publicId,
  profile = "cld-looping",
  width = "100%",
  height = "100%",
}) => {
  const url = `https://player.cloudinary.com/embed/?cloud_name=${cloudName}&public_id=${encodeURIComponent(
    publicId
  )}&profile=${profile}`;
  return (
    <iframe
      title="Cloudinary Video Player"
      src={url}
      width={width}
      height={height}
      allow="autoplay; fullscreen"
      allowFullScreen
      frameBorder="0"
      style={{ border: "none", width, height }}
    />
  );
};

export default CloudinaryPlayer;
