import { describe, it, expect } from "vitest";
import UserRepositoryImpl from "../UserRepositoryImpl";
import User from "../../../domain/user/entity/User";

describe("UserRepositoryImpl", () => {
  const userRepositoryImpl: UserRepositoryImpl = new UserRepositoryImpl();

  describe("getUserById function", () => {
    it("should throw an error when ID does not exist", async () => {
      await expect(
        userRepositoryImpl.getUserById("notfoundif"),
      ).rejects.toThrowError("User not found");
    });

    it("should throw an error when ID is empty string", async () => {
      await expect(userRepositoryImpl.getUserById("")).rejects.toThrowError(
        "User not found",
      );
    });

    it("should return a User instance when valid ID is provided", async () => {
      const result: User = await userRepositoryImpl.getUserById("user-001");

      expect(result).toBeInstanceOf(User);
      expect(result.getId()).toBe("user-001");
      expect(result.getEmail()).toBeDefined();
      expect(result.getPhoneNumber()).toBeDefined();
      expect(result.getFullName()).toBeDefined();
      expect(result.getRole()).toBeDefined();
      expect(result.getPassword()).toBeDefined();
      expect(result.getCreatedAt()).toBeDefined();
      expect(result.getUpdatedAt()).toBeDefined();
      expect(result.getDeletedAt()).toBeDefined();
    });
  });
});
