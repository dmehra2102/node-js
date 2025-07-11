import passport from "passport";
import { config } from "dotenv";
import { User } from "../models/user.model.js";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/google/callback",
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = await User.create({
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value, // Google guarantees at least one email
            profilePicture: profile.photos[0].value,
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error, null);
      }
    }
  )
);
