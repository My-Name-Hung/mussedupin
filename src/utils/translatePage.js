/**
 * Tiện ích hỗ trợ dịch toàn bộ trang web
 * Sử dụng Cloud Translation API để dịch nội dung
 *
 * Tiếng Việt: Sử dụng bản dịch thủ công (manual) để đảm bảo chất lượng cao nhất
 * Các ngôn ngữ khác: Sử dụng dịch tự động (Google Cloud Translation API)
 */

import { translateText } from "./translate";

// Các thẻ cần dịch
const TRANSLATABLE_TAGS = [
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",
  "span",
  "a",
  "button",
  "label",
  "li",
  "th",
  "td",
  "caption",
  "figcaption",
];

// Các thuộc tính cần dịch
const TRANSLATABLE_ATTRIBUTES = ["title", "alt", "placeholder", "aria-label"];

// Các phần tử không cần dịch
const SKIP_CLASS = "no-translate";

/**
 * Dịch một phần tử DOM và các phần tử con của nó
 *
 * @param {HTMLElement} element - Phần tử cần dịch
 * @param {string} targetLanguage - Ngôn ngữ đích
 * @param {Function} onProgress - Callback khi có tiến độ
 * @returns {Promise<void>}
 */
export const translateElement = async (element, targetLanguage, onProgress) => {
  // Nếu là ngôn ngữ mặc định (tiếng Anh), không cần dịch
  if (targetLanguage === "en") return;

  // Nếu phần tử có class 'no-translate', bỏ qua
  if (element.classList && element.classList.contains(SKIP_CLASS)) return;

  // Lấy tất cả phần tử cần dịch
  const elementsToTranslate = [];

  // Lọc các phần tử cần dịch
  const collectElements = (el) => {
    // Kiểm tra nếu là phần tử cần dịch
    if (
      el.nodeType === 1 &&
      TRANSLATABLE_TAGS.includes(el.tagName.toLowerCase())
    ) {
      // Kiểm tra nếu phần tử không có class 'no-translate'
      if (!el.classList || !el.classList.contains(SKIP_CLASS)) {
        elementsToTranslate.push(el);
      }
    }

    // Duyệt các phần tử con
    for (let i = 0; i < el.childNodes.length; i++) {
      const child = el.childNodes[i];
      if (child.nodeType === 1) {
        collectElements(child);
      }
    }
  };

  collectElements(element);

  // Dịch từng phần tử
  const total = elementsToTranslate.length;
  let completed = 0;

  for (const el of elementsToTranslate) {
    // Dịch nội dung
    if (el.childNodes.length === 1 && el.childNodes[0].nodeType === 3) {
      const text = el.textContent.trim();
      if (text) {
        try {
          const translatedText = await translateText(text, targetLanguage);
          el.textContent = translatedText;
        } catch (error) {
          console.error("Error translating text:", error);
        }
      }
    }

    // Dịch các thuộc tính
    for (const attr of TRANSLATABLE_ATTRIBUTES) {
      if (el.hasAttribute(attr)) {
        const text = el.getAttribute(attr).trim();
        if (text) {
          try {
            const translatedText = await translateText(text, targetLanguage);
            el.setAttribute(attr, translatedText);
          } catch (error) {
            console.error(`Error translating ${attr}:`, error);
          }
        }
      }
    }

    completed++;
    if (onProgress) {
      onProgress(completed / total);
    }
  }
};

/**
 * Dịch toàn bộ trang web
 *
 * @param {string} targetLanguage - Ngôn ngữ đích
 * @param {Function} onProgress - Callback khi có tiến độ
 * @returns {Promise<void>}
 */
export const translatePage = async (targetLanguage, onProgress) => {
  const mainContent = document.body;
  await translateElement(mainContent, targetLanguage, onProgress);
};

export default {
  translateElement,
  translatePage,
};
