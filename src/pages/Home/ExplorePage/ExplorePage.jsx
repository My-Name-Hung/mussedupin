// import React from "react";
// import { Helmet } from "react-helmet";
// import TranslatedText from "../../../components/TranslatedText";
// import "./ExplorePage.css";

// // Import optimized images
// import bauho from "../../../assets/home/Collections/Bauholo_cards.webp";
// import congchieng from "../../../assets/home/Collections/congchien_cards.webp";
// import cheghosanh from "../../../assets/home/Collections/Lehoi_cards.webp";
// import longda from "../../../assets/home/Collections/LongDaDa_cards.webp";
// import noidat from "../../../assets/home/Collections/noidat_cards.webp";
// import phunu from "../../../assets/home/Collections/phunu_cards.webp";
// import hoabantrang from "../../../assets/home/Collections/VatLieu/Hoa Ban Trắng.webp";
// // Sample collection categories
// const categories = [
//   { id: 1, name: "Dụng cụ âm nhạc", count: 48 },
//   { id: 2, name: "Điêu khắc", count: 32 },
//   { id: 3, name: "Nghệ thuật trang trí", count: 24 },
//   { id: 4, name: "Nghệ thuật K'ho", count: 18 },
//   { id: 5, name: "Hiện vật cổ", count: 20 },
//   { id: 6, name: "Văn hóa dân tộc", count: 22 },
//   { id: 7, name: "Vật liệu", count: 24 },
// ];

// // Sample collection items
// const collections = [
//   {
//     id: 1,
//     title: "Dụng cụ âm nhạc Tây Nguyên",
//     artist: "Trưng bày",
//     image: congchieng,
//     description:
//       "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng. Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
//     category: "Dụng cụ âm nhạc",
//   },
//   {
//     id: 2,
//     title: "K'ho chăn nuôi",
//     artist: "Trưng bày",
//     image: longda,
//     description:
//       "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên. Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
//     category: "Văn hóa dân tộc",
//   },
//   {
//     id: 3,
//     title: "K'ho điêu khắc",
//     artist: "Trưng bày",
//     image: phunu,
//     description:
//       "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa. Tác phẩm mang đậm phong cách mộc mạc nhưng đầy chiều sâu văn hóa, phản ánh vẻ đẹp nội tâm, tinh thần kiên cường và vai trò quan trọng của người phụ nữ trong đời sống cộng đồng K'ho.",
//     category: "Điêu khắc",
//   },
//   {
//     id: 4,
//     title: "K'ho lễ hội",
//     artist: "Trưng bày",
//     image: cheghosanh,
//     description:
//       "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin, đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
//     category: "Nghệ thuật K'ho",
//   },
//   {
//     id: 5,
//     title: "K'ho sinh hoạt thường nhật",
//     artist: "Tham quan",
//     image: noidat,
//     description:
//       "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn, thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình",
//     category: "Hiện vật cổ",
//   },
//   {
//     id: 6,
//     title: "Nghệ thuật trang trí K'ho",
//     artist: "Tham quan",
//     image: bauho,
//     description:
//       "Được khoét rỗng từ quả hồ lô khô, vật phẩm này thường được dùng để đựng nước, rượu cần hoặc làm nhạc cụ truyền thống",
//     category: "Nghệ thuật trang trí",
//   },
//   {
//     id: 7,
//     title: "Vật liệu",
//     artist: "Tham quan",
//     image: hoabantrang,
//     description:
//       "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên. Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
//     category: "Vật liệu",
//   },
// ];


// const ExplorePage = () => {
//   return (
//     <div className="explore-page">
//       <Helmet>
//         <title>Khám phá | Bảo tàng Du Pin</title>
//         <meta
//           name="description"
//           content="Khám phá bộ sưu tập đa dạng của Bảo tàng Du Pin."
//         />
//       </Helmet>

//       <header className="explore-header">
//         <div className="header-content">
//           <h1 className="explore-title">
//             <TranslatedText>KHÁM PHÁ MUSÉE DU PIN</TranslatedText>
//           </h1>
//           <p className="explore-subtitle">
//             <TranslatedText>
//               Khám phá bộ sưu tập phong phú của chúng tôi trải dài hàng nghìn
//               năm nghệ thuật và lịch sử
//             </TranslatedText>
//           </p>
//         </div>
//       </header>

//       <section className="explore-categories-section">
//         <div className="explore-container">
//           <h2 className="section-title">
//             <TranslatedText>Duyệt theo danh mục</TranslatedText>
//           </h2>
//           <div className="categories-grid">
//             {categories.map((category) => (
//               <div key={category.id} className="category-card">
//                 <h3 className="category-name">{category.name}</h3>
//                 <span className="category-count">
//                   {category.count} Bộ sưu tập
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="featured-collections-section">
//         <div className="explore-container">
//           <h2 className="section-title">
//             <TranslatedText>Bộ sưu tập nổi bật</TranslatedText>
//           </h2>
//           <div className="collections-grid">
//             {collections.map((collection) => (
//               <div key={collection.id} className="collection-card">
//                 <div className="collection-image-container">
//                   <img
//                     src={collection.image}
//                     alt={collection.title}
//                     className="collection-image"
//                     loading="lazy"
//                   />
//                   <span className="collection-category">
//                     {collection.category}
//                   </span>
//                 </div>
//                 <div className="collection-info">
//                   <h3 className="collection-title">{collection.title}</h3>
//                   <p className="collection-description">
//                     {collection.description}
//                   </p>
//                   <button className="view-collection-button">
//                     <a href="/collection">
//                       <TranslatedText>Xem bộ sưu tập</TranslatedText>
//                     </a>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       <section className="explore-cta-section">
//         <div className="explore-container">
//           <div className="cta-content">
//             <h2 className="cta-title">
//               <TranslatedText>Lên kế hoạch tham quan</TranslatedText>
//             </h2>
//             <p className="cta-text">
//               <TranslatedText>
//                 Trải nghiệm Bảo tàng Du Pin trực tiếp và đắm chìm trong bộ sưu
//                 tập đẳng cấp thế giới của chúng tôi
//               </TranslatedText>
//             </p>
//             <div className="cta-buttons">
//               <a href="/tickets" className="cta-button primary">
//                 <TranslatedText>Đặt vé</TranslatedText>
//               </a>
//               <a href="/visit" className="cta-button secondary">
//                 <TranslatedText>Thông tin tham quan</TranslatedText>
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ExplorePage;
