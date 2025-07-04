const express = require("express");
const loginFormVars = require("./form-data");
const PORT = 3000;
const users = {};
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.set("view engine", "hbs");

router.get("/", (request, response) => {
  const { page } = request.query;
  const formVars = loginFormVars[page] || loginFormVars.signup;
  response.render("index", formVars);
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT : ${PORT}`);
});
