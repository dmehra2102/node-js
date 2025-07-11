import express from "express";
import EmployeeController from "../controllers/employee.controller.js";

const router = express.Router();

router.get("/", EmployeeController.findAll);
router.post("/", EmployeeController.create);
router.get("/:id", EmployeeController.findById);
router.patch("/:id", EmployeeController.updateById);
router.delete("/:id", EmployeeController.deleteById);

export default router;
