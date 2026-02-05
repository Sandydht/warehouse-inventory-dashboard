import InputValidator from "../../utils/InputValidator.util";
import { USER_LOGIN_ERRORS } from "../constants";

class UserLogin {
  private readonly email: string;
  private readonly password: string;

  constructor(email: string, password: string) {
    this._verifyPayload(email, password);

    this.email = email;
    this.password = password;
  }

  private _verifyPayload(email: string, password: string) {
    InputValidator.requireNotBlank(
      email,
      USER_LOGIN_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      password,
      USER_LOGIN_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );

    InputValidator.emailValidFormat(email, USER_LOGIN_ERRORS.EMAIL_IS_INVALID);
    InputValidator.passwordLimitCharacter(
      password,
      USER_LOGIN_ERRORS.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS,
    );
    InputValidator.passwordMustContainLettersAndNumber(
      password,
      USER_LOGIN_ERRORS.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS,
    );
    InputValidator.passwordMustNotContainSpace(
      password,
      USER_LOGIN_ERRORS.PASSWORD_MUST_NOT_CONTAIN_SPACE,
    );
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }
}

export default UserLogin;
