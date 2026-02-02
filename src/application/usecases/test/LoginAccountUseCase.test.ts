import { describe, expect, it, vi } from "vitest";
import LoginAccountUseCase from "../LoginAccountUseCase";
import type MethodAssertion from "../../utils/MethodAssertion";
import UserLogin from "../../../domain/auth/entity/UserLogin";
import type AuthRepository from "../../../domain/auth/AuthRepository";
import { AUTH_REPOSITORY_ERRORS } from "../../../domain/auth/constants";
import type SecureStorage from "../../utils/SecureStorage";
import { SECURE_STORAGE_ERRORS } from "../../utils/constants";
import NewAuth from "../../../domain/auth/entity/NewAuth";

describe("Login account use case", () => {
  it("should orchestrating the login account action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockAuthRepository: AuthRepository = {
      loginAccount: vi
        .fn()
        .mockResolvedValue(new NewAuth("access-token", "refresh-token")),
    };

    const mockSecureStorage: SecureStorage = {
      setSecureItem: vi.fn(),
    };

    const loginAccountUseCase: LoginAccountUseCase = new LoginAccountUseCase(
      mockMethodAssertion,
      mockAuthRepository,
      mockSecureStorage,
    );

    const result: NewAuth = await loginAccountUseCase.execute(
      new UserLogin("example1@email.com", "password123"),
    );

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockAuthRepository,
      "loginAccount",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockSecureStorage,
      "setSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockAuthRepository.loginAccount).toHaveBeenCalledWith(
      new UserLogin("example1@email.com", "password123"),
    );
    expect(mockSecureStorage.setSecureItem).toHaveBeenCalledWith(
      "accessToken",
      "access-token",
    );
    expect(mockSecureStorage.setSecureItem).toHaveBeenCalledWith(
      "refreshToken",
      "refresh-token",
    );
    expect(result.getAccessToken()).toBe("access-token");
    expect(result.getRefreshToken()).toBe("refresh-token");
  });
});
