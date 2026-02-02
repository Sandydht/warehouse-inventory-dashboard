import type { User } from "../../core/auth/domain/User";

export const usersMock: User[] = [
  {
    id: "user-001",
    email: "andi@email.com",
    phoneNumber: "081123123123",
    fullName: "Andi (Staff Warehouse)",
    role: "STAFF",
    password: "",
    createdAt: new Date(Date.now()).toISOString(),
    updatedAt: null,
    deletedAt: null,
  },
  {
    id: "user-002",
    email: "budi@email.com",
    phoneNumber: "081123123123",
    fullName: "Budi (Inventory Officer)",
    role: "OFFICER",
    password: "",
    createdAt: new Date(Date.now()).toISOString(),
    updatedAt: null,
    deletedAt: null,
  },
];
