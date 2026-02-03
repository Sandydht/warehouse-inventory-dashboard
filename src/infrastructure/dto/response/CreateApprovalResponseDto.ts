import type {
  ApprovalStatus,
  ApprovalType,
} from "../../../domain/approval/types";

export interface CreateApprovalResponseDto<T> {
  id: string;
  type: ApprovalType;
  status: ApprovalStatus;
  targetId: string | null;
  originalData: T | null;
  proposedData: T | null;
  rejectionReason: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
