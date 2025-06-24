const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("🟢 Usuario conectado:", socket.id);

  socket.on("message", (msg) => {
    console.log("📨 Mensaje recibido:", msg);
    io.emit("message", msg); // broadcast
  });

  socket.on("disconnect", () => {
    console.log("🔴 Usuario desconectado:", socket.id);
  });
});

server.listen(3000, () => {
  console.log("🚀 Servidor Socket.IO en http://localhost:3000");
});
