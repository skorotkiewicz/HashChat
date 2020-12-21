export const setCurrent = (msg) => {
  return {
    type: "setCurrent",
    payload: msg,
  };
};
//
export const setUnread = (msg) => {
  return {
    type: "setUnread",
    payload: msg,
  };
};
//
export const addUnread = (msg) => {
  return {
    type: "addUnread",
    payload: msg,
  };
};
//
export const setUsers = (msg) => {
  return {
    type: "setUsers",
    payload: msg,
  };
};
//
export const addOffline = (msg) => {
  return {
    type: "addOffline",
    payload: msg,
  };
};