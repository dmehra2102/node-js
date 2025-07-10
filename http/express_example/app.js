const YAML = require("yamljs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = YAML.load("./swagger.yaml");

const xml2js = require("xml2js");
const express = require("express");
const mung = require("express-mung");
const { registerationValidation, validateRequest } = require("./validation");
const app = express();
const PORT = 8080;
const HOST = "localhost";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Transforming Server Response
app.use(
  mung.json((body, req, res) => {
    if (/\xml$/.test(req.url)) {
      const builder = new xml2js.Builder();
      const xml = builder.buildObject(body);
      return xml;
    }
  })
);
app.use(
  mung.headers((req, res) => {
    if (/\xml$/.test(req.url)) {
      res.set("Content-Type", "text/xml");
    }
  })
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/v1/welcome", (req, res) => {
  res.send("Hello, My server using Express");
});

app.get("/v1/sample/xml", (req, res) => {
  res.send(req.body);
});
app.get("/v1/sample", (req, res) => {
  res.send(req.body);
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
