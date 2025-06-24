// fgp_socket_io_client.js
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

// Conexión establecida
socket.on("connect", () => {
  console.log("🟢 Conectado al servidor con ID:", socket.id);
});

// Enviar mensaje al servidor
function sendMessage(msg) {
  socket.emit("message", msg);
}

// Escuchar mensajes del servidor
socket.on("message", (msg) => {
  console.log("💬 Mensaje recibido:", msg);
});

// Desconexión
socket.on("disconnect", () => {
  console.log("🔴 Desconectado del servidor");
});
