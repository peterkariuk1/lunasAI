import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/sign_up", {
        email,
        password,
      });
      if (response.data.success) {
        if (response.access_token) {
          setMessage("Sign up successful!");
          // Redirect to dashboard or home
        } else {
          setMessage("Successful sign up. Please check your email to confirm");
        }
      }
    } catch (error) {
      setMessage("Error" + error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSignUp}>
        <p>{message}</p>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
