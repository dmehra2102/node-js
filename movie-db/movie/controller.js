import { dirname } from "path";
import { readFileSync } from "fs";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import { getAll, remove } from "./model.js";

const listItem = handlebars.compile(
  readFileSync(
    `${dirname(fileURLToPath(import.meta.url))}/views/list-item.handlebars`,
    "utf-8"
  )
);

export async function listAction(request, response) {
  const movies = await getAll();
  response.render("list", {
    layout: false,
    movies,
    partials: { listItem },
  });
}

export async function removeAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}
