import React, { createContext, useContext, useEffect, useState } from "react";
import {
  changeLanguage as changeLang,
  getCurrentLanguage,
  SUPPORTED_LANGUAGES,
} from "../utils/translate";
import { translatePage } from "../utils/translatePage";

// Import standard styles for all languages
import "../styles/vietnamese.css";

// Tạo context với giá trị mặc định
const TranslationContext = createContext({
  currentLanguage: "vi",
  changeLanguage: () => {},
  supportedLanguages: [
    { code: "vi", name: "Tiếng Việt" },
    { code: "en", name: "English" },
  ],
  isTranslating: false,
  translationProgress: 0,
});

// Provider component để cung cấp giá trị context cho các component con
export const TranslationProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("vi");
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationProgress, setTranslationProgress] = useState(0);

  // Khởi tạo trạng thái ban đầu
  useEffect(() => {
    const initialLanguage = getCurrentLanguage() || "vi";
    setCurrentLanguage(initialLanguage);

    // Dịch toàn bộ trang ngay khi tải, nếu ngôn ngữ hiện tại khác với ngôn ngữ mặc định (tiếng Anh)
    // và không phải lần đầu load (đã có ngôn ngữ được lưu trong localStorage)
    if (initialLanguage !== "vi" && localStorage.getItem("selectedLanguage")) {
      translateWholePageTo(initialLanguage);
    }
  }, []);

  // Update html lang attribute when language changes
  useEffect(() => {
    const htmlRoot = document.documentElement;
    htmlRoot.setAttribute("lang", currentLanguage);
  }, [currentLanguage]);

  // Hàm để dịch toàn bộ trang
  const translateWholePageTo = async (language) => {
    setIsTranslating(true);
    setTranslationProgress(0);

    try {
      await translatePage(language, (progress) => {
        setTranslationProgress(progress);
      });
    } catch (error) {
      console.error("Error translating page:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  // Dịch toàn bộ trang khi ngôn ngữ thay đổi
  useEffect(() => {
    // Không cần dịch nếu ngôn ngữ là mặc định (tiếng Anh)
    if (currentLanguage === "vi") return;

    // Bắt đầu dịch
    translateWholePageTo(currentLanguage);
  }, [currentLanguage]);

  // Hàm thay đổi ngôn ngữ
  const changeLanguage = (langCode) => {
    if (langCode !== currentLanguage) {
      // Cập nhật localStorage thông qua hàm từ utils
      changeLang(langCode);

      // Nếu chuyển sang tiếng Việt (ngôn ngữ mặc định), cần tải lại nội dung gốc
      if (langCode === "vi") {
        // Bạn có thể lựa chọn tải lại trang trong trường hợp này
        // hoặc xử lý đặc biệt để hiển thị nội dung tiếng Anh ban đầu
        window.location.reload();
        return;
      }

      // Xử lý đồng nhất cho tất cả ngôn ngữ không phải tiếng Anh
      // Cập nhật state để trigger useEffect và bắt đầu dịch
      setCurrentLanguage(langCode);
    }
  };

  const value = {
    currentLanguage,
    changeLanguage,
    supportedLanguages: Object.entries(SUPPORTED_LANGUAGES).map(
      ([code, name]) => ({
        code,
        name,
      })
    ),
    isTranslating,
    translationProgress,
  };

  return (
    <TranslationContext.Provider value={value}>
      {children}
      {isTranslating && (
        <div className="translation-progress-overlay">
          <div className="translation-progress-container">
            <div
              className="translation-progress-bar"
              style={{ width: `${translationProgress * 100}%` }}
            ></div>
            <div className="translation-progress-text">
              Translating... {Math.round(translationProgress * 100)}%
            </div>
          </div>
        </div>
      )}
    </TranslationContext.Provider>
  );
};

// Hook để sử dụng context dễ dàng hơn
export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};

export default TranslationContext;
