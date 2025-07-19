import http from "node:http";
import { basename } from "node:path";
import { createReadStream } from "node:fs";
import { createGzip } from "node:zlib";

const fileName = process.argv[2];
const httpRequestOptions: http.RequestOptions = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    "content-type": "application/octet-stream",
    "content-encoding": "gzip",
    "x-filename": basename(fileName),
  },
};

const req = http.request(
  httpRequestOptions,
  (response: http.IncomingMessage) => {
    console.log(`Server response: ${response.statusCode}`);
  }
);

createReadStream(fileName)
  .pipe(createGzip())
  .pipe(req)
  .on("finish", () => {
    console.log("File successfully sent");
  });
