import React from "react";
import notFoundSVG from "../assets/notFound.svg";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <img src={notFoundSVG} />
      <h1>404</h1>
      <p>Oops... Page not Found</p>
    </div>
  );
};

export default NotFound;
