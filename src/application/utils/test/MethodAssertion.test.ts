import { describe, it, expect } from "vitest";
import MethodAssertion from "../MethodAssertion";
import SecureStorage from "../SecureStorage";
import { METHOD_ASSERTION_ERRORS } from "../constants";

describe("MethodAssertion", () => {
  it("should throw error when invoke abstract behavior", () => {
    const secureStorage: SecureStorage = new SecureStorage();
    const methodAssertion: MethodAssertion = new MethodAssertion();

    expect(() =>
      methodAssertion.assertImplemented(
        secureStorage,
        "setSecureItem",
        "SECURE_STORAGE.METHOD_NOT_IMPLEMENTED",
      ),
    ).toThrowError(METHOD_ASSERTION_ERRORS.METHOD_NOT_IMPLEMENTED);
  });
});
