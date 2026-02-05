import { describe, expect, it } from "vitest";
import ApprovalRequest from "../ApprovalRequest";
import type { ApprovalStatus, ApprovalType } from "../../types";
import { APPROVAL_REQUEST_ERRORS } from "../../constants";

describe("ApprovalRequest entity", () => {
  const validPayload = {
    id: "req-001",
    type: "CREATE" as ApprovalType,
    status: "PENDING" as ApprovalStatus,
    targetId: null,
    originalData: null,
    proposedData: null,
    rejectionReason: null,
    createdBy: "staff-id",
    checkedBy: "officer-id",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  };

  it("should throw error when id is empty", () => {
    expect(
      () =>
        new ApprovalRequest<unknown>(
          "",
          validPayload.type,
          validPayload.status,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          validPayload.createdBy,
          validPayload.checkedBy,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdBy is empty", () => {
    expect(
      () =>
        new ApprovalRequest<unknown>(
          validPayload.id,
          validPayload.type,
          validPayload.status,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          "",
          validPayload.checkedBy,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdAt is empty", () => {
    expect(
      () =>
        new ApprovalRequest<unknown>(
          validPayload.id,
          validPayload.type,
          validPayload.status,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          validPayload.createdBy,
          validPayload.checkedBy,
          "",
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should create object correctly when payload is valid", () => {
    const approvalRequest: ApprovalRequest<unknown> =
      new ApprovalRequest<unknown>(
        validPayload.id,
        validPayload.type,
        validPayload.status,
        validPayload.targetId,
        validPayload.originalData,
        validPayload.proposedData,
        validPayload.rejectionReason,
        validPayload.createdBy,
        validPayload.checkedBy,
        validPayload.createdAt,
        validPayload.updatedAt,
        validPayload.deletedAt,
      );

    expect(approvalRequest).toBeInstanceOf(ApprovalRequest);
    expect(approvalRequest.getId()).toBe(validPayload.id);
    expect(approvalRequest.getType()).toBe(validPayload.type);
    expect(approvalRequest.getStatus()).toBe(validPayload.status);
    expect(approvalRequest.getTargetId()).toBe(validPayload.targetId);
    expect(approvalRequest.getOriginalData()).toBe(validPayload.originalData);
    expect(approvalRequest.getProposedData()).toBe(validPayload.proposedData);
    expect(approvalRequest.getRejectionReason()).toBe(
      validPayload.rejectionReason,
    );
    expect(approvalRequest.getCreatedBy()).toBe(validPayload.createdBy);
    expect(approvalRequest.getCheckedBy()).toBe(validPayload.checkedBy);
    expect(approvalRequest.getCreatedAt()).toBe(validPayload.createdAt);
    expect(approvalRequest.getUpdatedAt()).toBe(validPayload.updatedAt);
    expect(approvalRequest.getDeletedAt()).toBe(validPayload.deletedAt);
  });
});
