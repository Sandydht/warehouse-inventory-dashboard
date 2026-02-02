import { describe, it, expect } from "vitest";
import AuthRepositoryImpl from "../AuthRepositoryImpl";

describe("AuthRepositoryImpl", () => {
  const authRepositoryImpl: AuthRepositoryImpl = new AuthRepositoryImpl();

  describe("verifyAvailableUserByEmailAndPassword function", () => {
    const validPayload = {
      email: "example1@email.com",
      password: "password123",
    };

    it("should return the user ID when provided with valid credentials", async () => {
      const result: string =
        await authRepositoryImpl.verifyAvailableUserByEmailAndPassword(
          validPayload.email,
          validPayload.password,
        );
      expect(result).toBeDefined();
      expect(typeof result).toBe("string");
    });

    it("should throw and error when the email is not found", async () => {
      await expect(
        authRepositoryImpl.verifyAvailableUserByEmailAndPassword(
          "notfounduser@email.com",
          validPayload.password,
        ),
      ).rejects.toThrowError("Invalid credentials");
    });

    it("should throw an error when the password is incorrect", async () => {
      await expect(
        authRepositoryImpl.verifyAvailableUserByEmailAndPassword(
          validPayload.email,
          "incorrect-password",
        ),
      ).rejects.toThrowError("Invalid credentials");
    });

    it("should throw an error when the payload is empty or invalid", async () => {
      await expect(
        authRepositoryImpl.verifyAvailableUserByEmailAndPassword("", ""),
      ).rejects.toThrowError("Invalid credentials");
    });
  });
});
