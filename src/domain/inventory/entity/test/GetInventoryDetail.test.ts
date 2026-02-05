import { describe, expect, it } from "vitest";
import GetInventoryDetail from "../GetInventoryDetail";
import { GET_INVENTORY_DETAIL_ERRORS } from "../../constants";

describe("GetInventoryDetail entity", () => {
  const validPayload = {
    id: "req-001",
  };

  it("should throw error when id is empty", () => {
    expect(() => new GetInventoryDetail("")).toThrowError(
      GET_INVENTORY_DETAIL_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const getInventoryDetail: GetInventoryDetail = new GetInventoryDetail(
      validPayload.id,
    );

    expect(getInventoryDetail).toBeInstanceOf(GetInventoryDetail);
    expect(getInventoryDetail.getId()).toBe(validPayload.id);
  });
});
