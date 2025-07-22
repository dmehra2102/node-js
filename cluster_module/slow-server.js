import http from "node:http";

const server = http.createServer((req, res) => {
  for (let i = 0; i < 1e8; i++) {
    // Simulating CPU work:
  }

  res.end();
});

process.on("message", (msg) => {
  console.log("Message from Parent process : ", msg);
});

server.listen(8000, () => {
  console.log(`Process ${process.pid}`);
});

setTimeout(() => {
  process.exit(1);
}, Math.random() * 10_000);
