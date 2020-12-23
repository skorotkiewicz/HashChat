import { combineReducers } from "redux";
import {
  current,
  unread,
  users,
  offline,
  usersModalOpen,
  translation,
  language,
  theme,
} from "./app";

const allReducer = combineReducers({
  current,
  unread,
  users,
  offline,
  usersModalOpen,
  translation,
  language,
  theme,
});

export default allReducer;
