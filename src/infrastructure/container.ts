import ApproveRequestUseCase from "../application/usecases/ApproveRequestUseCase";
import CreateApprovalRequestUseCase from "../application/usecases/CreateApprovalRequestUseCase";
import CreateApprovalRequestEditUseCase from "../application/usecases/CreateApprovalRequestEditUseCase";
import GetApprovalListUseCase from "../application/usecases/GetApprovalListUseCase";
import GetApprovalRequestDetailUseCase from "../application/usecases/GetApprovalRequestDetailUseCase";
import GetInventoryListUseCase from "../application/usecases/GetInventoryListUseCase";
import GetUserProfileUseCase from "../application/usecases/GetUserProfileUseCase";
import LoginAccountUseCase from "../application/usecases/LoginAccountUseCase";
import LogoutAccountUseCase from "../application/usecases/LogoutAccountUseCase";
import RejectRequestUseCase from "../application/usecases/RejectRequestUseCase";
import ApprovalRepositoryImpl from "./repositories/ApprovalRepositoryImpl";
import AuthRepositoryImpl from "./repositories/AuthRepositoryImpl";
import InventoryRepositoryImpl from "./repositories/InventoryRepositoryImpl";
import UserRepositoryImpl from "./repositories/UserRepositoryImpl";
import MethodAssertionImpl from "./utils/MethodAssertionImpl";
import SecureStorageImpl from "./utils/SecureStorageImpl";
import CreateApprovalRequestDeleteUseCase from "../application/usecases/CreateApprovalRequestDeleteUseCase";
import GetInventoryDetailUseCase from "../application/usecases/GetInventoryDetailUseCase";
import StockHistoryRepositoryImpl from "./repositories/StockHistoryRepositoryImpl";
import GetLast30DaysStockHistoryUseCase from "../application/usecases/GetLast30DaysStockHistoryUseCase";

const authenticationRepositoryImpl: AuthRepositoryImpl =
  new AuthRepositoryImpl();
const userRepositoryImpl: UserRepositoryImpl = new UserRepositoryImpl();
const secureStorageImpl: SecureStorageImpl = new SecureStorageImpl();
const methodAssertionImpl: MethodAssertionImpl = new MethodAssertionImpl();
const approvalRepositoryImpl: ApprovalRepositoryImpl =
  new ApprovalRepositoryImpl();
const inventoryRepositoryImpl: InventoryRepositoryImpl =
  new InventoryRepositoryImpl();
const stockHistoryRepositoryImpl: StockHistoryRepositoryImpl =
  new StockHistoryRepositoryImpl();

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

export const approvalDependencies = {
  createApprovalRequestUseCase: new CreateApprovalRequestUseCase(
    methodAssertionImpl,
    approvalRepositoryImpl,
  ),
  getApprovalListUseCase: new GetApprovalListUseCase(
    methodAssertionImpl,
    approvalRepositoryImpl,
  ),
  getApprovalRequestDetailUseCase: new GetApprovalRequestDetailUseCase(
    methodAssertionImpl,
    approvalRepositoryImpl,
  ),
  approveRequestUseCase: new ApproveRequestUseCase(
    methodAssertionImpl,
    approvalRepositoryImpl,
  ),
  rejectRequestUseCase: new RejectRequestUseCase(
    methodAssertionImpl,
    approvalRepositoryImpl,
  ),
  createDeleteApprovalRequestUseCase: new CreateApprovalRequestDeleteUseCase(
    methodAssertionImpl,
    approvalRepositoryImpl,
  ),
  createEditApprovalRequestUseCase: new CreateApprovalRequestEditUseCase(
    methodAssertionImpl,
    approvalRepositoryImpl,
  ),
};

export const inventoryDependencies = {
  getInventoryListUseCase: new GetInventoryListUseCase(
    methodAssertionImpl,
    inventoryRepositoryImpl,
  ),
  getInventoryDetailUseCase: new GetInventoryDetailUseCase(
    methodAssertionImpl,
    inventoryRepositoryImpl,
  ),
};

export const stockHistoryDependencies = {
  getLast30DaysStockHistoryUseCase: new GetLast30DaysStockHistoryUseCase(
    methodAssertionImpl,
    stockHistoryRepositoryImpl,
  ),
};
