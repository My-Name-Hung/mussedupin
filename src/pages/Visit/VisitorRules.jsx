import React from "react";
import { Helmet } from "react-helmet";
import TranslatedText from "../../components/TranslatedText";
import "./VisitorRules.css";

// Import header image
import headerImage from "../../assets/Home/Hero/louvre-sunset.webp";

const VisitorRules = () => {
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
          <h1>
            <TranslatedText>NỘI QUY THAM QUAN</TranslatedText>
          </h1>
        </div>
      </div>

      <div className="rules-content">
        {/* General Rules Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUY ĐỊNH CHUNG</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Để đảm bảo trải nghiệm tham quan tốt nhất cho tất cả du khách và
              bảo vệ các tác phẩm nghệ thuật, quý khách vui lòng tuân thủ các
              quy định sau đây khi tham quan Bảo tàng Du Pin.
            </TranslatedText>
          </p>
        </div>

        {/* Prohibited Items Section */}
        <div className="section">
          <h2>
            <TranslatedText>
              VẬT DỤNG KHÔNG ĐƯỢC MANG VÀO BẢO TÀNG
            </TranslatedText>
          </h2>
          <ul>
            <li>
              <TranslatedText>Thức ăn và đồ uống các loại</TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Thuốc lá, thuốc lá điện tử và các sản phẩm tương tự
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Vũ khí, chất nổ và các vật sắc nhọn
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Balo cỡ lớn, vali và túi xách quá khổ
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Dù, gậy selfie và các thiết bị có thể gây nguy hiểm cho tác phẩm
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Photography Rules Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUY ĐỊNH VỀ CHỤP ẢNH VÀ QUAY PHIM</TranslatedText>
          </h2>
          <ul>
            <li>
              <TranslatedText>
                Không sử dụng đèn flash khi chụp ảnh
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Không sử dụng chân máy hoặc thiết bị ổn định
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Không chụp ảnh tại các khu vực có biển cấm
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Chỉ chụp ảnh cho mục đích cá nhân, không thương mại
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Behavior Rules Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUY ĐỊNH VỀ HÀNH VI</TranslatedText>
          </h2>
          <ul>
            <li>
              <TranslatedText>
                Giữ khoảng cách tối thiểu 50cm với tác phẩm nghệ thuật
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Không chạm vào tác phẩm nghệ thuật và các thiết bị trưng bày
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Không gây ồn ào, la hét trong khuôn viên bảo tàng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Tuân thủ hướng dẫn của nhân viên bảo tàng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Giữ trật tự và không chen lấn khi xem tác phẩm
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Children Rules Section */}
        <div className="section">
          <h2>
            <TranslatedText>QUY ĐỊNH VỀ TRẺ EM</TranslatedText>
          </h2>
          <ul>
            <li>
              <TranslatedText>
                Trẻ em dưới 12 tuổi phải có người lớn đi kèm
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Không để trẻ em chạy nhảy trong khuôn viên bảo tàng
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Giám sát trẻ em để đảm bảo an toàn cho tác phẩm
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Dress Code Section */}
        <div className="section">
          <h2>
            <TranslatedText>TRANG PHỤC</TranslatedText>
          </h2>
          <ul>
            <li>
              <TranslatedText>
                Trang phục lịch sự, phù hợp với không gian văn hóa
              </TranslatedText>
            </li>
            <li>
              <TranslatedText>
                Không mang dép lê hoặc trang phục quá hở hang
              </TranslatedText>
            </li>
          </ul>
        </div>

        {/* Consequences Section */}
        <div className="section">
          <h2>
            <TranslatedText>XỬ LÝ VI PHẠM</TranslatedText>
          </h2>
          <p>
            <TranslatedText>
              Khách tham quan vi phạm các quy định trên có thể bị yêu cầu rời
              khỏi bảo tàng mà không được hoàn tiền vé. Trong trường hợp gây
              thiệt hại cho tác phẩm nghệ thuật, khách tham quan phải chịu trách
              nhiệm bồi thường theo quy định của pháp luật.
            </TranslatedText>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisitorRules;
