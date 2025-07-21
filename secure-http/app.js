const fs = require("node:fs");
const express = require("express");
const https = require("node:https");

const app = express();

const privateKey = fs.readFileSync("./certificates/key.pem", "utf8");
const certificate = fs.readFileSync("./certificates/cert.pem", "utf8");

const credentials = { key: privateKey, cert: certificate };

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

app.get("/secure-data", (req, res) => {
  res.send("This data is delivered over a secure HTTPS connection! 🔒");
});

const server = https.createServer(credentials, app);
server.listen(8000, () => {
  console.log("Server is running on http://localhost:8000");
});
