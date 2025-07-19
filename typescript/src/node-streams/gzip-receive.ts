import { createWriteStream } from "node:fs";
import http, { IncomingMessage, ServerResponse } from "node:http";
import path from "node:path";
import { createGunzip } from "node:zlib";

const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    const xFilename = request.headers["x-filename"];
    const filename = path.basename(
      Array.isArray(xFilename) ? xFilename[0] || "" : xFilename || ""
    );
    const destFilename = path.join("received_files", filename);
    request
      .pipe(createGunzip())
      .pipe(createWriteStream(destFilename))
      .on("finish", () => {
        response.writeHead(201, { "content-type": "text/plain" });
        response.end("ok\n");
        console.log(`File saved: ${destFilename}`);
      });
  }
);

server.listen(8080, () => {
  console.log("Server is running");
});
