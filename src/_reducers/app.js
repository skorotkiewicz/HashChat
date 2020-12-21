export const users = (state = [], action) => {
  switch (action.type) {
    case "setUsers":
      return action.payload;
    default:
      return state;
  }
};
//
export const current = (state = [], action) => {
  switch (action.type) {
    case "setCurrent":
      return action.payload;
    default:
      return state;
  }
};
//
export const unread = (state = [], action) => {
  switch (action.type) {
    case "setUnread":
      return action.payload;
    case "addUnread":
      return [...state, action.payload];
    default:
      return state;
  }
};
//
export const offline = (state = [], action) => {
  switch (action.type) {
    case "addOffline":
      return [...state, action.payload];
    default:
      return state;
  }
};
//