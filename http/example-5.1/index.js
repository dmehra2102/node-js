import data from "./data.js";
import { createServer } from "http";
import { getList } from "./list.js";
import { deleteAddress } from "./delete.js";

const server = createServer((request, response) => {
  const parts = request.url.split("/").filter((item) => item != "");

  if (parts.includes("delete")) {
    data.addresses = deleteAddress(data.addresses, parts[1]);
    redirect(response, "/");
  } else {
    response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    const responsebody = getList(data.addresses);
    response.end(responsebody);
  }
});

server.listen(8080, () => {
  console.log(
    `Server is listening to http://localhost:${server.address().port}`
  );
});

function redirect(response, to) {
  response.writeHead(302, { location: to, "content-type": "text/plain" });
  response.end(`302 Redirecting to ${to}`);
}
