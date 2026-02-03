import { describe, it, vi, expect } from "vitest";
import AuthRepository from "../AuthRepository";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import { AUTH_REPOSITORY_ERRORS } from "../constants";
import UserLogin from "../entity/UserLogin";
import RefreshToken from "../entity/RefreshToken";

describe("AuthRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const authRepository: AuthRepository = new AuthRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      authRepository,
      "loginAccount",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      authRepository,
      "logoutAccount",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(authRepository).toBeInstanceOf(AuthRepository);
    await expect(
      authRepository.loginAccount(
        new UserLogin("example@email.com", "password123"),
      ),
    ).rejects.toThrowError(AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
    await expect(
      authRepository.logoutAccount(new RefreshToken("valid-refresh-token")),
    ).rejects.toThrowError(AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  });
});
