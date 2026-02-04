import { approvalDependencies } from "../../../infrastructure/container";
import {
  toCreateApprovalResponseDto,
  toGetApprovalListResponseDto,
} from "../../../infrastructure/mappers/approvalMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const createApprovalRequest = createUseCaseThunk(
  "approval/create-approval-request",
  () => approvalDependencies.createApprovalRequestUseCase,
  (result) => toCreateApprovalResponseDto(result),
);

export const getApprovalList = createUseCaseThunk(
  "approval/get-approval-list",
  () => approvalDependencies.getApprovalListUseCase,
  (result) => toGetApprovalListResponseDto(result),
);
