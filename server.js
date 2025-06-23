const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const messageHistory = [];

app.use(express.static(path.join(__dirname, "public")));

const users = new Map();

io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("setUsername", (username) => {
    users.set(socket.id, username);
    console.log(`User ${username} connected`);
  });

  socket.on("sendMessage", (messageData) => {
    const username = users.get(socket.id) || "Anonymous";
    const msg = {
      text: messageData.text,
      user: username,
      timestamp: new Date().toISOString(),
    };

    messageHistory.push(msg);

    io.emit("message", msg);
  });

  socket.on("disconnect", () => {
    const username = users.get(socket.id);
    if (username) {
      console.log(`User ${username} disconnected`);
      users.delete(socket.id);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
