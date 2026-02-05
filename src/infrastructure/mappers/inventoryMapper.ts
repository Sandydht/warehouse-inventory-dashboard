import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import GetInventoryDetail from "../../domain/inventory/entity/GetInventoryDetail";
import InventoryItem from "../../domain/inventory/entity/InventoryItem";
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

export const fromInventoryItemDtoToInventoryItemDomain = (
  dto: InventoryItemDto,
): InventoryItem =>
  new InventoryItem(
    dto.id,
    dto.sku,
    dto.name,
    dto.category,
    dto.price,
    dto.quantity,
    dto.supplier,
    dto.createdAt,
    dto.updatedAt,
    dto.deletedAt,
  );

export const fromInventoryItemDomainToInventoryItemDto = (
  domain: InventoryItem,
): InventoryItemDto => ({
  id: domain.getId(),
  sku: domain.getSku(),
  name: domain.getName(),
  category: domain.getCategory(),
  price: domain.getPrice(),
  quantity: domain.getQuantity(),
  supplier: domain.getSupplier(),
  createdAt: domain.getCreatedAt(),
  updatedAt: domain.getUpdatedAt(),
  deletedAt: domain.getDeletedAt(),
});

export const toGetInventoryDetailDomain = (id: string): GetInventoryDetail =>
  new GetInventoryDetail(id);
