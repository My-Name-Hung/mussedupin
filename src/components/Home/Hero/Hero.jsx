import { useEffect, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./Hero.css";

const slides = [
  {
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/DemThong_Trong.jpg?updatedAt=1749312390412",
    title: "Đêm Thông",
    subtitle: "Các sản phẩm về Thông",
    categoryLink: "/category/xuat-ban",
  },
  {
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/loirung_doc.png?updatedAt=1749269173624",
    title: "Lối rừng",
    subtitle: "Các sản phẩm về Thông",
    categoryLink: "/category/xuat-ban",
  },
  {
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Dangsuong_Doc.jpg?updatedAt=1749269171830",
    title: "Dáng sương",
    subtitle: "Các sản phẩm về Thông",
    categoryLink: "/category/xuat-ban",
  },
  {
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Th%C3%B4ng%202.webp?updatedAt=1749523250616",
    title: "Phức Tầng",
    subtitle: "Các sản phẩm về Thông",
    categoryLink: "/category/xuat-ban",
  },
  {
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/Hoa%20Ban%20Tr%E1%BA%AFng.webp?updatedAt=1749523332792",
    title: "Vật liệu",
    subtitle: "Các sản phẩm về Thông",
    categoryLink: "/category/xuat-ban",
  },
  {
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/DSC_2475.webp",
    title: "Dụng cục âm nhạc Tây Nguyên",
    subtitle: "Các sản phẩm về đồng bào K'ho",
    categoryLink: "/category/kho",
  },
  {
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/L%E1%BB%93ng%20%C4%90a%20%C4%90a.webp",
    title: "K'ho Chăn nuôi",
    subtitle: "Các sản phẩm về đồng bào K'ho",
    categoryLink: "/category/kho",
  },
  {
    image:
      "https://res.cloudinary.com/dn0br7hj0/image/upload/v1748784653/collections/b%C3%ACnh%20y%C3%AAn%201%20(2).webp",
    title: "Bề mặt ký ức",
    subtitle: "Các sản phẩm về đồng bào K'ho",
    categoryLink: "/category/kho",
  },
  {
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/fe26e39c6384d7da8e95.jpg?updatedAt=1749083704253",
    title: "Lửa thiêng",
    subtitle: "Các sản phẩm về Thông",
    categoryLink: "/category/xuat-ban",
  },
  {
    image:
      "https://ik.imagekit.io/8u8lkoqkkm/image(1).png?updatedAt=1749394994472",
    title: "Ngệ thuật vị giác",
    subtitle: "Các sản phẩm về Thông",
    categoryLink: "/category/xuat-ban",
  },
];

const Hero = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [randomSlides, setRandomSlides] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);

  useEffect(() => {
    // Shuffle and select 5 random slides
    const shuffled = [...slides].sort(() => 0.5 - Math.random());
    setRandomSlides(shuffled.slice(0, 5));
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: isPlaying,
    autoplaySpeed: 5000,
    pauseOnHover: false,
    fade: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  const togglePlayPause = () => {
    if (sliderRef) {
      if (isPlaying) {
        sliderRef.slickPause();
      } else {
        sliderRef.slickPlay();
      }
    }
    setIsPlaying(!isPlaying);
  };

  const goToSlide = (index) => {
    if (sliderRef) {
      sliderRef.slickGoTo(index);
    }
  };

  return (
    <section className="hero-container-home">
      <div className="hero-slider-container">
        <Slider ref={(slider) => setSliderRef(slider)} {...settings}>
          {randomSlides.map((slide, index) => (
            <div key={index} className="slide">
              <div className="slide-image-container">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="slide-image"
                />
                <div className="slide-content">
                  <h1 className="slide-title-hero">{slide.title}</h1>
                  <Link to={slide.categoryLink} className="slide-subtitle">
                    {slide.subtitle} <IoIosArrowRoundForward />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
        <div className="slick-nav">
          {randomSlides.map((_, index) => (
            <div
              key={index}
              className={`nav-item-hero ${
                index === currentSlide ? "active" : ""
              } ${index === currentSlide && isPlaying ? "playing" : ""}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        <button
          className="play-pause-button"
          onClick={togglePlayPause}
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </section>
  );
};

export default Hero;
