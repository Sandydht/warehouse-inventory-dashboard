/* eslint-disable @typescript-eslint/no-unused-vars */
import { AUTH_REPOSITORY_ERRORS } from "./constants";

class AuthRepository {
  async verifyAvailableUserByEmailAndPassword(
    _email: string,
    _password: string,
  ): Promise<string> {
    throw new Error(AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default AuthRepository;
