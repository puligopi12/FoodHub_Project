import "./Home.css";
import { getAllFoods } from "../api/foodApi";

import { Link, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react"; 
import FoodCard from "../components/FoodCard";
import FoodCarousel from "../components/FoodCarousel";

function Home({ onAddToCart }) {

  const navigate = useNavigate();
   const [foods, setFoods] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState("");
   const token = localStorage.getItem("token");
   
   useEffect(() => {
    const fetchFoods = async () => {
        try {
            if (!token) {
                setError("Please log in to view food items.");
                return;
            }

            const data = await getAllFoods(token);

            setFoods(data);
        } catch (error) {
            console.error("Error fetching foods:", error);
            setError("Unable to load food items.");
        } finally {
            setLoading(false);
        }
    };

    fetchFoods();
}, [token]);

 
  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (event) => {

    event.preventDefault();

    const value =
      event.currentTarget.elements.foodSearch.value.trim();


    if (!value) {

      navigate("/search");

      return;
    }


    navigate(
      `/search?q=${encodeURIComponent(value)}`
    );

  };


  // =====================================================
  // LOCATION
  // =====================================================

  const handleLocation = (location) => {

    alert(
      `Selected delivery location: ${location}`
    );

  };




  // =====================================================
  // MAIN CATEGORIES
  // =====================================================

  const categories = [

    {
      name: "Veg",
      emoji: "🥗",
      description: "Fresh vegetarian dishes",
      path: "/veg",
      className: "veg-card"
    },

    {
      name: "Non-Veg",
      emoji: "🍗",
      description: "Delicious chicken & meat",
      path: "/non-veg",
      className: "nonveg-card"
    },

    {
      name: "Desserts",
      emoji: "🍰",
      description: "Cakes, sweets & ice cream",
      path: "/desserts",
      className: "dessert-card"
    },

    {
      name: "Soft Drinks",
      emoji: "🥤",
      description: "Cool & refreshing drinks",
      path: "/soft-drinks",
      className: "drinks-card"
    }

  ];


  // =====================================================
  // LOCATIONS
  // =====================================================

  const cities = [

    "Bangalore",
    "Gurgaon",
    "Hyderabad",
    "Delhi",
    "Mumbai",
    "Pune",
    "Kolkata",
    "Chennai",
    "Ahmedabad",
    "Chandigarh",
    "Jaipur"

  ];


  return (

    <main className="home-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section className="hero-section">


        {/* Decorative background */}

        <div className="hero-circle hero-circle-one"></div>

        <div className="hero-circle hero-circle-two"></div>

        <div className="hero-circle hero-circle-three"></div>


        <div className="hero-food hero-food-one">
          🍕
        </div>

        <div className="hero-food hero-food-two">
          🍔
        </div>

        <div className="hero-food hero-food-three">
          🍜
        </div>


        <div className="hero-content">


          {/* Badge */}

          <div className="hero-badge">

            <span>
              🍴
            </span>

            WELCOME TO FOODHUB

          </div>


          {/* Heading */}

          <h1>

            Discover Your

            <br />

            <span>
              Favorite Food
            </span>

            <span className="hero-heading-icon">
              🍽️
            </span>

          </h1>


          <p className="hero-description">

            Delicious meals, refreshing drinks and tasty
            desserts delivered right to your doorstep.

          </p>


          {/* =================================================
              SEARCH
          ================================================= */}

          <form
            className="food-search-bar"
            onSubmit={handleSearch}
          >


            {/* LOCATION */}

            <button
              type="button"
              className="location-box"
              onClick={() =>
                handleLocation("Hyderabad")
              }
            >

              <span className="location-icon">
                📍
              </span>


              <span className="location-content">

                <small>
                  DELIVERY LOCATION
                </small>

                <strong>
                  Hyderabad
                </strong>

              </span>


              <span className="location-arrow">
                ▼
              </span>

            </button>


            {/* SEARCH INPUT */}

            <div className="search-input-box">

              <span className="search-icon">
                🔍
              </span>


              <input
                type="text"
                name="foodSearch"
                placeholder="Search for food, restaurant or dish..."
                autoComplete="off"
              />


              <button
                type="submit"
                className="search-action"
              >

                Search

              </button>

            </div>

          </form>


          {/* FEATURES */}

          <div className="hero-features">

            <span>
              <b>⚡</b>
              Fast Delivery
            </span>

            <span>
              <b>🍕</b>
              Fresh Food
            </span>

            <span>
              <b>⭐</b>
              Top Rated
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          FOOD CAROUSEL
      ================================================= */}

      <section className="food-carousel-section">

        <FoodCarousel />

      </section>


 


      {/* =================================================
          CATEGORY SECTION
      ================================================= */}

      <section className="categories-section">


        <div className="section-header">

          <span className="section-label">
            FOODHUB
          </span>

          <h2>
            Explore Categories
          </h2>

          <p>
            Choose your favorite food category
          </p>

        </div>


        <div className="category-container">


          {categories.map((category) => (

            <Link
              key={category.name}
              to={category.path}
              className={`category-card ${category.className}`}
            >

              <div className="category-card-top">

                <div className="category-icon">

                  {category.emoji}

                </div>


                <span className="category-arrow">
                  →
                </span>

              </div>


              <h3>
                {category.name}
              </h3>


              <p>
                {category.description}
              </p>


              <span className="category-link">
                Explore →
              </span>

            </Link>

          ))}

        </div>

      </section>


      {/* =================================================
          POPULAR FOODS
      ================================================= */}

      <section className="popular-section">


        <div className="section-header popular-header">

          <span className="section-label">
            OUR MENU
          </span>

          <h2>
            Popular Foods
          </h2>

          <p>
            Customer favorites you don't want to miss
          </p>

        </div>


        <div className="food-container">

  {loading && (
    <p>Loading food items...</p>
  )}

  {error && (
    <p>{error}</p>
  )}

  {!loading && !error && foods.length === 0 && (
    <p>No food items available.</p>
  )}

  {!loading && !error && foods.map((food) => (

    <FoodCard
      key={food.id}
      food={food}
      onAddToCart={onAddToCart}
    />

  ))}

</div>

      </section>


      {/* =================================================
          APP DOWNLOAD BANNER
      ================================================= */}

      <section className="app-banner-section">


        <div className="app-banner">


          {/* LEFT */}

          <div className="app-banner-content">


            <div className="app-brand">

              <span className="app-brand-icon">
                🍔
              </span>

              <span>
                FoodHub
              </span>

            </div>


            <h2>
              Get the FoodHub App now!
            </h2>


            <p>
              Get exclusive offers and enjoy a faster
              ordering experience.
            </p>


            <div className="app-buttons">


              <button
                type="button"
                className="store-button"
              >

                <span className="store-icon">
                  
                </span>

                <span className="store-text">

                  <small>
                    Download on the
                  </small>

                  <strong>
                    App Store
                  </strong>

                </span>

              </button>


              <button
                type="button"
                className="store-button"
              >

                <span className="store-icon">
                  ▶
                </span>

                <span className="store-text">

                  <small>
                    GET IT ON
                  </small>

                  <strong>
                    Google Play
                  </strong>

                </span>

              </button>


            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="app-banner-visual">


            <div className="floating-food food-one">
              🍕
            </div>

            <div className="floating-food food-two">
              🍔
            </div>

            <div className="floating-food food-three">
              🥤
            </div>


            {/* PHONE */}

            <div className="app-phone">


              <div className="phone-camera">
              </div>


              <div className="phone-screen">


                <div className="phone-logo">
                  🍔
                </div>


                <h3>
                  FoodHub
                </h3>


                <p>
                  Delicious food
                  <br />
                  at your doorstep
                </p>


                <div className="qr-code">

                  <div className="qr-pattern">

                    <span>
                      ▣
                    </span>

                    <span>
                      ▦
                    </span>

                    <span>
                      ▣
                    </span>

                  </div>

                </div>


                <strong>
                  Scan to download
                </strong>


              </div>

            </div>


          </div>

        </div>

      </section>


      {/* =================================================
          CITIES
      ================================================= */}

      <section className="locations-section">


        <div className="locations-container">


          <h2>
            Cities with food delivery
          </h2>


          <div className="location-grid">


            {cities.map((city) => (

              <button
                key={city}
                type="button"
                onClick={() =>
                  handleLocation(city)
                }
              >

                Order food online in {city}

              </button>

            ))}


            <button
              type="button"
              className="show-more-location"
            >

              Show More

              <span>
                ↓
              </span>

            </button>


          </div>

        </div>

      </section>


      {/* =================================================
          CTA
      ================================================= */}

      <section className="home-cta">


        <div className="cta-content">


          <div className="cta-icon">
            🍔
          </div>


          <span className="cta-label">
            FOODHUB
          </span>


          <h2>
            Hungry? Let's fix that.
          </h2>


          <p>
            Find something delicious and order it today.
          </p>


          <Link
            to="/search"
            className="cta-button"
          >
            Start Exploring →
          </Link>


        </div>

      </section>


      {/* =================================================
          FOODHUB FOOTER
      ================================================= */}

      <footer className="foodhub-home-footer">


        {/* ===============================================
            FOOTER MAIN
        =============================================== */}

        <div className="foodhub-footer-container">


          {/* BRAND */}

          <div className="foodhub-footer-brand">

            <Link
              to="/"
              className="foodhub-footer-logo"
            >

              <span className="foodhub-footer-logo-icon">
                🍔
              </span>

              <span>
                FoodHub
              </span>

            </Link>


            <p className="foodhub-footer-copyright">
              © 2026 FoodHub Limited
            </p>


            <p className="foodhub-footer-description">

              Delicious food, refreshing drinks and
              tasty desserts delivered right to your
              doorstep.

            </p>

          </div>


          {/* COMPANY */}

          <div className="foodhub-footer-column">

            <h3>
              Company
            </h3>


            <Link to="/">
              About Us
            </Link>

            <Link to="/">
              FoodHub Corporate
            </Link>

            <Link to="/">
              Careers
            </Link>

            <Link to="/">
              Team
            </Link>

            <Link to="/">
              FoodHub One
            </Link>

            <Link to="/">
              FoodHub Instamart
            </Link>

          </div>


          {/* CONTACT + LEGAL */}

          <div className="foodhub-footer-column">

            <h3>
              Contact us
            </h3>


            <Link to="/">
              Help & Support
            </Link>

            <Link to="/">
              Partner With Us
            </Link>

            <Link to="/">
              Ride With Us
            </Link>


            <h3 className="foodhub-footer-sub-heading">
              Legal
            </h3>


            <Link to="/">
              Terms & Conditions
            </Link>

            <Link to="/">
              Cookie Policy
            </Link>

            <Link to="/">
              Privacy Policy
            </Link>

          </div>


          {/* AVAILABLE CITIES */}

          <div className="foodhub-footer-column">

            <h3>
              Available in:
            </h3>


            {cities
              .slice(0, 6)
              .map((city) => (

                <button
                  key={city}
                  type="button"
                  className="foodhub-footer-city"
                  onClick={() =>
                    handleLocation(city)
                  }
                >
                  {city}
                </button>

              ))}


            <select
              className="foodhub-city-select"
              defaultValue="685"
              aria-label="Available cities"
            >

              <option value="685">
                685 cities
              </option>

              <option value="500">
                500+ cities
              </option>

              <option value="300">
                300+ cities
              </option>

            </select>

          </div>


          {/* LIFE + SOCIAL */}

          <div className="foodhub-footer-column">

            <h3>
              Life at FoodHub
            </h3>


            <Link to="/">
              Explore With FoodHub
            </Link>

            <Link to="/">
              FoodHub News
            </Link>

            <Link to="/">
              Snackables
            </Link>


            <h3 className="foodhub-footer-sub-heading">
              Social Links
            </h3>


            <div className="foodhub-social-links">

              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                in
              </a>


              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                ◎
              </a>


              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                f
              </a>


              <a
                href="https://www.pinterest.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                p
              </a>


              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X"
              >
                𝕏
              </a>

            </div>

          </div>

        </div>


        {/* ===============================================
            FOOTER DIVIDER
        =============================================== */}

        <div className="foodhub-footer-divider"></div>


        {/* ===============================================
            DOWNLOAD APP
        =============================================== */}

        <div className="foodhub-footer-download">

          <h2>
            For better experience, download the FoodHub app now
          </h2>


          <div className="foodhub-footer-store-buttons">


            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="foodhub-store-button"
            >

              <span className="foodhub-store-icon">
                
              </span>


              <span className="foodhub-store-text">

                <small>
                  Download on the
                </small>

                <strong>
                  App Store
                </strong>

              </span>

            </a>


            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="foodhub-store-button"
            >

              <span className="foodhub-store-icon play">
                ▶
              </span>


              <span className="foodhub-store-text">

                <small>
                  GET IT ON
                </small>

                <strong>
                  Google Play
                </strong>

              </span>

            </a>

          </div>

        </div>

      </footer>



    </main>

  );

}


export default Home;