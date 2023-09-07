import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleRegisterClick = () => {
        navigate("/signup");
    }

    return(
        <div className="Home">
            <h1>Home</h1>
            <h2>Welcome to Sports Day Registeration!</h2>
            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleRegisterClick}>Sign Up</button>
        </div>
    )
}
export default Home;