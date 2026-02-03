import type { AxiosResponse } from "axios";
import AuthRepository from "../../domain/auth/AuthRepository";
import NewAuth from "../../domain/auth/entity/NewAuth";
import type UserLogin from "../../domain/auth/entity/UserLogin";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";
import { publicApi } from "../http/axiosInstance";
import { toNewAuthDomain, toUserLoginRequestDto } from "../mappers/authMapper";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";

class AuthRepositoryImpl extends AuthRepository {
  async loginAccount(payload: UserLogin): Promise<NewAuth> {
    const { data } = await publicApi.post<
      UserLoginResponseDto,
      AxiosResponse<UserLoginResponseDto>,
      UserLoginRequestDto
    >("/auth/login-account", toUserLoginRequestDto(payload));

    return toNewAuthDomain(data);
  }
}

export default AuthRepositoryImpl;
