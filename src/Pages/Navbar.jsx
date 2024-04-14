// src/components/Navbar.js
import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";

const Navbar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    console.log("Searching with keyword:", keyword);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://v1.nocodeapi.com/sai12/spotify/tFzVqPcQbFzBNLGS/search?q=${
          keyword === "" ? "trending" : keyword
        }&type=track`
      );
      console.log("Response:", response.data);
      const tracksData = response.data.tracks.items;
      onSearch(tracksData);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      onSearch([]); // Notify parent of error
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <nav className="navbar">
      <div className="search-container">
        <p>Spotify</p>
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
