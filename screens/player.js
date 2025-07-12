// import React, { useEffect, useState } from 'react'
// import "./player.css"
// import { useLocation } from 'react-router-dom'
// import apiClient from '../spotify';
// import SongCard from '../components/songCard';
// import Queue from '../components/queue';
// import AudioPlayer from '../components/audioPlayer';

// export default function Player() {
// const location = useLocation();
// const [tracks, setTracks] = useState([]);
// const [currentTrack, setCurrentTrack] = useState({});
// const [currentIndex, setCurrentIndex] = useState(0);



// useEffect(() =>{
//   if(location.state){
//     apiClient.get("playlists/"+ location.state?.id +"/tracks")
//   .then((res) => {
//    setTracks(res.data.items);
//    setCurrentTrack(res.data.items[0].track);
//   });
//   }
// }, [location.state]);

// useEffect(() => {
//   setCurrentTrack(tracks[currentIndex]?.track);
// }, [currentIndex, tracks]);

//   return (
//     <div className="screen-container flex">
//       <div className="left-player-body">
//         <AudioPlayer currentTrack={currentTrack} 
//         total={tracks}
//         currentIndex={currentIndex}
//         setCurrentIndex={setCurrentIndex}
//          />

//       </div>
//       <div className="right-player-body">
//         <SongCard album={currentTrack?.album} />
//         <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
//       </div>
//     </div>
//   )
// }

import React, { useEffect, useState } from 'react';
import "./player.css";
import { useLocation } from 'react-router-dom';
import apiClient from '../spotify';
import SongCard from '../components/songCard';
import Queue from '../components/queue';
import AudioPlayer from '../components/audioPlayer';
import Widgets from '../components/widgets';

 
export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (location.state) {
      apiClient.get(`playlists/${location.state?.id}/tracks`)
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data.items[0]?.track || {});
        });
    }
  }, [location.state]);

  useEffect(() => {
    setCurrentTrack(tracks[currentIndex]?.track || {});
  }, [currentIndex, tracks]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">

      {currentTrack?.id ? (
          // 🟢 Spotify Embed Player (Same Page Playback)
          <iframe
            src={`https://open.spotify.com/embed/track/${currentTrack.id}`}
            width="100%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        ) : (
          <p>No track selected</p>
        )}

  
<Widgets artistID={currentTrack?.album?.artists[0]?.id} />  
      </div>

      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
     
    </div>
  );
}




