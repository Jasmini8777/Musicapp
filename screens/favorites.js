import React, { useState, useEffect } from "react";
import "./favorites.css"
import apiClient from "../spotify" // Ensure this is correctly configured

export default function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    apiClient.get("me/tracks") // Fetch saved tracks from Spotify
      .then(response => {
        setFavorites(response.data.items);
      })
      .catch(error => console.error("Error fetching favorites:", error));
  }, []);

  return (
    <div className="screen-container">
      <h2>Favorite Songs</h2>
      {favorites.length === 0 ? (
        <p>No favorite songs found.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((track, index) => (
            <li key={index} className="favorite-item">
              <img src={track.track.album.images[0]?.url} alt="Album Cover" width="50" />
              <span>{track.track.name} - {track.track.artists[0].name}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
