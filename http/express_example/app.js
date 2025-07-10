const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require("express");
const { registerationValidation, validateRequest } = require("./validation");
const app = express();
const PORT = 8080;
const HOST = "localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/v1/welcome", (req, res) => {
  res.send("Hello, My server using Express");
});

app.post(
  "/v1/register",
  registerationValidation,
  validateRequest,
  (req, res) => {
    res.send("User registration successfull");
  }
);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://%s:%s`, HOST, PORT);
});
