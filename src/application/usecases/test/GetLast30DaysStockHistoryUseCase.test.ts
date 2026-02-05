import { describe, expect, it, vi } from "vitest";
import type MethodAssertion from "../../utils/MethodAssertion";
import StockHistoryItem from "../../../domain/stockHistory/entity/StockHistoryItem";
import type StockHistoryRepository from "../../../domain/stockHistory/StockHistoryRepository";
import GetLast30DaysStockHistoryUseCase from "../GetLast30DaysStockHistoryUseCase";
import { STOCK_HISTORY_REPOSITORY_ERRORS } from "../../../domain/stockHistory/constants";

describe("Get last 30 days stock history use case", () => {
  it("should orchestrating the get last 30 days stock history action correctly", async () => {
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    const now = new Date("2026-03-02").toISOString();
    const mockStockHistoryItem: StockHistoryItem = new StockHistoryItem(
      "stock-history-id",
      "inventory-id",
      "inventory-name",
      "CREATE",
      0,
      0,
      0,
      "Create approval",
      "officer-id",
      now,
    );

    const mockStockHistoryRepository: StockHistoryRepository = {
      getLast30DaysStockHistoryList: vi
        .fn()
        .mockResolvedValue([mockStockHistoryItem]),
    };

    const getLast30DaysStockHistoryUseCase: GetLast30DaysStockHistoryUseCase =
      new GetLast30DaysStockHistoryUseCase(
        mockMethodAssertion,
        mockStockHistoryRepository,
      );

    const result: StockHistoryItem[] =
      await getLast30DaysStockHistoryUseCase.execute();

    expect(mockMethodAssertion.assertImplemented).toHaveBeenCalledWith(
      mockStockHistoryRepository,
      "getLast30DaysStockHistoryList",
      STOCK_HISTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(
      mockStockHistoryRepository.getLast30DaysStockHistoryList,
    ).toHaveBeenCalledTimes(1);
    expect(result).toStrictEqual([mockStockHistoryItem]);
  });
});
