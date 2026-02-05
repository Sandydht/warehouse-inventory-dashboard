import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../../application/utils/MethodAssertion";
import StockHistoryRepository from "../StockHistoryRepository";
import { STOCK_HISTORY_REPOSITORY_ERRORS } from "../constants";

describe("StockHistoryRepository", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const stockHistoryRepository: StockHistoryRepository =
      new StockHistoryRepository();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      stockHistoryRepository,
      "getLast30DaysStockHistoryList",
      STOCK_HISTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(stockHistoryRepository).toBeInstanceOf(StockHistoryRepository);
    await expect(
      stockHistoryRepository.getLast30DaysStockHistoryList(),
    ).rejects.toThrowError(
      STOCK_HISTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
  });
});
