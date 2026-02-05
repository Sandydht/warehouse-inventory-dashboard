import { stockHistoryDependencies } from "../../../infrastructure/container";
import { fromStockHistoryItemDomainToStockHistoryItemDto } from "../../../infrastructure/mappers/stockHistoryMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const getLast30DaysStockHistory = createUseCaseThunk(
  "stock-history/get-last-30-days-stock-history",
  () => stockHistoryDependencies.getLast30DaysStockHistoryUseCase,
  (result) => fromStockHistoryItemDomainToStockHistoryItemDto(result),
);
