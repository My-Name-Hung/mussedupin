import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getAnPhamImageUrl,
  getThoCamImageUrl,
  getInTheoYeuCauImageUrl,
  getKhuyenTaiImageUrl,
  getThoiTrangImageUrl,
  getSanPhamTuThongImageUrl,
  getHoiThaoNgheThuatImageUrl,
} from "../../../utils/cloudinary";
import "./Categories.css";

const categoryImages = {
  khuyentai: [
    "khuyentai-hero (1).webp",
    "khuyentai-hero (2).webp",
    "khuyentai-hero (3).webp",
    "khuyentai-hero (4).webp",
    "khuyentai-hero (5).webp",
    "khuyentai-hero (6).webp",
    "khuyentai-hero (7).webp",
    "khuyentai-hero (8).webp",
    "khuyentai-hero (9).webp",
    "khuyentai-hero (10).webp",
    "khuyentai-hero (11).webp",
    "khuyentai-hero (12).webp",
    "khuyentai-hero (13).webp",
    "khuyentai-hero (14).webp",
    "khuyentai-hero (15).webp",
    "khuyentai-hero (16).webp",
    "khuyentai-hero (17).webp",
    "khuyentai-hero (18).webp",
    "khuyentai-hero (19).webp",
  ],
  anpham: ["tuoitho.png", "dautay.png", "hoabantrang.png"],
  "hoi-thao-nghe-thuat": ["hoithaonghethuat.jpg"],
  inyeucau: [
    "BTT01209-HDR.webp",
    "BTT01405-HDR.webp",
    "BTT01421-HDR.webp",
    "BTT01438-HDR.webp",
    "BTT01451-HDR.webp",
    "BTT01498-HDR.webp",
    "BTT01513-HDR.webp",
    "BTT01517-HDR.webp",
    "BTT01529-HDR.webp",
  ],
  thoitrang: ["aophong.png"],
  thocam: [
    "Cravat 03.webp",
    "Kẹp tóc 02.webp",
    "Sơ mi nam 03.webp",
    "Sơ mi nam 01.webp",
    "Gôi trang trí 1.webp",
    "Đầm_trẻ_em_mã_04_05_06.webp",
    "Set hộp đồ trang điểm 3 size.webp",
    "Túi khoác vai.webp",
    "Túi xách.webp",
    "Váy_ngắn_mã_01_02_03_04.webp",
    "Váy ngắn mã 05.webp",
  ],
  sanphamtuthong: [
    "Vòng quả thông 09.jpg",
    "Vòng quả thông 10.jpg",
    "Tranh Theo yêu cầu 02.jpg",
    "Tranh mini 02.jpg",
    "Tranh mini 01.jpg",
    "Tranh độc bản 06.jpg",
    "Tranh độc bản 01.jpg",
    "Tranh A4 14.jpg",
    "Tranh A4 12.jpg",
    "Tranh 40x40 (04).jpg",
    "Tranh 40x40 (01).jpg",
    "Tranh 20x20 (01).jpg",
    "Tranh 20x20 (04).jpg",
    "Tranh 15x20 (02).jpg",
    "moc khoa 02.jpg",
    "moc khoa 01.jpg",
    "Lọ hoa lớn 01.jpg",
    "Lo hoa bé 09.jpg",
    "Lo hoa bé 05.jpg",
    "bó hoa 1 bong.jpg",
  ],
};

const getRandomImage = (category) => {
  const images = categoryImages[category];
  if (!images || images.length === 0) return "";

  const randomIndex = Math.floor(Math.random() * images.length);
  const filename = images[randomIndex];

  // ĐỂ TẠM THỜI
  switch (category) {
    case "khuyentai":
      return getKhuyenTaiImageUrl(filename);
    case "anpham":
      return getAnPhamImageUrl(filename);
    case "hoi-thao-nghe-thuat":
      return getHoiThaoNgheThuatImageUrl(filename);
    case "inyeucau":
      return getInTheoYeuCauImageUrl(filename);
    case "thoitrang":
      return getThoiTrangImageUrl(filename);
    case "thocam":
    return getThoCamImageUrl(filename);
    case "sanphamtuthong":
      return getSanPhamTuThongImageUrl(filename);
    default:
      return "";
  }
};

const categories = [
  {
    title: "Trang sức",
    category: "khuyentai",
    link: "/category/khuyentai",
  },
  {
    title: "Ấn phẩm",
    category: "anpham",
    link: "/category/anpham",
  },
  {
    title: "Hội thảo nghệ thuật",
    category: "hoi-thao-nghe-thuat",
    link: "/category/hoi-thao-nghe-thuat",
  },
  {
    title: "In theo yêu cầu",
    category: "inyeucau",
    link: "/category/in-theo-yeu-cau",
  },
  {
    title: "Thời trang và phụ kiện",
    category: "thoitrang",
    link: "/category/thoi-trang-va-phu-kien",
  },

  {
    title: "Thổ cẩm",
    category: "thocam",
    link: "/category/thocam",
  },
  {
    title: "Sản phẩm từ thông",
    category: "sanphamtuthong",
    link: "/category/sanphamtuthong",
  },
];

const Categories = () => {
  const [categoryList, setCategoryList] = useState(categories);

  useEffect(() => {
    // Cập nhật ảnh ngẫu nhiên cho mỗi danh mục khi component được mount
    const updatedCategories = categories.map((category) => ({
      ...category,
      image: getRandomImage(category.category),
    }));
    setCategoryList(updatedCategories);
  }, []);

  return (
    <section className="categories-section">
      <h2 className="categories-title">DANH MỤC</h2>
      <div className="categories-grid">
        {categoryList.map((category, index) => (
          <Link to={category.link} key={index} className="category-card">
            <div className="category-image-container">
              <img
                src={category.image}
                alt={category.title}
                className="category-image"
              />
            </div>
            <h3 className="category-title">
              <span className="title-text">{category.title}</span>
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Categories;
