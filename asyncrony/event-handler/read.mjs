import { readFile } from "node:fs";
import { EventEmitter } from "node:events";

class ReaderEmitter extends EventEmitter {
  readFileAsArray(fileName) {
    readFile(fileName, (err, data) => {
      if (err) {
        this.emit("error", err);
        return;
      }

      const lines = data.toString().trim().split("\n");
      this.emit("data", lines);
    });
  }
}

const reader = new ReaderEmitter();

reader.readFileAsArray("./numbers.txt");

reader.on("error", (err) => {
  throw err;
});

reader.on("data", (lines) => {
  const numbers = lines.map(Number);
  const oddNumbers = numbers.filter((n) => n % 2 === 1);
  console.log("Odd numbers count: ", oddNumbers.length);
});
