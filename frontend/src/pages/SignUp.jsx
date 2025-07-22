import React, { useState, useEffect } from "react";
import axios from "axios";
import lunasLogo from "../assets/lunaslogo.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import "../styles/signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [loading, setIsLoading] = useState(false);

  const validateUsername = (value) =>
    /^[A-Za-z_]+$/.test(value) && value.length > 3 && value.length < 9;

  const validateEmail = (value) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length > 6;

  const validatePassword = (value) =>
    /^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) && value.length > 7;

  useEffect(() => {
    const allValid =
      validateEmail(email) &&
      validateUsername(username) &&
      validatePassword(password);
    setIsValid(allValid);
  }, [username, email, password]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(false);
    setTimeout(() => {
      setPasswordVisible(true);
    },2000)
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const errorMessage = "Error";
    const successfulMessage =
      "Successful sign up. Please check your email to confirm";
    try {
      const response = await axios.post("http://127.0.0.1:8000/sign_up", {
        email,
        password,
        username,
      });
      if (response.data.success) {
        if (response.access_token) {
          setMessage("Sign up successful!");
          // Redirect to dashboard or home
        } else {
          setMessage(successfulMessage);
          setUsername("");
          setPassword("");
          setEmail("");
        }
      }
    } catch (error) {
      setMessage(errorMessage + error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="sign-up-page">
      <img className="logo-image" src={lunasLogo} />
      <h1>
        Welcome to
        <br /> <span className="lunas-text">Lunas</span>
        <span className="ai-text">AI</span>
      </h1>
      <div className="form-wrapper">
        <p className="app-slogan">
          Because Every Symptom Deserves the <br />
          Right Answer.
        </p>

        <form onSubmit={handleSignUp}>
          <p
            className={`feedback-message ${
              message.includes("Error") ? "error" : ""
            }`}
          >
            {message}
          </p>
          <div>
            {!validateUsername(username) && username.length > 2 && (
              <p className="helper-text">
                Username must be atleast 4-8 characters long and contain only
                letters and underscores.
              </p>
            )}
            <input
              type="text"
              autoComplete="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter a username"
            />
          </div>
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
              autoComplete="new-password"
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
              "Sign Up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
