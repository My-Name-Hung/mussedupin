import React from "react";
import { useNavigate } from "react-router-dom";
import "./Visit.css";

const Visit = () => {
  const navigate = useNavigate();

  return (
    <div className="visit-page">
      <section className="ticket-section">
        <div className="visit-section-container">
          <h2 className="visit-section-title">
            <span>CÁC GÓI TRẢI NGHIỆM</span>
          </h2>

          <div className="visit-cards">
            <div
              className="visit-card visit-card-vertical"
              onClick={() => navigate("/visit/non-residential")}
            >
              <div className="visit-card-img-wrap">
                <img
                  src="https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru.jpg?updatedAt=1749267196332"
                  alt="Gói không lưu trú"
                  className="visit-card-img"
                />
                <div className="visit-card-overlay" />
                <div className="visit-card-content">
                  <h2>Gói không lưu trú</h2>
                  <p>
                    Trải nghiệm nghệ thuật và văn hóa trong ngày tại Musée Du
                    Pin
                  </p>
                </div>
              </div>
            </div>

            <div
              className="visit-card visit-card-vertical"
              onClick={() => navigate("/visit/residential")}
            >
              <div className="visit-card-img-wrap">
                <img
                  src="https://ik.imagekit.io/8u8lkoqkkm/Luutru.jpg?updatedAt=1749267196093"
                  alt="Gói lưu trú"
                  className="visit-card-img"
                />
                <div className="visit-card-overlay" />
                <div className="visit-card-content">
                  <h2>Gói lưu trú</h2>
                  <p>
                    Nghỉ dưỡng và trải nghiệm nghệ thuật trọn vẹn tại Musée Du
                    Pin
                  </p>
                </div>
              </div>
            </div>

            <div
              className="visit-card visit-card-vertical"
              onClick={() => navigate("/visit/regular")}
            >
              <div className="visit-card-img-wrap">
                <img
                  src="https://ik.imagekit.io/8u8lkoqkkm/Chuongtrinhdinhky.jpg?updatedAt=1749267196289"
                  alt="Chương trình định kỳ"
                  className="visit-card-img"
                />
                <div className="visit-card-overlay" />
                <div className="visit-card-content">
                  <h2>Chương trình định kỳ</h2>
                  <p>
                    Các sự kiện nghệ thuật đặc sắc diễn ra thường xuyên tại
                    Musée Du Pin
                  </p>
                </div>
              </div>
            </div>

            <div
              className="visit-card visit-card-vertical"
              onClick={() => navigate("/visit/art-rooms")}
            >
              <div className="visit-card-img-wrap">
                <img
                  src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748932457/wnggxcv1dn4b6meviasq.png"
                  alt="Các căn phòng nghệ thuật"
                  className="visit-card-img"
                />
                <div className="visit-card-overlay" />
                <div className="visit-card-content">
                  <h2>CÁC CĂN PHÒNG NGHỆ THUẬT</h2>
                  <p>
                    Khám phá không gian nghệ thuật độc đáo trong từng căn phòng
                  </p>
                </div>
              </div>
            </div>

            <div
              className="visit-card visit-card-vertical"
              onClick={() => navigate("/visit/package/chup-anh-nghe-thuat")}
            >
              <div className="visit-card-img-wrap">
                <img
                  src="https://ik.imagekit.io/8u8lkoqkkm/chupanhnghethuat_doc.jpg?updatedAt=1750298609358"
                  alt="Chụp ảnh nghệ thuật"
                  className="visit-card-img"
                />
                <div className="visit-card-overlay" />
                <div className="visit-card-content">
                  <h2>Chụp ảnh nghệ thuật</h2>
                  <p>
                    Sở hữu những tấm ảnh nghệ thuật độc đáo trong không gian Bảo
                    Tàng
                  </p>
                </div>
              </div>
            </div>

            <div
              className="visit-card visit-card-vertical"
              onClick={() => navigate("/visit/package/phim-dien-anh")}
            >
              <div className="visit-card-img-wrap">
                <img
                  src="https://ik.imagekit.io/8u8lkoqkkm/phimdienanh_doc.jpg?updatedAt=1750298609321"
                  alt="Phim điện ảnh"
                  className="visit-card-img"
                />
                <div className="visit-card-overlay" />
                <div className="visit-card-content">
                  <h2>Phim điện ảnh</h2>
                  <p>
                    Lưu giữ kỷ niệm chuyến đi bằng thước phim điện ảnh chuyên
                    nghiệp
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Visit;
