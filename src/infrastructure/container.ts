import ApproveRequestUseCase from "../application/usecases/ApproveRequestUseCase";
import CreateApprovalRequestUseCase from "../application/usecases/CreateApprovalRequestUseCase";
import GetApprovalListUseCase from "../application/usecases/GetApprovalListUseCase";
import GetApprovalRequestDetailUseCase from "../application/usecases/GetApprovalRequestDetailUseCase";
import GetUserProfileUseCase from "../application/usecases/GetUserProfileUseCase";
import LoginAccountUseCase from "../application/usecases/LoginAccountUseCase";
import LogoutAccountUseCase from "../application/usecases/LogoutAccountUseCase";
import RejectRequestUseCase from "../application/usecases/RejectRequestUseCase";
import ApprovalRepositoryImpl from "./repositories/ApprovalRepositoryImpl";
import AuthRepositoryImpl from "./repositories/AuthRepositoryImpl";
import UserRepositoryImpl from "./repositories/UserRepositoryImpl";
import MethodAssertionImpl from "./utils/MethodAssertionImpl";
import SecureStorageImpl from "./utils/SecureStorageImpl";

const authenticationRepositoryImpl: AuthRepositoryImpl =
  new AuthRepositoryImpl();
const userRepositoryImpl: UserRepositoryImpl = new UserRepositoryImpl();
const secureStorageImpl: SecureStorageImpl = new SecureStorageImpl();
const methodAssertionImpl: MethodAssertionImpl = new MethodAssertionImpl();
const approvalRepositoryImpl: ApprovalRepositoryImpl =
  new ApprovalRepositoryImpl();

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
};
