import { describe, expect, it } from "vitest";
import StockHistoryItem from "../StockHistoryItem";
import { STOCK_HISTORY_ITEM_ERRORS } from "../../constants";
import type { ApprovalType } from "../../../approval/types";

describe("StockHistoryItem entity", () => {
  const validPayload = {
    id: "stock-history-id",
    inventoryId: "inventory-id",
    inventoryName: "inventory-name",
    action: "CREATE",
    previousStock: 0,
    newStock: 0,
    changeStock: 0,
    note: "Create approval",
    checkedBy: "officer-id",
    createdAt: new Date("2026-03-02").toISOString(),
  };

  it("should throw error when id is empty", () => {
    expect(
      () =>
        new StockHistoryItem(
          "",
          validPayload.inventoryId,
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          validPayload.newStock,
          validPayload.changeStock,
          validPayload.note,
          validPayload.checkedBy,
          validPayload.createdAt,
        ),
    ).toThrowError(STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when inventoryId is empty", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          "",
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          validPayload.newStock,
          validPayload.changeStock,
          validPayload.note,
          validPayload.checkedBy,
          validPayload.createdAt,
        ),
    ).toThrowError(STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when inventoryName is empty", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          validPayload.inventoryId,
          "",
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          validPayload.newStock,
          validPayload.changeStock,
          validPayload.note,
          validPayload.checkedBy,
          validPayload.createdAt,
        ),
    ).toThrowError(STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when note is empty", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          validPayload.inventoryId,
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          validPayload.newStock,
          validPayload.changeStock,
          "",
          validPayload.checkedBy,
          validPayload.createdAt,
        ),
    ).toThrowError(STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when checkedBy is empty", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          validPayload.inventoryId,
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          validPayload.newStock,
          validPayload.changeStock,
          validPayload.note,
          "",
          validPayload.createdAt,
        ),
    ).toThrowError(STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdAt is empty", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          validPayload.inventoryId,
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          validPayload.newStock,
          validPayload.changeStock,
          validPayload.note,
          validPayload.checkedBy,
          "",
        ),
    ).toThrowError(STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when previousStock is not a positive number", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          validPayload.inventoryId,
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          -10,
          validPayload.newStock,
          validPayload.changeStock,
          validPayload.note,
          validPayload.checkedBy,
          validPayload.createdAt,
        ),
    ).toThrowError(
      STOCK_HISTORY_ITEM_ERRORS.PREVIOUS_STOCK_MUST_BE_POSITIVE_NUMBER,
    );
  });

  it("should throw error when newStock is not a positive number", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          validPayload.inventoryId,
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          -10,
          validPayload.changeStock,
          validPayload.note,
          validPayload.checkedBy,
          validPayload.createdAt,
        ),
    ).toThrowError(STOCK_HISTORY_ITEM_ERRORS.NEW_STOCK_MUST_BE_POSITIVE_NUMBER);
  });

  it("should throw error when changeStock is not a positive number", () => {
    expect(
      () =>
        new StockHistoryItem(
          validPayload.id,
          validPayload.inventoryId,
          validPayload.inventoryName,
          validPayload.action as ApprovalType,
          validPayload.previousStock,
          validPayload.newStock,
          -10,
          validPayload.note,
          validPayload.checkedBy,
          validPayload.createdAt,
        ),
    ).toThrowError(
      STOCK_HISTORY_ITEM_ERRORS.CHANGE_STOCK_MUST_BE_POSITIVE_NUMBER,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const stockHistoryItem: StockHistoryItem = new StockHistoryItem(
      validPayload.id,
      validPayload.inventoryId,
      validPayload.inventoryName,
      validPayload.action as ApprovalType,
      validPayload.previousStock,
      validPayload.newStock,
      validPayload.changeStock,
      validPayload.note,
      validPayload.checkedBy,
      validPayload.createdAt,
    );

    expect(stockHistoryItem).toBeInstanceOf(StockHistoryItem);
    expect(stockHistoryItem.getId()).toBe(validPayload.id);
    expect(stockHistoryItem.getInventoryId()).toBe(validPayload.inventoryId);
    expect(stockHistoryItem.getInventoryName()).toBe(
      validPayload.inventoryName,
    );
    expect(stockHistoryItem.getAction()).toBe(validPayload.action);
    expect(stockHistoryItem.getPreviousStock()).toBe(
      validPayload.previousStock,
    );
    expect(stockHistoryItem.getNewStock()).toBe(validPayload.newStock);
    expect(stockHistoryItem.getChangeStock()).toBe(validPayload.changeStock);
    expect(stockHistoryItem.getNote()).toBe(validPayload.note);
    expect(stockHistoryItem.getCheckedBy()).toBe(validPayload.checkedBy);
    expect(stockHistoryItem.getCreatedAt()).toBe(validPayload.createdAt);
  });
});
