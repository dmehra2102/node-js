import { Router } from "express";
import { authorizeRoles } from "../middlewares/rbacMiddleware";
import { authenticateToken } from "../middlewares/authMiddleware";

const router = Router();

router.get("/profile", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Welcome to your profile!", user: req.user });
});

router.get(
  "/admin-dashboard",
  authenticateToken,
  authorizeRoles("admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome to the admin dashboard, " + req.user?.email + "!",
      user: req.user,
    });
  }
);

router.get(
  "/user-dashboard",
  authenticateToken,
  authorizeRoles("user", "admin"),
  (req, res) => {
    res.status(200).json({
      message: "Welcome to the user dashboard, " + req.user?.email + "!",
      user: req.user,
    });
  }
);

export default router;
