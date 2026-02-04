import type { PaginatedResult } from "../../commons/models/PaginatedResult";
import AddProduct from "../../domain/approval/entity/AddProduct";
import ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { ApprovalRequestDto } from "../dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../dto/common/InventoryItemDto";
import type { CreateApprovalRequestDto } from "../dto/request/CreateApprovalRequestDto";
import type { GetApprovalListResponseDto } from "../dto/response/GetApprovalListResponseDto";

export const fromAddProductDomainToCreateApprovalRequestDto = (
  domain: AddProduct,
): CreateApprovalRequestDto => ({
  sku: domain.getSku(),
  name: domain.getName(),
  category: domain.getCategory(),
  price: domain.getPrice(),
  quantity: domain.getQuantity(),
  supplier: domain.getSupplier(),
});

export const fromCreateApprovalRequestDtoToAddProductDomain = (
  dto: CreateApprovalRequestDto,
): AddProduct =>
  new AddProduct(
    dto.sku,
    dto.name,
    dto.category,
    dto.price,
    dto.quantity,
    dto.supplier,
  );

export const fromPaginatedResultDomainToGetApprovalListResponseDto = (
  domain: PaginatedResult<ApprovalRequest<InventoryItem>>,
): GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>> => ({
  data: domain.data as unknown as ApprovalRequestDto<InventoryItemDto>[],
  meta: domain.meta,
  query: domain.query,
});

export const fromGetApprovalListResponseDtoToPaginatedResultDomain = (
  dto: GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>,
): PaginatedResult<ApprovalRequest<InventoryItem>> => ({
  data: dto.data as unknown as ApprovalRequest<InventoryItem>[],
  meta: dto.meta,
  query: dto.query,
});

export const fromApprovalRequestDtoToApprovalRequestDomain = (
  dto: ApprovalRequestDto<InventoryItemDto>,
) =>
  new ApprovalRequest<InventoryItem>(
    dto.id,
    dto.type,
    dto.status,
    dto.targetId,
    dto.originalData as unknown as InventoryItem | null,
    dto.proposedData as unknown as InventoryItem | null,
    dto.rejectionReason,
    dto.createdBy,
    dto.createdAt,
    dto.updatedAt,
    dto.deletedAt,
  );

export const fromApprovalRequestDomainToApprovalRequestDto = (
  domain: ApprovalRequest<InventoryItem>,
): ApprovalRequestDto<InventoryItemDto> => ({
  id: domain.getId(),
  type: domain.getType(),
  status: domain.getStatus(),
  targetId: domain.getTargetId(),
  originalData: domain.getOriginalData() as unknown as InventoryItemDto | null,
  proposedData: domain.getProposedData() as unknown as InventoryItemDto | null,
  rejectionReason: domain.getRejectionReason(),
  createdBy: domain.getCreatedBy(),
  createdAt: domain.getCreatedAt(),
  updatedAt: domain.getUpdatedAt(),
  deletedAt: domain.getDeletedAt(),
});
