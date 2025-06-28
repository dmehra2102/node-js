import request from "request";
import { load } from "cheerio";

request("http://localhost:8080/", (err, response, body) => {
  const addresses = [];

  const $ = load(body);
  const tr = $("tr");
  tr.each((index, element) => {
    if (index === 0) {
      return;
    }
    addresses.push({
      id: element.children[1].children[0].data,
      firstname: element.children[3].children[0].data,
      lastname: element.children[5].children[0].data,
    });
  });

  console.log(addresses);
});
