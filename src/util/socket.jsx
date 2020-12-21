import io from "socket.io-client";

// socket = io(ENDPOINT, { autoConnect: true, reconnection: true });

export const socket = io("http://localhost:5000/");

export const ftyping = (current, setTypingA, status = false) => {
  socket.emit("mtyp", {
    to: current.id,
    typing: status,
  });
  setTypingA(status);

  return;
};
