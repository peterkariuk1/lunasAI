import { useAuth } from "../../context/AuthContext";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const { logout } = useAuth();

  const logoutUser = () => {
    logout();
  };

  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <nav>
      <div className="left">
        {/* <img src={lunasLogo} alt="logo" /> */}
        <h1>LunasAI</h1>
      </div>
      <div className="right">
        {location.pathname !== "/" ? (
          <button className="history-button">
            <HistoryIcon />
            History
          </button>
        ) : (
          ""
        )}
        {location.pathname === "/" ? (
          <button className="logout-button" onClick={handleNavigateToLogin}>
            <LoginIcon />
            Login
          </button>
        ) : (
          <button className="logout-button" onClick={logoutUser}>
            Logout
            <LogoutIcon />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
