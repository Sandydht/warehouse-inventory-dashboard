import User from "../../domain/user/entity/User";
import type { UserRole } from "../../domain/user/types";
import UserRepository from "../../domain/user/UserRepository";
import UserDummyData from "../datasources/json/user.json";

class UserRepositoryImpl extends UserRepository {
  async getUserById(id: string): Promise<User> {
    const findUser = UserDummyData.find((user) => id == user.id);
    if (!findUser) throw new Error("User not found");

    return new User(
      findUser.id,
      findUser.email,
      findUser.phoneNumber,
      findUser.fullName,
      findUser.role as UserRole,
      findUser.password,
      findUser.createdAt,
      findUser.updatedAt,
      findUser.deletedAt,
    );
  }
}

export default UserRepositoryImpl;
