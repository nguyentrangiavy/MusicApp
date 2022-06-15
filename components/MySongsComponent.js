import React, { Component } from "react";
import { StyleSheet, Dimensions, View } from "react-native";
import SongPlayerBar from "./SongPlayerBar";

class MySongs extends Component {
  render() {
    return (
      <React.Fragment>
        <View style={styles.container}>
          {/* <SongPlayerBar song={}></SongPlayerBar> */}
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
});
export default MySongs;
