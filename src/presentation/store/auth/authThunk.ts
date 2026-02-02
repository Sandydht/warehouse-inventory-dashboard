import { authDependencies } from "../../../infrastructure/container";
import { toUserLoginResponseDto } from "../../../infrastructure/mappers/authMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const loginAccount = createUseCaseThunk(
  "auth/login-account",
  () => authDependencies.loginAccountUseCase,
  (result) => toUserLoginResponseDto(result),
);
