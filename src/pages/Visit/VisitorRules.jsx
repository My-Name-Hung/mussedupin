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

                {/* Children Rules Section */}
        <div className="section">
          <h2>QUY ĐỊNH VỀ KHÁCH LƯU TRÚ</h2>
          <ul>
            <li>Hoàn tất thủ tục đăng kí trước khi nhận phòng, đọc kĩ các nội dung trong mẫu đăng kí</li>
            <li>Không đưa thêm người vào phòng vượt số người đã đăng kí</li>
            <li>Tiếp khách thăm viếng tại gian khánh tiết hoặc các không gian chung khác</li>
            <li>Tự bảo vệ tài sản cá nhân</li>
            <li>Không thay đổi xê dịch vị trí hiện vật, trang thiết bị</li>
            <li>Chịu trách nhiệm bồi thường mua lại hiện vật, trang thiết bị nguyên trạng nếu làm hỏng, vấy bẩn hay gãy vỡ</li>
            <li>Không nấu ăn giặt ủi trong phòng</li>
            <li>Bảo Tàng kêu gọi bảo vệ môi trường nên khuyến nghị không sử dụng túi nilon hay bàn chải đánh răng dùng 1 lần, bàn chải dùng nhiều lần có thể được mua tại quầy hỗ trợ</li>
            <li>Nước là nguồn tài nguyên quý giá của trái đất, để bảo vệ nguồn tài nguyên này, Bảo Tàng sẽ không thay ga, vỏ chăn vỏ gối và các loại khăn của quý khách trong thời gian lưu trú dưới 3 ngày. Các trường hợp có yêu cầu sẽ được tính phụ phí.</li>
            <li>Bảo Tàng sử dụng hệ thống hỗ trợ online nên khách lưu trú cần add Fb Mes, Zalo, Line hay Viber để được hỗ trợ.</li>
            <li>Bảo Tàng Thông hướng đến sứ mệnh bảo tồn thông và không khí trong lành nên không cung cấp máy điều hòa, nhưng các căn phòng được thiết kế và lắp đặt các thiết bị đặc biệt để đảm bảo nhiệt độ phòng luôn ở mức 22-25 độ. Quý khách lưu ý không được hút thuốc trong phòng.</li>
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
