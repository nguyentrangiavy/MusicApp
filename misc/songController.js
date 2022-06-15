// play song
export const play = async (playbackObj, uri) => {
  try {
    await playbackObj.loadAsync({ uri: uri });
    await playbackObj.playAsync();
  } catch (error) {
    console.log("error inside play helper method", error.message);
  }
};
// stop song to load and play new song
export const playOther = async (playbackObj, uri) => {
  try {
    await playbackObj.stopAsync();
    await playbackObj.unloadAsync();
    await play(playbackObj, uri);
  } catch (error) {
    console.log("error inside playOther helper method", error.message);
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
//play previous song
export const playPrevious = async (playbackObj, url) => {
  try {
    await playOther(playbackObj, url);
  } catch (error) {
    console.log("error inside playPrevious helper method", error.message);
  }
};
