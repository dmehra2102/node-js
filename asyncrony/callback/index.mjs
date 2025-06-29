import { readFile } from "node:fs";

// asynchronous callback-style function and how it can be used

const readFileAsArray = function (file, cb) {
  readFile(file, (err, data) => {
    if (err) cb(err);

    const lines = data.toString().trim().split("\n");
    cb(null, lines);
  });
};

readFileAsArray("./numbers.txt", (err, data) => {
  if (err) throw err;
  const numbers = data.map(Number);
  const oddNumbers = numbers.filter((n) => n % 2 === 1);
  console.log("Odd numbers count:", oddNumbers.length);
});
