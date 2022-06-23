import React, { useState, useEffect } from "react";
import Main from "./screens/Main";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/ConfigureStore";
import AppContext from "./context/AppContext";
import { Audio } from "expo-av";
import { baseUrl } from "./shared/baseUrl";
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { LogBox } from "react-native";

const store = ConfigureStore();
const defaultSong = {
  albumName: "Different World",
  category: "Dance/Electronic",
  id: 0,
  image: "images/Alan_Walker_Alone.jpg",
  label: "Trending",
  name: "Alone",
  release: "2018",
  singer: "Alan Walker",
  url: "audios/Alone-AlanWalker.mp3",
};
const durationDefault = 160000;
const playbackObj = new Audio.Sound();
const status = playbackObj.loadAsync(
  {
    uri: baseUrl + defaultSong.url,
  },
  {
    shouldPlay: false,
    progressUpdateIntervalMillis: 1000,
  }
);
var sound = status.then((value) => (sound = value));
//configure firebase
const firebaseConfig = {
  apiKey: "AIzaSyAQe4iEFe7KusmsMPVpxaiDxeTbBxaSMkY",
  authDomain: "musicapp-authentication.firebaseapp.com",
  projectId: "musicapp-authentication",
  storageBucket: "musicapp-authentication.appspot.com",
  messagingSenderId: "657321844236",
  appId: "1:657321844236:web:da547a92aadc2b040c1829",
  measurementId: "G-G7B3LX5ZF6",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core and will be removed in a future release. It can now be installed and imported from '@react-native-async-storage/async-storage' instead of 'react-native'. See https://github.com/react-native-async-storage/async-storage",
  ]);
  const auth = getAuth(app);
  const [user, setUser] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [currentSong, setCurrentSong] = useState(defaultSong);
  const [soundObj, setSoundObj] = useState(sound);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [countSongLoop, setCountSongLoop] = useState(0);
  const [isLoopingSong, setIsLoopingSong] = useState(false);
  const [isLoopingList, setIsLoopingList] = useState(false);
  const [durationMillis, setDurationMillis] = useState(durationDefault);
  const [positionMillis, setPositionMillis] = useState(0);
  const onPlaybackStatusUpdate = async (playbackStatus) => {
    if (playbackStatus.isLoaded && playbackStatus.isPlaying) {
      setPositionMillis(playbackStatus.positionMillis);
      setDurationMillis(playbackStatus.durationMillis);
      setIsPlaying(true);
    }
    if (playbackStatus.isLoaded && !playbackStatus.isPlaying) {
      setPositionMillis(playbackStatus.positionMillis);
      setDurationMillis(playbackStatus.durationMillis);
      setIsPlaying(false);
    }
    if (playbackStatus.didJustFinish) {
      if (isLoopingList) {
        setCountSongLoop(countSongLoop + 1);
      } else {
        setPositionMillis(0);
        setCountSongLoop(0);
        setIsPlaying(false);
      }
    }
    if (playbackStatus.isMuted) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };
  const globalVar = {
    auth: auth,
    user: user,
    setUser,
    loaded: loaded,
    setLoaded,
    currentSong: currentSong,
    setCurrentSong,
    countSongLoop: countSongLoop,
    setCountSongLoop,
    playbackObj: playbackObj,
    soundObj: soundObj,
    setSoundObj,
    isPlaying: isPlaying,
    setIsPlaying,
    isMuted: isMuted,
    setIsMuted,
    isFavorite: isFavorite,
    setIsFavorite,
    isLoopingSong: isLoopingSong,
    setIsLoopingSong,
    isLoopingList: isLoopingList,
    setIsLoopingList,
    durationMillis: durationMillis,
    setDurationMillis,
    positionMillis: positionMillis,
    setPositionMillis,
    onPlaybackStatusUpdate,
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
