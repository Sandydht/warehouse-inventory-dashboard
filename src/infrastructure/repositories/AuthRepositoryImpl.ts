import type { AxiosResponse } from "axios";
import AuthRepository from "../../domain/auth/AuthRepository";
import NewAuth from "../../domain/auth/entity/NewAuth";
import type UserLogin from "../../domain/auth/entity/UserLogin";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";
import { publicApi } from "../http/axiosInstance";
import {
  toNewAuthDomain,
  toUserLoginRequestDto,
  toUserLogoutDomain,
  toUserLogoutRequestDto,
} from "../mappers/authMapper";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import type { UserLogoutResponseDto } from "../dto/response/UserLogoutResponseDto";
import type UserLogout from "../../domain/auth/entity/UserLogout";
import type RefreshToken from "../../domain/auth/entity/RefreshToken";
import type { UserLogoutRequestDto } from "../dto/request/UserLogoutRequestDto";

class AuthRepositoryImpl extends AuthRepository {
  async loginAccount(payload: UserLogin): Promise<NewAuth> {
    const { data } = await publicApi.post<
      UserLoginResponseDto,
      AxiosResponse<UserLoginResponseDto>,
      UserLoginRequestDto
    >("/auth/login-account", toUserLoginRequestDto(payload));

    return toNewAuthDomain(data);
  }

  async logoutAccount(payload: RefreshToken): Promise<UserLogout> {
    const { data } = await publicApi.post<
      UserLogoutResponseDto,
      AxiosResponse<UserLogoutResponseDto>,
      UserLogoutRequestDto
    >("/auth/logout-account", toUserLogoutRequestDto(payload));

    return toUserLogoutDomain(data);
  }
}

export default AuthRepositoryImpl;
