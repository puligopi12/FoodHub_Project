import { useNavigate } from "react-router-dom";
import "./FoodCard.css";

function FoodCard({ food, onAddToCart }) {

    const navigate = useNavigate();

    const handleFoodClick = () => {

        const token = localStorage.getItem("token");

        // -----------------------------------------
        // USER NOT LOGGED IN
        // -----------------------------------------

        if (!token) {

            // Save selected food
            localStorage.setItem(
                "pendingCartItem",
                JSON.stringify(food)
            );

            // Remember where user came from
            localStorage.setItem(
                "returnPath",
                window.location.pathname
            );

            // Go to login
            navigate("/login");

            return;
        }

        // -----------------------------------------
        // USER ALREADY LOGGED IN
        // -----------------------------------------

        if (onAddToCart) {

            onAddToCart(food);

        }

    };


    const handleAddButtonClick = (event) => {

        // Stop card click from firing twice
        event.stopPropagation();

        handleFoodClick();

    };


    return (

        <article
            className="food-card"
            onClick={handleFoodClick}
            role="button"
            tabIndex={0}
            onKeyDown={(event) => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    handleFoodClick();

                }

            }}
        >

            {/* =========================================
                FOOD IMAGE
            ========================================= */}

            <div className="food-image">

                <img
                    src={food.image}
                    alt={food.name}
                    loading="lazy"
                    onError={(event) => {

                        console.error(
                            `Image failed to load: ${food.image}`
                        );

                        event.currentTarget.style.display = "none";

                        event.currentTarget.parentElement.classList.add(
                            "image-error"
                        );

                    }}
                />

                <span className="food-type">

                    {food.type === "Veg"
                        ? "🟢 Veg"
                        : food.type === "Non-Veg"
                        ? "🔴 Non-Veg"
                        : food.type === "Dessert"
                        ? "🍰 Dessert"
                        : food.type === "Soft Drink"
                        ? "🥤 Soft Drink"
                        : food.type}

                </span>

            </div>


            {/* =========================================
                FOOD INFORMATION
            ========================================= */}

            <div className="food-info">

                <h3>
                    {food.name}
                </h3>


                <p className="food-description">

                    {food.description}

                </p>


                <div className="food-meta">

                    <span className="rating">

                        ⭐ {food.rating}

                    </span>

                    <span>

                        ⏱️ {food.deliveryTime}

                    </span>

                </div>


                {/* =====================================
                    PRICE + ADD BUTTON
                ===================================== */}

                <div className="food-bottom">

                    <strong>
                        ₹{food.price}
                    </strong>


                    <button
                        type="button"
                        onClick={handleAddButtonClick}
                    >

                        Add +

                    </button>

                </div>

            </div>

        </article>

    );

}

export default FoodCard;