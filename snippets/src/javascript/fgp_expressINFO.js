const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // Get the versions of Node.js and npm
  const nodeVersion = process.version;
  const npmVersion = require("child_process").execSync("npm -v").toString().trim();
  const expressVersion = require("express/package").version;
  const environment = process.env.NODE_ENV || "development";
  const osInfo = require("os").platform(); // Operating system information

  // Create a response object
  const response = {
    node: nodeVersion,
    npm: npmVersion,
    express: expressVersion,
    environment: environment,
    os: osInfo,
    // Add more information as needed
  };

  // Send the response as JSON
  res.json(response);
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:port`);
});
