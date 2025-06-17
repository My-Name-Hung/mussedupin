import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ScrollToTopButton from "./components/ScrollToTopButton/ScrollToTopButton";
import "./index.css";
import ArtistDetail from "./pages/Artists/ArtistDetail";
import Artists from "./pages/Artists/Artists";
import BestsellerPage from "./pages/BestsellerPage/BestsellerPage";
import CartPage from "./pages/CartPage/CartPage";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import Collaborate from "./pages/Collaborate/Collaborate";
import CollaborateDetail from "./pages/CollaborateDetail/CollaborateDetail";
import ExhibitionDetail from "./pages/ExhibitionDetail/ExhibitionDetail";
import Exhibitions from "./pages/Exhibitions/Exhibitions";
import Copyrights from "./pages/Footer/Copyrights/Copyrights";
import LegalNotice from "./pages/Footer/LegalNotice/LegalNotice";
import PrivacyPolicy from "./pages/Footer/PrivacyPolicy/PrivacyPolicy";
import NewsPage from "./pages/NewsPage/NewsPage";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import VNPayReturn from "./pages/VNPayReturn/VNPayReturn";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/vnpay-return" element={<VNPayReturn />} />
            <Route path="/legal-notice" element={<LegalNotice />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/copyrights" element={<Copyrights />} />
            <Route path="/category/:categoryId" element={<CategoryDetail />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/contents/artists" element={<Artists />} />
            <Route path="/collaborate" element={<Collaborate />} />
            <Route path="/bestseller" element={<BestsellerPage />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/contents/exhibitions" element={<Exhibitions />} />
            <Route
              path="/contents/exhibitions/:exhibitionId"
              element={<ExhibitionDetail />}
            />
            <Route
              path="/collaborate/:brandName"
              element={<CollaborateDetail />}
            />
            <Route
              path="/contents/artists/:artistName"
              element={<ArtistDetail />}
            />
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
