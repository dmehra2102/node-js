const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");

const express = require("express");
const app = express();
const PORT = 8080;
const HOST = "localhost";

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/v1/welcome", (req, res) => {
  res.send("Hello, My server using Express");
});

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://%s:%s`, HOST, PORT);
});
