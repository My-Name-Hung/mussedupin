import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TranslatedText from "../../TranslatedText";
import "./VisitInfo.css";

// Images - we'll import placeholder images from assets
import informationDeskImg from "../../../assets/home/collections/ANewLook.jpg";
import cloakroomImg from "../../../assets/home/collections/beautes.jpg";
import equipmentImg from "../../../assets/home/collections/couture.jpg";
import heroImage from "../../../assets/home/collections/louvre-sunset.jpg";
import babySpaceImg from "../../../assets/home/collections/mamluks.jpg";
import wifiImg from "../../../assets/home/collections/Masterpieces.jpg";
import toiletsImg from "../../../assets/home/collections/Nature.jpg";
import parkingImg from "../../../assets/home/collections/portrait.jpg";
import lostFoundImg from "../../../assets/home/collections/TheMetAu.jpg";

// Homestay images
import modernImg from "../../../assets/home/collections/ANewLook.jpg";
import luxuryImg from "../../../assets/home/collections/couture.jpg";
import budgetImg from "../../../assets/home/collections/mamluks.jpg";
import traditionalImg from "../../../assets/home/collections/Nature.jpg";

// Additional homestay images for galleries
import room1 from "../../../assets/home/collections/beautes.jpg";
import room2 from "../../../assets/home/collections/Masterpieces.jpg";
import room3 from "../../../assets/home/collections/portrait.jpg";
import room4 from "../../../assets/home/collections/TheMetAu.jpg";

import { FaBaby, FaCar, FaSearch } from "react-icons/fa";

const VisitInfo = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("amenities");
  const [isNavSticky, setIsNavSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);

  // Homestay filter and detail states
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredHomestays, setFilteredHomestays] = useState([]);
  const [showDetailsSidebar, setShowDetailsSidebar] = useState(false);
  const [showBookingSidebar, setShowBookingSidebar] = useState(false);
  const [selectedHomestay, setSelectedHomestay] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    specialRequests: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successBookingData, setSuccessBookingData] = useState(null);
  // Add new state variables for gallery
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Add new states for date and time pickers
  const [_selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedCheckInTime, setSelectedCheckInTime] = useState(null);
  const [selectedCheckOutTime, setSelectedCheckOutTime] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState({
    morning: ["11h00", "11h30", "12h00", "12h30"],
    afternoon: [
      "13h00",
      "13h30",
      "14h00",
      "14h30",
      "15h00",
      "15h30",
      "16h00",
      "16h30",
    ],
  });
  const [limitedAvailability, setLimitedAvailability] = useState(["11h00"]);
  const [unavailableSlots, setUnavailableSlots] = useState(["16h30"]);

  // Add this state variable after other useState declarations
  const [dateSelectionType, setDateSelectionType] = useState("checkIn"); // 'checkIn' or 'checkOut'
  const [timeSelectionType, setTimeSelectionType] = useState("checkIn"); // 'checkIn' or 'checkOut'

  // FAQ state
  const [activeFaq, setActiveFaq] = useState(null);

  // Add the missing state variable for showScrollButton at the top with other state variables
  const [showScrollButton, setShowScrollButton] = useState(false);

  const sectionRefs = {
    amenities: useRef(null),
    homestay: useRef(null),
    faq: useRef(null),
  };

  const navRef = useRef(null);
  const heroRef = useRef(null);
  const horizontalNavRef = useRef(null);
  const detailsSidebarRef = useRef(null);
  const bookingSidebarRef = useRef(null);
  const galleryModalRef = useRef(null);

  // Handle hash links when component mounts
  useEffect(() => {
    // Get the hash from the URL
    const hash = location.hash.replace("#", "");

    // If there's a hash and it corresponds to one of our sections, set it as active
    if (hash && sectionRefs[hash]) {
      setActiveSection(hash);

      // Add a small delay to ensure DOM is fully loaded
      setTimeout(() => {
        // Scroll to the section
        sectionRefs[hash].current?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  }, [location]);

  // Handle horizontal nav menu sticky behavior
  useEffect(() => {
    // Filter homestays on component mount
    filterHomestays(activeCategory);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleScroll = () => {
      if (navRef.current && heroRef.current) {
        // Check if we've scrolled past the hero section
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setIsNavSticky(heroBottom <= 0);
      }

      // Update active section based on scroll position
      if (
        sectionRefs.amenities.current &&
        sectionRefs.homestay.current &&
        sectionRefs.faq.current
      ) {
        const amenitiesTop =
          sectionRefs.amenities.current.getBoundingClientRect().top;
        const homestayTop =
          sectionRefs.homestay.current.getBoundingClientRect().top;
        const faqTop = sectionRefs.faq.current.getBoundingClientRect().top;

        if (faqTop <= 150) {
          setActiveSection("faq");
        } else if (homestayTop <= 150) {
          setActiveSection("homestay");
        } else if (amenitiesTop <= 150) {
          setActiveSection("amenities");
        }
      }

      // Check horizontal nav scroll position for mobile fade effect
      if (horizontalNavRef.current) {
        const isScrolledToEnd =
          horizontalNavRef.current.scrollLeft +
            horizontalNavRef.current.offsetWidth >=
          horizontalNavRef.current.scrollWidth - 10;

        setNavScrolled(isScrolledToEnd);
      }
    };

    // Check if mobile on mount and when window resizes
    checkMobile();
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Filter homestays when category changes
  useEffect(() => {
    filterHomestays(activeCategory);
  }, [activeCategory]);

  // Filter homestays based on selected category
  const filterHomestays = (category) => {
    if (category === "all") {
      setFilteredHomestays(homestayData);
    } else {
      const filtered = homestayData.filter((homestay) =>
        homestay.category.includes(category)
      );
      setFilteredHomestays(filtered);
    }
  };

  // Handle category selection
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  // Scroll to section with URL hash update
  const scrollToSection = (sectionId) => {
    const section = sectionRefs[sectionId];
    if (section && section.current) {
      section.current.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${sectionId}`);
    }
  };

  // Handle touch events for horizontal nav scrolling on mobile
  const handleNavTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleNavTouchMove = (e) => {
    if (!horizontalNavRef.current) return;

    const touchX = e.touches[0].clientX;
    const diff = touchStartX - touchX;
    const scrollLeft = horizontalNavRef.current.scrollLeft;

    if (diff > 5) {
      // Scrolling right
      setNavScrolled(true);
    } else if (diff < -5 && scrollLeft === 0) {
      // Scrolling left and at the beginning
      setNavScrolled(false);
    }
  };

  // Open details sidebar for a homestay
  const openDetailsSidebar = (homestay) => {
    setSelectedHomestay(homestay);
    setShowDetailsSidebar(true);

    // Make sure booking sidebar is closed
    setShowBookingSidebar(false);

    // Prevent background scrolling
    document.body.style.overflow = "hidden";

    // Add a small delay to ensure the sidebar is rendered with the selected homestay
    setTimeout(() => {
      if (detailsSidebarRef.current) {
        detailsSidebarRef.current.scrollTop = 0;
      }
    }, 100);
  };

  // Close details sidebar
  const closeDetailsSidebar = () => {
    setShowDetailsSidebar(false);
    document.body.style.overflow = "auto";
  };

  // Open booking sidebar for a homestay
  const openBookingSidebar = (homestay) => {
    setSelectedHomestay(homestay);
    setShowBookingSidebar(true);
    setShowDetailsSidebar(false);
    document.body.style.overflow = "hidden";
  };

  // Close booking sidebar
  const closeBookingSidebar = () => {
    setShowBookingSidebar(false);
    document.body.style.overflow = "auto";
  };

  // Handle booking form input changes
  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingFormData({
      ...bookingFormData,
      [name]: value,
    });

    // Clear error for this field if it exists
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  // Validate booking form
  const validateForm = () => {
    const errors = {};

    if (!bookingFormData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!bookingFormData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(bookingFormData.email)) {
      errors.email = "Email address is invalid";
    }

    if (!bookingFormData.phone.trim()) {
      errors.phone = "Phone number is required";
    }

    if (!bookingFormData.checkIn) {
      errors.checkIn = "Check-in date is required";
    }

    if (!bookingFormData.checkOut) {
      errors.checkOut = "Check-out date is required";
    } else if (
      bookingFormData.checkIn &&
      new Date(bookingFormData.checkOut) <= new Date(bookingFormData.checkIn)
    ) {
      errors.checkOut = "Check-out date must be after check-in date";
    }

    if (!bookingFormData.guests || bookingFormData.guests < 1) {
      errors.guests = "At least 1 guest is required";
    }

    return errors;
  };

  // Handle booking form submission
  const handleBookingSubmit = async (e) => {
    e.preventDefault();

    // Validate the form
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Format data for submission
      const formattedData = {
        homestay: selectedHomestay?.title,
        price: selectedHomestay?.price,
        location: selectedHomestay?.location,
        host: selectedHomestay?.host,
        checkIn: bookingFormData.checkIn,
        checkOut: bookingFormData.checkOut,
        selectedTime: selectedTime, // Add the selected time to the booking data
        nights: Math.max(
          1,
          Math.ceil(
            (new Date(bookingFormData.checkOut) -
              new Date(bookingFormData.checkIn)) /
              (1000 * 60 * 60 * 24)
          )
        ),
        totalPrice:
          selectedHomestay?.price *
          Math.max(
            1,
            Math.ceil(
              (new Date(bookingFormData.checkOut) -
                new Date(bookingFormData.checkIn)) /
                (1000 * 60 * 60 * 24)
            )
          ),
        ...bookingFormData,
        date: new Date().toISOString(),
      };

      // Save the booking data before reset
      setSuccessBookingData(formattedData);

      // Try to save to booking server
      try {
        // Updated with correct server URL from server.js
        const bookingServerUrl = "https://mussedupin.onrender.com/api/bookings";
        const serverResponse = await fetch(bookingServerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (!serverResponse.ok) {
          throw new Error("Failed to save booking to server");
        }

        console.log("Booking saved to server:", await serverResponse.json());
      } catch (serverError) {
        console.error("Could not save to booking server:", serverError);
        // Fallback if server is unavailable - show success anyway since this is for demo
      }

      // Show success modal even if server call fails (for demonstration purposes)
      setShowBookingSidebar(false);
      setShowSuccessModal(true);

      // Reset form data
      setBookingFormData({
        name: "",
        email: "",
        phone: "",
        checkIn: "",
        checkOut: "",
        guests: 1,
        specialRequests: "",
      });
      setSelectedDate(null);
      setSelectedTime(null);
    } catch (error) {
      console.error("Booking submission error:", error);
      alert("There was an error submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Close success modal
  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    document.body.style.overflow = "auto";
  };

  // Amenities data
  const amenitiesData = [
    {
      id: "information-desk",
      title: "Information Desks",
      description:
        "Two information desks, where visitors can ask any questions to staff members and pick up the museum map. Brochures in 8 languages are available under the Pyramid.",
      image: informationDeskImg,
      icon: "info",
      details: "Our multilingual staff is available from 9am to 7pm daily.",
    },
    {
      id: "cloakroom",
      title: "Cloakroom",
      description:
        "Self-service lockers are available free of charge beneath the Pyramid. Visitors are advised to use the lockers at the entrance. All items placed in the museum lockers must be collected the same day.",
      image: cloakroomImg,
      icon: "hanger",
      details:
        "Free storage for bags up to 55×35×20 cm. Larger items not permitted.",
    },
    {
      id: "equipment",
      title: "Loan of Equipment",
      description:
        "Walking sticks, folding stools, pushchairs, baby carriers, multifunctional rolling chair and wheelchairs are available free of charge from the visitor reception area beneath the Pyramid.",
      image: equipmentImg,
      icon: "stroller",
      details: "Contact our help desk for more information",
    },
    {
      id: "wifi",
      title: "Free Wi-Fi",
      description:
        "The 'Musée Du Pin' network is available under the Pyramid and in the exhibition rooms. The free WiFi connection has one hour limit and can be renewed as many times as needed.",
      image: wifiImg,
      icon: "wifi",
      details: "Connection speed: 50 Mbps",
    },
    {
      id: "toilets",
      title: "Toilets",
      description:
        "Toilets can found in the welcome area under the Pyramid and throughout the museum. There is a baby changing table.",
      image: toiletsImg,
      icon: "toilet",
      details: "All restrooms are accessible to visitors with reduced mobility",
    },
    {
      id: "car-park",
      title: "Car Park",
      description:
        "An underground car park is located at 1 Avenue du Général Lemonnier, from which you can access the museum via the Carrousel entrance. It is especially open 7 days a week from 7am to 11pm.",
      image: parkingImg,
      icon: "parking",
      details:
        "Visitors with disabilities are entitled to a reduced car park rate. This rate can be negotiated at the payment office just before payment.",
    },
    {
      id: "lost-found",
      title: "Lost and Found",
      description:
        "Lost something? If you are still in the museum, head to the Help Desk under the Pyramid and a member of staff should be able to help you.",
      image: lostFoundImg,
      icon: "help",
      details:
        "For items found after your visit, fill out a report form on our website",
    },
    {
      id: "baby-space",
      title: "Baby Space",
      description:
        "The Studio – a special area designed with families in mind, located on the ground floor of the Richelieu wing – has a baby space equipped with a bottle warmer, a microwave oven and a nursing chair.",
      image: babySpaceImg,
      icon: "baby",
      details: "Everything you need for comfort and care with your baby",
    },
  ];

  // Homestay data with expanded information for detailed view
  const homestayData = [
    {
      id: "traditional",
      title: "Traditional Homestay",
      description:
        "Authentic local home with traditional décor and home-cooked meals included.",
      image: traditionalImg,
      price: 120,
      rating: 4.8,
      tags: ["Recommended", "Authentic", "Breakfast Included"],
      category: ["popular", "recommended"],
      location: "5 minutes walk from the museum",
      host: "Marie Dupont",
      roomType: "Private room in traditional house",
      beds: "1 queen bed",
      amenities: [
        "Free Wi-Fi",
        "Breakfast included",
        "Air conditioning",
        "Garden access",
        "Private bathroom",
      ],
      rules: ["No smoking", "No pets", "No parties or events"],
      cancellation: "Free cancellation up to 48 hours before check-in",
      gallery: [traditionalImg, room1, room2, room3],
      reviews: [
        {
          author: "Jean-Pierre",
          rating: 5,
          comment: "Wonderful traditional experience with amazing breakfast!",
        },
        {
          author: "Sarah",
          rating: 4.5,
          comment:
            "Beautiful home and very welcoming host. Highly recommended.",
        },
      ],
    },
    {
      id: "modern",
      title: "Modern Apartment",
      description:
        "Stylish modern apartment with all amenities, located just 10 minutes from the museum.",
      image: modernImg,
      price: 180,
      rating: 4.9,
      tags: ["Top Rated", "Luxury", "Central Location"],
      category: ["popular", "top-rated"],
      location: "10 minutes walk from the museum",
      host: "Thomas Martin",
      roomType: "Entire apartment",
      beds: "1 king bed, 1 sofa bed",
      amenities: [
        "Free Wi-Fi",
        "Full kitchen",
        "Washer/Dryer",
        "Smart TV",
        "Elevator in building",
        "City view",
      ],
      rules: ["No smoking", "Pets allowed", "No parties or events"],
      cancellation: "Free cancellation up to 24 hours before check-in",
      gallery: [modernImg, room4, room1, room2],
      reviews: [
        {
          author: "Lisa",
          rating: 5,
          comment:
            "Beautiful apartment with amazing views! Very clean and modern.",
        },
        {
          author: "David",
          rating: 4.8,
          comment: "Great location and well equipped. Would stay again!",
        },
      ],
    },
    {
      id: "luxury",
      title: "Luxury Villa",
      description:
        "Exquisite villa with private garden, premium services and exceptional views of the city.",
      image: luxuryImg,
      price: 350,
      rating: 5.0,
      tags: ["Premium", "Private", "Full Service"],
      category: ["top-rated", "luxury"],
      location: "15 minutes drive from the museum",
      host: "Philippe Dubois",
      roomType: "Entire villa",
      beds: "2 king beds, 1 queen bed",
      amenities: [
        "Free Wi-Fi",
        "Swimming pool",
        "Full kitchen",
        "Garden",
        "Parking",
        "Daily cleaning service",
        "Concierge",
      ],
      rules: [
        "No smoking inside",
        "No pets",
        "Events allowed with prior approval",
      ],
      cancellation: "Free cancellation up to 7 days before check-in",
      gallery: [luxuryImg, room3, room4, room2],
      reviews: [
        {
          author: "James",
          rating: 5,
          comment: "Absolute luxury! The villa exceeded all our expectations.",
        },
        {
          author: "Sophia",
          rating: 5,
          comment:
            "Exceptional service and beautiful property. Worth every penny!",
        },
      ],
    },
    {
      id: "budget",
      title: "Budget Room",
      description:
        "Comfortable and affordable private room in a shared apartment near public transport.",
      image: budgetImg,
      price: 75,
      rating: 4.5,
      tags: ["Budget-Friendly", "Convenient", "Good Value"],
      category: ["recommended", "budget-friendly"],
      location: "20 minutes by metro from the museum",
      host: "Claire Roux",
      roomType: "Private room in shared apartment",
      beds: "1 double bed",
      amenities: [
        "Free Wi-Fi",
        "Shared bathroom",
        "Shared kitchen",
        "Washing machine",
        "Near metro station",
      ],
      rules: ["No smoking", "No pets", "Quiet after 10pm"],
      cancellation: "Free cancellation up to 24 hours before check-in",
      gallery: [budgetImg, room1, room3, room4],
      reviews: [
        {
          author: "Michael",
          rating: 4.3,
          comment:
            "Great value for money and convenient location near the metro.",
        },
        {
          author: "Anna",
          rating: 4.7,
          comment:
            "Clean and comfortable room. Claire was a very helpful host!",
        },
      ],
    },
  ];

  // FAQ data with more detailed answers
  const faqData = [
    {
      question: "Can I visit the museum for free? Do I have to book tickets?",
      answer:
        "The museum offers free admission to several categories of visitors including those under 18 years old, EU residents under 26, and disabled visitors with a companion. Free entry is also available to everyone on the first Friday of each month from 6 PM (except July and August). We recommend booking a time slot in advance, even for free-admission visitors, especially during peak seasons.",
    },
    {
      question: "How can I buy a ticket at concession price?",
      answer:
        "Concession tickets are available for young adults aged 18-25 from countries outside the EU, holders of the Education Pass, and members of partner organizations. You must present a valid ID or membership card at the entrance. Concession tickets can be purchased online or at the ticket office.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Tickets are non-refundable once purchased. However, in case of museum closure for exceptional reasons, we will offer a refund or an alternative date. For special circumstances, please contact our visitor services at visitor@museedupin.com with your booking reference and reasons for requesting a refund.",
    },
    {
      question: "Which entrance do I use if I have bought tickets online?",
      answer:
        "Visitors with e-tickets can enter through the Pyramid entrance (main entrance) or the Porte des Lions entrance. The Carrousel entrance is reserved for groups and museum pass holders. Your e-ticket includes a QR code that will be scanned at the entrance. We recommend arriving 15 minutes before your reserved time slot.",
    },
    {
      question: "Are prams allowed in the museum?",
      answer:
        "Yes, prams and strollers are allowed in the museum. However, during very busy periods, you may be asked to leave larger strollers at the cloakroom and use baby carriers instead, which are available free of charge. All galleries and exhibition spaces are accessible with strollers via elevators.",
    },
    {
      question: "What items are not allowed in the museum?",
      answer:
        "Items not permitted inside the museum include large bags and suitcases (larger than 55×35×20 cm), tripods, selfie sticks, flash photography equipment, food and drinks (except water bottles), and sharp objects. These items must be left in the cloakroom. We also prohibit touching the artworks, smoking, and using mobile phones in the galleries.",
    },
  ];

  // Render Hero Section
  const renderHero = () => (
    <div className="visitinfo-hero" ref={heroRef}>
      <div className="visitinfo-hero-image-container">
        <img
          src={heroImage}
          alt="Museum interior"
          className="visitinfo-hero-image"
        />
      </div>
      <div className="visitinfo-hero-overlay"></div>
      <div className="visitinfo-hero-content">
        <h1 className="visitinfo-hero-title">
          <TranslatedText>VISITOR AMENITIES</TranslatedText>
        </h1>
        <p className="visitinfo-hero-subtitle">
          <TranslatedText>
            Everything you need for a comfortable visit
          </TranslatedText>
        </p>
      </div>
    </div>
  );

  // Render Navigation Bar
  const renderNavigationBar = () => {
    // Don't render the navigation bar on mobile
    if (isMobile) return null;

    return (
      <>
        <div
          className={`visitinfo-nav-container ${isNavSticky ? "sticky" : ""} ${
            navScrolled ? "scrolled-right" : ""
          }`}
          ref={(el) => {
            navRef.current = el;
            horizontalNavRef.current = el;
          }}
          onTouchStart={handleNavTouchStart}
          onTouchMove={handleNavTouchMove}
        >
          <div className="visitinfo-nav">
            <ul className="visitinfo-nav-list">
              <li
                className={`visitinfo-nav-item ${
                  activeSection === "amenities" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => scrollToSection("amenities")}
                  className="visitinfo-nav-button"
                >
                  <TranslatedText>Visitor Amenities</TranslatedText>
                </button>
                <span className="visitinfo-nav-indicator"></span>
              </li>
              <li
                className={`visitinfo-nav-item ${
                  activeSection === "homestay" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => scrollToSection("homestay")}
                  className="visitinfo-nav-button"
                >
                  <TranslatedText>Homestay Options</TranslatedText>
                </button>
                <span className="visitinfo-nav-indicator"></span>
              </li>
              <li
                className={`visitinfo-nav-item ${
                  activeSection === "faq" ? "active" : ""
                }`}
              >
                <button
                  onClick={() => scrollToSection("faq")}
                  className="visitinfo-nav-button"
                >
                  <TranslatedText>FAQ</TranslatedText>
                </button>
                <span className="visitinfo-nav-indicator"></span>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
      </>
    );
  };

  // Function to create ripple effect on touch
  const createRippleEffect = (event) => {
    const button = event.currentTarget;
    const ripple = document.createElement("span");

    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);

    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.className = "ripple-circle";

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 800);
  };

  // Render Amenities Section
  const renderAmenitiesSection = () => (
    <section
      className="visitinfo-section amenities-section"
      id="amenities"
      ref={sectionRefs.amenities}
      style={{
        background: "linear-gradient(135deg, #0f0f0f, #1a1a1a, #212121)",
        color: "#fff",
        position: "relative",
        padding: isMobile ? "60px 0 50px" : "120px 0 100px",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div className="decorative-lines"></div>
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>
      <div className="decorative-dots-pattern"></div>

      <div
        style={{
          position: "absolute",
          top: isMobile ? "30px" : "60px",
          left: isMobile ? "30px" : "60px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: isMobile ? "0.8rem" : "1rem",
          fontWeight: "600",
          color: "#ff4081",
          letterSpacing: "2px",
          textTransform: "uppercase",
          zIndex: "2",
          textShadow: "0 2px 10px rgba(255,64,129,0.2)",
        }}
      >
        AMENITIES
      </div>
      <div
        className="visitinfo-section-container"
        style={{ position: "relative", zIndex: "2" }}
      >
        <div
          className="visitinfo-section-header"
          style={{
            textAlign: isMobile ? "center" : "left",
            maxWidth: "800px",
            marginBottom: isMobile ? "40px" : "60px",
          }}
        >
          <h2
            className="visitinfo-section-title"
            style={{
              color: "#ffffff",
              fontSize: isMobile ? "1.8rem" : "3rem",
              fontWeight: "600",
              marginBottom: isMobile ? "15px" : "25px",
              position: "relative",
              paddingBottom: "15px",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
              transition: "transform 0.5s ease",
            }}
          >
            <span>
              <TranslatedText>Comfort and convenience</TranslatedText>
            </span>
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: isMobile ? "50%" : "0",
                transform: isMobile ? "translateX(-50%)" : "none",
                width: "80px",
                height: "3px",
                background:
                  "linear-gradient(to right, #00d1b2, rgba(0,209,178,0.5))",
                borderRadius: "3px",
                transition: "width 0.3s ease",
              }}
              className="title-underline"
            ></span>
          </h2>
          <p
            className="visitinfo-section-description"
            style={{
              color: "#cccccc",
              fontSize: isMobile ? "0.95rem" : "1.1rem",
              lineHeight: "1.7",
              fontWeight: "300",
              maxWidth: "700px",
              opacity: "0.9",
              transition: "opacity 0.5s ease",
            }}
          >
            <TranslatedText>
              The museum offers a range of services to ensure optimal visiting
              conditions. Staff members are at hand throughout the museum to
              provide up-to-date information on the museum and its activities.
            </TranslatedText>
          </p>
        </div>

        <div className="amenities-container">
          {amenitiesData.map((amenity, index) => (
            <div
              className={`amenity-card desktop-enhanced ${
                index % 3 === 0 ? "wide" : ""
              }`}
              key={amenity.id}
              style={{
                animationDelay: `${index * 0.1}s`,
                background: `linear-gradient(135deg, ${
                  index % 4 === 0
                    ? "#1E2A3B, #152231"
                    : index % 4 === 1
                    ? "#2A1E3B, #231522"
                    : index % 4 === 2
                    ? "#3B1E2A, #311522"
                    : "#1E3B2A, #152315"
                })`,
                borderLeft: `3px solid ${
                  index % 4 === 0
                    ? "#00d1b2"
                    : index % 4 === 1
                    ? "#7c4dff"
                    : index % 4 === 2
                    ? "#ff4081"
                    : "#00e676"
                }`,
              }}
            >
              <div className="amenity-content-wrapper">
                <div className="amenity-icon-container">
                  <div
                    className="amenity-icon"
                    style={{
                      color:
                        index % 4 === 0
                          ? "#00d1b2"
                          : index % 4 === 1
                          ? "#7c4dff"
                          : index % 4 === 2
                          ? "#ff4081"
                          : "#00e676",
                    }}
                  >
                    {renderIcon(amenity.icon)}
                  </div>
                  <div className="amenity-icon-backdrop"></div>
                </div>
                <div className="amenity-card-content">
                  <h3 className="amenity-title">
                    <TranslatedText>{amenity.title}</TranslatedText>
                  </h3>
                  <p className="amenity-description">
                    <TranslatedText>{amenity.description}</TranslatedText>
                  </p>
                  <div className="amenity-card-details">
                    <TranslatedText>{amenity.details}</TranslatedText>
                  </div>
                </div>
              </div>
              <div className="amenity-card-decorations">
                <div className="decoration-circle"></div>
                <div className="decoration-line"></div>
                <div className="decoration-dots"></div>
              </div>
              <div className="amenity-card-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Render Homestay Section
  const renderHomestaySection = () => (
    <section
      className="visitinfo-section homestay-section"
      id="homestay"
      ref={sectionRefs.homestay}
      style={{
        background: "linear-gradient(to bottom, #f8fafc, #f1f5f9)",
        padding: "120px 0 100px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "40px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "1rem",
          fontWeight: "600",
          color: "#0f172a",
          letterSpacing: "2px",
          textTransform: "uppercase",
          zIndex: "2",
          opacity: "0.7",
        }}
      >
        ACCOMMODATIONS
      </div>

      {/* Decorative elements */}
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>
      <div className="decorative-square"></div>
      <div className="decorative-dot"></div>

      <div
        className="visitinfo-section-container"
        style={{ position: "relative", zIndex: "2" }}
      >
        <div
          className="visitinfo-section-header"
          style={{
            marginBottom: "60px",
            textAlign: "left",
            maxWidth: "800px",
          }}
        >
          <h2
            className="visitinfo-section-title modern"
            style={{
              fontSize: "3.5rem",
              fontFamily:
                "'Mythical-Prince', 'LouvreSerif', Georgia, 'Times New Roman', serif",
              color: "#0f172a",
              position: "relative",
              paddingBottom: "20px",
              fontWeight: "700",
              lineHeight: "1.2",
              marginBottom: "30px",
            }}
          >
            <span>
              <TranslatedText>
                Experience local living near the museum
              </TranslatedText>
            </span>
            <span className="title-accent"></span>
          </h2>
          <p
            className="visitinfo-section-description"
            style={{
              fontSize: "1.2rem",
              color: "#64748b",
              maxWidth: "700px",
              lineHeight: "1.8",
              fontWeight: "300",
            }}
          >
            <TranslatedText>
              Immerse yourself in the local culture with our carefully selected
              homestay options near the museum. Experience authentic hospitality
              in these artfully designed spaces.
            </TranslatedText>
          </p>
        </div>

        <div className="homestay-categories-wrapper">
          <div
            className="homestay-categories"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "15px",
              marginBottom: "50px",
              justifyContent: "flex-start",
            }}
          >
            <div
              className={`homestay-category ${
                activeCategory === "all" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("all")}
            >
              <TranslatedText>All Options</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "popular" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("popular")}
            >
              <TranslatedText>Popular Choices</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "top-rated" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("top-rated")}
            >
              <TranslatedText>Top Rated</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "recommended" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("recommended")}
            >
              <TranslatedText>Recommended</TranslatedText>
            </div>
            <div
              className={`homestay-category ${
                activeCategory === "budget-friendly" ? "active" : ""
              }`}
              onClick={() => handleCategoryChange("budget-friendly")}
            >
              <TranslatedText>Budget Friendly</TranslatedText>
            </div>
          </div>
        </div>

        <div className="homestay-grid modern">
          {filteredHomestays.map((homestay) => (
            <div className="homestay-card modern" key={homestay.id}>
              <div className="homestay-card-image">
                <img src={homestay.image} alt={homestay.title} />
                {homestay.tags.map(
                  (tag, index) =>
                    index < 1 && (
                      <div className="homestay-card-tag" key={index}>
                        <TranslatedText>{tag}</TranslatedText>
                      </div>
                    )
                )}
              </div>
              <div className="homestay-card-content">
                <h3 className="homestay-card-title">
                  <TranslatedText>{homestay.title}</TranslatedText>
                </h3>
                <p className="homestay-card-description">
                  <TranslatedText>{homestay.description}</TranslatedText>
                </p>
                <div className="homestay-card-location">
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                      fill="currentColor"
                    />
                  </svg>
                  <span>
                    <TranslatedText>{homestay.location}</TranslatedText>
                  </span>
                </div>
                <div className="homestay-card-footer">
                  <div className="homestay-card-price">
                    <span className="price-value">${homestay.price}</span>
                    <span className="price-unit">
                      <TranslatedText>per night</TranslatedText>
                    </span>
                  </div>
                  <div className="homestay-card-actions">
                    <button
                      className="btn-view"
                      onClick={() => openDetailsSidebar(homestay)}
                    >
                      <TranslatedText>View Details</TranslatedText>
                    </button>
                    <button
                      className="btn-book"
                      onClick={() => openBookingSidebar(homestay)}
                    >
                      <TranslatedText>Book Now</TranslatedText>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Render FAQ Section
  const renderFAQSection = () => (
    <section
      className="visitinfo-section faq-section"
      id="faq"
      ref={sectionRefs.faq}
    >
      <div className="decorative-circle large"></div>
      <div className="decorative-circle medium"></div>

      <div className="faq-container">
        <div className="faq-header">
          <h2
            className="faq-title"
            style={{
              fontFamily:
                "'Mythical-Prince', 'LouvreSerif', Georgia, 'Times New Roman', serif",
            }}
          >
            <span>
              <TranslatedText>Frequently asked questions</TranslatedText>
            </span>
          </h2>
          <p className="faq-subtitle">
            <TranslatedText>Answers from the Musée Du Pin.</TranslatedText>
          </p>
        </div>

        <div className="faq-list">
          {faqData.map((faq, index) => (
            <div
              className={`faq-item ${activeFaq === index ? "active" : ""}`}
              key={index}
              style={{ "--animation-order": index }}
            >
              <div className="faq-highlight"></div>
              <div className="faq-question" onClick={() => toggleFaq(index)}>
                <span>
                  <TranslatedText>{faq.question}</TranslatedText>
                </span>
              </div>
              <div className="faq-answer">
                <p>
                  <TranslatedText>{faq.answer}</TranslatedText>
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="faq-footer">
          <h3 className="faq-footer-title">
            <TranslatedText>Didn't find your answer?</TranslatedText>
          </h3>
          <p className="faq-footer-text">
            <TranslatedText>
              Contact our support team for more information.
            </TranslatedText>
          </p>
          <button className="contact-btn">
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                fill="currentColor"
                d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
              />
            </svg>
            <TranslatedText>Contact Us</TranslatedText>
          </button>
        </div>
      </div>

      {renderMobileScrollTop()}
    </section>
  );

  // Render Homestay Details Sidebar
  const renderHomestayDetailsSidebar = () => {
    // Return null if no homestay is selected or if details sidebar is not visible
    if (!selectedHomestay || !showDetailsSidebar) return null;

    // Ensure gallery exists before rendering
    const gallery = selectedHomestay.gallery || [];

    return (
      <div
        className={`homestay-details-sidebar ${
          showDetailsSidebar ? "open" : ""
        }`}
        ref={detailsSidebarRef}
      >
        <div className="details-sidebar-header">
          <button className="close-sidebar" onClick={closeDetailsSidebar}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2>{selectedHomestay.title}</h2>
          <div style={{ width: "32px" }}></div>
        </div>

        <div className="details-sidebar-content">
          <div className="homestay-gallery">
            <div className="gallery-main" onClick={() => openGalleryModal(0)}>
              <img
                src={gallery[0] || selectedHomestay.image}
                alt={selectedHomestay.title}
              />
              <div className="gallery-zoom-icon">
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="gallery-thumbnails">
              {gallery.map((img, index) => (
                <div
                  className={`gallery-thumbnail ${
                    activeImageIndex === index ? "active" : ""
                  }`}
                  key={index}
                  onClick={() => {
                    setActiveImageIndex(index);
                    openGalleryModal(index);
                  }}
                >
                  <img
                    src={img}
                    alt={`${selectedHomestay.title} - image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="homestay-details-info">
            <h3 className="homestay-details-subtitle">
              {selectedHomestay.roomType}
            </h3>

            <p className="homestay-details-description">
              {selectedHomestay.description}
            </p>

            <div className="homestay-details-location">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <span>{selectedHomestay.location}</span>
            </div>

            <div className="homestay-details-host">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>Hosted by</TranslatedText>:{" "}
                {selectedHomestay.host}
              </span>
            </div>

            <div className="homestay-details-beds">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M20 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-5zm-4-2H8V7h8v3z"
                  fill="currentColor"
                />
              </svg>
              <span>{selectedHomestay.beds}</span>
            </div>

            <div className="homestay-details-section">
              <h4>
                <TranslatedText>Amenities</TranslatedText>
              </h4>
              <ul className="amenities-list">
                {selectedHomestay.amenities.map((amenity, index) => (
                  <li key={index}>
                    <svg viewBox="0 0 24 24" width="16" height="16">
                      <path
                        d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                        fill="currentColor"
                      />
                    </svg>
                    <TranslatedText>{amenity}</TranslatedText>
                  </li>
                ))}
              </ul>
            </div>

            <div className="homestay-details-section">
              <h4>
                <TranslatedText>Rules</TranslatedText>
              </h4>
              <ul className="rules-list">
                {selectedHomestay.rules.map((rule, index) => (
                  <li key={index}>
                    <TranslatedText>{rule}</TranslatedText>
                  </li>
                ))}
              </ul>
            </div>

            <div className="homestay-details-section">
              <h4>
                <TranslatedText>Cancellation Policy</TranslatedText>
              </h4>
              <p>
                <TranslatedText>{selectedHomestay.cancellation}</TranslatedText>
              </p>
            </div>
          </div>

          <div className="homestay-booking-card">
            <div className="booking-card-price">
              <span className="price-value">{selectedHomestay.price}</span>
              <span className="price-unit">
                <TranslatedText>per night</TranslatedText>
              </span>
            </div>
            <button
              className="btn-book-now"
              onClick={() => openBookingSidebar(selectedHomestay)}
            >
              <TranslatedText>Book Now</TranslatedText>
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render Booking Sidebar
  const renderBookingSidebar = () => {
    if (!selectedHomestay) return null;

    return (
      <div
        className={`booking-sidebar ${showBookingSidebar ? "open" : ""}`}
        ref={bookingSidebarRef}
        style={{
          position: "fixed",
          top: "0",
          right: showBookingSidebar ? "0" : "-100%",
          width: "450px",
          maxWidth: "100%",
          height: "100vh",
          background: "#fff",
          boxShadow: "-5px 0 30px rgba(0, 0, 0, 0.15)",
          zIndex: "1000",
          transition: "right 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          overflowY: "auto",
          padding: "0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="booking-sidebar-header modern">
          <button className="close-sidebar" onClick={closeBookingSidebar}>
            <svg viewBox="0 0 24 24" width="18" height="18">
              <path
                d="M6 18L18 6M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2
            style={{
              fontFamily:
                "'Mythical-Prince', 'LouvreSerif', Georgia, 'Times New Roman', serif",
            }}
          >
            <TranslatedText>Book Your Stay</TranslatedText>
          </h2>
          <div style={{ width: "32px" }}></div>{" "}
          {/* Empty div for flex spacing */}
        </div>

        <div
          className="booking-sidebar-content"
          style={{
            padding: "0",
            flexGrow: "1",
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          {isSubmitting && (
            <div
              className="sending-status"
              role="progressbar"
              aria-label="Sending booking details"
            ></div>
          )}

          <div className="booking-homestay-info modern">
            <img src={selectedHomestay.image} alt={selectedHomestay.title} />
            <div>
              <h3>
                <TranslatedText>{selectedHomestay.title}</TranslatedText>
              </h3>
              <p className="booking-homestay-location">
                <svg viewBox="0 0 24 24" width="14" height="14">
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                    fill="currentColor"
                  />
                </svg>
                {selectedHomestay.location}
              </p>
              <p className="booking-homestay-price">
                <span className="price-value">${selectedHomestay.price}</span>
                <span className="price-unit">
                  <TranslatedText>per night</TranslatedText>
                </span>
              </p>
            </div>
          </div>

          <form className="booking-form modern" onSubmit={handleBookingSubmit}>
            {/* Include the date and time picker UI */}
            {updateBookingForm()}

            <div className={`form-group ${formErrors.name ? "has-error" : ""}`}>
              <label htmlFor="name">
                <TranslatedText>Full Name</TranslatedText>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={bookingFormData.name}
                onChange={handleBookingInputChange}
                placeholder="Enter your full name"
              />
              {formErrors.name && (
                <div className="error-message">{formErrors.name}</div>
              )}
            </div>

            <div
              className={`form-group ${formErrors.email ? "has-error" : ""}`}
            >
              <label htmlFor="email">
                <TranslatedText>Email</TranslatedText>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={bookingFormData.email}
                onChange={handleBookingInputChange}
                placeholder="Enter your email address"
              />
              {formErrors.email && (
                <div className="error-message">{formErrors.email}</div>
              )}
            </div>

            <div
              className={`form-group ${formErrors.phone ? "has-error" : ""}`}
            >
              <label htmlFor="phone">
                <TranslatedText>Phone Number</TranslatedText>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={bookingFormData.phone}
                onChange={handleBookingInputChange}
                placeholder="Enter your phone number"
              />
              {formErrors.phone && (
                <div className="error-message">{formErrors.phone}</div>
              )}
            </div>

            <div
              className={`form-group ${formErrors.guests ? "has-error" : ""}`}
            >
              <label htmlFor="guests">
                <TranslatedText>Number of Guests</TranslatedText>
              </label>
              <input
                type="number"
                id="guests"
                name="guests"
                value={bookingFormData.guests}
                onChange={handleBookingInputChange}
                min="1"
                max="10"
              />
              {formErrors.guests && (
                <div className="error-message">{formErrors.guests}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="specialRequests">
                <TranslatedText>Special Requests</TranslatedText>
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={bookingFormData.specialRequests}
                onChange={handleBookingInputChange}
                placeholder="Any special requests or requirements?"
                rows="3"
              ></textarea>
            </div>

            <div className="booking-summary modern">
              <div className="summary-row">
                <span>
                  <TranslatedText>Price per night</TranslatedText>
                </span>
                <span>${selectedHomestay.price}</span>
              </div>

              {bookingFormData.checkIn && bookingFormData.checkOut && (
                <>
                  <div className="summary-row">
                    <span>
                      <TranslatedText>Number of nights</TranslatedText>
                    </span>
                    <span>
                      {Math.max(
                        1,
                        Math.ceil(
                          (new Date(bookingFormData.checkOut) -
                            new Date(bookingFormData.checkIn)) /
                            (1000 * 60 * 60 * 24)
                        )
                      )}
                    </span>
                  </div>

                  <div className="summary-row total">
                    <span>
                      <TranslatedText>Total</TranslatedText>
                    </span>
                    <span>
                      $
                      {selectedHomestay.price *
                        Math.max(
                          1,
                          Math.ceil(
                            (new Date(bookingFormData.checkOut) -
                              new Date(bookingFormData.checkIn)) /
                              (1000 * 60 * 60 * 24)
                          )
                        )}
                    </span>
                  </div>
                </>
              )}
            </div>

            <button
              type="submit"
              className="btn-submit-booking modern"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>
                    <TranslatedText>Processing...</TranslatedText>
                  </span>
                </>
              ) : (
                <TranslatedText>Complete Booking</TranslatedText>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  };

  // Render Success Modal
  const renderSuccessModal = () => {
    if (!successBookingData || !showSuccessModal) return null;

    // Use the saved data from successBookingData instead of recalculating
    const totalPrice = successBookingData.totalPrice || 0;

    return (
      <div
        className={`booking-success-modal ${showSuccessModal ? "open" : ""}`}
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(5px)",
          display: showSuccessModal ? "flex" : "none",
          justifyContent: "center",
          alignItems: "center",
          zIndex: "2000",
          padding: "20px",
        }}
      >
        <div
          className="success-modal-content"
          style={{
            background: "#fff",
            borderRadius: "15px",
            padding: "40px",
            maxWidth: "500px",
            width: "100%",
            textAlign: "center",
            position: "relative",
            boxShadow: "0 15px 50px rgba(0, 0, 0, 0.2)",
            animation: showSuccessModal
              ? "modalFadeIn 0.5s ease forwards"
              : "none",
            overflow: "hidden",
          }}
        >
          <div
            className="success-icon"
            style={{
              margin: "0 auto 30px",
              width: "80px",
              height: "80px",
              background: "linear-gradient(135deg, #1e3a8a, #3b82f6)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
            }}
          >
            <svg viewBox="0 0 24 24" width="40" height="40">
              <path
                d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
                fill="#fff"
              />
            </svg>
          </div>

          <h2
            className="success-title"
            style={{
              color: "#1e293b",
              fontSize: "1.8rem",
              fontWeight: "700",
              margin: "0 0 20px",
            }}
          >
            <TranslatedText>Booking Successful!</TranslatedText>
          </h2>

          <div
            className="success-animation"
            style={{
              position: "absolute",
              top: "-50px",
              left: "0",
              width: "100%",
              height: "100%",
              zIndex: "-1",
              overflow: "hidden",
            }}
          >
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="confetti-piece"
                style={{
                  position: "absolute",
                  width: `${Math.random() * 20 + 10}px`,
                  height: `${Math.random() * 10 + 6}px`,
                  background: `${
                    ["#1e3a8a", "#2563eb", "#3b82f6", "#bfdbfe", "#f8fafc"][
                      Math.floor(Math.random() * 5)
                    ]
                  }`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random(),
                  borderRadius: "5px",
                  animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                  transform: `rotate(${Math.random() * 360}deg)`,
                }}
              ></div>
            ))}
          </div>

          <p
            className="success-message"
            style={{
              color: "#64748b",
              fontSize: "1.1rem",
              lineHeight: "1.5",
              margin: "0 0 30px",
            }}
          >
            <TranslatedText>
              Thank you for your booking. We've sent a confirmation to your
              email. The host will contact you shortly with further details.
            </TranslatedText>
          </p>

          <div
            className="success-details"
            style={{
              background: "rgba(59, 130, 246, 0.05)",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "30px",
              border: "1px solid rgba(59, 130, 246, 0.1)",
            }}
          >
            <div
              className="success-detail-item"
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 0 15px",
                color: "#475569",
                fontSize: "1rem",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ marginRight: "10px", color: "#2563eb" }}
              >
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>Host</TranslatedText>: {successBookingData.host}
              </span>
            </div>

            <div
              className="success-detail-item"
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 0 15px",
                color: "#475569",
                fontSize: "1rem",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ marginRight: "10px", color: "#2563eb" }}
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>{successBookingData.location}</TranslatedText>
              </span>
            </div>

            <div
              className="success-detail-item"
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0 0 15px",
                color: "#475569",
                fontSize: "1rem",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ marginRight: "10px", color: "#2563eb" }}
              >
                <path
                  d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7v-5z"
                  fill="currentColor"
                />
              </svg>
              <span>
                {new Date(successBookingData.checkIn).toLocaleDateString()} -{" "}
                {new Date(successBookingData.checkOut).toLocaleDateString()}
                <span
                  style={{
                    marginLeft: "5px",
                    color: "#94a3b8",
                    fontWeight: "500",
                  }}
                >
                  ({successBookingData.nights} nights)
                </span>
              </span>
            </div>

            <div
              className="success-detail-item"
              style={{
                display: "flex",
                alignItems: "center",
                margin: "0",
                color: "#1e293b",
                fontSize: "1.1rem",
                fontWeight: "600",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ marginRight: "10px", color: "#2563eb" }}
              >
                <path
                  d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>Total</TranslatedText>:{" "}
                <span style={{ fontWeight: "700", color: "#1e3a8a" }}>
                  ${totalPrice}
                </span>
              </span>
            </div>
          </div>

          <button
            className="btn-close-success"
            onClick={closeSuccessModal}
            style={{
              background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
              border: "none",
              color: "#fff",
              padding: "12px 25px",
              borderRadius: "30px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "translateY(-2px)";
              e.target.style.boxShadow = "0 6px 20px rgba(0, 114, 255, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 4px 15px rgba(0, 114, 255, 0.3)";
            }}
          >
            <TranslatedText>Close</TranslatedText>
          </button>
        </div>
      </div>
    );
  };

  // Helper function to render icons
  const renderIcon = (icon) => {
    const commonAttributes = {
      width: isMobile ? "30" : "32",
      height: isMobile ? "30" : "32",
      fill: "none",
      stroke: "#00d1b2",
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
    };

    switch (icon) {
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        );
      case "hanger":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M12 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"></path>
            <path d="M12 8v3l-8 9h16l-8-9V8"></path>
          </svg>
        );
      case "stroller":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <circle cx="8" cy="18" r="2"></circle>
            <circle cx="16" cy="18" r="2"></circle>
            <path d="M8 18h8l4-12H8"></path>
            <path d="M6 10h12"></path>
          </svg>
        );
      case "wifi":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
            <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
            <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
            <line x1="12" y1="20" x2="12.01" y2="20"></line>
          </svg>
        );
      case "toilet":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...commonAttributes}
          >
            <path d="M6 4h12v4H6z"></path>
            <path d="M6 8h12v8a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z"></path>
            <path d="M10 8v8"></path>
            <path d="M14 8v8"></path>
          </svg>
        );
      case "parking":
        return <FaCar size={isMobile ? 28 : 32} color="currentColor" />;
      case "help":
        return <FaSearch size={isMobile ? 28 : 32} color="currentColor" />;
      case "baby":
        return <FaBaby size={isMobile ? 28 : 32} color="currentColor" />;
      case "amenities":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        );
      case "homestay":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9" />
            <path d="M9 22V12h6v10M2 10.6L12 2l10 8.6" />
          </svg>
        );
      case "faq":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        );
      default:
        return null;
    }
  };

  // Add keyframes for animations
  useEffect(() => {
    // Create style element for animations
    const styleEl = document.createElement("style");

    // Add keyframes
    styleEl.innerHTML = `
      @keyframes modalFadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      @keyframes fall {
        0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(1000px) rotate(360deg); opacity: 0; }
      }
      
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

    // Append to head
    document.head.appendChild(styleEl);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  // Handle gallery image click
  const openGalleryModal = (index) => {
    setActiveImageIndex(index);
    setShowGalleryModal(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  // Close gallery modal
  const closeGalleryModal = () => {
    setShowGalleryModal(false);
    document.body.style.overflow = "auto";
  };

  // Navigate to next image
  const nextImage = () => {
    if (!selectedHomestay) return;
    setActiveImageIndex((prevIndex) =>
      prevIndex === selectedHomestay.gallery.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Navigate to previous image
  const prevImage = () => {
    if (!selectedHomestay) return;
    setActiveImageIndex((prevIndex) =>
      prevIndex === 0 ? selectedHomestay.gallery.length - 1 : prevIndex - 1
    );
  };

  // Handle key press events for gallery navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!showGalleryModal) return;

      switch (e.key) {
        case "Escape":
          closeGalleryModal();
          break;
        case "ArrowRight":
          nextImage();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [showGalleryModal]);

  // Render Gallery Modal
  const renderGalleryModal = () => {
    if (!selectedHomestay || !showGalleryModal) return null;

    return (
      <div
        className={`gallery-modal ${showGalleryModal ? "open" : ""}`}
        ref={galleryModalRef}
      >
        <button className="gallery-close-btn" onClick={closeGalleryModal}>
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="gallery-image-container">
          <button className="gallery-nav-btn prev" onClick={prevImage}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <img
            src={selectedHomestay.gallery[activeImageIndex]}
            alt={`${selectedHomestay.title} - image ${activeImageIndex + 1}`}
          />

          <button className="gallery-nav-btn next" onClick={nextImage}>
            <svg viewBox="0 0 24 24" width="24" height="24">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="gallery-thumbnails-row">
          {selectedHomestay.gallery.map((img, idx) => (
            <div
              key={idx}
              className={`gallery-thumbnail ${
                activeImageIndex === idx ? "active" : ""
              }`}
              onClick={() => setActiveImageIndex(idx)}
            >
              <img
                src={img}
                alt={`${selectedHomestay.title} - thumbnail ${idx + 1}`}
              />
            </div>
          ))}
        </div>

        <div className="gallery-counter">
          {activeImageIndex + 1} / {selectedHomestay.gallery.length}
        </div>
      </div>
    );
  };

  // Handle date selection
  const handleDateSelection = (date) => {
    // Create a date without timezone issues by setting it at noon
    const localDate = new Date(date);
    localDate.setHours(12, 0, 0, 0);

    // Format date as YYYY-MM-DD ensuring we use local date
    const formattedDate = `${localDate.getFullYear()}-${String(
      localDate.getMonth() + 1
    ).padStart(2, "0")}-${String(localDate.getDate()).padStart(2, "0")}`;

    if (dateSelectionType === "checkIn") {
      setBookingFormData({
        ...bookingFormData,
        checkIn: formattedDate,
      });
      setSelectedDate(localDate);

      // Show time picker
      setShowDatePicker(false);
      setShowTimePicker(true);
      setTimeSelectionType("checkIn");
      fetchAvailableTimeSlots(localDate);
    } else {
      // This is checkOut date selection
      const checkInDate = bookingFormData.checkIn
        ? new Date(bookingFormData.checkIn)
        : null;

      if (checkInDate && localDate < checkInDate) {
        setFormErrors({
          ...formErrors,
          checkOut: "Check-out date must be after check-in date",
        });
        return;
      }

      setBookingFormData({
        ...bookingFormData,
        checkOut: formattedDate,
      });

      // Show time picker for checkout
      setShowDatePicker(false);
      setShowTimePicker(true);
      setTimeSelectionType("checkOut");
      fetchAvailableTimeSlots(localDate);
    }
  };

  // Handle time selection
  const handleTimeSelection = (time) => {
    if (timeSelectionType === "checkIn") {
      // Store the selected check-in time
      setSelectedCheckInTime(time);
      setSelectedTime(time); // For backward compatibility

      // After selecting check-in time, move to check-out date selection
      setShowTimePicker(false);
      setShowDatePicker(true);
      setDateSelectionType("checkOut");
    } else {
      // Store the selected check-out time
      setSelectedCheckOutTime(time);
      setSelectedTime(time); // For backward compatibility

      // After selecting check-out time, we're done with date/time selection
      setShowTimePicker(false);

      // Reset selection types for future selections
      setDateSelectionType("checkIn");
      setTimeSelectionType("checkIn");
    }
  };

  // Fetch available time slots from the API
  const fetchAvailableTimeSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await fetch(
        `https://mussedupin.onrender.com/api/available-slots?date=${formattedDate}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setAvailableTimeSlots(data.data.slots);
          setLimitedAvailability(data.data.limitedAvailability);
          setUnavailableSlots(data.data.unavailable);
        }
      }
    } catch (error) {
      console.error("Failed to fetch available time slots:", error);
      // Fallback to default slots if API fails
    }
  };

  // Navigate to previous month
  const prevMonth = () => {
    const previousMonth = new Date(currentMonth);
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    setCurrentMonth(previousMonth);
  };

  // Navigate to next month
  const nextMonth = () => {
    const nextMonth = new Date(currentMonth);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentMonth(nextMonth);
  };

  // Format month name
  const formatMonth = (date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const days = [];
    const firstDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    );
    const lastDay = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    );

    // Calculate offset for first day of month
    const startOffset = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Adjust for Monday start

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Add days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        day
      );
      const isPast = date < today;
      const isTodayDate = date.getTime() === today.getTime();

      // Check if date matches check-in or check-out date
      const checkInDate = bookingFormData.checkIn
        ? new Date(bookingFormData.checkIn)
        : null;
      checkInDate && checkInDate.setHours(0, 0, 0, 0);

      const checkOutDate = bookingFormData.checkOut
        ? new Date(bookingFormData.checkOut)
        : null;
      checkOutDate && checkOutDate.setHours(0, 0, 0, 0);

      const isCheckIn = checkInDate && date.getTime() === checkInDate.getTime();
      const isCheckOut =
        checkOutDate && date.getTime() === checkOutDate.getTime();

      // Check if date is between check-in and check-out (for highlighting the range)
      const isInRange =
        checkInDate &&
        checkOutDate &&
        date > checkInDate &&
        date < checkOutDate;

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day 
            ${isPast ? "past" : ""} 
            ${isTodayDate ? "today" : ""} 
            ${isCheckIn ? "check-in" : ""} 
            ${isCheckOut ? "check-out" : ""} 
            ${isInRange ? "in-range" : ""}`}
          onClick={() => !isPast && handleDateSelection(date)}
        >
          {day}
          {isCheckIn && <span className="date-label">In</span>}
          {isCheckOut && <span className="date-label">Out</span>}
        </div>
      );
    }

    return days;
  };

  // Render time slots
  const renderTimeSlots = () => {
    return (
      <div className="time-selector">
        <h2 className="time-selector-title">
          {timeSelectionType === "checkIn"
            ? "Select check-in time"
            : "Select check-out time"}
        </h2>

        {timeSelectionType === "checkOut" && bookingFormData.checkIn && (
          <div className="selected-checkin-info">
            <span>Check-in: </span>
            <strong>
              {new Date(bookingFormData.checkIn).toLocaleDateString()}{" "}
              {selectedCheckInTime}
            </strong>
          </div>
        )}

        <div className="time-availability-legend">
          <span className="limited-availability-indicator"></span>
          <span>Last available tickets</span>
        </div>

        <div className="time-slots-container">
          <div className="time-period">
            <h3 className="time-period-title">Morning</h3>
            <div className="time-slots">
              {availableTimeSlots.morning.map((time) => (
                <div
                  key={time}
                  className={`time-slot ${
                    (timeSelectionType === "checkIn" &&
                      selectedCheckInTime === time) ||
                    (timeSelectionType === "checkOut" &&
                      selectedCheckOutTime === time)
                      ? "selected"
                      : ""
                  } 
                    ${limitedAvailability.includes(time) ? "limited" : ""} 
                    ${unavailableSlots.includes(time) ? "disabled" : ""}`}
                  onClick={() =>
                    !unavailableSlots.includes(time) &&
                    handleTimeSelection(time)
                  }
                >
                  {time}
                  {limitedAvailability.includes(time) && (
                    <span className="limited-indicator"></span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="time-period">
            <h3 className="time-period-title">Afternoon</h3>
            <div className="time-slots">
              {availableTimeSlots.afternoon.map((time) => (
                <div
                  key={time}
                  className={`time-slot ${
                    (timeSelectionType === "checkIn" &&
                      selectedCheckInTime === time) ||
                    (timeSelectionType === "checkOut" &&
                      selectedCheckOutTime === time)
                      ? "selected"
                      : ""
                  } 
                    ${limitedAvailability.includes(time) ? "limited" : ""} 
                    ${unavailableSlots.includes(time) ? "disabled" : ""}`}
                  onClick={() =>
                    !unavailableSlots.includes(time) &&
                    handleTimeSelection(time)
                  }
                >
                  {time}
                  {limitedAvailability.includes(time) && (
                    <span className="limited-indicator"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render Date Picker
  const renderDatePicker = () => {
    return (
      <div className="date-picker-container">
        <h2 className="date-picker-title">
          {dateSelectionType === "checkIn"
            ? "Select check-in date"
            : "Select check-out date"}
        </h2>

        {dateSelectionType === "checkOut" && bookingFormData.checkIn && (
          <div className="selected-checkin-info">
            <span>Check-in date: </span>
            <strong>
              {new Date(bookingFormData.checkIn).toLocaleDateString()}
            </strong>
          </div>
        )}

        <div className="date-picker-calendar">
          <div className="calendar-header">
            <button className="month-nav prev" onClick={prevMonth}>
              <span>&lt;</span>
            </button>
            <div className="current-month">{formatMonth(currentMonth)}</div>
            <button className="month-nav next" onClick={nextMonth}>
              <span>&gt;</span>
            </button>
          </div>

          <div className="calendar-weekdays">
            <div className="weekday">MON</div>
            <div className="weekday">TUES</div>
            <div className="weekday">WED</div>
            <div className="weekday">THURS</div>
            <div className="weekday">FRI</div>
            <div className="weekday">SAT</div>
            <div className="weekday">SUN</div>
          </div>

          <div className="calendar-days-grid">{renderCalendarDays()}</div>
        </div>
      </div>
    );
  };

  // Update the booking form to include the new date and time picker components
  const updateBookingForm = () => {
    // Update booking form code to include the new date and time picker UI
    return (
      <div className="booking-date-time-container">
        {showDatePicker && renderDatePicker()}
        {showTimePicker && renderTimeSlots()}

        {!showDatePicker && !showTimePicker && (
          <div className="booking-date-time-summary">
            {/* Check-in info */}
            {bookingFormData.checkIn && selectedCheckInTime && (
              <div className="summary-item">
                <span className="summary-label">Check-in:</span>
                <span className="summary-value">
                  {new Date(bookingFormData.checkIn).toLocaleDateString()}{" "}
                  {selectedCheckInTime}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setShowDatePicker(true);
                    setDateSelectionType("checkIn");
                  }}
                >
                  Edit
                </button>
              </div>
            )}

            {/* Check-out info */}
            {bookingFormData.checkOut && selectedCheckOutTime && (
              <div className="summary-item">
                <span className="summary-label">Check-out:</span>
                <span className="summary-value">
                  {new Date(bookingFormData.checkOut).toLocaleDateString()}{" "}
                  {selectedCheckOutTime}
                </span>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setShowDatePicker(true);
                    setDateSelectionType("checkOut");
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        )}

        {!showDatePicker &&
          !showTimePicker &&
          (!bookingFormData.checkIn ||
            !selectedCheckInTime ||
            !bookingFormData.checkOut ||
            !selectedCheckOutTime) && (
            <button
              className="select-date-time-btn"
              onClick={() => {
                setShowDatePicker(true);
                setDateSelectionType("checkIn");
              }}
            >
              Select Dates & Times
            </button>
          )}
      </div>
    );
  };

  // Add scroll to top button for mobile
  const renderMobileScrollTop = () => {
    // Don't render if we're not on mobile, not scrolled enough, or not in standalone mode
    if (!isMobile || !showScrollButton) return null;

    // Check if we're rendering inside the App component where ScrollToTopButton is already used
    const isStandaloneMode = !document.querySelector(".app");

    // Only render in standalone mode
    if (!isStandaloneMode) return null;

    return (
      <button
        className={`mobile-scroll-top visible`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
            fill="currentColor"
          />
        </svg>
      </button>
    );
  };

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  // Add improved bottom navbar implementation with icons
  const renderBottomNavbar = () => {
    if (!isMobile) return null;

    return (
      <nav className={`mobile-bottom-nav ${isScrollingDown ? "hidden" : ""}`}>
        <ul className="mobile-nav-list">
          <li
            className={`mobile-button-item ${
              activeSection === "amenities" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("amenities");
              }}
            >
              <span className="mobile-nav-icon">{renderIcon("amenities")}</span>
              <span className="mobile-nav-label">
                <TranslatedText>Amenities</TranslatedText>
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "homestay" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("homestay");
              }}
            >
              <span className="mobile-nav-icon">{renderIcon("homestay")}</span>
              <span className="mobile-nav-label">
                <TranslatedText>Homestay</TranslatedText>
              </span>
            </button>
          </li>
          <li
            className={`mobile-button-item ${
              activeSection === "faq" ? "active" : ""
            }`}
          >
            <button
              className="mobile-nav-button ripple-effect"
              onClick={(e) => {
                createRippleEffect(e);
                scrollToSection("faq");
              }}
            >
              <span className="mobile-nav-icon">{renderIcon("faq")}</span>
              <span className="mobile-nav-label">
                <TranslatedText>FAQ</TranslatedText>
              </span>
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  // Add tracking for scroll direction for hiding navbar on scroll down
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const lastScrollTop = useRef(0);

  // Enhance handleScroll to track scroll direction for hiding navbar
  const handleScroll = () => {
    const st = window.pageYOffset || document.documentElement.scrollTop;
    setIsScrollingDown(st > lastScrollTop.current && st > 200);
    lastScrollTop.current = st <= 0 ? 0 : st;

    // Existing scroll logic from before
    const scrollPosition = window.scrollY;

    if (scrollPosition > 300) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }

    // Check which section is in view
    const sectionsToCheck = ["amenities", "homestay", "faq"];

    for (const sectionId of sectionsToCheck) {
      const section = sectionRefs[sectionId]?.current;
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(sectionId);
          break;
        }
      }
    }
  };

  // Add the scroll event listener to use our handleScroll function
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`visitinfo-page ${isMobile ? "mobile-view" : ""}`}>
      {/* Hero Section */}
      {renderHero()}

      {/* Horizontal Navigation */}
      {renderNavigationBar()}

      {/* Amenities Section */}
      {renderAmenitiesSection()}

      {/* Homestay Section */}
      {renderHomestaySection()}

      {/* FAQ Section */}
      {renderFAQSection()}

      {/* Homestay Details Sidebar */}
      {renderHomestayDetailsSidebar()}

      {/* Booking Sidebar */}
      {renderBookingSidebar()}

      {/* Success Modal */}
      {renderSuccessModal()}

      {/* Gallery Modal */}
      {renderGalleryModal()}

      {/* Scroll to top button for mobile */}
      {renderMobileScrollTop()}

      {/* Mobile Bottom Navigation */}
      {renderBottomNavbar()}
    </div>
  );
};

export default VisitInfo;
