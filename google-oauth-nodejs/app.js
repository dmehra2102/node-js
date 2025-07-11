import express from "express";
import passport from "passport";
import { config } from "dotenv";
import "./config/passport-setup.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import { dbConnection } from "./config/db.js";

config();

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await dbConnection();
  console.log("DB Connected Successfully.");
  console.log(`Server is running on port ${PORT} 🚀`);
});
