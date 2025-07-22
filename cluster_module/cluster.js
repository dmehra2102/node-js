import os from "node:os";
import cluster from "node:cluster";

if (cluster.isPrimary) {
  const cpus = os.availableParallelism();

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
} else {
  import("./slow-server.js");
}
