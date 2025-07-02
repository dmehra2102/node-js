import { Router } from "express";
import {
  listAction,
  removeAction,
  formAction,
  saveAction,
} from "./controller.js";

const router = Router();

router.get("/", listAction);
router.post("/save", saveAction);
router.get("/form", formAction);
router.get("/form/:id", formAction);
router.delete("/delete/:id", removeAction);

export { router };
