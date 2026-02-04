import { describe, expect, it } from "vitest";
import { REJECT_REQUEST_ERRORS } from "../../constants";
import RejectRequest from "../RejectRequest";

describe("RejectRequest entity", () => {
  const validPayload = {
    id: "req-001",
    rejectReason: "Reject",
  };

  it("should throw error when id is empty", () => {
    expect(() => new RejectRequest("", validPayload.rejectReason)).toThrowError(
      REJECT_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should throw error when rejectReason is empty", () => {
    expect(() => new RejectRequest(validPayload.id, "")).toThrowError(
      REJECT_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const rejectRequest: RejectRequest = new RejectRequest(
      validPayload.id,
      validPayload.rejectReason,
    );

    expect(rejectRequest).toBeInstanceOf(RejectRequest);
    expect(rejectRequest.getId()).toBe(validPayload.id);
    expect(rejectRequest.getRejectReason()).toBe(validPayload.rejectReason);
  });
});
