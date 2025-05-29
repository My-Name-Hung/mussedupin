import React from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import "./Copyrights.css";

// Import header image
import headerImage from "../../../assets/Home/Hero/louvre-sunset.webp";

const Copyrights = () => {
  return (
    <div className="copyrights-container">
      <Helmet>
        <title>Bản quyền | Bảo tàng Thông - Musée Du Pin</title>
        <meta
          name="description"
          content="Thông tin về bản quyền và quyền sở hữu trí tuệ của Bảo tàng Thông - Musée Du Pin."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="copyrights-banner">
        <img src={headerImage} alt="Bảo tàng Thông - Musée Du Pin" />
        <div className="banner-overlay">
          <h1>
            <TranslatedText>BẢN QUYỀN</TranslatedText>
          </h1>
        </div>
      </div>

      <div className="copyrights-content">
        {/* Introduction Section */}
        <div className="section">
          <h2>
            <TranslatedText>GIỚI THIỆU</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Trang web này và toàn bộ nội dung của nó thuộc quyền sở hữu của
              Bảo tàng Thông - Musée Du Pin. Mọi quyền sở hữu trí tuệ, bao gồm nhưng không
              giới hạn ở bản quyền, nhãn hiệu, và các quyền sở hữu trí tuệ khác
              đều được bảo vệ bởi pháp luật Việt Nam và các công ước quốc tế.
            </TranslatedText>
          </p>
        </div>

        {/* Protected Content Section */}
        <div className="section">
          <h2>
            <TranslatedText>NỘI DUNG ĐƯỢC BẢO VỆ</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Các nội dung được bảo vệ bản quyền bao gồm:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Hình ảnh và ảnh chụp của các tác phẩm nghệ thuật
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Văn bản, bài viết và nội dung biên tập
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Thiết kế đồ họa và giao diện người dùng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Tài liệu nghiên cứu và ấn phẩm khoa học
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Video, âm thanh và nội dung đa phương tiện
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Usage Rights Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUYỀN SỬ DỤNG</TranslatedText>
          </h2>
          <h3>
            <TranslatedText>Sử dụng được phép</TranslatedText>
          </h3>
          <ul>
            <li>
              <TranslatedText>
                Xem và truy cập nội dung cho mục đích cá nhân, phi thương mại
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Tải xuống và in ấn tài liệu cho mục đích nghiên cứu, giáo dục
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Chia sẻ liên kết đến trang web của bảo tàng
              </TranslatedText>
            </li>
          </ul>

          <h3>
            <TranslatedText>Hành vi bị cấm</TranslatedText>
          </h3>
          <ul>
            <li>
              <TranslatedText>
                Sao chép, phân phối hoặc sửa đổi nội dung mà không được phép
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Sử dụng nội dung cho mục đích thương mại
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Gỡ bỏ thông tin về bản quyền hoặc nguồn gốc
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Image Rights Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUYỀN SỬ DỤNG HÌNH ẢNH</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Hình ảnh trong bộ sưu tập của bảo tàng được phân loại theo các mức
              độ bảo vệ khác nhau:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Hình ảnh có dấu © Bảo tàng Thông - Musée Du Pin: Thuộc quyền sở hữu độc quyền
                của bảo tàng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Hình ảnh có dấu © Tác giả/Nghệ sĩ: Thuộc quyền sở hữu của tác
                giả hoặc người thừa kế
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Hình ảnh có giấy phép Creative Commons: Có thể sử dụng theo điều
                khoản của giấy phép
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Commercial Use Section */}
        <div className="section">
          <h2>
            <TranslatedText>SỬ DỤNG THƯƠNG MẠI</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Để sử dụng nội dung của bảo tàng cho mục đích thương mại, bạn cần:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Gửi yêu cầu bằng văn bản đến phòng Bản quyền của bảo tàng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Nêu rõ mục đích và phạm vi sử dụng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Đợi phê duyệt và ký kết thỏa thuận cấp phép
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>Thanh toán phí bản quyền (nếu có)</TranslatedText>
            </li>
          </ul>
        </div>

        {/* Academic Use Section */}
        <div className="section">
          <h2>
            <TranslatedText>SỬ DỤNG HỌC THUẬT</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Đối với mục đích học thuật và nghiên cứu, bảo tàng có chính sách
              ưu đãi:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Miễn phí sử dụng hình ảnh độ phân giải thấp cho luận văn, nghiên
                cứu
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Giảm giá cho việc sử dụng hình ảnh chất lượng cao trong ấn phẩm
                học thuật
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Hỗ trợ tiếp cận tài liệu nghiên cứu và thông tin chi tiết
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Violation and Enforcement Section */}
        <div className="section">
          <h2>
            <TranslatedText>VI PHẠM VÀ XỬ LÝ</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Bảo tàng Thông - Musée Du Pin nghiêm túc xử lý mọi hành vi vi phạm bản quyền:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Gửi thông báo yêu cầu ngừng vi phạm
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>Yêu cầu bồi thường thiệt hại</TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Thực hiện các biện pháp pháp lý cần thiết
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="section">
          <h2>
            <TranslatedText>LIÊN HỆ</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Mọi thắc mắc về bản quyền hoặc yêu cầu sử dụng nội dung, vui lòng
              liên hệ:
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Phòng Bản quyền - Bảo tàng Thông - Musée Du Pin
              <br />
              Email: copyright@dupin.vn
              <br />
              Điện thoại: XXX XXX XXX
              <br />
              Địa chỉ: XXX XXX XXX
            </TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Copyrights;
