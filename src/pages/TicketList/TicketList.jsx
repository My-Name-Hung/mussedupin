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
          id: "lb8HcNFDFtU",
          title: `Trải nghiệm Lối Rừng tại ${(
            <span className="notranslate">Musée Du Pin</span>
          )}`,
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
          id: "gJL4YdOunvA",
          title: "Khám Phá Dáng Sương",
        },
      },
      "nghe-nhan": {
        title: "NGHỆ NHÂN",
        description:
          "Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ",
        fullDescription: `Hòa mình vào thế giới sáng tạo với workshop thổ cẩm, vẽ tranh cùng nghệ nhân, họa sỹ`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Thumbnail%20Ngh%E1%BB%87%20Nh%C3%A2n%20D%E1%BB%8Dc.png?updatedAt=1750322897358",
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
          id: "1lVoCgIxUm4",
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
          id: "3hr-yyLqAy4",
          title: "Trải Nghiệm Hồn Núi",
        },
      },
      "lua-thieng": {
        title: "LỬA THIÊNG / Pin d'Amour",
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
          id: "_qP_eGPzVJE",
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
          id: "Ja3XeTu-r54",
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
          id: "2zuGLmyZgfU",
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
          id: "OI6r5SW9BiM",
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
        title: "",
        description: "",
        fullDescription: ``,
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
        fullDescription: `Du khách sẽ được sở hữu những tấm ảnh nghệ thuật của chính mình trong không gian Bảo Tàng hay trong từng căn phòng art studio, cùng với nghệ nhân hay nhân vật theo chủ đề. Bảo Tàng cung cấp trang phục, đạo cụ riêng phù hợp với từng không gian`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/chupanhnghethuat_ngang.jpg?updatedAt=1750298609133",
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
          title: `Chụp ảnh nghệ thuật tại ${(
            <span className="notranslate">Musée Du Pin</span>
          )}`,
        },
      },
      "phim-dien-anh": {
        title: "PHIM ĐIỆN ẢNH",
        description:
          "Toàn bộ chuyến đi của du khách và gia đình sẽ được ê kíp đoàn làm phim ghi lại",
        fullDescription: `Toàn bộ chuyến đi của du khách và gia đình sẽ được ê kíp đoàn làm phim ghi lại với thiết bị máy móc hiện đại để chọn lọc tạo ra 1 thước phim điện ảnh riêng về hành trình du khảo.`,
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/phimdienanh_ngang.jpg?updatedAt=1750298609073",
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
          title: `Dịch vụ quay phim tại ${(
            <span className="notranslate">Musée Du Pin</span>
          )}`,
        },
      },
      "the-childhood": {
        title: "THE CHILDHOOD",
        description: "Tuổi ấu thơ - The Childhood",
        fullDescription:
          "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Tu%E1%BB%95i%20%E1%BA%A5u%20th%C6%A1-%20The%20Childhood/z6735013755648_e134fda3141c25a0a9fc67efa73d00de.jpg?updatedAt=1751274451818",
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
        description: "Hoa Ban Trắng - Bauhinia",
        fullDescription:
          "Căn hộ sang trọng với đầy đủ tiện nghi, cách bảo tàng 10 phút đi bộ.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Hoa%20Ban%20Tr%E1%BA%AFng-%20Bauhinia/z6735015913658_0a13ac137c59ccacc8e376f1d7f63ce8.jpg?updatedAt=1751274467967",
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
        title: "THE CHILL I",
        description: "Bình yên I - The Chill I",
        fullDescription:
          "Biệt thự tuyệt đẹp với vườn riêng, dịch vụ cao cấp và view thành phố ngoạn mục.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20I-%20The%20Chill%20I/z6735017008335_1f53d54c8c667e714237c694c6fb2bf0.jpg?updatedAt=1751274193309",
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
        title: "THE CHILL II",
        description: "Bình yên II - The Chill II",
        fullDescription:
          "Phòng riêng thoải mái và giá cả phải chăng trong căn hộ chung gần phương tiện công cộng.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/B%C3%ACnh%20y%C3%AAn%20II-%20The%20Chill%20II/z6735017019144_2e97325679ec2dbf6248ee217d2c005e.jpg?updatedAt=1751274217344",
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
        description: "Hoài Niệm - The Memory",
        fullDescription: "Không gian hoài cổ với nội thất tinh tế và view đẹp.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0i%20Ni%E1%BB%87m-%20The%20Memory/z6735016111786_26063d0dd74c1796f25a106e4e7e48cb.jpg?updatedAt=1751274468488",
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
        description: "Hoàng hôn - The Sunset",
        fullDescription:
          "Phòng nghỉ với view hoàng hôn tuyệt đẹp và không gian yên tĩnh.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Ho%C3%A0ng%20h%C3%B4n-%20The%20Sunset/z6735016357613_e2751dcece85c553aaa0c8e54f9e5d11.jpg?updatedAt=1751274470184",
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
        description: "Toa tàu - The Train",
        fullDescription:
          "Trải nghiệm độc đáo trong không gian thiết kế theo phong cách toa tàu.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Toa%20t%C3%A0u-%20The%20Train/z6735013970930_367d839a1762df6694ba9fde11f52475.jpg?updatedAt=1751274451540",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Thiết kế độc đáo",
          "Trải nghiệm mới lạ",
          "Tiện nghi hiện đại",
          "View đặc biệt",
          "Dịch vụ chuyên nghiệp",
        ],
      },
      "the-pine-hill": {
        title: "THE PINE HILL",
        description: "Đồi Thông - The Pine Hill",
        fullDescription:
          "Phòng nghỉ với view đồi thông và không gian yên bình.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/%C4%90%E1%BB%93i%20Th%C3%B4ng-%20The%20Pine%20Hill/z6735015682281_4f24f3571385b7a2b97d36acd8ba8113.jpg?updatedAt=1751274459265",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "View đồi thông",
          "Không gian yên bình",
          "Tiện nghi hiện đại",
          "Dịch vụ chu đáo",
          "Phù hợp nghỉ dưỡng",
        ],
      },
      "the-fall": {
        title: "THE FALL",
        description: "Thác đổ - The Fall",
        fullDescription:
          "Phòng nghỉ với thiết kế độc đáo lấy cảm hứng từ thác nước.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Th%C3%A1c%20%C4%91%E1%BB%95-%20The%20Fall/z6735013550592_06292038d263699476dd8144aa005946.jpg?updatedAt=1751274451608",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Thiết kế độc đáo",
          "Không gian thư giãn",
          "Tiện nghi hiện đại",
          "View đẹp",
          "Dịch vụ chuyên nghiệp",
        ],
      },
      "the-kite": {
        title: "THE KITE",
        description: "Cánh diều - The Kite",
        fullDescription:
          "Phòng nghỉ với không gian thoáng đãng và view panorama.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/C%C3%A1nh%20di%E1%BB%81u-%20The%20Kite/404%20-%201.png?updatedAt=1751274406678",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "View panorama",
          "Không gian thoáng đãng",
          "Tiện nghi cao cấp",
          "Dịch vụ 24/7",
          "Thiết kế hiện đại",
        ],
      },
      "the-strawberry": {
        title: "THE STRAWBERRY",
        description: "Dâu tây - Strawberry",
        fullDescription:
          "Phòng nghỉ với thiết kế dễ thương lấy cảm hứng từ vườn dâu tây.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/D%C3%A2u%20t%C3%A2y-%20Strawberry/z6735068946993_6566743fb95325c53d9b69e966e2ae4a.jpg?updatedAt=1751274423030",
        price: "Liên hệ: +84 86 235 6368",
        details: [
          "Thiết kế dễ thương",
          "Không gian ấm cúng",
          "Tiện nghi đầy đủ",
          "Dịch vụ chu đáo",
          "Phù hợp cặp đôi",
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
