import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { getAllFoods } from "../api/foodApi";
import FoodCard from "../components/FoodCard";

import "./Category.css";

function Category({ onAddToCart }) {
    const location = useLocation();

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const category = location.pathname
        .replace("/", "")
        .toLowerCase();

    const categoryConfig = {
        veg: {
            title: "Veg Foods",
            subtitle: "Fresh and delicious vegetarian dishes",
            icon: "🥗",
            type: "Veg",
            color: "green",
            background: "/images/bg-photos/veg-bg.jpg"
        },

        "non-veg": {
            title: "Non-Veg Foods",
            subtitle: "Delicious chicken, meat and seafood dishes",
            icon: "🍗",
            type: "Non-Veg",
            color: "red",
            background: "/images/bg-photos/non-veg-bg.jpg"
        },

        desserts: {
            title: "Desserts",
            subtitle: "Sweet treats to satisfy your cravings",
            icon: "🍰",
            category: "Desserts",
            color: "pink",
            background: "/images/bg-photos/desserts-bg.jpg"
        },

        "soft-drinks": {
            title: "Soft Drinks",
            subtitle: "Refreshing drinks to cool you down",
            icon: "🥤",
            category: "Soft Drinks",
            color: "blue",
            background: "/images/bg-photos/softdrinks-bg.avif"
        }
    };

    const currentCategory = categoryConfig[category];

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getAllFoods();

                setFoods(data);
            } catch (error) {
                console.error("Error fetching category foods:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    const filteredFoods = useMemo(() => {
        if (!currentCategory) {
            return [];
        }

        if (currentCategory.type) {
            return foods.filter(
                (food) =>
                    food.type?.toLowerCase() ===
                    currentCategory.type.toLowerCase()
            );
        }

        if (currentCategory.category) {
            return foods.filter(
                (food) =>
                    food.category?.toLowerCase() ===
                    currentCategory.category.toLowerCase()
            );
        }

        return [];
    }, [foods, currentCategory]);

    if (!currentCategory) {
        return (
            <main className="category-page">
                <div className="category-not-found">
                    <div className="not-found-icon">😕</div>

                    <h1>Category Not Found</h1>

                    <p>
                        Sorry, we couldn't find this food category.
                    </p>

                    <Link
                        to="/"
                        className="back-home-button"
                    >
                        ← Back to Home
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="category-page">
            <section
                className={`category-hero ${currentCategory.color}`}
                style={{
                    backgroundImage: `url("${currentCategory.background}")`
                }}
            >
                <div className="category-hero-overlay"></div>

                <div className="category-hero-content">
                    <span className="category-small-label">
                        FOODHUB MENU
                    </span>

                    <div className="category-title-row">
                        <span className="category-big-icon">
                            {currentCategory.icon}
                        </span>

                        <h1>{currentCategory.title}</h1>
                    </div>

                    <p>{currentCategory.subtitle}</p>

                    <div className="category-breadcrumb">
                        <Link to="/">Home</Link>

                        <span>/</span>

                        <strong>{currentCategory.title}</strong>
                    </div>
                </div>
            </section>

            <section className="category-content">
                <div className="category-content-header">
                    <div>
                        <span className="section-label">
                            EXPLORE MENU
                        </span>

                        <h2>{currentCategory.title}</h2>

                        <p>
                            {filteredFoods.length}
                            {filteredFoods.length === 1
                                ? " delicious item"
                                : " delicious items"}{" "}
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

                {loading && (
                    <div className="empty-category">
                        <div>⏳</div>
                        <h3>Loading food items...</h3>
                        <p>Please wait while we load the menu.</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="empty-category">
                        <div>⚠️</div>
                        <h3>Unable to load food items</h3>
                        <p>{error}</p>

                        <Link
                            to="/login"
                            className="back-home-button"
                        >
                            Login Again
                        </Link>
                    </div>
                )}

                {!loading && !error && filteredFoods.length > 0 && (
                    <div className="category-food-grid">
                        {filteredFoods.map((food) => (
                            <FoodCard
                                key={food.id}
                                food={food}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                )}

                {!loading &&
                    !error &&
                    filteredFoods.length === 0 && (
                        <div className="empty-category">
                            <div>🍽️</div>

                            <h3>No food items available</h3>

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