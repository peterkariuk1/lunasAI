import { useAuth } from "../../context/AuthContext";
import lunasLogo from "../assets/lunaslogo.png";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const { logout } = useAuth();

  const logoutUser = () => {
    logout();
  };
  return (
    <nav>
      <div className="left">
        <img src={lunasLogo} alt="logo" />
        <h1>LunasAI</h1>
      </div>
      <div className="right">
        <button className="history-button">
          <HistoryIcon />
          History
        </button>
        <button className="logout-button" onClick={logoutUser}>
          <LogoutIcon />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;
