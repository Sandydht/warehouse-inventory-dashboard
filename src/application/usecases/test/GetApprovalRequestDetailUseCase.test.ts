import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import GetApprovalRequestDetail from "../../../domain/approval/entity/GetApprovalRequestDetail";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import type ApprovalRepository from "../../../domain/approval/ApprovalRepository";
import GetApprovalRequestDetailUseCase from "../GetApprovalRequestDetailUseCase";
import { APPROVAL_REPOSITORY_ERRORS } from "../../../domain/approval/constants";

describe("Get approval request detail use case", () => {
  it("should orchestrating the get approval request detail action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockGetApprovalRequestDetail: GetApprovalRequestDetail =
      new GetApprovalRequestDetail("req-001");

    const now = new Date("2026-03-02").toISOString();
    const mockInventoryItem: InventoryItem = new InventoryItem(
      "inv-001",
      "PRODUCT-001",
      "Product Name",
      "Electronics",
      500000,
      10,
      "Supplier Name",
      now,
      now,
      null,
    );

    const mockApprovalRequest: ApprovalRequest<InventoryItem> =
      new ApprovalRequest<InventoryItem>(
        "req-001",
        "CREATE",
        "PENDING",
        null,
        null,
        mockInventoryItem,
        null,
        "user",
        now,
        now,
        null,
      );

    const mockApprovalRepository: ApprovalRepository = {
      getApprovalRequestDetail: vi.fn().mockResolvedValue(mockApprovalRequest),
    };

    const getApprovalRequestDetailUseCase: GetApprovalRequestDetailUseCase =
      new GetApprovalRequestDetailUseCase(
        mockMethodAssertion,
        mockApprovalRepository,
      );

    const result: ApprovalRequest<InventoryItem> =
      await getApprovalRequestDetailUseCase.execute(
        mockGetApprovalRequestDetail,
      );

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockApprovalRepository,
      "getApprovalRequestDetail",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(
      mockApprovalRepository.getApprovalRequestDetail,
    ).toHaveBeenCalledWith(mockGetApprovalRequestDetail);
    expect(result).toStrictEqual(mockApprovalRequest);
  });
});
