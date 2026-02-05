import InputValidator from "../../utils/InputValidator.util";
import { GET_APPROVAL_REQUEST_DETAIL_ERRORS } from "../constants";

class GetApprovalRequestDetail {
  private readonly id: string;

  constructor(id: string) {
    this._verifyPayload(id);

    this.id = id;
  }

  private _verifyPayload(id: string) {
    InputValidator.requireNotBlank(
      id,
      GET_APPROVAL_REQUEST_DETAIL_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getId(): string {
    return this.id;
  }
}

export default GetApprovalRequestDetail;
