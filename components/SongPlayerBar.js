import { Component, useContext } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Avatar } from "react-native-elements";
import { baseUrl } from "./../shared/baseUrl";
import AppContext from "./AppContext";

function SongPlayerBar({ song, playPause }) {
  const myContext = useContext(AppContext);

  return (
    <View style={styles.songBar}>
      <View style={styles.songBarItemLeft}>
        <Avatar
          rounded
          containerStyle={styles.avatar}
          source={{
            uri: baseUrl + song.image,
          }}
        />
        <View style={styles.songTitle}>
          <Text style={{ fontSize: 12, color: "#EEEEEE" }}>
            {song.name.length <= 25
              ? song.name
              : song.name.substring(0, 22) + "..."}
          </Text>
          <Text
            style={{
              fontSize: 10,
              color: "#EEEEEE",
            }}
          >
            {song.singer.length <= 30
              ? song.singer
              : song.singer.substring(0, 27) + "..."}
          </Text>
        </View>
      </View>
      <View style={styles.songBarItemRight}>
        <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
          <MaterialIcons name={"skip-previous"} size={36} color={"#EEEEEE"} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconBtn}
          onPress={() => {
            playPause();
          }}
        >
          <MaterialIcons
            name={myContext.isPlaying ? "pause" : "play-circle-outline"}
            size={36}
            color={"#EEEEEE"}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
          <MaterialIcons name={"skip-next"} size={36} color={"#EEEEEE"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
export default SongPlayerBar;
const styles = StyleSheet.create({
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
