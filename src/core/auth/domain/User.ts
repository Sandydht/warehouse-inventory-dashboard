import type { UserRole } from "./type";

export interface User {
  id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  role: UserRole;
  password: string;
  createdAt: string | Date;
  updatedAt: string | Date | null;
  deletedAt: string | Date | null;
}
