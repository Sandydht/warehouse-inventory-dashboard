import { describe, expect, it, vi } from "vitest";
import SecureStorage from "../SecuredStorage";
import MethodAssertion from "../MethodAssertion";
import { SECURE_STORAGE_ERRORS } from "../constants";

describe("SecureStorage interface", () => {
  it("should throw error when invoke abstract behavior", async () => {
    const secureStorage: SecureStorage = new SecureStorage();
    const mockMethodAssertion: MethodAssertion = {
      assertImplemented: vi.fn(),
    };

    mockMethodAssertion.assertImplemented(
      secureStorage,
      "setSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      secureStorage,
      "getSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    mockMethodAssertion.assertImplemented(
      secureStorage,
      "removeSecureItem",
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    expect(secureStorage).toBeInstanceOf(SecureStorage);
    expect(() => secureStorage.setSecureItem("", "")).toThrowError(
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(() => secureStorage.getSecureItem("")).toThrowError(
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
    expect(() => secureStorage.removeSecureItem("")).toThrowError(
      SECURE_STORAGE_ERRORS.METHOD_NOT_IMPLEMENTED,
    );
  });
});
