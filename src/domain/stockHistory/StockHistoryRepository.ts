import { STOCK_HISTORY_REPOSITORY_ERRORS } from "./constants";
import type StockHistoryItem from "./entity/StockHistoryItem";

class StockHistoryRepository {
  async getLast30DaysStockHistoryList?(): Promise<StockHistoryItem[]> {
    throw new Error(STOCK_HISTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default StockHistoryRepository;
