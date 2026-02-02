/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect } from "vitest";
import MethodAssertionImpl from "../MethodAssertionImpl";

describe("MethodAssertionImpl", () => {
  const methodAssertion: MethodAssertionImpl = new MethodAssertionImpl();

  it("should not throw error when menthod is implemented", () => {
    const repository = {
      registerAccount: () => "ok",
    };

    expect(() => {
      methodAssertion.assertImplemented(
        repository,
        "registerAccount",
        "METHOD_NOT_IMPLEMENTED",
      );
    }).not.toThrow();
  });

  it("should throw error when method is missing", () => {
    const repository = {};

    expect(() => {
      methodAssertion.assertImplemented(
        repository as any,
        "registerAccount",
        "METHOD_NOT_IMPLEMENTED",
      );
    }).toThrowError("METHOD_NOT_IMPLEMENTED");
  });

  it("should throw error when property exists but is not a function", () => {
    const repository = {
      registerAccount: "not-a-function",
    };

    expect(() => {
      methodAssertion.assertImplemented(
        repository as any,
        "registerAccount",
        "METHOD_NOT_IMPLEMENTED",
      );
    }).toThrowError("METHOD_NOT_IMPLEMENTED");
  });
});
