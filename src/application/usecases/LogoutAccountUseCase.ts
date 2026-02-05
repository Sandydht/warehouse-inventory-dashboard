import type AuthRepository from "../../domain/auth/AuthRepository";
import { AUTH_REPOSITORY_ERRORS } from "../../domain/auth/constants";
import RefreshToken from "../../domain/auth/entity/RefreshToken";
import type UserLogout from "../../domain/auth/entity/UserLogout";
import { SECURE_STORAGE_ERRORS } from "../utils/constants";
import type MethodAssertion from "../utils/MethodAssertion";
import type SecureStorage from "../utils/SecureStorage";

class LogoutAccountUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly secureStorage: SecureStorage;
  private readonly authRepository: AuthRepository;

  constructor(
    methodAssertion: MethodAssertion,
    secureStorage: SecureStorage,
    authRepository: AuthRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.secureStorage = secureStorage;
    this.authRepository = authRepository;
  }

  async execute(): Promise<UserLogout> {
    this.methodAssertion.assertImplemented(
      this.secureStorage,
      "getSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    this.methodAssertion.assertImplemented(
      this.secureStorage,
      "removeSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    this.methodAssertion.assertImplemented(
      this.authRepository,
      "logoutAccount",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    const token = this.secureStorage.getSecureItem("refreshToken");
    if (!token) throw new Error("No refresh token found in secure storage.");

    const result: UserLogout = await this.authRepository.logoutAccount(
      new RefreshToken(token as string),
    );

    this.secureStorage.removeSecureItem("accessToken");
    this.secureStorage.removeSecureItem("refreshToken");

    return result;
  }
}

export default LogoutAccountUseCase;
