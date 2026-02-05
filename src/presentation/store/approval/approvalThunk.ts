import { approvalDependencies } from "../../../infrastructure/container";
import {
  fromApprovalRequestDomainToApprovalRequestDto,
  fromPaginatedResultDomainToGetApprovalListResponseDto,
} from "../../../infrastructure/mappers/approvalMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const createApprovalRequest = createUseCaseThunk(
  "approval/create-approval-request",
  () => approvalDependencies.createApprovalRequestUseCase,
  (result) => fromApprovalRequestDomainToApprovalRequestDto(result),
);

export const getApprovalList = createUseCaseThunk(
  "approval/get-approval-list",
  () => approvalDependencies.getApprovalListUseCase,
  (result) => fromPaginatedResultDomainToGetApprovalListResponseDto(result),
);

export const getApprovalRequestDetail = createUseCaseThunk(
  "approval/get-approval-request-detail",
  () => approvalDependencies.getApprovalRequestDetailUseCase,
  (result) => fromApprovalRequestDomainToApprovalRequestDto(result),
);

export const approveRequest = createUseCaseThunk(
  "approval/approve-request",
  () => approvalDependencies.approveRequestUseCase,
  (result) => fromApprovalRequestDomainToApprovalRequestDto(result),
);

export const rejectRequest = createUseCaseThunk(
  "approval/reject-request",
  () => approvalDependencies.rejectRequestUseCase,
  (result) => fromApprovalRequestDomainToApprovalRequestDto(result),
);

export const createApprovalRequestDelete = createUseCaseThunk(
  "approval/create-approval-request-delete",
  () => approvalDependencies.createDeleteApprovalRequestUseCase,
  (result) => fromApprovalRequestDomainToApprovalRequestDto(result),
);

export const createApprovalRequestEdit = createUseCaseThunk(
  "approval/create-approval-request-edit",
  () => approvalDependencies.createEditApprovalRequestUseCase,
  (result) => fromApprovalRequestDomainToApprovalRequestDto(result),
);
