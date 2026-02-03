import AddProductToInventoryUseCase from "../application/usecases/AddProductToInventoryUseCase";
import GetUserProfileUseCase from "../application/usecases/GetUserProfileUseCase";
import LoginAccountUseCase from "../application/usecases/LoginAccountUseCase";
import LogoutAccountUseCase from "../application/usecases/LogoutAccountUseCase";
import AuthRepositoryImpl from "./repositories/AuthRepositoryImpl";
import InventoryRepositoryImpl from "./repositories/InventoryRepositoryImpl";
import UserRepositoryImpl from "./repositories/UserRepositoryImpl";
import MethodAssertionImpl from "./utils/MethodAssertionImpl";
import SecureStorageImpl from "./utils/SecureStorageImpl";

const authenticationRepositoryImpl: AuthRepositoryImpl =
  new AuthRepositoryImpl();
const userRepositoryImpl: UserRepositoryImpl = new UserRepositoryImpl();
const secureStorageImpl: SecureStorageImpl = new SecureStorageImpl();
const methodAssertionImpl: MethodAssertionImpl = new MethodAssertionImpl();
const inventoryRepositoryImpl: InventoryRepositoryImpl =
  new InventoryRepositoryImpl();

export const authDependencies = {
  loginAccountUseCase: new LoginAccountUseCase(
    methodAssertionImpl,
    authenticationRepositoryImpl,
    secureStorageImpl,
  ),
  logoutAccountUseCase: new LogoutAccountUseCase(
    methodAssertionImpl,
    secureStorageImpl,
    authenticationRepositoryImpl,
  ),
};

export const userDependencies = {
  getUserProfileUseCase: new GetUserProfileUseCase(
    methodAssertionImpl,
    userRepositoryImpl,
  ),
};

export const inventoryDependencies = {
  addProductToInventoryUseCase: new AddProductToInventoryUseCase(
    methodAssertionImpl,
    inventoryRepositoryImpl,
  ),
};
