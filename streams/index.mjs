import { RandomStream } from "./custom_read_stream.mjs";

const randomStream = new RandomStream();

randomStream.on("data", (chunk) => {
  console.log(`Chunk received (${chunk.length} bytes): ${chunk.toString()}`);
});

randomStream.on("end", () => {
  console.log(`Produced ${randomStream.emittedBytes} bytes of random data`);
});
