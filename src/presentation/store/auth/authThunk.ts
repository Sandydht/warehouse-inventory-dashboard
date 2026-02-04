import { authDependencies } from "../../../infrastructure/container";
import {
  fromNewAuthDomainToUserLoginResponseDto,
  fromUserLogoutDomainToUserLogoutResponseDto,
} from "../../../infrastructure/mappers/authMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const loginAccount = createUseCaseThunk(
  "auth/login-account",
  () => authDependencies.loginAccountUseCase,
  (result) => fromNewAuthDomainToUserLoginResponseDto(result),
);

export const logoutAccount = createUseCaseThunk(
  "auth/logout-account",
  () => authDependencies.logoutAccountUseCase,
  (result) => fromUserLogoutDomainToUserLogoutResponseDto(result),
);
