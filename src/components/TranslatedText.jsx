import React, { memo, useCallback, useEffect, useState } from "react";
import { useTranslation } from "../context/TranslationContext";
import { translateText } from "../utils/translate";

// Đối tượng lưu trữ cache các bản dịch
const translationCache = {};

/**
 * Component để hiển thị văn bản đã được dịch
 * Sử dụng Cloud Translation API để dịch nội dung
 *
 * Lưu ý về chiến lược dịch thuật:
 * - Tiếng Việt: Sử dụng bản dịch thủ công (mockTranslations.vi)
 * - Ngôn ngữ khác: Sử dụng dịch tự động để đảm bảo sát nghĩa và đúng ý
 *
 * @param {Object} props
 * @param {string} props.children - Văn bản cần dịch (tiếng Anh)
 * @param {string} props.className - Class CSS bổ sung
 */
const TranslatedText = memo(({ children, className = "", ...props }) => {
  const { currentLanguage } = useTranslation();
  const [translatedText, setTranslatedText] = useState(children);
  const [isLoading, setIsLoading] = useState(false);
  const originalText = children;

  // Tạo chuỗi khóa duy nhất cho cache
  const getCacheKey = useCallback(
    (text, language) => `${text}:${language}`,
    []
  );

  // Hàm dịch với hỗ trợ cache
  const translateWithCache = useCallback(
    async (text, language) => {
      // Tạo khóa cache
      const cacheKey = getCacheKey(text, language);

      // Kiểm tra xem đã có bản dịch trong cache chưa
      if (translationCache[cacheKey]) {
        return translationCache[cacheKey];
      }

      // Nếu chưa có trong cache, dịch và lưu vào cache
      const result = await translateText(text, language);
      translationCache[cacheKey] = result;
      return result;
    },
    [getCacheKey]
  );

  useEffect(() => {
    // Nếu ngôn ngữ hiện tại là tiếng Việt (mặc định), không cần dịch
    if (currentLanguage === "vi") {
      setTranslatedText(originalText);
      return;
    }

    // Nếu không có nội dung, không cần dịch
    if (
      !originalText ||
      typeof originalText !== "string" ||
      originalText.trim() === ""
    ) {
      setTranslatedText(originalText);
      return;
    }

    // Bắt đầu dịch
    const doTranslation = async () => {
      setIsLoading(true);
      try {
        const result = await translateWithCache(originalText, currentLanguage);
        setTranslatedText(result);
      } catch (error) {
        console.error("Error translating text:", error);
        setTranslatedText(originalText); // Sử dụng văn bản gốc nếu có lỗi
      } finally {
        setIsLoading(false);
      }
    };

    doTranslation();
  }, [originalText, currentLanguage, translateWithCache]);

  // Nếu children là một đối tượng React, trả về nguyên trạng
  if (typeof children !== "string") {
    return children;
  }

  // Sử dụng cùng một cách hiển thị cho tất cả ngôn ngữ
  return (
    <span
      className={`translated-text ${className} ${isLoading ? "loading" : ""}`}
      {...props}
    >
      {translatedText}
    </span>
  );
});

export default TranslatedText;
