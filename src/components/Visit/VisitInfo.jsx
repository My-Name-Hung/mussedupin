import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import TranslatedText from "../TranslatedText";
import "./VisitInfo.css";

// Images - we'll import placeholder images from assets
import informationDeskImg from "../../assets/home/collections/ANewLook.jpg";
import cloakroomImg from "../../assets/home/collections/beautes.jpg";
import equipmentImg from "../../assets/home/collections/couture.jpg";
import heroImage from "../../assets/home/collections/louvre-sunset.jpg";
import babySpaceImg from "../../assets/home/collections/mamluks.jpg";
import wifiImg from "../../assets/home/collections/Masterpieces.jpg";
import toiletsImg from "../../assets/home/collections/Nature.jpg";
import parkingImg from "../../assets/home/collections/portrait.jpg";
import lostFoundImg from "../../assets/home/collections/TheMetAu.jpg";

// Homestay images
import modernImg from "../../assets/home/collections/ANewLook.jpg";
import luxuryImg from "../../assets/home/collections/couture.jpg";
import budgetImg from "../../assets/home/collections/mamluks.jpg";
import traditionalImg from "../../assets/home/collections/Nature.jpg";

// Additional homestay images for galleries
import room1 from "../../assets/home/collections/beautes.jpg";
import room2 from "../../assets/home/collections/Masterpieces.jpg";
import room3 from "../../assets/home/collections/portrait.jpg";
import room4 from "../../assets/home/collections/TheMetAu.jpg";

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
  // Add new state variables for gallery
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Add new states for date and time pickers
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
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

  // Handle navigation click
  const handleNavClick = (section) => {
    setActiveSection(section);
    sectionRefs[section].current?.scrollIntoView({ behavior: "smooth" });

    // Update URL with hash without reloading page
    const url = new URL(window.location);
    url.hash = section;
    window.history.pushState({}, "", url);
  };

  // Handle touch events for horizontal nav scrolling on mobile
  const handleNavTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleNavTouchMove = (e) => {
    if (!horizontalNavRef.current) return;

    const touchDiff = touchStartX - e.touches[0].clientX;
    horizontalNavRef.current.scrollLeft += touchDiff;
    setTouchStartX(e.touches[0].clientX);
  };

  // Open details sidebar for a homestay
  const openDetailsSidebar = (homestay) => {
    setSelectedHomestay(homestay);
    setShowDetailsSidebar(true);
    document.body.style.overflow = "hidden"; // Prevent background scrolling
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

      // Send booking data using EmailJS
      const emailJsServiceId = "service_6qhnk5e";
      const emailJsTemplateId = "template_9ikkc6p";
      const emailJsUserId = "aP9PpovCBMGc2o6t0";

      // Prepare data for customer confirmation email
      const customerEmailData = {
        service_id: emailJsServiceId,
        template_id: emailJsTemplateId,
        user_id: emailJsUserId,
        template_params: {
          to_email: formattedData.email,
          to_name: formattedData.name,
          homestay_name: formattedData.homestay,
          check_in_date: new Date(formattedData.checkIn).toLocaleDateString(),
          check_out_date: new Date(formattedData.checkOut).toLocaleDateString(),
          total_price: formattedData.totalPrice,
          nights: formattedData.nights,
          guests: formattedData.guests,
        },
      };

      // Prepare data for admin notification email
      const adminEmailData = {
        service_id: emailJsServiceId,
        template_id: emailJsTemplateId,
        user_id: emailJsUserId,
        template_params: {
          to_email: "thanhhung11112002@gmail.com", // Admin email
          to_name: "Admin",
          customer_name: formattedData.name,
          customer_email: formattedData.email,
          customer_phone: formattedData.phone,
          homestay_name: formattedData.homestay,
          check_in_date: new Date(formattedData.checkIn).toLocaleDateString(),
          check_out_date: new Date(formattedData.checkOut).toLocaleDateString(),
          total_price: formattedData.totalPrice,
          special_requests: formattedData.specialRequests || "None",
        },
      };

      // Send emails via EmailJS API
      const emailJsApiUrl = "https://api.emailjs.com/api/v1.0/email/send";

      // Send both emails in parallel
      const [customerResponse, adminResponse] = await Promise.all([
        fetch(emailJsApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(customerEmailData),
        }),
        fetch(emailJsApiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminEmailData),
        }),
      ]);

      if (!customerResponse.ok || !adminResponse.ok) {
        throw new Error(`Failed to send email notifications`);
      }

      console.log("Booking submitted:", formattedData);

      // Try to save to booking server if available
      try {
        const bookingServerUrl =
          "https://booking-server-c5wq.onrender.com/api/bookings";
        const serverResponse = await fetch(bookingServerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (serverResponse.ok) {
          console.log("Booking saved to server:", await serverResponse.json());
        }
      } catch (serverError) {
        // Continue even if server saving fails
        console.warn("Could not save to booking server:", serverError);
      }

      // Show success modal
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
    } catch (error) {
      console.error("Booking submission error:", error);
      // Handle error (would implement proper error handling)
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
        "The 'Louvre_Wifi_Gratuit' network is available under the Pyramid and in the exhibition rooms. The free WiFi connection has one hour limit and can be renewed as many times as needed.",
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
  const renderNavigationBar = () => (
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
              onClick={() => handleNavClick("amenities")}
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
              onClick={() => handleNavClick("homestay")}
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
              onClick={() => handleNavClick("faq")}
              className="visitinfo-nav-button"
            >
              <TranslatedText>FAQ</TranslatedText>
            </button>
            <span className="visitinfo-nav-indicator"></span>
          </li>
        </ul>
      </div>
    </div>
  );

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
        padding: "120px 0 100px",
        overflow: "hidden",
      }}
    >
      {/* Decorative elements */}
      <div
        style={{
          position: "absolute",
          bottom: "-50px",
          right: "-50px",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,209,178,0.05) 0%, rgba(0,209,178,0) 70%)",
          zIndex: "1",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "-100px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          border: "1px solid rgba(0,209,178,0.1)",
          zIndex: "1",
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          top: "60px",
          left: "60px",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "1rem",
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
            textAlign: "left",
            maxWidth: "800px",
            marginBottom: "60px",
          }}
        >
          <h2
            className="visitinfo-section-title"
            style={{
              color: "#ffffff",
              fontSize: "2.5rem",
              fontWeight: "400",
              marginBottom: "25px",
              position: "relative",
              paddingBottom: "15px",
              textShadow: "0 2px 10px rgba(0,0,0,0.3)",
            }}
          >
            <TranslatedText>Comfort and convenience</TranslatedText>
            <span
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "80px",
                height: "2px",
                background:
                  "linear-gradient(to right, #00d1b2, rgba(0,209,178,0.5))",
                borderRadius: "3px",
              }}
            ></span>
          </h2>
          <p
            className="visitinfo-section-description"
            style={{
              color: "#cccccc",
              fontSize: "1.1rem",
              lineHeight: "1.7",
              fontWeight: "300",
            }}
          >
            <TranslatedText>
              The museum offers a range of services to ensure optimal visiting
              conditions. Staff members are at hand throughout the museum to
              provide up-to-date information on the museum and its activities.
            </TranslatedText>
          </p>
        </div>

        <div
          className="amenities-grid"
          style={{
            display: "flex",
            flexWrap: "wrap",
            margin: "50px -15px 20px",
            position: "relative",
          }}
        >
          {amenitiesData.map((amenity, index) => (
            <div
              className="amenity-card"
              key={amenity.id}
              style={{
                background: "linear-gradient(135deg, #252525, #2a2a2a)",
                color: "#ffffff",
                borderLeft: `3px solid ${
                  index % 3 === 0
                    ? "#00d1b2"
                    : index % 3 === 1
                    ? "#00a896"
                    : "#00d1c2"
                }`,
                margin: "15px",
                width: `calc(${
                  index % 5 === 0
                    ? "65%"
                    : index % 5 === 1
                    ? "35%"
                    : index % 5 === 2
                    ? "45%"
                    : index % 5 === 3
                    ? "55%"
                    : "50%"
                } - 30px)`,
                transform: `translateY(${
                  index % 4 === 0
                    ? "-15px"
                    : index % 4 === 1
                    ? "15px"
                    : index % 4 === 2
                    ? "0"
                    : "-8px"
                })`,
                padding: "30px 35px",
                borderRadius: "4px",
                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.25)",
                display: "flex",
                transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translateY(${
                  index % 4 === 0
                    ? "-20px"
                    : index % 4 === 1
                    ? "10px"
                    : index % 4 === 2
                    ? "-5px"
                    : "-13px"
                })`;
                e.currentTarget.style.boxShadow =
                  "0 15px 35px rgba(0, 0, 0, 0.3)";

                // Add icon animation on hover
                const icon =
                  e.currentTarget.querySelector(".amenity-card-icon");
                if (icon) {
                  icon.style.transform = "scale(1.1)";
                  icon.style.filter =
                    "drop-shadow(0 0 8px rgba(0, 209, 178, 0.5))";
                }

                // Add pulse animation to SVG group
                const svgGroup = e.currentTarget.querySelector("svg g");
                if (svgGroup) {
                  svgGroup.style.animation = "pulse 1.5s infinite";
                  // Apply the filter effect
                  const filterNum = (index % 8) + 1;
                  svgGroup.style.filter = `url(#glow${filterNum})`;
                }

                // Animate the background circle
                const bgCircle = e.currentTarget.querySelector(
                  ".amenity-icon-container > div:last-child"
                );
                if (bgCircle) {
                  bgCircle.style.transform = "scale(1.2)";
                  bgCircle.style.background = `radial-gradient(circle, rgba(0,209,178,0.12) 0%, rgba(0,209,178,0) 70%)`;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateY(${
                  index % 4 === 0
                    ? "-15px"
                    : index % 4 === 1
                    ? "15px"
                    : index % 4 === 2
                    ? "0"
                    : "-8px"
                })`;
                e.currentTarget.style.boxShadow =
                  "0 10px 25px rgba(0, 0, 0, 0.25)";

                // Reset icon animation
                const icon =
                  e.currentTarget.querySelector(".amenity-card-icon");
                if (icon) {
                  icon.style.transform = "scale(1)";
                  icon.style.filter = "none";
                }

                // Reset SVG group animation
                const svgGroup = e.currentTarget.querySelector("svg g");
                if (svgGroup) {
                  svgGroup.style.animation = "none";
                  svgGroup.style.filter = "none";
                }

                // Reset background circle
                const bgCircle = e.currentTarget.querySelector(
                  ".amenity-icon-container > div:last-child"
                );
                if (bgCircle) {
                  bgCircle.style.transform = "scale(1)";
                  bgCircle.style.background = `radial-gradient(circle, rgba(0,209,178,0.08) 0%, rgba(0,209,178,0) 70%)`;
                }
              }}
            >
              <div
                className="amenity-icon-container"
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginRight: "25px",
                  flexShrink: "0",
                  position: "relative",
                }}
              >
                <div
                  className="amenity-card-icon"
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    zIndex: "2",
                    transition: "all 0.3s ease",
                    filter: "drop-shadow(0 0 3px rgba(0, 209, 178, 0.2))",
                  }}
                >
                  {renderIcon(amenity.icon)}
                </div>
                <div
                  style={{
                    position: "absolute",
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background:
                      "radial-gradient(circle, rgba(0,209,178,0.08) 0%, rgba(0,209,178,0) 70%)",
                    top: "-10px",
                    left: "-10px",
                    zIndex: "1",
                    transition: "all 0.5s ease",
                  }}
                ></div>
              </div>
              <div
                className="amenity-card-content"
                style={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  zIndex: "2",
                }}
              >
                <h3
                  className="amenity-card-title"
                  style={{
                    color: "#00d1b2",
                    fontSize: "1.2rem",
                    fontWeight: "600",
                    margin: "0 0 14px",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                  }}
                >
                  <TranslatedText>{amenity.title}</TranslatedText>
                </h3>
                <p
                  className="amenity-card-description"
                  style={{
                    color: "#ffffff",
                    fontSize: "0.95rem",
                    lineHeight: "1.6",
                    flex: "1",
                    margin: "0 0 18px",
                  }}
                >
                  <TranslatedText>{amenity.description}</TranslatedText>
                </p>
                <div
                  className="amenity-card-details"
                  style={{
                    color: "#aaaaaa",
                    borderTop: "1px dashed rgba(255,255,255,0.1)",
                    paddingTop: "12px",
                    fontSize: "0.85rem",
                    fontStyle: "italic",
                  }}
                >
                  <TranslatedText>{amenity.details}</TranslatedText>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-50px",
                  right: "-50px",
                  width: "100px",
                  height: "100px",
                  borderRadius: "50%",
                  background: `radial-gradient(circle, rgba(${
                    index % 3 === 0
                      ? "0,209,178"
                      : index % 3 === 1
                      ? "0,168,150"
                      : "0,209,194"
                  },0.03) 0%, rgba(0,209,178,0) 70%)`,
                  zIndex: "1",
                }}
              ></div>
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
              color: "#0f172a",
              position: "relative",
              paddingBottom: "20px",
              fontWeight: "700",
              lineHeight: "1.2",
              marginBottom: "30px",
            }}
          >
            <TranslatedText>
              Experience local living near the museum
            </TranslatedText>
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
      <div className="visitinfo-section-container">
        <div className="visitinfo-section-header">
          <h2 className="visitinfo-section-title">
            <TranslatedText>Frequently asked questions</TranslatedText>
          </h2>
          <p className="visitinfo-section-description">
            <TranslatedText>Answers from the Louvre.</TranslatedText>
          </p>
        </div>

        <div className="faq-accordion">
          {faqData.map((faq, index) => (
            <div className="faq-item" key={index}>
              <details className="faq-details">
                <summary className="faq-question">
                  <TranslatedText>{faq.question}</TranslatedText>
                </summary>
                <div className="faq-answer">
                  <TranslatedText>{faq.answer}</TranslatedText>
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  // Render Homestay Details Sidebar
  const renderHomestayDetailsSidebar = () => {
    if (!selectedHomestay) return null;

    return (
      <div
        className={`homestay-details-sidebar ${
          showDetailsSidebar ? "open" : ""
        }`}
        ref={detailsSidebarRef}
      >
        <div
          className="details-sidebar-header"
          style={{
            position: "sticky",
            top: "0",
            padding: "20px",
            background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: "10",
          }}
        >
          <button
            className="close-sidebar"
            onClick={closeDetailsSidebar}
            style={{
              background: "rgba(255, 255, 255, 0.2)",
              border: "none",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#fff",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.2)";
            }}
          >
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
          <h2
            style={{
              margin: "0",
              fontSize: "1.5rem",
              fontWeight: "600",
              color: "#fff",
            }}
          >
            <TranslatedText>{selectedHomestay.title}</TranslatedText>
          </h2>
          <div style={{ width: "32px" }}></div>
        </div>

        <div className="details-sidebar-content">
          <div className="homestay-gallery">
            <div
              className="gallery-main"
              onClick={() => openGalleryModal(0)}
              style={{ cursor: "pointer" }}
            >
              <img
                src={selectedHomestay.gallery[0]}
                alt={selectedHomestay.title}
              />
              <div
                className="gallery-zoom-icon"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 5,
                  transition: "all 0.3s ease",
                  opacity: 0.7,
                }}
              >
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
              {selectedHomestay.gallery.map((img, index) => (
                <div
                  className="gallery-thumbnail"
                  key={index}
                  onClick={() => openGalleryModal(index)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={img}
                    alt={`${selectedHomestay.title} - image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="homestay-details-info" style={{ padding: "20px" }}>


            <h3
              className="homestay-details-subtitle"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1.2rem",
                fontWeight: "500",
                color: "#1e293b",
                margin: "0 0 15px",
              }}
            >
              <TranslatedText>{selectedHomestay.roomType}</TranslatedText>
            </h3>

            <p
              className="homestay-details-description"
              style={{
                fontFamily: "'Roboto', sans-serif",
                fontSize: "1rem",
                lineHeight: "1.6",
                color: "#64748b",
                margin: "0 0 25px",
              }}
            >
              <TranslatedText>{selectedHomestay.description}</TranslatedText>
            </p>

            <div
              className="homestay-details-location"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
                fontFamily: "'Roboto', sans-serif",
                color: "#64748b",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ color: "#1e3a8a" }}
              >
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                  fill="currentColor"
                />
              </svg>
              <TranslatedText>{selectedHomestay.location}</TranslatedText>
            </div>

            <div
              className="homestay-details-host"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
                fontFamily: "'Roboto', sans-serif",
                color: "#64748b",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ color: "#1e3a8a" }}
              >
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

            <div
              className="homestay-details-beds"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "15px",
                fontFamily: "'Roboto', sans-serif",
                color: "#64748b",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                style={{ color: "#1e3a8a" }}
              >
                <path
                  d="M20 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-5zm-4-2H8V7h8v3z"
                  fill="currentColor"
                />
              </svg>
              <span>
                <TranslatedText>{selectedHomestay.beds}</TranslatedText>
              </span>
            </div>

            <div
              className="homestay-details-section"
              style={{
                marginTop: "30px",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "20px",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#1e3a8a",
                  margin: "0 0 15px",
                }}
              >
                <TranslatedText>Amenities</TranslatedText>
              </h4>
              <ul
                className="amenities-list"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                }}
              >
                {selectedHomestay.amenities.map((amenity, index) => (
                  <li
                    key={index}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "0.95rem",
                      color: "#64748b",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      style={{ color: "#1e3a8a" }}
                    >
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

            <div
              className="homestay-details-section"
              style={{
                marginTop: "30px",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "20px",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#1e3a8a",
                  margin: "0 0 15px",
                }}
              >
                <TranslatedText>Rules</TranslatedText>
              </h4>
              <ul
                className="rules-list"
                style={{
                  listStyle: "none",
                  padding: "0",
                  margin: "0",
                }}
              >
                {selectedHomestay.rules.map((rule, index) => (
                  <li
                    key={index}
                    style={{
                      position: "relative",
                      paddingLeft: "20px",
                      marginBottom: "10px",
                      fontSize: "0.95rem",
                      color: "#64748b",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        left: "0",
                        color: "#1e3a8a",
                        fontSize: "1.2rem",
                      }}
                    >
                      •
                    </span>
                    <TranslatedText>{rule}</TranslatedText>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="homestay-details-section"
              style={{
                marginTop: "30px",
                borderTop: "1px solid #e2e8f0",
                paddingTop: "20px",
              }}
            >
              <h4
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "1.1rem",
                  fontWeight: "600",
                  color: "#1e3a8a",
                  margin: "0 0 15px",
                }}
              >
                <TranslatedText>Cancellation Policy</TranslatedText>
              </h4>
              <p
                style={{
                  margin: "0",
                  fontSize: "0.95rem",
                  color: "#64748b",
                  lineHeight: "1.6",
                }}
              >
                <TranslatedText>{selectedHomestay.cancellation}</TranslatedText>
              </p>
            </div>
          </div>

          <div
            className="homestay-booking-card"
            style={{
              position: "sticky",
              bottom: "0",
              padding: "20px",
              backgroundColor: "#fff",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 -5px 20px rgba(0, 0, 0, 0.05)",
              zIndex: "5",
            }}
          >
            <div
              className="booking-card-price"
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                className="price-value"
                style={{
                  fontSize: "1.4rem",
                  fontWeight: "700",
                  color: "#1e3a8a",
                }}
              >
                ${selectedHomestay.price}
              </span>
              <span
                className="price-unit"
                style={{
                  fontSize: "0.9rem",
                  color: "#64748b",
                }}
              >
                <TranslatedText>per night</TranslatedText>
              </span>
            </div>
            <button
              className="btn-book-now"
              onClick={() => openBookingSidebar(selectedHomestay)}
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
                color: "white",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "1rem",
                fontWeight: "500",
                padding: "12px 25px",
                border: "none",
                borderRadius: "30px",
                cursor: "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 15px rgba(37, 99, 235, 0.3)",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 8px 25px rgba(37, 99, 235, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "0 4px 15px rgba(37, 99, 235, 0.3)";
              }}
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
          <h2>
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
    // Calculate the total price for the booking
    const calculateTotalPrice = () => {
      if (
        !selectedHomestay ||
        !bookingFormData.checkIn ||
        !bookingFormData.checkOut
      )
        return 0;

      const nights = Math.max(
        1,
        Math.ceil(
          (new Date(bookingFormData.checkOut) -
            new Date(bookingFormData.checkIn)) /
            (1000 * 60 * 60 * 24)
        )
      );

      return selectedHomestay.price * nights;
    };

    const totalPrice = calculateTotalPrice();

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
                <TranslatedText>Host</TranslatedText>: {selectedHomestay?.host}
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
                <TranslatedText>{selectedHomestay?.location}</TranslatedText>
              </span>
            </div>

            {bookingFormData.checkIn && bookingFormData.checkOut && (
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
                  {new Date(bookingFormData.checkIn).toLocaleDateString()} -{" "}
                  {new Date(bookingFormData.checkOut).toLocaleDateString()}
                  <span
                    style={{
                      marginLeft: "5px",
                      color: "#94a3b8",
                      fontWeight: "500",
                    }}
                  >
                    (
                    {Math.max(
                      1,
                      Math.ceil(
                        (new Date(bookingFormData.checkOut) -
                          new Date(bookingFormData.checkIn)) /
                          (1000 * 60 * 60 * 24)
                      )
                    )}{" "}
                    nights)
                  </span>
                </span>
              </div>
            )}

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
                <TranslatedText>Total</TranslatedText>: ${totalPrice}
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
      strokeWidth: "1.5",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      style: { transition: "all 0.3s ease" },
    };

    switch (icon) {
      case "info":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="infoGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#36D1DC" />
                <stop offset="100%" stopColor="#5B86E5" />
              </linearGradient>
              <filter id="glow1">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <circle
              cx="12"
              cy="12"
              r="10"
              fill="none"
              stroke="url(#infoGradient)"
              {...commonAttributes}
            />
            <line
              x1="12"
              y1="16"
              x2="12"
              y2="12"
              stroke="url(#infoGradient)"
              strokeWidth="1.8"
              {...commonAttributes}
            />
            <circle cx="12" cy="8" r="1.2" fill="url(#infoGradient)" />
          </svg>
        );
      case "hanger":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="hangerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#FF9966" />
                <stop offset="100%" stopColor="#FF5E62" />
              </linearGradient>
              <filter id="glow2">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <circle
                cx="12"
                cy="4"
                r="2"
                fill="none"
                stroke="url(#hangerGradient)"
                {...commonAttributes}
              />
              <path
                d="M12 6v2l-7 7h14l-7-7V6"
                fill="none"
                stroke="url(#hangerGradient)"
                {...commonAttributes}
              />
              <line
                x1="4"
                y1="20"
                x2="20"
                y2="20"
                stroke="url(#hangerGradient)"
                {...commonAttributes}
              />
            </g>
          </svg>
        );
      case "stroller":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="strollerGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#A770EF" />
                <stop offset="50%" stopColor="#CF8BF3" />
                <stop offset="100%" stopColor="#FDB99B" />
              </linearGradient>
              <filter id="glow3">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <circle
                cx="8"
                cy="18"
                r="2"
                fill="none"
                stroke="url(#strollerGradient)"
                {...commonAttributes}
              />
              <circle
                cx="16"
                cy="18"
                r="2"
                fill="none"
                stroke="url(#strollerGradient)"
                {...commonAttributes}
              />
              <path
                d="M8 12h8l-3-6H8"
                fill="none"
                stroke="url(#strollerGradient)"
                {...commonAttributes}
              />
              <circle cx="9" cy="4" r="1.2" fill="url(#strollerGradient)" />
            </g>
          </svg>
        );
      case "wifi":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="wifiGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#43C6AC" />
                <stop offset="100%" stopColor="#00b3e6" />
              </linearGradient>
              <filter id="glow4">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <path
                d="M5 12.55a11 11 0 0 1 14.08 0"
                fill="none"
                stroke="url(#wifiGradient)"
                {...commonAttributes}
              />
              <path
                d="M1.42 9a16 16 0 0 1 21.16 0"
                fill="none"
                stroke="url(#wifiGradient)"
                {...commonAttributes}
              />
              <path
                d="M8.53 16.11a6 6 0 0 1 6.95 0"
                fill="none"
                stroke="url(#wifiGradient)"
                {...commonAttributes}
              />
              <circle cx="12" cy="20" r="1.2" fill="url(#wifiGradient)" />
            </g>
          </svg>
        );
      case "toilet":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="toiletGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#6a11cb" />
                <stop offset="100%" stopColor="#2575fc" />
              </linearGradient>
              <filter id="glow5">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <path
                d="M6 8h12v4a6 6 0 0 1-6 6v0a6 6 0 0 1-6-6V8z"
                fill="none"
                stroke="url(#toiletGradient)"
                {...commonAttributes}
              />
              <path
                d="M6 4h12v4H6z"
                fill="none"
                stroke="url(#toiletGradient)"
                {...commonAttributes}
              />
              <line
                x1="12"
                y1="18"
                x2="12"
                y2="22"
                stroke="url(#toiletGradient)"
                {...commonAttributes}
              />
            </g>
          </svg>
        );
      case "parking":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="parkingGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#fc4a1a" />
                <stop offset="100%" stopColor="#f7b733" />
              </linearGradient>
              <filter id="glow6">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <rect
                x="4"
                y="4"
                width="16"
                height="16"
                rx="2"
                fill="none"
                stroke="url(#parkingGradient)"
                {...commonAttributes}
              />
              <path
                d="M9 16V8h4a2 2 0 0 1 0 4H9"
                fill="none"
                stroke="url(#parkingGradient)"
                {...commonAttributes}
              />
            </g>
          </svg>
        );
      case "help":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="helpGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#00c9ff" />
                <stop offset="100%" stopColor="#92fe9d" />
              </linearGradient>
              <filter id="glow7">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <path
                d="M10 9a3 3 0 1 1 4 2.83V14"
                fill="none"
                stroke="url(#helpGradient)"
                {...commonAttributes}
              />
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="url(#helpGradient)"
                {...commonAttributes}
              />
              <circle cx="12" cy="17" r="1.2" fill="url(#helpGradient)" />
            </g>
          </svg>
        );
      case "baby":
        return (
          <svg viewBox="0 0 24 24" width="32" height="32">
            <defs>
              <linearGradient
                id="babyGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#ff758c" />
                <stop offset="100%" stopColor="#ff7eb3" />
              </linearGradient>
              <filter id="glow8">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <g>
              <circle
                cx="12"
                cy="6"
                r="3.5"
                fill="none"
                stroke="url(#babyGradient)"
                {...commonAttributes}
              />
              <path
                d="M7 14h10l-5 7-5-7z"
                fill="none"
                stroke="url(#babyGradient)"
                {...commonAttributes}
              />
              <path
                d="M8 10h8"
                stroke="url(#babyGradient)"
                strokeWidth="1.5"
                {...commonAttributes}
              />
            </g>
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
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.9)",
          zIndex: 2000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          padding: "20px",
          transition: "opacity 0.3s ease",
        }}
      >
        <button
          className="gallery-close-btn"
          onClick={closeGalleryModal}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            background: "none",
            border: "none",
            color: "#fff",
            fontSize: "1.5rem",
            cursor: "pointer",
            zIndex: 2010,
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "none";
          }}
        >
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

        <div
          className="gallery-image-container"
          style={{
            position: "relative",
            width: "100%",
            height: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button
            className="gallery-nav-btn prev"
            onClick={prevImage}
            style={{
              position: "absolute",
              left: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              border: "none",
              color: "#fff",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2005,
              transition: "background 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(0, 0, 0, 0.7)";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(0, 0, 0, 0.5)";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
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
            style={{
              maxWidth: "90%",
              maxHeight: "90%",
              objectFit: "contain",
              boxShadow: "0 5px 25px rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
            }}
          />

          <button
            className="gallery-nav-btn next"
            onClick={nextImage}
            style={{
              position: "absolute",
              right: "15px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(0, 0, 0, 0.5)",
              border: "none",
              color: "#fff",
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 2005,
              transition: "background 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(0, 0, 0, 0.7)";
              e.target.style.transform = "translateY(-50%) scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(0, 0, 0, 0.5)";
              e.target.style.transform = "translateY(-50%) scale(1)";
            }}
          >
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

        <div
          className="gallery-thumbnails-row"
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "20px",
            overflowX: "auto",
            padding: "10px 0",
            maxWidth: "90%",
          }}
        >
          {selectedHomestay.gallery.map((img, idx) => (
            <div
              key={idx}
              className={`gallery-thumbnail ${
                activeImageIndex === idx ? "active" : ""
              }`}
              onClick={() => setActiveImageIndex(idx)}
              style={{
                width: "80px",
                height: "60px",
                borderRadius: "4px",
                overflow: "hidden",
                cursor: "pointer",
                opacity: activeImageIndex === idx ? 1 : 0.6,
                border:
                  activeImageIndex === idx
                    ? "2px solid #00695c"
                    : "2px solid transparent",
                transition: "all 0.3s ease",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                if (activeImageIndex !== idx) {
                  e.target.style.opacity = 0.8;
                }
              }}
              onMouseLeave={(e) => {
                if (activeImageIndex !== idx) {
                  e.target.style.opacity = 0.6;
                }
              }}
            >
              <img
                src={img}
                alt={`${selectedHomestay.title} - thumbnail ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </div>

        <div
          className="gallery-counter"
          style={{
            color: "#fff",
            fontSize: "0.9rem",
            marginTop: "15px",
          }}
        >
          {activeImageIndex + 1} / {selectedHomestay.gallery.length}
        </div>
      </div>
    );
  };

  // Handle date selection
  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setBookingFormData({
      ...bookingFormData,
      checkIn: date.toISOString().split("T")[0],
    });
    setShowDatePicker(false);
    setShowTimePicker(true);
  };

  // Handle time selection
  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    setShowTimePicker(false);
  };

  // Get days in month for calendar
  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month
  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigate to previous month
  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  // Navigate to next month
  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  // Format month name
  const formatMonth = (date) => {
    return (
      date.toLocaleString("en-US", { month: "long" }).toUpperCase() +
      " " +
      date.getFullYear()
    );
  };

  // Check if date is in the past
  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  // Check if date is today
  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  // Check if date is selected
  const isSelectedDate = (date) => {
    return (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    );
  };

  // Render calendar days
  const renderCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);

    const days = [];

    // Empty cells for days before the first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Cells for days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isPast = isPastDate(date);
      const isTodayDate = isToday(date);
      const isSelected = isSelectedDate(date);

      days.push(
        <div
          key={`day-${day}`}
          className={`calendar-day ${isPast ? "past" : ""} ${
            isTodayDate ? "today" : ""
          } ${isSelected ? "selected" : ""}`}
          onClick={() => !isPast && handleDateSelection(date)}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  // Render time slots
  const renderTimeSlots = () => {
    return (
      <div className="time-selector">
        <h2 className="time-selector-title">Select a time</h2>

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
                    selectedTime === time ? "selected" : ""
                  } ${limitedAvailability.includes(time) ? "limited" : ""}`}
                  onClick={() => handleTimeSelection(time)}
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
                    selectedTime === time ? "selected" : ""
                  } ${limitedAvailability.includes(time) ? "limited" : ""}`}
                  onClick={() => handleTimeSelection(time)}
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
        <h2 className="date-picker-title">Select a date</h2>
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

        {!showDatePicker && !showTimePicker && selectedDate && selectedTime && (
          <div className="booking-date-time-summary">
            <div className="summary-item">
              <span className="summary-label">Date:</span>
              <span className="summary-value">
                {selectedDate.toLocaleDateString()}
              </span>
              <button
                className="edit-btn"
                onClick={() => setShowDatePicker(true)}
              >
                Edit
              </button>
            </div>
            <div className="summary-item">
              <span className="summary-label">Time:</span>
              <span className="summary-value">{selectedTime}</span>
              <button
                className="edit-btn"
                onClick={() => setShowTimePicker(true)}
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {!showDatePicker &&
          !showTimePicker &&
          (!selectedDate || !selectedTime) && (
            <button
              className="select-date-time-btn"
              onClick={() => setShowDatePicker(true)}
            >
              Select Date & Time
            </button>
          )}
      </div>
    );
  };

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
      {isMobile && (
        <button
          className="mobile-scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"
              fill="#00695c"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default VisitInfo;
