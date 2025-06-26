import { createServer } from "http";

const server = createServer((request, response) => {
  response.writeHead(200, { "content-type": "text/plain; charset=utf-8" });
  response.write("Hello world, my name is Deepanshu Mehra!");
  response.end();
});

server.listen(8080, () => {
  console.log(
    `Server is listening to http://localhost:${server.address().port}`
  );
});
