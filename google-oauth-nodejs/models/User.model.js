import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true, // Allows null values if user isn't Google authenticated
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: String,
  firstName: String,
  lastName: String,
  profilePicture: String,
});

export const User = model("User", UserSchema);
