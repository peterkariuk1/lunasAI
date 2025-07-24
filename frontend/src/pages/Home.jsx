import React, { useState } from "react";

const Home = () => {
  const [logoutWarning, setLogoutWarning] = useState(null);
  const displayLogoutModal = () => {
    setLogoutWarning(true);
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setLogoutWarning(null);
  };
  const handleCancelLogout = () => {
    setLogoutWarning(null);
  };
  return (
    <div>
      Home Page
      <button onClick={displayLogoutModal}>Logout</button>
      <div
        className={`logout-modal ${logoutWarning === true ? "visible" : ""}`}
      >
        <p>Do you really want to logout?</p>
        <button onClick={handleLogout}>Confirm</button>
        <button onClick={handleCancelLogout}>Cancel</button>
      </div>
    </div>
  );
};

export default Home;
