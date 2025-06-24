import React, { useEffect, useState } from "react";
import { FaSearch, FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./TicketList.css";

const TicketList = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc'

  useEffect(() => {
    // Get all packages data
    const allPackages = {
      "loi-rung": {
        title: "LỐI RỪNG",
        description: "Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.",
        fullDescription: `Bước chân đầu tiên vào không gian ký ức Đà Lạt xưa.`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/loirung_doc.png?updatedAt=1749269173624",
        price: "150.000 - 250.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà Atiso chào mừng",
          "Tham quan tự do các không gian bảo tàng: hiện vật K'Ho, chân dung Yersin bằng vỏ thông, bộ sưu tập tranh Đà Lạt",
          "1 phần nước uống tự chọn",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Trải nghiệm Lối Rừng",
        },
      },
      "dang-suong": {
        title: "DÁNG SƯƠNG",
        description:
          "Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận",
        fullDescription: `Nhẹ nhàng chạm vào không gian nghệ thuật để lắng nghe và cảm nhận`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Dangsuong_Doc.jpg?updatedAt=1749269171830",
        price: "350.000 - 450.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
          "1 phần nước uống tự chọn",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Khám Phá Dáng Sương",
        },
      },
      "nghe-nhan": {
        title: "NGHỆ NHÂN",
        description:
          "Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ",
        fullDescription: `Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Thumbnail%20Ngh%E1%BB%87%20Nh%C3%A2n.png?updatedAt=1750322897429",
        price: "399.000 - 599.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Workshop vẽ tranh, dệt thổ cẩm hoặc nặn gốm (120 phút)",
          "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Workshop Nghệ Nhân",
        },
      },
      "hon-nui": {
        title: "HỒN NÚI",
        description:
          "Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan",
        fullDescription: `Trọn vẹn trải nghiệm văn hóa và thiên nhiên Đà Lạt, như tinh thần núi rừng thấm vào từng giác quan`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Honnui_Doc.jpg?updatedAt=1749269171601",
        price: "799.000 - 999.000đ",
        childPrice: "50% giá người lớn",
        note: "Trẻ em phải có cha mẹ, người giám hộ đi kèm. Tour rừng tối thiểu 5 khách để đảm bảo an toàn",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng với trang phục dân tộc (30 phút)",
          "Lựa chọn Tour Khám phá rừng nguyên sinh hoặc Worshop (vẽ tranh, dệt thổ cẩm, làm gốm,...)",
          "Bữa trưa nhẹ gồm 01 món ăn và 01 thức uống",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Trải Nghiệm Hồn Núi",
        },
      },
      "lua-thieng": {
        title: "LỬA THIÊNG / Pind' Amour",
        description:
          "Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm",
        fullDescription: `Buổi tối bùng cháy với âm nhạc, nghệ thuật, văn hóa, rượu và không gian view toàn cảnh Đà Lạt về đêm`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
        price: "999.000 - 1.999.000đ",
        time: "18:00 - 22:30",
        note: "Không áp dụng cho trẻ em",
        details: [
          "Thưởng thức welcome drink chào mừng",
          "Tham quan có hướng dẫn viên các không gian bảo tàng (hiện vật K'Ho, chân dung Yersin, tranh Đà Lạt)",
          "Chụp ảnh nghệ thuật tại bảo tàng (30 phút)",
          'Trải nghiệm sân khấu Pind\'amour với chương trình Vin Acoustic "Thông Hát" và rượu vang thượng hạng và 01 phần ăn nhẹ',
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Đêm Lửa Thiêng",
        },
      },
      "dem-thong": {
        title: "ĐÊM THÔNG",
        description:
          "Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên",
        fullDescription: `Không gian tĩnh lặng để nghỉ ngơi, kết nối nội tâm với thiên nhiên`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/DemThong_Trong.jpg?updatedAt=1749312390412",
        price: "499.000 - 899.000đ",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
          "Lưu trú 1 đêm",
          "Bữa sáng với đặc sản địa phương",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Đêm Thông",
        },
      },
      "bong-cay-konia": {
        title: "BÓNG CÂY KƠNIA",
        description:
          "Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp",
        fullDescription: `Hành trình khám phá rừng nguyên sinh ngàn năm, kết hợp nghỉ dưỡng đẳng cấp`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/bongcay-doc.png?updatedAt=1750002737327",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Thưởng thức trà atiso chào mừng",
          "Tham quan và nghe thuyết minh về phòng nghệ thuật sẽ lưu trú",
          "Lưu trú 1 đêm",
          "Bữa sáng với đặc sản địa phương",
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Tour khám phá rừng nguyên sinh ngàn năm",
          "Tặng gói chụp ảnh nghệ thuật (1 tiếng)",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Bóng Cây Kơnia",
        },
      },
      "truong-ca-langbiang": {
        title: "TRƯỜNG CA LANGBIANG",
        description:
          "Trải nghiệm toàn diện như bản trường ca sống động nhất về Đà Lạt – từ nghệ thuật, thiên nhiên đến âm nhạc. Trọn vẹn cảm xúc 5 giác quan",
        fullDescription: `Trải nghiệm toàn diện như bản trường ca sống động nhất về Đà Lạt – từ nghệ thuật, thiên nhiên đến âm nhạc. Trọn vẹn cảm xúc 5 giác quan`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/daa23646b65e02005b4f.jpg?updatedAt=1749083704100",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Đưa đón từ sân bay Liên Khương bằng xe VIP",
          "Lưu trú 1 đêm tại phòng nghệ thuật",
          "Tour VIP tham quan toàn bộ bảo tàng + Rừng nguyên sinh",
          'Chương trình "Thông Hát" riêng tư + Rượu vang hảo hạng',
          "Workshop Vẽ tranh, dệt thổ cẩm hoặc nấu ăn cùng nghệ nhân",
          "Bộ ảnh nghệ thuật chuyên nghiệp",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Trường Ca Langbiang",
        },
      },
      "dem-huyen-thoai": {
        title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
        description:
          "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
        fullDescription: `Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Tourdemhuyenthoai_Trong.jpg?updatedAt=1749312109881",
        price: "499.000đ",
        time: "19:00 - 21:00",
        schedule: "T3-T5 hàng tuần",
        details: [
          "Tham quan có hướng dẫn viên các không gian bảo tàng",
          "Trải nghiệm sân khấu tương tác điện ảnh với câu chuyện K'Ho",
          "01 thức uống + 01 snack",
          "Thước phim điện ảnh",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Đêm Huyền Thoại Langbiang",
        },
      },
      "giai-dieu-dai-ngan": {
        title: "GIAI ĐIỆU ĐẠI NGÀN - LẮNG NGHE THÔNG HÁT",
        description: "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
        fullDescription: `Hòa nhạc acoustic với chủ đề thay đổi hàng tháng`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Trong.jpg?updatedAt=1749311873117",
        price: "799.000đ",
        time: "19:00 - 22:30",
        schedule: "Thứ 6-T7-CN",
        details: ["Rượu vang", "Thức ăn nhẹ", "Âm nhạc theo chủ đề"],
        video: {
          id: "aozcRuYVPKw",
          title: "Giai Điệu Đại Ngàn",
        },
      },
      "uom-mam-sang-tao": {
        title: "ƯƠM MẦM SÁNG TẠO",
        description: "Các gói trải nghiệm cho bé",
        fullDescription: `Các gói trải nghiệm cho bé`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
        price: "299.000đ",
        time: "Sáng: 8h - 12h, Chiều: 14h - 18h",
        details: [
          "Workshop: Tay nặn tay vẽ hoặc chế tác đồ thủ công từ thông",
          "Chụp ảnh nghệ thuật tại bảo tàng",
          "01 thức uống + 01 snack",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Ươm Mầm Sáng Tạo",
        },
      },
      "chup-anh-nghe-thuat": {
        title: "CHỤP ẢNH NGHỆ THUẬT",
        description:
          "Du khách sẽ được sở hữu những tấm ảnh nghệ thuật của chính mình trong không gian Bảo Tàng",
        fullDescription: `Du khách sẽ được sở hữu những tấm ảnh nghệ thuật của chính mình trong không gian Bảo Tàng hay trong từng căn phòng art studio, cùng với nghệ nhân hay nhân vật theo chủ đề. Bảo Tàng Thông cung cấp trang phục, đạo cụ riêng phù hợp với từng không gian`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru.jpg?updatedAt=1749267196332",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Chụp ảnh trong không gian Bảo Tàng",
          "Chụp ảnh trong các phòng art studio",
          "Trang phục và đạo cụ theo chủ đề",
          "Chụp ảnh cùng nghệ nhân hoặc nhân vật theo chủ đề",
          "Hậu kỳ và chỉnh sửa chuyên nghiệp",
          "Album ảnh kỹ thuật số chất lượng cao",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Chụp ảnh nghệ thuật tại Musée Du Pin",
        },
      },
      "phim-dien-anh": {
        title: "PHIM ĐIỆN ẢNH",
        description:
          "Toàn bộ chuyến đi của du khách và gia đình sẽ được ê kíp đoàn làm phim ghi lại",
        fullDescription: `Toàn bộ chuyến đi của du khách và gia đình sẽ được ê kíp đoàn làm phim ghi lại với thiết bị máy móc hiện đại để chọn lọc tạo ra 1 thước phim điện ảnh riêng về hành trình du khảo.`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru.jpg?updatedAt=1749267196332",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Quay phim bằng thiết bị hiện đại",
          "Ê-kíp quay phim chuyên nghiệp",
          "Kịch bản và góc máy được lên kế hoạch chi tiết",
          "Hậu kỳ và dựng phim chuyên nghiệp",
          "Phim được chỉnh màu điện ảnh",
          "Bản phim chất lượng cao trên nhiều định dạng",
        ],
        video: {
          id: "aozcRuYVPKw",
          title: "Dịch vụ quay phim tại Musée Du Pin",
        },
      },
      "the-childhood": {
        title: "THE CHILDHOOD",
        description: "",
        fullDescription:
          "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748840047/collections/thechillhood.jpg",
        price: "2.800.000đ/đêm",
        details: [
          "Phòng nghỉ thoải mái",
          "Trang trí truyền thống",
          "Bữa ăn tự nấu",
          "Không gian riêng tư",
          "Trải nghiệm văn hóa địa phương",
        ],
      },
      "white-bauhunia": {
        title: "WHITE BAUHUNIA",
        description: "",
        fullDescription:
          "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846791/collections/whitebauhinia.jpg",
        price: "4.200.000đ/đêm",
        details: [
          "Thiết kế hiện đại",
          "Đầy đủ tiện nghi",
          "Vị trí thuận tiện",
          "Dịch vụ cao cấp",
          "View thành phố",
        ],
      },
      "the-chill-1": {
        title: "THE CHILL 1",
        description: "",
        fullDescription:
          "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846806/collections/thechill1.jpg",
        price: "8.200.000đ/đêm",
        details: [
          "Biệt thự riêng biệt",
          "Vườn riêng",
          "Dịch vụ cao cấp",
          "View thành phố",
          "Không gian rộng rãi",
        ],
      },
      "the-chill-2": {
        title: "THE CHILL 2",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846806/collections/thechill2.jpg",
        price: "1.750.000đ/đêm",
        details: [
          "Phòng riêng thoải mái",
          "Giá cả hợp lý",
          "Gần phương tiện công cộng",
          "Tiện nghi đầy đủ",
          "Không gian chung rộng rãi",
        ],
      },
      "the-memory": {
        title: "THE MEMORY",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846800/collections/thememory.jpg",
        price: "1.750.000đ/đêm",
        details: [
          "Thiết kế hoài cổ",
          "Không gian yên tĩnh",
          "Tiện nghi hiện đại",
          "View đẹp",
          "Dịch vụ chu đáo",
        ],
      },
      "the-sunset": {
        title: "THE SUNSET",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846798/collections/thesunset.jpg",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "View hoàng hôn tuyệt đẹp",
          "Ban công riêng",
          "Nội thất cao cấp",
          "Dịch vụ 24/7",
          "Không gian yên tĩnh",
        ],
      },
      "the-train": {
        title: "THE TRAIN",
        description: "",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748846795/collections/thetrain.jpg",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Thiết kế độc đáo",
          "Trải nghiệm mới lạ",
          "Tiện nghi hiện đại",
          "View đặc biệt",
          "Dịch vụ chuyên nghiệp",
        ],
      },
    };

    // Convert object to array and add id
    const ticketArray = Object.entries(allPackages).map(([id, ticket]) => ({
      id,
      ...ticket,
      basePrice:
        parseInt(ticket.price.split(" - ")[0].replace(/\D/g, ""), 10) || 0,
    }));

    setTickets(ticketArray);
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredAndSortedTickets = tickets
    .filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.basePrice - b.basePrice;
      } else {
        return b.basePrice - a.basePrice;
      }
    });

  return (
    <div className="ticket-list-container">
      <div className="ticket-list-header">
        <h1>Danh sách vé tham quan</h1>
        <div className="ticket-list-controls">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm vé..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button className="sort-button" onClick={toggleSortOrder}>
            {sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />}
            Sắp xếp theo giá
          </button>
        </div>
      </div>

      <div className="tickets-grid">
        {filteredAndSortedTickets.map((ticket) => (
          <div key={ticket.id} className="ticket-card">
            <div className="ticket-image">
              <img src={ticket.image} alt={ticket.title} />
            </div>
            <div className="ticket-content">
              <h3>{ticket.title}</h3>
              <p className="description">{ticket.description}</p>
              <div className="ticket-footer">
                <div className="price-info">
                  <p className="price">{ticket.price}</p>
                  {ticket.childPrice && (
                    <p className="child-price">Trẻ em: {ticket.childPrice}</p>
                  )}
                </div>
                <button
                  className="book-button"
                  onClick={() => navigate(`/checkout/package/${ticket.id}`)}
                >
                  Đặt vé
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TicketList;
