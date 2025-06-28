import morgan from "morgan";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { createWriteStream } from "fs";
import { engine as expressHandlebars } from "express-handlebars";
import { router as movieRouter } from "./movie/index.js";

const app = express();
const logStream = createWriteStream("access.log", { flags: "a" });

// app.set("view engine", "pug");

app.engine(
  "handlebars",
  expressHandlebars({ helpers: { uc: (data) => data.toUpperCase() } })
);
app.set("view engine", "handlebars");
app.set("views", [`${dirname(fileURLToPath(import.meta.url))}/movie/views`]);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(`${dirname(fileURLToPath(import.meta.url))}/public`));
app.use(morgan("common", { immediate: true, stream: logStream }));

app.use("/movie", movieRouter);
app.get("/", (request, response) => response.redirect("/movie"));

app.listen(8080, () => {
  console.log("Server is listening to http://localhost:8080");
});
