import React, { useEffect, useMemo, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import {
  MdKeyboardArrowRight,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./CategoryDetail.css";

export const sampleProducts = [
  {
    id: 1,
    title: "Sản phẩm 1",
    price: "200.000đ",
    image: "https://i.ibb.co/6cQg2V7P/image.png",
    isNew: true,
    isTrending: false,
    artist: "Albrecht Dürer",
    publishYear: "2024",
    type: "Sách nghệ thuật",
  },
  {
    id: 2,
    title: "Sản phẩm 2",
    price: "200.000đ",
    image: "https://i.ibb.co/fGTTpx8h/image.png",
    isNew: false,
    isTrending: true,
    artist: "Antonio Canova",
    publishYear: "2024",
    type: "DVD văn hóa",
  },
  {
    id: 3,
    title: "Sản phẩm 3",
    price: "200.000đ",
    image: "https://i.ibb.co/vCqsCkC2/image.png",
    isNew: true,
    isTrending: true,
    artist: "Albrecht Altdorfer",
    publishYear: "2025",
    type: "Sách tiếng Anh và tiếng nước ngoài",
  },
  {
    id: 4,
    title: "Sản phẩm 4",
    price: "200.000đ",
    image: "https://i.ibb.co/5WPtYb2R/image.png",
    isNew: false,
    isTrending: false,
    artist: "Albrecht Dürer",
    publishYear: "2024",
    type: "Danh mục triển lãm",
  },
  {
    id: 5,
    title: "Sản phẩm 5",
    price: "200.000đ",
    image: "https://i.ibb.co/yF08P7wP/image.png",
    isNew: true,
    isTrending: false,
    artist: "Antonio Canova",
    publishYear: "2025",
    type: "Dành cho du khách trẻ tuổi",
  },
  {
    id: 6,
    title: "Sản phẩm 6",
    price: "200.000đ",
    image: "https://i.ibb.co/cSWNYSZ8/image.png",
    isNew: false,
    isTrending: true,
    artist: "Albrecht Altdorfer",
    publishYear: "2024",
    type: "Tiểu thuyết đồ họa",
  },
  {
    id: 7,
    title: "Sản phẩm 7",
    price: "200.000đ",
    image: "https://i.ibb.co/k63L1YZx/image.png",
    isNew: true,
    isTrending: false,
    artist: "Albrecht Dürer",
    publishYear: "2025",
    type: "Hướng dẫn",
  },
  {
    id: 8,
    title: "Sản phẩm 8",
    price: "200.000đ",
    image: "https://i.ibb.co/1Yg77DPD/image.png",
    isNew: false,
    isTrending: true,
    artist: "Antonio Canova",
    publishYear: "2024",
    type: "Lịch sử, địa lý và khoa học",
  },
  {
    id: 9,
    title: "Sản phẩm 9",
    price: "200.000đ",
    image: "https://i.ibb.co/KcjhbNSs/image.png",
    isNew: true,
    isTrending: false,
    artist: "Albrecht Altdorfer",
    publishYear: "2025",
    type: "Văn học, thơ ca và tiểu luận",
  },
  {
    id: 10,
    title: "Sản phẩm 10",
    price: "200.000đ",
    image: "https://i.ibb.co/9H6XG43C/image.png",
    isNew: false,
    isTrending: true,
    artist: "Albrecht Dürer",
    publishYear: "2024",
    type: "Tạp chí",
  },
  {
    id: 11,
    title: "Sản phẩm 11",
    price: "200.000đ",
    image: "https://i.ibb.co/dsyXjGr3/image.png",
    isNew: true,
    isTrending: false,
    artist: "Antonio Canova",
    publishYear: "2025",
    type: "Sách nghệ thuật",
  },
  {
    id: 12,
    title: "Sản phẩm 12",
    price: "200.000đ",
    image: "https://i.ibb.co/FbHmxbq4/image.png",
    isNew: false,
    isTrending: true,
    artist: "Albrecht Altdorfer",
    publishYear: "2024",
    type: "DVD văn hóa",
  },
  {
    id: 13,
    title: "Sản phẩm 13",
    price: "200.000đ",
    image: "https://i.ibb.co/0jYkn08k/image.png",
    isNew: true,
    isTrending: false,
    artist: "Albrecht Dürer",
    publishYear: "2025",
    type: "Sách tiếng Anh và tiếng nước ngoài",
  },
  {
    id: 14,
    title: "Sản phẩm 14",
    price: "200.000đ",
    image: "https://i.ibb.co/8L3pPzw8/image.png",
    isNew: false,
    isTrending: true,
    artist: "Antonio Canova",
    publishYear: "2024",
    type: "Danh mục triển lãm",
  },
  {
    id: 15,
    title: "Sản phẩm 15",
    price: "200.000đ",
    image: "https://i.ibb.co/8L3pPzw8/image.png",
    isNew: true,
    isTrending: false,
    artist: "Albrecht Altdorfer",
    publishYear: "2025",
    type: "Dành cho du khách trẻ tuổi",
  },
  {
    id: 16,
    title: "Sản phẩm 16",
    price: "200.000đ",
    image: "https://i.ibb.co/fzgssXHc/image.png",
    isNew: false,
    isTrending: true,
    artist: "Albrecht Dürer",
    publishYear: "2024",
    type: "Tiểu thuyết đồ họa",
  },
  {
    id: 17,
    title: "Sản phẩm 17",
    price: "200.000đ",
    image: "https://i.ibb.co/bjh7gdWt/image.png",
    isNew: true,
    isTrending: false,
    artist: "Antonio Canova",
    publishYear: "2025",
    type: "Hướng dẫn",
  },
  {
    id: 18,
    title: "Sản phẩm 18",
    price: "200.000đ",
    image: "https://i.ibb.co/N6r6b5yd/image.png",
    isNew: false,
    isTrending: true,
    artist: "Albrecht Altdorfer",
    publishYear: "2024",
    type: "Lịch sử, địa lý và khoa học",
  },
  {
    id: 19,
    title: "Sản phẩm 19",
    price: "200.000đ",
    image: "https://i.ibb.co/HD2tpfyH/image.png",
    isNew: true,
    isTrending: false,
    artist: "Albrecht Dürer",
    publishYear: "2025",
    type: "Văn học, thơ ca và tiểu luận",
  },
  {
    id: 20,
    title: "Sản phẩm 20",
    price: "200.000đ",
    image: "https://i.ibb.co/YqfCjjS/image.png",
    isNew: false,
    isTrending: true,
    artist: "Antonio Canova",
    publishYear: "2024",
    type: "Tạp chí",
  },
  {
    id: 21,
    title: "Sản phẩm 21",
    price: "250.000đ",
    image: "https://i.ibb.co/6cQg2V7P/image.png",
    isNew: true,
    isTrending: false,
    artist: "Leonardo da Vinci",
    publishYear: "2023",
    type: "Sách nghệ thuật",
  },
  {
    id: 22,
    title: "Sản phẩm 22",
    price: "280.000đ",
    image: "https://i.ibb.co/fGTTpx8h/image.png",
    isNew: false,
    isTrending: true,
    artist: "Michelangelo",
    publishYear: "2022",
    type: "DVD văn hóa",
  },
];

const filterCategories = {
  "xuat-ban": {
    types: [
      { name: "Sách nghệ thuật", count: 72 },
      { name: "DVD văn hóa", count: 4 },
      { name: "Sách tiếng Anh và tiếng nước ngoài", count: 3 },
      { name: "Danh mục triển lãm", count: 73 },
      { name: "Dành cho du khách trẻ tuổi", count: 73 },
      { name: "Tiểu thuyết đồ họa", count: 28 },
      { name: "Hướng dẫn", count: 8 },
      { name: "Lịch sử, địa lý và khoa học", count: 34 },
      { name: "Văn học, thơ ca và tiểu luận", count: 23 },
      { name: "Tạp chí", count: 83 },
    ],
    artists: [
      { name: "Albrecht Altdorfer", count: 15 },
      { name: "Albrecht Dürer", count: 25 },
      { name: "Antonio Canova", count: 18 },
      { name: "Leonardo da Vinci", count: 42 },
      { name: "Michelangelo", count: 35 },
      { name: "Claude Monet", count: 28 },
      { name: "Vincent van Gogh", count: 31 },
    ],
    publishYears: ["2024", "2025", "2023", "2022"],
  },
  "hoi-thao-nghe-thuat": {
    types: [
      { name: "Hội thảo trực tiếp", count: 45 },
      { name: "Workshop online", count: 38 },
      { name: "Triển lãm ảo", count: 27 },
      { name: "Tọa đàm nghệ thuật", count: 52 },
      { name: "Khóa học thực hành", count: 63 },
      { name: "Chương trình tham quan", count: 31 },
    ],
    artists: [
      { name: "Pablo Picasso", count: 28 },
      { name: "Salvador Dalí", count: 22 },
      { name: "Frida Kahlo", count: 19 },
      { name: "Andy Warhol", count: 34 },
      { name: "Gustav Klimt", count: 25 },
    ],
    publishYears: ["2024", "2025"],
  },
  "in-theo-yeu-cau": {
    types: [
      { name: "In tranh nghệ thuật", count: 85 },
      { name: "In ảnh chất lượng cao", count: 67 },
      { name: "In trên canvas", count: 43 },
      { name: "In trên giấy đặc biệt", count: 38 },
      { name: "In theo kích thước tùy chỉnh", count: 92 },
    ],
    artists: [
      { name: "Henri Matisse", count: 31 },
      { name: "Paul Cézanne", count: 27 },
      { name: "Edgar Degas", count: 24 },
      { name: "Auguste Renoir", count: 29 },
    ],
    publishYears: ["2024", "2025"],
  },
  "hinh-anh-va-van-phong-pham": {
    types: [
      { name: "Sổ tay nghệ thuật", count: 56 },
      { name: "Bút và bộ bút", count: 43 },
      { name: "Thiệp nghệ thuật", count: 38 },
      { name: "Poster và tranh in", count: 72 },
      { name: "Đồ dùng văn phòng", count: 45 },
    ],
    artists: [
      { name: "Wassily Kandinsky", count: 23 },
      { name: "Paul Klee", count: 19 },
      { name: "Joan Miró", count: 27 },
      { name: "Piet Mondrian", count: 21 },
    ],
    publishYears: ["2024", "2025"],
  },
  "thoi-trang-va-phu-kien": {
    types: [
      { name: "Áo thun nghệ thuật", count: 64 },
      { name: "Túi tote canvas", count: 48 },
      { name: "Khăn quàng", count: 35 },
      { name: "Phụ kiện thời trang", count: 82 },
      { name: "Mũ và nón", count: 29 },
    ],
    artists: [
      { name: "Georgia O'Keeffe", count: 26 },
      { name: "René Magritte", count: 31 },
      { name: "Marc Chagall", count: 24 },
      { name: "Egon Schiele", count: 22 },
    ],
    publishYears: ["2024", "2025"],
  },
  "do-trang-suc": {
    types: [
      { name: "Vòng cổ nghệ thuật", count: 58 },
      { name: "Hoa tai", count: 42 },
      { name: "Vòng tay", count: 37 },
      { name: "Nhẫn", count: 45 },
      { name: "Bộ trang sức", count: 31 },
    ],
    artists: [
      { name: "Gustav Fabergé", count: 28 },
      { name: "René Lalique", count: 34 },
      { name: "Cartier", count: 41 },
      { name: "Tiffany & Co.", count: 37 },
    ],
    publishYears: ["2024", "2025"],
  },
  "do-gia-dung": {
    types: [
      { name: "Đồ trang trí nhà", count: 73 },
      { name: "Bình và lọ", count: 45 },
      { name: "Đèn trang trí", count: 38 },
      { name: "Khung ảnh", count: 52 },
      { name: "Đồ dùng bàn ăn", count: 64 },
    ],
    artists: [
      { name: "William Morris", count: 29 },
      { name: "Frank Lloyd Wright", count: 35 },
      { name: "Charles Rennie Mackintosh", count: 27 },
      { name: "Émile Gallé", count: 31 },
    ],
    publishYears: ["2024", "2025"],
  },
  "tre-em": {
    types: [
      { name: "Sách tô màu", count: 47 },
      { name: "Đồ chơi nghệ thuật", count: 58 },
      { name: "Bộ dụng cụ vẽ", count: 42 },
      { name: "Sách truyện nghệ thuật", count: 63 },
      { name: "Trò chơi sáng tạo", count: 51 },
    ],
    artists: [
      { name: "Maurice Sendak", count: 32 },
      { name: "Eric Carle", count: 38 },
      { name: "Beatrix Potter", count: 29 },
      { name: "Dr. Seuss", count: 45 },
    ],
    publishYears: ["2024", "2025"],
  },
};

const categoryData = {
  "xuat-ban": {
    title: "Xuất bản",
    subtitle:
      "Đắm mình vào thư viện lý tưởng không thể hiểu thấu của Louvre! Thông qua bộ sưu tập các tác phẩm về sống...",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400222/691027-a35b4cad-banner/contents-691027.jpg",
  },
  "hoi-thao-nghe-thuat": {
    title: "Hội thảo nghệ thuật",
    subtitle:
      "Khám phá nghệ thuật qua góc nhìn mới mẻ, nơi hội tụ của những tài năng và đam mê sáng tạo không giới hạn",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400223/691028-61587142-banner/contents-691028.jpg",
  },
  "in-theo-yeu-cau": {
    title: "In theo yêu cầu",
    subtitle:
      "Biến ý tưởng của bạn thành hiện thực với dịch vụ in ấn chất lượng cao, tùy chỉnh theo mọi nhu cầu",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400170/688709-73fd23f3-banner/contents-688709.jpg",
  },
  "hinh-anh-va-van-phong-pham": {
    title: "Hình ảnh và văn phòng phẩm",
    subtitle:
      "Nâng tầm không gian làm việc với bộ sưu tập văn phòng phẩm độc đáo, kết hợp nghệ thuật và công năng",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400224/691029-c28db588-banner/contents-691029.jpg",
  },
  "thoi-trang-va-phu-kien": {
    title: "Thời trang và phụ kiện",
    subtitle:
      "Phong cách thời thượng kết hợp với nghệ thuật đương đại, tạo nên những thiết kế độc đáo và sang trọng",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400225/691030-3dd3fd53-banner/contents-691030.jpg",
  },
  "do-trang-suc": {
    title: "Đồ trang sức",
    subtitle:
      "Những kiệt tác nghệ thuật thu nhỏ, mang vẻ đẹp tinh tế và câu chuyện lịch sử đến từng chi tiết",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400226/691031-d554a72c-banner/contents-691031.jpg",
  },
  "do-gia-dung": {
    title: "Đồ gia dụng",
    subtitle:
      "Nâng tầm không gian sống với bộ sưu tập đồ gia dụng nghệ thuật, kết hợp thẩm mỹ và công năng",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400227/691032-4ab30b8c-banner/contents-691032.jpg",
  },
  "tre-em": {
    title: "Trẻ em",
    subtitle:
      "Khơi dậy trí tưởng tượng và tình yêu nghệ thuật cho thế hệ tương lai qua những sản phẩm đặc biệt",
    heroImage:
      "https://boutique.louvre.fr/files/contents/400228/691034-5653eeb4-banner/contents-691034.jpg",
  },
};

const CategoryDetail = () => {
  const { categoryId } = useParams();
  const category = categoryData[categoryId];
  const [showFilters, setShowFilters] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [recentlyViewedProducts, setRecentlyViewedProducts] = useState([]);

  // Load recently viewed products from localStorage on component mount
  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("recentlyViewedProducts") || "[]"
    );
    setRecentlyViewedProducts(storedProducts);
  }, []);

  // Function to add a product to recently viewed
  const addToRecentlyViewed = (product) => {
    setRecentlyViewedProducts((prevProducts) => {
      // Remove the product if it already exists
      const filteredProducts = prevProducts.filter((p) => p.id !== product.id);
      // Add the product to the beginning of the array
      const newProducts = [product, ...filteredProducts].slice(0, 10); // Keep only the last 10 products
      // Save to localStorage
      localStorage.setItem(
        "recentlyViewedProducts",
        JSON.stringify(newProducts)
      );
      return newProducts;
    });
  };

  // Function to remove a product from recently viewed
  const removeFromRecentlyViewed = (productId) => {
    setRecentlyViewedProducts((prevProducts) => {
      const newProducts = prevProducts.filter((p) => p.id !== productId);
      localStorage.setItem(
        "recentlyViewedProducts",
        JSON.stringify(newProducts)
      );
      return newProducts;
    });
  };

  // Calculate min and max prices from products
  const priceRange = useMemo(() => {
    const prices = sampleProducts.map((product) =>
      parseInt(product.price.replace(/[^\d]/g, ""))
    );
    return {
      min: 0, // Always start from 0
      max: Math.max(...prices),
    };
  }, []);

  const [openSections, setOpenSections] = useState({
    types: false,
    artists: false,
    publishYears: false,
    priceRange: false,
  });

  const [selectedFilters, setSelectedFilters] = useState({
    types: [],
    artists: [],
    publishYears: [],
    priceRange: [priceRange.min, priceRange.max],
  });

  const [filteredProducts, setFilteredProducts] = useState(sampleProducts);
  const [filteredCount, setFilteredCount] = useState(sampleProducts.length);
  const [filterCounts, setFilterCounts] = useState({
    types: {},
    artists: {},
    publishYears: {},
  });

  const [previewCount, setPreviewCount] = useState(sampleProducts.length);

  // Format price for display
  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  // Filter products based on current filters
  const filterProducts = (products, filters) => {
    return products.filter((product) => {
      const typeMatch =
        filters.types.length === 0 || filters.types.includes(product.type);

      const artistMatch =
        filters.artists.length === 0 ||
        filters.artists.includes(product.artist);

      const yearMatch =
        filters.publishYears.length === 0 ||
        filters.publishYears.includes(product.publishYear);

      const price = parseInt(product.price.replace(/[^\d]/g, ""));
      const priceMatch =
        price >= filters.priceRange[0] && price <= filters.priceRange[1];

      return typeMatch && artistMatch && yearMatch && priceMatch;
    });
  };

  // Calculate counts for each filter option based on current filtered products
  const calculateFilterCounts = (products) => {
    const counts = {
      types: {},
      artists: {},
      publishYears: {},
    };

    products.forEach((product) => {
      counts.types[product.type] = (counts.types[product.type] || 0) + 1;
      counts.artists[product.artist] =
        (counts.artists[product.artist] || 0) + 1;
      counts.publishYears[product.publishYear] =
        (counts.publishYears[product.publishYear] || 0) + 1;
    });

    setFilterCounts(counts);
  };

  // Update preview count whenever filters change
  useEffect(() => {
    const filtered = filterProducts(sampleProducts, selectedFilters);
    setPreviewCount(filtered.length);
    calculateFilterCounts(filtered);
  }, [selectedFilters]);

  // Toggle section open/close
  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Apply filters
  const applyFilters = () => {
    const filtered = filterProducts(sampleProducts, selectedFilters);
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
    setShowFilters(false);
  };

  // Reset filters
  const resetFilters = () => {
    const initialFilters = {
      types: [],
      artists: [],
      publishYears: [],
      priceRange: [priceRange.min, priceRange.max],
    };
    setSelectedFilters(initialFilters);
    const filtered = filterProducts(sampleProducts, initialFilters);
    setFilteredProducts(filtered);
    setFilteredCount(filtered.length);
    setPreviewCount(filtered.length);
    calculateFilterCounts(filtered);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".sort-dropdown-container")) {
        setShowSortDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const productsPerPage = 20;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setShowSortDropdown(false);

    const sorted = [...filteredProducts].sort((a, b) => {
      if (order === "default") {
        return a.id - b.id; // Return to original order
      }
      const priceA = parseInt(a.price.replace(/\D/g, ""));
      const priceB = parseInt(b.price.replace(/\D/g, ""));
      return order === "asc" ? priceA - priceB : priceB - priceA;
    });
    setFilteredProducts(sorted);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  if (!category) {
    return <div>Category not found</div>;
  }

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <div className="category-detail">
      <Link to="/" className="back-button">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 12H5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 19L5 12L12 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Quay lại</span>
      </Link>

      <div className="hero-section-category">
        <div className="hero-image-category-container">
          <img
            src={category.heroImage}
            alt={category.title}
            className="hero-image-category"
          />
          <div className="hero-content-category">
            <h1 className="hero-title-category">{category.title}</h1>
            <p className="hero-subtitle-category">{category.subtitle}</p>
          </div>
        </div>
      </div>

      <section className="list-item-categories">
        <div className="sort-categories">
          <div className="total-products">
            <span className="total-count">{filteredCount}</span>
            <span>sản phẩm</span>
          </div>
          <div className="sort-dropdown-container">
            <div
              className={`sort-dropdown-header ${
                showSortDropdown ? "active" : ""
              }`}
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              i
              <span>
                Sắp xếp theo:{" "}
                {sortOrder === "asc"
                  ? "giá tăng dần"
                  : sortOrder === "desc"
                  ? "giá đang giảm dần"
                  : "lựa chọn của chúng tôi"}
              </span>
              <RiArrowDropDownLine
                className={showSortDropdown ? "rotated" : ""}
              />
            </div>
            {showSortDropdown && (
              <div className="sort-dropdown-menu">
                <div
                  className={`sort-option ${
                    sortOrder === "default" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("default")}
                >
                  <strong> lựa chọn của chúng tôi </strong>
                </div>
                <div
                  className={`sort-option ${
                    sortOrder === "asc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("asc")}
                >
                  giá tăng dần
                </div>
                <div
                  className={`sort-option ${
                    sortOrder === "desc" ? "active" : ""
                  }`}
                  onClick={() => handleSortChange("desc")}
                >
                  giá đang giảm dần
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="products-grid">
          {currentProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              <Link
                to={`/product/${product.id}`}
                className="product-card"
                onClick={() => addToRecentlyViewed(product)}
              >
                <div className="product-image-container">
                  {product.isNew && <span className="tag new">Mới</span>}
                  {product.isTrending && (
                    <span className="tag trending">Thịnh hành</span>
                  )}
                  <img src={product.image} alt={product.title} />
                </div>
                <h3>{product.title}</h3>
                <p className="price">{product.price}</p>
              </Link>
              {index === 9 && filteredProducts.length > 10 && (
                <div className="block-product">
                  <Link
                    to={`/product/${filteredProducts[10].id}`}
                    className="featured-product"
                    onClick={() => addToRecentlyViewed(filteredProducts[10])}
                  >
                    <img
                      src={filteredProducts[10].image}
                      alt={filteredProducts[10].title}
                    />
                    <div className="featured-content">
                      <h3>{filteredProducts[10].title}</h3>
                      <p className="price">{filteredProducts[10].price}</p>
                    </div>
                  </Link>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Only show load more button if there are more products to display */}
        {currentPage * productsPerPage < filteredProducts.length && (
          <div className="load-more">
            <button onClick={() => handlePageChange(currentPage + 1)}>
              Xem thêm sản phẩm <GoPlus />
            </button>
          </div>
        )}

        <div className="result-pager">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
          <button
            onClick={() =>
              handlePageChange(Math.min(currentPage + 10, totalPages))
            }
            disabled={currentPage + 10 > totalPages}
          >
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </section>

      {/* Recently Viewed Products Section */}
      {recentlyViewedProducts.length > 0 && (
        <section className="productreseen">
          <h2>Các sản phẩm đã xem gần đây</h2>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={4}
            navigation
            pagination={{ clickable: true }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              480: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
          >
            {recentlyViewedProducts.map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-card-reseen">
                  <button
                    className="remove-product"
                    onClick={() => removeFromRecentlyViewed(product.id)}
                  >
                    <IoMdClose />
                  </button>
                  <Link to={`/product/${product.id}`}>
                    <div className="product-image-container">
                      <img src={product.image} alt={product.title} />
                    </div>
                    <h3>{product.title}</h3>
                    <p className="price">{product.price}</p>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}

      <button
        className="filter-button"
        onClick={() => {
          setShowFilters(true);
          if (!showFilters) {
            resetFilters();
          }
        }}
      >
        {showFilters ? `Kết quả (${previewCount})` : "Bộ lọc"}
      </button>

      {showFilters && (
        <div className="search-filters-modal">
          <div className="search-filters-content">
            <div className="search-filters-header">
              <h2 className="search-filters-title">Bộ lọc</h2>
              <button
                className="close-filters-button"
                onClick={() => setShowFilters(false)}
                aria-label="Đóng bộ lọc"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Types Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("types")}
              >
                <h3>Thể loại</h3>
                <RiArrowDropDownLine
                  className={openSections.types ? "rotated" : ""}
                />
              </div>
              {openSections.types && (
                <div className="filter-options">
                  {filterCategories[categoryId]?.types.map((type) => (
                    <label key={type.name} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters.types.includes(type.name)}
                        onChange={(e) => {
                          const newTypes = e.target.checked
                            ? [...selectedFilters.types, type.name]
                            : selectedFilters.types.filter(
                                (t) => t !== type.name
                              );
                          setSelectedFilters((prev) => ({
                            ...prev,
                            types: newTypes,
                          }));
                        }}
                      />
                      <span>{type.name}</span>
                      <span className="count">
                        ({filterCounts.types[type.name] || 0})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Artists Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("artists")}
              >
                <h3>Nghệ sĩ</h3>
                <RiArrowDropDownLine
                  className={openSections.artists ? "rotated" : ""}
                />
              </div>
              {openSections.artists && (
                <div className="filter-options">
                  {filterCategories[categoryId]?.artists.map((artist) => (
                    <label key={artist.name} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters.artists.includes(artist.name)}
                        onChange={(e) => {
                          const newArtists = e.target.checked
                            ? [...selectedFilters.artists, artist.name]
                            : selectedFilters.artists.filter(
                                (a) => a !== artist.name
                              );
                          setSelectedFilters((prev) => ({
                            ...prev,
                            artists: newArtists,
                          }));
                        }}
                      />
                      <span>{artist.name}</span>
                      <span className="count">
                        ({filterCounts.artists[artist.name] || 0})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Publish Years Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("publishYears")}
              >
                <h3>Thời gian xuất bản</h3>
                <RiArrowDropDownLine
                  className={openSections.publishYears ? "rotated" : ""}
                />
              </div>
              {openSections.publishYears && (
                <div className="filter-options">
                  {filterCategories[categoryId]?.publishYears.map((year) => (
                    <label key={year} className="filter-option">
                      <input
                        type="checkbox"
                        checked={selectedFilters.publishYears.includes(year)}
                        onChange={(e) => {
                          const newYears = e.target.checked
                            ? [...selectedFilters.publishYears, year]
                            : selectedFilters.publishYears.filter(
                                (y) => y !== year
                              );
                          setSelectedFilters((prev) => ({
                            ...prev,
                            publishYears: newYears,
                          }));
                        }}
                      />
                      <span>{year}</span>
                      <span className="count">
                        ({filterCounts.publishYears[year] || 0})
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Section */}
            <div className="filter-section">
              <div
                className="filter-header"
                onClick={() => toggleSection("priceRange")}
              >
                <h3>Giá cả</h3>
                <RiArrowDropDownLine
                  className={openSections.priceRange ? "rotated" : ""}
                />
              </div>
              {openSections.priceRange && (
                <div className="price-range-slider">
                  <div className="price-range-inputs">
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.priceRange[0]}
                      onChange={(e) => {
                        const minValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            Math.min(minValue, prev.priceRange[1]),
                            prev.priceRange[1],
                          ],
                        }));
                      }}
                    />
                    <input
                      type="range"
                      min={priceRange.min}
                      max={priceRange.max}
                      value={selectedFilters.priceRange[1]}
                      onChange={(e) => {
                        const maxValue = parseInt(e.target.value);
                        setSelectedFilters((prev) => ({
                          ...prev,
                          priceRange: [
                            prev.priceRange[0],
                            Math.max(maxValue, prev.priceRange[0]),
                          ],
                        }));
                      }}
                    />
                  </div>
                  <div className="price-range-values">
                    <span>{formatPrice(selectedFilters.priceRange[0])}</span>
                    <span>{formatPrice(selectedFilters.priceRange[1])}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="apply-filters-button"
            onClick={applyFilters}
            disabled={previewCount === 0}
          >
            Kết quả ({previewCount})
          </button>
        </div>
      )}
    </div>
  );
};

export default CategoryDetail;
