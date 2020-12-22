import { combineReducers } from "redux";
import {
  current,
  unread,
  users,
  offline,
  usersModalOpen,
  translation,
} from "./app";

const allReducer = combineReducers({
  current,
  unread,
  users,
  offline,
  usersModalOpen,
  translation,
});

export default allReducer;
