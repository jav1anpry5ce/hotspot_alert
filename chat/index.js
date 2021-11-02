const { createServer } = require("https");
const { Server } = require("socket.io");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const { instrument } = require("@socket.io/admin-ui");
const express = require("express");

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
  getRooms,
  deleteRoom,
} = require("./users");

const SECURITY_TOKEN = process.env.SECURITY_TOKEN;

const server = createServer({
  key: fs.readFileSync(path.join(__dirname, "cert", "key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "cert", "cert.pem")),
});

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://javaughnpryce.live"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    try {
      const { error, user } = addUser({ id: socket.id, name, room });

      if (error) return callback(error);

      socket.join(user.room);

      if (name !== "dispatcher") {
        socket.emit("message", {
          user: "admin",
          text: `Hello ${user.name}, A Dispatcher will be with shortly.`,
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

  socket.on("typing", () => {
    try {
      const user = getUser(socket.id);
      io.to(user.room).emit("typing", {
        user: user.name,
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on("getRooms", (token) => {
    try {
      if (token.token === SECURITY_TOKEN) {
        const roomData = [];
        const rooms = getRooms();
        if (rooms.length > 0) {
          let data;
          rooms.map((room) => {
            data = {
              name: room,
              users: getUsersInRoom(room),
            };
            roomData.push(data);
          });
        }
        io.emit("rooms", {
          user: "admin",
          data: roomData.length > 0 ? roomData : [],
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
      const user = getUser(socket.id);
      removeUser(socket.id);
      const usersInRoom = getUsersInRoom(user.room);
      socket.leave(user.room);
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
      const user = getUser(socket.id);
      removeUser(socket.id);
      const usersInRoom = getUsersInRoom(user.room);
      socket.leave(user.room);
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
      console.log(e);
    }
  });
});

instrument(io, {
  auth: {
    type: "basic",
    username: "admin",
    password: "$2a$12$JTt3LfCNhfkXe4yoRrY/5eE33fqDfpRDHNjYPtK5ClY9/HaU7bU3y",
  },
});

server.listen(process.env.PORT || 5000, process.env.IP, () =>
  console.log(`Server has started.`)
);
