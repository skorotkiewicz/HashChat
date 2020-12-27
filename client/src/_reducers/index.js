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
  windowIsActive,
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
  windowIsActive,
});

export default allReducer;
