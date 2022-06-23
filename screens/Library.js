import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import CarouselCards from "../components/CarouselCardsComponent";
import { connect } from "react-redux";
import SongPlayerBar from "../components/SongPlayerBar";
import AppContext from "../context/AppContext";
import { pressSong } from "../controller/songController";
import Loading from "../components/LoadingComponent";

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
  useEffect(() => {
    // Loading 3s before show screen content

    if (!myContext.loaded) {
      setTimeout(() => {
        myContext.setLoaded(true);
        // myContext.setSongs(songs);
      }, 3000);
    }
  }, []);
  if (myContext.loaded) {
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
            <SongPlayerBar />
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
