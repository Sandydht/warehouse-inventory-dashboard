import { describe, expect, it, vi } from "vitest";
import StockHistoryRepositoryImpl from "../StockHistoryRepositoryImpl";
import type { StockHistoryItemDto } from "../../dto/common/StockHistoryItemDto";
import { privateApi } from "../../http/axiosInstance";
import type StockHistoryItem from "../../../domain/stockHistory/entity/StockHistoryItem";
import { fromStockHistoryItemDtoToStockHistoryItemDomain } from "../../mappers/stockHistoryMapper";

vi.mock("../../http/axiosInstance", () => ({
  privateApi: {
    get: vi.fn(),
  },
}));

describe("StockHistoryRepositoryImpl", () => {
  const stockHistoryRepositoryImpl: StockHistoryRepositoryImpl =
    new StockHistoryRepositoryImpl();

  const now = new Date("2026-03-02").toISOString();
  const mockStockHistoryItemDto: StockHistoryItemDto = {
    id: "stock-history-id",
    inventoryId: "inventory-id",
    inventoryName: "inventory-name",
    action: "CREATE",
    previousStock: 0,
    newStock: 0,
    changeStock: 0,
    note: "Not",
    checkedBy: "officer-id",
    createdAt: now,
  };

  describe("getLast30DaysStockHistoryList function", () => {
    it("should create approval request correctly", async () => {
      vi.mocked(privateApi.get).mockResolvedValue({
        data: [mockStockHistoryItemDto],
      });

      const result: StockHistoryItem[] =
        await stockHistoryRepositoryImpl.getLast30DaysStockHistoryList();

      expect(privateApi.get).toHaveBeenCalledWith(
        "/stock-history/last-30-days-list",
      );
      expect(result).toStrictEqual(
        fromStockHistoryItemDtoToStockHistoryItemDomain([
          mockStockHistoryItemDto,
        ]),
      );
    });

    it("should throw error when create approvel request fails", async () => {
      vi.mocked(privateApi.get).mockRejectedValue(
        new Error("Failed to create approval request"),
      );

      await expect(
        stockHistoryRepositoryImpl.getLast30DaysStockHistoryList(),
      ).rejects.toThrowError("Failed to create approval request");
    });
  });
});
