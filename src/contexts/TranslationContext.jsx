import React, { createContext, useCallback, useContext, useState } from "react";
import { getCurrentLanguage, translateText } from "../utils/translate";

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(getCurrentLanguage());

  const translate = useCallback(
    async (text) => {
      if (!text) return "";
      try {
        const translated = await translateText(text, currentLanguage);
        return translated;
      } catch (error) {
        console.error("Translation error:", error);
        return text;
      }
    },
    [currentLanguage]
  );

  const value = {
    currentLanguage,
    setCurrentLanguage,
    translate,
  };

  return (
    <TranslationContext.Provider value={value}>
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

export default TranslationContext;
