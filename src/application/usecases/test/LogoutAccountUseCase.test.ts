import { describe, it, expect, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import type AuthRepository from "../../../domain/auth/AuthRepository";
import UserLogout from "../../../domain/auth/entity/UserLogout";
import LogoutAccountUseCase from "../LogoutAccountUseCase";
import { AUTH_REPOSITORY_ERRORS } from "../../../domain/auth/constants";
import type SecureStorage from "../../utils/SecureStorage";

describe("Logout account use case", () => {
  it("should orchestrating the logout account action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockAuthRepository: AuthRepository = {
      logoutAccount: vi.fn().mockResolvedValue(new UserLogout("See you!")),
    };

    const mockSecureStorage: SecureStorage = {
      setSecureItem: vi.fn(),
    };

    const logoutAccountUseCase = new LogoutAccountUseCase(
      mockMethodAssertion,
      mockSecureStorage,
      mockAuthRepository,
    );

    const result: UserLogout = await logoutAccountUseCase.execute();

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockAuthRepository,
      "logoutAccount",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockAuthRepository.logoutAccount).toHaveBeenCalled();
    expect(result).toStrictEqual(new UserLogout("See you!"));
  });
});
