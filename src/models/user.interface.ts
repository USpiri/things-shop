export interface User {
  id: string;
  name: string;
  email: string;
  emailVerified?: Date | null;
  password: string;
  role: UserRole;
  image?: string | null;
}

export type UserRole = "admin" | "user";
