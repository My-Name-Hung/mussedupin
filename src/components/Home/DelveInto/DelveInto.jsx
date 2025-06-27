import React, { useEffect, useRef, useState } from "react";
import "./DelveInto.css";

const imageList = [
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/phimdienanh_doc.jpg?updatedAt=1750298609321",
    alt: "Phim điện ảnh dọc",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/phimdienanh_ngang.jpg?updatedAt=1750298609073",
    alt: "Phim điện ảnh ngang",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour2.jpg?updatedAt=1750001276276",
    alt: "Pin D'amour 2",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour4.jpg?updatedAt=1750001276251",
    alt: "Pin D'amour 4",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour5.jpg?updatedAt=1750001275246",
    alt: "Pin D'amour 5",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/Thông 2.webp?updatedAt=1749523250616",
    alt: "Thông 2",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/PinD'amour6.jpg?updatedAt=1750001274965",
    alt: "Pin D'amour 6",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/image(1).png?updatedAt=1749394994472",
    alt: "Image 1",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Ngoai.jpg?updatedAt=1749312109958",
    alt: "Giai điệu dài ngắn ngoại",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/Tourdemhuyenthoai_Trong.jpg?updatedAt=1749312109881",
    alt: "Tour đêm huyền thoại trong",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/Giaidieudaingan_Trong.jpg?updatedAt=1749311873117",
    alt: "Giai điệu dài ngắn trong",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/uommamsangtao_Ngoai.jpg?updatedAt=1749311934281",
    alt: "Ươm mầm sáng tạo ngoại",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/Chuongtrinhdinhky_Trong.jpg?updatedAt=1749268863163",
    alt: "Chương trình định kỳ trong",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/Chuongtrinhdinhky.jpg?updatedAt=1749267196289",
    alt: "Chương trình định kỳ",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/Luutru_Trong.jpg?updatedAt=1749268862975",
    alt: "Lưu trữ trong",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru_Trong.jpg?updatedAt=1749268862925",
    alt: "Không lưu trữ trong",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/KhongLuuTru.jpg?updatedAt=1749267196332",
    alt: "Không lưu trữ",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/dddd4a06bb310f6f5620.jpg?updatedAt=1749190760200",
    alt: "DDDD",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/image(4).png?updatedAt=1749394995088",
    alt: "Image 4",
  },
  {
    url: "https://ik.imagekit.io/8u8lkoqkkm/image(2).png?updatedAt=1749000540091",
    alt: "Image 2",
  },
];

const DelveInto = () => {
  const gridRef = useRef(null);
  const [randomImages, setRandomImages] = useState([]);

  // Function to shuffle array and get first n elements
  const getRandomImages = (array, n) => {
    const shuffled = [...array].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, n);
  };

  // Set initial random images on component mount
  useEffect(() => {
    setRandomImages(getRandomImages(imageList, 6));
  }, []);

  // Add mouse movement effect for grid items
  useEffect(() => {
    const gridItems = document.querySelectorAll(".grid-item");

    const handleMouseMove = (e) => {
      gridItems.forEach((item) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Calculate mouse position as percentage of the element
        const mouseX = Math.floor((x / rect.width) * 100);
        const mouseY = Math.floor((y / rect.height) * 100);

        item.style.setProperty("--mouse-x", `${mouseX}%`);
        item.style.setProperty("--mouse-y", `${mouseY}%`);
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleExploreClick = () => {
    // Get the navbar component's functions
    const navbarElement = document.querySelector("header.navbar-container");
    if (navbarElement) {
      // Show mobile menu first
      const mobileMenu = navbarElement.querySelector(".mobile-menu-overlay");
      if (mobileMenu) {
        mobileMenu.classList.add("show");
      }

      // Find and click the "KHÁM PHÁ" menu item to trigger its submenu
      setTimeout(() => {
        const khamPhaMenuItem = Array.from(
          navbarElement.querySelectorAll(".mobile-nav-item")
        ).find((item) => item.textContent.includes("KHÁM PHÁ"));
        if (khamPhaMenuItem) {
          khamPhaMenuItem.click();
        }
      }, 100);
    }
  };

  return (
    <section className="delve-into-section">
      <div className="delve-into-container">
        <h2 className="delve-into-title">Khám phá Musée Du Pin</h2>

        <div className="delve-into-grid" ref={gridRef}>
          {randomImages.map((image, index) => (
            <div key={index} className={`grid-item grid-item-${index + 1}`}>
              <img src={image.url} alt={image.alt} className="grid-image" />
            </div>
          ))}
        </div>

        <div className="explore-button-container">
          <button className="explore-button" onClick={handleExploreClick}>
            Khám phá
          </button>
        </div>
      </div>
    </section>
  );
};

export default DelveInto;
