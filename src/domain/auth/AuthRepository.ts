/* eslint-disable @typescript-eslint/no-unused-vars */
import { AUTH_REPOSITORY_ERRORS } from "./constants";
import type NewAuth from "./entity/NewAuth";
import type RefreshToken from "./entity/RefreshToken";
import type UserLogin from "./entity/UserLogin";
import type UserLogout from "./entity/UserLogout";

class AuthRepository {
  async loginAccount?(_payload: UserLogin): Promise<NewAuth> {
    throw new Error(AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  async logoutAccount?(_payload: RefreshToken): Promise<UserLogout> {
    throw new Error(AUTH_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default AuthRepository;
