import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ForgotPassword.css";

import {
    forgotPassword,
    verifyOtp,
    resetPassword,
} from "../api/authApi";

function ForgotPassword() {
    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerateOtp = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!email.trim()) {
            setError("Please enter your email.");
            return;
        }

        try {
            setLoading(true);

            const response = await forgotPassword(email);

            console.log("Forgot password response:", response);

            setMessage(response);
            setStep(2);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!otp.trim()) {
            setError("Please enter the OTP.");
            return;
        }

        if (otp.length !== 6) {
            setError("OTP must contain 6 digits.");
            return;
        }

        try {
            setLoading(true);

            const response = await verifyOtp(email, otp);

            console.log("OTP verification response:", response);

            setMessage("OTP verified successfully.");
            setStep(3);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        setMessage("");
        setError("");

        if (!newPassword) {
            setError("Please enter a new password.");
            return;
        }

        if (newPassword.length < 6) {
            setError("Password must contain at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            setLoading(true);

            const response = await resetPassword(
                email,
                otp,
                newPassword
            );

            console.log("Reset password response:", response);

            setMessage("Password reset successfully.");

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-page">

            <div className="forgot-password-card">

                <h2>Forgot Password</h2>

                <p className="forgot-password-subtitle">
                    Reset your FoodHub account password
                </p>

                {message && (
                    <div className="success-message">
                        {message}
                    </div>
                )}

                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}

                {/* STEP 1 - EMAIL */}
                {step === 1 && (
                    <form onSubmit={handleGenerateOtp}>

                        <label>Email Address</label>

                        <input
                            type="email"
                            placeholder="Enter your registered email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Generating OTP..."
                                : "Generate OTP"}
                        </button>

                    </form>
                )}

                {/* STEP 2 - OTP */}
                {step === 2 && (
                    <form onSubmit={handleVerifyOtp}>

                        <label>Email Address</label>

                        <input
                            type="email"
                            value={email}
                            disabled
                        />

                        <label>OTP</label>

                        <input
                            type="text"
                            placeholder="Enter 6-digit OTP"
                            value={otp}
                            maxLength="6"
                            onChange={(event) =>
                                setOtp(
                                    event.target.value.replace(
                                        /\D/g,
                                        ""
                                    )
                                )
                            }
                        />

                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Verifying..."
                                : "Verify OTP"}
                        </button>

                        <button
                            type="button"
                            className="back-button"
                            onClick={() => {
                                setStep(1);
                                setOtp("");
                                setError("");
                                setMessage("");
                            }}
                        >
                            Change Email
                        </button>

                    </form>
                )}

                {/* STEP 3 - NEW PASSWORD */}
                {step === 3 && (
                    <form onSubmit={handleResetPassword}>

                        

                      <label>New Password</label>

<div className="password-input-wrapper">

    <input
        type={showNewPassword ? "text" : "password"}
        placeholder="Enter new password"
        value={newPassword}
        onChange={(event) =>
            setNewPassword(event.target.value)
        }
    />

    <button
        type="button"
        className="password-eye-button"
        onClick={() =>
            setShowNewPassword(!showNewPassword)
        }
        aria-label={
            showNewPassword
                ? "Hide password"
                : "Show password"
        }
    >
        {showNewPassword ? "🙈" : "👁️"}
    </button>

</div>

<label>Confirm New Password</label>

<div className="password-input-wrapper">

    <input
        type={showConfirmPassword ? "text" : "password"}
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(event) =>
            setConfirmPassword(
                event.target.value
            )
        }
    />

    <button
        type="button"
        className="password-eye-button"
        onClick={() =>
            setShowConfirmPassword(!showConfirmPassword)
        }
        aria-label={
            showConfirmPassword
                ? "Hide password"
                : "Show password"
        }
    >
        {showConfirmPassword ? "🙈" : "👁️"}
    </button>

</div>


                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Resetting Password..."
                                : "Reset Password"}
                        </button>

                    </form>
                )}

                <button
                    type="button"
                    className="login-link-button"
                    onClick={() => navigate("/login")}
                >
                    Back to Login
                </button>

            </div>

        </div>
    );
}

export default ForgotPassword;