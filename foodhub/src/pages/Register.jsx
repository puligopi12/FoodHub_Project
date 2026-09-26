import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (event) => {

        event.preventDefault();

        setMessage("");
        setError("");

        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            setError("Phone number must contain exactly 10 digits.");
            return;
        }

        if (!password) {
            setError("Please enter a password.");
            return;
        }

        if (password.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {

            setLoading(true);

            // Generate FoodHub user code automatically
            const userCode = "FH" + Date.now();

            const response = await fetch(
                "http://localhost:8080/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        userCode: userCode,
                        name: name.trim(),
                        email: email.trim(),
                        phone: phone,
                        password: password
                    })
                }
            );

            const responseText = await response.text();

            if (!response.ok) {
                throw new Error(
                    responseText || "Registration failed."
                );
            }

            setMessage("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error("Registration error:", error);

            setError(error.message);

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="register-page">

            <div className="register-card">

                <div className="register-icon">
                    🍔
                </div>

                <h2>Create Your FoodHub Account</h2>

                <p className="register-subtitle">
                    Register to start ordering your favorite food
                </p>

                {message && (
                    <div className="register-success">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="register-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>

                    {/* NAME */}
                    <div className="register-input-group">

                        <label htmlFor="register-name">
                            Full Name
                        </label>

                        <input
                            id="register-name"
                            type="text"
                            placeholder="Enter your full name"
                            value={name}
                            onChange={(event) =>
                                setName(event.target.value)
                            }
                        />

                    </div>

                    {/* EMAIL */}
                    <div className="register-input-group">

                        <label htmlFor="register-email">
                            Email Address
                        </label>

                        <input
                            id="register-email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                    </div>

                    {/* PHONE */}
                    <div className="register-input-group">

                        <label htmlFor="register-phone">
                            Phone Number
                        </label>

                        <input
                            id="register-phone"
                            type="tel"
                            placeholder="Enter 10-digit phone number"
                            value={phone}
                            maxLength="10"
                            onChange={(event) =>
                                setPhone(
                                    event.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                        />

                    </div>

                    {/* PASSWORD */}
                    <div className="register-input-group">

                        <label htmlFor="register-password">
                            Password
                        </label>

                        <div className="register-password-wrapper">

                            <input
                                id="register-password"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter password"
                                value={password}
                                onChange={(event) =>
                                    setPassword(
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="register-eye-button"
                                onClick={() =>
                                    setShowPassword(
                                        !showPassword
                                    )
                                }
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showPassword
                                    ? "🙈"
                                    : "👁️"}
                            </button>

                        </div>

                    </div>

                    {/* CONFIRM PASSWORD */}
                    <div className="register-input-group">

                        <label htmlFor="register-confirm-password">
                            Confirm Password
                        </label>

                        <div className="register-password-wrapper">

                            <input
                                id="register-confirm-password"
                                type={
                                    showConfirmPassword
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(event) =>
                                    setConfirmPassword(
                                        event.target.value
                                    )
                                }
                            />

                            <button
                                type="button"
                                className="register-eye-button"
                                onClick={() =>
                                    setShowConfirmPassword(
                                        !showConfirmPassword
                                    )
                                }
                                aria-label={
                                    showConfirmPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                            >
                                {showConfirmPassword
                                    ? "🙈"
                                    : "👁️"}
                            </button>

                        </div>

                    </div>

                    {/* REGISTER BUTTON */}
                    <button
                        type="submit"
                        className="register-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Creating Account..."
                            : "Create Account"}
                    </button>

                </form>

                <button
                    type="button"
                    className="register-login-button"
                    onClick={() => navigate("/login")}
                >
                    Already have an account? Login
                </button>

            </div>

        </div>
    );
}

export default Register;