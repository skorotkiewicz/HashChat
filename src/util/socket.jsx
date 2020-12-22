import io from "socket.io-client";

// socket = io(ENDPOINT, { autoConnect: true, reconnection: true });

let ENDPOINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/"
    : "https://bit-hashchat.herokuapp.com/";

export const socket = io(ENDPOINT);

export const ftyping = (current, setTypingA, status = false) => {
  socket.emit("mtyp", {
    to: current.id,
    typing: status,
  });
  setTypingA(status);

  return;
};
