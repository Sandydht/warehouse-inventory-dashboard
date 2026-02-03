import type InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import type {
  RequestStatus,
  RequestType,
} from "../../../domain/inventory/types";

export interface AddProductResponseDto {
  id: string;
  type: RequestType;
  status: RequestStatus;
  targetId: string | null;
  originalData: InventoryItem | null;
  proposedData: InventoryItem | null;
  rejectionReason: string | null;
  createdBy: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
