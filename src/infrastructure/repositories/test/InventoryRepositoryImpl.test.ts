import { describe, vi, it, expect } from "vitest";
import InventoryRepositoryImpl from "../InventoryRepositoryImpl";
import { privateApi } from "../../http/axiosInstance";
import AddProduct from "../../../domain/inventory/entity/AddProduct";
import type AddedProduct from "../../../domain/inventory/entity/AddedProduct";

vi.mock("../../http/axiosInstance", () => ({
  privateApi: {
    post: vi.fn(),
  },
}));

describe("InventoryRepositoryImpl", () => {
  const inventoryRepositoryImpl: InventoryRepositoryImpl =
    new InventoryRepositoryImpl();

  describe("addProductToInventory function", () => {
    it("should return an added product data correctly", async () => {
      const mockAddedProduct = {
        id: "1",
        sku: "SKU123",
        name: "Test Product",
        category: "Electronics",
        price: 100,
        quantity: 10,
        supplier: "Test Supplier",
        createdAt: new Date(Date.now()).toISOString(),
        updatedAt: new Date(Date.now()).toISOString(),
        deletedAt: null,
      };

      vi.mocked(privateApi.post).mockResolvedValue({
        data: mockAddedProduct,
      });

      const result: AddedProduct =
        await inventoryRepositoryImpl.addProductToInventory(
          new AddProduct(
            "SKU123",
            "Test Product",
            "Electronics",
            100,
            10,
            "Test Supplier",
          ),
        );

      expect(privateApi.post).toHaveBeenCalledWith("/inventory/add-product", {
        sku: "SKU123",
        name: "Test Product",
        category: "Electronics",
        price: 100,
        quantity: 10,
        supplier: "Test Supplier",
      });
      expect(result.getId()).toBe(mockAddedProduct.id);
      expect(result.getSku()).toBe(mockAddedProduct.sku);
      expect(result.getName()).toBe(mockAddedProduct.name);
      expect(result.getCategory()).toBe(mockAddedProduct.category);
      expect(result.getPrice()).toBe(mockAddedProduct.price);
      expect(result.getQuantity()).toBe(mockAddedProduct.quantity);
      expect(result.getSupplier()).toBe(mockAddedProduct.supplier);
      expect(result.getCreatedAt()).toBe(mockAddedProduct.createdAt);
      expect(result.getUpdatedAt()).toBe(mockAddedProduct.updatedAt);
      expect(result.getDeletedAt()).toBe(mockAddedProduct.deletedAt);
    });

    it("should throw error when adding product fails", async () => {
      vi.mocked(privateApi.post).mockRejectedValue(
        new Error("Failed to add product to inventory"),
      );

      await expect(
        inventoryRepositoryImpl.addProductToInventory(
          new AddProduct(
            "SKU123",
            "Test Product",
            "Electronics",
            100,
            10,
            "Test Supplier",
          ),
        ),
      ).rejects.toThrowError("Failed to add product to inventory");
    });
  });
});
