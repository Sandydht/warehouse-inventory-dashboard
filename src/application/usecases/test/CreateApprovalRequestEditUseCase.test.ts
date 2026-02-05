import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import type ApprovalRepository from "../../../domain/approval/ApprovalRepository";
import { APPROVAL_REPOSITORY_ERRORS } from "../../../domain/approval/constants";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import CreateApprovalRequestEditUseCase from "../CreateApprovalRequestEditUseCase";
import EditProduct from "../../../domain/approval/entity/EditProduct";

describe("Create approval request edit use case", () => {
  it("should orchestrating the create approval request edit action correctly", async () => {
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
        "staff-id",
        "officer-id",
        now,
        now,
        null,
      );

    const mockApprovalRepository: ApprovalRepository = {
      editProduct: vi.fn().mockResolvedValue(mockApprovalRequest),
    };

    const createEditApprovalRequestUseCase: CreateApprovalRequestEditUseCase =
      new CreateApprovalRequestEditUseCase(
        mockMethodAssertion,
        mockApprovalRepository,
      );

    const mockEditProduct: EditProduct = new EditProduct(
      "env-001",
      "PRODUCT-001",
      "Product Name",
      "Electronics",
      500000,
      10,
      "Supplier Name",
    );

    const result: ApprovalRequest<InventoryItem> =
      await createEditApprovalRequestUseCase.execute(mockEditProduct);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockApprovalRepository,
      "editProduct",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockApprovalRepository.editProduct).toHaveBeenCalledWith(
      mockEditProduct,
    );
    expect(result).toStrictEqual(mockApprovalRequest);
  });
});
