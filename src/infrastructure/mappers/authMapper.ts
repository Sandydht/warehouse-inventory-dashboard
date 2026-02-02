import NewAuth from "../../domain/auth/entity/NewAuth";
import UserLogin from "../../domain/auth/entity/UserLogin";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";

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
