import os from "node:os";
import cluster from "node:cluster";

if (cluster.isPrimary) {
  const cpus = os.availableParallelism();

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }

  setTimeout(() => {
    Object.values(cluster.workers).forEach((worker) => {
      worker.send(`Hello Worker ${worker.id}`);
    });
  }, 2_000);

  cluster.on("exit", (worker) => {
    if (worker.exitedAfterDisconnect) return;

    console.log(`Worker ${worker.id} crashed.` + "Starting a new worker...");

    cluster.fork();
  });
} else {
  import("./slow-server.js");
}
