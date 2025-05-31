import React, { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import TranslatedText from "./components/TranslatedText";
import { TranslationProvider } from "./contexts/TranslationContext";
import usePreloadAssets from "./hooks/usePreloadAssets";
import "./index.css";

// Lazy load components
const Home = lazy(() => import("./components/Home/Home"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const Visit = lazy(() => import("./components/VisitPage/Visit/Visit"));
const VisitInfo = lazy(() => import("./components/VisitPage/Visit/VisitInfo"));

const Exhibitions = lazy(() => import("./components/Exhibitions/Exhibitions"));
const ExhibitionDetail = lazy(() =>
  import("./components/Exhibitions/ExhibitionDetail")
);
const CommingSoon = lazy(() => import("./components/CommingSoon"));
const DuPinPlus = lazy(() => import("./pages/Home/DuPinPlus/DuPinPlus"));
const LegalNotice = lazy(() =>
  import("./pages/Footer/LegalNotice/LegalNotice")
);
const PrivacyPolicy = lazy(() =>
  import("./pages/Footer/PrivacyPolicy/PrivacyPolicy")
);
const Copyrights = lazy(() => import("./pages/Footer/Copyrights/Copyrights"));
const VisitorRules = lazy(() => import("./pages/Visit/VisitorRules"));
const SupportPage = lazy(() => import("./pages/Support/SupportPage"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const CollectionPage = lazy(() => import("./pages/Collection/CollectionPage"));
const LifeAtMuseumPage = lazy(() => import("./pages/Museum/LifeAtMuseumPage"));
const NewsDetailPage = lazy(() => import("./pages/Museum/NewsDetailPage"));
const MuseumMapPage = lazy(() => import("./pages/Visit/MuseumMapPage"));
const TrailExperiencePage = lazy(() =>
  import("./pages/Visit/TrailExperiencePage")
);
const VisitorTrailDetailPage = lazy(() =>
  import("./pages/Visit/VisitorTrailDetailPage")
);
const VisitorTrailsPage = lazy(() => import("./pages/Visit/VisitorTrailsPage"));
const CategoryPage = lazy(() => import("./pages/Collection/CategoryPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

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

function App() {
  // Preload hero and background assets
  const backgroundAssets = Object.values(
    import.meta.glob("./assets/Background/*.{jpg,jpeg,png,webp,mp4}", {
      eager: true,
    })
  ).map((m) => m.default || m);
  const heroAssets = Object.values(
    import.meta.glob("./assets/Home/Hero/*.{jpg,jpeg,png,webp,mp4}", {
      eager: true,
    })
  ).map((m) => m.default || m);
  const firstScreenAssets = [...backgroundAssets, ...heroAssets].filter(
    Boolean
  );

  const { progress, done } = usePreloadAssets(firstScreenAssets);

  if (!done) {
    return <Loading progress={progress} />;
  }

  return (
    <TranslationProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/visit" element={<Visit />} />
                <Route path="/visit-info" element={<VisitInfo />} />

                <Route path="/exhibitions" element={<Exhibitions />} />
                <Route path="/tickets" element={<CommingSoon />} />
                <Route path="/boutique" element={<CommingSoon />} />
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
            </Suspense>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </TranslationProvider>
  );
}

export default App;
