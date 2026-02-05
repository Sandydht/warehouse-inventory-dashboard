import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import { INVENTORY_REPOSITORY_ERRORS } from "../constants";
import InventoryRepository from "../InventoryRepository";
import GetInventoryDetail from "../entity/GetInventoryDetail";

describe("InventoryRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const inventoryRepository: InventoryRepository = new InventoryRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      inventoryRepository,
      "getInventoryList",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      inventoryRepository,
      "getInventoryDetail",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(inventoryRepository).toBeInstanceOf(InventoryRepository);
    await expect(inventoryRepository.getInventoryList({})).rejects.toThrowError(
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    await expect(
      inventoryRepository.getInventoryDetail(new GetInventoryDetail("inv-001")),
    ).rejects.toThrowError(INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  });
});
