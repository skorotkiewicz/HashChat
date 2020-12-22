import { combineReducers } from "redux";
import { current, unread, users, offline, usersModalOpen } from "./app";

const allReducer = combineReducers({
  current,
  unread,
  users,
  offline,
  usersModalOpen,
});

export default allReducer;
