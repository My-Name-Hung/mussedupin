import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./LifeAtMuseumPage.css";

// Import images (you'll need to replace these with your actual images)
import heroImage2 from "../../assets/home/Collections/Bauholo_cards.webp";
import heroImage1 from "../../assets/home/Collections/congchien_cards.webp";
import heroImage3 from "../../assets/home/Collections/DanT'rung_cards.webp";
import heroImage4 from "../../assets/home/Collections/Gui_cards.webp";

// Helper function to create URL-friendly slugs from titles
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Sample news data
const newsData = [
  {
    id: 1,
    title:
      "Bức tranh này không mất đi sự phức tạp khi bạn nhìn lâu – nó trở nên phong phú hơn",
    date: "5 THÁNG 2 2025",
    image: heroImage2,
    excerpt:
      "Chân dung Vua Charles I của Anh do Anthony van Dyck vẽ, trở lại trên tường phòng trưng bày sau hơn một năm bảo tồn. Blaise Ducos, Giám tuyển Tranh Flemish và Hà Lan, thảo luận về kiệt tác này.",
    category: "Tin bộ sưu tập",
    subcategory: "Phục chế",
    content: `<p>Chân dung Vua Charles I của Anh do Anthony van Dyck vẽ, trở lại trên tường phòng trưng bày sau hơn một năm bảo tồn.</p>
      <p>Blaise Ducos, Giám tuyển Tranh Flemish và Hà Lan, thảo luận về kiệt tác này và những hiểu biết có được trong quá trình phục chế. Việc làm sạch cẩn thận đã tiết lộ những chi tiết và màu sắc đã bị che khuất trong nhiều thập kỷ.</p>
      <p>Bức chân dung hoành tráng này, được vẽ khoảng năm 1635, được coi là một trong những thành tựu vĩ đại nhất của Van Dyck và mang đến cho người xem một cửa sổ độc đáo vào triều đình hoàng gia Anh thế kỷ 17.</p>`,
  },
  {
    id: 2,
    title: "Nói bằng một chiếc ghế!",
    date: "24 THÁNG 12 2024",
    image: heroImage3,
    excerpt:
      "Bảo tàng Du Pin đang triển khai một chiến dịch dài hạn để bảo tồn những chiếc ghế lịch sử đã có mặt trong Vườn Tuileries từ thế kỷ 19.",
    category: "Tin bộ sưu tập",
    subcategory: "Phục chế",
    content: `<p>Bảo tàng Du Pin đang triển khai một chiến dịch dài hạn để bảo tồn những chiếc ghế lịch sử đã có mặt trong Vườn Tuileries từ thế kỷ 19.</p>
      <p>Những chiếc ghế xanh mang tính biểu tượng này đã chứng kiến vô số khoảnh khắc trong lịch sử Paris và giờ đây cần được phục chế và chăm sóc để tiếp tục phục vụ các thế hệ tương lai.</p>
      <p>Thông qua chương trình "Nói bằng một chiếc ghế" của chúng tôi, các nhà tài trợ có thể tài trợ cho việc phục chế một chiếc ghế và có một tấm biển được cá nhân hóa để tưởng nhớ một người đặc biệt hoặc một dịp đặc biệt.</p>`,
  },
  {
    id: 3,
    title: "Triển lãm Kiệt tác từ Thế giới Cổ đại",
    date: "18 THÁNG 11 2024",
    image: heroImage4,
    excerpt:
      "Khám phá vẻ đẹp và những bí ẩn của các nền văn minh cổ đại trong triển lãm tạm thời mới của chúng tôi với các hiện vật từ Ai Cập, Hy Lạp và La Mã.",
    category: "Triển lãm",
    subcategory: "Tạm thời",
    content: `<p>Khám phá vẻ đẹp và những bí ẩn của các nền văn minh cổ đại trong triển lãm tạm thời mới của chúng tôi với các hiện vật từ Ai Cập, Hy Lạp và La Mã.</p>
      <p>Bộ sưu tập phi thường này tập hợp hơn 200 hiện vật quý hiếm, nhiều hiện vật được trưng bày lần đầu tiên, giới thiệu những thành tựu nghệ thuật và cuộc sống hàng ngày của những nền văn hóa có ảnh hưởng này.</p>
      <p>Điểm nhấn bao gồm bức tượng Alexander Đại đế mới được phát hiện, đồ trang sức Ai Cập tinh xảo từ thời kỳ Vương quốc Mới và các bức tranh khảm La Mã được bảo quản đáng kinh ngạc mô tả các cảnh từ thần thoại.</p>`,
  },
  {
    id: 4,
    title: "Hội thảo Nghệ thuật Thiếu nhi: Khám phá Kỹ thuật Phục hưng",
    date: "10 THÁNG 10 2024",
    image: heroImage1,
    excerpt:
      "Một loạt hội thảo cuối tuần đặc biệt giới thiệu cho trẻ em về kỹ thuật hội họa của các bậc thầy thời Phục hưng.",
    category: "Giáo dục",
    subcategory: "Hội thảo",
    content: `<p>Một loạt hội thảo cuối tuần đặc biệt giới thiệu cho trẻ em về kỹ thuật hội họa của các bậc thầy thời Phục hưng.</p>
      <p>Được thiết kế cho độ tuổi 8-12, những hội thảo hấp dẫn này sẽ hướng dẫn các nghệ sĩ nhí về những nguyên tắc cơ bản của bố cục, pha màu và phối cảnh như được thực hành bởi các nghệ sĩ như Leonardo da Vinci và Raphael.</p>
      <p>Mỗi người tham gia sẽ tạo ra kiệt tác của riêng mình bằng cách sử dụng các vật liệu truyền thống trong khi học về bối cảnh lịch sử và ý nghĩa của nghệ thuật Phục hưng. Tất cả vật liệu được cung cấp.</p>`,
  },
];

// Additional news data that will be shown when "See more" is clicked
const additionalNewsData = [
  {
    id: 5,
    title: "Bộ sưu tập mới: Điêu khắc Pháp thế kỷ 18",
    date: "5 THÁNG 9 2024",
    image: heroImage2,
    excerpt:
      "Bảo tàng Du Pin tự hào thông báo việc mua lại một bộ sưu tập quan trọng các tác phẩm điêu khắc Pháp thế kỷ 18, mở rộng bộ sưu tập ấn tượng của chúng tôi.",
    category: "Tin bộ sưu tập",
    subcategory: "Bộ sưu tập mới",
    content: `<p>Bảo tàng Du Pin tự hào thông báo việc mua lại một bộ sưu tập quan trọng các tác phẩm điêu khắc Pháp thế kỷ 18, mở rộng bộ sưu tập ấn tượng của chúng tôi.</p>
      <p>Bộ sưu tập gồm 24 tác phẩm điêu khắc bằng đá cẩm thạch và đồng thể hiện tác phẩm của các nghệ sĩ nổi tiếng từ thời Louis XV và Louis XVI, bao gồm Jean-Baptiste Pigalle và Étienne Maurice Falconet.</p>
      <p>Việc mua lại này được thực hiện nhờ sự hỗ trợ hào phóng của Hội Bạn bè Bảo tàng Du Pin và sẽ được trưng bày ở cánh phía tây bắt đầu từ tháng tới.</p>`,
  },
  {
    id: 6,
    title: "Hòa nhạc Buổi tối: Nhạc cổ điển trong Phòng trưng bày Lớn",
    date: "20 THÁNG 8 2024",
    image: heroImage3,
    excerpt:
      "Trải nghiệm ma thuật của âm nhạc cổ điển được trình diễn trong khung cảnh tráng lệ của Phòng trưng bày Lớn của chúng tôi, mỗi tối thứ Sáu trong tháng 9.",
    category: "Sự kiện",
    subcategory: "Âm nhạc",
    content: `<p>Trải nghiệm ma thuật của âm nhạc cổ điển được trình diễn trong khung cảnh tráng lệ của Phòng trưng bày Lớn của chúng tôi, mỗi tối thứ Sáu trong tháng 9.</p>
      <p>Dàn nhạc Thính phòng Paris nổi tiếng sẽ trình diễn một loạt các buổi hòa nhạc với các tác phẩm của Mozart, Vivaldi và Bach, được bao quanh bởi các kiệt tác hội họa châu Âu.</p>
      <p>Những sự kiện đặc biệt sau giờ này bao gồm quyền truy cập độc quyền vào Phòng trưng bày Lớn và một ly sâm panh miễn phí trong giờ giải lao.</p>`,
  },
  {
    id: 7,
    title: "Hậu trường: Bảo tồn Bản thảo Trung cổ",
    date: "15 THÁNG 7 2024",
    image: heroImage4,
    excerpt:
      "Có một cái nhìn hiếm hoi vào phòng thí nghiệm bảo tồn của chúng tôi khi đội ngũ của chúng tôi làm việc để bảo quản và phục hồi bộ sưu tập bản thảo trung cổ mới được bảo tàng mua lại.",
    category: "Tin bộ sưu tập",
    subcategory: "Bảo tồn",
    content: `<p>Có một cái nhìn hiếm hoi vào phòng thí nghiệm bảo tồn của chúng tôi khi đội ngũ của chúng tôi làm việc để bảo quản và phục hồi bộ sưu tập bản thảo trung cổ mới được bảo tàng mua lại.</p>
      <p>Chuyến tham quan có hướng dẫn hàng tháng này mang đến cho khách tham quan cơ hội gặp gỡ các chuyên gia bảo tồn của chúng tôi và tìm hiểu về các kỹ thuật tinh tế được sử dụng để bảo quản những kho báu mỏng manh này, nhiều trong số đó có từ thế kỷ 12 và 13.</p>
      <p>Người tham gia sẽ quan sát công việc bảo tồn thực tế đang diễn ra và khám phá cách công nghệ hiện đại giúp chúng ta hiểu và bảo vệ những tài liệu cổ này.</p>`,
  },
  {
    id: 8,
    title: "Nghệ thuật In ấn Nhật Bản: Triển lãm mới",
    date: "1 THÁNG 7 2024",
    image: heroImage1,
    excerpt:
      "Khám phá vẻ đẹp và nghệ thuật của tranh khắc gỗ truyền thống Nhật Bản trong triển lãm tạm thời mới của chúng tôi với các tác phẩm từ thời kỳ Edo đến các nghệ sĩ đương đại.",
    category: "Triển lãm",
    subcategory: "Tạm thời",
    content: `<p>Khám phá vẻ đẹp và nghệ thuật của tranh khắc gỗ truyền thống Nhật Bản trong triển lãm tạm thời mới của chúng tôi với các tác phẩm từ thời kỳ Edo đến các nghệ sĩ đương đại.</p>
      <p>Triển lãm toàn diện này theo dõi sự phát triển của tranh ukiyo-e từ thế kỷ 17 đến các diễn giải hiện đại, trưng bày các kiệt tác của Hokusai, Hiroshige và các nghệ nhân in ấn hàng đầu ngày nay.</p>
      <p>Khách tham quan cũng có thể tham gia các buổi trình diễn hàng tuần về kỹ thuật in khắc gỗ truyền thống do các nghệ nhân in ấn thăm viếng từ Kyoto thực hiện.</p>`,
  },
];

const LifeAtMuseumPage = () => {
  // State for hero section slideshow
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [showMoreNews, setShowMoreNews] = useState(false);
  const heroImages = [heroImage1, heroImage2, heroImage3, heroImage4];

  // Get all unique categories and subcategories from news data
  const getCategories = () => {
    const categories = new Set();

    // Add categories from initial news data
    newsData.forEach((item) => {
      if (item.category) categories.add(item.category);
    });

    // Add categories from additional news data
    additionalNewsData.forEach((item) => {
      if (item.category) categories.add(item.category);
    });

    return ["All", ...Array.from(categories)];
  };

  const categories = getCategories();

  // Handle auto-rotating hero slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".animate-section").forEach((section) => {
      observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Handle showing more news
  const handleSeeMore = () => {
    setShowMoreNews(true);

    // Scroll to the beginning of additional news after a short delay
    setTimeout(() => {
      const hiddenNewsSection = document.querySelector(".lm-hidden-news");
      if (hiddenNewsSection) {
        hiddenNewsSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 200); // Short delay to allow the content to become visible first
  };

  // Filter news based on selected category
  const getDisplayedNews = () => {
    if (selectedFilter === "All") {
      return newsData;
    }
    return newsData.filter(
      (item) =>
        item.category === selectedFilter || item.subcategory === selectedFilter
    );
  };

  // Filter additional news based on selected category
  const getAdditionalNews = () => {
    if (selectedFilter === "All") {
      return additionalNewsData;
    }
    return additionalNewsData.filter(
      (item) =>
        item.category === selectedFilter || item.subcategory === selectedFilter
    );
  };

  // Create news item component
  const NewsItem = ({ newsItem }) => {
    const slug = createSlug(newsItem.title);
    const detailUrl = `/life-at-the-museum/${slug}`;

    return (
      <article className="lm-news-item">
        <Link to={detailUrl} className="lm-news-link">
          <div className="lm-news-image-container">
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="lm-news-image"
            />
            <div className="lm-news-categories">
              <span className="lm-news-category">{newsItem.category}</span>
              <span className="lm-news-subcategory">
                {newsItem.subcategory}
              </span>
            </div>
          </div>
          <div className="lm-news-content">
            <h3 className="lm-news-title">{newsItem.title}</h3>
            <p className="lm-news-excerpt">{newsItem.excerpt}</p>
            <time className="lm-news-date">{newsItem.date}</time>
          </div>
        </Link>
      </article>
    );
  };

  return (
    <div className="life-museum-page">
      {/* Hero Section */}
      <section className="lm-hero animate-section">
        <div className="lm-hero-slides-container">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`lm-hero-slide ${
                activeHeroSlide === index ? "active" : ""
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        </div>
        <div className="lm-hero-overlay"></div>
        <div className="lm-hero-content">
          <h1 className="lm-hero-title">CUỘC SỐNG TẠI BẢO TÀNG</h1>
        </div>
        <div className="lm-hero-scroll-indicator">
          <div
            className="lm-hero-scroll-mouse"
            onClick={() => {
              document.querySelector(".lm-news-section").scrollIntoView({
                behavior: "smooth",
              });
            }}
          >
            <div className="lm-hero-scroll-wheel"></div>
          </div>
          <span>CUỘN XUỐNG</span>
        </div>
      </section>

      {/* All the News Section */}
      <section className="lm-news-section animate-section">
        <div className="lm-section-header">
          <h2 className="lm-section-title">Tất cả tin tức</h2>
        </div>

        {/* Filters */}
        <div className="lm-filter-container">
          <div className="lm-filter-label">Lọc theo:</div>
          <div className="lm-filter-options">
            {categories.map((category) => (
              <button
                key={category}
                className={`lm-filter-option ${
                  selectedFilter === category ? "active" : ""
                }`}
                onClick={() => setSelectedFilter(category)}
              >
                {category === "All" ? "Tất cả" : category}
              </button>
            ))}
          </div>
        </div>

        {/* Initial News Grid */}
        <div className="lm-news-grid">
          {getDisplayedNews().map((newsItem) => (
            <NewsItem key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>

        {/* Additional News Items (shown when "See more" is clicked) */}
        <div
          className={`lm-news-grid lm-hidden-news ${
            showMoreNews ? "visible" : ""
          }`}
        >
          {getAdditionalNews().map((newsItem) => (
            <NewsItem key={newsItem.id} newsItem={newsItem} />
          ))}
        </div>

        {/* See More Articles Button */}
        {!showMoreNews && (
          <button className="lm-see-more-button" onClick={handleSeeMore}>
            <span className="lm-plus-icon">+</span> Xem thêm bài viết
          </button>
        )}
      </section>
    </div>
  );
};

export default LifeAtMuseumPage;
