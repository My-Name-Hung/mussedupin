import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// This component will scroll to the top of the page
// whenever the URL/route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with a slight delay to ensure DOM is ready
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: "instant", // Use "instant" for immediate scroll without animation
      });
    }, 0);
  }, [pathname]); // Re-run when pathname changes

  return null; // This component doesn't render anything
}

export default ScrollToTop;
