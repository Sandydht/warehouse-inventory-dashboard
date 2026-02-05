import type {
  ApprovalStatus,
  ApprovalType,
} from "../../../domain/approval/types";

export interface ApprovalRequestDto<T> {
  id: string;
  type: ApprovalType;
  status: ApprovalStatus;
  targetId: string | null;
  originalData: T | null;
  proposedData: T | null;
  rejectionReason: string | null;
  createdBy: string;
  checkedBy: string | null;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
