import { inventoryDependencies } from "../../../infrastructure/container";
import { toAddProductResponseDto } from "../../../infrastructure/mappers/inventoryMapper";
import { createUseCaseThunk } from "../utils/createThunk";

export const addProductToInventory = createUseCaseThunk(
  "inventory/add-product-to-inventory",
  () => inventoryDependencies.addProductToInventoryUseCase,
  (result) => toAddProductResponseDto(result),
);
