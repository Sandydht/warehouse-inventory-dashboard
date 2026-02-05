import { describe, it, expect, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import type UserRepository from "../../../domain/user/UserRepository";
import User from "../../../domain/user/entity/User";
import GetUserProfileUseCase from "../GetUserProfileUseCase";
import { USER_REPOSITORY_ERRORS } from "../../../domain/user/constants";

describe("Get user profile use case", () => {
  it("should orchestrating the get user profile action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockUserRepository: UserRepository = {
      getUserProfile: vi
        .fn()
        .mockResolvedValue(
          new User(
            "user-001",
            "example1@email.com",
            "081123123123",
            "User 1",
            "OFFICER",
            new Date("2025-02-03").toISOString(),
            null,
            null,
          ),
        ),
    };

    const getUserProfileUseCase: GetUserProfileUseCase =
      new GetUserProfileUseCase(mockMethodAssertion, mockUserRepository);

    const result: User = await getUserProfileUseCase.execute();

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockUserRepository,
      "getUserProfile",
      USER_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockUserRepository.getUserProfile).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual(
      new User(
        "user-001",
        "example1@email.com",
        "081123123123",
        "User 1",
        "OFFICER",
        new Date("2025-02-03").toISOString(),
        null,
        null,
      ),
    );
  });
});
