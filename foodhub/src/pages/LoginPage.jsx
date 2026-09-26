import Login from "../components/Login";
import { useNavigate } from "react-router-dom";

function LoginPage({ onLoginSuccess }) {

    const navigate = useNavigate();

    return (
        <>
        <Login
            onLoginSuccess={onLoginSuccess}
        />

        

<div style={{ textAlign: "center", marginTop: "10px" }}>
                <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="forgot-password-link"
                >
                    Forgot Password?
                </button>
                </div>
                </>
        
    );
    
}

export default LoginPage;