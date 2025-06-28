import { dirname } from "path";
import { fileURLToPath } from "url";
import { getAll, remove } from "./model.js";

export async function listAction(request, response) {
  const movies = await getAll();
  response.render(`${dirname(fileURLToPath(import.meta.url))}/views/list`, {
    movies,
  });
}

export async function removeAction(request, response) {
  const id = parseInt(request.params.id, 10);
  await remove(id);
  response.redirect(request.baseUrl);
}
