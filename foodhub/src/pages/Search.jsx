import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import FoodCard from "../components/FoodCard";
import foods from "../data/foods";

import "./Search.css";


function Search({ onAddToCart }) {

  const [searchParams] = useSearchParams();

  const initialQuery =
    searchParams.get("q") ||
    searchParams.get("type") ||
    "";

  const [searchText, setSearchText] =
    useState(initialQuery);


  const filteredFoods = useMemo(() => {

    const query =
      searchText.trim().toLowerCase();


    // =================================
    // NO SEARCH
    // Show only first 8 foods
    // =================================

    if (!query) {

      return foods.slice(0, 8);

    }


    // =================================
    // SEARCH
    // =================================

    return foods.filter((food) => {

      return (

        food.name
          ?.toLowerCase()
          .includes(query)

        ||

        food.category
          ?.toLowerCase()
          .includes(query)

        ||

        food.type
          ?.toLowerCase()
          .includes(query)

        ||

        food.description
          ?.toLowerCase()
          .includes(query)

      );

    });

  }, [searchText]);


  const handleSubmit = (event) => {

    event.preventDefault();

  };


  return (

    <main className="search-page">

      {/* =================================
          HERO
      ================================= */}

      <section className="search-hero">

        <div className="search-hero-overlay"></div>

        <div className="search-hero-content">

          <span className="search-label">
            FOOD DISCOVERY
          </span>

          <h1>
            Find Your Favorite Food
          </h1>

          <p>
            Search for dishes, categories and delicious meals.
          </p>


          <form
            className="search-box"
            onSubmit={handleSubmit}
          >

            <span className="search-box-icon">
              🔍
            </span>

            <input
              type="text"
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              placeholder="Search biryani, pizza, cake..."
            />

            <button type="submit">
              Search
            </button>

          </form>

        </div>

      </section>


      {/* =================================
          RESULTS
      ================================= */}

      <section className="search-results">

        <div className="search-results-header">

          <div>

            <span className="search-small-label">
              RESULTS
            </span>

            <h2>
              {searchText.trim()
                ? `Results for "${searchText}"`
                : "Popular Foods"
              }
            </h2>

            <p>
              {filteredFoods.length} food items found
            </p>

          </div>

        </div>


        {filteredFoods.length > 0 ? (

          <div className="search-food-grid">

            {filteredFoods.map((food) => (

              <FoodCard
                key={food.id}
                food={food}
                onAddToCart={onAddToCart}
              />

            ))}

          </div>

        ) : (

          <div className="no-results">

            <div>
              🍽️
            </div>

            <h3>
              No food found
            </h3>

            <p>
              Try searching for biryani, pizza, burger or cake.
            </p>

          </div>

        )}

      </section>

    </main>

  );

}


export default Search;