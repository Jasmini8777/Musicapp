import React, { useState, useEffect } from "react";
import "./feed.css"
import apiClient from "../spotify";

export default function Feed() {
  const [latestSongs, setLatestSongs] = useState([]);
  const [currentTrackUri, setCurrentTrackUri] = useState("");

  useEffect(() => {
    apiClient
      .get("/browse/new-releases")
      .then(response => {
        console.log("Latest Releases Response:", response.data);
        if (response.data.albums && response.data.albums.items) {
          const songs = response.data.albums.items.slice(0, 12);
          setLatestSongs(songs);
        } else {
          console.error("Invalid data format:", response.data);
        }
      })
      .catch(error => console.error("Error fetching latest releases:", error));
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
      <h2>Latest Songs</h2>
      {latestSongs.length === 0 ? (
        <p>No latest songs found.</p>
      ) : (
        <ul className="feed-list">
          {latestSongs.map((album, index) => (
            <li key={index} className="feed-item" onClick={() => playSong(album)}>
              {album.images.length > 0 && (
                <img src={album.images[0]?.url} alt="Album Cover" width="50" />
              )}
              <span>{album.name} - {album.artists.map(artist => artist.name).join(", ")}</span>
            </li>
          ))}
        </ul>
      )}

      {/* Spotify Player (Opens Full Song in Spotify) */}
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
