import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();
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

  return (
    <div className="home-page">
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
