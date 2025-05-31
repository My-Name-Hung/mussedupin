import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
import { useAssets } from "../../hooks/useAssets";
import "./NewsDetailPage.css";

// Helper function to create URL-friendly slugs from titles
const createSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/--+/g, "-") // Replace multiple hyphens with single hyphen
    .trim(); // Remove leading/trailing spaces
};

// Get all news data (combining both initial and additional news)
const getAllNewsData = () => {
  // Import news data from LifeAtMuseumPage
  const newsData = [
    {
      id: 1,
      title:
        "Bức tranh này không mất đi sự phức tạp khi bạn nhìn lâu – nó trở nên phong phú hơn",
      date: "5 THÁNG 2 2025",
      image: "congchien_cards.webp",
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
      image: "congchien_cards.webp",
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
      image: "congchien_cards.webp",
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
      image: "congchien_cards.webp",
      excerpt:
        "Một loạt hội thảo cuối tuần đặc biệt giới thiệu cho trẻ em về kỹ thuật hội họa của các bậc thầy thời Phục hưng.",
      category: "Giáo dục",
      subcategory: "Hội thảo",
      content: `<p>Một loạt hội thảo cuối tuần đặc biệt giới thiệu cho trẻ em về kỹ thuật hội họa của các bậc thầy thời Phục hưng.</p>
        <p>Được thiết kế cho độ tuổi 8-12, những hội thảo hấp dẫn này sẽ hướng dẫn các nghệ sĩ nhí về những nguyên tắc cơ bản của bố cục, pha màu và phối cảnh như được thực hành bởi các nghệ sĩ như Leonardo da Vinci và Raphael.</p>
        <p>Mỗi người tham gia sẽ tạo ra kiệt tác của riêng mình bằng cách sử dụng các vật liệu truyền thống trong khi học về bối cảnh lịch sử và ý nghĩa của nghệ thuật Phục hưng. Tất cả vật liệu được cung cấp.</p>`,
    },
    {
      id: 5,
      title: "Bộ sưu tập mới: Điêu khắc Pháp thế kỷ 18",
      date: "5 THÁNG 9 2024",
      image: "congchien_cards.webp",
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
      image: "congchien_cards.webp",
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
      image: "congchien_cards.webp",
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
      image: "congchien_cards.webp",
      excerpt:
        "Khám phá vẻ đẹp và nghệ thuật của tranh khắc gỗ truyền thống Nhật Bản trong triển lãm tạm thời mới của chúng tôi với các tác phẩm từ thời kỳ Edo đến các nghệ sĩ đương đại.",
      category: "Triển lãm",
      subcategory: "Tạm thời",
      content: `<p>Khám phá vẻ đẹp và nghệ thuật của tranh khắc gỗ truyền thống Nhật Bản trong triển lãm tạm thời mới của chúng tôi với các tác phẩm từ thời kỳ Edo đến các nghệ sĩ đương đại.</p>
        <p>Triển lãm toàn diện này theo dõi sự phát triển của tranh ukiyo-e từ thế kỷ 17 đến các diễn giải hiện đại, trưng bày các kiệt tác của Hokusai, Hiroshige và các nghệ nhân in ấn hàng đầu ngày nay.</p>
        <p>Khách tham quan cũng có thể tham gia các buổi trình diễn hàng tuần về kỹ thuật in khắc gỗ truyền thống do các nghệ nhân in ấn thăm viếng từ Kyoto thực hiện.</p>`,
    },
  ];

  return newsData;
};

const NewsDetailPage = () => {
  const { getAssetUrl } = useAssets();
  const { translate } = useTranslation();
  const navigate = useNavigate();
  const { slug } = useParams();
  const [newsItem, setNewsItem] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const allNews = getAllNewsData();

  useEffect(() => {
    // Find the news item matching the slug
    const findNewsItem = allNews.find(
      (item) => createSlug(item.title) === slug
    );

    if (findNewsItem) {
      setNewsItem(findNewsItem);
      document.title = `${findNewsItem.title} | Musée Du Pin`;

      // First try to get related news with the same category/subcategory
      let related = allNews.filter(
        (item) =>
          item.id !== findNewsItem.id &&
          (item.category === findNewsItem.category ||
            item.subcategory === findNewsItem.subcategory)
      );

      // If not enough related news found by category, add other news items
      if (related.length < 3) {
        const otherNews = allNews.filter(
          (item) =>
            item.id !== findNewsItem.id &&
            !related.some((relatedItem) => relatedItem.id === item.id)
        );
        related = [...related, ...otherNews].slice(0, 3);
      } else {
        related = related.slice(0, 3);
      }

      setRelatedNews(related);
    } else {
      // Redirect to Life at the Museum page if news item not found
      navigate("/life-at-the-museum");
    }
  }, [slug, navigate, allNews]);

  if (!newsItem) {
    return <div className="news-detail-loading">Đang tải...</div>;
  }

  return (
    <div className="news-detail-page">
      {/* Hero section */}
      <div className="news-detail-hero">
        {newsItem.image && (
          <img src={getAssetUrl(newsItem.image)} alt={newsItem.title} />
        )}
        <div className="hero-overlay">
          <h1>{translate("news") || "TIN TỨC"}</h1>
        </div>
      </div>

      <div className="news-detail-container">
        {/* Categories and date */}
        <div className="news-detail-meta">
          <div className="news-detail-categories">
            <span className="news-detail-category">{newsItem.category}</span>
            <span className="news-detail-subcategory">
              {newsItem.subcategory}
            </span>
          </div>
          <time className="news-detail-date">{newsItem.date}</time>
        </div>

        {/* Title and content */}
        <h1 className="news-detail-title">{newsItem.title}</h1>
        <div
          className="news-detail-content"
          dangerouslySetInnerHTML={{ __html: newsItem.content }}
        ></div>

        {/* Share links */}
        <div className="news-detail-share">
          <h3>Chia sẻ bài viết này</h3>
          <div className="news-detail-share-buttons">
            <button className="share-button facebook">Facebook</button>
            <button className="share-button email">Email</button>
          </div>
        </div>

        {/* Related news - always show this section */}
        <div className="news-detail-related">
          <h2>Tin tức liên quan</h2>
          {relatedNews.length > 0 ? (
            <div className="news-detail-related-grid">
              {relatedNews.map((item) => (
                <article key={item.id} className="related-news-item">
                  <a href={`/life-at-the-museum/${createSlug(item.title)}`}>
                    <div className="related-news-image-container">
                      {item.image && (
                        <img
                          src={getAssetUrl(item.image)}
                          alt={item.title}
                          className="related-news-image"
                        />
                      )}
                    </div>
                    <h3 className="related-news-title">{item.title}</h3>
                    <time className="related-news-date">{item.date}</time>
                  </a>
                </article>
              ))}
            </div>
          ) : (
            <p className="no-related-news">Đang tải bài viết liên quan...</p>
          )}
        </div>

        {/* Back button */}
        <div className="news-detail-back">
          <a href="/life-at-the-museum" className="back-button">
            ← Quay lại tất cả tin tức
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsDetailPage;
