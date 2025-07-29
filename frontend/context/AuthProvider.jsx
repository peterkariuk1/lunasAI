import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { checkIfLoggedIn } from "./AuthUtils";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = checkIfLoggedIn();
    setIsAuthenticated(isLoggedIn);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/login", {
        email,
        password,
      });
      const data = response.data;
      if (data.success) {
        localStorage.setItem("is_logged_in", "true");
        setIsAuthenticated(true);
        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error };
      }
    } catch (error) {
      return error;
    }
  };

  const logout = () => {
    localStorage.removeItem("is_logged_in", "true");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        isAuthenticated,
        loading,
      }}
    >
      {loading ? <p>Loading auth...</p> : children}
    </AuthContext.Provider>
  );
};
