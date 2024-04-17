// HomePage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const { keyword } = useParams();
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://v1.nocodeapi.com/spotify3/spotify/awxzwNehczkKgwJc/search?q=${keyword}&type=track`
        );
        const tracksData = response.data.tracks.items;
        setTracks(tracksData);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setTracks([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <div className={styles.homePage}>
      <SearchBar onSearch={(data) => setTracks(data)} />
      <div className={styles.trackList}>
        {isLoading ? (
          <p className={styles.loading}>Loading...</p>
        ) : (
          tracks.map((track) => (
            <div key={track.id} className={styles.trackItem}>
              <div>
                <img src={track.album.images[0].url} alt={track.name} />
              </div>
              <h3>{track.name}</h3>
              <div className={styles.trackDetails}>
                <p>Artist: {track.artists[0].name}</p>
                <p>Popularity: {track.popularity}</p>
                <p>Release Date: {track.album.release_date}</p>
                <audio controls className={styles.audioPlayer}>
                  <source src={track.preview_url} type="audio/mp3" />
                  Your browser does not support the audio element.
                </audio>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
