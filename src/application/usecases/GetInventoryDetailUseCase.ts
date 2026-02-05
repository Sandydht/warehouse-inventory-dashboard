import { INVENTORY_REPOSITORY_ERRORS } from "../../domain/inventory/constants";
import type GetInventoryDetail from "../../domain/inventory/entity/GetInventoryDetail";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type InventoryRepository from "../../domain/inventory/InventoryRepository";
import type MethodAssertion from "../utils/MethodAssertion";

class GetInventoryDetailUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly inventoryRepository: InventoryRepository;

  constructor(
    methodAssertion: MethodAssertion,
    inventoryRepository: InventoryRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.inventoryRepository = inventoryRepository;
  }

  async execute(payload: GetInventoryDetail): Promise<InventoryItem> {
    this.methodAssertion.assertImplemented(
      this.inventoryRepository,
      "getInventoryDetail",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return this.inventoryRepository.getInventoryDetail(payload);
  }
}

export default GetInventoryDetailUseCase;
