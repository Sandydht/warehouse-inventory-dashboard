import InputValidator from "../../utils/InputValidator.util";
import { APPROVAL_REQUEST_ERRORS } from "../constants";
import type { RequestStatus, RequestType } from "../types";
import type InventoryItem from "./InventoryItem";

class ApprovalRequest {
  private readonly id: string;
  private readonly type: RequestType;
  private readonly status: RequestStatus;
  private readonly targetId: string | null;
  private readonly originalData: InventoryItem | null;
  private readonly proposedData: InventoryItem | null;
  private readonly rejectionReason: string | null;
  private readonly createdBy: string;
  private readonly createdAt: string;
  private readonly updatedAt: string | null;
  private readonly deletedAt: string | null;

  constructor(
    id: string,
    type: RequestType,
    status: RequestStatus,
    targetId: string | null,
    originalData: InventoryItem | null,
    proposedData: InventoryItem | null,
    rejectionReason: string | null,
    createdBy: string,
    createdAt: string,
    updatedAt: string | null,
    deletedAt: string | null,
  ) {
    this._verifyPayload(id, type, status, createdBy, createdAt);

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

  private _verifyPayload(
    id: string,
    type: RequestType,
    status: RequestStatus,
    createdBy: string,
    createdAt: string,
  ) {
    InputValidator.requireNotBlank(
      id,
      APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      type,
      APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      status,
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

  getType(): RequestType {
    return this.type;
  }

  getStatus(): RequestStatus {
    return this.status;
  }

  getTargetId(): string | null {
    return this.targetId;
  }

  getOriginalData(): InventoryItem | null {
    return this.originalData;
  }

  getProposedData(): InventoryItem | null {
    return this.proposedData;
  }

  getRejectReason(): string | null {
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
