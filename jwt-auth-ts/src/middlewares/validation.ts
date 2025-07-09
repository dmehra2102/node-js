import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) next();

  const extractedErrors: { [key: string]: string }[] = [];

  errors
    .array()
    .map((error) => extractedErrors.push({ [error.type]: error.msg }));

  return res.status(400).json({
    message: "Validation failed.",
    errors: extractedErrors,
  });
};
