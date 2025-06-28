import React, { createContext, useContext, useEffect, useState } from "react";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLang, setCurrentLang] = useState("vi");
  const [customTranslations, setCustomTranslations] = useState({});

  // Listen for language changes from GTranslate
  useEffect(() => {
    const checkLanguage = () => {
      const htmlLang = document.documentElement.lang;
      setCurrentLang(htmlLang === "en" ? "en" : "vi");
    };

    // Initial check
    checkLanguage();

    // Create observer to watch for changes in html lang attribute
    const observer = new MutationObserver(checkLanguage);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => observer.disconnect();
  }, []);

  // Register custom translations
  const registerTranslations = (key, translations) => {
    setCustomTranslations((prev) => ({
      ...prev,
      [key]: translations,
    }));
  };

  // Get translation
  const getTranslation = (key, path) => {
    if (customTranslations[key] && customTranslations[key][currentLang]) {
      return customTranslations[key][currentLang][path] || "";
    }
    return "";
  };

  return (
    <TranslationContext.Provider
      value={{
        currentLang,
        registerTranslations,
        getTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
