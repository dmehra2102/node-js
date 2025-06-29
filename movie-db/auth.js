import passport from "passport";
import expressSession from "express-session";
import { Strategy as LocalStrategy } from "passport-local";

export default function (app) {
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser((id, done) => {
    const user = {
      username: "sspringer",
      firstname: "Sebastian",
      lastname: "Springer",
    };
    done(null, user);
  });

  passport.use(
    new LocalStrategy((username, password, done) => {
      if (username === "sspringer" && password === "test") {
        done(null, {
          username: "sspringer",
          firstname: "Sebastian",
          lastname: "Springer",
        });
      } else {
        done(null, false);
      }
    })
  );

  app.use(
    expressSession({
      secret: "top secret",
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}
