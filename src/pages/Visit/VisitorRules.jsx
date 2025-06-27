import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "../../contexts/TranslationContext";
import { getImageUrl } from "../../utils/cloudinary";
import "./VisitorRules.css";

const translations = {
  meta: {
    vi: {
      title: "Nội quy tham quan | Bảo tàng Du Pin",
      description:
        "Nội quy và quy định tham quan dành cho khách tham quan Bảo tàng Du Pin.",
    },
    en: {
      title: "Visitor Rules | Musée Du Pin",
      description: "Rules and regulations for visitors at Musée Du Pin.",
    },
  },
  header: {
    vi: "NỘI QUY THAM QUAN",
    en: "VISITOR RULES",
  },
  sections: {
    general: {
      vi: {
        title: "QUY ĐỊNH CHUNG",
        content:
          "Để đảm bảo trải nghiệm tham quan tốt nhất cho tất cả du khách và bảo vệ các tác phẩm nghệ thuật, quý khách vui lòng tuân thủ các quy định sau đây khi tham quan Bảo tàng Du Pin.",
      },
      en: {
        title: "GENERAL REGULATIONS",
        content:
          "To ensure the best visiting experience for all visitors and to protect the works of art, please comply with the following regulations when visiting Musée Du Pin.",
      },
    },
    prohibited: {
      vi: {
        title: "VẬT DỤNG KHÔNG ĐƯỢC MANG VÀO BẢO TÀNG",
        items: [
          "Thức ăn và đồ uống các loại",
          "Thuốc lá, thuốc lá điện tử và các sản phẩm tương tự",
          "Vũ khí, chất nổ và các vật sắc nhọn",
          "Balo cỡ lớn, vali và túi xách quá khổ",
          "Dù, gậy selfie và các thiết bị có thể gây nguy hiểm cho tác phẩm",
        ],
      },
      en: {
        title: "ITEMS NOT ALLOWED INTO THE MUSEUM",
        items: [
          "Food and drinks of all kinds",
          "Cigarettes, electronic cigarettes and similar products",
          "Weapons, explosives and sharp objects",
          "Large backpacks, suitcases and oversized bags",
          "Umbrellas, selfie sticks and other devices can pose a danger to the artwork",
        ],
      },
    },
    photography: {
      vi: {
        title: "QUY ĐỊNH VỀ CHỤP ẢNH VÀ QUAY PHIM",
        items: [
          "Không sử dụng đèn flash khi chụp ảnh",
          "Không sử dụng chân máy hoặc thiết bị ổn định",
          "Không chụp ảnh tại các khu vực có biển cấm",
          "Chỉ chụp ảnh cho mục đích cá nhân, không thương mại",
        ],
      },
      en: {
        title: "REGULATIONS ON PHOTOGRAPHY AND VIDEOGRAPHY",
        items: [
          "Do not use flash when taking pictures",
          "Do not use a tripod or stabilizer",
          "Do not take photos in prohibited areas",
          "Photography for personal use only, not commercial",
        ],
      },
    },
    behavior: {
      vi: {
        title: "QUY ĐỊNH VỀ HÀNH VI",
        items: [
          "Giữ khoảng cách tối thiểu 50cm với tác phẩm nghệ thuật",
          "Không chạm vào tác phẩm nghệ thuật và các thiết bị trưng bày",
          "Không gây ồn ào, la hét trong khuôn viên bảo tàng",
          "Tuân thủ hướng dẫn của nhân viên bảo tàng",
          "Giữ trật tự và không chen lấn khi xem tác phẩm",
        ],
      },
      en: {
        title: "RULES OF CONDUCT",
        items: [
          "Keep a minimum distance of 50cm from the artwork",
          "Do not touch artwork and display equipment",
          "Do not make noise or shout in the museum grounds",
          "Follow the instructions of museum staff",
          "Keep order and do not jostle when viewing the work",
        ],
      },
    },
    children: {
      vi: {
        title: "QUY ĐỊNH VỀ TRẺ EM",
        items: [
          "Trẻ em dưới 12 tuổi phải có người lớn đi kèm",
          "Không để trẻ em chạy nhảy trong khuôn viên bảo tàng",
          "Giám sát trẻ em để đảm bảo an toàn cho tác phẩm",
        ],
      },
      en: {
        title: "CHILDREN POLICY",
        items: [
          "Children under 12 years old must be accompanied by an adult",
          "Do not let children run around in the museum grounds",
          "Supervise children to ensure safety of work",
        ],
      },
    },
    residential: {
      vi: {
        title: "QUY ĐỊNH VỀ KHÁCH LƯU TRÚ",
        items: [
          "Hoàn tất thủ tục đăng kí trước khi nhận phòng, đọc kĩ các nội dung trong mẫu đăng kí",
          "Không đưa thêm người vào phòng vượt số người đã đăng kí",
          "Tiếp khách thăm viếng tại gian khánh tiết hoặc các không gian chung khác",
          "Tự bảo vệ tài sản cá nhân",
          "Không thay đổi xê dịch vị trí hiện vật, trang thiết bị",
          "Chịu trách nhiệm bồi thường mua lại hiện vật, trang thiết bị nguyên trạng nếu làm hỏng, vấy bẩn hay gãy vỡ",
          "Không nấu ăn giặt ủi trong phòng",
          "Bảo Tàng kêu gọi bảo vệ môi trường nên khuyến nghị không sử dụng túi nilon hay bàn chải đánh răng dùng 1 lần, bàn chải dùng nhiều lần có thể được mua tại quầy hỗ trợ",
          "Nước là nguồn tài nguyên quý giá của trái đất, để bảo vệ nguồn tài nguyên này, Bảo Tàng sẽ không thay ga, vỏ chăn vỏ gối và các loại khăn của quý khách trong thời gian lưu trú dưới 3 ngày. Các trường hợp có yêu cầu sẽ được tính phụ phí.",
          "Bảo Tàng sử dụng hệ thống hỗ trợ online nên khách lưu trú cần add Fb Mes, Zalo, Line hay Viber để được hỗ trợ.",
          "Bảo Tàng Thông hướng đến sứ mệnh bảo tồn thông và không khí trong lành nên không cung cấp máy điều hòa, nhưng các căn phòng được thiết kế và lắp đặt các thiết bị đặc biệt để đảm bảo nhiệt độ phòng luôn ở mức 22-25 độ. Quý khách lưu ý không được hút thuốc trong phòng.",
        ],
      },
      en: {
        title: "RESIDENTIAL REGULATIONS",
        items: [
          "Complete the registration procedure before checking in, read carefully the contents of the registration form",
          "Do not bring more people into the room than the registered number",
          "Receive visitors in the reception area or other common spaces",
          "Protect your personal property",
          "Do not change or move the location of artifacts or equipment",
          "Responsible for compensation and repurchase of original items and equipment if damaged, soiled or broken",
          "No cooking or laundry in the room",
          "The Museum calls for environmental protection so it recommends not using plastic bags or disposable toothbrushes, reusable toothbrushes can be purchased at the support counter",
          "Water is a precious resource of the earth, to protect this resource, the Museum will not change your sheets, duvet covers, pillowcases and towels during your stay of less than 3 days. Additional charges will be applied if requested",
          "The Museum uses an online support system, so guests need to add Facebook Messenger, Zalo, Line or Viber to get support",
          "Musée Du Pin aims to preserve pine and fresh air so it does not provide air conditioning, but the rooms are designed and equipped with special equipment to ensure the room temperature is always at 22-25 degrees. Please note that smoking is not allowed in the rooms",
        ],
      },
    },
    dress: {
      vi: {
        title: "TRANG PHỤC",
        items: [
          "Trang phục lịch sự, phù hợp với không gian văn hóa",
          "Không mang dép lê hoặc trang phục quá hở hang",
        ],
      },
      en: {
        title: "CLOTHES",
        items: [
          "Dress politely, suitable for cultural and artistic spaces",
          "At the reception area, change into separate shoes in the museum for guests staying or bring a cloth bag to cover shoes for guests not staying",
        ],
      },
    },
    violations: {
      vi: {
        title: "XỬ LÝ VI PHẠM",
        content:
          "Khách tham quan vi phạm các quy định trên có thể bị yêu cầu rời khỏi bảo tàng mà không được hoàn tiền vé. Trong trường hợp gây thiệt hại cho tác phẩm nghệ thuật, khách tham quan phải chịu trách nhiệm bồi thường theo quy định của pháp luật.",
      },
      en: {
        title: "HANDLING VIOLATIONS",
        content:
          "Visitors who violate the above regulations may be asked to leave the museum without refund. In case of damage to artifacts or works of art, visitors must be responsible for compensation in accordance with the law.",
      },
    },
  },
};

const VisitorRules = () => {
  const headerImage = getImageUrl("louvre-sunset.jpg");
  const { currentLang, registerTranslations } = useTranslation();
  const currentYear = new Date().getFullYear();
  const copyrightText = `© ${currentYear} - Musée Du Pin`;

  React.useEffect(() => {
    registerTranslations("visitorRules", translations);
  }, [registerTranslations]);

  return (
    <div className="visitor-rules-container">
      <Helmet>
        <title>{translations.meta[currentLang].title}</title>
        <meta
          name="description"
          content={translations.meta[currentLang].description}
        />
      </Helmet>

      <div className="rules-banner">
        <img
          src={headerImage}
          alt={currentLang === "en" ? "Musée Du Pin" : "Bảo tàng Du Pin"}
        />
        <div className="banner-overlay">
          <h1>{translations.header[currentLang]}</h1>
        </div>
      </div>

      <div className="rules-content">
        {/* General Rules Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.general[currentLang].title}</h2>
          <p>{translations.sections.general[currentLang].content}</p>
        </div>

        {/* Prohibited Items Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.prohibited[currentLang].title}</h2>
          <ul>
            {translations.sections.prohibited[currentLang].items.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* Photography Rules Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.photography[currentLang].title}</h2>
          <ul>
            {translations.sections.photography[currentLang].items.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* Behavior Rules Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.behavior[currentLang].title}</h2>
          <ul>
            {translations.sections.behavior[currentLang].items.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* Children Rules Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.children[currentLang].title}</h2>
          <ul>
            {translations.sections.children[currentLang].items.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* Residential Rules Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.residential[currentLang].title}</h2>
          <ul>
            {translations.sections.residential[currentLang].items.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* Dress Code Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.dress[currentLang].title}</h2>
          <ul>
            {translations.sections.dress[currentLang].items.map(
              (item, index) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </div>

        {/* Consequences Section */}
        <div className="section" data-copyright={copyrightText}>
          <h2>{translations.sections.violations[currentLang].title}</h2>
          <p>{translations.sections.violations[currentLang].content}</p>
        </div>
      </div>
    </div>
  );
};

export default VisitorRules;
