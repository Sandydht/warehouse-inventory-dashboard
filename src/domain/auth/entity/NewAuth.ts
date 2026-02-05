import InputValidator from "../../utils/InputValidator.util";
import { NEW_AUTH_ERRORS } from "../constants";

class NewAuth {
  private readonly accessToken: string;
  private readonly refreshToken: string;

  constructor(accessToken: string, refreshToken: string) {
    this._verifyPayload(accessToken, refreshToken);

    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }

  private _verifyPayload(accessToken: string, refreshToken: string) {
    InputValidator.requireNotBlank(
      accessToken,
      NEW_AUTH_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      refreshToken,
      NEW_AUTH_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  }

  getAccessToken(): string {
    return this.accessToken;
  }

  getRefreshToken(): string {
    return this.refreshToken;
  }
}

export default NewAuth;
