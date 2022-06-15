import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
  StatusBar,
  Dimensions,
} from "react-native";
import Collapsible from "react-native-collapsible";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Shadow } from "react-native-shadow-2";
import Slider from "@react-native-community/slider";
import { connect } from "react-redux";
import { baseUrl } from "./../shared/baseUrl";
import { Avatar, Divider, Input } from "react-native-elements";
import { ScrollView } from "react-native-virtualized-view";

const mapStateToProps = (state) => {
  return {
    songs: state.songs,
    comments: state.comments,
    favorites: state.favorites,
  };
};

class SongPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
    };
  }
  render() {
    const { navigate } = this.props.navigation;
    const songId = parseInt(this.props.route.params.songId);
    const song = this.props.songs.songs[songId];
    const comments = this.props.comments.comments.filter(
      (cmt) => cmt.songId === songId
    );
    if (song != null) {
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
                    {song.name}
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
                    {song.singer}
                  </Text>
                </View>
              </View>
              <View style={styles.topBarItemRight}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                  <MaterialIcons
                    name={"heart-outline"}
                    size={36}
                    color={"#EEEEEE"}
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
            <ScrollView>
              <View style={styles.songContent}>
                <Shadow startColor="#EEEEEE" viewStyle={{ marginBottom: 10 }}>
                  <Image
                    style={styles.songImage}
                    source={{
                      uri: baseUrl + song.image,
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
                    {song.name}
                  </Text>
                  <Text
                    style={{
                      textAlign: "center",
                      color: "#EEEEEE",
                      fontSize: 10,
                    }}
                  >
                    {song.singer}
                  </Text>
                </View>
              </View>
              <View style={styles.controlBar}>
                <Slider
                  style={styles.progressSong}
                  value={10}
                  minimumValue={10}
                  maximumValue={100}
                  minimumTrackTintColor="#F15412"
                  maximumTrackTintColor="#EEEEEE"
                  thumbTintColor="#F15412"
                  onSlidingComplete={() => {}}
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
                  <Text style={{ color: "#F15412" }}>0:00</Text>
                  <Text style={{ color: "#F15412" }}>4:00</Text>
                </View>
                <View style={styles.iconsBar}>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                    <MaterialIcons
                      name={"skip-previous"}
                      size={50}
                      color={"#EEEEEE"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconBtn}
                    onPress={() => {
                      this.props.route.params.sound.pauseAsync();
                    }}
                  >
                    <MaterialIcons
                      name={"play-circle-outline"}
                      size={50}
                      color={"#EEEEEE"}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.iconBtn} onPress={() => {}}>
                    <MaterialIcons
                      name={"skip-next"}
                      size={50}
                      color={"#EEEEEE"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.commentContainer}>
                <View style={styles.commentTitleBar}>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({ isCollapsed: !this.state.isCollapsed })
                    }
                    style={styles.commentTitle}
                  >
                    <Text style={{ color: "#222831" }}>
                      {"Comments (" + comments.length + ")"}
                    </Text>
                    <MaterialIcons
                      name={
                        this.state.isCollapsed === true
                          ? "chevron-down"
                          : "chevron-up"
                      }
                      size={20}
                      color={"#222831"}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.commentList}>
                  <View style={styles.addComment}>
                    <View
                      style={{
                        alignSelf: "center",
                        alignItems: "center",
                        paddingBottom: 20,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                    >
                      <Avatar
                        rounded
                        source={{
                          uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                        }}
                      />
                    </View>
                    <Input
                      inputContainerStyle={styles.newCommentWrapper}
                      style={styles.newComment}
                      placeholder="Enter your comment ..."
                    />
                  </View>
                  <Divider
                    width={2}
                    color="#222831"
                    style={{ marginBottom: 10 }}
                  ></Divider>
                  <Collapsible collapsed={this.state.isCollapsed}>
                    {comments.map((cmt, index) => {
                      return (
                        <View key={index} style={styles.commentLine}>
                          <View style={styles.avatar}>
                            <Avatar
                              rounded
                              source={{
                                uri: "https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg",
                              }}
                            />
                          </View>
                          <View style={styles.infoWrapper}>
                            <View style={styles.info}>
                              <Text style={styles.author}>
                                {cmt.author.length < 15
                                  ? cmt.author
                                  : cmt.author.substring(0, 15) + "..."}
                              </Text>
                              <Text style={styles.date}>
                                {cmt.date.substring(12, 16) +
                                  "  " +
                                  cmt.date.substring(8, 10) +
                                  "/" +
                                  cmt.date.substring(5, 7) +
                                  "/" +
                                  cmt.date.substring(0, 4)}
                              </Text>
                            </View>
                            <Text style={styles.comment}>{cmt.comment}</Text>
                          </View>
                        </View>
                      );
                    })}
                  </Collapsible>
                </View>
              </View>
            </ScrollView>
          </View>
        </React.Fragment>
      );
    } else {
      return <View></View>;
    }
  }
}

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
    shadowColor: "#F9F9F9",
    width: Dimensions.get("screen").width,
    alignSelf: "center",
    shadowOffset: {
      height: 12,
      width: 0,
    },
    shadowRadius: 16,
    shadowOpacity: 0.5,
    elevation: 24,
  },
  topBarItemLeft: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  topBarItemRight: {
    flexDirection: "row",
    justifyContent: "flex-end",
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
  },
  iconBtn: {
    padding: 10,
  },
  commentContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "#73777B",
    borderRadius: 10,
  },
  commentTitleBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  commentTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  addComment: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  newComment: {
    backgroundColor: "#222831",
    borderColor: "#222831",
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 50,
    borderWidth: 2,
    fontSize: 12,
  },
  newCommentWrapper: {
    borderBottomWidth: 0,
    padding: 15,
    marginTop: 10,
  },
  commentList: {
    padding: 10,
  },
  commentLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 5,
    alignSelf: "center",
  },
  avatar: {
    paddingRight: 10,
  },
  infoWrapper: {
    backgroundColor: "#222831",
    borderRadius: 10,
    padding: 10,
    width: 250,
  },
  info: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    padding: 5,
    color: "#EEEEEE",
    fontSize: 12,
    fontWeight: "bold",
  },
  date: {
    padding: 5,
    color: "#EEEEEE",
    fontSize: 10,
    fontStyle: "italic",
    opacity: 0.8,
  },
  comment: {
    padding: 5,
    color: "#EEEEEE",
    fontSize: 12,
  },
});
export default connect(mapStateToProps)(SongPlayer);
