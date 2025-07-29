import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.slice(1));

    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");

    if (accessToken) {
      localStorage.setItem("access_token", accessToken);
      if (refreshToken) {
        localStorage.setItem("refresh_token", refreshToken);
      }

      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const logoutUser = () => {
    logout();
  };

  return (
    <div>
      Home Page
      <button className="logout-button" onClick={logoutUser}>
        Logout
      </button>
    </div>
  );
};

export default Home;
