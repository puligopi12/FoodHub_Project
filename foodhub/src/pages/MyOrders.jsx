import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrders } from "../api/orderApi";
import "./MyOrders.css";

function MyOrders() {

    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD MY ORDERS
    // =====================================================

    useEffect(() => {

        const loadOrders = async () => {

            try {

                const data = await getMyOrders();

                setOrders(data);

            } catch (error) {

                console.error("Failed to load orders:", error);

                setError(error.message);

            } finally {

                setLoading(false);

            }

        };

        loadOrders();

    }, []);


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <main className="my-orders-page">

                <div className="orders-message">

                    <div className="orders-loader">
                        ⏳
                    </div>

                    <h2>
                        Loading your orders...
                    </h2>

                </div>

            </main>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <main className="my-orders-page">

                <div className="orders-message error">

                    <div className="orders-message-icon">
                        ⚠️
                    </div>

                    <h2>
                        Unable to load orders
                    </h2>

                    <p>
                        {error}
                    </p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Go Home
                    </button>

                </div>

            </main>

        );

    }


    // =====================================================
    // EMPTY ORDERS
    // =====================================================

    if (orders.length === 0) {

        return (

            <main className="my-orders-page">

                <div className="orders-message">

                    <div className="orders-message-icon">
                        📦
                    </div>

                    <h2>
                        No orders yet
                    </h2>

                    <p>
                        You haven't placed any orders yet.
                    </p>

                    <button
                        onClick={() => navigate("/")}
                    >
                        Start Ordering
                    </button>

                </div>

            </main>

        );

    }


    // =====================================================
    // ORDERS LIST
    // =====================================================

    return (

        <main className="my-orders-page">

            <div className="orders-header">

                <h1>
                    My Orders
                </h1>

                <p>
                    View your recent FoodHub orders.
                </p>

            </div>


            <div className="orders-list">

                {orders.map((order) => (

                    <article
                        className="order-card"
                        key={order.id}
                    >

                        {/* =================================
                            ORDER HEADER
                        ================================= */}

                        <div className="order-card-header">

                            <div>

                                <h2>
                                    Order #{order.id}
                                </h2>

                                <p className="order-number">
                                    {order.orderNumber}
                                </p>

                            </div>

                            <span className="order-status">
                                {order.status}
                            </span>

                        </div>


                        {/* =================================
                            ORDER DATE
                        ================================= */}

                        <div className="order-date">

                            📅{" "}

                            {order.orderDate
                                ? new Date(
                                    order.orderDate
                                ).toLocaleString()
                                : "Date unavailable"
                            }

                        </div>


                        {/* =================================
                            CUSTOMER DETAILS
                        ================================= */}

                        <div className="order-details">

                            <div>

                                <strong>
                                    👤 Customer
                                </strong>

                                <p>
                                    {order.customerName}
                                </p>

                            </div>


                            <div>

                                <strong>
                                    📞 Phone
                                </strong>

                                <p>
                                    {order.phone}
                                </p>

                            </div>


                            <div>

                                <strong>
                                    📍 Delivery Address
                                </strong>

                                <p>
                                    {order.address},{" "}
                                    {order.city} -{" "}
                                    {order.pincode}
                                </p>

                            </div>

                        </div>


                        {/* =================================
                            ITEMS
                        ================================= */}

                        <div className="order-items">

                            <h3>
                                Ordered Items
                            </h3>


                            {order.items &&
                                order.items.map((item) => (

                                    <div
                                        className="order-item"
                                        key={item.id}
                                    >

                                        <div>

                                            <strong>
                                                {item.food?.name ||
                                                    "Food item"}
                                            </strong>

                                            <span>
                                                ₹{item.price} ×{" "}
                                                {item.quantity}
                                            </span>

                                        </div>

                                        <strong>
                                            ₹{item.total}
                                        </strong>

                                    </div>

                                ))}

                        </div>


                        {/* =================================
                            PAYMENT + TOTAL
                        ================================= */}

                        <div className="order-footer">

                            <div>

                                <span>
                                    Payment
                                </span>

                                <strong>
                                    {order.paymentMethod}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Subtotal
                                </span>

                                <strong>
                                    ₹{order.subtotal}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Delivery
                                </span>

                                <strong>
                                    ₹{order.deliveryCharge}
                                </strong>

                            </div>


                            <div className="order-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    ₹{order.total}
                                </strong>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </main>

    );

}

export default MyOrders;