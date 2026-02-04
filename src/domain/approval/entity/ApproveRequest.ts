import InputValidator from "../../utils/InputValidator.util";
import { APPROVE_REQUEST_ERRORS } from "../constants";

class ApproveRequest {
  private readonly id: string;

  constructor(id: string) {
    this._verifyPayload(id);

    this.id = id;
  }

  private _verifyPayload(id: string) {
    InputValidator.requireNotBlank(
      id,
      APPROVE_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getId(): string {
    return this.id;
  }
}

export default ApproveRequest;
