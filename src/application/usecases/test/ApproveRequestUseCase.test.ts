import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import ApproveRequest from "../../../domain/approval/entity/ApproveRequest";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import type ApprovalRepository from "../../../domain/approval/ApprovalRepository";
import ApproveRequestUseCase from "../ApproveRequestUseCase";
import { APPROVAL_REPOSITORY_ERRORS } from "../../../domain/approval/constants";

describe("Approve request use case", () => {
  it("should orchestrating the approve request action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockApproveRequest: ApproveRequest = new ApproveRequest("req-001");

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
      approveRequest: vi.fn().mockResolvedValue(mockApprovalRequest),
    };

    const approveRequestUseCase: ApproveRequestUseCase =
      new ApproveRequestUseCase(mockMethodAssertion, mockApprovalRepository);

    const result: ApprovalRequest<InventoryItem> =
      await approveRequestUseCase.execute(mockApproveRequest);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockApprovalRepository,
      "approveRequest",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockApprovalRepository.approveRequest).toHaveBeenCalledWith(
      mockApproveRequest,
    );
    expect(result).toStrictEqual(mockApprovalRequest);
  });
});
