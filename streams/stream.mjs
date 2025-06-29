import { randomBytes } from "node:crypto";
import { createWriteStream } from "node:fs";

const file = createWriteStream("./big.file");

for (let i = 0; i < 1e6; i++) {
  file.write(randomBytes(200).toString("hex"));
}

file.end();
