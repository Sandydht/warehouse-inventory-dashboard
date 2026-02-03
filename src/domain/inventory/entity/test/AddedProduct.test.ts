import { describe, it, expect } from "vitest";
import AddedProduct from "../AddedProduct";
import { ADDED_PRODUCT_ERRORS } from "../../constants";

describe("AddedProduct entity", () => {
  const validPayload = {
    id: "prod-123",
    sku: "PROD-001",
    name: "Product Name",
    category: "Electronics",
    price: 100000,
    quantity: 10,
    supplier: "Supplier Name",
    createdAt: new Date(Date.now()).toISOString(),
    updatedAt: null,
    deletedAt: null,
  };

  it("should throw error when id is empty", () => {
    expect(
      () =>
        new AddedProduct(
          "",
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when sku is empty", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          "",
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when name is empty", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          validPayload.sku,
          "",
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when category is empty", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          "",
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when supplier is empty", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          "",
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdAt is empty", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
          "",
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when sku format is invalid", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          "invalid_sku!",
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.SKU_INVALID_FORMAT);
  });

  it("should throw error when price is not a positive number", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          -1000000,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(ADDED_PRODUCT_ERRORS.PRODUCT_PRICE_MUST_BE_POSITIVE_NUMBER);
  });

  it("should throw error when quantity is not a positive number", () => {
    expect(
      () =>
        new AddedProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          -10,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(
      ADDED_PRODUCT_ERRORS.PRODUCT_QUANTITY_MUST_BE_POSITIVE_NUMBER,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const addedProduct: AddedProduct = new AddedProduct(
      validPayload.id,
      validPayload.sku,
      validPayload.name,
      validPayload.category,
      validPayload.price,
      validPayload.quantity,
      validPayload.supplier,
      validPayload.createdAt,
      validPayload.updatedAt,
      validPayload.deletedAt,
    );

    expect(addedProduct).toBeInstanceOf(AddedProduct);
    expect(addedProduct.getId()).toBe(validPayload.id);
    expect(addedProduct.getSku()).toBe(validPayload.sku);
    expect(addedProduct.getName()).toBe(validPayload.name);
    expect(addedProduct.getCategory()).toBe(validPayload.category);
    expect(addedProduct.getPrice()).toBe(validPayload.price);
    expect(addedProduct.getQuantity()).toBe(validPayload.quantity);
    expect(addedProduct.getSupplier()).toBe(validPayload.supplier);
    expect(addedProduct.getCreatedAt()).toBe(validPayload.createdAt);
    expect(addedProduct.getUpdatedAt()).toBe(validPayload.updatedAt);
    expect(addedProduct.getDeletedAt()).toBe(validPayload.deletedAt);
  });
});
