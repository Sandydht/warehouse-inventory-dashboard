import InputValidator from "../../utils/InputValidator.util";
import { INVENTORY_ITEM_ERRORS } from "../constants";

class InventoryItem {
  private readonly id: string;
  private readonly sku: string;
  private readonly name: string;
  private readonly category: string;
  private readonly price: number;
  private readonly quantity: number;
  private readonly supplier: string;
  private readonly createdAt: string;
  private readonly updatedAt: string | null;
  private readonly deletedAt: string | null;

  constructor(
    id: string,
    sku: string,
    name: string,
    category: string,
    price: number,
    quantity: number,
    supplier: string,
    createdAt: string,
    updatedAt: string | null,
    deletedAt: string | null,
  ) {
    this._verifyPayload(
      id,
      sku,
      name,
      category,
      price,
      quantity,
      supplier,
      createdAt,
    );

    this.id = id;
    this.sku = sku;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.supplier = supplier;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private _verifyPayload(
    id: string,
    sku: string,
    name: string,
    category: string,
    price: number,
    quantity: number,
    supplier: string,
    createdAt: string,
  ) {
    InputValidator.requireNotBlank(
      id,
      INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      sku,
      INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      name,
      INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      category,
      INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      supplier,
      INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      createdAt,
      INVENTORY_ITEM_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );

    InputValidator.skuValidFormat(
      sku,
      INVENTORY_ITEM_ERRORS.SKU_INVALID_FORMAT,
    );
    InputValidator.positiveNumberValidFormat(
      price,
      INVENTORY_ITEM_ERRORS.PRODUCT_PRICE_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      quantity,
      INVENTORY_ITEM_ERRORS.PRODUCT_QUANTITY_MUST_BE_POSITIVE_NUMBER,
    );
  }

  getId(): string {
    return this.id;
  }

  getSku(): string {
    return this.sku;
  }

  getName(): string {
    return this.name;
  }

  getCategory(): string {
    return this.category;
  }

  getPrice(): number {
    return this.price;
  }

  getQuantity(): number {
    return this.quantity;
  }

  getSupplier(): string {
    return this.supplier;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  getUpdatedAt(): string | null {
    return this.updatedAt;
  }

  getDeletedAt(): string | null {
    return this.deletedAt;
  }
}

export default InventoryItem;
