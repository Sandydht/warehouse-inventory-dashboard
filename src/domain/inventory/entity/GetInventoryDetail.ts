import InputValidator from "../../utils/InputValidator.util";
import { GET_INVENTORY_DETAIL_ERRORS } from "../constants";

class GetInventoryDetail {
  private readonly id: string;

  constructor(id: string) {
    this._verifyPayload(id);

    this.id = id;
  }

  private _verifyPayload(id: string) {
    InputValidator.requireNotBlank(
      id,
      GET_INVENTORY_DETAIL_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getId(): string {
    return this.id;
  }
}

export default GetInventoryDetail;
