const http = require("node:http");

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://localhost:8080");
  const name = url.searchParams.get("name") || "users";

  response.writeHead(200, { "content-type": "text/plain" });
  response.write(`Hello ${name} !`);
  response.end();
});

server.on("connection", (socket) => {
  console.log(`New Connection has been established : ${socket.localAddress}`);
});

server.listen(8080, "localhost", () => {
  console.log("Server is running on http://%s:%d", "localhost", 8080);
});
