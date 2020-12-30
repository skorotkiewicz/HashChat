const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const {
  addUser,
  removeUser,
  getUser,
  checkName,
  allUsers,
  editTags,
  // countUsers,
} = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  // socket.emit           = only to me
  // socket.broadcast.to   = to everbody but not to me
  // io.to(user.room).emit = to specific user
  // io.emit               = to everbody

  socket.on("checkname", ({ name }, callback) => {
    const { error, okay } = checkName({ name });
    if (error) return callback(false);
    else callback(!okay);
  });

  socket.on("mtyp", ({ to, typing }) => {
    io.to(to).emit("_mtyp", { id: socket.id, typing });
  });

  //

  socket.on("join", ({ name, tags, bitcoin }, callback) => {
    const { error, users } = addUser({
      id: socket.id,
      name,
      tags,
      bitcoin,
    });
    if (error) return callback(error);

    socket.emit("WELCOME", {
      id: socket.id,
    });

    sendUsersList(users);
    callback();
  });

  socket.on("editTags", ({ tags }, callback) => {
    const { error, users } = editTags({ id: socket.id, tags });
    if (error) return callback(error);
    sendUsersList(users, true);
    callback();
  });

  socket.on("sendMessage", (message) => {
    const user = getUser(socket.id);
    if (user) {
      io.to(message.to).emit("message", {
        fromName: user.name,
        fromId: socket.id,
        message: message.message,
      });
    }
  });

  socket.on("disconnect", () => {
    const { users } = allUsers();
    const leftuser = getUser(socket.id);

    removeUser(socket.id);
    // io.emit("userleft", socket.id);

    // send left info only to some person with tags
    if (leftuser) {
      users.find((user) => {
        if (user.tags.some((tag) => leftuser.tags.includes(tag))) {
          if (leftuser.name !== user.name) {
            io.to(user.id).emit("userleft", socket.id);
            // console.log("send leftinfo to: ", getUser(user.id).name);
          }
        }
      });
    }
  });
});

const sendUsersList = (users, update = false) => {
  users.map((_user) => {
    let myUsersUpdate = [];

    users.find((user) => {
      if (user.tags.some((tag) => _user.tags.includes(tag))) {
        if (_user.name !== user.name) {
          myUsersUpdate.push(user);
        }
      }
    });
    if (myUsersUpdate.length >= 1) {
      io.to(_user.id).emit("users", myUsersUpdate);
    }
    if (update) {
      io.to(_user.id).emit("users", myUsersUpdate);
    }
  });
};

server.listen(process.env.PORT || 5000, () =>
  console.log(`Server has started.`)
);

// git push heroku master
