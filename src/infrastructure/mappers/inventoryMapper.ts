import AddProduct from "../../domain/inventory/entity/AddProduct";
import ApprovalRequest from "../../domain/inventory/entity/ApprovalRequest";
import type { AddProductRequestDto } from "../dto/request/AddProductRequestDto";
import type { AddProductResponseDto } from "../dto/response/AddProductResponseDto";

export const toAddProductRequestDto = (
  domain: AddProduct,
): AddProductRequestDto => ({
  sku: domain.getSku(),
  name: domain.getName(),
  category: domain.getCategory(),
  price: domain.getPrice(),
  quantity: domain.getQuantity(),
  supplier: domain.getSupplier(),
});

export const toAddProductDomain = (dto: AddProductRequestDto): AddProduct =>
  new AddProduct(
    dto.sku,
    dto.name,
    dto.category,
    dto.price,
    dto.quantity,
    dto.supplier,
  );

export const toApprovalRequestDomain = (
  dto: AddProductResponseDto,
): ApprovalRequest =>
  new ApprovalRequest(
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

export const toAddProductResponseDto = (
  domain: ApprovalRequest,
): AddProductResponseDto => ({
  id: domain.getId(),
  type: domain.getType(),
  status: domain.getStatus(),
  targetId: domain.getTargetId(),
  originalData: domain.getOriginalData(),
  proposedData: domain.getProposedData(),
  rejectionReason: domain.getRejectReason(),
  createdBy: domain.getCreatedBy(),
  createdAt: domain.getCreatedAt(),
  updatedAt: domain.getUpdatedAt(),
  deletedAt: domain.getDeletedAt(),
});
