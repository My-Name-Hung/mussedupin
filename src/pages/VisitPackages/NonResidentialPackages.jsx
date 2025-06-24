import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./VisitPackages.css";

const NonResidentialPackages = () => {
  const navigate = useNavigate();

  const packages = [
    {
      id: "loi-rung",
      title: "LỐI RỪNG",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/loirung_ngang.jpg?updatedAt=1749269171985",
      orientation: "landscape",
      description: "Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.",
      price: "150.000 - 250.000",
      childPrice: "50% giá người lớn",
      details: [
        "Thưởng thức trà Atiso chào mừng",
        "Tham quan tự do các không gian bảo tàng: hiện vật K'Ho, chân dung Yersin bằng vỏ thông, bộ sưu tập tranh Đà Lạt",
        "1 phần nước uống tự chọn",
      ],
    },
    {
      id: "dang-suong",
      title: "DÁNG SƯƠNG",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Dangsuong_ngang.jpg?updatedAt=1749269172040",
      orientation: "landscape",
      description:
        "Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận",
      price: "350.000 - 450.000",
      childPrice: "50% giá người lớn",
      details: [
        "Thưởng thức trà atiso chào mừng",
        "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
        "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
        "1 phần nước uống tự chọn",
      ],
    },
    {
      id: "nghe-nhan",
      title: "NGHỆ NHÂN",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Thumbnail%20Ngh%E1%BB%87%20Nh%C3%A2n.png?updatedAt=1750322897429",
      orientation: "landscape",
      description:
        "Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ",
      price: "399.000 - 599.000",
      childPrice: "50% giá người lớn",
      details: [
        "Thưởng thức trà atiso chào mừng",
        "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
        "Workshop vẽ tranh, dệt thổ cẩm hoặc nặn gốm (120 phút)",
        "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
      ],
    },
    {
      id: "hon-nui",
      title: "HỒN NÚI",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/Leaflet%20H%E1%BB%93n%20N%C3%BAi.png?updatedAt=1749083706305",
      orientation: "square",
      description:
        "Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan",
      price: "799.000 - 999.000",
      childPrice: "50% giá người lớn",
      note: "Tour rừng tối thiểu 5 khách để đảm bảo an toàn",
      details: [
        "Thưởng thức trà atiso chào mừng",
        "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
        "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
        "Lựa chọn Tour Khám phá rừng nguyên sinh hoặc Worshop (vẽ tranh, dệt thổ cẩm, làm gốm,...)",
        "Bữa trưa nhẹ gồm 01 món ăn và 01 thức uống",
      ],
    },
    {
      id: "lua-thieng",
      title: "LỬA THIÊNG / Pin D'amour",
      image:
        "https://ik.imagekit.io/8u8lkoqkkm/luathieng_ngang.jpg?updatedAt=1749269172114",
      orientation: "square",
      description:
        "Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm",
      price: "999.000 - 1.999.000",
      time: "18:00 - 22:30",
      note: "Không áp dụng cho trẻ em",
      details: [
        "Thưởng thức welcome drink chào mừng",
        "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
        "Chụp ảnh nghệ thuật tại bảo tàng (30 phút)",
        'Trải nghiệm sân khấu Pind\'amour với chương trình Vin Acoustic "Thông Hát" và rượu vang thượng hạng và 01 phần ăn nhẹ',
      ],
    },
  ];

  return (
    <div className="packages-container">
      <div className="packages-hero">
        <button className="back-button1" onClick={() => navigate("/visit")}>
          <MdArrowBack />
        </button>
        <div className="hero-image-container">
          <img
            src="https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru_Trong.jpg?updatedAt=1749268862925"
            alt="Gói không lưu trú"
            className="hero-image portrait"
          />
        </div>
        <div className="packages-hero-content">
          <h1 className="packages-title">GÓI KHÔNG LƯU TRÚ</h1>
        </div>
      </div>

      <div className="packages-content">
        <div className="packages-grid">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="visit-cardss"
              onClick={() => navigate(`/visit/package/${pkg.id}`)}
            >
              <div className="visit-cards-img-wrap">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className={`visit-cards-img ${pkg.orientation}`}
                />
                <div className="visit-cards-overlay" />
                <div className="visit-card-content">
                  <h2>{pkg.title}</h2>
                  {/* <p>{pkg.description}</p> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NonResidentialPackages;
