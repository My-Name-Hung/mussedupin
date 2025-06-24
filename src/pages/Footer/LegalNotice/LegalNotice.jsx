import React from "react";
import { Helmet } from "react-helmet";
import "./LegalNotice.css";

// Import header image

const LegalNotice = () => {
  return (
    <div className="legal-notice-container">
      <Helmet>
        <title>Điều khoản pháp lý | Bảo tàng Du Pin</title>
        <meta
          name="description"
          content="Thông tin pháp lý và điều khoản sử dụng cho website Bảo tàng Du Pin."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="legal-banner">
        <img
          src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784642/collections/louvre-sunset.jpg"
          alt="Bảo tàng Du Pin"
        />
        <div className="banner-overlay">
          <h1>ĐIỀU KHOẢN PHÁP LÝ</h1>
        </div>
      </div>

      <div className="legal-content">
        {/* Publishing Section */}
        <div className="section">
          <h2>THÔNG TIN XUẤT BẢN</h2>
          <p>
            <span className="notranslate">Musée Du Pin</span>, Bảo tàng Thông,
            <br />
            MST: 0106157152-001
            <br />
            Địa chỉ: 29-31 Đống Đa, phường 3, tp. Đà Lạt, Lâm Đồng
            <br />
            Điện thoại: +84 2633 818 968; +84 86 235 6368
            <br />
            Giám đốc xuất bản: <span className="notranslate">Musée Du Pin</span>
          </p>
        </div>

        {/* Website Content Section */}
        <div className="section">
          <h2>NỘI DUNG WEBSITE</h2>
          <p>
            <span className="notranslate">Musée Du Pin</span>
            <br />
            Phòng Sản xuất Kỹ thuật số và Nghe nhìn
            <br />
            29-31 Đống Đa, phường 3, Đà Lạt
            <br />
            baotangthong2024@gmail.com
          </p>
        </div>

        {/* Intellectual Property Section */}
        <div className="section">
          <h2>QUYỀN SỞ HỮU TRÍ TUỆ</h2>
          <h3>Phát triển website</h3>
          <p>
            Cấu trúc chung của website này là tài sản độc quyền của Bảo tàng Du
            Pin. Mọi hình thức sao chép, trình bày, toàn bộ hoặc một phần, sử
            dụng, điều chỉnh, cung cấp hoặc sửa đổi bằng bất kỳ quy trình, cá
            nhân và phương tiện nào (đặc biệt là bán, tiếp thị, cho thuê, v.v.)
            mà không có sự cho phép rõ ràng của bảo tàng, bất kỳ tác giả hoặc
            chủ sở hữu quyền nào đều bị nghiêm cấm và cấu thành vi phạm Bộ luật
            Sở hữu Trí tuệ.
          </p>

          <h3>Nội dung Website</h3>
          <p>
            Theo luật sở hữu trí tuệ, nội dung khoa học, văn hóa và giáo dục
            (bao gồm nhưng không giới hạn ở văn bản, hình ảnh, ảnh chụp, bản ghi
            âm và tài liệu nghe nhìn và đa phương tiện) của website này là tài
            sản của Bảo tàng Du Pin.
          </p>
          <p>
            Do đó, mọi hình thức sao chép, trình bày, toàn bộ hoặc một phần, sử
            dụng, điều chỉnh, cung cấp hoặc sửa đổi nội dung này bằng bất kỳ quy
            trình, cá nhân và phương tiện nào (đặc biệt là bán, tiếp thị, cho
            thuê, v.v.) mà không có sự cho phép rõ ràng của tác giả hoặc chủ sở
            hữu quyền đều bị nghiêm cấm và cấu thành vi phạm Bộ luật Sở hữu Trí
            tuệ.
          </p>

          <h3>Hình ảnh</h3>
          <p>
            Hình ảnh có ghi © Musée du Pin / [...] là tài sản độc quyền của Bảo
            tàng Du Pin và được Bảo tàng Du Pin sử dụng với sự cho phép của tác
            giả hoặc chủ sở hữu quyền.
          </p>
          <p>
            Hình ảnh có ghi © Tác giả, Musée du Pin / [...] là tài sản của Tác
            giả. Việc tái sử dụng phi thương mại được cho phép, với điều kiện
            phải ghi nhận nguồn gốc và tác giả.
          </p>
          <p>
            Đối với bất kỳ việc tái sử dụng thương mại và/hoặc biên tập lại hình
            ảnh từ bộ sưu tập của Bảo tàng Thông và các Phòng trưng bày Quốc gia
            khác, vui lòng liên hệ với Bảo Tàng qua hotline: +84 86 235 6368
            hoặc gửi email đến hộp thư: baotangthong2024@gmail.com
          </p>

          <h3>Thương hiệu và logo</h3>
          <p>
            Các thương hiệu của Bảo Tàng Thông và đối tác của nó, cũng như các
            logo hiển thị trên trang web, đã được đăng ký với Cục Sở Hữu Trí Tuệ
            Việt Nam.
          </p>
          <p>
            Mọi hình thức sao chép, toàn bộ hoặc một phần, các thương hiệu
            và/hoặc logo này được tạo ra từ các yếu tố của website mà không có
            sự cho phép rõ ràng của chủ sở hữu đều bị nghiêm cấm và cấu thành vi
            phạm Bộ luật Sở hữu Trí tuệ.
          </p>
        </div>

        {/* Public Sector Information Section */}
        <div className="section">
          <h2>THÔNG TIN KHU VỰC CÔNG</h2>
          <p>
            Nội dung thông tin và lập trình trên website này là thông tin bản
            quyền. Thông tin này có thể được tái sử dụng, với điều kiện không bị
            thay đổi, không bị bóp méo ý nghĩa và phải ghi rõ nguồn gốc và ngày
            cập nhật gần nhất.
          </p>
          <p>
            Quyền đối với thông tin khu vực công hành chính không được chuyển
            giao cho người tái sử dụng.
          </p>
        </div>

        {/* Hypertext Links Section */}
        <div className="section">
          <h2>LIÊN KẾT SIÊU VĂN BẢN</h2>
          <p>
            Website Bảo tàng Thông (www.museedupin.com) cho phép sử dụng liên
            kết siêu văn bản đến nội dung của mình với điều kiện:
          </p>
          <ul>
            <li>
              Không sử dụng liên kết sâu, nghĩa là các trang từ website Bảo tàng
              Thông, không được nhúng trong các trang của một trang web khác, mà
              phải được mở trong cửa sổ mải ghi rõ nguồn gốc khi liên kết siêu
              văn bản dẫn trực tiếp đến nội dung.
            </li>
          </ul>
          <p>
            Thông tin chỉ được sử dụng cho mục đích cá nhân, hiệp hội hoặc
            chuyên môn; mọi sử dụng cho mục đích thương mại hoặc quảng cáo đều
            bị nghiêm cấm.
          </p>
          <p>
            Không cấp phép cho các website có nội dung được coi là xúc phạm nhân
            phẩm, trật tự công cộng hoặc đạo đức công cộng.
          </p>
        </div>

        {/* Liability Section */}
        <div className="section">
          <h2>TRÁCH NHIỆM PHÁP LÝ</h2>
          <p>
            Bảo tàng Thông nỗ lực hết sức để đảm bảo thông tin trên website
            www.museedupin.com luôn sẵn có, chính xác và cập nhật, và có quyền
            sửa đổi thông tin bất cứ lúc nào mà không cần thông báo trước. Tuy
            nhiên, Bảo tàng Thông không thể đảm bảo tính sẵn có, chính xác, thời
            sự hoặc đầy đủ của thông tin được trình bày. Việc sử dụng thông tin
            có sẵn hoặc được cung cấp trên website này là trách nhiệm của người
            dùng.
          </p>
          <p>
            Bảo tàng Du Pin không chịu trách nhiệm về nội dung của các trang web
            này, và sẽ không chịu trách nhiệm về bất kỳ thiệt hại hoặc tổn
            thương nào phát sinh từ chúng. Các liên kết đến các trang web khác
            chỉ được cung cấp cho người dùng để thuận tiện.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
