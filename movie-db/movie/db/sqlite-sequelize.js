import { INTEGER, Sequelize, STRING } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./movie.db",
});

const Movies = sequelize.define(
  "Movies",
  {
    title: {
      type: STRING,
    },
    year: {
      type: INTEGER,
    },
  },
  { timestamps: false }
);

export function getAll() {
  return Movies.findAll();
}

export function getById(id) {
  return Movies.findByPk(id);
}

export function remove(id) {
  return Movies.destroy({ where: { id } });
}

export function update(movie) {
  return Movies.upsert(movie);
}
