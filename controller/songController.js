import { baseUrl } from "./../shared/baseUrl";

// play song
export const play = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    await playbackObj.loadAsync(
      { uri: uri },
      { shouldPlay: true, progressUpdateIntervalMillis: 1000 }
    );
  } catch (error) {
    console.log("error inside play helper method", error.message);
  }
};
//replay song
export const replay = async (playbackObj) => {
  try {
    await playbackObj.replayAsync();
  } catch (error) {
    console.log("error inside replay helper method", error.message);
  }
};
//pause song
export const pause = async (playbackObj) => {
  try {
    return await playbackObj.pauseAsync();
  } catch (error) {
    console.log("error inside pause helper method", error.message);
  }
};
//resume song
export const resume = async (playbackObj, positionMillis) => {
  try {
    await playbackObj.playFromPositionAsync(positionMillis);
  } catch (error) {
    console.log("error inside resume helper method", error.message);
  }
};

// press song to play
export const pressSong = async (myContext, song) => {
  const playbackStatus = await myContext.playbackObj.getStatusAsync();
  if (myContext.currentSong.id !== song.id) {
    const status = await play(myContext.playbackObj, baseUrl + song.url);
    myContext.setSoundObj(status);
    myContext.setCurrentSong(song);
    console.log("Playing song...");
  } else {
    if (!playbackStatus.isPlaying) {
      const status = await replay(myContext.playbackObj);
      myContext.setSoundObj(status);
      console.log("Playing song again after finished...");
    }
  }
  myContext.playbackObj.setOnPlaybackStatusUpdate(
    myContext.onPlaybackStatusUpdate
  );
};

export const playPause = async (myContext) => {
  const playbackStatus = await myContext.playbackObj.getStatusAsync();
  // is playing
  if (playbackStatus.isPlaying && playbackStatus.isLoaded) {
    const status = await pause(myContext.playbackObj);
    myContext.setSoundObj(status);
    console.log("paused");
  }
  if (!playbackStatus.isPlaying && playbackStatus.isLoaded) {
    // is paused
    const status = await resume(
      myContext.playbackObj,
      myContext.positionMillis
    );
    myContext.setSoundObj(status);
    console.log("resumed");
  }
  myContext.playbackObj.setOnPlaybackStatusUpdate(
    myContext.onPlaybackStatusUpdate
  );
};

// play previous or play next
export const playPreviousOrNext = async (myContext, songs, type) => {
  //songs is state => songs.songs is array
  var targetId;
  var targetSong;
  if (type === "previous") {
    targetId = parseInt(myContext.currentSong.id) - 1;
    // first song move to last song
    if (targetId < 0) {
      targetSong = songs.songs[songs.songs.length - 1];
    } else {
      targetSong = songs.songs[targetId];
    }
  } else {
    targetId = parseInt(myContext.currentSong.id) + 1;
    // last song move to first song
    if (targetId > songs.songs.length - 1) {
      targetSong = songs.songs[0];
    } else {
      targetSong = songs.songs[targetId];
    }
  }
  const status = await play(myContext.playbackObj, baseUrl + targetSong.url);
  myContext.setSoundObj(status);
  myContext.setCurrentSong(targetSong);
  console.log("play previous song...");
  myContext.playbackObj.setOnPlaybackStatusUpdate(
    myContext.onPlaybackStatusUpdate
  );
};

// seek to positionMillis
export const seekToPositionMillis = async (myContext, positionMillis) => {
  const playbackStatus = await myContext.playbackObj.getStatusAsync();
  // is playing
  if (playbackStatus.isPlaying && playbackStatus.isLoaded) {
    const status = await myContext.playbackObj.playFromPositionAsync(
      positionMillis
    );
    myContext.setSoundObj(status);
    console.log("playing seek to: " + positionMillis);
  }
  if (!playbackStatus.isPlaying && playbackStatus.isLoaded) {
    // is paused
    myContext.setPositionMillis(positionMillis);
    console.log("stoped seek to: " + positionMillis);
  }
};
// looping song
export const changeLoopMode = async (myContext) => {
  const playbackStatus = await myContext.playbackObj.getStatusAsync();
  if (!myContext.isLoopingSong && !myContext.isLoopingList) {
    //set looping list is true
    myContext.setIsLoopingList(!myContext.isLoopingList);
  }
  if (!myContext.isLoopingSong && myContext.isLoopingList) {
    const status = await myContext.playbackObj.setIsLoopingAsync(
      !playbackStatus.isLooping
    );
    //set looping list is false and looping song is true
    myContext.setSoundObj(status);
    myContext.setIsLoopingSong(!playbackStatus.isLooping);
    myContext.setIsLoopingList(!myContext.isLoopingList);
  }
  if (myContext.isLoopingSong && !myContext.isLoopingList) {
    //set looping song is false
    const status = await myContext.playbackObj.setIsLoopingAsync(
      !playbackStatus.isLooping
    );
    myContext.setSoundObj(status);
    myContext.setIsLoopingSong(!playbackStatus.isLooping);
  }
};

export const toggleMute = async (myContext) => {
  const playbackStatus = await myContext.playbackObj.getStatusAsync();
  const status = await myContext.playbackObj.setIsMutedAsync(
    !playbackStatus.isMuted
  );
  myContext.setSoundObj(status);
  myContext.setIsMuted(!playbackStatus.isMuted);
};
//
