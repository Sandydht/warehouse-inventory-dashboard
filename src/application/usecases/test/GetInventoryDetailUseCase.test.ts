import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import GetInventoryDetail from "../../../domain/inventory/entity/GetInventoryDetail";
import type InventoryRepository from "../../../domain/inventory/InventoryRepository";
import GetInventoryDetailUseCase from "../GetInventoryDetailUseCase";
import { INVENTORY_REPOSITORY_ERRORS } from "../../../domain/inventory/constants";

describe("Get inventory detail use case", () => {
  it("should orchestrating the get inventory detail action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const mockGetInventoryDetail: GetInventoryDetail = new GetInventoryDetail(
      "inv-001",
    );

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
      null,
      null,
    );

    const mockInventoryRepository: InventoryRepository = {
      getInventoryDetail: vi.fn().mockResolvedValue(mockInventoryItem),
    };

    const getInventoryDetailUseCase: GetInventoryDetailUseCase =
      new GetInventoryDetailUseCase(
        mockMethodAssertion,
        mockInventoryRepository,
      );

    const result: InventoryItem = await getInventoryDetailUseCase.execute(
      mockGetInventoryDetail,
    );

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockInventoryRepository,
      "getInventoryDetail",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(mockInventoryRepository.getInventoryDetail).toHaveBeenCalledWith(
      mockGetInventoryDetail,
    );
    expect(result).toStrictEqual(mockInventoryItem);
  });
});
