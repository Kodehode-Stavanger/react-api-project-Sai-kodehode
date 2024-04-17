import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [showLink, setShowLink] = useState(
    sessionStorage.getItem("hasClickedLink") !== "true"
  );

  const location = useLocation();

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

  useEffect(() => {
    // Check if the current location is exactly the root ("/")
    if (
      location.pathname === "/" &&
      !sessionStorage.getItem("hasClickedLink")
    ) {
      setShowLink(true);
    } else {
      setShowLink(false);
    }
  }, [location.pathname]);

  return (
    <div>
      <NavLink to="/search" className={styles.navbar}>
        Spotify
      </NavLink>
      <Outlet />
      {showLink && (
        <div className={styles.center}>
          <NavLink
            to="/search"
            style={{
              fontSize: "24px",
              padding: "10px 20px",
              backgroundColor: "lightblue",
              color: "black",
              textDecoration: "none",
              borderRadius: "5px",
              transition: "background-color 0.3s ease",
            }}
            onClick={handleLinkClick}
          >
            Click here
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Navbar;
