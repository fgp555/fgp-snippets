const express = require("express");
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Datos simulados (mock)
const mockUser = {
  email: "admin@gmail.com",
  password: "admin@gmail.com",
  name: "Administrador",
  role: "admin",
};

// Endpoint principal
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Endpoint de login
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  if (email === mockUser.email && password === mockUser.password) {
    res.json({
      success: true,
      message: "Login exitoso",
      user: {
        name: mockUser.name,
        role: mockUser.role,
        email: mockUser.email,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      message: "Email o contraseña incorrectos",
    });
  }
});

// Servidor
app.listen(3000, () => {
  console.log(`Server listening on http://localhost:3000`);
});

/* 

npm init -y
npm install express
node server.js
node --watch server.js

*/
