// HomePage.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";

const HomePage = () => {
  const { keyword } = useParams();
  const [tracks, setTracks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://v1.nocodeapi.com/spotify123/spotify/UDlBcfcquvpiBShn/search?q=${keyword}&type=track`
        );
        const tracksData = response.data.tracks.items;
        setTracks(tracksData);
      } catch (error) {
        console.error("Error fetching tracks:", error);
        setTracks([]); // Clear tracks in case of error
      } finally {
        setIsLoading(false);
      }
    };

    if (keyword) {
      fetchData();
    }
  }, [keyword]);

  return (
    <div className="home-page">
      <SearchBar onSearch={(data) => setTracks(data)} />
      <div className="track-list">
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          tracks.map((track) => (
            <div key={track.id} className="track-item">
              <div>
                <img src={track.album.images[0].url} alt={track.name} />
              </div>
              <h3>{track.name}</h3>
              <p>Artist: {track.artists[0].name}</p>
              <p>Popularity: {track.popularity}</p>
              <p>Release Date: {track.album.release_date}</p>
              <audio controls>
                <source src={track.preview_url} type="audio/mp3" />
                Your browser does not support the audio element.
              </audio>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
