export type UserRole = "patient" | "doctor" | "admin";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};
