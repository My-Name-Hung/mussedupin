import React from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../../components/TranslatedText";
import { useAssets } from "../../../hooks/useAssets";
import "./LegalNotice.css";

const LegalNotice = () => {
  const { assets, loading, error, getAssetUrl } = useAssets();
  // Find the header image by filename
  const headerAsset = assets.find((a) => a.filename === "louvre-sunset.webp");

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
        {loading && <div>Đang tải ảnh...</div>}
        {error && <div>Lỗi tải ảnh: {error}</div>}
        {headerAsset && !loading && !error && (
          <img
            src={headerAsset.url || getAssetUrl(headerAsset.filename)}
            alt="Bảo tàng Du Pin"
          />
        )}
        <div className="banner-overlay">
          <h1>
            <TranslatedText>ĐIỀU KHOẢN PHÁP LÝ</TranslatedText>
          </h1>
        </div>
      </div>

      <div className="legal-content">
        {/* Publishing Section */}
        <div className="section">
          <h2>
            <TranslatedText>THÔNG TIN XUẤT BẢN</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Musée du Pin, Bảo tàng Thông,
              <br />
              MST: XXX XXX XXX
              <br />
              Địa chỉ: XXX XXX XXX
              <br />
              Điện thoại: XXX XXX XXX
              <br />
              Giám đốc xuất bản: Musée du Pin
            </TranslatedText>
          </p>
        </div>

        {/* Website Content Section */}
        <div className="section">
          <h2>
            <TranslatedText>NỘI DUNG WEBSITE</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Musée du Pin
              <br />
              Phòng Sản xuất Kỹ thuật số và Nghe nhìn
              <br />
              Phòng Giải thích và Lập trình Văn hóa
              <br />
              29-31 Đống Đa, phường 3, Đà Lạt
              <br />
              baotangthong2024@gmail.com
            </TranslatedText>
          </p>
        </div>

        {/* Intellectual Property Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUYỀN SỞ HỮU TRÍ TUỆ</TranslatedText>
          </h2>
          <h3>
            <TranslatedText>Phát triển website</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Cấu trúc chung của website này là tài sản độc quyền của Bảo tàng
              Du Pin. Mọi hình thức sao chép, trình bày, toàn bộ hoặc một phần,
              sử dụng, điều chỉnh, cung cấp hoặc sửa đổi bằng bất kỳ quy trình,
              cá nhân và phương tiện nào (đặc biệt là bán, tiếp thị, cho thuê,
              v.v.) mà không có sự cho phép rõ ràng của bảo tàng, bất kỳ tác giả
              hoặc chủ sở hữu quyền nào đều bị nghiêm cấm và cấu thành vi phạm
              Bộ luật Sở hữu Trí tuệ.
            </TranslatedText>
          </p>

          <h3>
            <TranslatedText>Nội dung Website</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Theo luật sở hữu trí tuệ, nội dung khoa học, văn hóa và giáo dục
              (bao gồm nhưng không giới hạn ở văn bản, hình ảnh, ảnh chụp, bản
              ghi âm và tài liệu nghe nhìn và đa phương tiện) của website này là
              tài sản của Bảo tàng Du Pin.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Do đó, mọi hình thức sao chép, trình bày, toàn bộ hoặc một phần,
              sử dụng, điều chỉnh, cung cấp hoặc sửa đổi nội dung này bằng bất
              kỳ quy trình, cá nhân và phương tiện nào (đặc biệt là bán, tiếp
              thị, cho thuê, v.v.) mà không có sự cho phép rõ ràng của tác giả
              hoặc chủ sở hữu quyền đều bị nghiêm cấm và cấu thành vi phạm Bộ
              luật Sở hữu Trí tuệ.
            </TranslatedText>
          </p>

          <h3>
            <TranslatedText>Hình ảnh</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Hình ảnh có ghi © Musée du Pin / [...] là tài sản độc quyền của
              Bảo tàng Du Pin và được Bảo tàng Du Pin sử dụng với sự cho phép
              của tác giả hoặc chủ sở hữu quyền.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Hình ảnh có ghi © RMN, Musée du Pin / [...] là tài sản của RMN.
              Việc tái sử dụng phi thương mại được cho phép, với điều kiện phải
              ghi nhận nguồn gốc và tác giả.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Đối với bất kỳ việc tái sử dụng thương mại và/hoặc biên tập lại
              hình ảnh từ bộ sưu tập của Bảo tàng Du Pin và các Phòng trưng bày
              Quốc gia khác, vui lòng liên hệ với cơ quan nhiếp ảnh Réunion des
              Musées nationaux et du Grand Palais des Champs-Élysées (Rmn-Gp).
            </TranslatedText>
          </p>

          <h3>
            <TranslatedText>Thương hiệu và logo</TranslatedText>
          </h3>
          <p>
            <TranslatedText>
              Các thương hiệu của Bảo tàng Du Pin và đối tác của nó, cũng như
              các logo hiển thị trên trang web, đã được đăng ký và đăng ký với
              INPI (Viện Sở hữu Công nghiệp Quốc gia Pháp) và do đó được bảo vệ
              bởi luật sở hữu công nghiệp.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Mọi hình thức sao chép, toàn bộ hoặc một phần, các thương hiệu
              và/hoặc logo này được tạo ra từ các yếu tố của website mà không có
              sự cho phép rõ ràng của chủ sở hữu đều bị nghiêm cấm và cấu thành
              vi phạm Bộ luật Sở hữu Trí tuệ.
            </TranslatedText>
          </p>
        </div>

        {/* Public Sector Information Section */}
        <div className="section">
          <h2>
            <TranslatedText>THÔNG TIN KHU VỰC CÔNG</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Nội dung thông tin và lập trình trên website này là thông tin khu
              vực công hành chính theo Điều L.321-1 và L.322-1 của Bộ luật Quan
              hệ giữa Công chúng và Hành chính Pháp. Thông tin này có thể được
              tái sử dụng, với điều kiện không bị thay đổi, không bị bóp méo ý
              nghĩa và phải ghi rõ nguồn gốc và ngày cập nhật gần nhất.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Quyền đối với thông tin khu vực công hành chính không được chuyển
              giao cho người tái sử dụng. Người tái sử dụng được hưởng quyền cá
              nhân và không độc quyền để tái sử dụng thông tin khu vực công hành
              chính. Bất kỳ người nào tái sử dụng thông tin khu vực công vi phạm
              các quy định nêu trên đều có thể bị phạt bởi Ủy ban Tiếp cận Tài
              liệu Hành chính (CADA), một cơ quan độc lập chịu trách nhiệm đảm
              bảo quyền tự do tiếp cận tài liệu hành chính.
            </TranslatedText>
          </p>
        </div>

        {/* Hypertext Links Section */}
        <div className="section">
          <h2>
            <TranslatedText>LIÊN KẾT SIÊU VĂN BẢN</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Website Bảo tàng Du Pin (www.dupin.fr) cho phép sử dụng liên kết
              siêu văn bản đến nội dung của mình với điều kiện:
            </TranslatedText>
          </p>
          <ul>
            <li>
              <TranslatedText>
                không sử dụng liên kết sâu, nghĩa là các trang từ website Bảo
                tàng Du Pin không được nhúng trong các trang của một trang web
                khác, mà phải được mở trong cửa sổ mới.
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                phải ghi rõ nguồn gốc khi liên kết siêu văn bản dẫn trực tiếp
                đến nội dung.
              </TranslatedText>
            </li>
          </ul>
          <p>
            <TranslatedText>
              Thông tin chỉ được sử dụng cho mục đích cá nhân, hiệp hội hoặc
              chuyên môn; mọi sử dụng cho mục đích thương mại hoặc quảng cáo đều
              bị nghiêm cấm.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Không cấp phép cho các website có nội dung được coi là xúc phạm
              nhân phẩm, trật tự công cộng hoặc đạo đức công cộng.
            </TranslatedText>
          </p>
        </div>

        {/* Liability Section */}
        <div className="section">
          <h2>
            <TranslatedText>TRÁCH NHIỆM PHÁP LÝ</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Bảo tàng Du Pin nỗ lực hết sức để đảm bảo thông tin trên website
              (www.dupin.fr) luôn sẵn có, chính xác và cập nhật, và có quyền sửa
              đổi thông tin bất cứ lúc nào mà không cần thông báo trước. Tuy
              nhiên, Bảo tàng Du Pin không thể đảm bảo tính sẵn có, chính xác,
              thời sự hoặc đầy đủ của thông tin được trình bày. Việc sử dụng
              thông tin có sẵn hoặc được cung cấp trên website này là trách
              nhiệm của người dùng.
            </TranslatedText>
          </p>
          <p>
            <TranslatedText>
              Bảo tàng Du Pin không chịu trách nhiệm về nội dung của các trang
              web này, và sẽ không chịu trách nhiệm về bất kỳ thiệt hại hoặc tổn
              thương nào phát sinh từ chúng. Các liên kết đến các trang web khác
              chỉ được cung cấp cho người dùng để thuận tiện.
            </TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LegalNotice;
