import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../api/orderApi";
import "./Checkout.css";

function Checkout({ cart, setCart }) {

  const navigate = useNavigate();

  // =====================================================
  // FORM STATE
  // =====================================================

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "Cash on Delivery",
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);


  // =====================================================
  // HANDLE INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

  };


  // =====================================================
  // CALCULATE ORDER TOTAL
  // =====================================================

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const deliveryCharge = 40;

  const total = subtotal + deliveryCharge;


  // =====================================================
  // PLACE ORDER
  // =====================================================

  const handlePlaceOrder = async (e) => {

    e.preventDefault();


    // =================================================
    // VALIDATE NAME
    // =================================================

    if (!formData.name.trim()) {

      alert("Please enter your full name.");

      return;

    }


    // =================================================
    // VALIDATE PHONE
    // =================================================

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {

      alert("Please enter a valid 10-digit mobile number.");

      return;

    }


    // =================================================
    // VALIDATE ADDRESS
    // =================================================

    if (!formData.address.trim()) {

      alert("Please enter your delivery address.");

      return;

    }


    // =================================================
    // VALIDATE CITY
    // =================================================

    if (!formData.city.trim()) {

      alert("Please enter your city.");

      return;

    }


    // =================================================
    // VALIDATE PINCODE
    // =================================================

    if (!/^\d{6}$/.test(formData.pincode)) {

      alert("Please enter a valid 6-digit pincode.");

      return;

    }


    // =================================================
    // CHECK LOGIN
    // =================================================

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please login before placing your order.");

      navigate("/login");

      return;

    }


    // =================================================
    // PREPARE BACKEND ORDER REQUEST
    // =================================================

    const orderData = {

      name: formData.name,

      phone: formData.phone,

      address: formData.address,

      city: formData.city,

      pincode: formData.pincode,

      paymentMethod: formData.payment,

      items: cart.map((item) => ({

        foodId: item.id,

        quantity: item.quantity,

      })),

    };


    // =================================================
    // SEND ORDER TO SPRING BOOT
    // =================================================

    try {

      setIsPlacingOrder(true);

      console.log("Sending order to backend:", orderData);

      const savedOrder = await createOrder(orderData);

      console.log("Order created successfully:", savedOrder);


      // =================================================
      // SAVE LATEST ORDER FOR FRONTEND
      // =================================================

      localStorage.setItem(
        "foodHubLatestOrder",
        JSON.stringify(savedOrder)
      );


      // =================================================
      // CLEAR CART ONLY AFTER SUCCESS
      // =================================================

      setCart([]);


      // =================================================
      // SUCCESS MESSAGE
      // =================================================

      alert(
        `Order placed successfully!\n\nOrder ID: ${savedOrder.id}`
      );


      // =================================================
      // GO HOME
      // =================================================

      navigate("/");

    } catch (error) {

      console.error("Order creation failed:", error);

      alert(
        `Unable to place order.\n\n${error.message}`
      );

    } finally {

      setIsPlacingOrder(false);

    }

  };


  // =====================================================
  // EMPTY CART CHECK
  // =====================================================

  if (cart.length === 0) {

    return (

      <div className="checkout-empty">

        <div className="checkout-empty-icon">
          🛒
        </div>

        <h2>
          Your cart is empty
        </h2>

        <p>
          Add some delicious food before checkout.
        </p>

        <button
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </button>

      </div>

    );

  }


  // =====================================================
  // CHECKOUT UI
  // =====================================================

  return (

    <main className="checkout-page">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="checkout-header">

        <h1>
          Checkout
        </h1>

        <p>
          Enter your delivery details and review your order.
        </p>

      </div>


      <form
        className="checkout-layout"
        onSubmit={handlePlaceOrder}
      >


        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="checkout-left">


          {/* =================================================
              DELIVERY DETAILS
          ================================================= */}

          <section className="checkout-card">

            <h2>
              📍 Delivery Details
            </h2>


            {/* NAME */}

            <div className="form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
              />

            </div>


            {/* PHONE */}

            <div className="form-group">

              <label>
                Mobile Number
              </label>

              <div className="phone-field">

                <span>
                  +91
                </span>

                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter 10-digit mobile number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData((previous) => ({
                      ...previous,
                      phone: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  maxLength="10"
                />

              </div>

            </div>


            {/* ADDRESS */}

            <div className="form-group">

              <label>
                Delivery Address
              </label>

              <textarea
                name="address"
                placeholder="House / Flat No, Street, Area"
                value={formData.address}
                onChange={handleChange}
                rows="4"
              />

            </div>


            {/* CITY + PINCODE */}

            <div className="form-row">

              <div className="form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={formData.city}
                  onChange={handleChange}
                />

              </div>


              <div className="form-group">

                <label>
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit pincode"
                  value={formData.pincode}
                  onChange={(e) =>
                    setFormData((previous) => ({
                      ...previous,
                      pincode: e.target.value.replace(/\D/g, ""),
                    }))
                  }
                  maxLength="6"
                />

              </div>

            </div>

          </section>


          {/* =================================================
              PAYMENT METHOD
          ================================================= */}

          <section className="checkout-card">

            <h2>
              💳 Payment Method
            </h2>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={
                  formData.payment === "Cash on Delivery"
                }
                onChange={handleChange}
              />

              <span>
                💵 Cash on Delivery
              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="UPI"
                checked={
                  formData.payment === "UPI"
                }
                onChange={handleChange}
              />

              <span>
                📱 UPI
              </span>

            </label>


            <label className="payment-option">

              <input
                type="radio"
                name="payment"
                value="Card"
                checked={
                  formData.payment === "Card"
                }
                onChange={handleChange}
              />

              <span>
                💳 Credit / Debit Card
              </span>

            </label>

          </section>


        </div>


        {/* =================================================
            RIGHT SIDE - ORDER SUMMARY
        ================================================= */}

        <aside className="checkout-summary">

          <h2>
            Order Summary
          </h2>


          {/* ITEMS */}

          <div className="summary-items">

            {cart.map((item) => (

              <div
                className="summary-item"
                key={item.id}
              >

                <div>

                  <strong>
                    {item.name}
                  </strong>

                  <small>
                    ₹{item.price} × {item.quantity}
                  </small>

                </div>

                <span>
                  ₹{item.price * item.quantity}
                </span>

              </div>

            ))}

          </div>


          <hr />


          {/* SUBTOTAL */}

          <div className="checkout-row">

            <span>
              Subtotal
            </span>

            <span>
              ₹{subtotal}
            </span>

          </div>


          {/* DELIVERY */}

          <div className="checkout-row">

            <span>
              Delivery
            </span>

            <span>
              ₹{deliveryCharge}
            </span>

          </div>


          <hr />


          {/* TOTAL */}

          <div className="checkout-total">

            <span>
              Total
            </span>

            <strong>
              ₹{total}
            </strong>

          </div>


          {/* PLACE ORDER */}

          <button
            type="submit"
            className="place-order-btn"
            disabled={isPlacingOrder}
          >

            {isPlacingOrder
              ? "Placing Order..."
              : "Place Order"}

          </button>


          <p className="secure-text">
            🔒 Your order details are secure.
          </p>

        </aside>


      </form>

    </main>

  );

}


export default Checkout;