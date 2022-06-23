import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

// songs
export const fetchSongs = () => (dispatch) => {
  dispatch(songsLoading());
  return fetch(baseUrl + "songs")
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((songs) => dispatch(addSongs(songs)))
    .catch((error) => dispatch(songsFailed(error.message)));
};
const songsLoading = () => ({
  type: ActionTypes.SONGS_LOADING,
});
const songsFailed = (errmess) => ({
  type: ActionTypes.SONGS_FAILED,
  payload: errmess,
});
const addSongs = (songs) => ({
  type: ActionTypes.ADD_SONGS,
  payload: songs,
});

// comments
export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const commentsFailed = (errmess) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errmess,
});
const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});
export const postComment = (songId, author, comment, avatar) => (dispatch) => {
  var newcmt = {
    songId: songId,
    author: author,
    avatar: avatar,
    comment: comment,
    date:
      new Date().toLocaleTimeString().substring(0, 5) +
      " " +
      new Date().toLocaleDateString().substring(3, 6) +
      new Date().toLocaleDateString().substring(0, 3) +
      new Date().toLocaleDateString().substring(6, 8),
  };
  fetch(baseUrl + "comments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newcmt),
  })
    .then((response) => {
      if (!response.ok)
        throw Error("Error " + response.status + ": " + response.statusText);
      else return response.json();
    })
    .then((cmt) => dispatch(addComment(cmt)))
    .catch((error) => dispatch(commentsFailed(error.message)));
};
const addComment = (newcmt) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: newcmt,
});

// favorites
export const postFavorite = (songId) => (dispatch) => {
  dispatch(addFavorite(songId));
};
const addFavorite = (songId) => ({
  type: ActionTypes.ADD_FAVORITE,
  payload: songId,
});
