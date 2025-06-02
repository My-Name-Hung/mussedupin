import React from "react";
import { FaFileDownload } from "react-icons/fa";
import "./ArtStay.css";

const ARTSTAY_IMAGE =
  "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748841943/collections/luutrunghethuat.jpg";
const PDF_LINK =
  "https://docs.google.com/forms/d/e/1FAIpQLScvCQ5gjYPldSRI43U9qN0tGlk4Pl-nCd71rlpUb57UJF2Fog/viewform";

const ArtStay = () => {
  return (
    <div className="artstay-container">
      <h1 className="artstay-title">Lưu trú nghệ thuật tại Musée Du Pin</h1>
      <img src={ARTSTAY_IMAGE} alt="Lưu trú nghệ thuật" loading="lazy" />

      <div className="intro-section">
        <h2>Thư ngỏ</h2>
        <p>
          Chào mừng bạn đến với trải nghiệm lưu trú nghệ thuật độc đáo tại các
          căn phòng của bảo tàng Thông - Musée Du Pin. Mỗi căn phòng là một
          không gian nghệ thuật sống động, nơi bạn có thể hòa mình vào không khí
          sáng tạo, cảm nhận giá trị lịch sử và nghệ thuật độc đáo của từng hiện
          vật.
        </p>
        <p>
          Chúng tôi mong muốn mang đến cho bạn một đêm lưu trú đáng nhớ, đầy cảm
          hứng và an toàn, nơi nghệ thuật và cuộc sống giao hòa trong một không
          gian đậm chất Đà Lạt.
        </p>
      </div>

      <div className="rules-section">
        <h2>Quy định lưu trú</h2>
        <ul>
          <li>Không hút thuốc trong phòng và khu vực bảo tàng</li>
          <li>
            Không làm hỏng, di chuyển hoặc chạm vào hiện vật đang trưng bày
          </li>
          <li>Không mang thức ăn, đồ uống vào phòng trưng bày</li>
          <li>Giữ gìn vệ sinh, trật tự và tôn trọng không gian chung</li>
          <li>
            Mọi hành vi vi phạm quy chế sẽ bị xử lý theo quy định của bảo tàng
          </li>
        </ul>
      </div>

      <a
        href={PDF_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="pdf-link"
      >
        <FaFileDownload /> Tải tài liệu chi tiết về căn phòng
      </a>

      <h2>Đăng ký trải nghiệm lưu trú</h2>

      <iframe
        src="https://docs.google.com/forms/d/e/1FAIpQLScvCQ5gjYPldSRI43U9qN0tGlk4Pl-nCd71rlpUb57UJF2Fog/viewform?embedded=true"
        width="100%"
        height="1200"
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="Đăng ký lưu trú"
      >
        Đang tải...
      </iframe>
    </div>
  );
};

export default ArtStay;
