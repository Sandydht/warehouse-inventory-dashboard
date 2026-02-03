import { authDependencies } from "../../../infrastructure/container";
import {
  toUserLoginResponseDto,
  toUserLogoutResponseDto,
} from "../../../infrastructure/mappers/authMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const loginAccount = createUseCaseThunk(
  "auth/login-account",
  () => authDependencies.loginAccountUseCase,
  (result) => toUserLoginResponseDto(result),
);

export const logoutAccount = createUseCaseThunk(
  "auth/logout-account",
  () => authDependencies.logoutAccountUseCase,
  (result) => toUserLogoutResponseDto(result),
);
