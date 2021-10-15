const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
require("dotenv").config();
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getRooms,
  deleteRoom,
} = require("./users");

const router = require("./router");
const SECURITY_TOKEN = process.env.SECURITY_TOKEN;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://javaughnpryce.live:8081",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(router);

io.on("connect", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    try {
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.join(user.room);

      if (name !== "dispatcher") {
        socket.emit("message", {
          user: "admin",
          text: `Hello ${user.name}, welcome, a dispatcher will be with shortly.`,
        });
      }

      io.emit("roomCreated");

      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `A ${user.name} has joined!` });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    } catch (e) {
      console.log(e);
      // console.log(callback());
    }
  });

  socket.on("sendMessage", (message, callback) => {
    try {
      const user = getUser(socket.id);

      io.to(user.room).emit("message", { user: user.name, text: message });
    } catch (e) {
      console.log(e);
      // console.log(callback());
    }
  });

  socket.on("getRooms", (token) => {
    try {
      console.log(token);
      if (token.token === SECURITY_TOKEN) {
        io.emit("rooms", {
          user: "admin",
          rooms: getRooms(),
        });
      } else {
        io.emit("rooms", {
          message:
            "You are not authorized to view the list of emergency rooms!",
        });
      }
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("left", () => {
    try {
      const user = removeUser(socket.id);
      const usersInRoom = getUsersInRoom(user.room);
      if (usersInRoom.length === 0) {
        deleteRoom(user.room);
        io.emit("You can update");
      }
      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("disconnect", () => {
    try {
      const user = removeUser(socket.id);

      if (user) {
        io.to(user.room).emit("message", {
          user: "Admin",
          text: `${user.name} has left.`,
        });
        io.to(user.room).emit("roomData", {
          room: user.room,
          users: getUsersInRoom(user.room),
        });
      }
    } catch (e) {
      console.log(e);
    }
  });
});

server.listen(process.env.PORT || 5000, "192.168.1.200", () =>
  console.log(`Server has started.`)
);
