import path from "node:path";
import { createGunzip } from "node:zlib";
import { createWriteStream } from "node:fs";
import { createDecipheriv, randomBytes } from "node:crypto";
import http, { IncomingMessage, ServerResponse } from "node:http";

const server = http.createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    const secret = randomBytes(24);
    const xFilename = request.headers["x-filename"];
    const xInitVector = request.headers["x-initialiation-vector"];
    const ivString = Array.isArray(xInitVector)
      ? xInitVector[0] || ""
      : xInitVector || "";
    const iv = Buffer.from(ivString, "hex");
    const filename = path.basename(
      Array.isArray(xFilename) ? xFilename[0] || "" : xFilename || ""
    );
    const destFilename = path.join("received_files", filename);
    request
      .pipe(createDecipheriv("aes-192-ccm", secret, iv))
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
