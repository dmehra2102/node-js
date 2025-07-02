import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "topSecret",
  database: "movie-db",
});

try {
  await connection.connect();
  console.log("Successfully connected to DB");
} catch (error) {
  console.error("Error while making a DB connetcon :", error);
}

export async function getAll() {
  const query = "SELECT * FROM Movies";
  const [data] = await connection.query(query);
  return data;
}

export async function insert(movie) {
  const query = "INSERT INTO Movies (title,year) VALUES (?,?)";
  const [result] = await connection.query(query, movie.title, movie.year);
  return { ...movie, id: result.insertId };
}

export async function getById(id) {
  const query = "SELECT * from Movies WHERE id = ?";
  const [data] = await connection.query(query, [id]);
  return data.pop();
}

export async function update(movie) {
  const query = "UPDATE Movies SET title = ?, year = ? WHERE id = ?";
  await connection.query(query, movie.title, movie.year, movie.id);
  return movie;
}

export async function remove(id) {
  const query = "DELETE FROM Moies WHERE id = ?";
  await connection.query(query, id);
  return true;
}

export function save(movie) {
  if (!movie.id) {
    return insert(movie);
  }
  return update(movie);
}
