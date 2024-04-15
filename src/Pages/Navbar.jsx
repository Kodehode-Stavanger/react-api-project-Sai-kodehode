import React, { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";

const Navbar = () => {
  const [isClicked, setIsClicked] = useState(
    localStorage.getItem("linkClicked") === "true"
  );

  const handleLinkClick = () => {
    setIsClicked(true);
    localStorage.setItem("linkClicked", "true");
  };

  // Clear the clicked state from localStorage when the component mounts
  useEffect(() => {
    if (isClicked) {
      localStorage.setItem("linkClicked", "true");
    }
  }, [isClicked]);

  return (
    <div>
      <NavLink to="/search">Spotify</NavLink>
      <Outlet />
      {!isClicked && (
        <NavLink to="/search" onClick={handleLinkClick}>
          Click here
        </NavLink>
      )}
    </div>
  );
};

export default Navbar;
