class InputValidator {
  private static readonly PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS_PATTERN =
    /^(?=.*[A-Za-z])(?=.*\d).+$/;
  private static readonly PASSWORD_MUST_NOT_CONTAIN_SPACE_PATTERN = /.*\s.*/;
  private static readonly EMAIL_PATTERN =
    /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  private static readonly INDONESIAN_PHONE_NUMBER_PATTERN =
    /^(?:\+62|62|0)8[1-9][0-9]{6,10}$/;
  private static readonly SKU_PATTERN = /^[A-Z0-9-]{6,12}$/;
  private static readonly POSITIVE_NUMBER_PATTERN = /^[0-9]\d*$/;

  public static requireNotBlank(value: string, message: string): void {
    if (value == null || value.trim() === "") {
      throw new Error(message);
    }
  }

  public static passwordLimitCharacter(
    password: string,
    message: string,
  ): void {
    if (password.length < 8) {
      throw new Error(message);
    }
  }

  public static passwordMustContainLettersAndNumber(
    password: string,
    message: string,
  ): void {
    if (
      !this.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS_PATTERN.test(password)
    ) {
      throw new Error(message);
    }
  }

  public static passwordMustNotContainSpace(
    password: string,
    message: string,
  ): void {
    if (this.PASSWORD_MUST_NOT_CONTAIN_SPACE_PATTERN.test(password)) {
      throw new Error(message);
    }
  }

  public static emailValidFormat(email: string, message: string): void {
    if (!this.EMAIL_PATTERN.test(email)) {
      throw new Error(message);
    }
  }

  public static indonesianPhoneNumberValidFormat(
    phoneNumber: string,
    message: string,
  ): void {
    if (!this.INDONESIAN_PHONE_NUMBER_PATTERN.test(phoneNumber)) {
      throw new Error(message);
    }
  }

  public static skuValidFormat(sku: string, message: string): void {
    if (!this.SKU_PATTERN.test(sku)) {
      throw new Error(message);
    }
  }

  public static positiveNumberValidFormat(
    value: number,
    message: string,
  ): void {
    if (value <= 0 || !this.POSITIVE_NUMBER_PATTERN.test(value.toString())) {
      throw new Error(message);
    }
  }
}

export default InputValidator;
