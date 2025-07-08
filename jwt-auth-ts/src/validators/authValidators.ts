import { body, ValidationChain } from "express-validator";

export const registerValidationRules: ValidationChain[] = [
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter."),
  body("role")
    .optional() // Role is optional
    .isIn(["user", "admin"])
    .withMessage("Invalid role provided."),
];

export const loginValidationRules: ValidationChain[] = [
  body("email").isEmail().withMessage("Please enter a valid email address."),
  body("password").notEmpty().withMessage("Password is required."),
];
