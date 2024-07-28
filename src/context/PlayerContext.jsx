import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

// 1.Create context
export const PlayerContext = createContext();

// 2.Create provider component
const PlayerContextProvider = ({ children }) => {
  // useRef
  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  // useState
  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  function playTrack() {
    audioRef.current.play();
    setPlayStatus(true);
  }

  function pauseTrack() {
    audioRef.current.pause();
    setPlayStatus(false);
  }

  const playWithId = async (id) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPlayStatus(true);
  };

  const previous = async (id) => {
    if (id > 0) {
      await setTrack(songsData[id - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    } else {
      await setTrack(songsData[songsData.length - 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const next = async (id) => {
    if (id < songsData.length - 1) {
      await setTrack(songsData[id + 1]);
      await audioRef.current.play();
      setPlayStatus(true);
    } else {
      await setTrack(songsData[0]);
      await audioRef.current.play();
      setPlayStatus(true);
    }
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const handleTimeUpdate = () => {
      const width =
        Math.floor((audio.currentTime * 100) / audio.duration) + "%";
      seekBar.current.style.width = width;
      setTime((prevTime) => ({
        ...prevTime,
        currentTime: {
          second: Math.floor(audio.currentTime % 60),
          minute: Math.floor(audio.currentTime / 60),
        },
      }));
    };

    const handleLoadedMetadata = () => {
      // Only add the timeupdate listener after the metadata is loaded
      audio.addEventListener("timeupdate", handleTimeUpdate);
      // Update the total time immediately after metadata is loaded
      setTime((prevTime) => ({
        ...prevTime,
        totalTime: {
          second: Math.floor(audio.duration % 60),
          minute: Math.floor(audio.duration / 60),
        },
      }));
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBar,
    seekBg,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    playTrack,
    pauseTrack,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
