import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes";
import protectedRoutes from "./routes/protectedRoutes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the JWT Auth API!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
