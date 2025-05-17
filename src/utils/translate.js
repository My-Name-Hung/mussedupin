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
    "Escape with the Musee Du Pin": "Escape with the Musee Du Pin",
    "Welcome to the Musee Du Pin": "Welcome to the Musee Du Pin",
    "Musee Du Pin Museum at sunset with glass pyramid":
      "Musee Du Pin Museum at sunset with glass pyramid",
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
    "HOMESTAY OPTIONS": "LỰA CHỌN LƯU TRÚ TẠI NHÀ DÂN",
    "Stay with locals for an authentic experience":
      "Lưu trú tại nhà dân để có trải nghiệm đích thực",
    "FREQUENTLY ASKED QUESTIONS": "CÂU HỎI THƯỜNG GẶP",
    "Find answers to common questions":
      "Tìm câu trả lời cho những câu hỏi phổ biến",
    "Information Desks": "Quầy Thông tin",
    Cloakroom: "Phòng gửi đồ",
    "Loan of Equipment": "Cho mượn thiết bị",
    "Free Wi-Fi": "Wi-Fi Miễn phí",
    Toilets: "Nhà vệ sinh",
    "Car Park": "Bãi đậu xe",
    "Lost and Found": "Đồ thất lạc",
    "Baby Space": "Khu vực dành cho em bé",
    "Traditional Homestay": "Nhà dân truyền thống",
    "Modern Apartment": "Căn hộ hiện đại",
    "Luxury Villa": "Biệt thự sang trọng",
    "Budget Room": "Phòng giá rẻ",
    "per night": "mỗi đêm",
    "Book Now": "Đặt Ngay",
    "View Details": "Xem Chi tiết",
    "Comfort and convenience": "Thoải mái và tiện nghi",
    "The museum offers a range of services to ensure optimal visiting conditions.":
      "Bảo tàng cung cấp nhiều dịch vụ để đảm bảo điều kiện tham quan tối ưu.",
    "Two information desks, where visitors can ask any questions to staff members and pick up the museum map.":
      "Hai quầy thông tin, nơi khách tham quan có thể hỏi bất kỳ câu hỏi nào với nhân viên và lấy bản đồ bảo tàng.",
    "Self-service lockers are available free of charge beneath the Pyramid.":
      "Tủ khóa tự phục vụ được cung cấp miễn phí bên dưới Kim tự tháp.",
    "Walking sticks, folding stools, pushchairs, baby carriers, multifunctional rolling chair and wheelchairs are available free of charge.":
      "Gậy đi bộ, ghế gấp, xe đẩy em bé, địu em bé, ghế có bánh xe đa năng và xe lăn được cung cấp miễn phí.",
    "The 'Louvre_Wifi_Gratuit' network is available under the Pyramid and in the exhibition rooms.":
      "Mạng 'Louvre_Wifi_Gratuit' có sẵn dưới Kim tự tháp và trong các phòng triển lãm.",
    "Toilets can found in the welcome area under the Pyramid and throughout the museum.":
      "Nhà vệ sinh có thể tìm thấy ở khu vực đón tiếp dưới Kim tự tháp và khắp bảo tàng.",
    "An underground car park is located at 1 Avenue du Général Lemonnier.":
      "Bãi đậu xe ngầm nằm tại 1 Avenue du Général Lemonnier.",
    "Lost something? If you are still in the museum, head to the Help Desk under the Pyramid.":
      "Bạn làm mất đồ? Nếu bạn vẫn còn trong bảo tàng, hãy đến Bàn Trợ giúp dưới Kim tự tháp.",
    "The Studio – a special area designed with families in mind.":
      "Studio - khu vực đặc biệt được thiết kế dành cho gia đình.",
    "Experience local living near the museum":
      "Trải nghiệm cuộc sống địa phương gần bảo tàng",
    "Immerse yourself in the local culture with our carefully selected homestay options near the museum.":
      "Hòa mình vào văn hóa địa phương với các lựa chọn lưu trú tại nhà dân được chọn lọc kỹ lưỡng gần bảo tàng.",
    from: "từ",
    "Popular Choices": "Lựa chọn phổ biến",
    "Browse all options": "Xem tất cả lựa chọn",
    Recommended: "Được đề xuất",
    "Top Rated": "Được đánh giá cao",

    // Visit dropdown menu translations
    "Hours & admission": "Giờ mở cửa & vé vào",
    "Ticket prices": "Giá vé",
    Membership: "Hội viên",
    "Map, entrances & directions": "Bản đồ, lối vào & chỉ dẫn",
    "Restaurants & cafés": "Nhà hàng & quán cà phê",
    "Visitor amenities": "Tiện ích cho khách tham quan",
    Homestay: "Lưu trú tại nhà dân",
    FAQ: "Câu hỏi thường gặp",
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
    "Escape with the Musee Du Pin": "Échappez-vous avec le Musée Du Pin",
    "Welcome to the Musee Du Pin": "Bienvenue au Musée Du Pin",
    "Musee Du Pin Museum at sunset with nature":
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
    "Escape with the Musee Du Pin": "Escápate con el Museo Du Pin",
    "Welcome to the Musee Du Pin": "Bienvenido al Museo Du Pin",
    "Musee Du Pin Museum at sunset with nature":
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
    "Escape with the Musee Du Pin": "与杜坪博物馆一起逃离",
    "Welcome to the Musee Du Pin": "欢迎来到杜坪博物馆",
    "Musee Du Pin Museum at sunset with nature":
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
