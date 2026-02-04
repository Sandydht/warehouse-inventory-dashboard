import { describe, expect, it } from "vitest";
import GetApprovalRequestDetail from "../GetApprovalRequestDetail";
import { GET_APPROVAL_REQUEST_DETAIL_ERRORS } from "../../constants";

describe("GetApprovalRequestDetail entity", () => {
  const validPayload = {
    id: "req-001",
  };

  it("should throw error when id is empty", () => {
    expect(() => new GetApprovalRequestDetail("")).toThrowError(
      GET_APPROVAL_REQUEST_DETAIL_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const getApprovalRequestDetail: GetApprovalRequestDetail =
      new GetApprovalRequestDetail(validPayload.id);

    expect(getApprovalRequestDetail).toBeInstanceOf(GetApprovalRequestDetail);
    expect(getApprovalRequestDetail.getId()).toBe(validPayload.id);
  });
});
