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
  tags,
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
  tags,
});

export default allReducer;
