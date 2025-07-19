import http from "node:http";
import { Buffer } from "node:buffer";
import { basename } from "node:path";
import { createGzip } from "node:zlib";
import { createCipheriv, randomBytes } from "node:crypto";
import { createReadStream } from "node:fs";

const fileName = process.argv[2];
const secret = Buffer.from(process.argv[3], "hex");
const iv = randomBytes(16);

const httpRequestOptions: http.RequestOptions = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "PUT",
  headers: {
    "content-type": "application/octet-stream",
    "content-encoding": "gzip",
    "x-filename": basename(fileName),
    "x-initialiation-vector": iv.toString("hex"),
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
  .pipe(createCipheriv("aes-192-ccm", secret, iv))
  .pipe(req)
  .on("finish", () => {
    console.log("File successfully sent");
  });
