/* eslint-disable @typescript-eslint/no-unused-vars */
import { SECURE_STORAGE_ERRORS } from "./constants";

class SecureStorage {
  public setSecureItem?(_key: string, _value: unknown) {
    throw new Error(SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  public getSecureItem?(_key: string): unknown {
    throw new Error(SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED);
  }

  public removeSecureItem?(_key: string) {
    throw new Error(SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED);
  }
}

export default SecureStorage;
