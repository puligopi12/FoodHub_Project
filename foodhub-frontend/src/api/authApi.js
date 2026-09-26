const API_URL = "http://localhost:8080/api/auth";

// Generate OTP
export const forgotPassword = async (email) => {
    const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
        }),
    });

    const message = await response.text();

    if (!response.ok) {
        throw new Error(message || "Failed to generate OTP");
    }

    return message;
};

// Verify OTP
export const verifyOtp = async (email, otp) => {
    const response = await fetch(`${API_URL}/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            otp: otp,
        }),
    });

    const message = await response.text();

    if (!response.ok) {
        throw new Error(message || "Invalid OTP");
    }

    return message;
};

// Reset Password
export const resetPassword = async (email, otp, newPassword) => {
    const response = await fetch(`${API_URL}/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: email,
            otp: otp,
            newPassword: newPassword,
        }),
    });

    const message = await response.text();

    if (!response.ok) {
        throw new Error(message || "Failed to reset password");
    }

    return message;
};