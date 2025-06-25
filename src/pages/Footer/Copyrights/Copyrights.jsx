import React from "react";
import { Helmet } from "react-helmet";
import "./Copyrights.css";

// Import header image

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
        <img
          src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784642/collections/louvre-sunset.jpg"
          alt="Bảo tàng Thông - Musée Du Pin"
        />
        <div className="banner-overlay">
          <h1>BẢN QUYỀN</h1>
        </div>
      </div>

      <div className="copyrights-content">
        {/* Introduction Section */}
        <div className="section">
          <h2>GIỚI THIỆU</h2>
          <p>
            Trang web này và toàn bộ nội dung của nó thuộc quyền sở hữu của Bảo
            tàng Thông - Musée Du Pin. Mọi quyền sở hữu trí tuệ, bao gồm nhưng
            không giới hạn ở bản quyền, nhãn hiệu, và các quyền sở hữu trí tuệ
            khác đều được bảo vệ bởi pháp luật Việt Nam và các công ước quốc tế.
          </p>
        </div>

        {/* Protected Content Section */}
        <div className="section">
          <h2>NỘI DUNG ĐƯỢC BẢO VỆ</h2>
          <p>Các nội dung được bảo vệ bản quyền bao gồm:</p>
          <ul>
            <li>Hình ảnh và ảnh chụp của các tác phẩm nghệ thuật</li>
            <li>Văn bản, bài viết và nội dung biên tập</li>
            <li>Thiết kế đồ họa và giao diện người dùng</li>
            <li>Tài liệu nghiên cứu và ấn phẩm khoa học</li>
            <li>Video, âm thanh và nội dung đa phương tiện</li>
          </ul>
        </div>

        {/* Usage Rights Section */}
        <div className="section">
          <h2>QUYỀN SỬ DỤNG</h2>
          <h3>Sử dụng được phép</h3>
          <ul>
            <li>
              Xem và truy cập nội dung cho mục đích cá nhân, phi thương mại
            </li>
            <li>
              Tải xuống và in ấn tài liệu cho mục đích nghiên cứu, giáo dục
            </li>
            <li>Chia sẻ liên kết đến trang web của bảo tàng</li>
          </ul>

          <h3>Hành vi bị cấm</h3>
          <ul>
            <li>
              Sao chép, phân phối hoặc sửa đổi nội dung mà không được phép
            </li>
            <li>Sử dụng nội dung cho mục đích thương mại</li>
            <li>Gỡ bỏ thông tin về bản quyền hoặc nguồn gốc</li>
          </ul>
        </div>

        {/* Image Rights Section */}
        <div className="section">
          <h2>QUYỀN SỬ DỤNG HÌNH ẢNH</h2>
          <p>
            Hình ảnh trong bộ sưu tập của bảo tàng được phân loại theo các mức
            độ bảo vệ khác nhau:
          </p>
          <ul>
            <li>
              Hình ảnh có dấu © Bảo tàng Thông - Musée Du Pin: Thuộc quyền sở
              hữu độc quyền của bảo tàng
            </li>
            <li>
              Hình ảnh có dấu © Tác giả/Nghệ sĩ: Thuộc quyền sở hữu của tác giả
              hoặc người thừa kế
            </li>
            <li>
              Hình ảnh có giấy phép: Có thể sử dụng theo điều khoản của giấy
              phép
            </li>
          </ul>
        </div>

        {/* Commercial Use Section */}
        <div className="section">
          <h2>SỬ DỤNG THƯƠNG MẠI</h2>
          <p>
            Để sử dụng nội dung của bảo tàng cho mục đích thương mại, bạn cần:
          </p>
          <ul>
            <li>Gửi yêu cầu bằng văn bản đến phòng Bản quyền của bảo tàng</li>
            <li>Nêu rõ mục đích và phạm vi sử dụng</li>
            <li>Đợi phê duyệt và ký kết thỏa thuận cấp phép</li>
            <li>Thanh toán phí bản quyền (nếu có)</li>
          </ul>
        </div>

        {/* Academic Use Section */}
        <div className="section">
          <h2>SỬ DỤNG HỌC THUẬT</h2>
          <p>
            Đối với mục đích học thuật và nghiên cứu, bảo tàng có chính sách ưu
            đãi:
          </p>
          <ul>
            <li>
              Miễn phí sử dụng hình ảnh độ phân giải thấp cho luận văn, nghiên
              cứu
            </li>
            <li>
              Giảm giá cho việc sử dụng hình ảnh chất lượng cao trong ấn phẩm
              học thuật
            </li>
            <li>Hỗ trợ tiếp cận tài liệu nghiên cứu và thông tin chi tiết</li>
          </ul>
        </div>

        {/* Violation and Enforcement Section */}
        <div className="section">
          <h2>VI PHẠM VÀ XỬ LÝ</h2>
          <p>
            Bảo tàng Thông - Musée Du Pin nghiêm túc xử lý mọi hành vi vi phạm
            bản quyền:
          </p>
          <ul>
            <li>Gửi thông báo yêu cầu ngừng vi phạm</li>
            <li>Yêu cầu bồi thường thiệt hại</li>
            <li>Thực hiện các biện pháp pháp lý cần thiết</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="section">
          <h2>LIÊN HỆ</h2>
          <p>
            Mọi thắc mắc về bản quyền hoặc yêu cầu sử dụng nội dung, vui lòng
            liên hệ:
          </p>
          <p>
            Phòng Bản quyền - Bảo tàng Thông - Musée Du Pin
            <br />
            Email: baotangthong2024@gmail.com
            <br />
            Điện thoại: +84 2633 818 968; +84 86 235 6368
            <br />
            Địa chỉ: 29-31 Đống Đa, phường 3, tp. Đà Lạt, Lâm Đồng
          </p>
        </div>
      </div>
    </div>
  );
};

export default Copyrights;
