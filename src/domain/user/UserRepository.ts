/* eslint-disable @typescript-eslint/no-unused-vars */
import { USER_REPOSITORY_ERRORS } from "./constants";
import type User from "./entity/User";

class UserRepository {
  async getUserById?(_id: string): Promise<User> {
    throw new Error(USER_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default UserRepository;
