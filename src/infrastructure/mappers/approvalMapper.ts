import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import AddProduct from "../../domain/approval/entity/AddProduct";
import ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { ApprovalRequestDto } from "../dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../dto/common/InventoryItemDto";
import type { CreateApprovalRequestDto } from "../dto/request/CreateApprovalRequestDto";
import type { CreateApprovalResponseDto } from "../dto/response/CreateApprovalResponseDto";
import type { GetApprovalListResponseDto } from "../dto/response/GetApprovalListResponseDto";

export const toCreateApprovalRequestDto = (
  domain: AddProduct,
): CreateApprovalRequestDto => ({
  sku: domain.getSku(),
  name: domain.getName(),
  category: domain.getCategory(),
  price: domain.getPrice(),
  quantity: domain.getQuantity(),
  supplier: domain.getSupplier(),
});

export const toApprovalRequestDomain = (
  dto: CreateApprovalResponseDto<InventoryItem>,
): ApprovalRequest<InventoryItem> =>
  new ApprovalRequest<InventoryItem>(
    dto.id,
    dto.type,
    dto.status,
    dto.targetId,
    dto.originalData,
    dto.proposedData,
    dto.rejectionReason,
    dto.createdBy,
    dto.createdAt,
    dto.updatedAt,
    dto.deletedAt,
  );

export const toCreateApprovalResponseDto = (
  domain: ApprovalRequest<InventoryItem>,
): CreateApprovalResponseDto<InventoryItem> => ({
  id: domain.getId(),
  type: domain.getType(),
  status: domain.getStatus(),
  targetId: domain.getTargetId(),
  originalData: domain.getOriginalData(),
  proposedData: domain.getProposedData(),
  rejectionReason: domain.getRejectionReason(),
  createdBy: domain.getCreatedBy(),
  createdAt: domain.getCreatedAt(),
  updatedAt: domain.getUpdatedAt(),
  deletedAt: domain.getDeletedAt(),
});

export const toAddProductDomain = (dto: CreateApprovalRequestDto): AddProduct =>
  new AddProduct(
    dto.sku,
    dto.name,
    dto.category,
    dto.price,
    dto.quantity,
    dto.supplier,
  );

export const toGetApprovalListResponseDto = (
  domain: PaginatedResult<ApprovalRequest<InventoryItem>>,
): GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>> => ({
  data: domain.data as unknown as ApprovalRequestDto<InventoryItemDto>[],
  meta: domain.meta,
  query: domain.query,
});

export const toPaginatedResultDomain = (
  dto: GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>,
): PaginatedResult<ApprovalRequest<InventoryItem>> => ({
  data: dto.data as unknown as ApprovalRequest<InventoryItem>[],
  meta: dto.meta,
  query: dto.query,
});
