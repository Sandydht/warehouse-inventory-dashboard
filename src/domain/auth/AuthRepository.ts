/* eslint-disable @typescript-eslint/no-unused-vars */
import { AUTH_REPOSITORY_ERRORS } from "./constants";
import type NewAuth from "./entity/NewAuth";
import type UserLogin from "./entity/UserLogin";

class AuthRepository {
  async loginAccount?(_payload: UserLogin): Promise<NewAuth> {
    throw new Error(AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default AuthRepository;
