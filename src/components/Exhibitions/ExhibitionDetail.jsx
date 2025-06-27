import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
import {
  getGalleryImageUrl,
  getImageUrl,
  getThumbnailUrl,
} from "../../utils/cloudinary";
import "./ExhibitionDetail.css";

// Import optimized images

// Import gallery images for Phuc Tang

// Import thumbnails for related items

// Combined data for both exhibitions and guided tours
const allItemsData = {
  // Exhibitions
  // "cong-chieng": {
  //   id: "cong-chieng",
  //   title: "Dụng cụ âm nhạc Tây Nguyên",
  //   subtitle: "Cồng chiêng",
  //   description:
  //     "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng. Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
  //   date: "30 tháng 4 - 28 tháng 7 2025",
  //   location: "Tầng 1",
  //   image: congchieng,
  //   alt: "Dụng cụ âm nhạc Tây Nguyên",
  //   tag: "Trưng bày",
  //   longDescription: [
  //     "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng.",
  //     "Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
  //     "Cồng chiêng không chỉ là nhạc cụ mà còn là vật phẩm thiêng liêng trong các nghi lễ và lễ hội truyền thống của người Tây Nguyên.",
  //   ],
  //   curators: ["Musée Du Pin"],
  //   type: "exhibition",
  // },
  // "long-da-da": {
  //   id: "long-da-da",
  //   title: "K'ho chăn nuôi",
  //   subtitle: "Lồng đa đa",
  //   description:
  //     "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên.",
  //   date: "24 tháng 1 - 21 tháng 7 2025",
  //   location: "Tầng 2",
  //   image: longda,
  //   alt: "K'ho chăn nuôi",
  //   tag: "Trưng bày",
  //   longDescription: [
  //     "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên.",
  //     "Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
  //     "Đây là một trong những hiện vật quý giá thể hiện đời sống văn hóa vật chất của người K'ho.",
  //   ],
  //   curators: ["Musée Du Pin"],
  //   type: "exhibition",
  // },
  // "tuong-phu-nu": {
  //   id: "tuong-phu-nu",
  //   title: "K'ho điêu khắc",
  //   subtitle: "Tượng phụ nữ",
  //   description:
  //     "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm.",
  //   date: "22 tháng 1 - 12 tháng 5 2025",
  //   location: "Tầng 3",
  //   image: phunu,
  //   alt: "K'ho điêu khắc",
  //   tag: "Trưng bày",
  //   longDescription: [
  //     "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa.",
  //     "Tác phẩm mang đậm phong cách mộc mạc nhưng đầy chiều sâu văn hóa, phản ánh vẻ đẹp nội tâm, tinh thần kiên cường và vai trò quan trọng của người phụ nữ trong đời sống cộng đồng K'ho.",
  //     "Đây là một trong những hiện vật quý hiếm thể hiện nghệ thuật điêu khắc truyền thống của người K'ho.",
  //   ],
  //   curators: ["Musée Du Pin"],
  //   type: "exhibition",
  // },
  // "che-gho-sanh": {
  //   id: "che-gho-sanh",
  //   title: "K'ho lễ hội",
  //   subtitle: "Ché Ghò Sành",
  //   description:
  //     "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin.",
  //   date: "29 tháng 2 - 28 tháng 9 2025",
  //   location: "Tầng 1",
  //   image: cheghosanh,
  //   alt: "K'ho lễ hội",
  //   tag: "Trưng bày",
  //   longDescription: [
  //     "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin.",
  //     "Đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
  //     "Ché được sử dụng trong các nghi lễ quan trọng và là vật phẩm quý giá được truyền từ đời này sang đời khác.",
  //   ],
  //   curators: ["Musée Du Pin"],
  //   type: "exhibition",
  // },
  // "noi-dat": {
  //   id: "noi-dat",
  //   title: "K'ho sinh hoạt thường nhật",
  //   subtitle: "Nồi đất",
  //   description:
  //     "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn.",
  //   date: "Trưng bày thường xuyên",
  //   location: "Tầng 3",
  //   image: noidat,
  //   alt: "K'ho sinh hoạt thường nhật",
  //   tag: "Trưng bày",
  //   longDescription: [
  //     "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn.",
  //     "Thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình.",
  //     "Đây là một trong những hiện vật thể hiện đời sống sinh hoạt hàng ngày của người K'ho.",
  //   ],
  //   curators: ["Musée Du Pin"],
  //   type: "exhibition",
  // },
  // "vat-lieu": {
  //   id: "vat-lieu",
  //   title: "Vật liệu",
  //   subtitle: "Chất liệu K'ho",
  //   description:
  //     "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên. Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
  //   date: "Trưng bày thường xuyên",
  //   location: "Tầng 2",
  //   image: hoabantrang,
  //   alt: "Vật liệu",
  //   tag: "Trưng bày",
  //   longDescription: [
  //     "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên.",
  //     "Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
  //     "Mỗi chất liệu đều mang trong mình câu chuyện về sự gắn kết giữa con người với thiên nhiên, về kỹ thuật chế tác truyền thống, và về triết lý sống hài hòa với môi trường của người K'ho.",
  //   ],
  //   curators: ["Musée Du Pin"],
  //   type: "exhibition",
  // },
  "langbiang-khong-gian": {
    id: "langbiang-khong-gian",
    title: "LANGBIANG - KHÔNG GIAN NGHỆ THUẬT SỐNG CÙNG VĂN HOÁ",
    subtitle: "",
    description:
      "Khi nghệ thuật không chỉ để ngắm, mà để sống cùng và sống trong. Không có tủ kính ngăn cách. Không có rào chắn giữa người và hiện vật.",
    date: "30 tháng 4 - 28 tháng 7 2025",
    location: "Tầng 1",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/8349122d9b192f477608.jpg?updatedAt=1749174236204",
    alt: "Không gian nghệ thuật Langbiang",
    tag: "Trưng bày",
    longDescription: [
      "Khi nghệ thuật không chỉ để ngắm, mà để sống cùng và sống trong. Không có tủ kính ngăn cách. Không có rào chắn giữa người và hiện vật.",
      "Langbiang không đơn thuần là một căn phòng, mà là một vùng ký ức sống, nơi hồn cốt của núi rừng thở trong từng vật phẩm, cháy trong từng ngọn lửa bếp, ngân nga trong từng tiếng cồng chiêng.",
      "Bạn không đến đây để nhìn, mà để chạm. Không để nghe kể, mà để nghe thức tỉnh. Không để chụp hình, mà để gặp lại chính mình trong một nền văn hóa từng bị lãng quên.",
      "Khi cánh cửa Langbiang mở ra, những giá trị truyền thống và văn hoá của mảnh đất ngàn thông này cũng được toả lan khắp nơi, vậy nên hãy đến và mở cánh cửa Langbiang, bạn nhé!",
      "Chạm tay vào hiện vật. Nghe rừng lên tiếng. Cảm được cội nguồn",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "exhibition",
  },
  "phuc-tang-tram-mac": {
    id: "phuc-tang-tram-mac",
    title: "Phức Tầng",
    subtitle: "",
    description:
      "Đà Lạt những phức tầng trầm mặc, in lên mây, những hàng thông điệp khúc, Trên triền dốc, những nếp nhà khảm vào nhau.",
    date: "2025",
    location: "Tầng 2",
    image: "Thông 2.webp",
    alt: "Đà Lạt những phức tầng trầm mặc",
    tag: "Trưng bày",
    longDescription: [
      "Đà Lạt những phức tầng trầm mặc",
      "In lên mây, những hàng thông điệp khúc,",
      "Trên triền dốc, những nếp nhà khảm vào nhau,",
      "Bao than thở chất chồng in bóng mặt hồ.",
      "Trong lòng lữ khách độc hành",
      "Trái thông khô mở vảy.",
    ],
    curators: ["Tùng Xuân Lâm"],
    type: "exhibition",
    gallery: [
      { image: "Cô đơn.webp", title: "Cô đơn" },
      { image: "Gào thét.webp", title: "Gào thét" },
      { image: "Lãng du.webp", title: "Lãng du" },
      { image: "Mênh mang.webp", title: "Mênh mang" },
      { image: "Thông 1.webp", title: "Thông 1" },
      { image: "Thông 2.webp", title: "Thông 2" },
      { image: "Thông 3.webp", title: "Thông 3" },
      { image: "Thông 4.webp", title: "Thông 4" },
      { image: "Trầm mặc.webp", title: "Trầm mặc" },
    ],
  },

  // Guided Tours
  "bau-ho-lo": {
    id: "bau-ho-lo",
    title: "K'ho sinh hoạt thường nhật",
    subtitle: "Bầu hồ lô",
    description:
      "Được khoét rỗng từ quả hồ lô khô, vật phẩm này thường được dùng để đựng nước, rượu cần hoặc làm nhạc cụ truyền thống",
    duration: "1 giờ 30 phút",
    schedule: "Hàng ngày lúc 10:00 và 14:00",
    image: "46.webp",
    alt: "K'ho sinh hoạt thường nhật",
    tag: "Tham quan",
    longDescription: [
      "Được khoét rỗng từ quả hồ lô khô, vật phẩm này thường được dùng để đựng nước, rượu cần hoặc làm nhạc cụ truyền thống.",
      "Bầu hồ lô là một vật dụng đa năng trong đời sống hàng ngày của người K'ho.",
      "Ngoài công dụng chứa đựng, bầu hồ lô còn được sử dụng làm nhạc cụ trong các dịp lễ hội.",
    ],
    highlights: [
      "Kỹ thuật chế tác truyền thống",
      "Công dụng đa năng",
      "Vai trò trong đời sống văn hóa",
      "Giá trị nghệ thuật",
    ],
    price: "200.000 VND/người",
    type: "tour",
  },
  // "phuc-tang": {
  //   id: "phuc-tang",
  //   title: "Phức Tầng",
  //   subtitle: "Thiên nhiên K'ho",
  //   description:
  //     "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
  //   duration: "1 giờ 15 phút",
  //   schedule: "Hàng thứ 2, thứ 4, thứ 6 lúc 11:30",
  //   image: thong2,
  //   alt: "Phức Tầng",
  //   tag: "Tham quan",
  //   longDescription: [
  //     "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
  //     "Bức tranh thiên nhiên hùng vĩ của Tây Nguyên được thể hiện qua góc nhìn nghệ thuật độc đáo.",
  //     "Triển lãm mang đến cái nhìn mới mẻ về vẻ đẹp tự nhiên của vùng đất K'ho.",
  //   ],
  //   highlights: [
  //     "Góc nhìn nghệ thuật độc đáo",
  //     "Vẻ đẹp thiên nhiên Tây Nguyên",
  //     "Đời sống văn hóa K'ho",
  //     "Nghệ thuật nhiếp ảnh",
  //   ],
  //   price: "180.000 VND/người",
  //   type: "tour",
  // },
  // gui: {
  //   id: "gui",
  //   title: "K'ho sinh hoạt thường nhật",
  //   subtitle: "Gùi",
  //   description:
  //     "Được Musée Du Pin đan bằng tre, nứa hoặc lồ ô, gùi không chỉ dùng để mang theo lương thực, củi, nông sản mà còn là hình ảnh quen thuộc gắn liền với vai trò của người phụ nữ trong gia đình và cộng đồng.",
  //   duration: "1 giờ 15 phút",
  //   schedule: "Hàng thứ 2, thứ 4, thứ 6 lúc 11:30",
  //   image: gui,
  //   alt: "K'ho sinh hoạt thường nhật",
  //   tag: "Trưng bày",
  //   longDescription: [
  //     "Được đan bằng tre, nứa hoặc lồ ô, gùi là vật dụng không thể thiếu trong đời sống của người K'ho.",
  //     "Gùi không chỉ dùng để mang theo lương thực, củi, nông sản mà còn là hình ảnh quen thuộc gắn liền với vai trò của người phụ nữ trong gia đình và cộng đồng.",
  //     "Mỗi chiếc gùi là một tác phẩm nghệ thuật đan lát thủ công, thể hiện sự khéo léo và tỉ mỉ của người thợ.",
  //   ],
  //   highlights: [
  //     "Kỹ thuật đan lát truyền thống",
  //     "Vai trò trong đời sống",
  //     "Biểu tượng văn hóa",
  //     "Nghệ thuật trang trí",
  //   ],
  //   price: "180.000 VND/người",
  //   type: "tour",
  // },
  // The Acoustic items
  "pind-amour": {
    id: "pind-amour",
    title: "Khán phòng Pin d'amour",
    subtitle: "",
    description: "Khi âm thanh trở thành một tác phẩm nghệ thuật.",
    date: "Trưng bày thường xuyên",
    location: "Tầng 3",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour6.jpg?updatedAt=1750001274965",
    alt: {
      vi: "Khán phòng Pin d'amour",
      en: "Pin d'amour Auditorium",
    },
    tag: "Âm thanh",
    longDescription: [
      "Khi âm thanh trở thành một tác phẩm nghệ thuật",
      "Trên đỉnh mái cao nhất của Bảo Tàng Thông – giữa lưng trời Đà Lạt, nơi ánh sáng và không khí dường như cũng biết thì thầm – có một khán phòng đặc biệt mang tên Pind'amour.",
      "Đây không chỉ là nơi dành cho những buổi biểu diễn acoustic thuần analog. Mà là không gian nghệ thuật nơi âm thanh trở về với bản chất nguyên sơ nhất – trong trẻo, tỉ mỉ, tinh khôi đến từng chi tiết.",
      "Với thiết kế 3 mặt kính trong suốt, mở ra toàn cảnh thành phố Đà Lạt thơ mộng, khán phòng như đang lơ lửng giữa những tầng mây. Hệ thống âm thanh hiện đại phối hợp cùng thiết bị cao cấp mang lại trải nghiệm âm thanh chân thực, sắc nét và đầy xúc cảm. Không kỹ xảo. Không ồn ào. Chỉ có giọng hát đẹp, nội lực và ngón đàn mộc mạc, ngân lên giữa một không gian được kiến tạo dành riêng cho nghệ thuật.",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "acoustic",
    redirectTo: "/the-acoustic/pind-amour",
  },
  "high-end": {
    id: "high-end",
    title: "Phòng nghe High-end",
    subtitle: "",
    description:
      "Nơi âm thanh được tái hiện với độ trung thực đến mức khiến bạn có cảm giác mình đang ngồi ngay trên sân khấu, đối diện với ca sĩ thật.",
    date: "Trưng bày thường xuyên",
    location: "Tầng 2",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(3).png?updatedAt=1749000530723",
    alt: {
      vi: "Phòng nghe High-end",
      en: "High-end Listening Room",
    },
    tag: "Âm thanh",
    longDescription: [
      "Với những nhân vật đặc biệt, Bảo Tàng Thông còn có riêng một phòng nghe High-end chuyên dụng – nơi âm thanh được tái hiện với độ trung thực đến mức khiến bạn có cảm giác mình đang ngồi ngay trên sân khấu, đối diện với ca sĩ thật.",
      "Một không gian, hai nhịp đập:",
      "– Một khán phòng mở ra toàn cảnh thành phố.",
      "– Một căn phòng riêng tư, dành riêng cho những người yêu âm thanh như yêu chính cuộc sống này.",
      "Chúng tôi tin rằng, âm thanh đẹp không chỉ để nghe – mà để chạm đến nơi sâu thẳm nhất của cảm xúc.",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "acoustic",
    redirectTo: "/the-acoustic/high-end",
  },
  // The Taste items
  restaurant: {
    id: "restaurant",
    title: "Nghệ thuật vị giác - Nhà hàng",
    subtitle: "",
    description: "Nơi hội tụ tinh hoa ẩm thực Đà Lạt",
    date: "Mở cửa hàng ngày",
    location: "Tầng 1",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(1).png?updatedAt=1749000543046",
    alt: {
      vi: "Nhà hàng Bảo tàng",
      en: "Musée Du Pin Restaurant",
    },
    tag: "Ẩm thực",
    longDescription: [
      "Nơi hội tụ tinh hoa ẩm thực Đà Lạt",
      "Tại Nhà hàng Bảo Tàng Thông, chúng tôi mang đến cho bạn một trải nghiệm ẩm thực độc đáo, nơi hội tụ tinh hoa của ẩm thực Đà Lạt và thế giới.",
      "Mỗi món ăn là một tác phẩm nghệ thuật, được chế biến từ những nguyên liệu tươi ngon nhất, kết hợp với công thức độc đáo và sự sáng tạo không ngừng của đội ngũ đầu bếp tài năng.",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "taste",
    redirectTo: "/the-taste/restaurant",
  },
  cafe: {
    id: "cafe",
    title: "Nghệ thuật vị giác - Cafe",
    subtitle: "",
    description: "Nghệ thuật vị giác",
    date: "Mở cửa hàng ngày",
    location: "Tầng 1",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(2).png?updatedAt=1749000540091",
    alt: {
      vi: "Cafe Bảo tàng",
      en: "Musée Du Pin Cafe",
    },
    tag: "Ẩm thực",
    longDescription: [
      "Nghệ thuật vị giác",
      "Thưởng thức hương vị cà phê đặc trưng của Đà Lạt trong không gian nghệ thuật độc đáo của Bảo Tàng Thông.",
      "Mỗi tách cà phê là một hành trình khám phá, từ những hạt cà phê được chọn lọc kỹ lưỡng đến quy trình pha chế tỉ mỉ.",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "taste",
    redirectTo: "/the-taste/cafe",
  },
  // Regular packages
  "dem-huyen-thoai": {
    id: "dem-huyen-thoai",
    title: "TOUR ĐÊM HUYỀN THOẠI LANGBIANG",
    subtitle: "",
    description:
      "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
    date: "T3-T5 hàng tuần, 19:00 - 21:00",
    location: "Toàn bảo tàng",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Tourdemhuyenthoai_Trong.jpg?updatedAt=1749312109881",
    alt: "Tour đêm huyền thoại",
    tag: "Trải nghiệm",
    longDescription: [
      "Mini-show tương tác đưa khách vào vai nhân vật khám phá bí ẩn văn hóa",
      "Tham quan có hướng dẫn viên các không gian bảo tàng",
      "Trải nghiệm sân khấu tương tác điện ảnh với câu chuyện K'Ho",
      "01 thức uống + 01 snack",
      "Thước phim điện ảnh",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "package",
    redirectTo: "/visit/package/dem-huyen-thoai",
  },
  "giai-dieu-dai-ngan": {
    id: "giai-dieu-dai-ngan",
    title: "GIAI ĐIỆU ĐẠI NGÀN - LẮNG NGHE THÔNG HÁT",
    subtitle: "",
    description: "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
    date: "Thứ 6-T7-CN, 19:00 - 22:30",
    location: "Khán phòng Pin d'amour",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Trong.jpg?updatedAt=1749311873117",
    alt: "Giai điệu đại ngàn",
    tag: "Trải nghiệm",
    longDescription: [
      "Hòa nhạc acoustic với chủ đề thay đổi hàng tháng",
      "Rượu vang",
      "Thức ăn nhẹ",
      "Âm nhạc theo chủ đề",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "package",
    redirectTo: "/visit/package/giai-dieu-dai-ngan",
  },
  "uom-mam-sang-tao": {
    id: "uom-mam-sang-tao",
    title: "ƯƠM MẦM SÁNG TẠO",
    subtitle: "",
    description: "Các gói trải nghiệm cho bé",
    date: "Sáng: 8h - 12h, Chiều: 14h - 18h",
    location: "Tầng 2",
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/6899dd753542811cd853.jpg?updatedAt=1749175097859",
    alt: "Ươm mầm sáng tạo",
    tag: "Trải nghiệm",
    longDescription: [
      "Các gói trải nghiệm cho bé",
      "Workshop: Tay nặn tay vẽ hoặc chế tác đồ thủ công từ thông",
      "Chụp ảnh nghệ thuật tại bảo tàng",
      "01 thức uống + 01 snack",
    ],
    curators: ["Bảo tàng Thông | Musée Du Pin"],
    type: "package",
    redirectTo: "/visit/package/uom-mam-sang-tao",
  },
};

const ExhibitionDetail = () => {
  const { currentLang } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedVisible, setRelatedVisible] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryLoaded, setGalleryLoaded] = useState(false);
  const [galleryImagesCache, setGalleryImagesCache] = useState(() => {
    if (typeof window !== "undefined" && window.sessionStorage) {
      return window.sessionStorage.getItem("phucTangGalleryLoaded") === "true";
    }
    return false;
  });

  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const relatedRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      const foundItem = allItemsData[id];
      if (foundItem) {
        if (foundItem.redirectTo) {
          navigate(foundItem.redirectTo);
          return;
        }
        setItem(foundItem);
        setLoading(false);

        if (heroRef.current) {
          heroRef.current.style.opacity = "0";
          heroRef.current.style.transform = "translateY(20px)";

          setTimeout(() => {
            heroRef.current.style.opacity = "1";
            heroRef.current.style.transform = "translateY(0)";
            heroRef.current.style.transition =
              "opacity 0.8s ease, transform 0.8s ease";
          }, 100);
        }
      } else {
        setError("Item not found");
        setLoading(false);
      }
    }, 300);

    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === relatedRef.current) {
            setRelatedVisible(true);
          }
          if (entry.target.dataset.id) {
            console.log(
              `Element with id ${entry.target.dataset.id} is visible`
            );
          }
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    if (relatedRef.current) {
      observer.observe(relatedRef.current);
    }

    const backupTimer = setTimeout(() => {
      setRelatedVisible(true);
    }, 2000);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (relatedRef.current) observer.unobserve(relatedRef.current);
      clearTimeout(backupTimer);
    };
  }, [id, navigate]);

  useEffect(() => {
    if (
      showGallery &&
      !galleryLoaded &&
      !galleryImagesCache &&
      item &&
      item.id === "phuc-tang-tram-mac" &&
      item.gallery
    ) {
      setGalleryLoading(true);
      const loadPromises = item.gallery.map((g) => {
        return new Promise((resolve) => {
          const img = new window.Image();
          img.src = getGalleryImageUrl(g.image);
          if (img.complete) {
            resolve();
          } else {
            img.onload = () => resolve();
            img.onerror = () => resolve();
          }
        });
      });
      Promise.all(loadPromises).then(() => {
        setGalleryLoading(false);
        setGalleryLoaded(true);
        setGalleryImagesCache(true);
        if (typeof window !== "undefined" && window.sessionStorage) {
          window.sessionStorage.setItem("phucTangGalleryLoaded", "true");
        }
      });
    }
  }, [showGallery, galleryLoaded, galleryImagesCache, item]);

  const handleBackClick = (e) => {
    e.preventDefault();
    if (item.redirectTo) {
      navigate(item.redirectTo);
    } else {
      navigate("/exhibitions");
    }
  };

  const getRelatedItems = () => {
    return Object.values(allItemsData)
      .filter(
        (relatedItem) =>
          relatedItem.id !== id &&
          !relatedItem.redirectTo &&
          relatedItem.tag === item.tag
      )
      .slice(0, 3);
  };

  const getAltText = (item) => {
    if (item.alt && typeof item.alt === "object") {
      return item.alt[currentLang];
    }
    return item.alt;
  };

  const getCuratorDisplay = (curator) => {
    if (curator === "Bảo tàng Thông | Musée Du Pin") {
      return currentLang === "en" ? "Musée Du Pin" : "Bảo tàng Thông";
    }
    return curator;
  };

  if (loading) {
    return (
      <div className="exhibition-detail-loading">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="exhibition-detail-error">
        <h2>Item Not Found</h2>
        <p>Sorry, we couldn't find the requested item.</p>
        <Link to="/exhibitions" className="back-buttons">
          Quay lại Trưng bày
        </Link>
      </div>
    );
  }

  return (
    <div className="exhibition-detail-page">
      {/* Hero Section */}
      <div className="exhibition-detail-hero" ref={heroRef}>
        <div className="exhibition-detail-hero-image">
          <img
            src={getImageUrl(item.image)}
            alt={getAltText(item)}
            style={{
              objectFit:
                item.id === "langbiang-khong-gian" ? "contain" : "cover",
            }}
          />
          <div className="exhibition-detail-hero-overlay"></div>
        </div>
        {item.id !== "langbiang-khong-gian" && (
          <div className="exhibition-detail-hero-content">
            <div className="exhibition-detail-tag">
              <span>{item.tag}</span>
            </div>
            <h1 className="exhibition-detail-title">{item.title}</h1>
            <h2 className="exhibition-detail-subtitle">{item.subtitle}</h2>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div
        className="exhibition-detail-content"
        ref={contentRef}
        data-id="main-content"
      >
        <div className="exhibition-detail-info">
          <div className="exhibition-detail-meta">
            {item.type === "exhibition" ? (
              <>
                <div className="meta-item">
                  <h3>{item.date.includes("-") ? "Ngày" : "Năm"}</h3>
                  <p>{item.date}</p>
                </div>
                <div className="meta-item">
                  <h3>Vị trí</h3>
                  <p>{item.location}</p>
                </div>
                <div className="meta-button">
                  <Link
                    to="https://ticket-museeduphin.netlify.app/"
                    className="cta-button"
                  >
                    Mua vé
                  </Link>
                  {item.id === "phuc-tang-tram-mac" && (
                    <>
                      <button
                        className="cta-button gallery-button"
                        onClick={() => setShowGallery(!showGallery)}
                      >
                        {showGallery ? "Ẩn bộ sưu tập" : "Xem bộ sưu tập"}
                      </button>
                      {showGallery && (
                        <div className="gallery-slideshow">
                          {galleryLoading && (
                            <div className="gallery-loading-overlay">
                              <div className="gallery-loading-spinner"></div>
                              <p>Đang tải bộ sưu tập...</p>
                            </div>
                          )}
                          {!galleryLoading &&
                            (galleryLoaded || galleryImagesCache) && (
                              <div className="gallery-slideshow-container">
                                {item.gallery.map((galleryItem, index) => (
                                  <div
                                    key={index}
                                    className="gallery-slide"
                                    onClick={() =>
                                      setSelectedImage(galleryItem)
                                    }
                                  >
                                    <img
                                      src={getGalleryImageUrl(
                                        galleryItem.image
                                      )}
                                      alt={galleryItem.title}
                                    />
                                    <div className="gallery-slide-title">
                                      {galleryItem.title}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="meta-item">
                  <h3>Thời gian</h3>
                  <p>{item.duration}</p>
                </div>
                <div className="meta-item">
                  <h3>Lịch trình</h3>
                  <p>{item.schedule}</p>
                </div>
                <div className="meta-item">
                  <h3>Giá</h3>
                  <p>{item.price}</p>
                </div>
              </>
            )}
          </div>

          <div className="exhibition-detail-description">
            {item.longDescription.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {item.type === "exhibition" && (
              <div className="exhibition-detail-curators">
                <h3>Tác giả</h3>
                <ul>
                  {item.curators.map((curator, index) => (
                    <li key={index}>{getCuratorDisplay(curator)}</li>
                  ))}
                </ul>
              </div>
            )}

            {item.type === "tour" && (
              <div className="exhibition-detail-highlights">
                <h3>Điểm nổi bật</h3>
                <ul>
                  {item.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Related Items Section */}
        <div
          className={`related-items ${relatedVisible ? "visible" : ""}`}
          ref={relatedRef}
          data-id="related-section"
        >
          <h2>Bạn có thể thích</h2>
          <div className="related-items-grid">
            {getRelatedItems().map((relatedItem, index) => (
              <div
                key={relatedItem.id}
                className="related-item-card"
                style={{ "--card-index": index }}
              >
                <Link
                  to={`/exhibition-details/${relatedItem.id}`}
                  state={{
                    fromTab:
                      item.type === "tour" ? "guided-tours" : "exhibitions",
                  }}
                >
                  <div className="related-item-image">
                    <img
                      src={getThumbnailUrl(relatedItem.image)}
                      alt={relatedItem.alt}
                    />
                  </div>
                  <div className="related-item-content">
                    <h3>{relatedItem.title}</h3>
                    <p>
                      {relatedItem.type === "exhibition"
                        ? relatedItem.date
                        : relatedItem.duration}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="back-links">
          <a href="#" onClick={handleBackClick} className="back-buttons">
            <span className="arrow-icon">←</span>
            Trở về {item.tag}
          </a>
        </div>
      </div>

      {/* Full size image modal */}
      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <button
            className="modal-close-button"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <div
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={getGalleryImageUrl(selectedImage.image, {
                width: 1200,
                height: 800,
              })}
              alt={selectedImage.title}
            />
            <div className="image-modal-title">{selectedImage.title}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExhibitionDetail;
