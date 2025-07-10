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

const errorHandler = (error, request, response, next) => {
  console.log(`error ${error.message}`);
  const status = error.status || 400;
  response.status(status).send(error.message);
};

app.use(errorHandler);

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

app.get("/v1/users", async (request, response, next) => {
  try {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        reject("Somehting goes very very wrong.....");
      }, 2_000);
    });
    response.send({ message: "Hello Users" });
  } catch (error) {
    next(error); // calling next error handling middleware
  }
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
