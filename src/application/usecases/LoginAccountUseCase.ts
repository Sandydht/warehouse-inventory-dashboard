import type AuthRepository from "../../domain/auth/AuthRepository";
import { AUTH_REPOSITORY_ERRORS } from "../../domain/auth/constants";
import NewAuth from "../../domain/auth/entity/NewAuth";
import type UserLogin from "../../domain/auth/entity/UserLogin";
import { SECURE_STORAGE_ERRORS } from "../utils/constants";
import type MethodAssertion from "../utils/MethodAssertion";
import type SecureStorage from "../utils/SecureStorage";

class LoginAccountUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly authRepository: AuthRepository;
  private readonly secureStorage: SecureStorage;

  constructor(
    methodAssertion: MethodAssertion,
    authRepository: AuthRepository,
    secureStorage: SecureStorage,
  ) {
    this.methodAssertion = methodAssertion;
    this.authRepository = authRepository;
    this.secureStorage = secureStorage;
  }

  async execute(payload: UserLogin): Promise<NewAuth> {
    this.methodAssertion.assertImplemented(
      this.authRepository,
      "loginAccount",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    this.methodAssertion.assertImplemented(
      this.secureStorage,
      "setSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    const result: NewAuth = await this.authRepository.loginAccount(payload);

    this.secureStorage.setSecureItem("accessToken", result.getAccessToken());
    this.secureStorage.setSecureItem("refreshToken", result.getRefreshToken());

    return result;
  }
}

export default LoginAccountUseCase;
