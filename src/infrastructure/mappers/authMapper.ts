import NewAuth from "../../domain/auth/entity/NewAuth";
import type RefreshToken from "../../domain/auth/entity/RefreshToken";
import UserLogin from "../../domain/auth/entity/UserLogin";
import UserLogout from "../../domain/auth/entity/UserLogout";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import type { UserLogoutRequestDto } from "../dto/request/UserLogoutRequestDto";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";
import type { UserLogoutResponseDto } from "../dto/response/UserLogoutResponseDto";

export const fromUserLoginRequestDtoToUserLoginDomain = (
  dto: UserLoginRequestDto,
) => new UserLogin(dto.email, dto.password);

export const fromUserLoginDomainToUserLoginRequestDto = (
  domain: UserLogin,
): UserLoginRequestDto => ({
  email: domain.getEmail(),
  password: domain.getPassword(),
});

export const fromUserLoginResponseDtoToNewAuthDomain = (
  dto: UserLoginResponseDto,
): NewAuth => new NewAuth(dto.accessToken, dto.refreshToken);

export const fromNewAuthDomainToUserLoginResponseDto = (
  domain: NewAuth,
): UserLoginResponseDto => ({
  accessToken: domain.getAccessToken(),
  refreshToken: domain.getRefreshToken(),
});

export const fromUserLogoutResponseDtoToUserLogoutDomain = (
  dto: UserLogoutResponseDto,
): UserLogout => new UserLogout(dto.message);

export const fromRefreshTokenDomainToUserLogoutRequestDto = (
  domain: RefreshToken,
): UserLogoutRequestDto => ({
  refreshToken: domain.getToken(),
});

export const fromUserLogoutDomainToUserLogoutResponseDto = (
  domain: UserLogout,
): UserLogoutResponseDto => ({
  message: domain.getMessage(),
});
