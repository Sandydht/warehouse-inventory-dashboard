import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import { INVENTORY_REPOSITORY_ERRORS } from "../../domain/inventory/constants";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type InventoryRepository from "../../domain/inventory/InventoryRepository";
import type MethodAssertion from "../utils/MethodAssertion";

class GetInventoryListUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly inventoryRepository: InventoryRepository;

  constructor(
    methodAssertion: MethodAssertion,
    inventoryRepository: InventoryRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.inventoryRepository = inventoryRepository;
  }

  async execute(
    params: PaginationQuery,
  ): Promise<PaginatedResult<InventoryItem>> {
    this.methodAssertion.assertImplemented(
      this.inventoryRepository,
      "getInventoryList",
      INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return await this.inventoryRepository.getInventoryList(params);
  }
}

export default GetInventoryListUseCase;
