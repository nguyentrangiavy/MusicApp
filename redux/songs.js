import * as ActionTypes from "./ActionTypes";

export const songs = (
  state = { isLoading: true, errMess: null, songs: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_SONGS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        songs: action.payload,
      };
    case ActionTypes.SONGS_LOADING:
      return { ...state, isLoading: true, errMess: null, songs: [] };
    case ActionTypes.SONGS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
