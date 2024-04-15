import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  const [showLink, setShowLink] = useState(
    sessionStorage.getItem("hasClickedLink") !== "true"
  );

  const handleLinkClick = () => {
    setShowLink(false);
    sessionStorage.setItem("hasClickedLink", "true");
  };

  // Clear sessionStorage when component unmounts
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("hasClickedLink");
    };
  }, []);

  return (
    <div>
      <NavLink to="/search">Spotify</NavLink>
      <Outlet />
      {showLink && (
        <NavLink to="/search" onClick={handleLinkClick}>
          Click here
        </NavLink>
      )}
    </div>
  );
};

export default Navbar;
