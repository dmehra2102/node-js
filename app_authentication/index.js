import express from "express";
import session from "express-session";
import loginFormVars from "./form-data.js";
import passport from "passport";
import Account from "./models/Account.js";

const PORT = 3000;
const users = {};
const app = express();
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);
app.set("view engine", "hbs");
app.use(
  session({ secret: "cookie_secret", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(Account.serializeUser);
passport.deserializeUser(Account.deserializeUser);
passport.use("local", Account.genStrategy());

router.get("/", (request, response) => {
  const { page } = request.query;
  const formVars = loginFormVars[page] || loginFormVars.signup;
  response.render("index", formVars);
});

router.post("/account", async (request, response) => {
  const { username, password } = request.body;
  users[username] = password;
  response.json({ message: "Account created" });
});

router.post("/auth", async (request, response) => {
  const { username, password } = request.body;
  if (users[username] && users[username] === password) {
    return response.json({ message: "Logged in" });
  }
  response.redirect("/?page=login");
});

app.listen(PORT, () => {
  console.log(`Server listening on PORT : ${PORT}`);
});
