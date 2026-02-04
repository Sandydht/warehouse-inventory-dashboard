import { inventoryDependencies } from "../../../infrastructure/container";
import { formPaginatedResultDomainToGetInventoryListResponseDto } from "../../../infrastructure/mappers/inventoryMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const getInventoryList = createUseCaseThunk(
  "inventory/get-inventory-list",
  () => inventoryDependencies.getInventoryListUseCase,
  (result) => formPaginatedResultDomainToGetInventoryListResponseDto(result),
);
