import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import AddressModal from "../../components/AddressModal/AddressModal";
import LoginModal from "../../components/Auth/LoginModal";
import CartFooter from "../../components/CartFooter/CartFooter";
import DateSelection from "../../components/DateSelection/DateSelection";
import OrderSteps from "../../components/OrderSteps/OrderSteps";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import TicketSelection from "../../components/TicketSelection/TicketSelection";
import TimeSelection from "../../components/TimeSelection/TimeSelection";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { packageId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [packageData, setPackageData] = useState(null);
  const [bookingId, setBookingId] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("bank");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCapacity, setSelectedCapacity] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserInfo();
    }
    fetchPackageData();
  }, [packageId]);

  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://mussedupin.onrender.com/api/user/info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        setUserInfo(data.user);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const fetchPackageData = async () => {
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
          "https://ik.imagekit.io/8u8lkoqkkm/image.png?updatedAt=1749008666857",
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
        description: "Tuổi ấu thơ - The Childhood",
        fullDescription:
          "Nhà ở địa phương đích thực với trang trí truyền thống và bữa ăn tự nấu.",
        image:
          "https://ik.imagekit.io/8u8lkoqkkm/Tu%E1%BB%95i%20%E1%BA%A5u%20th%C6%A1-%20The%20Childhood/z6735013755648_e134fda3141c25a0a9fc67efa73d00de.jpg?updatedAt=1751274451818",
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
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
        capacityOptions: [
          { capacity: 3, price: 3000000, description: "Phù hợp cho 3 người" },
          { capacity: 4, price: 3500000, description: "Phù hợp cho 4 người" },
          { capacity: 5, price: 4000000, description: "Phù hợp cho 5 người" },
        ],
        price: 3000000,
        details: [
          "Thiết kế dễ thương",
          "Không gian ấm cúng",
          "Tiện nghi đầy đủ",
          "Dịch vụ chu đáo",
          "Phù hợp cặp đôi",
        ],
      },
    };

    const data = allPackages[packageId];
    if (data) {
      setPackageData(data);

      // Check if package has capacity options (room packages)
      if (data.capacityOptions) {
        // Set default capacity to first option
        setSelectedCapacity(data.capacityOptions[0]);
        setTickets([
          {
            title: `${data.title} - ${data.capacityOptions[0].capacity} người`,
            price: data.capacityOptions[0].price,
            quantity: 1,
            visitors: [{ name: "" }],
            capacity: data.capacityOptions[0].capacity,
          },
        ]);
      } else if (data.price.startsWith("Liên hệ:")) {
        // Contact-only packages
        setTickets([
          {
            title: `${data.title}`,
            price: "Liên hệ",
            quantity: 0,
            visitors: [],
            isContactOnly: true,
            contactNumber: data.price.split(":")[1].trim(),
          },
        ]);
      } else {
        // Regular packages with price ranges
        const basePrice = parseInt(
          data.price.split(" - ")[0].replace(/\D/g, ""),
          10
        );
        const childPrice = data.childPrice ? basePrice * 0.5 : null;

        setTickets([
          {
            title: `${data.title} - Người lớn`,
            price: basePrice,
            quantity: 0,
            visitors: [],
          },
          ...(childPrice
            ? [
                {
                  title: `${data.title} - Trẻ em`,
                  price: childPrice,
                  quantity: 0,
                  visitors: [],
                },
              ]
            : []),
        ]);
      }
    } else {
      // Handle package not found
      navigate("/not-found");
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleQuantityChange = (ticketIndex, newQuantity) => {
    if (packageData?.capacityOptions) {
      // For room packages with capacity options
      const capacity = packageData.capacityOptions.find(
        (option) => option.capacity === newQuantity
      );
      if (capacity) {
        setSelectedCapacity(capacity);
        const updatedTickets = [...tickets];
        updatedTickets[ticketIndex] = {
          ...updatedTickets[ticketIndex],
          title: `${packageData.title} - ${capacity.capacity} người`,
          price: capacity.price,
          quantity: 1,
          capacity: capacity.capacity,
          visitors: Array(capacity.capacity)
            .fill()
            .map(() => ({ name: "" })),
        };
        setTickets(updatedTickets);
      }
    } else {
      // For regular packages
      const updatedTickets = [...tickets];
      updatedTickets[ticketIndex] = {
        ...updatedTickets[ticketIndex],
        quantity: newQuantity,
        visitors: Array(newQuantity)
          .fill()
          .map(() => ({ name: "" })),
      };
      setTickets(updatedTickets);
    }
  };

  const handleVisitorNameChange = (ticketIndex, visitorIndex, name) => {
    setTickets((prevTickets) => {
      const updatedTickets = [...prevTickets];
      const ticket = { ...updatedTickets[ticketIndex] };
      ticket.visitors[visitorIndex].name = name;
      updatedTickets[ticketIndex] = ticket;
      return updatedTickets;
    });
  };

  const handleNextStep = async () => {
    if (currentStep === 1) {
      // Validate date, time and tickets
      if (!selectedDate || !selectedTime) {
        alert("Vui lòng chọn đầy đủ thông tin đặt vé");
        return;
      }

      // For capacity-based packages, check if capacity is selected
      if (packageData?.capacityOptions && !selectedCapacity) {
        alert("Vui lòng chọn số lượng người");
        return;
      }

      // For regular packages, check if tickets are selected
      if (
        !packageData?.capacityOptions &&
        !tickets.some((t) => t.quantity > 0)
      ) {
        alert("Vui lòng chọn ít nhất 1 vé");
        return;
      }

      // Validate visitor names only for non-room packages (packages without capacityOptions)
      if (!packageData?.capacityOptions) {
        const missingNames = tickets.some(
          (ticket) =>
            ticket.quantity > 0 && ticket.visitors.some((v) => !v.name.trim())
        );
        if (missingNames) {
          alert("Vui lòng nhập đầy đủ họ tên người tham quan");
          return;
        }
      }
    }

    if (currentStep === 2) {
      if (!isLoggedIn) {
        setShowLoginModal(true);
        return;
      }
      if (!userInfo?.address) {
        setShowAddressModal(true);
        return;
      }
    }

    if (currentStep === 3) {
      if (!paymentMethod) {
        alert("Vui lòng chọn phương thức thanh toán");
        return;
      }
      try {
        if (paymentMethod === "bank") {
          await generateQRCode();
        }
        setCurrentStep(4);
      } catch (error) {
        console.error("Error in payment process:", error);
        alert("Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại.");
      }
      return;
    }

    if (currentStep === 4) {
      setIsLoading(true);
      try {
        // Tạo mã đơn hàng
        const generatedBookingId = `MDP${Date.now()}`;
        setBookingId(generatedBookingId);

        const response = await fetch(
          "https://mussedupin.onrender.com/api/experience-bookings",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              packageId,
              selectedDate,
              selectedTime,
              tickets,
              selectedCapacity,
              userId: userInfo.id,
              userInfo,
              paymentMethod,
              bookingId: generatedBookingId,
            }),
          }
        );

        const data = await response.json();
        if (data.success) {
          setShowSuccessModal(true);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error creating booking:", error);
        alert("Có lỗi xảy ra khi đặt vé. Vui lòng thử lại.");
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const calculateTotal = () => {
    if (!packageData) return 0;

    if (packageData.capacityOptions && selectedCapacity) {
      // For room packages with capacity selection
      return selectedCapacity.price;
    } else if (tickets.some((t) => t.isContactOnly)) {
      // For contact-only packages
      return 0;
    } else {
      // For regular packages
      return tickets.reduce((total, ticket) => {
        return total + ticket.price * ticket.quantity;
      }, 0);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    setIsLoggedIn(true);
    fetchUserInfo();
    setCurrentStep(3);
  };

  const handleAddressUpdate = (newAddress) => {
    setUserInfo((prev) => ({ ...prev, address: newAddress }));
    setShowAddressModal(false);
    setCurrentStep(3);
  };

  const generateQRCode = async () => {
    const totalAmount = calculateTotal();
    const qrUrl = `https://api.vietqr.io/image/970418-3144068052-1kOIAUr.jpg?accountName=NGUYEN%20THANH%20HUNG&amount=${totalAmount}`;
    setQrCode(qrUrl);
  };

  const handlePaymentMethodSelect = (method) => {
    setPaymentMethod(method);
  };

  return (
    <div className="checkout-page">
      <div className="checkout-content">
        <h1 className="checkout-title">{packageData?.title || "Đặt vé"}</h1>
        <OrderSteps currentStep={currentStep} onStepClick={setCurrentStep} />

        {currentStep > 1 && (
          <button
            className="back-step-btn"
            onClick={() => setCurrentStep(currentStep - 1)}
            disabled={isLoading}
          >
            <FaArrowLeft /> Quay lại
          </button>
        )}

        {currentStep === 1 && (
          <>
            <DateSelection
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
            />
            <TimeSelection
              selectedTime={selectedTime}
              onTimeChange={handleTimeChange}
            />
            {packageData?.capacityOptions ? (
              <div className="capacity-selection-section">
                <h3>Chọn số lượng người</h3>
                <div className="capacity-options-grid">
                  {packageData.capacityOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`capacity-option-display-thanhtoan ${
                        selectedCapacity?.capacity === option.capacity
                          ? "active"
                          : ""
                      }`}
                      onClick={() => handleQuantityChange(0, option.capacity)}
                    >
                      <div className="capacity-info">
                        <span className="capacity-number">
                          {option.capacity}
                        </span>
                        <span className="capacity-label">người</span>
                      </div>
                      <div className="capacity-price">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(option.price)}
                      </div>
                      <div className="capacity-description">
                        {option.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <TicketSelection
                tickets={tickets}
                onQuantityChange={handleQuantityChange}
                onVisitorNameChange={handleVisitorNameChange}
                packageData={packageData}
              />
            )}
          </>
        )}

        {currentStep === 2 && (
          <div className="account-section">
            {!isLoggedIn ? (
              <div className="login-prompt">
                <h2>Đăng nhập để tiếp tục</h2>
                <p>Vui lòng đăng nhập hoặc đăng ký để hoàn tất đặt vé</p>
                <button onClick={() => setShowLoginModal(true)}>
                  Đăng nhập
                </button>
              </div>
            ) : (
              <div className="shipping-address">
                <h2>Địa chỉ giao hàng</h2>
                {userInfo?.address ? (
                  <div className="address-info">
                    <p>{userInfo.fullName}</p>
                    <p>{userInfo.phone}</p>
                    <p>{userInfo.address.street}</p>
                    <p>
                      {userInfo.address.city}, {userInfo.address.state}
                    </p>
                    <button
                      className="change-address-btn"
                      onClick={() => setShowAddressModal(true)}
                    >
                      Thay đổi địa chỉ
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setShowAddressModal(true)}>
                    Thêm địa chỉ
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="order-summary">
            <h2>Xác nhận đơn hàng</h2>
            <div className="order-content">
              <div className="order-details-section">
                <h3>Chi tiết đơn hàng</h3>
                <Table className="order-details">
                  <Thead>
                    <Tr>
                      <Th>Vé</Th>
                      <Th>Số lượng</Th>
                      {!packageData?.capacityOptions && (
                        <Th>Người tham quan</Th>
                      )}
                      <Th>Thời gian</Th>
                      <Th>Tổng tiền</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {tickets.map(
                      (ticket, index) =>
                        ticket.quantity > 0 && (
                          <Tr key={index}>
                            <Td>{ticket.title}</Td>
                            <Td>{ticket.quantity}</Td>
                            {!packageData?.capacityOptions && (
                              <Td>
                                {ticket.visitors.map((v) => v.name).join(", ")}
                              </Td>
                            )}
                            <Td>
                              {new Date(selectedDate).toLocaleDateString(
                                "vi-VN"
                              )}
                              <br />
                              {selectedTime}
                            </Td>
                            <Td>
                              {ticket.isContactOnly ? (
                                <a
                                  href={`tel:${ticket.contactNumber}`}
                                  style={{
                                    color: "#2c2f11",
                                    textDecoration: "none",
                                  }}
                                >
                                  Liên hệ: {ticket.contactNumber}
                                </a>
                              ) : (
                                `${(
                                  ticket.price * ticket.quantity
                                ).toLocaleString()}đ`
                              )}
                            </Td>
                          </Tr>
                        )
                    )}
                  </Tbody>
                </Table>
              </div>

              {!tickets.some((t) => t.isContactOnly) && (
                <>
                  <div className="payment-methods-section">
                    <h3>Phương thức thanh toán</h3>
                    <div className="payment-options">
                      <div
                        className={`payment-option ${
                          paymentMethod === "bank" ? "selected" : ""
                        }`}
                        onClick={() => handlePaymentMethodSelect("bank")}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "bank"}
                          onChange={() => {}}
                        />
                        <div className="payment-option-content">
                          <div className="payment-details">
                            <h4>Thanh toán qua ngân hàng</h4>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`payment-option ${
                          paymentMethod === "cash" ? "selected" : ""
                        }`}
                        onClick={() => handlePaymentMethodSelect("cash")}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={paymentMethod === "cash"}
                          onChange={() => {}}
                        />
                        <div className="payment-option-content">
                          <div className="payment-details">
                            <h4>Thanh toán tiền mặt</h4>
                            <p>Thanh toán trực tiếp tại quầy vé</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="order-summary-footer">
                    <div className="summary-total">
                      <span>Tổng cộng:</span>
                      <span className="total-amount">
                        {calculateTotal().toLocaleString()}đ
                      </span>
                    </div>
                    <p className="summary-note">
                      * Vui lòng kiểm tra kỹ thông tin đơn hàng trước khi tiến
                      hành thanh toán
                    </p>
                  </div>
                </>
              )}

              {tickets.some((t) => t.isContactOnly) && (
                <div className="contact-info-section">
                  <h3>Thông tin liên hệ</h3>
                  <p>Để biết thêm chi tiết và đặt vé, vui lòng liên hệ:</p>
                  {tickets.map(
                    (ticket, index) =>
                      ticket.isContactOnly && (
                        <a
                          key={index}
                          href={`tel:${ticket.contactNumber}`}
                          className="contact-button"
                          style={{
                            display: "inline-block",
                            padding: "10px 20px",
                            background: "#2c2f11",
                            color: "white",
                            textDecoration: "none",
                            borderRadius: "5px",
                            marginTop: "10px",
                          }}
                        >
                          Gọi ngay: {ticket.contactNumber}
                        </a>
                      )
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="payment-confirmation">
            <h2>Xác nhận thanh toán</h2>
            {paymentMethod === "bank" ? (
              <div className="bank-payment">
                <h3>Quét mã QR để thanh toán</h3>
                {qrCode && (
                  <img src={qrCode} alt="QR Code" className="qr-code" />
                )}
                <p>Số tiền: {calculateTotal().toLocaleString()}đ</p>
              </div>
            ) : (
              <div className="payment-summary">
                <p>Tổng tiền: {calculateTotal().toLocaleString()}đ</p>
                <p>
                  Vui lòng kiểm tra lại thông tin đặt vé trước khi hoàn tất. Bạn
                  sẽ thanh toán trực tiếp tại quầy vé.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <CartFooter
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        totalAmount={calculateTotal()}
        tickets={tickets}
        onNextStep={handleNextStep}
        currentStep={currentStep}
        packageData={packageData}
        selectedCapacity={selectedCapacity}
      />

      {showLoginModal && (
        <LoginModal
          isOpen={showLoginModal}
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {showAddressModal && (
        <AddressModal
          isOpen={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          currentAddress={userInfo?.address}
          onSave={handleAddressUpdate}
        />
      )}

      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => navigate("/")}
          message={`Đặt vé thành công! Mã đơn hàng của bạn là ${bookingId}`}
        />
      )}
    </div>
  );
};

export default CheckoutPage;
