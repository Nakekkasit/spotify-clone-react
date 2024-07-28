import React, { useContext } from "react";
import Display from "./components/Display";
import Player from "./components/Player";
import SideBar from "./components/SideBar";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  // Consume context
  const { audioRef, track } = useContext(PlayerContext);

  return (
    <div className="h-screen bg-black">
      <div className="h-[87%] flex">
        <SideBar />
        <Display />
      </div>
      <Player />
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
    </div>
  );
};

export default App;
