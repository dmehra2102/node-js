import { createReadStream } from "node:fs";
import { createServer } from "node:http";

const server = createServer();

server.on("request", async (request, response) => {
  // THis is the inefficient way
  //   const data = await readFile("./big.file");
  //   response.end(data);

  //    This is the efficient way
  const res = createReadStream("./big.file");
  res.pipe(response);
});

server.on("listening", () => {
  console.log("Server is listening on PORT : 8080");
});

server.listen(8080);
