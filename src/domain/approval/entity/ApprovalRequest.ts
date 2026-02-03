import InputValidator from "../../utils/InputValidator.util";
import { APPROVAL_REQUEST_ERRORS } from "../constants";
import type { ApprovalStatus, ApprovalType } from "../types";

class ApprovalRequest<T> {
  private readonly id: string;
  private readonly type: ApprovalType;
  private readonly status: ApprovalStatus;
  private readonly targetId: string | null;
  private readonly originalData: T | null;
  private readonly proposedData: T | null;
  private readonly rejectionReason: string | null;
  private readonly createdBy: string;
  private readonly createdAt: string;
  private readonly updatedAt: string | null;
  private readonly deletedAt: string | null;

  constructor(
    id: string,
    type: ApprovalType,
    status: ApprovalStatus,
    targetId: string | null,
    originalData: T | null,
    proposedData: T | null,
    rejectionReason: string | null,
    createdBy: string,
    createdAt: string,
    updatedAt: string | null,
    deletedAt: string | null,
  ) {
    this._verifyPayload(id, createdBy, createdAt);

    this.id = id;
    this.type = type;
    this.status = status;
    this.targetId = targetId;
    this.originalData = originalData;
    this.proposedData = proposedData;
    this.rejectionReason = rejectionReason;
    this.createdBy = createdBy;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private _verifyPayload(id: string, createdBy: string, createdAt: string) {
    InputValidator.requireNotBlank(
      id,
      APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      createdBy,
      APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      createdAt,
      APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getId(): string {
    return this.id;
  }

  getType(): ApprovalType {
    return this.type;
  }

  getStatus(): ApprovalStatus {
    return this.status;
  }

  getTargetId(): string | null {
    return this.targetId;
  }

  getOriginalData(): T | null {
    return this.originalData;
  }

  getProposedData(): T | null {
    return this.proposedData;
  }

  getRejectionReason(): string | null {
    return this.rejectionReason;
  }

  getCreatedBy(): string {
    return this.createdBy;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  getUpdatedAt(): string | null {
    return this.updatedAt;
  }

  getDeletedAt(): string | null {
    return this.deletedAt;
  }
}

export default ApprovalRequest;
