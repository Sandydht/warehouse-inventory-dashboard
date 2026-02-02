import { describe, it, expect } from "vitest";
import AuthRepositoryImpl from "../AuthRepositoryImpl";
import NewAuth from "../../../domain/auth/entity/NewAuth";
import UserLogin from "../../../domain/auth/entity/UserLogin";

describe("AuthRepositoryImpl", () => {
  const authRepositoryImpl: AuthRepositoryImpl = new AuthRepositoryImpl();

  describe("loginAccount function", () => {
    const validPayload = {
      email: "example1@email.com",
      password: "password123",
    };

    it("should return accessToken & refreshToken correctly when provided with valid credentials", async () => {
      const payload: UserLogin = new UserLogin(
        validPayload.email,
        validPayload.password,
      );
      const result: NewAuth = await authRepositoryImpl.loginAccount(payload);
      expect(result).toBeInstanceOf(NewAuth);
      expect(result.getAccessToken()).toBeDefined();
      expect(result.getRefreshToken()).toBeDefined();
    });

    it("should throw and error when the email is not found", async () => {
      const payload: UserLogin = new UserLogin(
        "notfound@email.com",
        validPayload.password,
      );
      await expect(
        authRepositoryImpl.loginAccount(payload),
      ).rejects.toThrowError("Invalid credentials");
    });
  });
});
