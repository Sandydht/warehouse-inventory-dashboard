/* eslint-disable @typescript-eslint/no-unused-vars */
import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import { INVENTORY_REPOSITORY_ERRORS } from "./constants";
import type GetInventoryDetail from "./entity/GetInventoryDetail";
import type InventoryItem from "./entity/InventoryItem";

class InventoryRepository {
  async getInventoryList?(
    _params: PaginationQuery,
  ): Promise<PaginatedResult<InventoryItem>> {
    throw new Error(INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  async getInventoryDetail?(
    _payload: GetInventoryDetail,
  ): Promise<InventoryItem> {
    throw new Error(INVENTORY_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default InventoryRepository;
