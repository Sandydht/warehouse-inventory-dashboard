import type { AxiosResponse } from "axios";
import type StockHistoryItem from "../../domain/stockHistory/entity/StockHistoryItem";
import StockHistoryRepository from "../../domain/stockHistory/StockHistoryRepository";
import type { StockHistoryItemDto } from "../dto/common/StockHistoryItemDto";
import { privateApi } from "../http/axiosInstance";
import { fromStockHistoryItemDtoToStockHistoryItemDomain } from "../mappers/stockHistoryMapper";

class StockHistoryRepositoryImpl extends StockHistoryRepository {
  async getLast30DaysStockHistoryList(): Promise<StockHistoryItem[]> {
    const { data } = await privateApi.get<
      StockHistoryItemDto[],
      AxiosResponse<StockHistoryItemDto[]>
    >("/stock-history/last-30-days-list");

    return fromStockHistoryItemDtoToStockHistoryItemDomain(data);
  }
}

export default StockHistoryRepositoryImpl;
