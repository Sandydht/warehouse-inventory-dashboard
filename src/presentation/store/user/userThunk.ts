import { userDependencies } from "../../../infrastructure/container";
import { fromUserDomainToUserProfileResponseDto } from "../../../infrastructure/mappers/userMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const getUserProfile = createUseCaseThunk(
  "user/get-user-profile",
  () => userDependencies.getUserProfileUseCase,
  (result) => fromUserDomainToUserProfileResponseDto(result),
);
