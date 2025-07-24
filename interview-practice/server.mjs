import http from "node:http";
import url from "node:url";
import { loginController, userController } from "./controller.mjs";

const server = http.createServer((request, response) => {
  response.setHeader("Content-Type", "applicaion/json");

  const pathname = url.parse(request?.url, true).pathname;
  const requestMethod = request.method;
  if (pathname === "/login" && requestMethod === "POST") {
    loginController(request, response);
  } else {
    userController(request, response);
  }
});

server.listen(8080, () => {
  console.log("Server is listening on http://localhost:8080");
});
