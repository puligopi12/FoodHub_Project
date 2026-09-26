import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({ cart, setCart }) {

    // =========================================
    // EMPTY CART
    // =========================================

    if (!cart || cart.length === 0) {

        return (

            <main className="cart-page">

                <section className="empty-cart-container">

                    <div className="empty-cart-icon">
                        🛒
                    </div>

                    <h1>
                        Your Cart is Empty
                    </h1>

                    <p>
                        Looks like you haven't added anything to your cart yet.
                    </p>

                    <p className="empty-cart-subtext">
                        Explore our delicious food and find something you'll love!
                    </p>

                    <Link
                        to="/"
                        className="browse-food-button"
                    >
                        🍔 Browse Food
                    </Link>

                </section>

            </main>

        );
    }


    // =========================================
    // INCREASE QUANTITY
    // =========================================

    const increaseQuantity = (id) => {

        setCart((previousCart) =>

            previousCart.map((item) =>

                item.id === id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item

            )

        );

    };


    // =========================================
    // DECREASE QUANTITY
    // =========================================

    const decreaseQuantity = (id) => {

        setCart((previousCart) =>

            previousCart
                .map((item) =>

                    item.id === id
                        ? {
                            ...item,
                            quantity: item.quantity - 1
                        }
                        : item

                )
                .filter((item) => item.quantity > 0)

        );

    };


    // =========================================
    // REMOVE ITEM
    // =========================================

    const removeItem = (id) => {

        setCart((previousCart) =>
            previousCart.filter(
                (item) => item.id !== id
            )
        );

    };


    // =========================================
    // TOTAL ITEMS
    // =========================================

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );


    // =========================================
    // TOTAL PRICE
    // =========================================

    const totalPrice = cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );


    // =========================================
    // CART UI
    // =========================================

    return (

        <main className="cart-page">

            <div className="cart-container">

                {/* =================================
                    HEADER
                ================================= */}

                <div className="cart-header">

                    <div>

                        <h1>
                            Your Cart 🛒
                        </h1>

                        <p>
                            {totalItems} item
                            {totalItems !== 1 ? "s" : ""}
                            {" "}in your cart
                        </p>

                    </div>

                    <Link
                        to="/"
                        className="continue-shopping"
                    >
                        ← Continue Shopping
                    </Link>

                </div>


                {/* =================================
                    CART CONTENT
                ================================= */}

                <div className="cart-content">

                    {/* =============================
                        ITEMS
                    ============================= */}

                    <div className="cart-items">

                        {cart.map((item) => (

                            <div
                                className="cart-item"
                                key={item.id}
                            >

                                <div className="cart-item-image">

                                    <img
                                        src={item.image}
                                        alt={item.name}
                                    />

                                </div>


                                <div className="cart-item-details">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    <p>
                                        ₹{item.price} per item
                                    </p>


                                    <div className="quantity-controls">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                decreaseQuantity(item.id)
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {item.quantity}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                increaseQuantity(item.id)
                                            }
                                        >
                                            +
                                        </button>

                                    </div>

                                </div>


                                <div className="cart-item-right">

                                    <strong>
                                        ₹{item.price * item.quantity}
                                    </strong>

                                    <button
                                        type="button"
                                        className="remove-item"
                                        onClick={() =>
                                            removeItem(item.id)
                                        }
                                    >
                                        Remove
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>


                    {/* =============================
                        ORDER SUMMARY
                    ============================= */}

                    <aside className="cart-summary">

                        <h2>
                            Order Summary
                        </h2>


                        <div className="summary-row">

                            <span>
                                Items
                            </span>

                            <span>
                                {totalItems}
                            </span>

                        </div>


                        <div className="summary-row">

                            <span>
                                Item Total
                            </span>

                            <span>
                                ₹{totalPrice}
                            </span>

                        </div>


                        <div className="summary-row">

                            <span>
                                Delivery Fee
                            </span>

                            <span>
                                FREE
                            </span>

                        </div>


                        <div className="summary-divider"></div>


                        <div className="summary-total">

                            <span>
                                Total
                            </span>

                            <strong>
                                ₹{totalPrice}
                            </strong>

                        </div>


                        <Link
                            to="/checkout"
                            className="checkout-button"
                        >
                            Proceed to Checkout →
                        </Link>

                    </aside>

                </div>

            </div>

        </main>

    );
}

export default Cart;