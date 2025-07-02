import { dirname } from "path";
import { readFileSync } from "fs";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import { render as form } from "./form.js";
import { getAll, getByID, remove, save } from "./model.js";

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

export async function formAction(request, response) {
  let movie = { id: "", title: "", year: "" };

  if (request.params.id) {
    movie = await getByID(request.params.id);
  }

  const body = form(movie);
  response.send(body);
}

export async function saveAction(request, response) {
  const { title, year } = request.body;
  const movie = {
    title,
    year,
  };

  await save(movie);
  response.redirect(request.baseUrl);
}
