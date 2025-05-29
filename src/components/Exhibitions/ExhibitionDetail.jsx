import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import TranslatedText from "../TranslatedText";
import "./ExhibitionDetail.css";

// Import optimized images
import bauho from "../../assets/home/Exhibitions/Bauholo_cards.webp";
import congchieng from "../../assets/home/Exhibitions/congchien_cards.webp";
import gui from "../../assets/home/Exhibitions/Gui_cards.webp";
import hoabantrang from "../../assets/home/Exhibitions/Hoa Ban Trắng.webp";
import cheghosanh from "../../assets/home/Exhibitions/Lehoi_cards.webp";
import longda from "../../assets/home/Exhibitions/LongDaDa_cards.webp";
import noidat from "../../assets/home/Exhibitions/noidat_cards.webp";
import phunu from "../../assets/home/Exhibitions/phunu_cards.webp";
import thong2 from "../../assets/home/Exhibitions/Thông 2.webp";

// Import thumbnails for related items

// Combined data for both exhibitions and guided tours
const allItemsData = {
  // Exhibitions
  "cong-chieng": {
    id: "cong-chieng",
    title: "Dụng cụ âm nhạc Tây Nguyên",
    subtitle: "Cồng chiêng",
    description:
      "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng. Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
    date: "30 tháng 4 - 28 tháng 7 2025",
    location: "Tầng 1",
    image: congchieng,
    alt: "Dụng cụ âm nhạc Tây Nguyên",
    tag: "Trưng bày",
    longDescription: [
      "Musée Du Pin trưng bày các nhạc cụ truyền thống bằng đồng của các dân tộc Tây Nguyên, tiêu biểu là cồng chiêng – biểu tượng văn hóa và tín ngưỡng thiêng liêng.",
      "Âm thanh vang vọng của cồng chiêng thể hiện sự kết nối sâu sắc giữa con người và thế giới tâm linh.",
      "Cồng chiêng không chỉ là nhạc cụ mà còn là vật phẩm thiêng liêng trong các nghi lễ và lễ hội truyền thống của người Tây Nguyên.",
    ],
    curators: ["PGS.TS. Nguyễn Văn A", "TS. Trần Thị B"],
    type: "exhibition",
  },
  "long-da-da": {
    id: "long-da-da",
    title: "K'ho chăn nuôi",
    subtitle: "Lồng đa đa",
    description:
      "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên.",
    date: "24 tháng 1 - 21 tháng 7 2025",
    location: "Tầng 2",
    image: longda,
    alt: "K'ho chăn nuôi",
    tag: "Trưng bày",
    longDescription: [
      "Lồng đa đa của người K'ho hiện đang được trưng bày tại Musée Du Pin như một biểu tượng mộc mạc nhưng đầy tính văn hóa của đời sống dân tộc Tây Nguyên.",
      "Được đan thủ công từ tre nứa, chiếc lồng không chỉ phục vụ mục đích chăn nuôi mà còn phản ánh sự khéo léo, tỉ mỉ và mối liên kết bền chặt giữa con người với thiên nhiên núi rừng.",
      "Đây là một trong những hiện vật quý giá thể hiện đời sống văn hóa vật chất của người K'ho.",
    ],
    curators: ["TS. Lê Văn C", "ThS. Phạm Thị D"],
    type: "exhibition",
  },
  "tuong-phu-nu": {
    id: "tuong-phu-nu",
    title: "K'ho điêu khắc",
    subtitle: "Tượng phụ nữ",
    description:
      "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm.",
    date: "22 tháng 1 - 12 tháng 5 2025",
    location: "Tầng 3",
    image: phunu,
    alt: "K'ho điêu khắc",
    tag: "Trưng bày",
    longDescription: [
      "Tác phẩm điêu khắc người dân tộc K'ho đang được trưng bày tại Musée Du Pin thể hiện hình ảnh phụ nữ Tây Nguyên trong dáng đứng trang nghiêm, tay cầm chiếc chiêng nhỏ – biểu tượng của âm nhạc và tín ngưỡng bản địa.",
      "Tác phẩm mang đậm phong cách mộc mạc nhưng đầy chiều sâu văn hóa, phản ánh vẻ đẹp nội tâm, tinh thần kiên cường và vai trò quan trọng của người phụ nữ trong đời sống cộng đồng K'ho.",
      "Đây là một trong những hiện vật quý hiếm thể hiện nghệ thuật điêu khắc truyền thống của người K'ho.",
    ],
    curators: ["TS. Nguyễn Thị E", "ThS. Trần Văn F"],
    type: "exhibition",
  },
  "che-gho-sanh": {
    id: "che-gho-sanh",
    title: "K'ho lễ hội",
    subtitle: "Ché Ghò Sành",
    description:
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin.",
    date: "29 tháng 2 - 28 tháng 9 2025",
    location: "Tầng 1",
    image: cheghosanh,
    alt: "K'ho lễ hội",
    tag: "Trưng bày",
    longDescription: [
      "Ché Ghò Sành là một loại ché cổ nổi tiếng của Tây Nguyên, hiện đang được trưng bày tại Musée Du Pin.",
      "Đây là biểu tượng của sự giàu có, quyền uy và tín ngưỡng tâm linh trong đời sống người bản địa.",
      "Ché được sử dụng trong các nghi lễ quan trọng và là vật phẩm quý giá được truyền từ đời này sang đời khác.",
    ],
    curators: ["PGS.TS. Phạm Văn G", "TS. Lê Thị H"],
    type: "exhibition",
  },
  "noi-dat": {
    id: "noi-dat",
    title: "K'ho sinh hoạt thường nhật",
    subtitle: "Nồi đất",
    description:
      "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn.",
    date: "Trưng bày thường xuyên",
    location: "Tầng 3",
    image: noidat,
    alt: "K'ho sinh hoạt thường nhật",
    tag: "Trưng bày",
    longDescription: [
      "Được chế tác thủ công từ đất nung, nồi có hình dáng đơn giản nhưng chắc chắn.",
      "Thường dùng để nấu ăn trong các dịp lễ hội hoặc sinh hoạt gia đình.",
      "Đây là một trong những hiện vật thể hiện đời sống sinh hoạt hàng ngày của người K'ho.",
    ],
    curators: ["TS. Lê Văn L", "ThS. Phạm Thị M"],
    type: "exhibition",
  },
  "vat-lieu": {
    id: "vat-lieu",
    title: "Vật liệu",
    subtitle: "Chất liệu K'ho",
    description:
      "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên. Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
    date: "Trưng bày thường xuyên",
    location: "Tầng 2",
    image: hoabantrang,
    alt: "Vật liệu",
    tag: "Trưng bày",
    longDescription: [
      "Tại Musée Du Pin, mỗi chất liệu được chọn lựa kỹ lưỡng nhằm tôn vinh vẻ đẹp tự nhiên và bản sắc văn hóa Tây Nguyên.",
      "Các vật liệu truyền thống như gỗ, đá, đất và sợi tự nhiên không chỉ là phương tiện sáng tạo mà còn là cầu nối giữa nghệ thuật và đời sống bản địa.",
      "Mỗi chất liệu đều mang trong mình câu chuyện về sự gắn kết giữa con người với thiên nhiên, về kỹ thuật chế tác truyền thống, và về triết lý sống hài hòa với môi trường của người K'ho.",
    ],
    curators: ["TS. Nguyễn Văn X", "ThS. Lê Thị Y"],
    type: "exhibition",
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
    image: bauho,
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
  "phuc-tang": {
    id: "phuc-tang",
    title: "Phức Tầng",
    subtitle: "Thiên nhiên K'ho",
    description:
      "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
    duration: "1 giờ 15 phút",
    schedule: "Hàng thứ 2, thứ 4, thứ 6 lúc 11:30",
    image: thong2,
    alt: "Phức Tầng",
    tag: "Tham quan",
    longDescription: [
      "Được Musée Du Pin bắt trọn khoảng khắc các hình ảnh thiên nhiên đậm sắc dân tộc K'ho, tạo nên bức tranh đẹp về đất nước Tây Nguyên.",
      "Bức tranh thiên nhiên hùng vĩ của Tây Nguyên được thể hiện qua góc nhìn nghệ thuật độc đáo.",
      "Triển lãm mang đến cái nhìn mới mẻ về vẻ đẹp tự nhiên của vùng đất K'ho.",
    ],
    highlights: [
      "Góc nhìn nghệ thuật độc đáo",
      "Vẻ đẹp thiên nhiên Tây Nguyên",
      "Đời sống văn hóa K'ho",
      "Nghệ thuật nhiếp ảnh",
    ],
    price: "180.000 VND/người",
    type: "tour",
  },
  gui: {
    id: "gui",
    title: "K'ho sinh hoạt thường nhật",
    subtitle: "Gùi",
    description:
      "Được Musée Du Pin đan bằng tre, nứa hoặc lồ ô, gùi không chỉ dùng để mang theo lương thực, củi, nông sản mà còn là hình ảnh quen thuộc gắn liền với vai trò của người phụ nữ trong gia đình và cộng đồng.",
    duration: "1 giờ 15 phút",
    schedule: "Hàng thứ 2, thứ 4, thứ 6 lúc 11:30",
    image: gui,
    alt: "K'ho sinh hoạt thường nhật",
    tag: "Trưng bày",
    longDescription: [
      "Được đan bằng tre, nứa hoặc lồ ô, gùi là vật dụng không thể thiếu trong đời sống của người K'ho.",
      "Gùi không chỉ dùng để mang theo lương thực, củi, nông sản mà còn là hình ảnh quen thuộc gắn liền với vai trò của người phụ nữ trong gia đình và cộng đồng.",
      "Mỗi chiếc gùi là một tác phẩm nghệ thuật đan lát thủ công, thể hiện sự khéo léo và tỉ mỉ của người thợ.",
    ],
    highlights: [
      "Kỹ thuật đan lát truyền thống",
      "Vai trò trong đời sống",
      "Biểu tượng văn hóa",
      "Nghệ thuật trang trí",
    ],
    price: "180.000 VND/người",
    type: "tour",
  },
};

const ExhibitionDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedVisible, setRelatedVisible] = useState(false);

  // Refs for animation elements
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const relatedRef = useRef(null);

  useEffect(() => {
    // In a real app, this would be an API call
    // For now, we're just using our static data
    setTimeout(() => {
      const foundItem = allItemsData[id];
      if (foundItem) {
        setItem(foundItem);
        setLoading(false);

        // Add animation to hero section
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
    }, 300); // Simulating a brief loading time

    // Set up intersection observer for animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px",
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === relatedRef.current) {
            console.log("Related section is visible now");
            setRelatedVisible(true);
          }
          // Each observed element has a data-id attribute we can use
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

    // Observe main content section for scroll animations
    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    // Observe related items section
    if (relatedRef.current) {
      observer.observe(relatedRef.current);
    }

    // Backup mechanism: force visibility after 2 seconds if not triggered by observer
    const backupTimer = setTimeout(() => {
      setRelatedVisible(true);
    }, 2000);

    return () => {
      if (contentRef.current) observer.unobserve(contentRef.current);
      if (relatedRef.current) observer.unobserve(relatedRef.current);
      clearTimeout(backupTimer);
    };
  }, [id]);

  // Handler for back button to maintain tab selection
  const handleBackClick = (e) => {
    e.preventDefault();
    // Navigate based on the type of item
    if (item.type === "exhibition") {
      navigate("/exhibitions");
    } else {
      navigate("/exhibitions?tab=guided-tours");
    }
  };

  if (loading) {
    return (
      <div className="exhibition-detail-loading">
        <div className="loading-spinner"></div>
        <p>
          <TranslatedText>Loading...</TranslatedText>
        </p>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="exhibition-detail-error">
        <h2>
          <TranslatedText>Item Not Found</TranslatedText>
        </h2>
        <p>
          <TranslatedText>
            Sorry, we couldn't find the requested item.
          </TranslatedText>
        </p>
        <Link to="/exhibitions" className="back-button">
          <TranslatedText>Quay lại Trưng bày</TranslatedText>
        </Link>
      </div>
    );
  }

  return (
    <div className="exhibition-detail-page">
      {/* Hero Section */}
      <div className="exhibition-detail-hero" ref={heroRef}>
        <div className="exhibition-detail-hero-image">
          <img src={item.image} alt={item.alt} />
          <div className="exhibition-detail-hero-overlay"></div>
        </div>
        <div className="exhibition-detail-hero-content">
          <div className="exhibition-detail-tag">
            <span>
              <TranslatedText>{item.tag}</TranslatedText>
            </span>
          </div>
          <h1 className="exhibition-detail-title">
            <TranslatedText>{item.title}</TranslatedText>
          </h1>
          <h2 className="exhibition-detail-subtitle">
            <TranslatedText>{item.subtitle}</TranslatedText>
          </h2>
        </div>
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
                  <h3>
                    <TranslatedText>Ngày</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.date}</TranslatedText>
                  </p>
                </div>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Vị trí</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.location}</TranslatedText>
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Thời gian</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.duration}</TranslatedText>
                  </p>
                </div>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Lịch trình</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.schedule}</TranslatedText>
                  </p>
                </div>
                <div className="meta-item">
                  <h3>
                    <TranslatedText>Giá</TranslatedText>
                  </h3>
                  <p>
                    <TranslatedText>{item.price}</TranslatedText>
                  </p>
                </div>
              </>
            )}

            <div className="meta-button">
              {item.type === "exhibition" ? (
                <Link to="/tickets" className="cta-button">
                  <TranslatedText>Mua vé</TranslatedText>
                </Link>
              ) : (
                <Link to="/tickets" className="cta-button">
                  <TranslatedText>Đặt chuyến</TranslatedText>
                </Link>
              )}
            </div>
          </div>

          <div className="exhibition-detail-description">
            {item.longDescription.map((paragraph, index) => (
              <p key={index}>
                <TranslatedText>{paragraph}</TranslatedText>
              </p>
            ))}

            {item.type === "exhibition" && (
              <div className="exhibition-detail-curators">
                <h3>
                  <TranslatedText>Tác giả</TranslatedText>
                </h3>
                <ul>
                  {item.curators.map((curator, index) => (
                    <li key={index}>
                      <TranslatedText>{curator}</TranslatedText>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {item.type === "tour" && (
              <div className="exhibition-detail-highlights">
                <h3>
                  <TranslatedText>Điểm nổi bật</TranslatedText>
                </h3>
                <ul>
                  {item.highlights.map((highlight, index) => (
                    <li key={index}>
                      <TranslatedText>{highlight}</TranslatedText>
                    </li>
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
          <h2>
            <TranslatedText>Bạn có thể thích</TranslatedText>
          </h2>
          <div className="related-items-grid">
            {Object.values(allItemsData)
              .filter(
                (relatedItem) =>
                  relatedItem.id !== id && relatedItem.type === item.type
              )
              .slice(0, 3)
              .map((relatedItem, index) => (
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
                      <img src={relatedItem.image} alt={relatedItem.alt} />
                    </div>
                    <div className="related-item-content">
                      <h3>
                        <TranslatedText>{relatedItem.title}</TranslatedText>
                      </h3>
                      <p>
                        <TranslatedText>
                          {relatedItem.type === "exhibition"
                            ? relatedItem.date
                            : relatedItem.duration}
                        </TranslatedText>
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="back-link">
          <a href="#" onClick={handleBackClick} className="back-button">
            <span className="arrow-icon">←</span>
            <TranslatedText>
              Trở về{" "}
              {item.type === "exhibition" ? "Trưng bày" : "Tham quan"}
            </TranslatedText>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ExhibitionDetail;
