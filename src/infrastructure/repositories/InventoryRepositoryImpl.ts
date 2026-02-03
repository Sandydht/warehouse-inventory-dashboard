import type { AxiosResponse } from "axios";
import type AddProduct from "../../domain/inventory/entity/AddProduct";
import InventoryRepository from "../../domain/inventory/InventoryRepository";
import type { AddProductResponseDto } from "../dto/response/AddProductResponseDto";
import { privateApi } from "../http/axiosInstance";
import {
  toAddProductRequestDto,
  toApprovalRequestDomain,
} from "../mappers/inventoryMapper";
import type { AddProductRequestDto } from "../dto/request/AddProductRequestDto";
import type ApprovalRequest from "../../domain/inventory/entity/ApprovalRequest";

class InventoryRepositoryImpl extends InventoryRepository {
  async addProductToInventory(payload: AddProduct): Promise<ApprovalRequest> {
    const { data } = await privateApi.post<
      AddProductResponseDto,
      AxiosResponse<AddProductResponseDto>,
      AddProductRequestDto
    >("/inventory/add-product", toAddProductRequestDto(payload));

    return toApprovalRequestDomain(data);
  }
}

export default InventoryRepositoryImpl;
