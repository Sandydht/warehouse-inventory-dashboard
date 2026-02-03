import AddedProduct from "../../domain/inventory/entity/AddedProduct";
import AddProduct from "../../domain/inventory/entity/AddProduct";
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

export const toAddedProductDomain = (
  dto: AddProductResponseDto,
): AddedProduct =>
  new AddedProduct(
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

export const toAddProductResponseDto = (
  domain: AddedProduct,
): AddProductResponseDto => ({
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

export const toAddProductDomain = (dto: AddProductRequestDto): AddProduct =>
  new AddProduct(
    dto.sku,
    dto.name,
    dto.category,
    dto.price,
    dto.quantity,
    dto.supplier,
  );
