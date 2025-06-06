import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Visit from "../src/components/VisitPage/Visit/Visit";
import VisitInfo from "../src/components/VisitPage/Visit/VisitInfo";
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
import ArtStay from "./pages/ArtStay/ArtStay";
import CategoryPage from "./pages/Collection/CategoryPage";
import CollectionPage from "./pages/Collection/CollectionPage";
import Copyrights from "./pages/Footer/Copyrights/Copyrights";
import LegalNotice from "./pages/Footer/LegalNotice/LegalNotice";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy/PrivacyPolicy";
import DuPinPlus from "./pages/Home/DuPinPlus/DuPinPlus";
import LifeAtMuseumPage from "./pages/Museum/LifeAtMuseumPage";
import NewsDetailPage from "./pages/Museum/NewsDetailPage";
import NotFound from "./pages/NotFound";
import SupportPage from "./pages/Support/SupportPage";
import TheAcoustic from "./pages/TheAcoustic/TheAcoustic";
import TheAcousticDetail from "./pages/TheAcoustic/TheAcousticDetail";
import ThePlace from "./pages/ThePlace/ThePlace";
import ThePlaceDetail from "./pages/ThePlace/ThePlaceDetail";
import TheTaste from "./pages/TheTaste/TheTaste";
import TheTasteDetail from "./pages/TheTaste/TheTasteDetail";
import MuseumMapPage from "./pages/Visit/MuseumMapPage";
import TrailExperiencePage from "./pages/Visit/TrailExperiencePage";
import VisitorRules from "./pages/Visit/VisitorRules";
import VisitorTrailDetailPage from "./pages/Visit/VisitorTrailDetailPage";
import VisitorTrailsPage from "./pages/Visit/VisitorTrailsPage";
import NonResidentialPackages from "./pages/VisitPackages/NonResidentialPackages";
import PackageDetail from "./pages/VisitPackages/PackageDetail";
import RegularPackages from "./pages/VisitPackages/RegularPackages";
import ResidentialPackages from "./pages/VisitPackages/ResidentialPackages";

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
              <Route path="/the-place" element={<ThePlace />} />
              <Route path="/the-place/:id" element={<ThePlaceDetail />} />
              <Route path="/the-taste" element={<TheTaste />} />
              <Route path="/the-taste/:id" element={<TheTasteDetail />} />
              <Route path="/the-acoustic" element={<TheAcoustic />} />
              <Route path="/the-acoustic/:id" element={<TheAcousticDetail />} />
              <Route
                path="/visit/non-residential"
                element={<NonResidentialPackages />}
              />
              <Route
                path="/visit/residential"
                element={<ResidentialPackages />}
              />
              <Route path="/visit/regular" element={<RegularPackages />} />
              <Route path="/visit/package/:id" element={<PackageDetail />} />
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
