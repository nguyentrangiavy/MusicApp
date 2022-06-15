import React, { useState, useEffect } from "react";
import Main from "./components/MainComponent";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import AppContext from "./components/AppContext";
import { Audio } from "expo-av";

const store = ConfigureStore();
const playbackObj = new Audio.Sound();
function App() {
  const [currentSong, setCurrentSong] = useState({
    albumName: "Different World",
    category: "Dance/Electronic",
    id: 0,
    image: "images/Alan_Walker_Alone.jpg",
    label: "Trending",
    name: "Alone",
    release: "2018",
    singer: "Alan Walker",
    url: "audios/Alone-AlanWalker.mp3",
  });
  const [soundObj, setSoundObj] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [durationMillis, setDurationMillis] = useState(0);
  const [positionMillis, setPositionMillis] = useState(0);

  const globalVar = {
    currentSong: currentSong,
    setCurrentSong,
    playbackObj: playbackObj,
    soundObj: soundObj,
    setSoundObj,
    isPlaying: isPlaying,
    setIsPlaying,
    durationMillis: durationMillis,
    setDurationMillis,
    positionMillis: positionMillis,
    setPositionMillis,
  };

  return (
    <Provider store={store}>
      <AppContext.Provider value={globalVar}>
        <Main />
      </AppContext.Provider>
    </Provider>
  );
}
export default App;
