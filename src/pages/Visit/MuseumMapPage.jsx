import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MuseumMapPage.css";

// SVG Icons
const BackIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

const MapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
    <line x1="8" y1="2" x2="8" y2="18"></line>
    <line x1="16" y1="6" x2="16" y2="22"></line>
  </svg>
);

const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const MuseumMapPage = () => {
  const [activeTab, setActiveTab] = useState("getting-here");
  const [selectedTransport, setSelectedTransport] = useState("air");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const tabs = [
    {
      id: "getting-here",
      label: "Đường đến bảo tàng",
    },
    {
      id: "from-central",
      label: "Đến Chợ Đà Lạt",
    },
    { id: "museum-map", label: "Bản đồ bảo tàng" },
  ];

  const transportModes = [
    {
      id: "air",
      name: "Bằng máy bay",
      description: "Từ sân bay Liên Khương",
      details: [
        "Đi taxi hoặc sử dụng dịch vụ xe đưa đón của bảo tàng",
        "Đi theo đường cao tốc Đà Lạt - Liên Khương",
        "Sau đèo Prenn, rẽ trái tại đường 3/4 vào đường Đống Đa",
        "Đi tiếp qua trường Tiểu học Cửu Long",
        "Tìm vườn dâu tây xanh bên cạnh tòa nhà hình cây thông - đó là Musée Du Pin",
      ],
    },
    {
      id: "car-south",
      name: "Bằng ô tô (Từ Nam)",
      description: "Nhiều tuyến đường từ các tỉnh phía Nam và TP. Hồ Chí Minh:",
      routes: [
        {
          name: "Tuyến 1",
          path: "QL1A → Dầu Giây → QL20 → Đèo Chuối → Đèo Bảo Lộc → Đèo Prenn",
          note: "Đèo Bảo Lộc tương đối hẹp với nhiều xe buýt và xe tải. Nếu đi xe máy, hãy kiểm tra phương tiện và lái xe cẩn thận.",
        },
        {
          name: "Tuyến 2",
          path: "QL1A → TP. Phan Thiết → QL28B → Đèo Đại Ninh → QL20 (đoạn Đức Trọng) → Đèo Prenn",
          note: "Đèo Đại Ninh cung cấp một tuyến đường yên tĩnh, phong cảnh đẹp, hoàn hảo cho những người yêu thiên nhiên.",
        },
        {
          name: "Tuyến 3",
          path: "QL1A → TP. Phan Thiết → QL28 → Đèo Gia Bắc → QL20 (đoạn Di Linh) → Đèo Prenn",
          note: "Lý tưởng cho những người đam mê xe máy, Đèo Gia Bắc mang đến trải nghiệm thú vị với phong cảnh thiên nhiên tuyệt đẹp.",
        },
        {
          name: "Tuyến 4",
          path: "QL1A → Phan Rang (Tháp Chàm) → QL27 → Đèo Ngoạn Mục → QL20 → Đèo Prenn",
          note: "Trải nghiệm cảnh quan ngoạn mục của sườn núi xanh, thác nước và thảm thực vật đa dạng.",
        },
      ],
    },
    {
      id: "car-north",
      name: "Bằng ô tô (Từ Bắc/Trung)",
      description: "Các tuyến đường từ các tỉnh phía Bắc và Trung:",
      routes: [
        {
          name: "Từ Nha Trang",
          path: "QL1A → TP. Nha Trang → QL27C → Đèo Khánh Lê → Lạc Dương → Đà Lạt",
          note: "Đèo Khánh Lê mang đến vẻ đẹp thiên nhiên tuyệt vời với rừng thông và sương mù.",
        },
        {
          name: "Từ Hà Nội",
          path: "Đường Hà Nội → Ngã tư Vũng Tàu → QL51 → Võ Nguyên Giáp → QL1A → Ngã tư Dầu Giây → QL20 → Đèo Prenn",
        },
      ],
    },
    {
      id: "bus",
      name: "Bằng xe khách",
      description: "Dịch vụ xe khách có sẵn từ nhiều địa điểm:",
      details: [
        "Từ Nam Việt Nam: Xe Phương Trang và Thành Bưởi có dịch vụ đưa đón đến bảo tàng",
        "Từ Bắc Việt Nam: Xe Minh Thu, Tài Thắng, Vân Nam, Hiệp Đức, Ngọc Hưng Vân Nhân, Diên Linh và Đào Vân",
        "Đối với xe không có dịch vụ đưa đón, đi taxi từ đường Hà Huy Tập hoặc Tô Hiến Thành đến ngã tư Đống Đa - Tô Hiến Thành",
        "Bảo tàng chỉ cách ngã tư này 100m",
      ],
    },
  ];

  const renderGettingHere = () => (
    <div className="map-content-section">
      <div className="map-notice">
        <p>
          Musée Du Pin tọa lạc tại 29-31 đường Đống Đa, Phường 3, Thành phố Đà
          Lạt.
        </p>
      </div>

      <div className="map-getting-here-section">
        <h3 className="map-section-title">Đường đến bảo tàng</h3>
        <p className="map-section-description">
          Chọn phương tiện di chuyển ưa thích để đến Musée Du Pin.
        </p>
      </div>

      <div className="map-transport-selector">
        <div className="map-dropdown-container">
          <button
            className="map-dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            Chọn phương tiện di chuyển
            <ChevronDownIcon />
          </button>
          {isDropdownOpen && (
            <div className="map-dropdown-menu">
              {transportModes.map((mode) => (
                <button
                  key={mode.id}
                  className={`map-dropdown-item ${
                    selectedTransport === mode.id ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedTransport(mode.id);
                    setIsDropdownOpen(false);
                  }}
                >
                  {mode.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="map-transport-details">
        {transportModes.map(
          (mode) =>
            mode.id === selectedTransport && (
              <div key={mode.id} className="map-transport-info">
                <h4 className="map-transport-title">{mode.name}</h4>
                <p className="map-transport-description">{mode.description}</p>
                {mode.details && (
                  <ul className="map-transport-list">
                    {mode.details.map((detail, index) => (
                      <li key={index}>{detail}</li>
                    ))}
                  </ul>
                )}
                {mode.routes && (
                  <div className="map-routes">
                    {mode.routes.map((route, index) => (
                      <div key={index} className="map-route-item">
                        <h5>{route.name}</h5>
                        <p>{route.path}</p>
                        {route.note && (
                          <p className="map-route-note">{route.note}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="map-google-embed">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6347163633855!2d108.44256451806218!3d11.923690928634585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317113472aaa2ceb%3A0xb2d96d24754e2a02!2zMjkgxJDhu5FuZyDEkGEsIFBoxrDhu51uZyAzLCDEkMOgIEzhuqF0LCBMw6JtIMSQ4buTbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1748493614119!5m2!1svi!2s"
                    width="100%"
                    height="450"
                    style={{ border: 0, marginTop: "20px" }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );

  const renderFromCentral = () => (
    <div className="map-content-section">
      <div className="map-central-info">
        <h3 className="map-section-title">"ĐẾN CHỢ ĐÀ LẠT & HỒ XUÂN HƯƠNG"</h3>
        <div className="map-distances">
          <p>"Khoảng cách đến Chợ Đêm Đà Lạt: 1.2km"</p>
          <p>"Khoảng cách đến Hồ Xuân Hương: 900m"</p>
        </div>
        <div className="map-directions">
          <h4>"Chỉ đường:"</h4>
          <p>
            "Đi theo đường Hà Huy Tập đến đường Trần Phú để đến cả Chợ Đà Lạt và
            Hồ Xuân Hương."
          </p>
          <p className="map-direction-note">
            "Quan trọng: CHỈ sử dụng tuyến đường Hà Huy Tập để tiếp cận tốt
            nhất."
          </p>
        </div>
      </div>
    </div>
  );

  const renderMuseumMap = () => (
    <div className="map-content-section">
      <div className="map-section">
        <h3 className="map-section-title">"Bản đồ bảo tàng"</h3>
        <div className="map-placeholder large">
          <MapIcon />
          <p>"Sơ đồ tầng bảo tàng tương tác sẽ được hiển thị tại đây"</p>
          <button className="map-download-btn">"Tải bản đồ PDF"</button>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "getting-here":
        return renderGettingHere();
      case "from-central":
        return renderFromCentral();
      case "museum-map":
        return renderMuseumMap();
      default:
        return renderGettingHere();
    }
  };

  return (
    <div className="museum-map-page">
      {/* Hero Section */}
      <div className="map-hero">
        <div>
          <img
            className="map-hero-image"
            src="https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784642/collections/louvre-sunset.jpg"
            alt="Bảo tàng Thông - Hero"
          />
          <div className="map-hero-overlay"></div>
        </div>

        <Link to="/" className="map-back-button">
          <BackIcon /> Quay lại
        </Link>

        <div className="map-hero-content">
          <p className="map-hero-subtitle">BẢN ĐỒ & CHỈ ĐƯỜNG</p>
          <h1 className="map-hero-title">Làm thế nào để đến Musée Du Pin</h1>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="map-nav-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`map-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="map-content">{renderContent()}</div>
    </div>
  );
};

export default MuseumMapPage;
