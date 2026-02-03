import { describe, it, expect, vi } from "vitest";
import NewAuth from "../../../domain/auth/entity/NewAuth";
import UserLogin from "../../../domain/auth/entity/UserLogin";
import { publicApi } from "../../http/axiosInstance";
import AuthRepositoryImpl from "../AuthRepositoryImpl";
import type { UserLoginResponseDto } from "../../dto/response/UserLoginResponseDto";
import RefreshToken from "../../../domain/auth/entity/RefreshToken";

vi.mock("../../http/axiosInstance", () => ({
  publicApi: {
    post: vi.fn(),
  },
}));

describe("AuthRepositoryImpl", () => {
  const authRepositoryImpl: AuthRepositoryImpl = new AuthRepositoryImpl();

  describe("loginAccount function", () => {
    const validPayload = {
      email: "example1@email.com",
      password: "password123",
    };

    it("should login account and return auth data", async () => {
      const payload: UserLogin = new UserLogin(
        validPayload.email,
        validPayload.password,
      );

      const mockedUserLoginResponseDto: UserLoginResponseDto = {
        accessToken: "access-token",
        refreshToken: "refresh-token",
      };
      vi.mocked(publicApi.post).mockResolvedValue({
        data: mockedUserLoginResponseDto,
      });

      const response: NewAuth = await authRepositoryImpl.loginAccount(payload);

      expect(publicApi.post).toHaveBeenCalledWith(
        "/auth/login-account",
        payload,
      );
      expect(response.getAccessToken()).toBe(
        mockedUserLoginResponseDto.accessToken,
      );
      expect(response.getRefreshToken()).toBe(
        mockedUserLoginResponseDto.refreshToken,
      );
    });

    it("should throw error when login account fails", async () => {
      const payload: UserLogin = new UserLogin(
        validPayload.email,
        validPayload.password,
      );

      vi.mocked(publicApi.post).mockRejectedValue(
        new Error("Invalid credentials"),
      );

      await expect(
        authRepositoryImpl.loginAccount(payload),
      ).rejects.toThrowError("Invalid credentials");
      expect(publicApi.post).toHaveBeenCalledWith(
        "/auth/login-account",
        payload,
      );
    });
  });

  describe("logoutAccount function", () => {
    it("should logout account and return logout message", async () => {
      const mockedLogoutResponseDto = {
        message: "Logout successful",
      };
      vi.mocked(publicApi.post).mockResolvedValue({
        data: mockedLogoutResponseDto,
      });

      const response = await authRepositoryImpl.logoutAccount(
        new RefreshToken("valid-refresh-token"),
      );

      expect(publicApi.post).toHaveBeenCalledWith("/auth/logout-account", {
        refreshToken: "valid-refresh-token",
      });
      expect(response.getMessage()).toBe(mockedLogoutResponseDto.message);
    });

    it("should throw error when logout account fails", async () => {
      vi.mocked(publicApi.post).mockRejectedValue(new Error("Unauthorized"));

      await expect(
        authRepositoryImpl.logoutAccount(
          new RefreshToken("invalid-refresh-token"),
        ),
      ).rejects.toThrowError("Unauthorized");
      expect(publicApi.post).toHaveBeenCalledWith("/auth/logout-account", {
        refreshToken: "invalid-refresh-token",
      });
    });
  });
});
