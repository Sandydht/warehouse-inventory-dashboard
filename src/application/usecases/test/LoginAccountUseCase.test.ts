import { describe, expect, it, vi } from "vitest";
import LoginAccountUseCase from "../LoginAccountUseCase";
import type MethodAssertion from "../../utils/MethodAssertion";
import UserLogin from "../../../domain/auth/entity/UserLogin";
import type AuthRepository from "../../../domain/auth/AuthRepository";
import { AUTH_REPOSITORY_ERRORS } from "../../../domain/auth/constants";
import type SecureStorage from "../../utils/SecureStorage";
import { SECURE_STORAGE_ERRORS } from "../../utils/constants";

describe("Login account use case", () => {
  it("should orchestrating the login account action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockAuthRepository: AuthRepository = {
      verifyAvailableUserByEmailAndPassword: vi
        .fn()
        .mockResolvedValue("user-001"),
    };

    const mockSecureStorage: SecureStorage = {
      setSecureItem: vi.fn(),
    };

    const loginAccountUseCase: LoginAccountUseCase = new LoginAccountUseCase(
      mockMethodAssertion,
      mockAuthRepository,
      mockSecureStorage,
    );

    await loginAccountUseCase.execute(
      new UserLogin("example1@email.com", "password123"),
    );

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockAuthRepository,
      "verifyAvailableUserByEmailAndPassword",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockSecureStorage,
      "setSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(
      mockAuthRepository.verifyAvailableUserByEmailAndPassword,
    ).toHaveBeenCalledWith("example1@email.com", "password123");
    expect(mockSecureStorage.setSecureItem).toHaveBeenCalledWith(
      "accessToken",
      "user-001",
    );
  });
});
