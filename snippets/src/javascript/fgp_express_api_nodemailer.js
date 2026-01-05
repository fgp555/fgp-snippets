const express = require("express");
const morgan = require("morgan");
const nodemailer = require("nodemailer");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(morgan("dev"));
app.use(express.json()); // Para leer JSON en requests
app.use(express.static("public"));

// Configuración de transporte de email
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Cambiar si usas otro proveedor
  port: 465,
  secure: true, // true para 465, false para otros
  auth: {
    user: process.env.EMAIL_USER, // tu email
    pass: process.env.EMAIL_PASS, // tu contraseña o app password
  },
});

// Endpoint para enviar email
app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, text, html } = req.body;

    if (!to || !subject || (!text && !html)) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const info = await transporter.sendMail({
      from: `"Servidor Node" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email enviado:", info.messageId);
    res.json({ message: "Correo enviado correctamente", id: info.messageId });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    res.status(500).json({ error: "Error al enviar el correo" });
  }
});

// Ruta base
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:\${PORT}`);
});

/* 

npm init -y
npm install express
npm install morgan
npm install nodemailer
node server.js
node --watch server.js

*/
