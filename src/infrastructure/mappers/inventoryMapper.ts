import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { InventoryItemDto } from "../dto/common/InventoryItemDto";
import type { GetInventoryListResponseDto } from "../dto/response/GetInventoryListResponseDto";

export const fromGetInventoryListResponseDtoToPaginatedResultDomain = (
  domain: GetInventoryListResponseDto<InventoryItemDto>,
): PaginatedResult<InventoryItem> => ({
  data: domain.data as unknown as InventoryItem[],
  meta: domain.meta,
  query: domain.query,
});

export const formPaginatedResultDomainToGetInventoryListResponseDto = (
  domain: PaginatedResult<InventoryItem>,
): GetInventoryListResponseDto<InventoryItemDto> => ({
  data: domain.data as unknown as InventoryItemDto[],
  meta: domain.meta,
  query: domain.query,
});
