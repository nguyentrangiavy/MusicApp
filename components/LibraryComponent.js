import { useState, useContext, useEffect } from "react";
import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import CarouselCards from "./CarouselCardsComponent";
import { connect } from "react-redux";
import SongPlayerBar from "./SongPlayerBar";
import AppContext from "./AppContext";
import { baseUrl } from "./../shared/baseUrl";
import {
  play,
  playOther,
  replay,
  pause,
  resume,
  playPrevious,
} from "../misc/songController";
import Loading from "./LoadingComponent";

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
  };
};

function Library({ navigation, songs }) {
  const myContext = useContext(AppContext);
  const trendingSongs = songs.songs.filter(
    (songs) => songs.label === "Trending"
  );
  const newSongs = songs.songs.filter((songs) => songs.label === "New");
  const danceSongs = songs.songs.filter(
    (songs) => songs.category === "Dance/Electronic"
  );
  const popSongs = songs.songs.filter((songs) => songs.category === "Pop");

  const pressSong = async (song) => {
    if (myContext.soundObj === null) {
      const status = await play(myContext.playbackObj, baseUrl + song.url);
      myContext.setSoundObj(status);
      myContext.setCurrentSong(song);
      myContext.setIsPlaying(true);
      console.log("Playing first song...");
    } else {
      if (myContext.currentSong.id !== song.id) {
        const status = await playOther(
          myContext.playbackObj,
          baseUrl + song.url
        );
        myContext.setSoundObj(status);
        myContext.setCurrentSong(song);
        myContext.setIsPlaying(true);
        console.log("Playing another song...");
      } else {
        const playbackStatus = await myContext.playbackObj.getStatusAsync();
        if (playbackStatus.isPlaying === false) {
          await replay(myContext.playbackObj);
          myContext.setIsPlaying(true);
          console.log("Playing song again after finished...");
        }
      }
    }
  };
  const playPause = async () => {
    const playbackStatus = await myContext.playbackObj.getStatusAsync();
    console.log(playbackStatus.isPlaying + " - " + playbackStatus.isLoaded);
    if (playbackStatus.isPlaying === true && playbackStatus.isLoaded === true) {
      const status = await pause(myContext.playbackObj);
      myContext.setSoundObj(status);
      myContext.setPositionMillis(playbackStatus.positionMillis);
      myContext.setIsPlaying(false);
      console.log("paused");
    }
    if (
      playbackStatus.isPlaying === false &&
      playbackStatus.isLoaded === true
    ) {
      await resume(myContext.playbackObj, myContext.positionMillis);
      myContext.setIsPlaying(true);
      console.log("resumed");
    }
  };
  const playPreviousSong = async () => {
    const previousSong = songs.songs.filter(
      (song) => song.id === myContext.currentSong.id
    );
    const status = await playPrevious(
      myContext.playbackObj,
      baseUrl + previousSong.url
    );
  };
  if (songs != null) {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="#222831" />
        <View style={styles.container}>
          <ScrollView>
            <CarouselCards
              title={"Trending"}
              colorTitle={"#F32424"}
              iconName={"fire"}
              navigation={navigation}
              songs={trendingSongs}
              context={myContext}
              pressSong={pressSong}
            />
            <CarouselCards
              title={"New"}
              colorTitle={"#5FD068"}
              iconName={"new-box"}
              navigation={navigation}
              songs={newSongs}
              context={myContext}
              pressSong={pressSong}
            />
            <CarouselCards
              title={"Dance/Electronic"}
              colorTitle={"#A760FF"}
              iconName={"music"}
              navigation={navigation}
              songs={danceSongs}
              context={myContext}
              pressSong={pressSong}
            />
            <CarouselCards
              title={"Pop"}
              colorTitle={"#1363DF"}
              iconName={"music-note"}
              navigation={navigation}
              songs={popSongs}
              context={myContext}
              pressSong={pressSong}
            />
          </ScrollView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("SongPlayer", {
                songId: myContext.currentSong.id,
              })
            }
          >
            <SongPlayerBar song={myContext.currentSong} playPause={playPause} />
          </TouchableOpacity>
        </View>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="#222831" />
        <View style={styles.container}>
          <ScrollView>
            <Loading />
            <Loading />
            <Loading />
            <Loading />
          </ScrollView>
          <Loading />
        </View>
      </React.Fragment>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width + 50,
    backgroundColor: "#222831",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  songBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#222831",
    width: Dimensions.get("screen").width,
    height: 60,
    alignItems: "center",
  },
  songBarItemLeft: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    margin: 10,
  },
  iconBtn: {
    margin: 10,
  },
  songBarItemRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  songTitle: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
export default connect(mapStateToProps)(Library);
