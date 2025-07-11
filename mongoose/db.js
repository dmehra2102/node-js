import mongoose from "mongoose";

const dbConnection = () => {
  return mongoose.connect(process.env.MONGODB_URI);
};

export default dbConnection;
