import React, { useState, useContext } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { Avatar, Button } from "react-native-elements";
import MaterialIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";
import AppContext from "./../context/AppContext";
import { postComment } from "./../redux/ActionCreators";

const mapStateToProps = (state) => {
  return {
    comments: state.comments,
  };
};
const mapDispatchToProps = (dispatch) => ({
  postComment: (songId, author, comment, avatar) =>
    dispatch(postComment(songId, author, comment, avatar)),
});
function Comment({ comments, navigation, postComment }) {
  const myContext = useContext(AppContext);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [comment, setComment] = useState("");
  const submitComment = (songId, author, comment, avatar) => {
    postComment(songId, author, comment, avatar);
    setComment("");
  };
  const commentsList = comments.comments.filter(
    (cmt) => cmt.songId === myContext.currentSong.id
  );
  if (commentsList.length > 5) {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="#222831" />
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.commentTitleBar}
              onPress={() => navigation.navigate("SongPlayer")}
            >
              <MaterialIcons name={"arrow-left"} size={30} color={"#EEEEEE"} />
              <Text style={styles.commentTitle}>
                {"Comments (" + commentsList.length + ")"}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {commentsList.slice(0, 5).map((cmt, index) => {
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
                      <Text style={styles.date}>{cmt.date}</Text>
                    </View>
                    <Text style={styles.comment}>{cmt.comment}</Text>
                  </View>
                </View>
              );
            })}
            <Collapsible collapsed={isCollapsed}>
              {commentsList.slice(5, commentsList.length).map((cmt, index) => {
                return (
                  <View key={index} style={styles.commentLine}>
                    <View style={styles.avatar}>
                      <Avatar
                        rounded
                        source={{
                          uri: cmt.avatar,
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
                        <Text style={styles.date}>{cmt.date}</Text>
                      </View>
                      <Text style={styles.comment}>{cmt.comment}</Text>
                    </View>
                  </View>
                );
              })}
            </Collapsible>
            <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)}>
              <Text style={styles.collapseComment}>
                {isCollapsed ? "See more" : "Collapse"}
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <View style={styles.addComment}>
            <View style={styles.avatarUser}>
              <Avatar
                rounded
                source={{
                  uri: myContext.user.avatar,
                }}
              />
            </View>
            <TextInput
              style={styles.newComment}
              placeholder="Enter your comment ..."
              placeholderTextColor={"#FFFFFF"}
              value={comment}
              onChangeText={(value) => {
                setComment(value);
              }}
            />
            <Button
              title={"Send"}
              color={"#F14512"}
              disabled={comment.trim().length === 0 ? true : false}
              onPress={() =>
                submitComment(
                  myContext.currentSong.id,
                  myContext.user.name,
                  comment,
                  myContext.user.avatar
                )
              }
            />
          </View>
        </View>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <StatusBar backgroundColor="#222831" />
        <View style={styles.container}>
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.commentTitleBar}
              onPress={() => navigation.navigate("SongPlayer")}
            >
              <MaterialIcons name={"arrow-left"} size={30} color={"#EEEEEE"} />
              <Text style={styles.commentTitle}>
                {"Comments (" + commentsList.length + ")"}
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
            {commentsList.map((cmt, index) => {
              return (
                <View key={index} style={styles.commentLine}>
                  <View style={styles.avatar}>
                    <Avatar
                      rounded
                      source={{
                        uri: cmt.avatar,
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
                      <Text style={styles.date}>{cmt.date}</Text>
                    </View>
                    <Text style={styles.comment}>{cmt.comment}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.addComment}>
            <View style={styles.avatarUser}>
              <Avatar
                rounded
                source={{
                  uri: myContext.user.avatar,
                }}
              />
            </View>
            <TextInput
              style={styles.newComment}
              placeholder="Enter your comment ..."
              placeholderTextColor={"#FFFFFF"}
              value={comment}
              onChangeText={(value) => {
                setComment(value);
              }}
            />
            <Button
              title={"Send"}
              type={"solid"}
              buttonStyle={styles.btn}
              disabled={comment.trim().length === 0 ? true : false}
              onPress={() =>
                submitComment(
                  myContext.currentSong.id,
                  myContext.user.name,
                  comment,
                  myContext.user.avatar
                )
              }
            />
          </View>
        </View>
      </React.Fragment>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Comment);

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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#222831",
    width: Dimensions.get("screen").width,
    alignSelf: "center",
    shadowColor: "#FFFFFF",
    shadowOffset: {
      height: 12,
      width: 0,
    },
    shadowRadius: 16,
    shadowOpacity: 0.5,
    elevation: 24,
    zIndex: 5,
  },
  commentTitleBar: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    alignItems: "center",
  },
  commentTitle: {
    flexDirection: "row",
    justifyContent: "flex-start",
    fontSize: 18,
    color: "#FFFFFF",
    alignSelf: "baseline",
    marginLeft: 10,
  },
  addComment: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    width: Dimensions.get("screen").width,
    backgroundColor: "#222831",
    shadowColor: "#FFFFFF",
    shadowOffset: {
      height: -15,
      width: 0,
    },
    shadowRadius: 10,
    shadowOpacity: 0.5,
    elevation: 24,
    zIndex: 6,
  },
  newComment: {
    color: "#FFFFFF",
    backgroundColor: "transparent",
    borderColor: "#FFFFFF",
    width: Dimensions.get("screen").width * 0.6,
    height: 50,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 55,
    borderWidth: 2,
    fontSize: 12,
  },
  newCommentWrapper: {
    borderBottomWidth: 0,
    alignContent: "flex-end",
    alignSelf: "flex-start",
    textAlignVertical: "center",
  },
  commentLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    width: Dimensions.get("screen").width * 0.9,
  },
  avatar: {
    alignSelf: "flex-start",
    width: Dimensions.get("screen").width * 0.1,
    paddingTop: 5,
  },
  avatarUser: {
    alignSelf: "center",
    width: Dimensions.get("screen").width * 0.1,
  },
  infoWrapper: {
    backgroundColor: "#222831",
    borderRadius: 10,
    padding: 10,
    backgroundColor: "#FFFFFF",
    width: Dimensions.get("screen").width * 0.8,
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
    color: "#000000",
  },
  date: {
    padding: 5,
    color: "#EEEEEE",
    fontSize: 10,
    fontStyle: "italic",
    opacity: 0.8,
    color: "#000000",
  },
  comment: {
    padding: 5,
    color: "#EEEEEE",
    fontSize: 12,
    color: "#000000",
  },
  collapseComment: {
    alignSelf: "center",
    color: "#F15412",
    textDecorationLine: "underline",
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#F14512",
    borderRadius: 15,
    padding: 10,
  },
});
