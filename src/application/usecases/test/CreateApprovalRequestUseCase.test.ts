import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import type ApprovalRepository from "../../../domain/approval/ApprovalRepository";
import CreateApprovalRequestUseCase from "../CreateApprovalRequestUseCase";
import { APPROVAL_REPOSITORY_ERRORS } from "../../../domain/approval/constants";
import AddProduct from "../../../domain/approval/entity/AddProduct";
import ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";

describe("Create approval request use case", () => {
  it("should orchestrating the create approval request action correctly", async () => {
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
      createApprovalRequest: vi.fn().mockResolvedValue(mockApprovalRequest),
    };

    const createApprovalRequestUseCase: CreateApprovalRequestUseCase =
      new CreateApprovalRequestUseCase(
        mockMethodAssertion,
        mockApprovalRepository,
      );

    const mockAddProduct: AddProduct = new AddProduct(
      "PRODUCT-001",
      "Product Name",
      "Electronics",
      500000,
      10,
      "Supplier Name",
    );

    const result: ApprovalRequest<InventoryItem> =
      await createApprovalRequestUseCase.execute(mockAddProduct);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockApprovalRepository,
      "createApprovalRequest",
      APPROVAL_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockApprovalRepository.createApprovalRequest).toHaveBeenCalledWith(
      mockAddProduct,
    );
    expect(result).toStrictEqual(mockApprovalRequest);
  });
});
