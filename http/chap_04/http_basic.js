const http = require("node:http");
const PORT = 8080;
const HOST = "localhost";

const requestHandler = (request, response) => {
  if (request.body) {
    console.log(`Request body `, request.body);
  }

  response.writeHead(200, { "Content-Type": "text/plain" });
  response.end("Hello World from Node.s HTTP Server");
};

const server = http.createServer(requestHandler);

server.listen(PORT, HOST, () => {
  console.log("Server is running on http://%s:%s", HOST, PORT);
});
