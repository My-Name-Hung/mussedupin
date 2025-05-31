import React, { Suspense, lazy, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import CriticalResourceLoader from "./components/CriticalResourceLoader/CriticalResourceLoader";
import Footer from "./components/Footer/Footer";
import Loading from "./components/Loading/Loading";
import Navbar from "./components/Navbar/Navbar";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("./pages/Home/HomePage"));
const AboutPage = lazy(() => import("./pages/About/AboutPage"));
const CollectionPage = lazy(() => import("./pages/Collection/CollectionPage"));
const CategoryPage = lazy(() => import("./pages/Collection/CategoryPage"));
const ExhibitionsPage = lazy(() =>
  import("./pages/Exhibitions/ExhibitionsPage")
);
const ExhibitionDetail = lazy(() =>
  import("./components/Exhibitions/ExhibitionDetail")
);
const VisitPage = lazy(() => import("./pages/Visit/VisitPage"));
const VisitInfoPage = lazy(() => import("./pages/Visit/VisitInfoPage"));
const VisitorTrailsPage = lazy(() => import("./pages/Visit/VisitorTrailsPage"));
const TrailExperiencePage = lazy(() =>
  import("./pages/Visit/TrailExperiencePage")
);
const MuseumMapPage = lazy(() => import("./pages/Visit/MuseumMapPage"));
const LifeAtMuseumPage = lazy(() =>
  import("./pages/LifeAtMuseum/LifeAtMuseumPage")
);
const NewsDetailPage = lazy(() => import("./pages/NewsDetail/NewsDetailPage"));
const SupportPage = lazy(() => import("./pages/Support/SupportPage"));
const LegalNotice = lazy(() => import("./pages/LegalNotice/LegalNotice"));
const Copyrights = lazy(() => import("./pages/Copyrights/Copyrights"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy/PrivacyPolicy"));
const VisitorRules = lazy(() => import("./pages/VisitorRules/VisitorRules"));
const VisitorTrailDetailPage = lazy(() =>
  import("./pages/Visit/VisitorTrailDetailPage")
);

// Service Worker registration
const registerServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js");
        console.log(
          "Service Worker registered successfully:",
          registration.scope
        );

        // Handle service worker updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              console.log("New content available, page will refresh...");
              window.location.reload();
            }
          });
        });
      } catch (error) {
        console.error("Service Worker registration failed:", error);
      }
    });
  }
};

function App() {
  useEffect(() => {
    registerServiceWorker();

    // Add performance observer for Core Web Vitals
    if ("PerformanceObserver" in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`${entry.name}: ${entry.value}ms`);

          // Send to analytics if needed
          if (window.gtag) {
            window.gtag("event", "web_vitals", {
              metric_name: entry.name,
              metric_value: Math.round(entry.value),
              metric_delta: Math.round(entry.delta),
            });
          }
        }
      });

      try {
        observer.observe({
          entryTypes: [
            "largest-contentful-paint",
            "first-input",
            "cumulative-layout-shift",
          ],
        });
      } catch (error) {
        console.warn("Performance Observer not supported for some metrics");
      }
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <CriticalResourceLoader />
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/collection" element={<CollectionPage />} />
            <Route path="/collection/:category" element={<CategoryPage />} />
            <Route path="/exhibitions" element={<ExhibitionsPage />} />
            <Route
              path="/exhibition-details/:id"
              element={<ExhibitionDetail />}
            />
            <Route path="/visit" element={<VisitPage />} />
            <Route path="/visit-info" element={<VisitInfoPage />} />
            <Route path="/visitor-trails" element={<VisitorTrailsPage />} />
            <Route
              path="/visitor-trails/:id"
              element={<TrailExperiencePage />}
            />
            <Route path="/museum-map" element={<MuseumMapPage />} />
            <Route path="/life-at-museum" element={<LifeAtMuseumPage />} />
            <Route path="/news/:id" element={<NewsDetailPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/copyrights" element={<Copyrights />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/visitor-rules" element={<VisitorRules />} />
            <Route
              path="/visitor-trail-detail/:id"
              element={<VisitorTrailDetailPage />}
            />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
