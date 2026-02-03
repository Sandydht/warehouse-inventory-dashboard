import InputValidator from "../../utils/InputValidator.util";
import { USER_LOGOUT_ERRORS } from "../constants";

class UserLogout {
  private readonly message: string;

  constructor(message: string) {
    this._verifyPayload(message);
    this.message = message;
  }

  private _verifyPayload(message: string) {
    InputValidator.requireNotBlank(
      message,
      USER_LOGOUT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getMessage(): string {
    return this.message;
  }
}

export default UserLogout;
