import { readFileSync } from "fs";
import { createServer } from "https";

const options = {
  key: readFileSync("./localhost.key"),
  cert: readFileSync("./localhost.cert"),
};

const server = createServer(options, (request, response) => {
  response.writeHead(200, { "content-type": "text/html; charset=utf-8" });

  const url = new URL(request.url, "https://localhost:8080");
  const body = `
  <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Node.js Demo</title>
      </head>
      <body>
        <h1 style="color:green">Hello ${
          url.searchParams.get("name") || "Visitor"
        }</h1>
      </body>
    </html>
  `;

  response.end(body);
});

server.listen(8080, () => {
  console.log(
    `Server is listening to http://localhost:${server.address().port}`
  );
});
