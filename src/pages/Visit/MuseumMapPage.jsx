import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
import "./MuseumMapPage.css";

// Import hero image
import heroImage from "../../assets/home/Hero/louvre-sunset.webp";

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
  const [translations, setTranslations] = useState({});
  const { translate } = useTranslation();

  useEffect(() => {
    const loadTranslations = async () => {
      const translatedTexts = {
        pageTitle: await translate("Bản đồ, Chỉ đường & Vị trí | Musée Du Pin"),
        gettingHere: await translate("Đường đến bảo tàng"),
        toCentralMarket: await translate("Đến Chợ Đà Lạt"),
        museumMap: await translate("Bản đồ bảo tàng"),
        byAir: await translate("Bằng máy bay"),
        byCarFromSouth: await translate("Bằng ô tô (Từ phía Nam)"),
        byCarFromNorthCentral: await translate("Bằng ô tô (Từ phía Bắc/Trung)"),
        byBus: await translate("Bằng xe khách"),
        fromLienKhuongAirport: await translate("Từ sân bay Liên Khương"),
        takeATaxiOrUseTheMuseumsShuttleService: await translate(
          "Đi taxi hoặc sử dụng dịch vụ xe đưa đón của bảo tàng"
        ),
        followTheDaLatLienKhuongHighway: await translate(
          "Đi theo đường cao tốc Đà Lạt - Liên Khương"
        ),
        afterPrennPassTurnLeftAt34RoadOntoDongDaStreet: await translate(
          "Sau đèo Prenn, rẽ trái tại đường 3/4 vào đường Đống Đa"
        ),
        continuePastCuuLongElementarySchool: await translate(
          "Đi tiếp qua trường Tiểu học Cửu Long"
        ),
        lookForAGreenStrawberryGardenNextToAPineTreeShapedBuildingThatsMuséeDuPin:
          await translate(
            "Tìm vườn dâu tây xanh bên cạnh tòa nhà hình cây thông - đó là Musée Du Pin"
          ),
        multipleRoutesAvailableFromSouthernProvincesAndHoChiMinhCity:
          await translate(
            "Nhiều tuyến đường từ các tỉnh phía Nam và TP. Hồ Chí Minh:"
          ),
        route1: await translate("Tuyến 1"),
        route2: await translate("Tuyến 2"),
        route3: await translate("Tuyến 3"),
        route4: await translate("Tuyến 4"),
        fromNhaTrang: await translate("Từ Nha Trang"),
        fromHanoi: await translate("Từ Hà Nội"),
        khanhLePassOffersMagnificentNaturalBeautyWithMistyForestsAndPineTrees:
          await translate(
            "Đèo Khánh Lê mang đến vẻ đẹp thiên nhiên tuyệt vời với rừng thông và sương mù"
          ),
        busServicesAvailableFromVariousLocations: await translate(
          "Dịch vụ xe khách có sẵn từ nhiều địa điểm:"
        ),
        fromSouthVietnamPhuongTrangAndThanhBuoiBusesOfferTransferServiceToTheMuseum:
          await translate(
            "Từ Nam Việt Nam: Xe Phương Trang và Thành Bưởi có dịch vụ đưa đón đến bảo tàng"
          ),
        fromNorthVietnamMinhThuTaiThangVanNamHiepDucNgocHungVanNhanDienLinhAndDaoVanBuses:
          await translate(
            "Từ Bắc Việt Nam: Xe Minh Thu, Tài Thắng, Vân Nam, Hiệp Đức, Ngọc Hưng Vân Nhân, Diên Linh và Đào Vân"
          ),
        forBusesWithoutTransferServiceTakeATaxiFromHaHuyTapOrToHienThanhStreetToDongDaToHienThanhIntersection:
          await translate(
            "Đối với xe không có dịch vụ đưa đón, đi taxi từ đường Hà Huy Tập hoặc Tô Hiến Thành đến ngã tư Đống Đa - Tô Hiến Thành"
          ),
        theMuseumIsOnly100mFromThisIntersection: await translate(
          "Bảo tàng chỉ cách ngã tư này 100m"
        ),
        muséeDuPinIsLocatedAt2931DongDaStreetWard3DaLatCity: await translate(
          "Musée Du Pin tọa lạc tại 29-31 đường Đống Đa, Phường 3, Thành phố Đà Lạt"
        ),
        chooseYourPreferredModeOfTransportationToReachMuséeDuPin:
          await translate(
            "Chọn phương tiện di chuyển ưa thích để đến Musée Du Pin"
          ),
        selectTransportationMode: await translate("Chọn phương tiện di chuyển"),
        toCentralMarketXuangHuongLake: await translate(
          "ĐẾN CHỢ ĐÀ LẠT & HỒ XUÂN HƯƠNG"
        ),
        distanceToCentralNightMarket12km: await translate(
          "Khoảng cách đến Chợ Đêm Đà Lạt: 1.2km"
        ),
        distanceToXuanHuongLake900m: await translate(
          "Khoảng cách đến Hồ Xuân Hương: 900m"
        ),
        directions: await translate("Chỉ đường:"),
        takeHaHuyTapStreetToTranPhuStreetToReachBothTheDaLatMarketAndXuanHuongLake:
          await translate(
            "Đi theo đường Hà Huy Tập đến đường Trần Phú để đến cả Chợ Đà Lạt và Hồ Xuân Hương"
          ),
        importantUseONLYHaHuyTapStreetRouteForTheBestAccess: await translate(
          "Quan trọng: CHỈ sử dụng tuyến đường Hà Huy Tập để tiếp cận tốt nhất"
        ),
        interactiveMuseumFloorPlanWouldBeDisplayedHere: await translate(
          "Sơ đồ tầng bảo tàng tương tác sẽ được hiển thị tại đây"
        ),
        downloadPDFMap: await translate("Tải bản đồ PDF"),
        mapDirections: await translate("BẢN ĐỒ & CHỈ ĐƯỜNG"),
        howToReachMuséeDuPin: await translate(
          "Làm thế nào để đến Musée Du Pin"
        ),
        back: await translate("Quay lại"),
      };
      setTranslations(translatedTexts);
      document.title = translatedTexts.pageTitle;
    };

    loadTranslations();
  }, [translate]);

  const tabs = [
    {
      id: "getting-here",
      label: translations.gettingHere || "Đường đến bảo tàng",
    },
    {
      id: "from-central",
      label: translations.toCentralMarket || "Đến Chợ Đà Lạt",
    },
    { id: "museum-map", label: translations.museumMap || "Bản đồ bảo tàng" },
  ];

  const transportModes = [
    {
      id: "air",
      name: translations.byAir || "Bằng máy bay",
      description:
        translations.fromLienKhuongAirport || "Từ sân bay Liên Khương",
      details: [
        translations.takeATaxiOrUseTheMuseumsShuttleService ||
          "Đi taxi hoặc sử dụng dịch vụ xe đưa đón của bảo tàng",
        translations.followTheDaLatLienKhuongHighway ||
          "Đi theo đường cao tốc Đà Lạt - Liên Khương",
        translations.afterPrennPassTurnLeftAt34RoadOntoDongDaStreet ||
          "Sau đèo Prenn, rẽ trái tại đường 3/4 vào đường Đống Đa",
        translations.continuePastCuuLongElementarySchool ||
          "Đi tiếp qua trường Tiểu học Cửu Long",
        translations.lookForAGreenStrawberryGardenNextToAPineTreeShapedBuildingThatsMuséeDuPin ||
          "Tìm vườn dâu tây xanh bên cạnh tòa nhà hình cây thông - đó là Musée Du Pin",
      ],
    },
    {
      id: "car-south",
      name: translations.byCarFromSouth || "Bằng ô tô (Từ Nam)",
      description:
        translations.multipleRoutesAvailableFromSouthernProvincesAndHoChiMinhCity ||
        "Nhiều tuyến đường từ các tỉnh phía Nam và TP. Hồ Chí Minh:",
      routes: [
        {
          name: translations.route1 || "Tuyến 1",
          path: "QL1A → Dầu Giây → QL20 → Đèo Chuối → Đèo Bảo Lộc → Đèo Prenn",
          note: "Đèo Bảo Lộc tương đối hẹp với nhiều xe buýt và xe tải. Nếu đi xe máy, hãy kiểm tra phương tiện và lái xe cẩn thận.",
        },
        {
          name: translations.route2 || "Tuyến 2",
          path: "QL1A → TP. Phan Thiết → QL28B → Đèo Đại Ninh → QL20 (đoạn Đức Trọng) → Đèo Prenn",
          note: "Đèo Đại Ninh cung cấp một tuyến đường yên tĩnh, phong cảnh đẹp, hoàn hảo cho những người yêu thiên nhiên.",
        },
        {
          name: translations.route3 || "Tuyến 3",
          path: "QL1A → TP. Phan Thiết → QL28 → Đèo Gia Bắc → QL20 (đoạn Di Linh) → Đèo Prenn",
          note: "Lý tưởng cho những người đam mê xe máy, Đèo Gia Bắc mang đến trải nghiệm thú vị với phong cảnh thiên nhiên tuyệt đẹp.",
        },
        {
          name: translations.route4 || "Tuyến 4",
          path: "QL1A → Phan Rang (Tháp Chàm) → QL27 → Đèo Ngoạn Mục → QL20 → Đèo Prenn",
          note: "Trải nghiệm cảnh quan ngoạn mục của sườn núi xanh, thác nước và thảm thực vật đa dạng.",
        },
      ],
    },
    {
      id: "car-north",
      name: translations.byCarFromNorthCentral || "Bằng ô tô (Từ Bắc/Trung)",
      description:
        translations.routesFromNorthernAndCentralProvinces ||
        "Các tuyến đường từ các tỉnh phía Bắc và Trung:",
      routes: [
        {
          name: translations.fromNhaTrang || "Từ Nha Trang",
          path: "QL1A → TP. Nha Trang → QL27C → Đèo Khánh Lê → Lạc Dương → Đà Lạt",
          note:
            translations.khanhLePassOffersMagnificentNaturalBeautyWithMistyForestsAndPineTrees ||
            "Đèo Khánh Lê mang đến vẻ đẹp thiên nhiên tuyệt vời với rừng thông và sương mù.",
        },
        {
          name: translations.fromHanoi || "Từ Hà Nội",
          path: "Đường Hà Nội → Ngã tư Vũng Tàu → QL51 → Võ Nguyên Giáp → QL1A → Ngã tư Dầu Giây → QL20 → Đèo Prenn",
        },
      ],
    },
    {
      id: "bus",
      name: translations.byBus || "Bằng xe khách",
      description:
        translations.busServicesAvailableFromVariousLocations ||
        "Dịch vụ xe khách có sẵn từ nhiều địa điểm:",
      details: [
        translations.fromSouthVietnamPhuongTrangAndThanhBuoiBusesOfferTransferServiceToTheMuseum ||
          "Từ Nam Việt Nam: Xe Phương Trang và Thành Bưởi có dịch vụ đưa đón đến bảo tàng",
        translations.fromNorthVietnamMinhThuTaiThangVanNamHiepDucNgocHungVanNhanDienLinhAndDaoVanBuses ||
          "Từ Bắc Việt Nam: Xe Minh Thu, Tài Thắng, Vân Nam, Hiệp Đức, Ngọc Hưng Vân Nhân, Diên Linh và Đào Vân",
        translations.forBusesWithoutTransferServiceTakeATaxiFromHaHuyTapOrToHienThanhStreetToDongDaToHienThanhIntersection ||
          "Đối với xe không có dịch vụ đưa đón, đi taxi từ đường Hà Huy Tập hoặc Tô Hiến Thành đến ngã tư Đống Đa - Tô Hiến Thành",
        translations.theMuseumIsOnly100mFromThisIntersection ||
          "Bảo tàng chỉ cách ngã tư này 100m",
      ],
    },
  ];

  const renderGettingHere = () => (
    <div className="map-content-section">
      <div className="map-notice">
        <p>
          {translations.muséeDuPinIsLocatedAt2931DongDaStreetWard3DaLatCity ||
            "Musée Du Pin tọa lạc tại 29-31 đường Đống Đa, Phường 3, Thành phố Đà Lạt"}
        </p>
      </div>

      <div className="map-getting-here-section">
        <h3 className="map-section-title">
          {translations.gettingHere || "Đường đến bảo tàng"}
        </h3>
        <p className="map-section-description">
          {translations.chooseYourPreferredModeOfTransportationToReachMuséeDuPin ||
            "Chọn phương tiện di chuyển ưa thích để đến Musée Du Pin."}
        </p>
      </div>

      <div className="map-transport-selector">
        <div className="map-dropdown-container">
          <button
            className="map-dropdown-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {translations.selectTransportationMode ||
              "Chọn phương tiện di chuyển"}
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
              </div>
            )
        )}
      </div>
    </div>
  );

  const renderFromCentral = () => (
    <div className="map-content-section">
      <div className="map-central-info">
        <h3 className="map-section-title">
          {translations.toCentralMarketXuangHuongLake ||
            "ĐẾN CHỢ ĐÀ LẠT & HỒ XUÂN HƯƠNG"}
        </h3>
        <div className="map-distances">
          <p>
            {translations.distanceToCentralNightMarket12km ||
              "Khoảng cách đến Chợ Đêm Đà Lạt: 1.2km"}
          </p>
          <p>
            {translations.distanceToXuanHuongLake900m ||
              "Khoảng cách đến Hồ Xuân Hương: 900m"}
          </p>
        </div>
        <div className="map-directions">
          <h4>{translations.directions || "Chỉ đường:"}</h4>
          <p>
            {translations.takeHaHuyTapStreetToTranPhuStreetToReachBothTheDaLatMarketAndXuanHuongLake ||
              "Đi theo đường Hà Huy Tập đến đường Trần Phú để đến cả Chợ Đà Lạt và Hồ Xuân Hương."}
          </p>
          <p className="map-direction-note">
            {translations.importantUseONLYHaHuyTapStreetRouteForTheBestAccess ||
              "Quan trọng: CHỈ sử dụng tuyến đường Hà Huy Tập để tiếp cận tốt nhất."}
          </p>
        </div>
      </div>
    </div>
  );

  const renderMuseumMap = () => (
    <div className="map-content-section">
      <div className="map-section">
        <h3 className="map-section-title">
          {translations.museumMap || "Bản đồ bảo tàng"}
        </h3>
        <div className="map-placeholder large">
          <MapIcon />
          <p>
            {translations.interactiveMuseumFloorPlanWouldBeDisplayedHere ||
              "Sơ đồ tầng bảo tàng tương tác sẽ được hiển thị tại đây"}
          </p>
          <button className="map-download-btn">
            {translations.downloadPDFMap || "Tải bản đồ PDF"}
          </button>
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
        <div
          className="map-hero-image"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="map-hero-overlay"></div>
        </div>

        <Link to="/" className="map-back-button">
          <BackIcon /> {translations.back || "Quay lại"}
        </Link>

        <div className="map-hero-content">
          <p className="map-hero-subtitle">
            {translations.mapDirections || "BẢN ĐỒ & CHỈ ĐƯỜNG"}
          </p>
          <h1 className="map-hero-title">
            {translations.howToReachMuséeDuPin ||
              "Làm thế nào để đến Musée Du Pin"}
          </h1>
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

      {/* Google Map Section - always visible at bottom */}
      <section className="museum-map-google-section">
        <div className="museum-map-google-container">
          <h2 className="museum-map-google-title">Vị trí bảo tàng</h2>
          <div className="museum-map-google-content">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3282.6347163633855!2d108.44256451806218!3d11.923690928634585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317113472aaa2ceb%3A0xb2d96d24754e2a02!2zMjkgxJDhu5FuZyDEkGEsIFBoxrDhu51uZyAzLCDEkMOgIEzhuqF0LCBMw6JtIMSQ4buTbmcsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1748493614119!5m2!1svi!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ bảo tàng Musée Du Pin"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MuseumMapPage;
