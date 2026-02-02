import AuthRepository from "../../domain/auth/AuthRepository";
import UserDummyData from "../datasources/user.json";

class AuthRepositoryImpl extends AuthRepository {
  async verifyAvailableUserByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<string> {
    const findUser = UserDummyData.find(
      (user) => user.email == email && user.password == password,
    );
    if (!findUser) throw new Error("Invalid credentials");
    return findUser.id;
  }
}

export default AuthRepositoryImpl;
