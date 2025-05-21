/**
 * Translation Strategy Overview
 * ---------------------------
 * This file implements different translation approaches based on language:
 *
 * 1. Vietnamese (vi):
 *    - Uses ONLY manually created translations for high quality
 *    - Falls back to pre-defined translations if manual translation is missing
 *    - Logs warnings when manual translations are missing to help track needed translations
 *
 * 2. Other languages (fr, es, zh-CN, etc):
 *    - Uses Google Cloud Translation API for accurate automated translation
 *    - Caches translations to improve performance
 *    - Falls back to pre-defined translations when available
 */

// API key for Google Cloud Translation
const API_KEY = "AIzaSyB7BrsRT_boHTwf2rPUNBhwJSwrvYYsQyg";

// Default language for the website
export const DEFAULT_LANGUAGE = "en";

// Supported languages and their display names
export const SUPPORTED_LANGUAGES = {
  en: "English",
  vi: "Tiếng Việt",
};

// Function to create translations and avoid duplicates
function createTranslations(translationPairs) {
  // Use a Map to avoid duplicate keys
  const translationsMap = new Map();

  for (const [key, value] of Object.entries(translationPairs)) {
    translationsMap.set(key, value);
  }

  // Convert Map back to an object
  return Object.fromEntries(translationsMap.entries());
}

// Mock translations for different languages
const mockTranslations = {
  en: createTranslations({
    "Welcome to the Art Museum": "Welcome to the Art Museum",
    "Visit Page": "Visit Page",
    "Exhibitions and Events Page": "Exhibitions and Events Page",
    "Explore Page": "Explore Page",
    "Online Boutique Page": "Online Boutique Page",
    "Tickets Page": "Tickets Page",
    Search: "Search",
    Tickets: "Tickets",
    "Online Boutique": "Online Boutique",
    VISIT: "VISIT",
    "EXHIBITIONS AND EVENTS": "EXHIBITIONS AND EVENTS",
    EXPLORE: "EXPLORE",
    "SEE MORE": "SEE MORE",
    "This is the Visit page content": "This is the Visit page content",
    "This is the Exhibitions and Events page content":
      "This is the Exhibitions and Events page content",
    "This is the Explore page content": "This is the Explore page content",
    "This is the Tickets page content": "This is the Tickets page content",
    "This is the Online Boutique page content":
      "This is the Online Boutique page content",
    "Search results": "Search results",
    "Searching...": "Searching...",
    "RESULTS FOUND FOR « ": "RESULTS FOUND FOR « ",
    "No results found": "No results found",
    "We couldn't find any results for your search: « ":
      "We couldn't find any results for your search: « ",
    "Suggestions:": "Suggestions:",
    "Check the spelling of your search term":
      "Check the spelling of your search term",
    "Try using more general keywords": "Try using more general keywords",
    "Try using different keywords": "Try using different keywords",
    "Browse our collections by category": "Browse our collections by category",
    "Try another search": "Try another search",
    "Return to home page": "Return to home page",
    All: "All",
    Exhibition: "Exhibition",
    Artwork: "Artwork",
    "Online boutique": "Online boutique",
    "Support the Louvre": "Support the Louvre",
    "Visit our online store": "Visit our online store",
    "Become a Patron!": "Become a Patron!",
    "Individuals, companies or foundations":
      "Individuals, companies or foundations",
    "WELCOME TO THE LOUVRE": "WELCOME TO THE LOUVRE",
    "The museum is open today": "The museum is open today",
    "Book a ticket": "Book a ticket",
    "Prepare your visit": "Prepare your visit",
    "PREPARE YOUR VISIT": "PREPARE YOUR VISIT",
    "Escape with the Louvre": "Escape with the Louvre",
    "Welcome to the Louvre": "Welcome to the Louvre",
    "Escape with the Musée Du Pin": "Escape with the Musée Du Pin",
    "Welcome to the Musée Du Pin": "Welcome to the Musée Du Pin",
    "Musée Du Pin Museum at sunset with glass pyramid":
      "Musée Du Pin Museum at sunset with glass pyramid",
    "7:00 AM": "7:00 AM",
    "21:00 PM": "21:00 PM",
  }),
  vi: createTranslations({
    "Welcome to the Art Museum": "Chào mừng đến với Bảo tàng Nghệ thuật",
    "Visit Page": "Trang Tham quan",
    "Exhibitions and Events Page": "Trang Triển lãm và Sự kiện",
    "Explore Page": "Trang Khám phá",
    "Online Boutique Page": "Trang Cửa hàng Trực tuyến",
    "Tickets Page": "Trang Vé",
    Search: "Tìm kiếm",
    Tickets: "Vé",
    "Online Boutique": "Cửa hàng Trực tuyến",
    VISIT: "THAM QUAN",
    "EXHIBITIONS AND EVENTS": "TRIỂN LÃM VÀ SỰ KIỆN",
    EXPLORE: "KHÁM PHÁ",
    "SEE MORE": "XEM THÊM",
    "The museum is open today": "Bảo tàng mở cửa hôm nay",
    "Book a ticket": "Đặt vé",
    "Prepare your visit": "Chuẩn bị chuyến tham quan",
    "PREPARE YOUR VISIT": "CHUẨN BỊ CHUYẾN THAM QUAN",
    "Escape with the Musée Du Pin": "Khám phá Bảo tàng Du Pin",
    "Welcome to the Musée Du Pin": "Chào mừng đến với Bảo tàng Du Pin",
    "Musée Du Pin Museum at sunset with glass pyramid":
      "Bảo tàng Du Pin lúc hoàng hôn với kim tự tháp kính",
    "7:00 AM": "7:00 Sáng",
    "21:00 PM": "21:00 Tối",
  }),
};

// Cache for storing translations to avoid repeated API calls
const translationCache = {};

/**
 * Translate text using Cloud Translation API
 *
 * @param {string} text - Text to translate
 * @param {string} targetLanguage - Target language code (en, fr, es, vi...)
 * @returns {Promise<string>} - Translated text
 */
export const translateText = async (text, targetLanguage) => {
  try {
    // No need to translate if target language is English or text is empty
    if (targetLanguage === "en" || !text || text.trim() === "") {
      return text;
    }

    // For Vietnamese, ONLY use manual translations from mockTranslations.vi
    if (targetLanguage === "vi") {
      // Check if we have a Vietnamese translation
      if (mockTranslations.vi && mockTranslations.vi[text]) {
        return mockTranslations.vi[text];
      }

      // Log missing Vietnamese translations
      console.warn(`MISSING VIETNAMESE TRANSLATION: "${text}": "Cần dịch",`);

      // Return original text as fallback
      return text;
    }

    // For non-Vietnamese languages, check cache first
    const cacheKey = `${text}:${targetLanguage}`;
    if (translationCache[cacheKey]) {
      return translationCache[cacheKey];
    }

    // For non-Vietnamese languages, check mock translations
    if (
      mockTranslations[targetLanguage] &&
      mockTranslations[targetLanguage][text]
    ) {
      translationCache[cacheKey] = mockTranslations[targetLanguage][text];
      return mockTranslations[targetLanguage][text];
    }

    // For other languages, use Google Translation API for accurate translations
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        target: targetLanguage,
        format: "html",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;

    // Save to cache
    translationCache[cacheKey] = translatedText;

    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // Return original text if there's an error
  }
};

/**
 * Get current language from localStorage or return default language
 *
 * @returns {string} - Current language code
 */
export const getCurrentLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLanguage") || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

/**
 * Change current language and save to localStorage
 *
 * @param {string} languageCode - New language code
 */
export const changeLanguage = (languageCode) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedLanguage", languageCode);
  }
};

/**
 * Get list of supported languages with both code and display name
 *
 * @returns {Array} - Array of supported languages
 */
export const getSupportedLanguages = () => {
  return Object.entries(SUPPORTED_LANGUAGES).map(([code, name]) => ({
    code,
    name,
  }));
};

export default {
  translateText,
  getCurrentLanguage,
  changeLanguage,
  getSupportedLanguages,
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
};
