import express from "express";
import passport from "passport";
import "./config/passport-setup.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/db.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send(
    '<h1>Welcome to the Google Sign-In Demo!</h1><a href="/auth/google">Login with Google</a>'
  );
});

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"], // Request profile and email information
  })
);

app.get("/login-failure", (req, res) => {
  res.send(
    "<h1>Login Failed!</h1><p>Something went wrong during Google authentication.</p>"
  );
});

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login-failure" }),
  (req, res) => {
    res.redirect("/profile");
  }
);

// Protected profile route
app.get("/profile", (req, res) => {
  if (req.user) {
    res.send(`<h1>Welcome, ${req.user.displayName}!</h1>
              <p>Email: ${req.user.email}</p>
              <img src="${req.user.profilePicture}" alt="Profile Picture" />
              <br>
              <a href="/auth/logout">Logout</a>`);
  } else {
    res.redirect("/");
  }
});

app.get("/auth/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.session.destroy(() => {
      // Destroy the session after logout
      res.redirect("/");
    });
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, async () => {
  await dbConnection();
  console.log("DB Connected Successfully.");
  console.log(`Server is running on port ${PORT} 🚀`);
});
