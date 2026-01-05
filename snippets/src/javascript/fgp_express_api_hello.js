const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log("GET /");
  res.send("GET: Hello World!");
});

app.post("/", (req, res) => {
  console.log("POST /");
  console.log("req.body:", req.body);
  res.json({ message: "POST: Hello World!", body: req.body });
});

app.listen(3000, () => {
  console.log(`Server listening on http://localhost:3000`);
});

/* 

npm init -y
npm install express
node server.js
node --watch server.js

*/
