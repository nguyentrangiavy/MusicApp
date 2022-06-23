import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Shadow } from "react-native-shadow-2";
import Slider from "@react-native-community/slider";
import { connect } from "react-redux";
import { baseUrl } from "./../shared/baseUrl";
import {
  play,
  playPause,
  playPreviousOrNext,
  seekToPositionMillis,
  changeLoopMode,
  toggleMute,
} from "../controller/songController";
import AppContext from "./../context/AppContext";
import { postFavorite } from "../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    comments: state.comments,
    favorites: state.favorites,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postFavorite: (songId) => dispatch(postFavorite(songId)),
});

function SongPlayer({ navigation, songs, comments, favorites, postFavorite }) {
  const myContext = useContext(AppContext);
  const { navigate } = navigation;
  const commentsList = comments.comments.filter(
    (cmt) => cmt.songId === myContext.currentSong.id
  );
  useEffect(() => {
    console.log("count song loop: " + myContext.countSongLoop);
    if (myContext.isLoopingList) {
      if (myContext.countSongLoop > 0) {
        const targetId = parseInt(myContext.currentSong.id) + 1;
        var targetSong;
        if (targetId > songs.songs.length - 1) {
          targetSong = songs.songs[0];
        } else {
          targetSong = songs.songs[targetId];
        }
        const status = play(myContext.playbackObj, baseUrl + targetSong.url);
        myContext.setSoundObj(status);
        myContext.setCurrentSong(targetSong);
        myContext.setIsMuted(!myContext.isMuted);
      }
    }
    myContext.playbackObj.setOnPlaybackStatusUpdate(
      myContext.onPlaybackStatusUpdate
    );
  }, [myContext.countSongLoop, myContext.isLoopingList]);
  useEffect(() => {
    myContext.setIsFavorite(
      favorites.some((fa) => fa.id === myContext.currentSong.id)
    );
    // alert(
    //   "change song -> " + myContext.isFavorite + " " + myContext.currentSong.id
    // );
  }, [myContext.currentSong]);
  return (
    <React.Fragment>
      <StatusBar backgroundColor="#222831" />
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topBarItemLeft}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                navigate("Library");
              }}
            >
              <MaterialIcons
                name={"chevron-down"}
                size={36}
                color={"#EEEEEE"}
              />
            </TouchableOpacity>
            <View style={styles.songTitle}>
              <Text style={{ padding: 5, fontSize: 15, color: "#EEEEEE" }}>
                {myContext.currentSong.name.length <= 25
                  ? myContext.currentSong.name
                  : myContext.currentSong.name.substring(0, 22) + "..."}
              </Text>
              <Text
                style={{
                  paddingLeft: 5,
                  paddingRight: 5,
                  paddingBottom: 5,
                  fontSize: 10,
                  color: "#EEEEEE",
                }}
              >
                {myContext.currentSong.singer.length <= 30
                  ? myContext.currentSong.singer
                  : myContext.currentSong.singer.substring(0, 27) + "..."}
              </Text>
            </View>
          </View>
          <View style={styles.topBarItemRight}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                myContext.isFavorite === true
                  ? alert("liked")
                  : myContext.setIsFavorite(true);
                postFavorite(myContext.currentSong.id);
              }}
            >
              <MaterialIcons
                name={myContext.isFavorite === true ? "heart" : "heart-outline"}
                size={30}
                color={myContext.isFavorite === true ? "#F14512" : "#EEEEEE"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
              <MaterialIcons
                name={"playlist-music-outline"}
                size={36}
                color={"#EEEEEE"}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.songContent}>
          <Shadow startColor="#FFFFFF" viewStyle={{ marginBottom: 10 }}>
            <Image
              style={styles.songImage}
              source={{
                uri: baseUrl + myContext.currentSong.image,
              }}
            ></Image>
          </Shadow>
          <View style={styles.songTitle}>
            <Text
              style={{
                textAlign: "center",
                color: "#EEEEEE",
                fontSize: 20,
                fontWeight: "400",
              }}
            >
              {myContext.currentSong.name}
            </Text>
            <Text
              style={{
                textAlign: "center",
                color: "#EEEEEE",
                fontSize: 10,
              }}
            >
              {myContext.currentSong.singer}
            </Text>
          </View>
        </View>
        <View style={styles.controlBar}>
          <Slider
            style={styles.progressSong}
            value={myContext.positionMillis}
            minimumValue={0}
            maximumValue={myContext.durationMillis}
            minimumTrackTintColor="#F15412"
            maximumTrackTintColor="#EEEEEE"
            thumbTintColor="#F15412"
            onSlidingComplete={(value) => {
              seekToPositionMillis(myContext, value);
            }}
          />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              paddingRight: 20,
              paddingLeft: 20,
            }}
          >
            <Text style={{ color: "#F15412" }}>
              {new Date(myContext.positionMillis)
                .toISOString()
                .substring(14, 19)}
            </Text>
            <Text style={{ color: "#F15412" }}>
              {new Date(myContext.durationMillis)
                .toISOString()
                .substring(14, 19)}
            </Text>
          </View>
          <View style={styles.iconsBar}>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                toggleMute(myContext);
              }}
            >
              <MaterialIcons
                name={myContext.isMuted ? "volume-off" : "volume-high"}
                size={30}
                color={myContext.isMuted ? "#F15412" : "#EEEEEE"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                playPreviousOrNext(myContext, songs, "previous");
              }}
            >
              <MaterialIcons
                name={"skip-previous"}
                size={50}
                color={"#EEEEEE"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                playPause(myContext);
              }}
            >
              <MaterialIcons
                name={myContext.isPlaying ? "pause" : "play-circle-outline"}
                size={50}
                color={"#EEEEEE"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                playPreviousOrNext(myContext, songs, "next");
              }}
            >
              <MaterialIcons name={"skip-next"} size={50} color={"#EEEEEE"} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconBtn}
              onPress={() => {
                changeLoopMode(myContext);
              }}
            >
              <MaterialIcons
                name={
                  myContext.isLoopingList ||
                  (!myContext.isLoopingList && !myContext.isLoopingSong)
                    ? "repeat-variant"
                    : "repeat-once"
                }
                size={30}
                color={
                  myContext.isLoopingSong || myContext.isLoopingList
                    ? "#F15412"
                    : "#EEEEEE"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={styles.commentContainer}
          onPress={() => {
            navigate("Comment");
          }}
        >
          <Text style={styles.title}>{"Comments"}</Text>
          <Text style={styles.content}>
            {commentsList.length > 0
              ? "Please write your comments about this song"
              : "Be the first to comment on this song"}
          </Text>
        </TouchableOpacity>
      </View>
    </React.Fragment>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(SongPlayer);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222831",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#222831",
    shadowColor: "#FFFFFF",
    width: Dimensions.get("screen").width,
    alignSelf: "center",
    shadowOffset: {
      height: 12,
      width: 0,
    },
    shadowRadius: 16,
    shadowOpacity: 0.5,
    elevation: 20,
  },
  topBarItemLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  topBarItemRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  songTitle: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  songContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  songImage: {
    width: 300,
    height: 300,
    borderRadius: 300,
  },
  controlBar: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  progressSong: {
    width: "90%",
    height: 40,
  },
  iconsBar: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  iconBtn: {
    padding: 10,
  },
  commentContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "#222831",
    shadowColor: "#FFFFFF",
    borderRadius: 10,
    flexDirection: "column",
    justifyContent: "center",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 16,
    shadowOpacity: 0.5,
    elevation: 5,
  },
  title: {
    alignSelf: "flex-start",
    marginBottom: 10,
    color: "#F15412",
    fontWeight: "bold",
    fontSize: 15,
  },
  content: {
    alignSelf: "center",
    padding: 10,
    fontSize: 12,
    color: "#FFFFFF",
  },
});
