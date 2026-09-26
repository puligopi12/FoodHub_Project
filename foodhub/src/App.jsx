import { useState, useRef, useEffect } from "react";
import {
    Routes,
    Route,
    useNavigate,
    useLocation,
} from "react-router-dom";

import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Navbar from "./components/Navbar";
import Breadcrumb from "./components/Breadcrumb";
import Home from "./pages/Home";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import LoginPage from "./pages/LoginPage";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Notification from "./components/Notification";


function App() {

    // =========================================
    // LOGIN STATE
    // =========================================

    const [isLoggedIn, setIsLoggedIn] = useState(
        Boolean(localStorage.getItem("token"))
    );


    // =========================================
    // CART STATE
    // Restore cart from localStorage
    // =========================================

    const [cart, setCart] = useState(() => {

        try {

            const savedCart =
                localStorage.getItem("foodhubCart");

            if (savedCart) {

                const parsedCart =
                    JSON.parse(savedCart);

                if (Array.isArray(parsedCart)) {
                    return parsedCart;
                }

            }

        } catch (error) {

            console.error(
                "Unable to restore cart:",
                error
            );

        }

        return [];

    });


    // =========================================
    // SAVE CART WHENEVER CART CHANGES
    // =========================================

    useEffect(() => {

        try {

            localStorage.setItem(
                "foodhubCart",
                JSON.stringify(cart)
            );

        } catch (error) {

            console.error(
                "Unable to save cart:",
                error
            );

        }

    }, [cart]);


    // =========================================
    // NOTIFICATION
    // =========================================

    const [notification, setNotification] =
        useState("");

    const notificationTimer =
        useRef(null);


    // =========================================
    // RETURN PATH
    // =========================================

    const [returnPath, setReturnPath] =
        useState("/");


    const navigate = useNavigate();

    const location = useLocation();


    // =========================================
    // SHOW NOTIFICATION
    // =========================================

    const showNotification = (message) => {

        setNotification(message);

        if (notificationTimer.current) {

            clearTimeout(
                notificationTimer.current
            );

        }

        notificationTimer.current =
            setTimeout(() => {

                setNotification("");

            }, 2500);

    };


    // =========================================
    // ADD TO CART
    // =========================================

    const addToCart = (food) => {

        if (!food || !food.id) {

            console.error(
                "Invalid food item:",
                food
            );

            return;

        }


        const token =
            localStorage.getItem("token");


        // =====================================
        // USER NOT LOGGED IN
        // =====================================

        if (!isLoggedIn || !token) {

            localStorage.setItem(
                "pendingCartItem",
                JSON.stringify(food)
            );


            setReturnPath(
                location.pathname
            );


            localStorage.setItem(
                "returnPath",
                location.pathname
            );


            navigate("/login");

            return;

        }


        // =====================================
        // USER LOGGED IN
        // =====================================

        setCart((previousCart) => {

            const existingItem =
                previousCart.find(
                    (item) =>
                        item.id === food.id
                );


            // Food already exists
            if (existingItem) {

                return previousCart.map(
                    (item) => {

                        if (
                            item.id === food.id
                        ) {

                            return {
                                ...item,
                                quantity:
                                    item.quantity + 1
                            };

                        }

                        return item;

                    }
                );

            }


            // New food
            return [
                ...previousCart,
                {
                    ...food,
                    quantity: 1
                }
            ];

        });


        showNotification(
            `${food.name} has been added to your cart.`
        );

    };


    // =========================================
    // LOGIN SUCCESS
    // =========================================

    const handleLoginSuccess = () => {

        setIsLoggedIn(true);


        // =====================================
        // RESTORE FOOD SELECTED BEFORE LOGIN
        // =====================================

        const savedFood =
            localStorage.getItem(
                "pendingCartItem"
            );


        if (savedFood) {

            try {

                const food =
                    JSON.parse(savedFood);


                if (food && food.id) {

                    setCart((previousCart) => {

                        const existingItem =
                            previousCart.find(
                                (item) =>
                                    item.id === food.id
                            );


                        if (existingItem) {

                            return previousCart.map(
                                (item) => {

                                    if (
                                        item.id === food.id
                                    ) {

                                        return {
                                            ...item,
                                            quantity:
                                                item.quantity + 1
                                        };

                                    }

                                    return item;

                                }
                            );

                        }


                        return [
                            ...previousCart,
                            {
                                ...food,
                                quantity: 1
                            }
                        ];

                    });


                    showNotification(
                        `${food.name} has been added to your cart.`
                    );

                }

            } catch (error) {

                console.error(
                    "Unable to restore pending cart item:",
                    error
                );

            }


            // Remove temporary item
            localStorage.removeItem(
                "pendingCartItem"
            );


            const savedReturnPath =
                localStorage.getItem(
                    "returnPath"
                );


            const destination =
                savedReturnPath ||
                returnPath ||
                "/";


            localStorage.removeItem(
                "returnPath"
            );


            navigate(destination);

            return;

        }


        // Normal login
        navigate("/");

    };


    // =========================================
    // LOGOUT
    // =========================================

    const handleLogout = () => {

        localStorage.removeItem(
            "token"
        );

        localStorage.removeItem(
           "refreshToken"
        );

        localStorage.removeItem(
            "user"
        );

        localStorage.removeItem(
            "pendingCartItem"
        );

        localStorage.removeItem(
            "returnPath"
        );


        // Clear React cart
        setCart([]);


        // Clear saved cart
        localStorage.removeItem(
            "foodhubCart"
        );


        setIsLoggedIn(false);

        setReturnPath("/");

        navigate("/");

    };


    // =========================================
    // CART COUNT
    // =========================================

    const cartCount =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );


    // =========================================
    // APP
    // =========================================

    return (

        <>

            <Navbar
                isLoggedIn={isLoggedIn}
                onLogout={handleLogout}
                cartCount={cartCount}
            />


            <Notification
                message={notification}
                onClose={() =>
                    setNotification("")
                }
            />


            <Breadcrumb />


            <Routes>

                {/* HOME */}

                <Route
                    path="/"
                    element={
                        <Home
                            onAddToCart={addToCart}
                        />
                    }
                />


                {/* CATEGORIES */}

                <Route
                    path="/veg"
                    element={
                        <Category
                            onAddToCart={addToCart}
                        />
                    }
                />

                <Route
                    path="/non-veg"
                    element={
                        <Category
                            onAddToCart={addToCart}
                        />
                    }
                />

                <Route
                    path="/desserts"
                    element={
                        <Category
                            onAddToCart={addToCart}
                        />
                    }
                />

                <Route
                    path="/soft-drinks"
                    element={
                        <Category
                            onAddToCart={addToCart}
                        />
                    }
                />


                {/* SEARCH */}

                <Route
                    path="/search"
                    element={
                        <Search
                            onAddToCart={addToCart}
                        />
                    }
                />


                {/* LOGIN */}

                <Route
                    path="/login"
                    element={
                        <LoginPage
                            onLoginSuccess={
                                handleLoginSuccess
                            }
                        />
                    }
                />

                <Route
    path="/register"
    element={<Register />}
/>


                {/* CART */}

                <Route
                    path="/cart"
                    element={
                        <Cart
                            cart={cart}
                            setCart={setCart}
                        />
                    }
                />


                {/* CHECKOUT */}

                <Route
                    path="/checkout"
                    element={
                        <Checkout
                            cart={cart}
                            setCart={setCart}
                        />
                    }
                />

        
    <Route
    path="/my-orders"
    element={<MyOrders />}
/>

        <Route
    path="/forgot-password"
    element={<ForgotPassword />}
    />

            </Routes>

        </>

    );

}

export default App;