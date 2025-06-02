import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AppLoader from "./components/AppLoader/AppLoader";
import ExhibitionDetail from "./components/Exhibitions/ExhibitionDetail";
import Exhibitions from "./components/Exhibitions/Exhibitions";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import "./index.css";
import AboutPage from "./pages/About/AboutPage";
import CategoryPage from "./pages/Collection/CategoryPage";
import CollectionPage from "./pages/Collection/CollectionPage";
import Copyrights from "./pages/Footer/Copyrights/Copyrights";
import LegalNotice from "./pages/Footer/LegalNotice/LegalNotice";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy/PrivacyPolicy";
import DuPinPlus from "./pages/Home/DuPinPlus/DuPinPlus";
// import ExplorePage from "./pages/Home/ExplorePage/ExplorePage";
import Visit from "../src/components/VisitPage/Visit/Visit";
import VisitInfo from "../src/components/VisitPage/Visit/VisitInfo";
import ArtStay from "./pages/ArtStay/ArtStay";
import LifeAtMuseumPage from "./pages/Museum/LifeAtMuseumPage";
import NewsDetailPage from "./pages/Museum/NewsDetailPage";
import NotFound from "./pages/NotFound";
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
      <h1>Welcome to the Art Museum</h1>
    </div>
    <div className="content-section">
      <div className="card">
        <h2>VISIT</h2>
        <p>Visit Page</p>
        <button>SEE MORE</button>
      </div>
      <div className="card">
        <h2>EXHIBITIONS AND EVENTS</h2>
        <p>Exhibitions and Events Page</p>
        <button>SEE MORE</button>
      </div>
      <div className="card">
        <h2>EXPLORE</h2>
        <p>Explore Page</p>
        <button>SEE MORE</button>
      </div>
    </div>
  </>
);

// Trang Tham quan
const VisitPage = () => (
  <div className="page-container">
    <h1>VISIT</h1>
    <p>This is the Visit page content</p>
  </div>
);

// Trang Vé
const TicketsPage = () => (
  <div className="page-container">
    <h1>Tickets</h1>
    <p>This is the Tickets page content</p>
  </div>
);

// Trang Cửa hàng Trực tuyến
const BoutiquePage = () => (
  <div className="page-container">
    <h1>Online Boutique Shop</h1>
    <p>This is the Online Boutique page content</p>
  </div>
);

function App() {
  return (
    <AppLoader>
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

              <Route path="/exhibitions" element={<Exhibitions />} />

              <Route path="/tickets" element={<TicketsPage />} />
              <Route path="/boutique" element={<BoutiquePage />} />
              <Route path="/dupinplus" element={<DuPinPlus />} />
              <Route path="/legal-notice" element={<LegalNotice />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/copyrights" element={<Copyrights />} />
              <Route path="/visitor-rules" element={<VisitorRules />} />
              <Route path="/support" element={<SupportPage />} />
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
                path="/trail-experience/:trailId"
                element={<TrailExperiencePage />}
              />
              <Route path="/museum-map" element={<MuseumMapPage />} />
              <Route
                path="/exhibition-details/:id"
                element={<ExhibitionDetail />}
              />
              <Route path="/news/:id" element={<NewsDetailPage />} />
              <Route path="/collection/:category" element={<CategoryPage />} />
              <Route
                path="/life-at-the-museum/:slug"
                element={<NewsDetailPage />}
              />
              <Route path="/luu-tru-nghe-thuat" element={<ArtStay />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </AppLoader>
  );
}

export default App;
