const express = require("express");
const { Server } = require("socket.io");
const http = require("http");

const app = express();
const port = "8081";
app.set("port", port);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("join", function (data) {
    socket.join(data.room);
    io.emit("new user joined", {
      user: data.user,
      message: "has joined  room.",
    });
  });
  socket.on("leave", function (data) {
    io.emit("left room", { user: data.user, message: "has left room." });
    socket.leave(data.room);
  });

  socket.on("message", function (data) {
    io.in(data.room).emit("new message", {
      user: data.user,
      message: data.message,
    });
  });
});

server.listen(port, () => {
  console.log("listening on port", port);
});
