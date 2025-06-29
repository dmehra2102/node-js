import { createServer } from "node:http";

const server = createServer();

server.on("request", (request, response) => {
  response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  response.end("This is the node http module server.");
});

server.on("listening", () => {
  console.log("Server is listening on PORT : 8080");
});

server.on("connection", (socket) => {
  console.log("Someone has connected", socket.remoteAddress);
});

server.on("close", () => {
  console.log("Server has been closed.");
});

server.listen(8080);
