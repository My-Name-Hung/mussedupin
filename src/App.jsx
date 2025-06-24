import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import Visit from "./components/Visit/Visit";
import "./index.css";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import Copyrights from "./pages/Footer/Copyrights/Copyrights";
import LegalNotice from "./pages/Footer/LegalNotice/LegalNotice";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy/PrivacyPolicy";
import NotFound from "./pages/NotFound";
import TicketList from "./pages/TicketList/TicketList";
import ArtRooms from "./pages/VisitPackages/ArtRooms";
import NonResidentialPackages from "./pages/VisitPackages/NonResidentialPackages";
import PackageDetail from "./pages/VisitPackages/PackageDetail";
import RegularPackages from "./pages/VisitPackages/RegularPackages";
import ResidentialPackages from "./pages/VisitPackages/ResidentialPackages";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/visit" element={<Visit />} />
            <Route
              path="/visit/non-residential"
              element={<NonResidentialPackages />}
            />
            <Route
              path="/visit/residential"
              element={<ResidentialPackages />}
            />
            <Route path="/visit/regular" element={<RegularPackages />} />
            <Route path="/visit/art-rooms" element={<ArtRooms />} />
            <Route
              path="/visit/package/:packageId"
              element={<PackageDetail />}
            />
            <Route
              path="/checkout/package/:packageId"
              element={<CheckoutPage />}
            />
            <Route path="/checkout/package" element={<TicketList />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/copyrights" element={<Copyrights />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router>
  );
}

export default App;
