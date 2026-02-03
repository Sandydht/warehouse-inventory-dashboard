import { approvalDependencies } from "../../../infrastructure/container";
import { toCreateApprovalResponseDto } from "../../../infrastructure/mappers/approvalMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const createApprovalRequest = createUseCaseThunk(
  "approval/create-approval-request",
  () => approvalDependencies.createApprovalRequestUseCase,
  (result) => toCreateApprovalResponseDto(result),
);
