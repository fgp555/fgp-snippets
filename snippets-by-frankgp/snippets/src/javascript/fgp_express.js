const express = require("express");

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log(req.headers);
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
