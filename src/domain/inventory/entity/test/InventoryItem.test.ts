import { describe, expect, it } from "vitest";
import InventoryItem from "../InventoryItem";
import { INVENTORY_ITEM_ERRORS } from "../../constants";

describe("InventoryItem entity", () => {
  const validPayload = {
    id: "inv-001",
    sku: "PRODUCT-001",
    name: "Product Name",
    category: "Electronics",
    price: 500000,
    quantity: 10,
    supplier: "Supplier Name",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    deletedAt: null,
  };

  it("should throw error when id is empty", () => {
    expect(
      () =>
        new InventoryItem(
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
    ).toThrowError(INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when sku is empty", () => {
    expect(
      () =>
        new InventoryItem(
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
    ).toThrowError(INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when name is empty", () => {
    expect(
      () =>
        new InventoryItem(
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
    ).toThrowError(INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when category is empty", () => {
    expect(
      () =>
        new InventoryItem(
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
    ).toThrowError(INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when supplier is empty", () => {
    expect(
      () =>
        new InventoryItem(
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
    ).toThrowError(INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdAt is empty", () => {
    expect(
      () =>
        new InventoryItem(
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
    ).toThrowError(INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when sku is invalid", () => {
    expect(
      () =>
        new InventoryItem(
          validPayload.id,
          "invalid-sku",
          validPayload.name,
          validPayload.category,
          validPayload.price,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(INVENTORY_ITEM_ERRORS.SKU_INVALID_FORMAT);
  });

  it("should throw error when price is not a positive number", () => {
    expect(
      () =>
        new InventoryItem(
          validPayload.id,
          validPayload.sku,
          validPayload.name,
          validPayload.category,
          -10000,
          validPayload.quantity,
          validPayload.supplier,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(INVENTORY_ITEM_ERRORS.PRICE_MUST_BE_POSITIVE_NUMBER);
  });

  it("should throw error when quantity is not a positive number", () => {
    expect(
      () =>
        new InventoryItem(
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
    ).toThrowError(INVENTORY_ITEM_ERRORS.QUANTITY_MUST_BE_POSITIVE_NUMBER);
  });

  it("should create object correctly when payload is valid", () => {
    const inventoryItem: InventoryItem = new InventoryItem(
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

    expect(inventoryItem).toBeInstanceOf(InventoryItem);
    expect(inventoryItem.getId()).toBe(validPayload.id);
    expect(inventoryItem.getSku()).toBe(validPayload.sku);
    expect(inventoryItem.getName()).toBe(validPayload.name);
    expect(inventoryItem.getCategory()).toBe(validPayload.category);
    expect(inventoryItem.getPrice()).toBe(validPayload.price);
    expect(inventoryItem.getQuantity()).toBe(validPayload.quantity);
    expect(inventoryItem.getSupplier()).toBe(validPayload.supplier);
    expect(inventoryItem.getCreatedAt()).toBe(validPayload.createdAt);
    expect(inventoryItem.getUpdatedAt()).toBe(validPayload.updatedAt);
    expect(inventoryItem.getDeletedAt()).toBe(validPayload.deletedAt);
  });
});
