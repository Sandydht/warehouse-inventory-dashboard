import InputValidator from "../../utils/InputValidator.util";
import { REJECT_REQUEST_ERRORS } from "../constants";

class RejectRequest {
  private readonly id: string;
  private readonly rejectReason: string;

  constructor(id: string, rejectReason: string) {
    this._verifyPayload(id, rejectReason);

    this.id = id;
    this.rejectReason = rejectReason;
  }

  private _verifyPayload(id: string, rejectReason: string) {
    InputValidator.requireNotBlank(
      id,
      REJECT_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      rejectReason,
      REJECT_REQUEST_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getId(): string {
    return this.id;
  }

  getRejectReason(): string {
    return this.rejectReason;
  }
}

export default RejectRequest;
