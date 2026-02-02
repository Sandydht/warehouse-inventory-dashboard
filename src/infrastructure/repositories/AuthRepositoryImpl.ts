import AuthRepository from "../../domain/auth/AuthRepository";
import NewAuth from "../../domain/auth/entity/NewAuth";
import type UserLogin from "../../domain/auth/entity/UserLogin";
import { loginAccountDummyApi } from "../datasources/api/auth.api";
import type { UserLoginResponseDto } from "../dto/response/UserLoginResponseDto";
import { toNewAuthDomain, toUserLoginRequestDto } from "../mappers/authMapper";

class AuthRepositoryImpl extends AuthRepository {
  async loginAccount(payload: UserLogin): Promise<NewAuth> {
    const result: UserLoginResponseDto = await loginAccountDummyApi(
      toUserLoginRequestDto(payload),
    );
    return toNewAuthDomain(result);
  }
}

export default AuthRepositoryImpl;
