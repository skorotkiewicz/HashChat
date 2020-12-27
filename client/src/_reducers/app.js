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
export const usersModalOpen = (state = false, action) => {
  switch (action.type) {
    case "setUsersModalOpen":
      return action.payload;
    default:
      return state;
  }
};
//
export const translation = (state = [], action) => {
  switch (action.type) {
    case "setTranslation":
      return action.payload;
    default:
      return state;
  }
};
//
export const language = (state = "en", action) => {
  switch (action.type) {
    case "setLanguage":
      return action.payload;
    default:
      return state;
  }
};
//
export const theme = (state = "nifor", action) => {
  switch (action.type) {
    case "setTheme":
      return action.payload;
    default:
      return state;
  }
};
//
export const windowIsActive = (state = true, action) => {
  switch (action.type) {
    case "setWindowIsActive":
      return action.payload;
    default:
      return state;
  }
};
