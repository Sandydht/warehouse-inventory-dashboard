import type { AxiosResponse } from "axios";
import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type { PaginationQuery } from "../../commons/models/PaginationQuery";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import InventoryRepository from "../../domain/inventory/InventoryRepository";
import type { InventoryItemDto } from "../dto/common/InventoryItemDto";
import type { GetInventoryListResponseDto } from "../dto/response/GetInventoryListResponseDto";
import { privateApi } from "../http/axiosInstance";
import {
  fromGetInventoryListResponseDtoToPaginatedResultDomain,
  fromInventoryItemDtoToInventoryItemDomain,
} from "../mappers/inventoryMapper";
import type GetInventoryDetail from "../../domain/inventory/entity/GetInventoryDetail";

class InventoryRepositoryImpl extends InventoryRepository {
  async getInventoryList(
    params: PaginationQuery,
  ): Promise<PaginatedResult<InventoryItem>> {
    const { data } = await privateApi.get<
      GetInventoryListResponseDto<InventoryItemDto>,
      AxiosResponse<GetInventoryListResponseDto<InventoryItemDto>>
    >("/inventory/inventory-list", { params });

    return fromGetInventoryListResponseDtoToPaginatedResultDomain(data);
  }

  async getInventoryDetail(
    payload: GetInventoryDetail,
  ): Promise<InventoryItem> {
    const { data } = await privateApi.get<
      InventoryItemDto,
      AxiosResponse<InventoryItemDto>
    >(`/inventory/inventory-detail/${payload.getId()}`);

    return fromInventoryItemDtoToInventoryItemDomain(data);
  }
}

export default InventoryRepositoryImpl;
