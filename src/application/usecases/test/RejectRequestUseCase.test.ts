import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import type ApprovalRepository from "../../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../../domain/approval/constants";
import RejectRequest from "../../../domain/approval/entity/RejectRequest";
import RejectRequestUseCase from "../RejectRequestUseCase";

describe("Reject request use case", () => {
  it("should orchestrating the reject request action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockRejectRequest: RejectRequest = new RejectRequest(
      "req-001",
      "Test",
    );

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
        "staff-id",
        "officer-id",
        now,
        now,
        null,
      );

    const mockApprovalRepository: ApprovalRepository = {
      rejectRequst: vi.fn().mockResolvedValue(mockApprovalRequest),
    };

    const rejectRequestUseCase: RejectRequestUseCase = new RejectRequestUseCase(
      mockMethodAssertion,
      mockApprovalRepository,
    );

    const result: ApprovalRequest<InventoryItem> =
      await rejectRequestUseCase.execute(mockRejectRequest);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockApprovalRepository,
      "rejectRequst",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockApprovalRepository.rejectRequst).toHaveBeenCalledWith(
      mockRejectRequest,
    );
    expect(result).toStrictEqual(mockApprovalRequest);
  });
});
