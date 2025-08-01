import React from "react";
import notFoundSVG from "../assets/notFound.svg";
import "../styles/notfound.css";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <img src={notFoundSVG} />
      <h1>404</h1>
      <p>Oops... Page not Found</p>
      <Link style={{textDecoration:"none"}}to="/lunas">
        <button>
          <HomeIcon />
          Home
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
