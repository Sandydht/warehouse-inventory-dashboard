import StockHistoryItem from "../../domain/stockHistory/entity/StockHistoryItem";
import type { StockHistoryItemDto } from "../dto/common/StockHistoryItemDto";

export const fromStockHistoryItemDtoToStockHistoryItemDomain = (
  datas: StockHistoryItemDto[],
): StockHistoryItem[] => {
  if (!Array.isArray(datas)) return [];

  return datas.map(
    (data) =>
      new StockHistoryItem(
        data.id,
        data.inventoryId,
        data.inventoryName,
        data.action,
        data.previousStock,
        data.newStock,
        data.changeStock,
        data.note,
        data.checkedBy,
        data.createdAt,
      ),
  );
};

export const fromStockHistoryItemDomainToStockHistoryItemDto = (
  datas: StockHistoryItem[],
): StockHistoryItemDto[] => {
  if (!Array.isArray(datas)) return [];

  return datas.map((data) => ({
    id: data.getId(),
    inventoryId: data.getInventoryId(),
    inventoryName: data.getInventoryName(),
    action: data.getAction(),
    previousStock: data.getPreviousStock(),
    newStock: data.getNewStock(),
    changeStock: data.getChangeStock(),
    note: data.getNote(),
    checkedBy: data.getCheckedBy(),
    createdAt: data.getCreatedAt(),
  }));
};
