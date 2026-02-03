/* eslint-disable @typescript-eslint/no-unused-vars */
import type AddProduct from "./entity/AddProduct";
import type ApprovalRequest from "./entity/ApprovalRequest";

class InventoryRepository {
  async addProductToInventory?(_payload: AddProduct): Promise<ApprovalRequest> {
    throw new Error("INVENTORY_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

export default InventoryRepository;
