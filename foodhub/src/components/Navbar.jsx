import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar({
  isLoggedIn,
  onLogout,
  cartCount = 0
}) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="navbar">

      <div className="navbar-container">

        {/* =====================================
            LOGO - LEFT
        ===================================== */}

        <Link
          to="/"
          className="navbar-logo"
          aria-label="FoodHub Home"
        >
          <span className="logo-icon">🍔</span>

          <span className="logo-text">
            FoodHub
          </span>
        </Link>


        {/* =====================================
            MAIN NAVIGATION - CENTER
        ===================================== */}

        <nav className="nav-links">

          <Link
            to="/"
            className={isActive("/")}
          >
            Home
          </Link>

          <Link
            to="/veg"
            className={isActive("/veg")}
          >
            Veg
          </Link>

          <Link
            to="/non-veg"
            className={isActive("/non-veg")}
          >
            Non-Veg
          </Link>

          <Link
            to="/desserts"
            className={isActive("/desserts")}
          >
            Desserts
          </Link>

          <Link
            to="/soft-drinks"
            className={isActive("/soft-drinks")}
          >
            Soft Drinks
          </Link>

        </nav>


        {/* =====================================
            RIGHT SIDE ACTIONS
        ===================================== */}

        <div className="nav-actions">

          {/* SEARCH */}

          <Link
            to="/search"
            className={`nav-action ${
              location.pathname === "/search"
                ? "action-active"
                : ""
            }`}
          >
            <span className="nav-action-icon">
              🔍
            </span>

            <span>
              Search
            </span>
          </Link>


          {/* LOGIN / LOGOUT */}

          {isLoggedIn ? (

            <button
              type="button"
              className="nav-login"
              onClick={onLogout}
            >
              <span className="nav-action-icon">
                👤
              </span>

              <span>
                Logout
              </span>
            </button>

          ) : (

            <Link
              to="/login"
              className={`nav-login ${
                location.pathname === "/login"
                  ? "action-active"
                  : ""
              }`}
            >
              <span className="nav-action-icon">
                👤
              </span>

              <span>
                Login
              </span>
            </Link>

          )}


                    {/* MY ORDERS */}

          {isLoggedIn && (
            <Link
              to="/my-orders"
              className={`nav-action ${
                location.pathname === "/my-orders"
                  ? "action-active"
                  : ""
              }`}
            >
              <span className="nav-action-icon">
                📦
              </span>

              <span>
                My Orders
              </span>
            </Link>
          )}

          {/* CART */}

          <Link
            to="/cart"
            className={`nav-cart ${
              location.pathname === "/cart"
                ? "action-active"
                : ""
            }`}
          >

            <span className="cart-icon">
              🛒
            </span>

            <span>
              Cart
            </span>


            {/* CART NOTIFICATION */}

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}

          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;