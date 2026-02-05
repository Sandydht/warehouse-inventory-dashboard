import { inventoryDependencies } from "../../../infrastructure/container";
import {
  formPaginatedResultDomainToGetInventoryListResponseDto,
  fromInventoryItemDomainToInventoryItemDto,
} from "../../../infrastructure/mappers/inventoryMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const getInventoryList = createUseCaseThunk(
  "inventory/get-inventory-list",
  () => inventoryDependencies.getInventoryListUseCase,
  (result) => formPaginatedResultDomainToGetInventoryListResponseDto(result),
);

export const getInventoryDetail = createUseCaseThunk(
  "inventory/get-inventory-detail",
  () => inventoryDependencies.getInventoryDetailUseCase,
  (result) => fromInventoryItemDomainToInventoryItemDto(result),
);
