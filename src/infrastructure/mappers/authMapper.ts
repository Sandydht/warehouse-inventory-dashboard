import NewAuth from "../../domain/auth/entity/NewAuth";
import type RefreshToken from "../../domain/auth/entity/RefreshToken";
import UserLogin from "../../domain/auth/entity/UserLogin";
import UserLogout from "../../domain/auth/entity/UserLogout";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import type { UserLogoutRequestDto } from "../dto/request/UserLogoutRequestDto";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";
import type { UserLogoutResponseDto } from "../dto/response/UserLogoutResponseDto";

export const toUserLoginDomain = (dto: UserLoginRequestDto) =>
  new UserLogin(dto.email, dto.password);

export const toUserLoginRequestDto = (
  domain: UserLogin,
): UserLoginRequestDto => ({
  email: domain.getEmail(),
  password: domain.getPassword(),
});

export const toNewAuthDomain = (dto: UserLoginResponseDto): NewAuth =>
  new NewAuth(dto.accessToken, dto.refreshToken);

export const toUserLoginResponseDto = (
  domain: NewAuth,
): UserLoginResponseDto => ({
  accessToken: domain.getAccessToken(),
  refreshToken: domain.getRefreshToken(),
});

export const toUserLogoutDomain = (dto: UserLogoutResponseDto): UserLogout =>
  new UserLogout(dto.message);

export const toUserLogoutRequestDto = (
  domain: RefreshToken,
): UserLogoutRequestDto => ({
  refreshToken: domain.getToken(),
});

export const toUserLogoutResponseDto = (
  domain: UserLogout,
): UserLogoutResponseDto => ({
  message: domain.getMessage(),
});
