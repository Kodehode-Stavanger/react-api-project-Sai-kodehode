// Navbar.js
import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";

const Navbar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    if (keyword.trim() !== "") {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://v1.nocodeapi.com/sai12/spotify/tFzVqPcQbFzBNLGS/search?q=${keyword}&type=track`
        );
        const tracks = response.data.tracks.items;
        onSearch(tracks);
      } catch (error) {
        console.error("Error fetching tracks:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <nav className="navbar">
      <div className="search-container">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          type="search"
          placeholder="Search for tracks..."
          aria-label="search"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {isLoading && <Spinner type="spokes" color="black" />}
    </nav>
  );
};

export default Navbar;
