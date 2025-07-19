// gzipping file with the help of buffers

import { createGzip, gzip } from "node:zlib";
import { promisify } from "node:util";
import { readFile, writeFile } from "node:fs/promises";
import { createReadStream, createWriteStream } from "node:fs";

const gzipPromise = promisify(gzip);
const fileName: string = process.argv[2];

async function main() {
  try {
    const data = await readFile(fileName);
    const gzippedData = await gzipPromise(data);
    await writeFile(`${fileName}.gz`, gzippedData);
    console.log("File successfully compressed");
  } catch (error) {
    console.error(error);
  }
}

main();

// gzipping file with the help of streams
createReadStream(fileName)
  .pipe(createGzip())
  .pipe(createWriteStream(`${fileName}.gz`))
  .on("finish", () => console.log("File successfully compressed"));
