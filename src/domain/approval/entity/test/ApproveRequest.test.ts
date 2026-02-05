import { describe, expect, it } from "vitest";
import ApproveRequest from "../ApproveRequest";
import { APPROVE_REQUEST_ERRORS } from "../../constants";

describe("ApproveRequest entity", () => {
  const validPayload = {
    id: "req-001",
  };

  it("should throw error when id is empty", () => {
    expect(() => new ApproveRequest("")).toThrowError(
      APPROVE_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const approveRequest: ApproveRequest = new ApproveRequest(validPayload.id);

    expect(approveRequest).toBeInstanceOf(ApproveRequest);
    expect(approveRequest.getId()).toBe(validPayload.id);
  });
});
