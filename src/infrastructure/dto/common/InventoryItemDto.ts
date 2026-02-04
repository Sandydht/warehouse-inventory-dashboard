export interface InventoryItemDto {
  id: string;
  sku: string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  supplier: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
