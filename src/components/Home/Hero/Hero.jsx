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
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750392404/Khuyentai/MDP-1140241.webp",
    title: "Trang sức",
    subtitle: "Khám phá bộ sưu tập trang sức độc đáo",
    categoryLink: "/category/khuyentai",
  },
  {
    image:
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750655956/Anpham/dautay.png",
    title: "Ấn phẩm",
    subtitle: "Ấn phẩm nghệ thuật, mở ra một trang mới",
    categoryLink: "/category/anpham",
  },
  {
    image:
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750658293/hoithaonghethuat/hoithaonghethuat.jpg",
    title: "Hội thảo nghệ thuật",
    subtitle: "Khám phá và trải nghiệm nghệ thuật",
    categoryLink: "/category/hoi-thao-nghe-thuat",
  },
  {
    image:
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750731839/inyeucau/BTT01529-HDR.webp",
    title: "In theo yêu cầu",
    subtitle: "Biến ý tưởng của bạn thành hiện thực",
    categoryLink: "/category/in-theo-yeu-cau",
  },
  {
    image:
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750733148/thoitrang/aophongbackground.jpg",
    title: "Thời trang và phụ kiện",
    subtitle: "Phong cách thời thượng kết hợp nghệ thuật",
    categoryLink: "/category/thoi-trang-va-phu-kien",
  },
  {
    image:
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750736923/thocam/V%C3%A1y%20ng%E1%BA%AFn%20m%C3%A3%2005.webp",
    title: "Thổ cẩm",
    subtitle: "Sản phẩm Thổ cẩm mang đậm sắc đồng bào K'ho",
    categoryLink: "/category/thocam",
  },
  {
    image:
      "https://res.cloudinary.com/dco63bsah/image/upload/v1750739198/sanphamtuthong/Tranh%20A4%2004.jpg",
    title: "Sản phẩm từ thông",
    subtitle: "Sản phẩm được thiết kế từ Thông, nét đặc trưng thiên nhiên",
    categoryLink: "/category/sanphamtuthong",
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
              <div className="slide-image-container-hero">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="slide-images"
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
