import React from "react";
import { Helmet } from "react-helmet";
import { getImageUrl } from "../../utils/cloudinary";
import "./VisitorRules.css";

const VisitorRules = () => {
  const headerImage = getImageUrl("louvre-sunset.jpg");
  return (
    <div className="visitor-rules-container">
      <Helmet>
        <title>Nội quy tham quan | Bảo tàng Du Pin</title>
        <meta
          name="description"
          content="Nội quy và quy định tham quan dành cho khách tham quan Bảo tàng Du Pin."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="rules-banner">
        <img src={headerImage} alt="Bảo tàng Du Pin" />
        <div className="banner-overlay">
          <h1>NỘI QUY THAM QUAN</h1>
        </div>
      </div>

      <div className="rules-content">
        {/* General Rules Section */}
        <div className="section">
          <h2>QUY ĐỊNH CHUNG</h2>
          <p>
            Để đảm bảo trải nghiệm tham quan tốt nhất cho tất cả du khách và bảo
            vệ các tác phẩm nghệ thuật, quý khách vui lòng tuân thủ các quy định
            sau đây khi tham quan Bảo tàng Du Pin.
          </p>
        </div>

        {/* Prohibited Items Section */}
        <div className="section">
          <h2>VẬT DỤNG KHÔNG ĐƯỢC MANG VÀO BẢO TÀNG</h2>
          <ul>
            <li>Thức ăn và đồ uống các loại</li>
            <li>Thuốc lá, thuốc lá điện tử và các sản phẩm tương tự</li>
            <li>Vũ khí, chất nổ và các vật sắc nhọn</li>
            <li>Balo cỡ lớn, vali và túi xách quá khổ</li>
            <li>
              Dù, gậy selfie và các thiết bị có thể gây nguy hiểm cho tác phẩm
            </li>
          </ul>
        </div>

        {/* Photography Rules Section */}
        <div className="section">
          <h2>QUY ĐỊNH VỀ CHỤP ẢNH VÀ QUAY PHIM</h2>
          <ul>
            <li>Không sử dụng đèn flash khi chụp ảnh</li>
            <li>Không sử dụng chân máy hoặc thiết bị ổn định</li>
            <li>Không chụp ảnh tại các khu vực có biển cấm</li>
            <li>Chỉ chụp ảnh cho mục đích cá nhân, không thương mại</li>
          </ul>
        </div>

        {/* Behavior Rules Section */}
        <div className="section">
          <h2>QUY ĐỊNH VỀ HÀNH VI</h2>
          <ul>
            <li>Giữ khoảng cách tối thiểu 50cm với tác phẩm nghệ thuật</li>
            <li>
              Không chạm vào tác phẩm nghệ thuật và các thiết bị trưng bày
            </li>
            <li>Không gây ồn ào, la hét trong khuôn viên bảo tàng</li>
            <li>Tuân thủ hướng dẫn của nhân viên bảo tàng</li>
            <li>Giữ trật tự và không chen lấn khi xem tác phẩm</li>
          </ul>
        </div>

        {/* Children Rules Section */}
        <div className="section">
          <h2>QUY ĐỊNH VỀ TRẺ EM</h2>
          <ul>
            <li>Trẻ em dưới 12 tuổi phải có người lớn đi kèm</li>
            <li>Không để trẻ em chạy nhảy trong khuôn viên bảo tàng</li>
            <li>Giám sát trẻ em để đảm bảo an toàn cho tác phẩm</li>
          </ul>
        </div>

        {/* Dress Code Section */}
        <div className="section">
          <h2>TRANG PHỤC</h2>
          <ul>
            <li>Trang phục lịch sự, phù hợp với không gian văn hóa</li>
            <li>Không mang dép lê hoặc trang phục quá hở hang</li>
          </ul>
        </div>

        {/* Consequences Section */}
        <div className="section">
          <h2>XỬ LÝ VI PHẠM</h2>
          <p>
            Khách tham quan vi phạm các quy định trên có thể bị yêu cầu rời khỏi
            bảo tàng mà không được hoàn tiền vé. Trong trường hợp gây thiệt hại
            cho tác phẩm nghệ thuật, khách tham quan phải chịu trách nhiệm bồi
            thường theo quy định của pháp luật.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorRules;
