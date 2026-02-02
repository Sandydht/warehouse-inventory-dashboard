import type { RequestType, RequestStatus } from "./type";
import type { StockItem } from "./StockItem";

export interface StockRequest {
  id: string;
  type: RequestType;
  status: RequestStatus;
  original?: StockItem;
  proposed?: StockItem;
  createdBy: "STAFF";
}
