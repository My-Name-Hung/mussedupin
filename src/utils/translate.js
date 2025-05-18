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

/**
 * Cloud Translation API Integration
 *
 * File này chứa các hàm để gửi yêu cầu dịch thuật đến Google Cloud Translation API
 * Yêu cầu cấu hình API key và quyền truy cập Google Cloud
 */

// Bạn cần thay thế giá trị này bằng API key thực của mình
const API_KEY = "AIzaSyB7BrsRT_boHTwf2rPUNBhwJSwrvYYsQyg";

// Ngôn ngữ mặc định của trang web
export const DEFAULT_LANGUAGE = "en";

// Các ngôn ngữ được hỗ trợ và tên hiển thị
export const SUPPORTED_LANGUAGES = {
  en: "English",
  vi: "Tiếng Việt",
  fr: "Français",
  es: "Español",
  "zh-CN": "中文",
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

// Mô phỏng các bản dịch
const mockTranslations = {
  en: {
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
    "9:00 AM": "9:00 AM",
    "9:00 PM": "9:00 PM",
    Exhibitions: "Exhibitions",
    "Guided tours": "Guided tours",
    "Another Louvre": "Another Louvre",
    "LOUVRE COUTURE": "LOUVRE COUTURE",
    "Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'another Louvre'":
      "Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'another Louvre'",
    "Art and fashion: statement pieces. 24 January – 21 July 2025":
      "Art and fashion: statement pieces. 24 January – 21 July 2025",
    "Hours & admission": "Hours & admission",
    "Map, entrances & directions": "Map, entrances & directions",
    "Restaurants & cafés": "Restaurants & cafés",
    "Another Du Pin": "Another Du Pin",
    "Du Pin Couture": "Du Pin Couture",
    "Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'another Du Pin'":
      "Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'another Du Pin'",
    "Support the Musée Du Pin": "Support the Musée Du Pin",
    "Support the Musée Du Pin →": "Support the Musée Du Pin →",
    "Support the Du Pin": "Support the Du Pin",
    "Scroll to top": "Scroll to top",
    "Back to top": "Back to top",
    "Page not found": "Page not found",
    "Loading...": "Loading...",
    "LEGAL NOTICE": "LEGAL NOTICE",
    Exhibitions: "Exhibitions",
    "Guided tours": "Guided tours",
    "Loading...": "Loading...",
    "Item Not Found": "Item Not Found",
    "Sorry, we couldn't find the requested item.":
      "Sorry, we couldn't find the requested item.",
    "Back to Exhibitions": "Back to Exhibitions",
    Dates: "Dates",
    Location: "Location",
    Duration: "Duration",
    Schedule: "Schedule",
    Price: "Price",
    "Get Tickets": "Get Tickets",
    "Book This Tour": "Book This Tour",
    Curators: "Curators",
    "Tour Highlights": "Tour Highlights",
    "You May Also Like": "You May Also Like",
    "Back to": "Back to",
    Exhibition: "Exhibition",
    "Guided Tour": "Guided Tour",
    Mamluks: "Mamluks",
    "1250-1517": "1250-1517",
    "Musée Du Pin Couture": "Musée Du Pin Couture",
    "Art and Fashion: Statement Pieces": "Art and Fashion: Statement Pieces",
    "A New Look at Cimabue": "A New Look at Cimabue",
    "At the Origins of Italian Painting": "At the Origins of Italian Painting",
    "The Met au Musée Du Pin": "The Met au Musée Du Pin",
    "Near Eastern Antiquities in Dialogue":
      "Near Eastern Antiquities in Dialogue",
    "The Experience of Nature": "The Experience of Nature",
    "Art in Prague at the Court of Rudolf II":
      "Art in Prague at the Court of Rudolf II",
    "The Portrait of King Charles I": "The Portrait of King Charles I",
    "Conservation and Restoration": "Conservation and Restoration",
    "The Musée Du Pin Masterpieces": "The Musée Du Pin Masterpieces",
    "Essential Highlights Tour": "Essential Highlights Tour",
    "De toutes beautés !": "De toutes beautés !",
    "Beauty Through the Ages": "Beauty Through the Ages",
    "Hidden Treasures": "Hidden Treasures",
    "Off the Beaten Path": "Off the Beaten Path",
    "The Palace History": "The Palace History",
    "From Royal Residence to Museum": "From Royal Residence to Museum",
    "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective.":
      "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective.",
    "The Mamluks were a dynasty of slave soldiers who established a sultanate stretching from Egypt to Syria and the holy cities of Islam. They were great builders and patrons of art, and their legacy remains in the form of mosques, mausoleums, and madrasas throughout Cairo and other major cities.":
      "The Mamluks were a dynasty of slave soldiers who established a sultanate stretching from Egypt to Syria and the holy cities of Islam. They were great builders and patrons of art, and their legacy remains in the form of mosques, mausoleums, and madrasas throughout Cairo and other major cities.",
    "This exhibition brings together over 200 artifacts including metalwork, ceramics, textiles, manuscripts, and architectural elements from museums and collections around the world, offering visitors a rare opportunity to explore this fascinating period of Islamic history.":
      "This exhibition brings together over 200 artifacts including metalwork, ceramics, textiles, manuscripts, and architectural elements from museums and collections around the world, offering visitors a rare opportunity to explore this fascinating period of Islamic history.",
    "A new perspective on decorative arts through the prism of contemporary fashion design.":
      "A new perspective on decorative arts through the prism of contemporary fashion design.",
    "The exhibition explores the fascinating relationship between art and fashion, showcasing how contemporary designers draw inspiration from historical art and decorative arts traditions.":
      "The exhibition explores the fascinating relationship between art and fashion, showcasing how contemporary designers draw inspiration from historical art and decorative arts traditions.",
    "Featuring works by leading fashion designers alongside the historical artworks that inspired them, this exhibition offers a unique dialogue between past and present, tradition and innovation.":
      "Featuring works by leading fashion designers alongside the historical artworks that inspired them, this exhibition offers a unique dialogue between past and present, tradition and innovation.",
    "For the first time, the Musée Du Pin is dedicating an exhibition to Cimabue, one of the most important artists of the 13th century.":
      "For the first time, the Musée Du Pin is dedicating an exhibition to Cimabue, one of the most important artists of the 13th century.",
    "Cenni di Pepo, known as Cimabue, was a Florentine painter and creator of mosaics who played a key role in the early Renaissance. This exhibition brings together his rare surviving works from collections across Europe.":
      "Cenni di Pepo, known as Cimabue, was a Florentine painter and creator of mosaics who played a key role in the early Renaissance. This exhibition brings together his rare surviving works from collections across Europe.",
    "Through paintings, drawings, and archival documents, visitors will discover how Cimabue broke with the rigid Byzantine tradition to develop a more naturalistic style that would influence later artists like Giotto and Duccio.":
      "Through paintings, drawings, and archival documents, visitors will discover how Cimabue broke with the rigid Byzantine tradition to develop a more naturalistic style that would influence later artists like Giotto and Duccio.",
    "A special exhibition featuring artifacts from the Metropolitan Museum of Art in dialogue with the Musée Du Pin collection.":
      "A special exhibition featuring artifacts from the Metropolitan Museum of Art in dialogue with the Musée Du Pin collection.",
    "This unique collaboration between two of the world's greatest museums brings together treasures from ancient Mesopotamia, Egypt, and Persia, exploring connections and differences between these civilizations.":
      "This unique collaboration between two of the world's greatest museums brings together treasures from ancient Mesopotamia, Egypt, and Persia, exploring connections and differences between these civilizations.",
    "The exhibition includes rare sculptures, reliefs, jewelry, and ceremonial objects, some of which have never before been displayed outside their home institutions.":
      "The exhibition includes rare sculptures, reliefs, jewelry, and ceremonial objects, some of which have never before been displayed outside their home institutions.",
    "The exhibition highlights the innovative aspect of the naturalistic art movement practiced in Prague at the Court of Rudolf II.":
      "The exhibition highlights the innovative aspect of the naturalistic art movement practiced in Prague at the Court of Rudolf II.",
    "Emperor Rudolf II (1552-1612) was one of history's greatest art patrons, transforming Prague into a cultural center that attracted artists, scientists, and humanists from across Europe.":
      "Emperor Rudolf II (1552-1612) was one of history's greatest art patrons, transforming Prague into a cultural center that attracted artists, scientists, and humanists from across Europe.",
    "This exhibition presents the remarkable scientific and artistic achievements of Rudolf's court, featuring botanical and zoological illustrations, still lifes, landscape paintings, and curiosity cabinet objects that reflect the period's fascination with natural phenomena and scientific discovery.":
      "This exhibition presents the remarkable scientific and artistic achievements of Rudolf's court, featuring botanical and zoological illustrations, still lifes, landscape paintings, and curiosity cabinet objects that reflect the period's fascination with natural phenomena and scientific discovery.",
    "The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year of conservation treatment.":
      "The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year of conservation treatment.",
    "This iconic portrait, painted in 1635, is one of the most important works in the Musée Du Pin's collection. The recent conservation project has revealed details that had been obscured by discolored varnish and previous restorations.":
      "This iconic portrait, painted in 1635, is one of the most important works in the Musée Du Pin's collection. The recent conservation project has revealed details that had been obscured by discolored varnish and previous restorations.",
    "The exhibition documents the conservation process, exploring the techniques used by Van Dyck and the historical context of this remarkable royal portrait.":
      "The exhibition documents the conservation process, exploring the techniques used by Van Dyck and the historical context of this remarkable royal portrait.",
    "What exactly is a masterpiece? Follow this trail to discover the most celebrated works in our collection!":
      "What exactly is a masterpiece? Follow this trail to discover the most celebrated works in our collection!",
    "This guided tour takes visitors to the most famous and important works in the Musée Du Pin, including paintings, sculptures, and decorative arts from various periods and cultures.":
      "This guided tour takes visitors to the most famous and important works in the Musée Du Pin, including paintings, sculptures, and decorative arts from various periods and cultures.",
    "Expert guides provide insights into the history, technique, and significance of each masterpiece, helping visitors understand why these works have achieved such enduring fame.":
      "Expert guides provide insights into the history, technique, and significance of each masterpiece, helping visitors understand why these works have achieved such enduring fame.",
    "Rituals, objects and representations of beauty, a retrospective trail through the Musée Du Pin":
      "Rituals, objects and representations of beauty, a retrospective trail through the Musée Du Pin",
    "This thematic tour explores how concepts of beauty have evolved across different cultures and time periods, from ancient Egypt to modern times.":
      "This thematic tour explores how concepts of beauty have evolved across different cultures and time periods, from ancient Egypt to modern times.",
    "Visitors will discover cosmetic objects, jewelry, portraits, and sculptures that reflect changing ideals of beauty and their cultural significance.":
      "Visitors will discover cosmetic objects, jewelry, portraits, and sculptures that reflect changing ideals of beauty and their cultural significance.",
    "Discover the lesser-known but equally magnificent works in our vast collection.":
      "Discover the lesser-known but equally magnificent works in our vast collection.",
    "This tour takes you through galleries and rooms that are often overlooked by visitors, revealing hidden masterpieces and fascinating stories.":
      "This tour takes you through galleries and rooms that are often overlooked by visitors, revealing hidden masterpieces and fascinating stories.",
    "From small curiosities to overlooked masterworks, this tour provides a different perspective on the museum's collections and history.":
      "From small curiosities to overlooked masterworks, this tour provides a different perspective on the museum's collections and history.",
    "Explore the fascinating history of our building and its transformation into one of the world's greatest museums.":
      "Explore the fascinating history of our building and its transformation into one of the world's greatest museums.",
    "This tour focuses on the architecture and history of the palace itself, from its origins as a royal fortress in the late 12th century to its evolution into a museum.":
      "This tour focuses on the architecture and history of the palace itself, from its origins as a royal fortress in the late 12th century to its evolution into a museum.",
    "Visitors will learn about the various expansions and renovations over the centuries, the kings and queens who lived here, and key historical events that took place within these walls.":
      "Visitors will learn about the various expansions and renovations over the centuries, the kings and queens who lived here, and key historical events that took place within these walls.",
    "30 April - 28 July 2025": "30 April - 28 July 2025",
    "West Wing, Floor 1": "West Wing, Floor 1",
    "24 January - 21 July 2025": "24 January - 21 July 2025",
    "East Wing, Floor 2": "East Wing, Floor 2",
    "22 January - 12 May 2025": "22 January - 12 May 2025",
    "South Wing, Floor 3": "South Wing, Floor 3",
    "29 February - 28 September 2025": "29 February - 28 September 2025",
    "North Wing, Floor 1": "North Wing, Floor 1",
    "19 March - 30 June 2025": "19 March - 30 June 2025",
    "Permanent Exhibition": "Permanent Exhibition",
    "East Wing, Floor 3": "East Wing, Floor 3",
    "1 hour 30 minutes": "1 hour 30 minutes",
    "Daily at 10:00 AM and 2:00 PM": "Daily at 10:00 AM and 2:00 PM",
    "1 hour 15 minutes": "1 hour 15 minutes",
    "Tuesday, Thursday, Saturday at 11:30 AM":
      "Tuesday, Thursday, Saturday at 11:30 AM",
    "2 hours": "2 hours",
    "Wednesday and Friday at 1:30 PM": "Wednesday and Friday at 1:30 PM",
    "1 hour 45 minutes": "1 hour 45 minutes",
    "Monday, Thursday, Saturday at 10:30 AM":
      "Monday, Thursday, Saturday at 10:30 AM",
    "The Mona Lisa": "The Mona Lisa",
    "Venus de Milo": "Venus de Milo",
    "Victory of Samothrace": "Victory of Samothrace",
    "Liberty Leading the People": "Liberty Leading the People",
    "Egyptian cosmetic items": "Egyptian cosmetic items",
    "Roman beauty artifacts": "Roman beauty artifacts",
    "Renaissance portraits": "Renaissance portraits",
    "Art Nouveau jewelry": "Art Nouveau jewelry",
    "Ancient artifacts from lesser-known civilizations":
      "Ancient artifacts from lesser-known civilizations",
    "Rare manuscripts and books": "Rare manuscripts and books",
    "Decorative arts from private royal collections":
      "Decorative arts from private royal collections",
    "Experimental works by famous artists":
      "Experimental works by famous artists",
    "Medieval foundations": "Medieval foundations",
    "Royal apartments": "Royal apartments",
    "Revolutionary history": "Revolutionary history",
    "Modern architectural additions": "Modern architectural additions",
    "€25 per person": "€25 per person",
    "€22 per person": "€22 per person",
    "€28 per person": "€28 per person",
    "€24 per person": "€24 per person",
  },

  vi: createTranslations({
    // Base text
    "Welcome to the Art Museum": "Chào mừng đến với Bảo tàng Nghệ thuật",
    "Escape with the Musée Du Pin": "Bước vào thiên nhiên cùng Musée Du Pin",
    "Visit Page": "Trang Tham quan",
    "MUSÉE DU PIN +": "MUSÉE DU PIN +",
    "DELVE INTO THE MUSÉE DU PIN": "KHÁM PHÁ MUSÉE DU PIN",
    "MUSÉE DU PIN": "MUSÉE DU PIN",
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

    // Visit Info Page
    "VISITOR AMENITIES": "TIỆN ÍCH CHO KHÁCH THAM QUAN",
    "Everything you need for a comfortable visit":
      "Mọi thứ bạn cần cho chuyến tham quan thoải mái",
    "Visitor Amenities": "Tiện ích cho khách tham quan",
    "HOMESTAY OPTIONS": "LỰA CHỌN LƯU TRÚ TẠI NHÀ DÂN",
    "Homestay Options": "Lựa chọn lưu trú tại nhà dân",
    "Stay with locals for an authentic experience":
      "Lưu trú tại nhà dân để có trải nghiệm đích thực",
    "FREQUENTLY ASKED QUESTIONS": "CÂU HỎI THƯỜNG GẶP",
    "Frequently asked questions": "Câu hỏi thường gặp",
    FAQ: "Câu hỏi thường gặp",
    "Find answers to common questions":
      "Tìm câu trả lời cho những câu hỏi phổ biến",
    "Answers from the Musée Du Pin.": "Câu trả lời từ Bảo tàng Du Pin.",
    "Information Desks": "Quầy Thông tin",
    Cloakroom: "Phòng gửi đồ",
    "Loan of Equipment": "Cho mượn thiết bị",
    "Free Wi-Fi": "Wi-Fi Miễn phí",
    Toilets: "Nhà vệ sinh",
    "Car Park": "Bãi đậu xe",
    "Lost and Found": "Đồ thất lạc",
    "Baby Space": "Khu vực dành cho em bé",
    "Traditional Homestay": "Nhà Dân Truyền Thống",
    "Modern Apartment": "Căn Hộ Hiện Đại",
    "Luxury Villa": "Biệt Thự Sang Trọng",
    "Budget Room": "Phòng Giá Rẻ",
    "per night": "mỗi đêm",
    "Book Now": "Đặt Ngay",
    "View Details": "Xem Chi Tiết",
    "Comfort and convenience": "Thoải mái và tiện nghi",
    "The museum offers a range of services to ensure optimal visiting conditions. Staff members are at hand throughout the museum to provide up-to-date information on the museum and its activities.":
      "Bảo tàng cung cấp nhiều dịch vụ để đảm bảo điều kiện tham quan tối ưu. Nhân viên luôn sẵn sàng trong suốt bảo tàng để cung cấp thông tin cập nhật về bảo tàng và các hoạt động.",
    "Two information desks, where visitors can ask any questions to staff members and pick up the museum map. Brochures in 8 languages are available under the Pyramid.":
      "Hai quầy thông tin, nơi khách tham quan có thể hỏi bất kỳ câu hỏi nào với nhân viên và lấy bản đồ bảo tàng. Tờ rơi bằng 8 ngôn ngữ có sẵn dưới Kim tự tháp.",
    "Self-service lockers are available free of charge beneath the Pyramid. Visitors are advised to use the lockers at the entrance. All items placed in the museum lockers must be collected the same day.":
      "Tủ khóa tự phục vụ được cung cấp miễn phí bên dưới Kim tự tháp. Khách tham quan được khuyên nên sử dụng tủ khóa tại lối vào. Tất cả các vật dụng đặt trong tủ khóa của bảo tàng phải được lấy lại trong cùng ngày.",
    "Walking sticks, folding stools, pushchairs, baby carriers, multifunctional rolling chair and wheelchairs are available free of charge from the visitor reception area beneath the Pyramid.":
      "Gậy đi bộ, ghế gấp, xe đẩy em bé, địu em bé, ghế có bánh xe đa năng và xe lăn được cung cấp miễn phí tại khu vực đón tiếp khách bên dưới Kim tự tháp.",
    "The 'Musée Du Pin' network is available under the Pyramid and in the exhibition rooms. The free WiFi connection has one hour limit and can be renewed as many times as needed.":
      "Mạng 'Musée Du Pin' có sẵn dưới Kim tự tháp và trong các phòng triển lãm. Kết nối WiFi miễn phí có giới hạn một giờ và có thể gia hạn nhiều lần theo nhu cầu.",
    "Toilets can found in the welcome area under the Pyramid and throughout the museum. There is a baby changing table.":
      "Nhà vệ sinh có thể tìm thấy ở khu vực đón tiếp dưới Kim tự tháp và khắp bảo tàng. Có bàn thay tã cho em bé.",
    "An underground car park is located at 1 Avenue du Général Lemonnier, from which you can access the museum via the Carrousel entrance. It is especially open 7 days a week from 7am to 11pm.":
      "Bãi đậu xe ngầm nằm tại 1 Avenue du Général Lemonnier, từ đó bạn có thể vào bảo tàng qua lối vào Carrousel. Bãi đậu xe mở cửa 7 ngày một tuần từ 7 giờ sáng đến 11 giờ tối.",
    "Lost something? If you are still in the museum, head to the Help Desk under the Pyramid and a member of staff should be able to help you.":
      "Bạn làm mất đồ? Nếu bạn vẫn còn trong bảo tàng, hãy đến Bàn Trợ giúp dưới Kim tự tháp và nhân viên sẽ có thể giúp bạn.",
    "The Studio – a special area designed with families in mind, located on the ground floor of the Richelieu wing – has a baby space equipped with a bottle warmer, a microwave oven and a nursing chair.":
      "Studio - khu vực đặc biệt được thiết kế dành cho gia đình, nằm ở tầng trệt của cánh Richelieu - có không gian cho em bé được trang bị máy hâm sữa, lò vi sóng và ghế cho con bú.",
    "Experience local living near the museum":
      "Trải nghiệm cuộc sống địa phương gần bảo tàng",
    "Immerse yourself in the local culture with our carefully selected homestay options near the museum. Experience authentic hospitality in these artfully designed spaces.":
      "Hòa mình vào văn hóa địa phương với các lựa chọn lưu trú tại nhà dân được chọn lọc kỹ lưỡng gần bảo tàng. Trải nghiệm sự hiếu khách đích thực trong những không gian được thiết kế nghệ thuật này.",

    // Homestay Categories
    "All Options": "Tất cả lựa chọn",
    "Popular Choices": "Lựa chọn phổ biến",
    "Top Rated": "Đánh giá cao nhất",
    Recommended: "Được đề xuất",
    "Budget Friendly": "Giá cả phải chăng",
    Authentic: "Đích thực",
    "Breakfast Included": "Bao gồm bữa sáng",
    Luxury: "Sang trọng",
    "Central Location": "Vị trí trung tâm",
    Private: "Riêng tư",
    "Full Service": "Dịch vụ đầy đủ",
    "Budget-Friendly": "Giá cả phải chăng",
    Convenient: "Thuận tiện",
    "Good Value": "Giá trị tốt",

    // Booking related
    "Book Your Stay": "Đặt Phòng Của Bạn",
    "Full Name": "Họ tên đầy đủ",
    Email: "Email",
    "Phone Number": "Số điện thoại",
    "Enter your full name": "Nhập họ tên đầy đủ của bạn",
    "Enter your email address": "Nhập địa chỉ email của bạn",
    "Enter your phone number": "Nhập số điện thoại của bạn",
    "Number of Guests": "Số lượng khách",
    "Special Requests": "Yêu cầu đặc biệt",
    "Any special requests or requirements?":
      "Bạn có yêu cầu hoặc nhu cầu đặc biệt nào không?",
    "Complete Booking": "Hoàn Tất Đặt Phòng",
    "Processing...": "Đang Xử Lý...",
    "Booking Successful!": "Đặt Phòng Thành Công!",
    "Thank you for your booking. We've sent a confirmation to your email. The host will contact you shortly with further details.":
      "Cảm ơn bạn đã đặt phòng. Chúng tôi đã gửi xác nhận đến email của bạn. Chủ nhà sẽ liên hệ với bạn trong thời gian ngắn với thông tin chi tiết hơn.",
    Close: "Đóng",
    Host: "Chủ nhà",
    Total: "Tổng cộng",

    // Date picker
    "Select check-in date": "Chọn ngày nhận phòng",
    "Select check-out date": "Chọn ngày trả phòng",
    "Check-in date:": "Ngày nhận phòng:",
    "Select check-in time": "Chọn giờ nhận phòng",
    "Select check-out time": "Chọn giờ trả phòng",
    "Check-in:": "Nhận phòng:",
    "Check-out:": "Trả phòng:",
    "Last available tickets": "Vé còn trống cuối cùng",
    Morning: "Buổi sáng",
    Afternoon: "Buổi chiều",
    "Price per night": "Giá mỗi đêm",
    "Number of nights": "Số đêm",
    Edit: "Sửa",
    "Select Dates & Times": "Chọn ngày & giờ",
    MON: "T2",
    TUES: "T3",
    WED: "T4",
    THURS: "T5",
    FRI: "T6",
    SAT: "T7",
    SUN: "CN",

    // FAQ section
    "Didn't find your answer?": "Không tìm thấy câu trả lời?",
    "Contact our support team for more information.":
      "Liên hệ với đội ngũ hỗ trợ của chúng tôi để biết thêm thông tin.",
    "Contact Us": "Liên hệ với chúng tôi",
    "Can I visit the museum for free? Do I have to book tickets?":
      "Tôi có thể tham quan bảo tàng miễn phí không? Tôi có phải đặt vé trước không?",
    "The museum offers free admission to several categories of visitors including those under 18 years old, EU residents under 26, and disabled visitors with a companion. Free entry is also available to everyone on the first Friday of each month from 6 PM (except July and August). We recommend booking a time slot in advance, even for free-admission visitors, especially during peak seasons.":
      "Bảo tàng cung cấp vé vào cửa miễn phí cho một số nhóm khách tham quan bao gồm những người dưới 18 tuổi, cư dân EU dưới 26 tuổi, và khách tham quan khuyết tật cùng người đi kèm. Vào cửa miễn phí cũng được áp dụng cho tất cả mọi người vào thứ Sáu đầu tiên của mỗi tháng từ 6 giờ chiều (trừ tháng 7 và tháng 8). Chúng tôi khuyên bạn nên đặt khung giờ trước, ngay cả đối với khách tham quan được miễn phí, đặc biệt là trong mùa cao điểm.",
    "How can I buy a ticket at concession price?":
      "Làm thế nào để mua vé giảm giá?",
    "Concession tickets are available for young adults aged 18-25 from countries outside the EU, holders of the Education Pass, and members of partner organizations. You must present a valid ID or membership card at the entrance. Concession tickets can be purchased online or at the ticket office.":
      "Vé giảm giá có sẵn cho thanh niên từ 18-25 tuổi đến từ các quốc gia ngoài EU, người có Thẻ Giáo dục, và thành viên của các tổ chức đối tác. Bạn phải xuất trình giấy tờ tùy thân hợp lệ hoặc thẻ thành viên tại lối vào. Vé giảm giá có thể được mua trực tuyến hoặc tại quầy vé.",
    "Can I get a refund?": "Tôi có thể được hoàn tiền không?",
    "Tickets are non-refundable once purchased. However, in case of museum closure for exceptional reasons, we will offer a refund or an alternative date. For special circumstances, please contact our visitor services at visitor@museedupin.com with your booking reference and reasons for requesting a refund.":
      "Vé không được hoàn lại sau khi đã mua. Tuy nhiên, trong trường hợp bảo tàng đóng cửa vì lý do đặc biệt, chúng tôi sẽ cung cấp khoản hoàn tiền hoặc ngày thay thế. Đối với các trường hợp đặc biệt, vui lòng liên hệ với dịch vụ khách tham quan của chúng tôi tại visitor@museedupin.com với mã đặt chỗ và lý do yêu cầu hoàn tiền.",
    "Which entrance do I use if I have bought tickets online?":
      "Tôi nên sử dụng lối vào nào nếu đã mua vé trực tuyến?",
    "Visitors with e-tickets can enter through the Pyramid entrance (main entrance) or the Porte des Lions entrance. The Carrousel entrance is reserved for groups and museum pass holders. Your e-ticket includes a QR code that will be scanned at the entrance. We recommend arriving 15 minutes before your reserved time slot.":
      "Khách tham quan có vé điện tử có thể vào qua lối vào Pyramid (lối vào chính) hoặc lối vào Porte des Lions. Lối vào Carrousel dành riêng cho các nhóm và người có thẻ bảo tàng. Vé điện tử của bạn bao gồm mã QR sẽ được quét tại lối vào. Chúng tôi khuyên bạn nên đến trước 15 phút so với khung giờ đã đặt.",
    "Are prams allowed in the museum?":
      "Có được phép mang xe đẩy em bé vào bảo tàng không?",
    "Yes, prams and strollers are allowed in the museum. However, during very busy periods, you may be asked to leave larger strollers at the cloakroom and use baby carriers instead, which are available free of charge. All galleries and exhibition spaces are accessible with strollers via elevators.":
      "Có, xe đẩy em bé được phép vào bảo tàng. Tuy nhiên, trong những thời điểm rất đông, bạn có thể được yêu cầu để xe đẩy lớn tại phòng để đồ và sử dụng địu em bé thay thế, được cung cấp miễn phí. Tất cả các phòng trưng bày và không gian triển lãm đều có thể tiếp cận bằng xe đẩy thông qua thang máy.",
    "What items are not allowed in the museum?":
      "Những vật dụng nào không được phép mang vào bảo tàng?",
    "Items not permitted inside the museum include large bags and suitcases (larger than 55×35×20 cm), tripods, selfie sticks, flash photography equipment, food and drinks (except water bottles), and sharp objects. These items must be left in the cloakroom. We also prohibit touching the artworks, smoking, and using mobile phones in the galleries.":
      "Các vật dụng không được phép mang vào bảo tàng bao gồm túi lớn và vali (lớn hơn 55×35×20 cm), chân máy, gậy selfie, thiết bị chụp ảnh có đèn flash, thức ăn và đồ uống (trừ chai nước), và vật sắc nhọn. Những vật dụng này phải được để tại phòng để đồ. Chúng tôi cũng cấm chạm vào các tác phẩm nghệ thuật, hút thuốc, và sử dụng điện thoại di động trong các phòng trưng bày.",

    // Visit dropdown menu translations
    "Hours & admission": "Giờ mở cửa & vé vào",
    "Ticket prices": "Giá vé",
    Membership: "Hội viên",
    "Map, entrances & directions": "Bản đồ, lối vào & chỉ dẫn",
    "Restaurants & cafés": "Nhà hàng & quán cà phê",
    "Visitor amenities": "Tiện ích cho khách tham quan",
    Homestay: "Lưu trú tại nhà dân",
    "Prepare your visit": "Chuẩn bị cho chuyến tham quan",
    "Everything you need to know before visiting the museum":
      "Tất cả những điều bạn cần biết trước khi đến thăm bảo tàng",

    // Visit page headers
    "HOURS & ADMISSION": "GIỜ MỞ CỬA & VÉ VÀO",
    "Plan and book your visit": "Lên kế hoạch và đặt vé cho chuyến tham quan",
    "WHEN TO VISIT": "THỜI GIAN THAM QUAN",
    "TICKET PRICES": "GIÁ VÉ",
    MEMBERSHIPS: "HỘI VIÊN",

    // Museum info
    "The museum is open today from 7:00 AM to 21:00 PM":
      "Bảo tàng mở cửa hôm nay từ 7:00 sáng đến 21:00 tối",
    "Monday to Sunday": "Thứ Hai đến Chủ Nhật",
    "Last entry:": "Vào cửa muộn nhất:",
    "1 hour before closing": "1 giờ trước khi đóng cửa",
    "Clearing of rooms:": "Phòng bắt đầu dọn dẹp:",
    "30 minutes before closing": "30 phút trước khi đóng cửa",
    "Public holidays:": "Ngày lễ:",
    "the Musée Du Pin is closed on 1 January, 1 May and 25 December. It remains open on all other public holidays unless they fall on a Tuesday, the museum's day of closure.":
      "Bảo tàng Du Pin đóng cửa vào ngày 1 tháng 1, 1 tháng 5 và 25 tháng 12. Bảo tàng vẫn mở cửa vào các ngày lễ khác trừ khi ngày lễ rơi vào thứ Ba, ngày nghỉ thường lệ của bảo tàng.",
    "The Cour Carrée": "Sân Carrée",
    "closes at 11pm.": "đóng cửa lúc 23:00.",
    "will be closed from 7 April to 25 June 2025.":
      "sẽ đóng cửa từ ngày 7 tháng 4 đến 25 tháng 6 năm 2025.",

    // Ticket info
    Ticket: "Vé",
    "A ticket gives you access to the permanent collections and temporary exhibitions of the Musée Du Pin, as well as to the Eugène-Delacroix National Museum the same day and the day after your visit of the Musée Du Pin museum.":
      "Vé cho phép bạn tham quan các bộ sưu tập thường trực và triển lãm tạm thời của Bảo tàng Du Pin, cũng như Bảo tàng Quốc gia Eugène-Delacroix trong cùng ngày và ngày sau chuyến tham quan Bảo tàng Du Pin.",
    "Tickets may be purchased on site when museum attendance is low (subject to availability).":
      "Vé có thể được mua tại chỗ khi bảo tàng ít người tham quan (tùy thuộc vào tình trạng còn vé).",
    "Time-slot bookings are recommended, including for free-admission visitors.":
      "Khuyến nghị đặt vé theo khung giờ, kể cả đối với khách được miễn phí vé vào cửa.",
    "General admission": "Vé vào cửa thường",
    FREE: "MIỄN PHÍ",
    "Admission is free for the following visitors:":
      "Miễn phí vào cửa cho những khách tham quan sau:",
    "Proof of ID required.": "Yêu cầu xuất trình giấy tờ tùy thân.",
    "Proof of ID and residency required.":
      "Yêu cầu xuất trình giấy tờ tùy thân và chứng minh cư trú.",
    "See full list of visitors eligible for free admission":
      "Xem danh sách đầy đủ người tham quan được miễn phí",
    "See group prices": "Xem giá vé nhóm",
    "VISITORS ELIGIBLE FOR FREE ADMISSION":
      "NGƯỜI THAM QUAN ĐƯỢC MIỄN PHÍ VÀO CỬA",
    "Are you coming in a group (7 or more people)?":
      "Bạn đến theo nhóm (từ 7 người trở lên)?",
    "$22.00": "500.000 VNĐ",

    // Visitor groups
    "Under 18s": "Người dưới 18 tuổi",
    "Under 18 year olds, under 26 year old residents of the EEA":
      "Người dưới 18 tuổi, cư dân dưới 26 tuổi thuộc Khu vực Kinh tế Châu Âu",
    "Under 26 year-old residents of the European Economic Area (EU, Norway, Iceland, and Liechtenstein)":
      "Cư dân dưới 26 tuổi của Khu vực Kinh tế Châu Âu (EU, Na Uy, Iceland và Liechtenstein)",
    "All visitors": "Tất cả khách tham quan",
    "On the first Friday of the month after 6 p.m. (except in July and August)":
      "Vào thứ Sáu đầu tiên của tháng sau 6 giờ chiều (trừ tháng 7 và tháng 8)",
    "And:": "Và:",
    "Disabled visitors and the person accompanying them":
      "Khách tham quan khuyết tật và người đi kèm",
    "Art teachers (plastic arts, archeology, applied arts, architecture and art history only)":
      "Giáo viên nghệ thuật (chỉ mỹ thuật, khảo cổ học, nghệ thuật ứng dụng, kiến trúc và lịch sử nghệ thuật)",
    "Present proof of subject taught.":
      "Xuất trình bằng chứng về môn học giảng dạy.",
    "Artists affiliated to the AIAP (Association Internationale des Arts Plastiques)":
      "Nghệ sĩ liên kết với AIAP (Hiệp hội Quốc tế về Nghệ thuật Tạo hình)",
    "Present valid membership card or certificate.":
      "Xuất trình thẻ hội viên hoặc chứng chỉ hợp lệ.",
    "ICOM and ICOMOS members": "Thành viên ICOM và ICOMOS",
    "Present valid membership card.": "Xuất trình thẻ hội viên hợp lệ.",
    Journalists: "Nhà báo",
    "Present national or international press card.":
      "Xuất trình thẻ báo chí quốc gia hoặc quốc tế.",

    // Tours and prices
    "Tours & activities": "Tham quan & hoạt động",
    "FULL PRICE - Guided tours, storytime and workshops":
      "GIÁ ĐẦY ĐỦ - Hướng dẫn tham quan, kể chuyện và hội thảo",
    "This price does not include admission to the museum.":
      "Giá này không bao gồm vé vào cửa bảo tàng.",
    "COMBINED TICKET - Guided tours, storytime and workshops + Musée Du Pin":
      "VÉ KẾT HỢP - Hướng dẫn tham quan, kể chuyện và hội thảo + Bảo tàng Du Pin",
    "Including museum admission ticket": "Bao gồm vé vào cửa bảo tàng",
    "REDUCED PRICE - Guided tours, storytime and workshops":
      "GIÁ ƯU ĐÃI - Hướng dẫn tham quan, kể chuyện và hội thảo",
    "Reduced rate with restrictions": "Giá ưu đãi có điều kiện kèm theo",
    "GROUP PRICE (7-25 people) - Guided tours":
      "GIÁ NHÓM (7-25 người) - Tham quan có hướng dẫn",
    "Price per person, advance booking required":
      "Giá mỗi người, yêu cầu đặt trước",
    "SCHOOL GROUPS - Guided educational tours":
      "NHÓM HỌC SINH - Tham quan giáo dục có hướng dẫn",
    "For primary and secondary school groups, includes educational materials":
      "Dành cho nhóm học sinh tiểu học và trung học, bao gồm tài liệu giáo dục",
    "$5.00": "115.000 VNĐ",
    "$8.00": "185.000 VNĐ",
    "$9.00": "210.000 VNĐ",
    "$12.00": "280.000 VNĐ",
    "$31.00": "720.000 VNĐ",

    // Membership section
    "Become a member of the Amis du Musée Du Pin":
      "Trở thành hội viên của Hội Những người bạn Bảo tàng Du Pin",
    "The Amis du Musée Du Pin offers a range of membership programmes (youth, solo and duo, family), with prices ranging from €15 to €120.":
      "Hội Những người bạn Bảo tàng Du Pin cung cấp nhiều chương trình hội viên khác nhau (thanh niên, cá nhân, cặp đôi, gia đình), với mức giá từ €15 đến €120.",

    // Other info
    "Payment methods": "Phương thức thanh toán",
    "The payment methods accepted at the museum ticket office are cash, bank card and 'Chèques-Vacances' holiday vouchers.":
      "Các phương thức thanh toán được chấp nhận tại quầy vé bảo tàng là tiền mặt, thẻ ngân hàng và phiếu du lịch 'Chèques-Vacances'.",
    "ADMISSION AND EXIT": "VÀO CỬA VÀ RA VỀ",
    "Think ahead of everything you would like to do at the museum as any exit is final.":
      "Hãy lên kế hoạch trước cho mọi thứ bạn muốn làm tại bảo tàng vì khi đã rời đi, bạn sẽ không được quay trở lại trong cùng ngày.",

    // Search results
    "Search results": "Kết quả tìm kiếm",
    "Searching...": "Đang tìm kiếm...",
    "RESULTS FOUND FOR « ": "KẾT QUẢ TÌM THẤY CHO « ",
    "No results found": "Không tìm thấy kết quả",
    "We couldn't find any results for your search: « ":
      "Chúng tôi không tìm thấy kết quả nào cho tìm kiếm của bạn: « ",
    "Suggestions:": "Gợi ý:",
    "Check the spelling of your search term":
      "Kiểm tra chính tả từ khóa tìm kiếm",
    "Try using more general keywords": "Thử sử dụng từ khóa chung hơn",
    "Try using different keywords": "Thử sử dụng từ khóa khác",
    "Browse our collections by category":
      "Duyệt bộ sưu tập của chúng tôi theo danh mục",
    "Try another search": "Thử tìm kiếm khác",
    "Return to home page": "Trở về trang chủ",
    All: "Tất cả",
    Exhibition: "Triển lãm",
    Artwork: "Tác phẩm nghệ thuật",
    "Online boutique": "Cửa hàng trực tuyến",
    "Support the Musée Du Pin": "Hỗ trợ Musée Du Pin",
    "Support the Musée Du Pin →": "Hỗ trợ Musée Du Pin →",
    "Support the Du Pin": "Hỗ trợ Du Pin",
    "Visit our online store": "Xem cửa hàng trực tuyến của chúng tôi",
    "Become a Patron!": "Trở thành nhà tài trợ!",
    "Individuals, companies or foundations": "Cá nhân, công ty hoặc quỹ",

    // Navigation
    "Scroll to top": "Cuộn lên đầu trang",
    "Back to top": "Trở về đầu trang",
    "Page not found": "Không tìm thấy trang",
    "Loading...": "Đang tải...",
    "LEGAL NOTICE": "THÔNG BÁO PHÁP LÝ",

    // Additional translations to complete Visit page
    "open today from 7:00 AM to 21:00 PM":
      "mở cửa hôm nay từ 7:00 sáng đến 21:00 tối",
    "7:00 AM → 21:00 PM": "7:00 sáng → 21:00 tối",
    "This is the Visit page content": "Đây là nội dung trang Tham quan",
    "This is the Exhibitions and Events page content":
      "Đây là nội dung trang Triển lãm và Sự kiện",
    "This is the Explore page content": "Đây là nội dung trang Khám phá",
    "This is the Tickets page content": "Đây là nội dung trang Vé",
    "This is the Online Boutique page content":
      "Đây là nội dung trang Cửa hàng Trực tuyến",

    // Homestay related translations
    "Hosted by": "Chủ nhà",
    nights: "đêm",

    // Homestay descriptions
    "Authentic local home with traditional décor and home-cooked meals included.":
      "Nhà dân địa phương chính gốc với trang trí truyền thống và bữa ăn tự nấu được bao gồm.",
    "Stylish modern apartment with all amenities, located just 10 minutes from the museum.":
      "Căn hộ hiện đại phong cách với đầy đủ tiện nghi, chỉ cách bảo tàng 10 phút đi bộ.",
    "Exquisite villa with private garden, premium services and exceptional views of the city.":
      "Biệt thự tinh tế với khu vườn riêng, dịch vụ cao cấp và tầm nhìn ngoạn mục ra thành phố.",
    "Comfortable and affordable private room in a shared apartment near public transport.":
      "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện giao thông công cộng.",

    // Homestay amenities
    Amenities: "Tiện nghi",
    "Air conditioning": "Điều hòa không khí",
    "Garden access": "Tiếp cận vườn",
    "Private bathroom": "Phòng tắm riêng",
    "Full kitchen": "Bếp đầy đủ",
    "Washer/Dryer": "Máy giặt/Máy sấy",
    "Smart TV": "TV thông minh",
    "Elevator in building": "Thang máy trong tòa nhà",
    "City view": "Tầm nhìn thành phố",
    "Swimming pool": "Hồ bơi",
    Parking: "Bãi đậu xe",
    "Daily cleaning service": "Dịch vụ dọn dẹp hàng ngày",
    Concierge: "Lễ tân",
    "Shared bathroom": "Phòng tắm dùng chung",
    "Shared kitchen": "Bếp dùng chung",
    "Washing machine": "Máy giặt",
    "Near metro station": "Gần ga tàu điện ngầm",

    // Room types and details
    "Private room in traditional house": "Phòng riêng trong nhà truyền thống",
    "Entire apartment": "Toàn bộ căn hộ",
    "Entire villa": "Toàn bộ biệt thự",
    "Private room in shared apartment": "Phòng riêng trong căn hộ dùng chung",
    "1 queen bed": "1 giường queen",
    "1 king bed, 1 sofa bed": "1 giường king, 1 giường sofa",
    "2 king beds, 1 queen bed": "2 giường king, 1 giường queen",
    "1 double bed": "1 giường đôi",

    // Rules and policies
    Rules: "Quy tắc",
    "No smoking": "Không hút thuốc",
    "No pets": "Không thú cưng",
    "No parties or events": "Không tiệc tùng hoặc sự kiện",
    "Pets allowed": "Cho phép thú cưng",
    "No smoking inside": "Không hút thuốc trong nhà",
    "Events allowed with prior approval":
      "Sự kiện được phép với sự chấp thuận trước",
    "Quiet after 10pm": "Yên tĩnh sau 10 giờ tối",
    "Cancellation Policy": "Chính sách hủy",
    "Free cancellation up to 48 hours before check-in":
      "Hủy miễn phí đến 48 giờ trước khi nhận phòng",
    "Free cancellation up to 24 hours before check-in":
      "Hủy miễn phí đến 24 giờ trước khi nhận phòng",
    "Free cancellation up to 7 days before check-in":
      "Hủy miễn phí đến 7 ngày trước khi nhận phòng",

    // Locations
    "5 minutes walk from the museum": "5 phút đi bộ từ bảo tàng",
    "10 minutes walk from the museum": "10 phút đi bộ từ bảo tàng",
    "15 minutes drive from the museum": "15 phút lái xe từ bảo tàng",
    "20 minutes by metro from the museum":
      "20 phút đi tàu điện ngầm từ bảo tàng",

    // Booking form elements
    "Name is required": "Yêu cầu nhập tên",
    "Email is required": "Yêu cầu nhập email",
    "Email address is invalid": "Địa chỉ email không hợp lệ",
    "Phone number is required": "Yêu cầu nhập số điện thoại",
    "Check-in date is required": "Yêu cầu chọn ngày nhận phòng",
    "Check-out date is required": "Yêu cầu chọn ngày trả phòng",
    "Check-out date must be after check-in date":
      "Ngày trả phòng phải sau ngày nhận phòng",
    "At least 1 guest is required": "Yêu cầu ít nhất 1 khách",

    // Review related
    "Wonderful traditional experience with amazing breakfast!":
      "Trải nghiệm truyền thống tuyệt vời với bữa sáng tuyệt hảo!",
    "Beautiful home and very welcoming host. Highly recommended.":
      "Ngôi nhà đẹp và chủ nhà rất hiếu khách. Đề xuất cao.",
    "Beautiful apartment with amazing views! Very clean and modern.":
      "Căn hộ đẹp với tầm nhìn tuyệt vời! Rất sạch sẽ và hiện đại.",
    "Great location and well equipped. Would stay again!":
      "Vị trí tuyệt vời và trang bị tốt. Sẽ ở lại lần nữa!",
    "Absolute luxury! The villa exceeded all our expectations.":
      "Sang trọng tuyệt đối! Biệt thự vượt quá mọi mong đợi của chúng tôi.",
    "Exceptional service and beautiful property. Worth every penny!":
      "Dịch vụ xuất sắc và cơ sở vật chất đẹp. Đáng giá từng đồng!",
    "Great value for money and convenient location near the metro.":
      "Giá trị tuyệt vời và vị trí thuận tiện gần tàu điện ngầm.",
    "Clean and comfortable room. Claire was a very helpful host!":
      "Phòng sạch sẽ và thoải mái. Claire là một chủ nhà rất hữu ích!",

    // Exhibition and Guided Tour related translations
    Exhibitions: "Triển lãm",
    "Guided tours": "Tour tham quan có hướng dẫn",
    "Loading...": "Đang tải...",
    "Item Not Found": "Không tìm thấy mục",
    "Sorry, we couldn't find the requested item.":
      "Xin lỗi, chúng tôi không thể tìm thấy mục yêu cầu.",
    "Back to Exhibitions": "Quay lại Triển lãm",
    Dates: "Ngày",
    Location: "Vị trí",
    Duration: "Thời lượng",
    Schedule: "Lịch trình",
    Price: "Giá",
    "Get Tickets": "Mua vé",
    "Book This Tour": "Đặt Tour này",
    Curators: "Giám tuyển",
    "Tour Highlights": "Điểm nổi bật của Tour",
    "You May Also Like": "Bạn cũng có thể thích",
    "Back to": "Quay lại",
    Exhibition: "Triển lãm",
    "Guided Tour": "Tour có hướng dẫn",

    // Exhibition titles and subtitles
    Mamluks: "Triều đại Mamluk",
    "1250-1517": "1250-1517",
    "Musée Du Pin Couture": "Thời trang Musée Du Pin",
    "Art and Fashion: Statement Pieces":
      "Nghệ thuật và Thời trang: Tác phẩm tuyên ngôn",
    "A New Look at Cimabue": "Cái nhìn mới về Cimabue",
    "At the Origins of Italian Painting": "Tại nguồn gốc của Hội họa Ý",
    "The Met au Musée Du Pin": "The Met tại Musée Du Pin",
    "Near Eastern Antiquities in Dialogue": "Đối thoại cổ vật Cận Đông",
    "The Experience of Nature": "Trải nghiệm Thiên nhiên",
    "Art in Prague at the Court of Rudolf II":
      "Nghệ thuật ở Prague tại Triều đình Rudolf II",
    "The Portrait of King Charles I": "Chân dung Vua Charles I",
    "Conservation and Restoration": "Bảo tồn và Phục chế",

    // Guided tour titles and subtitles
    "The Musée Du Pin Masterpieces": "Kiệt tác Musée Du Pin",
    "Essential Highlights Tour": "Tour Điểm nhấn Thiết yếu",
    "De toutes beautés !": "Vẻ đẹp muôn mặt!",
    "Beauty Through the Ages": "Vẻ đẹp qua các thời kỳ",
    "Hidden Treasures": "Kho báu Ẩn giấu",
    "Off the Beaten Path": "Ngoài Lối mòn",
    "The Palace History": "Lịch sử Cung điện",
    "From Royal Residence to Museum": "Từ Nơi ở Hoàng gia đến Bảo tàng",

    // Exhibition descriptions
    "The Musée Du Pin marks a European first with a major exhibition on the Mamluk sultanate (1250–1517), aiming to address this golden age of the Islamic Near East in all its scope and richness by examining it from a transregional perspective.":
      "Musée Du Pin đánh dấu sự kiện đầu tiên ở Châu Âu với triển lãm lớn về vương triều Mamluk (1250-1517), nhằm tìm hiểu thời kỳ hoàng kim của khu vực Cận Đông Hồi giáo trong toàn bộ phạm vi và sự phong phú của nó bằng cách xem xét từ góc nhìn liên vùng.",
    "The Mamluks were a dynasty of slave soldiers who established a sultanate stretching from Egypt to Syria and the holy cities of Islam. They were great builders and patrons of art, and their legacy remains in the form of mosques, mausoleums, and madrasas throughout Cairo and other major cities.":
      "Mamluk là một triều đại của các binh lính nô lệ đã thiết lập một vương quốc trải dài từ Ai Cập đến Syria và các thành phố thiêng liêng của Hồi giáo. Họ là những nhà xây dựng và bảo trợ nghệ thuật vĩ đại, và di sản của họ vẫn còn tồn tại dưới dạng các thánh đường, lăng mộ và trường học madrasas trên khắp Cairo và các thành phố lớn khác.",
    "This exhibition brings together over 200 artifacts including metalwork, ceramics, textiles, manuscripts, and architectural elements from museums and collections around the world, offering visitors a rare opportunity to explore this fascinating period of Islamic history.":
      "Triển lãm này tập hợp hơn 200 hiện vật bao gồm đồ kim khí, gốm sứ, dệt may, bản thảo và các yếu tố kiến trúc từ các bảo tàng và bộ sưu tập trên toàn thế giới, mang đến cho du khách cơ hội hiếm có để khám phá giai đoạn hấp dẫn này của lịch sử Hồi giáo.",

    "A new perspective on decorative arts through the prism of contemporary fashion design.":
      "Một góc nhìn mới về nghệ thuật trang trí thông qua lăng kính của thiết kế thời trang đương đại.",
    "The exhibition explores the fascinating relationship between art and fashion, showcasing how contemporary designers draw inspiration from historical art and decorative arts traditions.":
      "Triển lãm khám phá mối quan hệ hấp dẫn giữa nghệ thuật và thời trang, trưng bày cách các nhà thiết kế đương đại lấy cảm hứng từ nghệ thuật lịch sử và truyền thống nghệ thuật trang trí.",
    "Featuring works by leading fashion designers alongside the historical artworks that inspired them, this exhibition offers a unique dialogue between past and present, tradition and innovation.":
      "Trưng bày các tác phẩm của các nhà thiết kế thời trang hàng đầu bên cạnh các tác phẩm nghệ thuật lịch sử đã truyền cảm hứng cho họ, triển lãm này mang đến một cuộc đối thoại độc đáo giữa quá khứ và hiện tại, truyền thống và đổi mới.",

    "For the first time, the Musée Du Pin is dedicating an exhibition to Cimabue, one of the most important artists of the 13th century.":
      "Lần đầu tiên, Musée Du Pin dành riêng một triển lãm cho Cimabue, một trong những nghệ sĩ quan trọng nhất của thế kỷ 13.",
    "Cenni di Pepo, known as Cimabue, was a Florentine painter and creator of mosaics who played a key role in the early Renaissance. This exhibition brings together his rare surviving works from collections across Europe.":
      "Cenni di Pepo, được biết đến với tên Cimabue, là một họa sĩ và người sáng tạo tranh khảm người Florence đã đóng một vai trò quan trọng trong thời kỳ đầu của Phục hưng. Triển lãm này tập hợp các tác phẩm hiếm hoi còn sót lại của ông từ các bộ sưu tập trên khắp Châu Âu.",
    "Through paintings, drawings, and archival documents, visitors will discover how Cimabue broke with the rigid Byzantine tradition to develop a more naturalistic style that would influence later artists like Giotto and Duccio.":
      "Thông qua các bức tranh, bản vẽ và tài liệu lưu trữ, du khách sẽ khám phá cách Cimabue phá vỡ truyền thống Byzantine cứng nhắc để phát triển một phong cách tự nhiên hơn, điều này đã ảnh hưởng đến các nghệ sĩ sau này như Giotto và Duccio.",

    "A special exhibition featuring artifacts from the Metropolitan Museum of Art in dialogue with the Musée Du Pin collection.":
      "Một triển lãm đặc biệt trưng bày các hiện vật từ Bảo tàng Nghệ thuật Metropolitan đối thoại với bộ sưu tập của Musée Du Pin.",
    "This unique collaboration between two of the world's greatest museums brings together treasures from ancient Mesopotamia, Egypt, and Persia, exploring connections and differences between these civilizations.":
      "Sự hợp tác độc đáo giữa hai bảo tàng vĩ đại nhất thế giới tập hợp các bảo vật từ Lưỡng Hà, Ai Cập và Ba Tư cổ đại, khám phá những kết nối và khác biệt giữa các nền văn minh này.",
    "The exhibition includes rare sculptures, reliefs, jewelry, and ceremonial objects, some of which have never before been displayed outside their home institutions.":
      "Triển lãm bao gồm các tác phẩm điêu khắc hiếm có, phù điêu, đồ trang sức và các vật dụng nghi lễ, một số trong đó chưa từng được trưng bày bên ngoài tổ chức gốc của chúng.",

    "The exhibition highlights the innovative aspect of the naturalistic art movement practiced in Prague at the Court of Rudolf II.":
      "Triển lãm nhấn mạnh khía cạnh đổi mới của phong trào nghệ thuật tự nhiên được thực hành ở Prague tại Triều đình Rudolf II.",
    "Emperor Rudolf II (1552-1612) was one of history's greatest art patrons, transforming Prague into a cultural center that attracted artists, scientists, and humanists from across Europe.":
      "Hoàng đế Rudolf II (1552-1612) là một trong những nhà bảo trợ nghệ thuật vĩ đại nhất trong lịch sử, biến Prague thành một trung tâm văn hóa thu hút các nghệ sĩ, nhà khoa học và nhân văn từ khắp Châu Âu.",
    "This exhibition presents the remarkable scientific and artistic achievements of Rudolf's court, featuring botanical and zoological illustrations, still lifes, landscape paintings, and curiosity cabinet objects that reflect the period's fascination with natural phenomena and scientific discovery.":
      "Triển lãm này trưng bày những thành tựu khoa học và nghệ thuật đáng chú ý của triều đình Rudolf, bao gồm các minh họa thực vật và động vật, tranh tĩnh vật, tranh phong cảnh và các vật phẩm trong tủ kỳ thú phản ánh sự say mê của thời kỳ này với các hiện tượng tự nhiên và khám phá khoa học.",

    "The Portrait of King Charles I of England, by Anthony van Dyck, returns to the gallery walls after over a year of conservation treatment.":
      "Bức chân dung Vua Charles I của Anh, do Anthony van Dyck vẽ, trở lại trên tường phòng trưng bày sau hơn một năm được bảo tồn.",
    "This iconic portrait, painted in 1635, is one of the most important works in the Musée Du Pin's collection. The recent conservation project has revealed details that had been obscured by discolored varnish and previous restorations.":
      "Bức chân dung mang tính biểu tượng này, được vẽ vào năm 1635, là một trong những tác phẩm quan trọng nhất trong bộ sưu tập của Musée Du Pin. Dự án bảo tồn gần đây đã tiết lộ những chi tiết bị che khuất bởi lớp vecni đổi màu và các lần phục chế trước đây.",
    "The exhibition documents the conservation process, exploring the techniques used by Van Dyck and the historical context of this remarkable royal portrait.":
      "Triển lãm ghi lại quá trình bảo tồn, khám phá các kỹ thuật được sử dụng bởi Van Dyck và bối cảnh lịch sử của bức chân dung hoàng gia đáng chú ý này.",

    // Guided tours descriptions
    "What exactly is a masterpiece? Follow this trail to discover the most celebrated works in our collection!":
      "Kiệt tác thực sự là gì? Hãy theo lối này để khám phá những tác phẩm nổi tiếng nhất trong bộ sưu tập của chúng tôi!",
    "This guided tour takes visitors to the most famous and important works in the Musée Du Pin, including paintings, sculptures, and decorative arts from various periods and cultures.":
      "Tour hướng dẫn này đưa du khách đến với những tác phẩm nổi tiếng và quan trọng nhất trong Musée Du Pin, bao gồm tranh, tượng và nghệ thuật trang trí từ nhiều thời kỳ và nền văn hóa khác nhau.",
    "Expert guides provide insights into the history, technique, and significance of each masterpiece, helping visitors understand why these works have achieved such enduring fame.":
      "Các hướng dẫn viên chuyên nghiệp cung cấp thông tin sâu sắc về lịch sử, kỹ thuật và ý nghĩa của từng kiệt tác, giúp du khách hiểu tại sao những tác phẩm này đạt được danh tiếng lâu dài như vậy.",

    "Rituals, objects and representations of beauty, a retrospective trail through the Musée Du Pin":
      "Nghi lễ, vật phẩm và biểu tượng của vẻ đẹp, một hành trình hồi tưởng qua Musée Du Pin",
    "This thematic tour explores how concepts of beauty have evolved across different cultures and time periods, from ancient Egypt to modern times.":
      "Tour theo chủ đề này khám phá cách khái niệm về vẻ đẹp đã phát triển qua các nền văn hóa và thời kỳ khác nhau, từ Ai Cập cổ đại đến thời hiện đại.",
    "Visitors will discover cosmetic objects, jewelry, portraits, and sculptures that reflect changing ideals of beauty and their cultural significance.":
      "Du khách sẽ khám phá các vật dụng mỹ phẩm, đồ trang sức, chân dung và tượng điêu khắc phản ánh lý tưởng về vẻ đẹp thay đổi và ý nghĩa văn hóa của chúng.",

    "Discover the lesser-known but equally magnificent works in our vast collection.":
      "Khám phá những tác phẩm ít được biết đến nhưng đẹp tuyệt vời không kém trong bộ sưu tập rộng lớn của chúng tôi.",
    "This tour takes you through galleries and rooms that are often overlooked by visitors, revealing hidden masterpieces and fascinating stories.":
      "Tour này đưa bạn qua các phòng trưng bày và phòng thường bị du khách bỏ qua, tiết lộ những kiệt tác ẩn giấu và những câu chuyện hấp dẫn.",
    "From small curiosities to overlooked masterworks, this tour provides a different perspective on the museum's collections and history.":
      "Từ những hiện vật kỳ lạ nhỏ đến những tác phẩm tuyệt vời bị bỏ qua, tour này cung cấp một cái nhìn khác về bộ sưu tập và lịch sử của bảo tàng.",

    "Explore the fascinating history of our building and its transformation into one of the world's greatest museums.":
      "Khám phá lịch sử hấp dẫn của tòa nhà chúng tôi và sự chuyển đổi của nó thành một trong những bảo tàng vĩ đại nhất thế giới.",
    "This tour focuses on the architecture and history of the palace itself, from its origins as a royal fortress in the late 12th century to its evolution into a museum.":
      "Tour này tập trung vào kiến trúc và lịch sử của chính cung điện, từ nguồn gốc của nó như một pháo đài hoàng gia vào cuối thế kỷ 12 đến sự phát triển thành bảo tàng.",
    "Visitors will learn about the various expansions and renovations over the centuries, the kings and queens who lived here, and key historical events that took place within these walls.":
      "Du khách sẽ tìm hiểu về các cuộc mở rộng và cải tạo khác nhau qua các thế kỷ, các vị vua và hoàng hậu đã sống ở đây, và các sự kiện lịch sử quan trọng đã diễn ra trong những bức tường này.",

    // Dates, locations, and other metadata
    "30 April - 28 July 2025": "30 Tháng 4 - 28 Tháng 7 năm 2025",
    "West Wing, Floor 1": "Cánh Tây, Tầng 1",
    "24 January - 21 July 2025": "24 Tháng 1 - 21 Tháng 7 năm 2025",
    "East Wing, Floor 2": "Cánh Đông, Tầng 2",
    "22 January - 12 May 2025": "22 Tháng 1 - 12 Tháng 5 năm 2025",
    "South Wing, Floor 3": "Cánh Nam, Tầng 3",
    "29 February - 28 September 2025": "29 Tháng 2 - 28 Tháng 9 năm 2025",
    "North Wing, Floor 1": "Cánh Bắc, Tầng 1",
    "19 March - 30 June 2025": "19 Tháng 3 - 30 Tháng 6 năm 2025",
    "Permanent Exhibition": "Triển lãm Thường trực",
    "East Wing, Floor 3": "Cánh Đông, Tầng 3",
    "1 hour 30 minutes": "1 giờ 30 phút",
    "Daily at 10:00 AM and 2:00 PM": "Hàng ngày lúc 10:00 sáng và 2:00 chiều",
    "1 hour 15 minutes": "1 giờ 15 phút",
    "Tuesday, Thursday, Saturday at 11:30 AM":
      "Thứ Ba, Thứ Năm, Thứ Bảy lúc 11:30 sáng",
    "2 hours": "2 giờ",
    "Wednesday and Friday at 1:30 PM": "Thứ Tư và Thứ Sáu lúc 1:30 chiều",
    "1 hour 45 minutes": "1 giờ 45 phút",
    "Monday, Thursday, Saturday at 10:30 AM":
      "Thứ Hai, Thứ Năm, Thứ Bảy lúc 10:30 sáng",

    // Tour highlights
    "The Mona Lisa": "Nàng Mona Lisa",
    "Venus de Milo": "Thần Vệ Nữ đảo Milo",
    "Victory of Samothrace": "Nữ thần Chiến thắng Samothrace",
    "Liberty Leading the People": "Nữ thần Tự do dẫn dắt Nhân dân",
    "Egyptian cosmetic items": "Vật dụng mỹ phẩm Ai Cập",
    "Roman beauty artifacts": "Hiện vật về vẻ đẹp La Mã",
    "Renaissance portraits": "Chân dung thời Phục Hưng",
    "Art Nouveau jewelry": "Trang sức Nghệ thuật Mới",
    "Ancient artifacts from lesser-known civilizations":
      "Cổ vật từ các nền văn minh ít được biết đến",
    "Rare manuscripts and books": "Bản thảo và sách hiếm",
    "Decorative arts from private royal collections":
      "Nghệ thuật trang trí từ bộ sưu tập hoàng gia tư nhân",
    "Experimental works by famous artists":
      "Tác phẩm thử nghiệm của các nghệ sĩ nổi tiếng",
    "Medieval foundations": "Nền móng thời Trung cổ",
    "Royal apartments": "Căn hộ hoàng gia",
    "Revolutionary history": "Lịch sử cách mạng",
    "Modern architectural additions": "Bổ sung kiến trúc hiện đại",

    // Pricing
    "€25 per person": "€25 mỗi người",
    "€22 per person": "€22 mỗi người",
    "€28 per person": "€28 mỗi người",
    "€24 per person": "€24 mỗi người",
  }),

  fr: {
    "Welcome to the Art Museum": "Bienvenue au Musée d'Art",
    "Visit Page": "Page de Visite",
    "DELVE INTO THE MUSÉE DU PIN": "EXPLOREZ LE MUSÉE DU PIN",
    "Exhibitions and Events Page": "Page des Expositions et Événements",
    "Explore Page": "Page d'Exploration",
    "Online Boutique Page": "Page de la Boutique en Ligne",
    "Tickets Page": "Page des Billets",
    Search: "Rechercher",
    Tickets: "Billets",
    "Online Boutique": "Boutique en Ligne",
    VISIT: "VISITE",
    "EXHIBITIONS AND EVENTS": "EXPOSITIONS ET ÉVÉNEMENTS",
    EXPLORE: "EXPLORER",
    "SEE MORE": "VOIR PLUS",
    "This is the Visit page content": "Voici le contenu de la page Visite",
    "This is the Exhibitions and Events page content":
      "Voici le contenu de la page Expositions et Événements",
    "This is the Explore page content": "Voici le contenu de la page Explorer",
    "This is the Tickets page content": "Voici le contenu de la page Billets",
    "This is the Online Boutique page content":
      "Voici le contenu de la page Boutique en Ligne",
    "Search results": "Résultats de recherche",
    "Searching...": "Recherche en cours...",
    "RESULTS FOUND FOR « ": "RÉSULTATS TROUVÉS POUR « ",
    "No results found": "Aucun résultat trouvé",
    "We couldn't find any results for your search: « ":
      "Nous n'avons trouvé aucun résultat pour votre recherche: « ",
    "Suggestions:": "Suggestions:",
    "Check the spelling of your search term":
      "Vérifiez l'orthographe de votre terme de recherche",
    "Try using more general keywords":
      "Essayez d'utiliser des mots-clés plus généraux",
    "Try using different keywords":
      "Essayez d'utiliser des mots-clés différents",
    "Browse our collections by category":
      "Parcourez nos collections par catégorie",
    "Try another search": "Essayez une autre recherche",
    "Return to home page": "Retour à la page d'accueil",
    All: "Tous",
    Exhibition: "Exposition",
    Artwork: "Œuvre d'art",
    "Online boutique": "Boutique en Ligne",
    "Support the Louvre": "Soutenir le Louvre",
    "Visit our online store": "Visitez notre boutique en ligne",
    "Become a Patron!": "Devenez mécène!",
    "Individuals, companies or foundations":
      "Particuliers, entreprises ou fondations",
    "WELCOME TO THE LOUVRE": "BIENVENUE AU LOUVRE",
    "The museum is open today": "Le musée est ouvert aujourd'hui",
    "Book a ticket": "Réserver un billet",
    "Prepare your visit": "Préparer votre visite",
    "PREPARE YOUR VISIT": "PRÉPAREZ VOTRE VISITE",
    "Escape with the Louvre": "Échappez-vous avec le Louvre",
    "Welcome to the Louvre": "Bienvenue au Louvre",
    "Escape with the Musée Du Pin": "Échappez-vous avec le Musée Du Pin",
    "Welcome to the Musée Du Pin": "Bienvenue au Musée Du Pin",
    "Musée Du Pin Museum at sunset with nature":
      "Musée Du Pin au coucher du soleil avec la nature",
    "7:00 AM": "7h00",
    "21:00 PM": "21h00",
    Exhibitions: "Expositions",
    "Guided tours": "Visites guidées",
    "Another Louvre": "Un autre Louvre",
    "LOUVRE COUTURE": "LOUVRE COUTURE",
    "Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'another Louvre'":
      "Profitez d'une visite loin des foules et découvrez les trésors méconnus et les cadres magnifiques d'un 'autre Louvre'",
    "Art and fashion: statement pieces. 24 January – 21 July 2025":
      "Art et mode: pièces d'exception. 24 janvier - 21 juillet 2025",
    "Scroll to top": "Retour en haut",
    "Back to top": "Retour en haut",
    "Page not found": "Page non trouvée",
    "Loading...": "Chargement...",
    "LEGAL NOTICE": "MENTIONS LÉGALES",
  },

  es: {
    "Welcome to the Art Museum": "Bienvenido al Museo de Arte",
    "Visit Page": "Página de Visita",
    "Exhibitions and Events Page": "Página de Exposiciones y Eventos",
    "Explore Page": "Página de Exploración",
    "Online Boutique Page": "Página de la Boutique en Línea",
    "Tickets Page": "Página de Entradas",
    Search: "Buscar",
    Tickets: "Entradas",
    "Online Boutique": "Boutique en Línea",
    VISIT: "VISITAR",
    "EXHIBITIONS AND EVENTS": "EXPOSICIONES Y EVENTOS",
    EXPLORE: "EXPLORAR",
    "SEE MORE": "VER MÁS",
    "This is the Visit page content":
      "Este es el contenido de la página Visitar",
    "This is the Exhibitions and Events page content":
      "Este es el contenido de la página Exposiciones y Eventos",
    "This is the Explore page content":
      "Este es el contenido de la página Explorar",
    "This is the Tickets page content":
      "Este es el contenido de la página Entradas",
    "This is the Online Boutique page content":
      "Este es el contenido de la página Boutique en Línea",
    "Search results": "Resultados de búsqueda",
    "Searching...": "Buscando...",
    "RESULTS FOUND FOR « ": "RESULTADOS ENCONTRADOS PARA « ",
    "No results found": "No se encontraron resultados",
    "We couldn't find any results for your search: « ":
      "No pudimos encontrar ningún resultado para su búsqueda: « ",
    "Suggestions:": "Sugerencias:",
    "Check the spelling of your search term":
      "Compruebe la ortografía de su término de búsqueda",
    "Try using more general keywords":
      "Intente usar palabras clave más generales",
    "Try using different keywords": "Intente usar palabras clave diferentes",
    "Browse our collections by category":
      "Explore nuestras colecciones por categoría",
    "Try another search": "Intente otra búsqueda",
    "Return to home page": "Volver a la página de inicio",
    All: "Todos",
    Exhibition: "Exposición",
    Artwork: "Obra de arte",
    "Online boutique": "Tienda en línea",
    "Support the Louvre": "Apoyar al Louvre",
    "Visit our online store": "Visite nuestra tienda en línea",
    "Become a Patron!": "¡Conviértase en mecenas!",
    "Individuals, companies or foundations":
      "Particulares, empresas o fundaciones",
    "WELCOME TO THE LOUVRE": "BIENVENIDO AL LOUVRE",
    "The museum is open today": "El museo está abierto hoy",
    "Book a ticket": "Reservar una entrada",
    "Prepare your visit": "Prepare su visita",
    "PREPARE YOUR VISIT": "PREPARE SU VISITA",
    "Escape with the Louvre": "Escápate con el Louvre",
    "Welcome to the Louvre": "Bienvenido al Louvre",
    "Escape with the Musée Du Pin": "Escápate con el Museo Du Pin",
    "Welcome to the Musée Du Pin": "Bienvenido al Museo Du Pin",
    "Musée Du Pin Museum at sunset with nature":
      "Museo Du Pin al atardecer con la naturaleza",
    "7:00 AM": "7:00 AM",
    "21:00 PM": "21:00 PM",
    Exhibitions: "Exposiciones",
    "Guided tours": "Visitas guiadas",
    "Another Louvre": "Otro Louvre",
    "LOUVRE COUTURE": "LOUVRE COUTURE",
    "Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'another Louvre'":
      "Disfrute de una visita lejos de la multitud y descubra los tesoros poco conocidos y los escenarios impresionantes de 'Otro Louvre'",
    "Art and fashion: statement pieces. 24 January – 21 July 2025":
      "Arte y moda: piezas de excepción. 24 de enero - 21 de julio de 2025",
    "Scroll to top": "Volver arriba",
    "Back to top": "Volver arriba",
    "Page not found": "Página no encontrada",
    "Loading...": "Cargando...",
    "LEGAL NOTICE": "AVISO LEGAL",
  },

  "zh-CN": {
    "Welcome to the Art Museum": "欢迎来到艺术博物馆",
    "Visit Page": "参观页面",
    "Exhibitions and Events Page": "展览和活动页面",
    "Explore Page": "探索页面",
    "Online Boutique Page": "在线精品店页面",
    "Tickets Page": "票务页面",
    Search: "搜索",
    Tickets: "票务",
    "Online Boutique": "在线精品店",
    VISIT: "参观",
    "EXHIBITIONS AND EVENTS": "展览和活动",
    EXPLORE: "探索",
    "SEE MORE": "查看更多",
    "This is the Visit page content": "这是参观页面的内容",
    "This is the Exhibitions and Events page content":
      "这是展览和活动页面的内容",
    "This is the Explore page content": "这是探索页面的内容",
    "This is the Tickets page content": "这是票务页面的内容",
    "This is the Online Boutique page content": "这是在线精品店页面的内容",
    "Search results": "搜索结果",
    "Searching...": "搜索中...",
    "RESULTS FOUND FOR « ": "找到以下关于 « ",
    "No results found": "未找到结果",
    "We couldn't find any results for your search: « ":
      "我们找不到任何与您的搜索相关的结果: « ",
    "Suggestions:": "建议:",
    "Check the spelling of your search term": "检查您的搜索词的拼写",
    "Try using more general keywords": "尝试使用更一般的关键词",
    "Try using different keywords": "尝试使用不同的关键词",
    "Browse our collections by category": "按类别浏览我们的收藏",
    "Try another search": "尝试其他搜索",
    "Return to home page": "返回首页",
    All: "全部",
    Exhibition: "展览",
    Artwork: "艺术品",
    "Online boutique": "线上精品店",
    "Support the Louvre": "支持卢浮宫",
    "Visit our online store": "访问我们的线上商店",
    "Become a Patron!": "成为赞助人！",
    "Individuals, companies or foundations": "个人、公司或基金会",
    "WELCOME TO THE LOUVRE": "欢迎来到卢浮宫",
    "The museum is open today": "博物馆今天开放",
    "Book a ticket": "预订门票",
    "Prepare your visit": "准备您的参观",
    "PREPARE YOUR VISIT": "准备您的参观",
    "Escape with the Louvre": "与卢浮宫一起逃离",
    "Welcome to the Louvre": "欢迎来到卢浮宫",
    "Escape with the Musée Du Pin": "与杜坪博物馆一起逃离",
    "Welcome to the Musée Du Pin": "欢迎来到杜坪博物馆",
    "Musée Du Pin Museum at sunset with nature":
      "日落时分带有玻璃金字塔的杜坪博物馆",
    "7:00 AM": "上午7:00",
    "21:00 PM": "晚上21:00",
    Exhibitions: "展览",
    "Guided tours": "导览",
    "Another Louvre": "另一个卢浮宫",
    "LOUVRE COUTURE": "卢浮宫时尚",
    "Enjoy a visit away from the crowds and discover the lesser-known treasures and stunning settings of 'another Louvre'":
      "远离人群，发现另一个卢浮宫的未被发现的艺术珍品和令人惊叹的场景",
    "Art and fashion: statement pieces. 24 January – 21 July 2025":
      "艺术与时尚：标志性作品。2025年1月24日至7月21日",
    "Scroll to top": "回到顶部",
    "Back to top": "回到顶部",
    "Page not found": "找不到页面",
    "Loading...": "加载中...",
    "LEGAL NOTICE": "法律声明",
  },
};

// Cache lưu trữ các bản dịch để tránh gọi API lặp lại
const translationCache = {};

/**
 * Dịch văn bản sử dụng Cloud Translation API
 *
 * @param {string} text - Văn bản cần dịch
 * @param {string} targetLanguage - Mã ngôn ngữ đích (en, fr, es, vi...)
 * @returns {Promise<string>} - Văn bản đã dịch
 */
export const translateText = async (text, targetLanguage) => {
  try {
    // For Vietnamese, ONLY use manual translations from mockTranslations.vi
    if (targetLanguage === "vi") {
      // Check if we have a Vietnamese translation
      if (mockTranslations.vi && mockTranslations.vi[text]) {
        return mockTranslations.vi[text];
      }

      // If no translation found, log a warning for developers
      console.warn(`Missing Vietnamese translation for: "${text}"`);

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

    // Lưu vào cache
    translationCache[cacheKey] = translatedText;

    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error);
    return text; // Trả về văn bản gốc nếu có lỗi
  }
};

/**
 * Lấy ngôn ngữ hiện tại từ localStorage hoặc trả về ngôn ngữ mặc định
 *
 * @returns {string} - Mã ngôn ngữ hiện tại
 */
export const getCurrentLanguage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("selectedLanguage") || DEFAULT_LANGUAGE;
  }
  return DEFAULT_LANGUAGE;
};

/**
 * Thay đổi ngôn ngữ hiện tại và lưu vào localStorage
 *
 * @param {string} languageCode - Mã ngôn ngữ mới
 */
export const changeLanguage = (languageCode) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("selectedLanguage", languageCode);
  }
};

/**
 * Danh sách các ngôn ngữ được hỗ trợ với cả mã và tên hiển thị
 *
 * @returns {Array} - Mảng các ngôn ngữ được hỗ trợ
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
