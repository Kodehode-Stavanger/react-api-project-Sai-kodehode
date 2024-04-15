import React, { useState } from "react";
import axios from "axios";
import Spinner from "../Components/Spinner";
import { Outlet, NavLink } from "react-router-dom";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    console.log("Searching with keyword:", keyword);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://v1.nocodeapi.com/spotify123/spotify/UDlBcfcquvpiBShn/search?q=${encodeURIComponent(
          keyword.trim()
        )}&type=track`
      );

      console.log("Response:", response.data);
      const tracksData = response.data.tracks.items;
      onSearch(tracksData); // Ensure this calls onSearch with data

      // Update URL by setting window.location.href
      const url = `/search/${encodeURIComponent(keyword.trim())}searched`;
      window.location.href = url;
    } catch (error) {
      console.error("Error fetching tracks:", error);
      onSearch([]); // Notify parent of error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="searchbar">
      <div className="search-container">
        <input
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          type="search"
          placeholder="Search for tracks..."
          aria-label="search"
        />
        {/* Use an <a> tag to navigate when button is clicked */}
        <a
          href={`/search/${keyword === "" ? "trending" : keyword}`}
          onClick={handleSearch}
        >
          Search
        </a>
      </div>
      {isLoading && <Spinner type="spokes" color="black" />}
    </div>
  );
};

export default SearchBar;
