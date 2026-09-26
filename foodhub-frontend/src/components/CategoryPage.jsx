import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";

import foods from "../data/foods";
import FoodCard from "../components/FoodCard";

import "./Category.css";


function Category({ onAddToCart }) {

  const location = useLocation();

  // Get category from URL
  const category = location.pathname
    .replace("/", "")
    .toLowerCase();


  // =====================================================
  // CATEGORY CONFIGURATION
  // =====================================================

  const categoryConfig = {

    veg: {
      title: "Veg Foods",
      subtitle: "Fresh and delicious vegetarian dishes",
      icon: "🥗",
      type: "Veg",
      theme: "veg",
      background: "/images/bg-photos/veg-bg.jpg"
    },

    "non-veg": {
      title: "Non-Veg Foods",
      subtitle: "Delicious chicken, meat and seafood dishes",
      icon: "🍗",
      type: "Non-Veg",
      theme: "nonveg",
      background: "/images/nonveg-bg.jpg"
    },

    desserts: {
      title: "Desserts",
      subtitle: "Sweet treats to satisfy your cravings",
      icon: "🍰",
      category: "Desserts",
      theme: "desserts",
      background: "/images/desserts-bg.jpg"
    },

    "soft-drinks": {
      title: "Soft Drinks",
      subtitle: "Refreshing drinks to cool you down",
      icon: "🥤",
      category: "Soft Drinks",
      theme: "softdrinks",
      background: "/images/softdrinks-bg.jpg"
    }

  };


  const currentCategory = categoryConfig[category];


  // =====================================================
  // FILTER FOOD ITEMS
  // =====================================================

  const filteredFoods = useMemo(() => {

    if (!currentCategory) {
      return [];
    }


    // Veg / Non-Veg
    if (currentCategory.type) {

      return foods.filter(
        (food) =>
          food.type?.toLowerCase() ===
          currentCategory.type.toLowerCase()
      );

    }


    // Desserts / Soft Drinks
    if (currentCategory.category) {

      return foods.filter(
        (food) =>
          food.category?.toLowerCase() ===
          currentCategory.category.toLowerCase()
      );

    }


    return [];

  }, [currentCategory]);


  // =====================================================
  // CATEGORY NOT FOUND
  // =====================================================

  if (!currentCategory) {

    return (

      <main className="category-page">

        <section className="category-not-found">

          <div className="not-found-icon">
            😕
          </div>

          <h1>
            Category Not Found
          </h1>

          <p>
            Sorry, we couldn't find this food category.
          </p>

          <Link
            to="/"
            className="back-home-button"
          >
            ← Back to Home
          </Link>

        </section>

      </main>

    );

  }


  // =====================================================
  // CATEGORY PAGE
  // =====================================================

  return (

    <main className="category-page">


      {/* =================================================
          HERO
      ================================================= */}

      <section
        className={`category-hero ${currentCategory.theme}`}
        style={{
          "--category-bg": `url("${currentCategory.background}")`
        }}
      >

        {/* Dark overlay */}

        <div className="category-hero-overlay"></div>


        {/* Decorative circles */}

        <div className="hero-circle hero-circle-one"></div>

        <div className="hero-circle hero-circle-two"></div>


        {/* Hero content */}

        <div className="category-hero-content">

          <span className="category-small-label">
            🍽 FOODHUB MENU
          </span>


          <div className="category-title-row">

            <span className="category-big-icon">
              {currentCategory.icon}
            </span>

            <h1>
              {currentCategory.title}
            </h1>

          </div>


          <p>
            {currentCategory.subtitle}
          </p>


          <div className="category-breadcrumb">

            <Link to="/">
              Home
            </Link>

            <span>
              /
            </span>

            <strong>
              {currentCategory.title}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          FOOD SECTION
      ================================================= */}

      <section className="category-content">


        <div className="category-content-header">

          <div>

            <span className="section-label">
              EXPLORE MENU
            </span>

            <h2>
              {currentCategory.title}
            </h2>

            <p>
              {filteredFoods.length} delicious
              {filteredFoods.length === 1
                ? " item"
                : " items"}{" "}
              available
            </p>

          </div>


          <Link
            to="/"
            className="category-back-button"
          >
            ← Back to Home
          </Link>

        </div>


        {/* =================================================
            FOOD CARDS
        ================================================= */}

        {filteredFoods.length > 0 ? (

          <div className="category-food-grid">

            {filteredFoods.map((food) => (

              <FoodCard
                key={food.id}
                food={food}
                onAddToCart={onAddToCart}
              />

            ))}

          </div>

        ) : (

          <div className="empty-category">

            <div className="empty-category-icon">
              🍽️
            </div>

            <h3>
              No food items available
            </h3>

            <p>
              We are adding more delicious items soon.
            </p>

            <Link
              to="/"
              className="back-home-button"
            >
              Explore Home
            </Link>

          </div>

        )}

      </section>

    </main>

  );

}


export default Category;