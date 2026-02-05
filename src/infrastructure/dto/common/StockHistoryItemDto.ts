import type { ApprovalType } from "../../../domain/approval/types";

export interface StockHistoryItemDto {
  id: string;
  inventoryId: string;
  inventoryName: string;
  action: ApprovalType;
  previousStock: number;
  newStock: number;
  changeStock: number;
  note: string;
  checkedBy: string;
  createdAt: string;
}
