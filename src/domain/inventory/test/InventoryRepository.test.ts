import { describe, it, expect, vi } from "vitest";
import InventoryRepository from "../InventoryRepository";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import { INVENTORY_REPOSITORY_ERRORS } from "../constants";
import AddProduct from "../entity/AddProduct";

describe("InventoryRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const inventoryRepository: InventoryRepository = new InventoryRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      inventoryRepository,
      "addProductToInventory",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(inventoryRepository).toBeInstanceOf(InventoryRepository);
    await expect(
      inventoryRepository.addProductToInventory(
        new AddProduct(
          "SKU12345",
          "Product Name",
          "Category A",
          100,
          10,
          "Supplier X",
        ),
      ),
    ).rejects.toThrowError(INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  });
});
