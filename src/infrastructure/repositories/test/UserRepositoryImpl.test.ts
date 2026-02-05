import { describe, it, expect, vi } from "vitest";
import UserRepositoryImpl from "../UserRepositoryImpl";
import type { UserProfileResponseDto } from "../../dto/response/UserProfileResponseDto";
import type { UserRole } from "../../../domain/user/types";
import { privateApi } from "../../http/axiosInstance";
import type User from "../../../domain/user/entity/User";

vi.mock("../../http/axiosInstance", () => ({
  privateApi: {
    get: vi.fn(),
  },
}));

describe("UserRepositoryImpl", () => {
  const userRepositoryImpl: UserRepositoryImpl = new UserRepositoryImpl();

  describe("getUserProfile function", () => {
    it("should return user profile data correctly", async () => {
      const mockedResponse: UserProfileResponseDto = {
        id: "user-123",
        email: "example1@email.com",
        phoneNumber: "081123123123",
        fullName: "User",
        role: "OFFICER" as UserRole,
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: null,
        deletedAt: null,
      };
      vi.mocked(privateApi.get).mockResolvedValue({ data: mockedResponse });

      const response: User = await userRepositoryImpl.getUserProfile();

      expect(privateApi.get).toHaveBeenCalledWith("/user/get-profile");
      expect(response.getId()).toBe(mockedResponse.id);
      expect(response.getEmail()).toBe(mockedResponse.email);
      expect(response.getPhoneNumber()).toBe(mockedResponse.phoneNumber);
      expect(response.getFullName()).toBe(mockedResponse.fullName);
      expect(response.getRole()).toBe(mockedResponse.role);
      expect(response.getCreatedAt()).toBe(mockedResponse.createdAt);
      expect(response.getUpdatedAt()).toBe(mockedResponse.updatedAt);
      expect(response.getDeletedAt()).toBe(mockedResponse.deletedAt);
    });

    it("should throw error when get user profile fails", async () => {
      vi.mocked(privateApi.get).mockRejectedValue(
        new Error("Failed to fetch user profile"),
      );

      await expect(userRepositoryImpl.getUserProfile()).rejects.toThrowError(
        "Failed to fetch user profile",
      );
    });
  });
});
