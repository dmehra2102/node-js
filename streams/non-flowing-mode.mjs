// import { Readable } from "node:stream";

process.stdin
  .on("readable", () => {
    let chunk;
    console.log("New Data is available");
    while ((chunk = process.stdin.read()) !== null) {
      console.log("Data : ", chunk.toString());
    }
  })
  .on("end", () => {
    console.log("End of stream");
  });

async function main() {
  for await (const chunk of process.stdin) {
    console.log("Data :", chunk.toString());
  }

  console.log("Stream Ended.");
}

main();
