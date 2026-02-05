import { STOCK_HISTORY_REPOSITORY_ERRORS } from "../../domain/stockHistory/constants";
import type StockHistoryItem from "../../domain/stockHistory/entity/StockHistoryItem";
import type StockHistoryRepository from "../../domain/stockHistory/StockHistoryRepository";
import type MethodAssertion from "../utils/MethodAssertion";

class GetLast30DaysStockHistoryUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly stockHistoryRepository: StockHistoryRepository;

  constructor(
    methodAssertion: MethodAssertion,
    stockHistoryRepository: StockHistoryRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.stockHistoryRepository = stockHistoryRepository;
  }

  async execute(): Promise<StockHistoryItem[]> {
    this.methodAssertion.assertImplemented(
      this.stockHistoryRepository,
      "getLast30DaysStockHistoryList",
      STOCK_HISTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return await this.stockHistoryRepository.getLast30DaysStockHistoryList();
  }
}

export default GetLast30DaysStockHistoryUseCase;
