import { describe, it, expect, vi } from "vitest";
import UserRepository from "../UserRepository";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import { USER_REPOSITORY_ERRORS } from "../constants";

describe("UserRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const userRepository = new UserRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      userRepository,
      "getUserProfile",
      USER_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(userRepository).toBeInstanceOf(UserRepository);
    await expect(userRepository.getUserProfile()).rejects.toThrowError(
      USER_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
  });
});
