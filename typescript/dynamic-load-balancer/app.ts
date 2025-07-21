import consul from "consul";
import { createServer } from "http";
import { nanoid } from "nanoid";
import portfinder from "portfinder";

const serviceType = process.argv[2];
const { pid } = process;

async function main() {
  const serviceId = nanoid();
  const consulClient = new consul();
  const port = await portfinder.getPortPromise();
  const address = process.env.ADDRESS || "localhost";

  // This function will register the  new service
  function registerService() {
    consulClient.agent.service
      .register({
        id: serviceId,
        name: serviceType,
        address,
        port,
        tags: [serviceType],
      })
      .then(() => {
        console.log(`${serviceType} registered successfully`);
      });
  }

  // This function will deregister the service
  function unregisterService(err) {
    err && console.error(err);
    console.log(`deregister ${serviceId}`);
    consulClient.agent.service
      .deregister({ id: serviceId })
      .then(() => process.exit(err ? 1 : 0));
  }

  process.on("exit", unregisterService);
  process.on("SIGINT", unregisterService);
  process.on("uncaughtException", unregisterService);

  const server = createServer((req, res) => {
    let i = 1e7;
    while (i > 0) {
      i--;
    }
    console.log(`Handling request from ${pid}`);
    res.end(`${serviceType} response from ${pid}\n`);
  });
  server.listen(port, address, () => {
    registerService();
    console.log(`Started ${serviceType} at ${pid} on port ${port}`);
  });
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
