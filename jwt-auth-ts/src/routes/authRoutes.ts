import { Router } from "express";
import { registerUser } from "../controllers/authController";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/token/refresh", refreshToken);

export default router;
