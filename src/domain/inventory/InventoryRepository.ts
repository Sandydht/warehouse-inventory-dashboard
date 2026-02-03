/* eslint-disable @typescript-eslint/no-unused-vars */
import type AddedProduct from "./entity/AddedProduct";
import type AddProduct from "./entity/AddProduct";

class InventoryRepository {
  async addProductToInventory?(_payload: AddProduct): Promise<AddedProduct> {
    throw new Error("INVENTORY_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  }
}

export default InventoryRepository;
