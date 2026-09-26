import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login({ onLoginSuccess }) {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!email.trim() || !password.trim()) {
            setError("Please enter email and password");
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                "http://localhost:8080/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email.trim(),
                        password: password
                    })
                }
            );

            const responseText = await response.text();

let data;

try {
    data = JSON.parse(responseText);
} catch {
    data = {
        message: responseText
    };
}

            if (!response.ok) {
                throw new Error(
                    data.message || "Invalid email or password"
                );
            }

            localStorage.setItem("token", data.token);

            localStorage.setItem("refreshToken", data.refreshToken);

            localStorage.setItem(
                "user",
                JSON.stringify({
                    userCode: data.userCode,
                    name: data.name,
                    email: data.email,
                    role: data.role
                })
            );

            alert("Login successful");

            onLoginSuccess();

        } catch (error) {
            console.error("Login error:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="login-box">

                <div className="login-icon">
                    🍔
                </div>

                <h2>Welcome Back</h2>

                <p className="login-subtitle">
                    Login to continue ordering your favorite food
                </p>

                <form onSubmit={handleLogin}>

                    <div className="input-group">
                        <label htmlFor="email">
                            Email Address
                        </label>

                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="forgot-password">
                        <button
                            type="button"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot password?
                        </button>
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        className="login-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <p className="register-text">
    New to FoodHub?
    <button
        type="button"
        onClick={() => navigate("/register")}
        className="register-link"
    >
        Create an account
    </button>
</p>

            </div>
        </div>
    );
}

export default Login;