import { describe, it, vi, expect } from "vitest";
import AuthRepository from "../AuthRepository";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import { AUTH_REPOSITORY_ERRORS } from "../constants";

describe("AuthRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const authRepository: AuthRepository = new AuthRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      authRepository,
      "verifyAvailableUserByEmailAndPassword",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(authRepository).toBeInstanceOf(AuthRepository);
    await expect(
      authRepository.verifyAvailableUserByEmailAndPassword(
        "example1@email.com",
        "password123",
      ),
    ).rejects.toThrowError(AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  });
});
