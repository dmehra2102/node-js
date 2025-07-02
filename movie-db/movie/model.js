import * as crypto from "node:crypto";

const data = [
  { id: 1, title: "Iron Man", year: "2008" },
  { id: 2, title: "Thor", year: "2011" },
  { id: 3, title: "Captain America", year: "2011" },
];

function generateID() {
  return crypto.randomUUID();
}

function insert(movie) {
  movie.id = generateID();
  data.push(movie);
}

function update(movie) {
  movie.id = parseInt(movie.id, 10);
  const index = data.findIndex((item) => item.id === movie.id);
  data[index] = movie;
}

export function getAll() {
  return Promise.resolve(data);
}

export function getByID(id) {
  const parsedId = parseInt(id, 10);
  return Promise.resolve(data.find((item) => item.id === parsedId));
}

export function remove(id) {
  data = data.filter((movie) => movie.id !== id);
  return Promise.resolve();
}

export function save(movie) {
  if (movie.id === "") {
    insert(movie);
  } else {
    update(movie);
  }
  return Promise.resolve();
}
