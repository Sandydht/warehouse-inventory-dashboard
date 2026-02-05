import { describe, expect, it } from "vitest";
import { EDIT_PRODUCT_ERRORS } from "../../constants";
import EditProduct from "../EditProduct";

describe("EditProduct entity", () => {
  const validPayload = {
    id: "env-001",
    sku: "PRODUCT-001",
    name: "Product Name",
    category: "Electronics",
    price: 500000,
    quantity: 10,
    supplier: "Supplier Name",
  };

  it("should throw error when id is empty", () => {
    expect(
      () =>
        new EditProduct(
          "",
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when sku is empty", () => {
    expect(
      () =>
        new EditProduct(
          validPayload.id,
          "",
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when name is empty", () => {
    expect(
      () =>
        new EditProduct(
          validPayload.id,
          validPayload.sku,
          "",
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when category is empty", () => {
    expect(
      () =>
        new EditProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          "",
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when supplier is empty", () => {
    expect(
      () =>
        new EditProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          "",
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when sku is invalid", () => {
    expect(
      () =>
        new EditProduct(
          validPayload.id,
          "invalid-sku",
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.SKU_INVALID_FORMAT);
  });

  it("should throw error when price is not a positive number", () => {
    expect(
      () =>
        new EditProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          -10000,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.PRICE_MUST_BE_POSITIVE_NUMBER);
  });

  it("should throw error when quantity is not a positive number", () => {
    expect(
      () =>
        new EditProduct(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          10000,
          -50,
          validPayload.supplier,
        ),
    ).toThrowError(EDIT_PRODUCT_ERRORS.QUANTITY_MUST_BE_POSITIVE_NUMBER);
  });

  it("should create object correctly when payload is valid", () => {
    const productItem: EditProduct = new EditProduct(
      validPayload.id,
      validPayload.sku,
      validPayload.name,
      validPayload.category,
      validPayload.price,
      validPayload.quantity,
      validPayload.supplier,
    );

    expect(productItem).toBeInstanceOf(EditProduct);
    expect(productItem.getId()).toBe(validPayload.id);
    expect(productItem.getSku()).toBe(validPayload.sku);
    expect(productItem.getName()).toBe(validPayload.name);
    expect(productItem.getCategory()).toBe(validPayload.category);
    expect(productItem.getPrice()).toBe(validPayload.price);
    expect(productItem.getQuantity()).toBe(validPayload.quantity);
    expect(productItem.getSupplier()).toBe(validPayload.supplier);
  });
});
