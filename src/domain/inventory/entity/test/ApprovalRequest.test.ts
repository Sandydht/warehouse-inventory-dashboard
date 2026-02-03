import { describe, it, expect } from "vitest";
import ApprovalRequest from "../ApprovalRequest";
import type { RequestStatus, RequestType } from "../../types";
import { APPROVAL_REQUEST_ERRORS } from "../../constants";

describe("ApprovalRequest entity", () => {
  const validPayload = {
    id: "approval-request-001",
    type: "CREATE",
    status: "PENDING",
    targetId: null,
    originalData: null,
    proposedData: null,
    rejectionReason: null,
    createdBy: "user1",
    createdAt: new Date("2026-02-03").toISOString(),
    updatedAt: new Date("2026-02-03").toISOString(),
    deletedAt: null,
  };

  it("should throw error when id is empty", () => {
    expect(
      () =>
        new ApprovalRequest(
          "",
          validPayload.type as RequestType,
          validPayload.status as RequestStatus,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          validPayload.createdBy,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when type is empty", () => {
    expect(
      () =>
        new ApprovalRequest(
          validPayload.id,
          "" as RequestType,
          validPayload.status as RequestStatus,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          validPayload.createdBy,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when status is empty", () => {
    expect(
      () =>
        new ApprovalRequest(
          validPayload.id,
          validPayload.type as RequestType,
          "" as RequestStatus,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          validPayload.createdBy,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdBy is empty", () => {
    expect(
      () =>
        new ApprovalRequest(
          validPayload.id,
          validPayload.type as RequestType,
          validPayload.status as RequestStatus,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          "",
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdAt is empty", () => {
    expect(
      () =>
        new ApprovalRequest(
          validPayload.id,
          validPayload.type as RequestType,
          validPayload.status as RequestStatus,
          validPayload.targetId,
          validPayload.originalData,
          validPayload.proposedData,
          validPayload.rejectionReason,
          validPayload.createdBy,
          "",
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(APPROVAL_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should create object correctly when payload is valid", () => {
    const approvalRequest: ApprovalRequest = new ApprovalRequest(
      validPayload.id,
      validPayload.type as RequestType,
      validPayload.status as RequestStatus,
      validPayload.targetId,
      validPayload.originalData,
      validPayload.proposedData,
      validPayload.rejectionReason,
      validPayload.createdBy,
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
    expect(approvalRequest.getRejectReason()).toBe(
      validPayload.rejectionReason,
    );
    expect(approvalRequest.getCreatedBy()).toBe(validPayload.createdBy);
    expect(approvalRequest.getCreatedAt()).toBe(validPayload.createdAt);
    expect(approvalRequest.getUpdatedAt()).toBe(validPayload.updatedAt);
    expect(approvalRequest.getDeletedAt()).toBe(validPayload.deletedAt);
  });
});
