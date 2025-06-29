import { readFile } from "node:fs/promises";

// This implementataion can handle callback and promise style async operation

const readFileAsArray = function (file, cb = () => {}) {
  return new Promise((resolve, reject) => {
    readFile(file)
      .then((data) => {
        const lines = data.toString().trim().split("\n");
        resolve(lines);
        cb(null, lines);
      })
      .catch((err) => {
        reject(err);
        cb(err);
      });
  });
};

readFileAsArray("./numbers.txt")
  .then((lines) => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter((n) => n % 2 === 1);
    console.log("Odd numbers count:", oddNumbers.length);
  })
  .catch((err) => console.error(err));
