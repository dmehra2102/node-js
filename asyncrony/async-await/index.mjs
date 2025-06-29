import { readFile } from "node:fs/promises";

const readFileAsArray = async function (fileName) {
  try {
    const data = await readFile(fileName);
    const lines = data.toString().trim().split("\n");
    return lines;
  } catch (error) {
    throw error;
  }
};

readFileAsArray("./numbers.txt").then((data) => {
  const numbers = data.map(Number);
  const oddNumbers = numbers.filter((n) => n % 2 === 1);
  console.log("Odd numbers count:", oddNumbers.length);
});
