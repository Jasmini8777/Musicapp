import React, { useState, useEffect } from "react";
import "./trending.css";
import apiClient from "../spotify"; // Ensure this is correctly set up

export default function Trending() {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [currentTrackUri, setCurrentTrackUri] = useState("");

  useEffect(() => {
    apiClient
      .get("/browse/new-releases")
      .then(response => {
        console.log("New Releases:", response.data.albums.items);
        setTrendingSongs(response.data.albums.items.slice(0, 8));
      })
      .catch(error => console.error("Error fetching new releases:", error));
  }, []);

  const playSong = (album) => {
    if (album.uri) {
      setCurrentTrackUri(album.uri);
    } else {
      alert("This song cannot be played.");
    }
  };

  return (
    <div className="screen-container">
      <h2>Trending Songs</h2>
      {trendingSongs.length === 0 ? (
        <p>No trending songs found.</p>
      ) : (
        <ul className="trending-list">
          {trendingSongs.map((album, index) => (
            <li key={index} className="trending-item" onClick={() => playSong(album)}>
              <img src={album.images[0]?.url} alt="Album Cover" width="60" />
              <span>{album.name}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Spotify Embed Player */}
      {currentTrackUri && (
        <iframe
          title="Spotify Player"
          src={`https://open.spotify.com/embed/album/${currentTrackUri.split(":")[2]}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="encrypted-media"
        />
      )}
    </div>
  );
}
