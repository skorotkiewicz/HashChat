import { combineReducers } from "redux";
import { current, unread, users, offline } from "./app";

const allReducer = combineReducers({
  current,
  unread,
  users,
  offline,
});

export default allReducer;
