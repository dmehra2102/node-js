import mongoose from "mongoose";

export const dbConnection = async () => {
  return mongoose.connect(process.env.MONGO_URI);
};
