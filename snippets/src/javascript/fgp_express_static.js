const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev")); // Logging de solicitudes HTTP
app.use(express.static("public")); // Archivos estáticos

// Rutas
app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello, World!");
});

// Arranque del servidor
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:\${PORT}`);
});

/* 

npm init -y
npm install express
npm install morgan
node server.js
node --watch server.js

*/
