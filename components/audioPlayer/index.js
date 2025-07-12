import React, {useState, useRef, useEffect} from 'react';
import "./audioPlayer.css";
import ProgressCircle from './progressCircle';
import Controls from './controls';
import WaveAnimation from './waveAnimation';

export default function AudioPlayer({ currentTrack, currentIndex, setCurrentIndex, total }) {

const [isPlaying, setIsPlaying] = useState(true);
const [trackProgress, setTrackProgress] = useState(0);
// var audioSrc = total[currentIndex]?.track.preview_url;

const audioRef = useRef(new Audio(currentTrack?.track.preview_url));
// console.log(audioRef.current);
const intervalRef = useRef();
const isReady = useRef(false);
// const { duration } = audioRef.current;



useEffect(() => {
  if (!currentTrack?.preview_url) {
    console.warn("No preview URL available! Redirecting to Spotify...");
    window.open(currentTrack?.external_urls?.spotify, "_blank");
    return;
  }

  audioRef.current.pause();
  audioRef.current = new Audio(currentTrack?.preview_url);
  audioRef.current.volume = 0.5;
  setTrackProgress(audioRef.current.currentTime);

  if (isReady.current) {
    audioRef.current.play().catch(err => console.error("Playback error:", err));
    setIsPlaying(true);
    startTimer();
  } else {
    isReady.current = true;
  }
}, [currentIndex, currentTrack]);

useEffect(() => {
  return () => {
    audioRef.current.pause();
    clearInterval(intervalRef.current);
  };
}, []);

const startTimer = () => {
  clearInterval(intervalRef.current);
  intervalRef.current = setInterval(() => {
    if (audioRef.current.ended) {
      handleNext();
    } else {
      setTrackProgress(audioRef.current.currentTime);
    }
  }, 1000);
};

const handleNext = () => {
  setCurrentIndex((prev) => (prev + 1) % total.length);
};

const handlePrev = () => {
  setCurrentIndex((prev) => (prev === 0 ? total.length - 1 : prev - 1));
};

  const artists = [];
  currentTrack?.album?.artists.forEach((artist) =>{
    artists.push(artist.name);
  })
  return (
    <div className="player-body flex">
        <div className="player-left-body">
            <ProgressCircle 
            percentage={(trackProgress / audioRef.current.duration) * 100}
            isPlaying={true}
            image={currentTrack?.album?.images[0]?.url}
            size={300}
            color="#C96850"
            />
        </div>
        <div className="player-right-body flex">
          <p className="song-title">{currentTrack?.name}</p>
          <p className="song-artist">{artists.join(" | ")}</p>

 {/* 🟢 Spotify Embed Player (Same Page Playback) */}
 {currentTrack?.id && (
          <iframe
            src={`https://open.spotify.com/embed/track/${currentTrack.id}`}
            width="100%"
            height="80"
            frameBorder="0"
            allowtransparency="true"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        )}


          <div className="player-right-bottom flex">
            <div className="song-duration flex">
              <p className="duration">0:01</p>
              <WaveAnimation isPlaying={true} />
              <p className="duration">0:30</p>
            </div>
            <Controls
            isPlaying={isPlaying}
            setIsPlaying={setIsPlaying}
            handleNext={handleNext}
            handlePrev={handlePrev}
            total={total}
            />
          </div>
        </div>
    </div>
  );
}
