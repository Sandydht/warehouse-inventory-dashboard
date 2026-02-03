import AddProduct from "../../domain/approval/entity/AddProduct";
import ApprovalRequest from "../../domain/approval/entity/ApprovalRequest";
import type InventoryItem from "../../domain/inventory/entity/InventoryItem";
import type { CreateApprovalRequestDto } from "../dto/request/CreateApprovalRequestDto";
import type { CreateApprovalResponseDto } from "../dto/response/CreateApprovalResponseDto";

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
