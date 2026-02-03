import type { AxiosResponse } from "axios";
import type AddedProduct from "../../domain/inventory/entity/AddedProduct";
import type AddProduct from "../../domain/inventory/entity/AddProduct";
import InventoryRepository from "../../domain/inventory/InventoryRepository";
import type { AddProductResponseDto } from "../dto/response/AddProductResponseDto";
import { privateApi } from "../http/axiosInstance";
import {
  toAddedProductDomain,
  toAddProductRequestDto,
} from "../mappers/inventoryMapper";
import type { AddProductRequestDto } from "../dto/request/AddProductRequestDto";

class InventoryRepositoryImpl extends InventoryRepository {
  async addProductToInventory(payload: AddProduct): Promise<AddedProduct> {
    const { data } = await privateApi.post<
      AddProductResponseDto,
      AxiosResponse<AddProductResponseDto>,
      AddProductRequestDto
    >("/inventory/add-product", toAddProductRequestDto(payload));

    return toAddedProductDomain(data);
  }
}

export default InventoryRepositoryImpl;
