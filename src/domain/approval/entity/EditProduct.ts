import InputValidator from "../../utils/InputValidator.util";
import { EDIT_PRODUCT_ERRORS } from "../constants";

class EditProduct {
  private readonly id: string;
  private readonly sku: string;
  private readonly name: string;
  private readonly category: string;
  private readonly price: number;
  private readonly quantity: number;
  private readonly supplier: string;

  constructor(
    id: string,
    sku: string,
    name: string,
    category: string,
    price: number,
    quantity: number,
    supplier: string,
  ) {
    this._verifyPayload(id, sku, name, category, price, quantity, supplier);

    this.id = id;
    this.sku = sku;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.supplier = supplier;
  }

  private _verifyPayload(
    id: string,
    sku: string,
    name: string,
    category: string,
    price: number,
    quantity: number,
    supplier: string,
  ) {
    InputValidator.requireNotBlank(
      id,
      EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      sku,
      EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      name,
      EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      category,
      EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      supplier,
      EDIT_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );

    InputValidator.skuValidFormat(sku, EDIT_PRODUCT_ERRORS.SKU_INVALID_FORMAT);
    InputValidator.positiveNumberValidFormat(
      price,
      EDIT_PRODUCT_ERRORS.PRICE_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      quantity,
      EDIT_PRODUCT_ERRORS.QUANTITY_MUST_BE_POSITIVE_NUMBER,
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
}

export default EditProduct;
