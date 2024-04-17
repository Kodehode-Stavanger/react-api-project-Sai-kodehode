import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Spinner from "../Components/Spinner";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async () => {
    console.log("Searching with keyword:", keyword);
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://v1.nocodeapi.com/spotify3/spotify/awxzwNehczkKgwJc/search?q=${encodeURIComponent(
          keyword.trim()
        )}&type=track`
      );

      console.log("Response:", response.data);
      const tracksData = response.data.tracks.items;
      onSearch(tracksData);
    } catch (error) {
      console.error("Error fetching tracks:", error);
      onSearch([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="searchbar">
      <div className={styles.searchcontainer}>
        <input
          className={styles.searchholder}
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          type="search"
          placeholder="Search for tracks..."
          aria-label="search"
        />
        <Link
          className={styles.searchbutton}
          to={`/search/${keyword === "" ? "trending" : keyword}`}
          onClick={handleSearch}
        >
          Search
        </Link>
      </div>
      {isLoading && <Spinner type="spokes" color="black" />}
    </div>
  );
};

export default SearchBar;
