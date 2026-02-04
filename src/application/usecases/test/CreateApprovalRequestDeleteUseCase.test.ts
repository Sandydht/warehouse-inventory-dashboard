import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import type ApprovalRepository from "../../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../../domain/approval/constants";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import CreateApprovalRequestDeleteUseCase from "../CreateApprovalRequestDeleteUseCase";
import DeleteProduct from "../../../domain/approval/entity/DeleteProduct";

describe("Create approval request delete use case", () => {
  it("should orchestrating the create approval request delete action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

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
      deleteProduct: vi.fn().mockResolvedValue(mockApprovalRequest),
    };

    const createDeleteApprovalRequestUseCase: CreateApprovalRequestDeleteUseCase =
      new CreateApprovalRequestDeleteUseCase(
        mockMethodAssertion,
        mockApprovalRepository,
      );

    const mockDeleteProduct: DeleteProduct = new DeleteProduct("PRODUCT-001");

    const result: ApprovalRequest<InventoryItem> =
      await createDeleteApprovalRequestUseCase.execute(mockDeleteProduct);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockApprovalRepository,
      "deleteProduct",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockApprovalRepository.deleteProduct).toHaveBeenCalledWith(
      mockDeleteProduct,
    );
    expect(result).toStrictEqual(mockApprovalRequest);
  });
});
