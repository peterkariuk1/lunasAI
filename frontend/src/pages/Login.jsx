import React, { useState, useEffect } from "react";
import lunasLogo from "../assets/lunaslogo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../styles/signup.css";

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 6;

  const validatePassword = (value) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) && value.length > 7;

  useEffect(() => {
    const allValid = validateEmail(email) && validatePassword(password);
    setIsValid(allValid);
  }, [email, password]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/present-patient", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(false);
    setTimeout(() => {
      setPasswordVisible(true);
    }, 2000);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { success, message } = await login(email, password);
    if (success) {
      setMessage(message);
    } else {
      setMessage(message);
      navigate("/login");
    }
    setPassword("");
    setEmail("");
    setIsLoading(false);
  };
  return (
    <div className="sign-up-page">
      <img className="logo-image" src={lunasLogo} />
      <h1>
        Welcome Back!
        <br /> <span className="lunas-text">Lunas</span>
        <span className="ai-text">AI</span>
      </h1>
      <div className="form-wrapper">
        <p className="app-slogan">
          Because Every Symptom Deserves the <br />
          Right Answer.
        </p>

        <form onSubmit={handleLogin}>
          <p
            className={`login-feedback-message ${
              message.includes("successful") ? "success" : ""
            }`}
          >
            {message}
          </p>
          <div>
            {!validateEmail(email) && email.length > 2 && (
              <p className="helper-text"> Enter a valid email.</p>
            )}
            <input
              type="email"
              name="email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
            />
          </div>
          {!validatePassword(password) && password.length > 2 && (
            <p className="helper-text">
              Password must be at least 8 characters, include an uppercase
              letter, a digit, and a symbol.
            </p>
          )}
          <div className="password-container">
            <input
              type={passwordVisible ? "password" : "text"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
            />
            <section
              className="visible-password-container"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? (
                <VisibilityIcon className="visible-password-button" />
              ) : (
                <VisibilityOffIcon className="visible-password-button" />
              )}
            </section>
          </div>
          <button
            className={`sign-up-button ${isValid ? "enabled" : ""}`}
            disabled={!isValid}
            type="submit"
          >
            {loading ? (
              <CircularProgress size="1.2rem" color="secondary" />
            ) : (
              "Login"
            )}
          </button>
        </form>
        <p className="redirect-link">
          Do not have an account?
          <span>
            <Link to="/signup"> Sign Up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
