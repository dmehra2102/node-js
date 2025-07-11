import express from "express";
import { config } from "dotenv";
import dbConnection from "./db.js";
import { default as employeeRouter } from "./routes/employee.js";

config();

const app = express();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.json());
aap.use(express.urlencoded({ extended: true }));

app.use("/employee", employeeRouter);

const errorHandler = (error, request, response, next) => {
  console.log(`error ${error.message}`);
  const status = error.status || 400;
  response.status(status).send(error.message);
};
app.use(errorHandler);

app.listen(PORT, HOST, async () => {
  try {
    await dbConnection();
    console.log("DB connection successful");
    console.log(`Server is running on http://%s:%s`, HOST, PORT);
  } catch (error) {
    console.error("Error while starting :", error.message);
  }
});
