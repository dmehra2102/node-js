import bcrypt from "bcryptjs";
import { users } from "../types/user";

const findUserByEmail = (email: string): Promise<boolean> => {
  return Promise.resolve(
    users.some((user) => user.email.toLowerCase() === email.toLowerCase())
  );
};

const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, 10);
};

const verifyPassword = (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export default { findUserByEmail, hashPassword, verifyPassword };
