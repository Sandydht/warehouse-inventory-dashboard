import type { ApprovalType } from "../../approval/types";
import InputValidator from "../../utils/InputValidator.util";
import { STOCK_HISTORY_ITEM_ERRORS } from "../constants";

class StockHistoryItem {
  private readonly id: string;
  private readonly inventoryId: string;
  private readonly inventoryName: string;
  private readonly action: ApprovalType;
  private readonly previousStock: number;
  private readonly newStock: number;
  private readonly changeStock: number;
  private readonly note: string;
  private readonly checkedBy: string;
  private readonly createdAt: string;

  constructor(
    id: string,
    inventoryId: string,
    inventoryName: string,
    action: ApprovalType,
    previousStock: number,
    newStock: number,
    changeStock: number,
    note: string,
    checkedBy: string,
    createdAt: string,
  ) {
    this._verifyPayload(
      id,
      inventoryId,
      inventoryName,
      previousStock,
      newStock,
      changeStock,
      note,
      checkedBy,
      createdAt,
    );

    this.id = id;
    this.inventoryId = inventoryId;
    this.inventoryName = inventoryName;
    this.action = action;
    this.previousStock = previousStock;
    this.newStock = newStock;
    this.changeStock = changeStock;
    this.note = note;
    this.checkedBy = checkedBy;
    this.createdAt = createdAt;
  }

  private _verifyPayload(
    id: string,
    inventoryId: string,
    inventoryName: string,
    previousStock: number,
    newStock: number,
    changeStock: number,
    note: string,
    checkedBy: string,
    createdAt: string,
  ) {
    InputValidator.requireNotBlank(
      id,
      STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      inventoryId,
      STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      inventoryName,
      STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      note,
      STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      checkedBy,
      STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      createdAt,
      STOCK_HISTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );

    InputValidator.positiveNumberValidFormat(
      previousStock,
      STOCK_HISTORY_ITEM_ERRORS.PREVIOUS_STOCK_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      newStock,
      STOCK_HISTORY_ITEM_ERRORS.NEW_STOCK_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      changeStock,
      STOCK_HISTORY_ITEM_ERRORS.CHANGE_STOCK_MUST_BE_POSITIVE_NUMBER,
    );
  }

  getId(): string {
    return this.id;
  }

  getInventoryId(): string {
    return this.inventoryId;
  }

  getInventoryName(): string {
    return this.inventoryName;
  }

  getAction(): ApprovalType {
    return this.action;
  }

  getPreviousStock(): number {
    return this.previousStock;
  }

  getNewStock(): number {
    return this.newStock;
  }

  getChangeStock(): number {
    return this.changeStock;
  }

  getNote(): string {
    return this.note;
  }

  getCheckedBy(): string {
    return this.checkedBy;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }
}

export default StockHistoryItem;
