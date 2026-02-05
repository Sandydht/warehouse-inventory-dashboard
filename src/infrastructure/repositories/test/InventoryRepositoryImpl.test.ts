import { describe, expect, it, vi } from "vitest";
import { privateApi } from "../../http/axiosInstance";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import type { InventoryItemDto } from "../../dto/common/InventoryItemDto";
import type { PaginationMeta } from "../../../commons/models/PaginationMeta";
import type { PaginatedResult } from "../../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";
import type { GetInventoryListResponseDto } from "../../dto/response/GetInventoryListResponseDto";
import InventoryRepositoryImpl from "../InventoryRepositoryImpl";
import GetInventoryDetail from "../../../domain/inventory/entity/GetInventoryDetail";
import { fromInventoryItemDtoToInventoryItemDomain } from "../../mappers/inventoryMapper";

vi.mock("../../http/axiosInstance", () => ({
  privateApi: {
    get: vi.fn(),
  },
}));

describe("InventoryRepositoryImpl", () => {
  const inventoryRepositoryImpl: InventoryRepositoryImpl =
    new InventoryRepositoryImpl();

  const now = new Date("2026-03-02").toISOString();
  const mockInventoryItemDto: InventoryItemDto = {
    id: "inv-001",
    sku: "PRODUCT-001",
    name: "Product Name",
    category: "Electronics",
    price: 500000,
    quantity: 10,
    supplier: "Supplier Name",
    createdAt: now,
    updatedAt: now,
    deletedAt: null,
  };

  const mockParams: PaginationQuery = {
    page: 1,
    limit: 10,
    search: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const mockPaginationMeta: PaginationMeta = {
    page: 1,
    limit: 10,
    totalItems: 10,
    totalPages: 1,
    hasNextPage: false,
    hasPrevPage: false,
  };

  const mockGetInventoryListResponseDto: GetInventoryListResponseDto<InventoryItemDto> =
    {
      data: [mockInventoryItemDto],
      meta: mockPaginationMeta,
      query: mockParams,
    };

  describe("getInventoryList function", () => {
    it("should fetch approval list with correct parameters and return mapped domain data", async () => {
      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockGetInventoryListResponseDto,
      });

      const result: PaginatedResult<InventoryItem> =
        await inventoryRepositoryImpl.getInventoryList(mockParams);

      expect(privateApi.get).toHaveBeenCalledWith("/inventory/inventory-list", {
        params: mockParams,
      });

      expect(result.data).toBe(mockGetInventoryListResponseDto.data);
      expect(result.meta).toBe(mockGetInventoryListResponseDto.meta);
      expect(result.query).toBe(mockGetInventoryListResponseDto.query);
    });

    it("should handle empty parameters gracefully", async () => {
      const mockEmptyParams: PaginationQuery = {};
      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockGetInventoryListResponseDto,
      });

      const result: PaginatedResult<InventoryItem> =
        await inventoryRepositoryImpl.getInventoryList(mockEmptyParams);

      expect(privateApi.get).toHaveBeenCalledWith("/inventory/inventory-list", {
        params: mockParams,
      });

      expect(result.data).toBe(mockGetInventoryListResponseDto.data);
      expect(result.meta).toBe(mockGetInventoryListResponseDto.meta);
      expect(result.query).toBe(mockGetInventoryListResponseDto.query);
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.get).mockRejectedValue(networkError);
      const mockEmptyParams: PaginationQuery = {};
      await expect(
        inventoryRepositoryImpl.getInventoryList(mockEmptyParams),
      ).rejects.toThrow("Network Error");
    });
  });

  describe("getInventoryDetail function", () => {
    const mockGetInventoryDetail: GetInventoryDetail = new GetInventoryDetail(
      "inv-001",
    );

    it("should fetch inventory details and return mapped domain data", async () => {
      vi.mocked(privateApi.get).mockResolvedValue({
        data: mockInventoryItemDto,
      });

      const result: InventoryItem =
        await inventoryRepositoryImpl.getInventoryDetail(
          mockGetInventoryDetail,
        );

      expect(privateApi.get).toHaveBeenCalledWith(
        `/inventory/inventory-detail/${mockGetInventoryDetail.getId()}`,
      );

      expect(result).toStrictEqual(
        fromInventoryItemDtoToInventoryItemDomain(mockInventoryItemDto),
      );
    });

    it("should throw an error if the API call fails", async () => {
      const networkError = new Error("Network Error");
      vi.mocked(privateApi.get).mockRejectedValue(networkError);
      await expect(
        inventoryRepositoryImpl.getInventoryDetail(mockGetInventoryDetail),
      ).rejects.toThrow("Network Error");
    });
  });
});
