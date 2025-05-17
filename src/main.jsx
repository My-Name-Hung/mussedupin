import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { TranslationProvider } from "./context/TranslationContext";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TranslationProvider>
      <App />
    </TranslationProvider>
  </StrictMode>
);
