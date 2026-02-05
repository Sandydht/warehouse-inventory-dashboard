import InputValidator from "../../utils/InputValidator.util";
import { DELETE_PRODUCT_ERRORS } from "../constants";

class DeleteProduct {
  private readonly id: string;

  constructor(id: string) {
    this._verifyPayload(id);

    this.id = id;
  }

  private _verifyPayload(id: string) {
    InputValidator.requireNotBlank(
      id,
      DELETE_PRODUCT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getId(): string {
    return this.id;
  }
}

export default DeleteProduct;
