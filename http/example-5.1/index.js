import data from "./data.js";
import { createServer } from "http";
import { getList } from "./list.js";
import { getForm } from "./form.js";
import { deleteAddress } from "./delete.js";

const server = createServer((request, response) => {
  const parts = request.url.split("/").filter((item) => item != "");

  if (parts.includes("delete")) {
    data.addresses = deleteAddress(data.addresses, parts[1]);
    redirect(response, "/");
  } else if (parts.includes("new")) {
    send(response, getForm());
  } else if (parts.includes("edit")) {
    send(response, getForm(data.addresses, parts[1]));
  } else {
    send(response, getList(data.addresses));
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

function send(response, responsebody) {
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  response.end(responsebody);
}
