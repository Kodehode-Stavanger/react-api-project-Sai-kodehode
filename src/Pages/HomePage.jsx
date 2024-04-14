// HomePage.js
import React, { useState } from "react";
import Navbar from "./Navbar";

const HomePage = () => {
  const [tracks, setTracks] = useState([]);

  const handleSearch = (searchResults) => {
    setTracks(searchResults);
  };

  return (
    <div className="home-page">
      <Navbar onSearch={handleSearch} />
      <div className="track-list">
        {tracks.map((track) => (
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
            {/* Additional track details can be added here */}
            {/* <a
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Spotify
            </a> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
