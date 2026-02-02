export interface StockItem {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  quantity: number;
  supplier: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
