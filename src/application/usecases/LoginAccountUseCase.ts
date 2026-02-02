import type AuthRepository from "../../domain/auth/AuthRepository";
import { AUTH_REPOSITORY_ERRORS } from "../../domain/auth/constants";
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

  async execute(payload: UserLogin): Promise<void> {
    this.methodAssertion.assertImplemented(
      this.authRepository,
      "verifyAvailableUserByEmailAndPassword",
      AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    this.methodAssertion.assertImplemented(
      this.secureStorage,
      "setSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    const userId: string =
      await this.authRepository.verifyAvailableUserByEmailAndPassword(
        payload.getEmail(),
        payload.getPassword(),
      );
    this.secureStorage.setSecureItem("accessToken", userId);
  }
}

export default LoginAccountUseCase;
