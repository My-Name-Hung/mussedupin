import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import ExhibitionDetail from "./components/Exhibitions/ExhibitionDetail";
import Exhibitions from "./components/Exhibitions/Exhibitions";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import TranslatedText from "./components/TranslatedText";
import PrepareVisit from "./components/VisitPage/PrepareVisit/PrepareVisit";
import Visit from "./components/VisitPage/Visit/Visit";
import VisitInfo from "./components/VisitPage/Visit/VisitInfo";
import { TranslationProvider } from "./contexts/TranslationContext";
import "./index.css";
import AboutPage from "./pages/About/AboutPage";
import CategoryPage from "./pages/Collection/CategoryPage";
import CollectionPage from "./pages/Collection/CollectionPage";
import Copyrights from "./pages/Footer/Copyrights/Copyrights";
import LegalNotice from "./pages/Footer/LegalNotice/LegalNotice";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy/PrivacyPolicy";
import DuPinPlus from "./pages/Home/DuPinPlus/DuPinPlus";
// import ExplorePage from "./pages/Home/ExplorePage/ExplorePage";
import LifeAtMuseumPage from "./pages/Museum/LifeAtMuseumPage";
import NewsDetailPage from "./pages/Museum/NewsDetailPage";
import NotFound from "./pages/NotFound";
import SearchResults from "./pages/SearchResults";
import SupportPage from "./pages/Support/SupportPage";
import MuseumMapPage from "./pages/Visit/MuseumMapPage";
import TrailExperiencePage from "./pages/Visit/TrailExperiencePage";
import VisitorRules from "./pages/Visit/VisitorRules";
import VisitorTrailDetailPage from "./pages/Visit/VisitorTrailDetailPage";
import VisitorTrailsPage from "./pages/Visit/VisitorTrailsPage";

// Trang chính của ứng dụng
const HomePage = () => (
  <>
    <div className="hero-section">
      <h1>
        <TranslatedText>Welcome to the Art Museum</TranslatedText>
      </h1>
    </div>
    <div className="content-section">
      <div className="card">
        <h2>
          <TranslatedText>VISIT</TranslatedText>
        </h2>
        <p>
          <TranslatedText>Visit Page</TranslatedText>
        </p>
        <button>
          <TranslatedText>SEE MORE</TranslatedText>
        </button>
      </div>
      <div className="card">
        <h2>
          <TranslatedText>EXHIBITIONS AND EVENTS</TranslatedText>
        </h2>
        <p>
          <TranslatedText>Exhibitions and Events Page</TranslatedText>
        </p>
        <button>
          <TranslatedText>SEE MORE</TranslatedText>
        </button>
      </div>
      <div className="card">
        <h2>
          <TranslatedText>EXPLORE</TranslatedText>
        </h2>
        <p>
          <TranslatedText>Explore Page</TranslatedText>
        </p>
        <button>
          <TranslatedText>SEE MORE</TranslatedText>
        </button>
      </div>
    </div>
  </>
);

// Trang Tham quan
const VisitPage = () => (
  <div className="page-container">
    <h1>
      <TranslatedText>VISIT</TranslatedText>
    </h1>
    <p>
      <TranslatedText>This is the Visit page content</TranslatedText>
    </p>
  </div>
);

// Trang Vé
const TicketsPage = () => (
  <div className="page-container">
    <h1>
      <TranslatedText>Tickets</TranslatedText>
    </h1>
    <p>
      <TranslatedText>This is the Tickets page content</TranslatedText>
    </p>
  </div>
);

// Trang Cửa hàng Trực tuyến
const BoutiquePage = () => (
  <div className="page-container">
    <h1>
      <TranslatedText>Online Boutique Shop</TranslatedText>
    </h1>
    <p>
      <TranslatedText>This is the Online Boutique page content</TranslatedText>
    </p>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading of resources
    const loadResources = async () => {
      const totalSteps = 100;
      const stepTime = 30; // Time per step in milliseconds

      for (let i = 0; i <= totalSteps; i++) {
        setProgress(i);
        await new Promise((resolve) => setTimeout(resolve, stepTime));
      }

      // Add a small delay at 100% before hiding loading screen
      await new Promise((resolve) => setTimeout(resolve, 500));
      setIsLoading(false);
    };

    loadResources();

    // Preload images and other resources
    const preloadImages = async () => {
      const imageUrls = [
        // Add your image URLs here
      ];

      const loadImage = (url) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = resolve;
          img.onerror = reject;
        });
      };

      try {
        await Promise.all(imageUrls.map((url) => loadImage(url)));
      } catch (error) {
        console.error("Error preloading images:", error);
      }
    };

    preloadImages();
  }, []);

  if (isLoading) {
    return <Loading progress={progress} />;
  }

  return (
    <TranslationProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/visit" element={<Visit />} />
              <Route path="/visit-info" element={<VisitInfo />} />
              <Route path="/prepare-visit" element={<PrepareVisit />} />
              <Route path="/exhibitions" element={<Exhibitions />} />
              {/* <Route path="/explore" element={<ExplorePage />} /> */}
              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/boutique" element={<BoutiquePage />} />
              <Route path="/dupinplus" element={<DuPinPlus />} />
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/copyrights" element={<Copyrights />} />
              <Route path="/visitor-rules" element={<VisitorRules />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/search-results" element={<SearchResults />} />
              <Route path="/collection" element={<CollectionPage />} />
              <Route
                path="/life-at-the-museum"
                element={<LifeAtMuseumPage />}
              />
              <Route path="/visitor-trails" element={<VisitorTrailsPage />} />
              <Route
                path="/visitor-trails/:id"
                element={<VisitorTrailDetailPage />}
              />
              <Route
                path="/visitor-trails/:trailId/experience"
                element={<TrailExperiencePage />}
              />
              <Route
                path="/visitor-trails/:trailId/experience/:artworkId"
                element={<TrailExperiencePage />}
              />
              <Route
                path="/life-at-the-museum/:slug"
                element={<NewsDetailPage />}
              />
              <Route
                path="/collection/category/:id/:title"
                element={<CategoryPage />}
              />
              <Route
                path="/exhibition-details/:id"
                element={<ExhibitionDetail />}
              />
              <Route
                path="/guided-tour-details/:id"
                element={<ExhibitionDetail />}
              />
              <Route path="/past-exhibitions" element={<NotFound />} />
              <Route path="/past-guided-tours" element={<NotFound />} />
              <Route path="/not-found" element={<NotFound />} />
              <Route path="/museum-map" element={<MuseumMapPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </TranslationProvider>
  );
}

export default App;
