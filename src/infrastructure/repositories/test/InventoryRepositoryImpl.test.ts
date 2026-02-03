import { describe, vi, it, expect } from "vitest";
import InventoryRepositoryImpl from "../InventoryRepositoryImpl";
import { privateApi } from "../../http/axiosInstance";
import AddProduct from "../../../domain/inventory/entity/AddProduct";
import type ApprovalRequest from "../../../domain/inventory/entity/ApprovalRequest";
import type { AddProductResponseDto } from "../../dto/response/AddProductResponseDto";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import {
  toAddProductRequestDto,
  toApprovalRequestDomain,
} from "../../mappers/inventoryMapper";

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
      const mockAddProduct: AddProduct = new AddProduct(
        "SKU123",
        "Test Product",
        "Electronics",
        100,
        10,
        "Test Supplier",
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

      const mockAddedProduct: AddProductResponseDto = {
        id: "req-123",
        type: "CREATE",
        status: "PENDING",
        targetId: null,
        originalData: null,
        proposedData: mockInventoryItem,
        rejectionReason: null,
        createdBy: "user1",
        createdAt: new Date("2026-03-02").toISOString(),
        updatedAt: new Date("2026-03-02").toISOString(),
        deletedAt: null,
      };

      vi.mocked(privateApi.post).mockResolvedValue({
        data: mockAddedProduct,
      });

      const result: ApprovalRequest =
        await inventoryRepositoryImpl.addProductToInventory(mockAddProduct);

      expect(privateApi.post).toHaveBeenCalledWith(
        "/inventory/add-product",
        toAddProductRequestDto(mockAddProduct),
      );
      expect(result).toStrictEqual(toApprovalRequestDomain(mockAddedProduct));
    });

    it("should throw error when adding product fails", async () => {
      const mockAddProduct: AddProduct = new AddProduct(
        "SKU123",
        "Test Product",
        "Electronics",
        100,
        10,
        "Test Supplier",
      );

      vi.mocked(privateApi.post).mockRejectedValue(
        new Error("Failed to add product to inventory"),
      );

      await expect(
        inventoryRepositoryImpl.addProductToInventory(mockAddProduct),
      ).rejects.toThrowError("Failed to add product to inventory");
    });
  });
});
