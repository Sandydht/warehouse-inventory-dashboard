import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import type InventoryRepository from "../../../domain/inventory/InventoryRepository";
import AddedProduct from "../../../domain/inventory/entity/AddedProduct";
import AddProductToInventoryUseCase from "../AddProductToInventoryUseCase";
import AddProduct from "../../../domain/inventory/entity/AddProduct";
import { INVENTORY_REPOSITORY_ERRORS } from "../../../domain/inventory/constants";

describe("Add product to inventory use case", () => {
  it("should orchestrating the add product to inventory action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockInventoryRepository: InventoryRepository = {
      addProductToInventory: vi
        .fn()
        .mockResolvedValue(
          new AddedProduct(
            "prod-123",
            "PROD-001",
            "Product Name",
            "Electronics",
            100000,
            10,
            "Supplier Name",
            new Date("2025-02-03").toISOString(),
            null,
            null,
          ),
        ),
    };

    const addProductToInventoryUseCase: AddProductToInventoryUseCase =
      new AddProductToInventoryUseCase(
        mockMethodAssertion,
        mockInventoryRepository,
      );

    const result: AddedProduct = await addProductToInventoryUseCase.execute(
      new AddProduct(
        "PROD-001",
        "Product Name",
        "Electronics",
        100000,
        10,
        "Supplier Name",
      ),
    );

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockInventoryRepository,
      "addProductToInventory",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockInventoryRepository.addProductToInventory).toHaveBeenCalledWith(
      new AddProduct(
        "PROD-001",
        "Product Name",
        "Electronics",
        100000,
        10,
        "Supplier Name",
      ),
    );
    expect(result).toStrictEqual(
      new AddedProduct(
        "prod-123",
        "PROD-001",
        "Product Name",
        "Electronics",
        100000,
        10,
        "Supplier Name",
        new Date("2025-02-03").toISOString(),
        null,
        null,
      ),
    );
  });
});
