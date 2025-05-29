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
export const DEFAULT_LANGUAGE = "vi";

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
export const mockTranslations = {
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
    "Map & Directions": "Map & Directions",
    "How to reach Musée Du Pin": "How to reach Musée Du Pin",
    "Getting here": "Getting here",
    "To Central Market": "To Central Market",
    "Museum map": "Museum map",
    "Select transportation mode": "Chọn phương tiện di chuyển",
    "By Air": "Bằng máy bay",
    "By Car (From South)": "Bằng ô tô (Từ phía Nam)",
    "By Car (From North/Central)": "Bằng ô tô (Từ phía Bắc/Trung)",
    "By Bus": "Bằng xe khách",
    "TO CENTRAL MARKET & XUAN HUONG LAKE":
      "TO CENTRAL MARKET & XUAN HUONG LAKE",
    "Distance to Central Night Market: 1.2km":
      "Distance to Central Night Market: 1.2km",
    "Distance to Xuan Huong Lake: 900m": "Distance to Xuan Huong Lake: 900m",
    "Directions:": "Directions:",
    "Important: Use ONLY Ha Huy Tap street route for the best access.":
      "Important: Use ONLY Ha Huy Tap street route for the best access.",
    "From Lien Khuong Airport": "From Lien Khuong Airport",
    "Multiple routes available from Southern provinces and Ho Chi Minh City:":
      "Multiple routes available from Southern provinces and Ho Chi Minh City:",
    "Routes from Northern and Central provinces:":
      "Routes from Northern and Central provinces:",
    "Bus services available from various locations:":
      "Bus services available from various locations:",
    "Route 1": "Route 1",
    "National Highway 1A → Dau Giay → National Highway 20 → Chuoi Pass → Bao Loc Pass → Prenn Pass":
      "National Highway 1A → Dau Giay → National Highway 20 → Chuoi Pass → Bao Loc Pass → Prenn Pass",
    "Bao Loc Pass is relatively narrow with frequent buses and trucks. If traveling by motorbike, check your vehicle and drive carefully.":
      "Bao Loc Pass is relatively narrow with frequent buses and trucks. If traveling by motorbike, check your vehicle and drive carefully.",
    "Route 2": "Route 2",
    "National Highway 1A → Phan Thiet City → National Highway 28B → Dai Ninh Pass → National Highway 20 (Duc Trong section) → Prenn Pass":
      "National Highway 1A → Phan Thiet City → National Highway 28B → Dai Ninh Pass → National Highway 20 (Duc Trong section) → Prenn Pass",
    "Dai Ninh Pass offers a more secluded, scenic route perfect for nature lovers.":
      "Dai Ninh Pass offers a more secluded, scenic route perfect for nature lovers.",
    "Route 3": "Route 3",
    "National Highway 1A → Phan Thiet City → National Highway 28 → Gia Bac Pass → National Highway 20 (Di Linh section) → Prenn Pass":
      "National Highway 1A → Phan Thiet City → National Highway 28 → Gia Bac Pass → National Highway 20 (Di Linh section) → Prenn Pass",
    "Ideal for motorcycle enthusiasts, Gia Bac Pass offers an exciting experience with stunning natural scenery.":
      "Ideal for motorcycle enthusiasts, Gia Bac Pass offers an exciting experience with stunning natural scenery.",
    "Route 4": "Route 4",
    "National Highway 1A → Phan Rang (Thap Cham) → National Highway 27 → Ngoan Muc Pass → National Highway 20 → Prenn Pass":
      "National Highway 1A → Phan Rang (Thap Cham) → National Highway 27 → Ngoan Muc Pass → National Highway 20 → Prenn Pass",
    "Experience breathtaking views of green mountainsides, waterfalls, and diverse vegetation.":
      "Experience breathtaking views of green mountainsides, waterfalls, and diverse vegetation.",
    "From Nha Trang": "From Nha Trang",
    "National Highway 1A → Nha Trang City → National Highway 27C → Khanh Le Pass → Lac Duong → Da Lat":
      "National Highway 1A → Nha Trang City → National Highway 27C → Khanh Le Pass → Lac Duong → Da Lat",
    "Khanh Le Pass offers magnificent natural beauty with misty forests and pine trees.":
      "Khanh Le Pass offers magnificent natural beauty with misty forests and pine trees.",
    "From Hanoi": "From Hanoi",
    "Hanoi Highway → Vung Tau Intersection → National Highway 51 → Vo Nguyen Giap → National Highway 1A → Dau Giay Intersection → National Highway 20 → Prenn Pass":
      "Hanoi Highway → Vung Tau Intersection → National Highway 51 → Vo Nguyen Giap → National Highway 1A → Dau Giay Intersection → National Highway 20 → Prenn Pass",
    "From South Vietnam: Phuong Trang and Thanh Buoi buses offer transfer service to the museum":
      "From South Vietnam: Phuong Trang and Thanh Buoi buses offer transfer service to the museum",
    "From North Vietnam: Minh Thu, Tai Thang, Van Nam, Hiep Duc, Ngoc Hung Van Nhan, Dien Linh, and Dao Van buses":
      "From North Vietnam: Minh Thu, Tai Thang, Van Nam, Hiep Duc, Ngoc Hung Van Nhan, Dien Linh, and Dao Van buses",
    "For buses without transfer service, take a taxi from Ha Huy Tap or To Hien Thanh street to Dong Da - To Hien Thanh intersection":
      "For buses without transfer service, take a taxi from Ha Huy Tap or To Hien Thanh street to Dong Da - To Hien Thanh intersection",
    "The museum is only 100m from this intersection":
      "The museum is only 100m from this intersection",
  }),
  vi: {
    // Tiêu đề và điều hướng
    "Map, Directions & Location | Musée Du Pin":
      "Bản đồ & Hướng dẫn di chuyển | Bảo Tàng Thông",
    "Getting here": "HƯỚNG DẪN DI CHUYỂN",
    "To Central Market": "ĐẾN CHỢ TRUNG TÂM",
    "Museum map": "BẢN ĐỒ BẢO TÀNG",
    "MAP & DIRECTIONS": "BẢN ĐỒ & HƯỚNG DẪN",
    "How to reach Musée Du Pin": "HƯỚNG DẪN CÁCH DI CHUYỂN ĐẾN BẢO TÀNG THÔNG",
    Back: "Quay lại",

    // Thông tin địa chỉ
    "Musée Du Pin is located at 29-31 Dong Da Street, Ward 3, Da Lat City":
      "Bảo Tàng Thông có địa chỉ tại số 29-31 Đống Đa, Phường 3, thành phố Đà Lạt",
    "GETTING HERE": "HƯỚNG DẪN DI CHUYỂN",
    "Choose your preferred mode of transportation to reach Musée Du Pin":
      "Vui lòng chọn phương tiện di chuyển phù hợp để đến Bảo Tàng Thông",
    "Select transportation mode": "Chọn phương tiện di chuyển",

    // Phương tiện di chuyển
    "By Air": "Bằng máy bay",
    "From Lien Khuong Airport": "Từ sân bay Liên Khương",
    "Take a taxi or use the museum's shuttle service":
      "Đi taxi hoặc dùng dịch vụ đưa đón của Bảo Tàng",
    "Follow the Da Lat - Lien Khuong highway":
      "Đi theo cao tốc Đà Lạt - Liên Khương",
    "After Prenn Pass, turn left at 3/4 road onto Dong Da street":
      "Đi hết đèo Prenn sẽ tới đầu đường 3/4 thì rẽ trái lên dốc vào đường Đống Đa",
    "Continue past Cuu Long Elementary School":
      "Đi theo đường Đống Đa qua trường tiểu học Cửu Long",
    "Look for a green strawberry garden next to a pine tree-shaped building - that's Musée Du Pin":
      "Sẽ thấy 1 vườn dâu xanh mát bên cạnh 1 tòa nhà nhìn bên ngoài cách điệu hình cây Thông thì đó là Bảo Tàng Thông",

    // Đường bộ từ phía Nam
    "By Car (From South)": "Bằng ô tô (Từ phía Nam)",
    "Multiple routes available from Southern provinces and Ho Chi Minh City":
      "Các tuyến đường từ các tỉnh phía Nam và Tp. Hồ Chí Minh:",
    "Route 1": "Tuyến đường 1",
    "National Highway 1A → Dau Giay → National Highway 20 → Chuoi Pass → Bao Loc Pass → Prenn Pass":
      "Quốc lộ 1A – Dầu Giây – Quốc lộ 20 – Đèo Chuối – Đèo Bảo Lộc – Đèo Prenn",
    "Bao Loc Pass is relatively narrow with frequent buses and trucks. If traveling by motorbike, check your vehicle and drive carefully":
      "Đường đèo Bảo Lộc tương đối hẹp và thường xuyên có xe khách cũng như xe tải lên xuống. Do đó, nếu bạn tự túc đi bằng xe máy, bạn nên kiểm tra xe trước khi đi, cẩn thận quan sát và vững tay lái",

    "Route 2": "Tuyến đường 2",
    "National Highway 1A → Phan Thiet City → National Highway 28B → Dai Ninh Pass → National Highway 20 (Duc Trong section) → Prenn Pass":
      "Quốc lộ 1A – Tp. Phan Thiết – Quốc lộ 28B – Đèo Đại Ninh – Quốc lộ 20 (đoạn qua Đức Trọng) – Đèo Prenn",
    "Dai Ninh Pass offers a more secluded, scenic route perfect for nature lovers":
      "Đèo Đại Ninh có cảnh quan hoang vu và vắng xe hơn, thích hợp cho những ai muốn gần gũi với thiên nhiên, một mình một thế giới, không bị bó buộc bởi thời gian",

    "Route 3": "Tuyến đường 3",
    "National Highway 1A → Phan Thiet City → National Highway 28 → Gia Bac Pass → National Highway 20 (Di Linh section) → Prenn Pass":
      "Quốc lộ 1A – Tp. Phan Thiết – Quốc lộ 28 – Đèo Gia Bắc – Quốc lộ 20 (đoạn qua Di Linh) – Đèo Prenn- Đà Lạt",
    "Ideal for motorcycle enthusiasts, Gia Bac Pass offers an exciting experience with stunning natural scenery":
      "Với những người thích phượt bằng xe máy, trải nghiệm đèo Gia Bắc sẽ mang đến một cảm giác thực sự 'yomost'. Bên cạnh đó, cảnh quan thiên nhiên, rừng núi hoang sơ, hùng vĩ trên đường đi sẽ là những điểm hấp dẫn cho những ai muốn chinh phục đèo Gia Bắc",

    "Route 4": "Tuyến đường 4",
    "National Highway 1A → Phan Rang (Thap Cham) → National Highway 27 → Ngoan Muc Pass → National Highway 20 → Prenn Pass":
      "Quốc lộ 1A – Phan Rang (Tháp Chàm) – Quốc lộ 27 – Đèo Ngoạn Mục – QL20 – Đèo Prenn- Đà Lạt",
    "Experience breathtaking views of green mountainsides, waterfalls, and diverse vegetation":
      "Trải nghiệm đèo Ngoạn Mục, bạn có thể tha hồ ngắm nhìn những sườn núi xanh mướt, thác nước hùng vĩ cùng hệ thực vật đa dạng",

    // Đường bộ từ phía Bắc và miền Trung
    "By Car (From North/Central)": "Bằng ô tô (Từ phía Bắc/Trung)",
    "Routes from Northern and Central provinces":
      "Các tuyến đường từ các tỉnh phía Bắc và miền Trung:",
    "From Nha Trang": "Từ Nha Trang",
    "National Highway 1A → Nha Trang City → National Highway 27C → Khanh Le Pass → Lac Duong → Da Lat":
      "Quốc lộ 1A – Tp. Nha Trang – Quốc lộ 27C – Đèo Khánh Lê – Lạc Dương – Tp. Đà Lạt",
    "Khanh Le Pass offers magnificent natural beauty with misty forests and pine trees":
      "Đèo Khánh Lê mang một vẻ đẹp tự nhiên vô cùng hùng vĩ. Có lúc, các bạn sẽ được chơi trò 'trốn tìm' trong làn sương mù huyền ảo và những cánh rừng thông xanh mướt",

    "From Hanoi": "Từ Hà Nội",
    "Hanoi Highway → Vung Tau Intersection → National Highway 51 → Vo Nguyen Giap → National Highway 1A → Dau Giay Intersection → National Highway 20 → Prenn Pass":
      "Xa lộ Hà Nội -> Ngã 4 Vũng Tàu -> QL51 -> Võ Nguyên giáp -> QL1A -> Ngã Tư Dầu Giây -> QL20 -> Đèo Prenn -> Đà Lạt",

    // Xe khách
    "By Bus": "Bằng xe khách",
    "Bus services available from various locations":
      "Các nhà xe phục vụ từ nhiều nơi:",
    "From South Vietnam: Phuong Trang and Thanh Buoi buses offer transfer service to the museum":
      "Từ Miền Nam bạn có thể đi 2 nhà xe Phương Trang, Thành Bưởi. Tới Đà Lạt 2 nhà xe này sẽ có xe trung chuyển chở bạn tới Bảo Tàng Thông",
    "From North Vietnam: Minh Thu, Tai Thang, Van Nam, Hiep Duc, Ngoc Hung Van Nhan, Dien Linh, and Dao Van buses":
      "Từ Miền Bắc vào có các nhà xe Minh Thu, Tài Thắng, Văn Nam, Hiệp Đức, Ngọc Hùng Văn Nhân, Điền Linh, Đào Vân",
    "For buses without transfer service, take a taxi from Ha Huy Tap or To Hien Thanh street to Dong Da - To Hien Thanh intersection":
      "Các nhà xe này không có xe trung chuyển, đến Đà lạt bạn có thể đón taxi đi theo đường Hà Huy Tập hoặc Tô Hiến Thành đến ngã 3 Đống Đa Tô Hiến Thành",
    "The museum is only 100m from this intersection":
      "Bảo Tàng Thông chỉ cách đó 100m",

    // Thông tin chợ và hồ
    "TO CENTRAL MARKET & XUAN HUONG LAKE": "ĐẾN CHỢ TRUNG TÂM & HỒ XUÂN HƯƠNG",
    "Distance to Central Night Market: 1.2km":
      "Cách chợ đêm trung tâm Đà Lạt 1.2km",
    "Distance to Xuan Huong Lake: 900m": "Cách Hồ Xuân Hương 900m",
    "Directions:": "Hướng dẫn:",
    "Take Ha Huy Tap street to Tran Phu street to reach both the Da Lat Market and Xuan Huong Lake":
      "Đi theo đường Hà Huy Tập đến đường Trần Phú là thấy chợ Đà Lạt và Hồ Xuân Hương",
    "Important: Use ONLY Ha Huy Tap street route for the best access":
      "Quan trọng: CHỈ đi theo đường Hà Huy Tập để tiếp cận tốt nhất",

    // Bản đồ
    "MUSEUM MAP": "BẢN ĐỒ BẢO TÀNG",
    "Interactive museum floor plan would be displayed here":
      "Bản đồ tương tác của bảo tàng sẽ được hiển thị tại đây",
    "Download PDF Map": "Tải bản đồ PDF",

    // Các mạng xã hội - giữ nguyên tên tiếng Anh vì là tên riêng
    Facebook: "Facebook",
    Instagram: "Instagram",
    Twitter: "Twitter",
    YouTube: "YouTube",
    Pinterest: "Pinterest",
    LinkedIn: "LinkedIn",
    "FOLLOW US": "THEO DÕI CHÚNG TÔI",

    // Phần Footer và Thông tin chung
    "Support the Musée Du Pin": "Hỗ trợ Musée Du Pin",
    ABOUT: "GIỚI THIỆU",
    "The Musée Du Pin in VietNam": "Musée Du Pin tại Việt Nam",
    "Visitor rules": "Nội quy tham quan",
    "Loans and long-term loans": "Cho mượn và cho mượn dài hạn",

    // Các trang web
    "OUR WEBSITES": "TRANG WEB CỦA CHÚNG TÔI",
    "Online ticketing service": "Dịch vụ đặt vé trực tuyến",
    "Online Boutique Shop": "Cửa hàng trực tuyến",
    Collection: "Bộ sưu tập",

    // Liên hệ và hỗ trợ
    CONTACT: "LIÊN HỆ",
    FAQ: "CÂU HỎI THƯỜNG GẶP",
    "Contact us": "Liên hệ với chúng tôi",
    "Give us your feedback!": "Gửi phản hồi cho chúng tôi!",
    "Private event and film shoots": "Sự kiện riêng tư và chụp phim",

    // Pháp lý
    "Legal Notice": "Thông báo pháp lý",
    "Privacy policy": "Chính sách bảo mật",
    Copyrights: "Bản quyền",

    // Xử lý lỗi object
    "[object Object]": "Không xác định",
  },
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
