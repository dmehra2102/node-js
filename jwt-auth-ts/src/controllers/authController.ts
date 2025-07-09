import { Request, Response } from "express";
import { User, users } from "../types/user";
import { default as db } from "../utils/dummy-db";
import { ErrorType, sendError } from "../utils/error";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role = "user" } = req.body;

    const exisitingUser = await db.findUserByEmail(email);
    if (exisitingUser) {
      return sendError(
        res,
        ErrorType.ALREADY_EXISTS,
        "User with this email already exists."
      );
    }

    const hashedPassword = await db.hashPassword(password);
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      role,
    };
    users.push(newUser);

    res.status(201).json({ message: "User registered successfully." });
  } catch (error) {
    return sendError(
      res,
      ErrorType.SERVER_ERROR,
      "Server error during registration"
    );
  }
};
