// Centralized image imports for Highlights section
import couture from "./Highlights/couture.jpg";
import mamluks from "./Highlights/mamluks.jpg";

// Organized highlight data with consistent structure
export const highlightsData = [
  {
    id: 1,
    title: "Mamluks",
    description:
      "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective. From 30 April to 28 July 2025",
    image: mamluks,
    alt: "Golden decorated vessel from Mamluk period",
    tag: "Exhibition",
    link: "/exhibitions/mamluks",
    featured: true,
    size: "large",
  },
  {
    id: 2,
    title: "Du Pin Couture. Art and fashion: statement pieces",
    description:
      "A new perspective on decorative arts through the prism of contemporary fashion design. From 24 January to 21 July 2025",
    image: couture,
    alt: "Fashion exhibit featuring historical and contemporary pieces",
    tag: "Exhibition",
    link: "/exhibitions/couture",
    featured: false,
    size: "medium",
  },
  // ... existing code ...
];

export default highlightsData;
