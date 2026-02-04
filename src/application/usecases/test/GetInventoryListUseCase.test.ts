import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import type { PaginatedResult } from "../../../commons/models/PaginatedResult";
import type { PaginationMeta } from "../../../commons/models/PaginationMeta";
import type { PaginationQuery } from "../../../commons/models/PaginationQuery";
import type InventoryRepository from "../../../domain/inventory/InventoryRepository";
import GetInventoryListUseCase from "../GetInventoryListUseCase";
import { INVENTORY_REPOSITORY_ERRORS } from "../../../domain/inventory/constants";

describe("Get inventory list use case", () => {
  it("should orchestrating the get inventory list action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockParams: PaginationQuery = {
      search: "laptop",
      status: "PENDING",
      sortBy: "createdAt",
      sortOrder: "desc",
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

    const mockPaginationMeta: PaginationMeta = {
      page: 1,
      limit: 10,
      totalItems: 10,
      totalPages: 1,
      hasNextPage: false,
      hasPrevPage: false,
    };

    const mockPaginatedResult: PaginatedResult<InventoryItem> = {
      data: [mockInventoryItem],
      meta: mockPaginationMeta,
      query: mockParams,
    };

    const mockInventoryRepository: InventoryRepository = {
      getInventoryList: vi.fn().mockResolvedValue(mockPaginatedResult),
    };

    const getInventoryListUseCase: GetInventoryListUseCase =
      new GetInventoryListUseCase(mockMethodAssertion, mockInventoryRepository);

    const result: PaginatedResult<InventoryItem> =
      await getInventoryListUseCase.execute(mockParams);

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockInventoryRepository,
      "getInventoryList",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockInventoryRepository.getInventoryList).toHaveBeenCalledWith(
      mockParams,
    );
    expect(result).toStrictEqual(mockPaginatedResult);
  });
});
