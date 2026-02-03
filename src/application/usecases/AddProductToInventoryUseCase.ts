import { INVENTORY_REPOSITORY_ERRORS } from "../../domain/inventory/constants";
import type AddedProduct from "../../domain/inventory/entity/AddedProduct";
import type AddProduct from "../../domain/inventory/entity/AddProduct";
import type InventoryRepository from "../../domain/inventory/InventoryRepository";
import type MethodAssertion from "../utils/MethodAssertion";

class AddProductToInventoryUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly inventoryRepository: InventoryRepository;

  constructor(
    methodAssertion: MethodAssertion,
    inventoryRepository: InventoryRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.inventoryRepository = inventoryRepository;
  }

  async execute(payload: AddProduct): Promise<AddedProduct> {
    this.methodAssertion.assertImplemented(
      this.inventoryRepository,
      "addProductToInventory",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return await this.inventoryRepository.addProductToInventory(payload);
  }
}

export default AddProductToInventoryUseCase;
