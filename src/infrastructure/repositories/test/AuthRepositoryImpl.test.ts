import { describe, it, expect, vi } from "vitest";
import NewAuth from "../../../domain/auth/entity/NewAuth";
import UserLogin from "../../../domain/auth/entity/UserLogin";
import { publicApi } from "../../http/axiosInstance";
import AuthRepositoryImpl from "../AuthRepositoryImpl";
import type { UserLoginResponseDto } from "../../dto/response/UserLoginResponseDto";

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
  });
});
