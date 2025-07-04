import express from "express";
import session from "express-session";
import loginFormVars from "./form-data.js";
import passport from "passport";
import Account from "./models/Account.js";
import hpp from "hpp";
import helmet from "helmet";
import compression from "compression";

const PORT = 3000;
const app = express();
const router = express.Router();

app.use(hpp());
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.set("view engine", "hbs");
app.use(
  session({ secret: "cookie_secret", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(router);

passport.serializeUser(Account.serializeUser);
passport.deserializeUser(Account.deserializeUser());
passport.use("local", Account.genStrategy());

router.get("/", (request, response) => {
  const { page } = request.query;
  const formVars = loginFormVars[page] || loginFormVars.signup;
  response.render("index", formVars);
});

router.post("/account", async (request, response) => {
  const { username, password } = request.body;
  try {
    await Account.register(username, password);
    return response.json({ message: "Account created." });
  } catch (error) {
    return response.json({
      message: "Account creation failed.",
      error: error.message,
    });
  }
});

router.post(
  "/auth",
  passport.authenticate("local", { failureRedirect: "/?page=login" }),
  async (request, response) => {
    const {
      user: { username },
    } = request;
    response.json({ message: "Logged in.", username });
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on PORT : ${PORT}`);
});
