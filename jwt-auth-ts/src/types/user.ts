export interface User {
  id: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export const users: User[] = [];
