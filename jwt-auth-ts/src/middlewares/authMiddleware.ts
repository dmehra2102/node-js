import { verifyToken } from "../utils/jwt";
import { ErrorType, sendError } from "../utils/error";
import { NextFunction, Request, Response } from "express";

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return sendError(
      res,
      ErrorType.AUTHENTICATION_ERROR,
      "Access Denied: No token provided."
    );
  }

  const decoded = verifyToken(token);

  if (!decoded) {
    return sendError(
      res,
      ErrorType.AUTHENTICATION_ERROR,
      "Access Denied: Invalid or expired token."
    );
  }

  req.user = decoded;
  return next();
};
