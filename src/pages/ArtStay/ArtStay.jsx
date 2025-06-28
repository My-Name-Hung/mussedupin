import React from "react";
import { useTranslation } from "react-i18next";
import { FaExternalLinkAlt, FaWpforms } from "react-icons/fa";
import "./ArtStay.css";

const ARTSTAY_IMAGE =
  "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932455/hiavdsldaipshiwsfq8s.png";
const FORM_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLScvCQ5gjYPldSRI43U9qN0tGlk4Pl-nCd71rlpUb57UJF2Fog/viewform";

const ArtStay = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const getMuseumName = () => {
    return currentLang === "vi" ? "Bảo tàng Thông" : "Musée Du Pin";
  };

  const scrollToForm = () => {
    const iframe = document.querySelector(".registration-iframe");
    if (iframe) {
      iframe.scrollIntoView({ behavior: "smooth" });
    }
  };

  const museumName = getMuseumName();

  return (
    <div className="artstay-container">
      <h1 className="artstay-title">
        {t("artstay.title", "LƯU TRÚ NGHỆ THUẬT")}
      </h1>
      <img
        src={ARTSTAY_IMAGE}
        alt={t("artstay.imageAlt", "Lưu trú nghệ thuật")}
        loading="lazy"
      />

      <div className="intro-section">
        <p className="greeting">
          {t("artstay.greeting", "Kính gửi các nghệ sỹ trên khắp thế giới,")}
        </p>
        <p>
          {t(
            "artstay.intro1",
            "Chúng ta đang sống trong một thời đại mà thiên nhiên đang cần chung tay gìn giữ, và những giá trị văn hóa cần được phát huy trong nhịp sống hiện đại. Chính vì vậy, chương trình MDP-AR ra đời – như một lời mời gọi, một tiếng vọng từ đại ngàn: hãy dừng lại để lắng nghe thiên nhiên, để cảm nhận cái đẹp, và để sáng tạo từ những điều sâu thẳm nhất của đất trời."
          )}
        </p>
        <p>
          {t(
            "artstay.intro2",
            "Chúng tôi tin rằng nghệ thuật không nên chỉ ở trong khung tranh hay phòng triển lãm. Nghệ thuật phải có hơi thở, phải có cuộc sống – và phải có trách nhiệm."
          )}
        </p>
        <p>
          {t(
            "artstay.intro3",
            "Chúng tôi mong rằng mỗi tác phẩm ra đời tại đây sẽ là một tiếng nói, một lời thủ thỉ chân thành – để gìn giữ những điều đang dần biến mất."
          )}
        </p>
      </div>

      <div className="location-section">
        <h2>{t("artstay.locationTitle", "1.1. ĐỊA ĐIỂM - VỊ TRÍ")}</h2>
        <p>
          {t(
            "artstay.location",
            `Tọa lạc ngay trung tâm thành phố, chỉ cách chợ đêm 1.2km, ${museumName} sở hữu vị trí đắc địa, thuận tiện để các nghệ sĩ di chuyển, khám phá những cảnh sắc đặc trưng của Đà Lạt. Từ đây, chỉ mất vài phút để đến Hồ Xuân Hương mờ sương hay Hồ Tuyền Lâm yên ả, những không gian lý tưởng cho những chuyến điền dã đầy cảm hứng.`,
            { museumName }
          )}
        </p>
      </div>

      <div className="about-sections">
        <h2>
          {t("artstay.aboutTitle", "1.2. GIỚI THIỆU VỀ NƠI LƯU TRÚ NGHỆ THUẬT")}
        </h2>
        <p>
          {t(
            "artstay.about1",
            'Chúng tôi gọi nơi này là "nơi lưu trú nghệ thuật" – không phải vì nó có những tiện nghi cao cấp, mà vì mỗi căn phòng ở đây là một không gian sống cùng nghệ thuật.'
          )}
        </p>
        <p>
          {t(
            "artstay.about2",
            `Tòa nhà Musée Du Pin là mô hình duy nhất tại Việt Nam, nơi nghệ thuật không chỉ được trưng bày mà còn được sống cùng. Các nghệ sỹ sẽ lưu trú sáng tác trong các căn art studio của ${museumName}, nơi nghệ thuật, thiên nhiên như hòa làm một. Mỗi căn phòng là một câu chuyện, mỗi ô cửa mở ra một khung cảnh đặc trưng. Từng đường nét kiến trúc được tính toán tinh tế, đưa thiên nhiên len lỏi vào không gian, để cảm xúc sáng tác của nghệ sĩ được thăng hoa một cách tự nhiên nhất.`,
            { museumName }
          )}
        </p>
      </div>

      <div className="exhibition-section">
        <h2>
          {t(
            "artstay.exhibitionTitle",
            "1.3. KHÔNG GIAN TRIỂN LÃM NGHỆ THUẬT ĐA TẦNG"
          )}
        </h2>
        <p>
          {t(
            "artstay.exhibition",
            `Những tác phẩm sáng tác tại đây sẽ được trưng bày trong chính các căn phòng nghệ thuật mà tác giả lưu trú, dọc theo các tuyến hành lang, tại sảnh chuyên đề hay trong khu vườn đầy cảm xúc. Bên cạnh đó, những không gian đặc biệt như Nhà Mắt Thông – nơi nghệ thuật giao thoa với thiên nhiên, sân khấu Pin d'amour - khu đấu giá tác phẩm, sảnh nhạc, phòng đọc sách và những buổi talk show nghệ thuật sẽ giúp nghệ sĩ kết nối và lan tỏa những giá trị sáng tạo của mình. ${museumName} không chỉ là một nơi dừng chân, mà còn là nơi cảm xúc thăng hoa, nơi nghệ thuật tìm thấy thanh âm của riêng mình.`,
            { museumName }
          )}
        </p>
      </div>

      <div className="conditions-section">
        <h2>{t("artstay.conditionsTitle", "1.2. ĐIỀU KIỆN THAM DỰ")}</h2>
        <p>
          {t(
            "artstay.conditionsIntro",
            "Chương trình mở rộng cho nghệ sĩ trên khắp thế giới"
          )}
        </p>
        <ul>
          <li>
            {t(
              "artstay.conditions1",
              "Nghệ sĩ đăng kí: Nghệ sĩ điền vào mẫu đăng kí theo link đính kèm cuối trang."
            )}
          </li>
          <li>
            {t(
              "artstay.conditions2",
              "Nghệ sĩ khách mời: Mỗi kỳ, MDP-AR có thể mời một số nghệ sĩ đặc biệt đến lưu trú và sáng tác."
            )}
          </li>
        </ul>
      </div>

      <div className="program-time-section">
        <h2>
          {t("artstay.programTimeTitle", "1.3. THỜI GIAN TỔ CHỨC CHƯƠNG TRÌNH")}
        </h2>
        <ul>
          <li>
            {t(
              "artstay.programTime1",
              "Chương trình được tổ chức theo chủ đề tự do hoặc chủ đề do MDP-AR đưa ra."
            )}
          </li>
          <li>
            {t(
              "artstay.programTime2",
              "Nghệ sỹ có thể đăng kí tham gia lưu trú sáng tác trong bất kì thời điểm nào của chương trình"
            )}
          </li>
          <li>
            {t(
              "artstay.programTime3",
              "Các nghệ sĩ sau khi hoàn thành tác phẩm có thể triển lãm ngay hoặc được sắp xếp cho các kì triển lãm tiếp theo"
            )}
          </li>
        </ul>
      </div>

      <div className="services-section">
        <h2>{t("artstay.servicesTitle", "1.4. CÁC DỊCH VỤ KÈM THEO")}</h2>
        <ul>
          <li>
            {t("artstay.services1", "Phương tiện di chuyển (xe máy, oto).")}
          </li>
          <li>
            {t(
              "artstay.services2",
              "Hỗ trợ in ấn, tổ chức triển lãm, đấu giá sau chương trình."
            )}
          </li>
          <li>
            {t("artstay.services3", "Chỗ ở cho thân nhân hoặc bạn bè đi cùng.")}
          </li>
          <li>
            {t(
              "artstay.services4",
              "Dịch vụ ăn uống, giặt ủi, chăm sóc sức khỏe"
            )}
          </li>
        </ul>
      </div>

      <div className="sponsorship-section">
        <h2>{t("artstay.sponsorshipTitle", "1.5. CÁC MỨC TÀI TRỢ")}</h2>
        <ul>
          <li>
            {t(
              "artstay.sponsorship1",
              `Tài trợ kim cương: tài trợ 70% chi phí ở tại ${museumName}.`,
              { museumName }
            )}
          </li>
          <li>
            {t(
              "artstay.sponsorship2",
              `Tài trợ vàng: tài trợ 50% chi phí ở tại ${museumName}.`,
              { museumName }
            )}
          </li>
          <li>
            {t(
              "artstay.sponsorship3",
              `Tài trợ bạc: tài trợ 30% chi phí ở tại ${museumName}.`,
              { museumName }
            )}
          </li>
        </ul>
      </div>

      <div className="closing-section">
        <p>
          <em>
            {t(
              "artstay.closing1",
              "MDP-AR ra đời với mong muốn khơi dậy tình yêu thiên nhiên, thúc đẩy đối thoại giữa nghệ thuật và môi trường, giữa nghệ sĩ và cộng đồng."
            )}
          </em>
        </p>
        <p>
          <em>
            {t(
              "artstay.closing2",
              "Mỗi nghệ sĩ là một thế giới, và mỗi người tham dự đều có những góc nhìn và cảm xúc riêng biệt. Chúng tôi tin rằng, cuộc gặp gỡ này là dịp tạo ra những tác phẩm bất hủ và mở ra nhiều cuộc đối thoại sâu sắc."
            )}
          </em>
        </p>
      </div>

      <div className="registration-section">
        <h2>{t("artstay.registrationTitle", "Đăng ký trải nghiệm lưu trú")}</h2>
        <div className="registration-buttons">
          <a
            href={FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="registration-link"
          >
            <FaExternalLinkAlt />{" "}
            {t("artstay.openFormNewTab", "Mở form trong tab mới")}
          </a>
          <button onClick={scrollToForm} className="registration-link">
            <FaWpforms /> {t("artstay.fillFormHere", "Điền form tại đây")}
          </button>
        </div>
      </div>

      <iframe
        className="registration-iframe"
        src={FORM_LINK}
        width="100%"
        height="1200"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title={t("artstay.iframeTitle", "Đăng ký lưu trú")}
      >
        {t("artstay.loading", "Đang tải...")}
      </iframe>
    </div>
  );
};

export default ArtStay;
