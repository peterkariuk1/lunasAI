import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      navigate("/login", { replace: true });
    }
  }, [navigate, isAuthenticated, loading]);

  if (loading) return <CircularProgress size="30px" />;
  return isAuthenticated ? children : null;
};

export default PrivateRoute;
