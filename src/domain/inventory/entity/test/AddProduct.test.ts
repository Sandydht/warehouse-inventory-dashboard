import { describe, it, expect } from "vitest";
import AddProduct from "../AddProduct";
import { ADD_PRODUCT_ERRORS } from "../../constants";

describe("AddProduct entity", () => {
  const validPayload = {
    sku: "PROD-001",
    name: "Product Name",
    category: "Electronics",
    price: 100000,
    quantity: 10,
    supplier: "Supplier Name",
  };

  it("should throw error when sku is empty", () => {
    expect(
      () =>
        new AddProduct(
          "",
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when name is empty", () => {
    expect(
      () =>
        new AddProduct(
          validPayload.sku,
          "",
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when category is empty", () => {
    expect(
      () =>
        new AddProduct(
          validPayload.sku,
          validPayload.name,
          "",
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when supplier is empty", () => {
    expect(
      () =>
        new AddProduct(
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          "",
        ),
    ).toThrowError(ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when sku format is invalid", () => {
    expect(
      () =>
        new AddProduct(
          "invalid_sku!",
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(ADD_PRODUCT_ERRORS.SKU_INVALID_FORMAT);
  });

  it("should throw error when price is not a positive number", () => {
    expect(
      () =>
        new AddProduct(
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          -100000,
          validPayload.quantity,
          validPayload.supplier,
        ),
    ).toThrowError(ADD_PRODUCT_ERRORS.PRODUCT_PRICE_MUST_BE_POSITIVE_NUMBER);
  });

  it("should throw error when quantity is not a positive number", () => {
    expect(
      () =>
        new AddProduct(
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          validPayload.price,
          -10,
          validPayload.supplier,
        ),
    ).toThrowError(ADD_PRODUCT_ERRORS.PRODUCT_QUANTITY_MUST_BE_POSITIVE_NUMBER);
  });

  it("should create object correctly when payload is valid", () => {
    const addProduct: AddProduct = new AddProduct(
      validPayload.sku,
      validPayload.name,
      validPayload.category,
      validPayload.price,
      validPayload.quantity,
      validPayload.supplier,
    );

    expect(addProduct).toBeInstanceOf(AddProduct);
    expect(addProduct.getSku()).toBe(validPayload.sku);
    expect(addProduct.getName()).toBe(validPayload.name);
    expect(addProduct.getCategory()).toBe(validPayload.category);
    expect(addProduct.getPrice()).toBe(validPayload.price);
    expect(addProduct.getQuantity()).toBe(validPayload.quantity);
    expect(addProduct.getSupplier()).toBe(validPayload.supplier);
  });
});
