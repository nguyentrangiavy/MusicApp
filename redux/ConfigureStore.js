import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { songs } from "./songs";
import { comments } from "./comments";
import { favorites } from "./favorites";
export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({ songs, comments, favorites }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
