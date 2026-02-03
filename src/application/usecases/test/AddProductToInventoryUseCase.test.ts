import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import type InventoryRepository from "../../../domain/inventory/InventoryRepository";
import AddProductToInventoryUseCase from "../AddProductToInventoryUseCase";
import AddProduct from "../../../domain/inventory/entity/AddProduct";
import { INVENTORY_REPOSITORY_ERRORS } from "../../../domain/inventory/constants";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import ApprovalRequest from "../../../domain/inventory/entity/ApprovalRequest";

describe("Add product to inventory use case", () => {
  it("should orchestrating the add product to inventory action correctly", async () => {
    const mockAddProduct: AddProduct = new AddProduct(
      "PROD-001",
      "Product Name",
      "Electronics",
      100000,
      10,
      "Supplier Name",
    );

    const mockInventoryItem: InventoryItem = new InventoryItem(
      "inv-123",
      "PROD-123",
      "Product name",
      "Electronics",
      1500000,
      10,
      "Supplier Name",
      new Date("2026-03-02").toISOString(),
      new Date("2026-03-02").toISOString(),
      null,
    );

    const mockApprovalRequest: ApprovalRequest = new ApprovalRequest(
      "req-123",
      "CREATE",
      "PENDING",
      null,
      null,
      mockInventoryItem,
      null,
      "user1",
      new Date("2026-03-02").toISOString(),
      new Date("2026-03-02").toISOString(),
      null,
    );

    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockInventoryRepository: InventoryRepository = {
      addProductToInventory: vi.fn().mockResolvedValue(mockApprovalRequest),
    };

    const addProductToInventoryUseCase: AddProductToInventoryUseCase =
      new AddProductToInventoryUseCase(
        mockMethodAssertion,
        mockInventoryRepository,
      );

    const result: ApprovalRequest =
      await addProductToInventoryUseCase.execute(mockAddProduct);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockInventoryRepository,
      "addProductToInventory",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockInventoryRepository.addProductToInventory).toHaveBeenCalledWith(
      mockAddProduct,
    );
    expect(result).toStrictEqual(mockApprovalRequest);
  });
});
