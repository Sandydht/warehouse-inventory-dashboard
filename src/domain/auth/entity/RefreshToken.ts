import InputValidator from "../../utils/InputValidator.util";
import { REFRESH_TOKEN_ERRORS } from "../constants";

class RefreshToken {
  private readonly token: string;

  constructor(token: string) {
    this._verifyPayload(token);

    this.token = token;
  }

  private _verifyPayload(token: string) {
    InputValidator.requireNotBlank(
      token,
      REFRESH_TOKEN_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getToken(): string {
    return this.token;
  }
}

export default RefreshToken;
