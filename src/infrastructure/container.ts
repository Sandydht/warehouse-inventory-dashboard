import GetUserProfileUseCase from "../application/usecases/GetUserProfileUseCase";
import LoginAccountUseCase from "../application/usecases/LoginAccountUseCase";
import AuthRepositoryImpl from "./repositories/AuthRepositoryImpl";
import UserRepositoryImpl from "./repositories/UserRepositoryImpl";
import MethodAssertionImpl from "./utils/MethodAssertionImpl";
import SecureStorageImpl from "./utils/SecureStorageImpl";

const authenticationRepositoryImpl: AuthRepositoryImpl =
  new AuthRepositoryImpl();
const userRepositoryImpl: UserRepositoryImpl = new UserRepositoryImpl();
const secureStorageImpl: SecureStorageImpl = new SecureStorageImpl();
const methodAssertionImpl: MethodAssertionImpl = new MethodAssertionImpl();

export const authDependencies = {
  loginAccountUseCase: new LoginAccountUseCase(
    methodAssertionImpl,
    authenticationRepositoryImpl,
    secureStorageImpl,
  ),
};

export const userDependencies = {
  getUserProfileUseCase: new GetUserProfileUseCase(
    methodAssertionImpl,
    userRepositoryImpl,
  ),
};
