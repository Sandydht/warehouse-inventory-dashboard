import InputValidator from "../../utils/InputValidator.util";
import { ADD_PRODUCT_ERRORS } from "../constants";

class AddProduct {
  private readonly sku: string;
  private readonly name: string;
  private readonly category: string;
  private readonly price: number;
  private readonly quantity: number;
  private readonly supplier: string;

  constructor(
    sku: string,
    name: string,
    category: string,
    price: number,
    quantity: number,
    supplier: string,
  ) {
    this._verifyPayload(sku, name, category, price, quantity, supplier);

    this.sku = sku;
    this.name = name;
    this.category = category;
    this.price = price;
    this.quantity = quantity;
    this.supplier = supplier;
  }

  private _verifyPayload(
    sku: string,
    name: string,
    category: string,
    price: number,
    quantity: number,
    supplier: string,
  ) {
    InputValidator.requireNotBlank(
      sku,
      ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      name,
      ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      category,
      ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      supplier,
      ADD_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );

    InputValidator.skuValidFormat(sku, ADD_PRODUCT_ERRORS.SKU_INVALID_FORMAT);
    InputValidator.positiveNumberValidFormat(
      price,
      ADD_PRODUCT_ERRORS.PRICE_MUST_BE_POSITIVE_NUMBER,
    );
    InputValidator.positiveNumberValidFormat(
      quantity,
      ADD_PRODUCT_ERRORS.QUANTITY_MUST_BE_POSITIVE_NUMBER,
    );
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

export default AddProduct;
