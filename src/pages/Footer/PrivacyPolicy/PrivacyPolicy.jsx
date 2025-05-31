import React from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import { useAssets } from "../../../hooks/useAssets";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const { assets, loading, error, getAssetUrl } = useAssets();
  // Find the header image by filename
  const headerAsset = assets.find((a) => a.filename === "louvre-sunset.webp");

  return (
    <div className="privacy-policy-container">
      <Helmet>
        <title>Chính sách bảo mật | Bảo tàng Thông - Musée Du Pin</title>
        <meta
          name="description"
          content="Chính sách bảo mật và quy định về bảo vệ dữ liệu cá nhân của Bảo tàng Thông - Musée Du Pin."
        />
      </Helmet>

      {/* Header Banner */}
      <div className="privacy-banner">
        {loading && <div>Đang tải ảnh...</div>}
        {error && <div>Lỗi tải ảnh: {error}</div>}
        {headerAsset && !loading && !error && (
          <img
            src={headerAsset.url || getAssetUrl(headerAsset.filename)}
            alt="Bảo tàng Thông - Musée Du Pin"
          />
        )}
        <div className="banner-overlay">
          <h1>
            <TranslatedText>CHÍNH SÁCH BẢO MẬT</TranslatedText>
          </h1>
        </div>
      </div>

      <div className="privacy-content">
        {/* Introduction Section */}
        <div className="section">
          <h2>
            <TranslatedText>GIỚI THIỆU</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Bảo tàng Thông - Musée Du Pin cam kết bảo vệ quyền riêng tư và dữ
              liệu cá nhân của quý khách. Chính sách bảo mật này mô tả cách
              chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của quý
              khách khi truy cập website và sử dụng dịch vụ của bảo tàng.
            </TranslatedText>
          </p>
        </div>

        {/* Data Collection Section */}
        <div className="section">
          <h2>
            <TranslatedText>THU THẬP DỮ LIỆU</TranslatedText>
          </h2>
          <h3>
            <TranslatedText>Thông tin chúng tôi thu thập</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Chúng tôi thu thập các thông tin sau khi quý khách cung cấp:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Thông tin cá nhân (họ tên, email, số điện thoại)
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Thông tin thanh toán khi mua vé hoặc sản phẩm
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Thông tin đăng ký tham gia sự kiện và tour tham quan
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Phản hồi và đánh giá về trải nghiệm tại bảo tàng
              </TranslatedText>
            </li>
          </ul>

          <h3>
            <TranslatedText>Dữ liệu tự động thu thập</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Website của chúng tôi tự động thu thập một số thông tin khi quý
              khách truy cập:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>Địa chỉ IP và thông tin thiết bị</TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Thông tin trình duyệt và hệ điều hành
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>Dữ liệu về cách sử dụng website</TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Cookie và công nghệ theo dõi tương tự
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Data Usage Section */}
        <div className="section">
          <h2>
            <TranslatedText>SỬ DỤNG DỮ LIỆU</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Xử lý đơn đặt vé và giao dịch thanh toán
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Cung cấp thông tin về sự kiện và triển lãm
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Cải thiện trải nghiệm của khách tham quan
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>Nghiên cứu và phân tích thống kê</TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Liên lạc về các vấn đề hành chính và dịch vụ
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Data Protection Section */}
        <div className="section">
          <h2>
            <TranslatedText>BẢO VỆ DỮ LIỆU</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Bảo tàng Thông - Musée Du Pin áp dụng các biện pháp bảo mật thích
              hợp để bảo vệ thông tin của quý khách khỏi truy cập trái phép,
              thay đổi, tiết lộ hoặc phá hủy. Các biện pháp này bao gồm:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Mã hóa dữ liệu trong quá trình truyền tải
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Hạn chế quyền truy cập vào dữ liệu cá nhân
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Duy trì các biện pháp bảo mật vật lý và điện tử
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Đào tạo nhân viên về bảo mật dữ liệu
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Data Sharing Section */}
        <div className="section">
          <h2>
            <TranslatedText>CHIA SẺ DỮ LIỆU</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Chúng tôi không bán, cho thuê hoặc trao đổi thông tin cá nhân của
              quý khách với bên thứ ba. Tuy nhiên, chúng tôi có thể chia sẻ
              thông tin trong các trường hợp sau:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Với các đối tác cung cấp dịch vụ cho bảo tàng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Khi có yêu cầu của cơ quan pháp luật
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Để bảo vệ quyền lợi và tài sản của bảo tàng
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Cookie Policy Section */}
        <div className="section">
          <h2>
            <TranslatedText>CHÍNH SÁCH COOKIE</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Website của chúng tôi sử dụng cookie và các công nghệ tương tự để
              cải thiện trải nghiệm của người dùng. Cookie là các tệp văn bản
              nhỏ được lưu trữ trên thiết bị của quý khách khi truy cập website.
            </TranslatedText>
          </p>
          <h3>
            <TranslatedText>Các loại cookie chúng tôi sử dụng:</TranslatedText>
          </h3>
          <ul>
            <li>
              <TranslatedText>
                Cookie cần thiết: Để website hoạt động bình thường
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Cookie phân tích: Để hiểu cách người dùng sử dụng website
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Cookie chức năng: Để ghi nhớ tùy chọn của người dùng
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* User Rights Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUYỀN CỦA NGƯỜI DÙNG</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Quý khách có các quyền sau đối với dữ liệu cá nhân của mình:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                Quyền truy cập và xem thông tin đã thu thập
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Quyền yêu cầu chỉnh sửa thông tin không chính xác
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Quyền yêu cầu xóa thông tin cá nhân
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>Quyền phản đối việc xử lý dữ liệu</TranslatedText>
            </li>
            <li>
              <TranslatedText>Quyền hạn chế việc xử lý dữ liệu</TranslatedText>
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
              Nếu quý khách có bất kỳ câu hỏi nào về chính sách bảo mật hoặc
              cách chúng tôi xử lý dữ liệu cá nhân, vui lòng liên hệ:
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Bảo tàng Thông - Musée Du Pin
              <br />
              Email: privacy@dupin.vn
              <br />
              Điện thoại: XXX XXX XXX
              <br />
              Địa chỉ: XXX XXX XXX
            </TranslatedText>
          </p>
        </div>

        {/* Updates Section */}
        <div className="section">
          <h2>
            <TranslatedText>CẬP NHẬT CHÍNH SÁCH</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để
              phản ánh những thay đổi trong hoạt động của bảo tàng hoặc nghĩa vụ
              pháp lý. Mọi thay đổi sẽ được thông báo trên website này. Quý
              khách nên kiểm tra định kỳ để cập nhật thông tin mới nhất về cách
              chúng tôi bảo vệ dữ liệu cá nhân của quý khách.
            </TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
