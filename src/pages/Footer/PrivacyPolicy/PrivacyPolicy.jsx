import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "../../../contexts/TranslationContext";
import "./PrivacyPolicy.css";

// Import header image

const translations = {
  meta: {
    vi: {
      title: "Chính sách bảo mật | Bảo tàng Thông",
      description:
        "Chính sách bảo mật và quy định về bảo vệ dữ liệu cá nhân của Bảo tàng Thông - Musée Du Pin.",
    },
    en: {
      title: "Privacy Policy | Musée Du Pin",
      description:
        "Privacy policy and personal data protection regulations of Musée Du Pin.",
    },
  },
  header: {
    vi: "CHÍNH SÁCH BẢO MẬT",
    en: "PRIVACY POLICY",
  },
  alt: {
    vi: "Bảo tàng Thông - Musée Du Pin",
    en: "Musée Du Pin",
  },
};

const PrivacyPolicy = () => {
  const { currentLang, registerTranslations } = useTranslation();

  React.useEffect(() => {
    registerTranslations("privacyPolicy", translations);
  }, [registerTranslations]);

  return (
    <div className="privacy-policy-container">
      <Helmet>
        <title>{translations.meta[currentLang].title}</title>
        <meta
          name="description"
          content={translations.meta[currentLang].description}
        />
      </Helmet>

      {/* Header Banner */}
      <div className="privacy-banner">
        <img
          src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784642/collections/louvre-sunset.jpg"
          alt={translations.alt[currentLang]}
        />
        <div className="banner-overlay">
          <h1>{translations.header[currentLang]}</h1>
        </div>
      </div>

      <div className="privacy-content">
        {/* Introduction Section */}
        <div className="section">
          <h2>{currentLang === "en" ? "INTRODUCTION" : "GIỚI THIỆU"}</h2>
          <p>
            {currentLang === "en"
              ? "Musée Du Pin is committed to protecting your privacy and personal data. This privacy policy describes how we collect, use, store and protect your information when you access our website and use our services or products."
              : "Bảo tàng Thông - Musée Du Pin cam kết bảo vệ quyền riêng tư và dữ liệu cá nhân của quý khách. Chính sách bảo mật này mô tả cách chúng tôi thu thập, sử dụng, lưu trữ và bảo vệ thông tin của quý khách khi truy cập website và sử dụng dịch vụ hay các sản phẩm của bảo tàng."}
          </p>
        </div>

        {/* Data Collection Section */}
        <div className="section">
          <h2>THU THẬP DỮ LIỆU</h2>
          <h3>Thông tin chúng tôi thu thập</h3>
          <p>Chúng tôi thu thập các thông tin sau khi quý khách cung cấp:</p>
          <ul>
            <li>Thông tin cá nhân (họ tên, email, số điện thoại)</li>
            <li>Thông tin thanh toán khi mua vé hoặc sản phẩm</li>
            <li>Thông tin đăng ký tham gia sự kiện và tour tham quan</li>
            <li>Phản hồi và đánh giá về trải nghiệm tại bảo tàng</li>
          </ul>

          <h3>Dữ liệu tự động thu thập</h3>
          <p>
            Website của chúng tôi tự động thu thập một số thông tin khi quý
            khách truy cập:
          </p>
          <ul>
            <li>Địa chỉ IP và thông tin thiết bị</li>
            <li>Thông tin trình duyệt và hệ điều hành</li>
            <li>Dữ liệu về cách sử dụng website</li>
            <li>Cookie và công nghệ theo dõi tương tự</li>
          </ul>
        </div>

        {/* Data Usage Section */}
        <div className="section">
          <h2>SỬ DỤNG DỮ LIỆU</h2>
          <p>Chúng tôi sử dụng thông tin thu thập được cho các mục đích sau:</p>
          <ul>
            <li>Xử lý đơn đặt vé và giao dịch thanh toán</li>
            <li>Cung cấp thông tin về sự kiện và triển lãm</li>
            <li>Cải thiện trải nghiệm của khách tham quan</li>
            <li>Nghiên cứu và phân tích thống kê</li>
            <li>Liên lạc về các vấn đề hành chính và dịch vụ</li>
          </ul>
        </div>

        {/* Data Protection Section */}
        <div className="section">
          <h2>BẢO VỆ DỮ LIỆU</h2>
          <p>
            Bảo tàng Thông - Musée Du Pin áp dụng các biện pháp bảo mật thích
            hợp để bảo vệ thông tin của quý khách khỏi truy cập trái phép, thay
            đổi, tiết lộ hoặc phá hủy. Các biện pháp này bao gồm:
          </p>
          <ul>
            <li>Mã hóa dữ liệu trong quá trình truyền tải</li>
            <li>Hạn chế quyền truy cập vào dữ liệu cá nhân</li>
            <li>Duy trì các biện pháp bảo mật vật lý và điện tử</li>
            <li>Đào tạo nhân viên về bảo mật dữ liệu</li>
          </ul>
        </div>

        {/* Data Sharing Section */}
        <div className="section">
          <h2>CHIA SẺ DỮ LIỆU</h2>
          <p>
            Chúng tôi không bán, cho thuê hoặc trao đổi thông tin cá nhân của
            quý khách với bên thứ ba. Tuy nhiên, chúng tôi có thể chia sẻ thông
            tin trong các trường hợp sau:
          </p>
          <ul>
            <li>Với các đối tác cung cấp dịch vụ cho bảo tàng</li>
            <li>Khi có yêu cầu của cơ quan pháp luật</li>
            <li>Để bảo vệ quyền lợi và tài sản của bảo tàng</li>
          </ul>
        </div>

        {/* Cookie Policy Section */}
        <div className="section">
          <h2>CHÍNH SÁCH COOKIE</h2>
          <p>
            Website của chúng tôi sử dụng cookie và các công nghệ tương tự để
            cải thiện trải nghiệm của người dùng. Cookie là các tệp văn bản nhỏ
            được lưu trữ trên thiết bị của quý khách khi truy cập website.
          </p>
          <h3>Các loại cookie chúng tôi sử dụng:</h3>
          <ul>
            <li>Cookie cần thiết: Để website hoạt động bình thường</li>
            <li>Cookie phân tích: Để hiểu cách người dùng sử dụng website</li>
            <li>Cookie chức năng: Để ghi nhớ tùy chọn của người dùng</li>
          </ul>
        </div>

        {/* User Rights Section */}
        <div className="section">
          <h2>QUYỀN CỦA NGƯỜI DÙNG</h2>
          <p>Quý khách có các quyền sau đối với dữ liệu cá nhân của mình:</p>
          <ul>
            <li>Quyền truy cập và xem thông tin đã thu thập</li>
            <li>Quyền yêu cầu chỉnh sửa thông tin không chính xác</li>
            <li>Quyền yêu cầu xóa thông tin cá nhân</li>
            <li>Quyền phản đối việc xử lý dữ liệu</li>
            <li>Quyền hạn chế việc xử lý dữ liệu</li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="section">
          <h2>{currentLang === "en" ? "CONTACT" : "LIÊN HỆ"}</h2>
          <p>
            {currentLang === "en"
              ? "If you have any questions about our privacy policy or how we handle your personal data, please contact:"
              : "Nếu quý khách có bất kỳ câu hỏi nào về chính sách bảo mật hoặc cách chúng tôi xử lý dữ liệu cá nhân, vui lòng liên hệ:"}
          </p>
          <p>
            Musée Du Pin
            <br />
            Email: baotangthong2024@gmail.com
            <br />
            {currentLang === "en" ? "Phone" : "Điện thoại"}: +84 2633 818 968;
            +84 86 235 6368
            <br />
            {currentLang === "en" ? "Address" : "Địa chỉ"}: 29-31 Đống Đa,{" "}
            {currentLang === "en"
              ? "Ward 3, Da Lat City, Lam Dong, Vietnam"
              : "Phường 3, Tp Đà Lạt, tỉnh Lâm Đồng, Việt Nam"}
          </p>
        </div>

        {/* Updates Section */}
        <div className="section">
          <h2>CẬP NHẬT CHÍNH SÁCH</h2>
          <p>
            Chúng tôi có thể cập nhật chính sách bảo mật này theo thời gian để
            phản ánh những thay đổi trong hoạt động của bảo tàng hoặc nghĩa vụ
            pháp lý. Mọi thay đổi sẽ được thông báo trên website này. Quý khách
            nên kiểm tra định kỳ để cập nhật thông tin mới nhất về cách chúng
            tôi bảo vệ dữ liệu cá nhân của quý khách.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
