import { describe, it, expect } from "vitest";
import { validatePassword } from "../index";

describe("validatePassword()", () => {
  it("should pass when password meets all requirements", () => {
    const validPasswords = ["SafePass123", "Strong_P4ssword", "Password2026!"];

    validPasswords.forEach((password) => {
      expect(() => validatePassword(password)).not.toThrow();
    });
  });

  describe("Password Validation Failures", () => {
    it("should throw an error if password is less than 8 characters", () => {
      expect(() => validatePassword("Sh0rt1")).toThrowError(
        "Password must be at least 8 characters",
      );
    });

    it("should throw an error if password has no uppercase letter", () => {
      expect(() => validatePassword("lowercase123")).toThrowError(
        "Password must contain uppercase letter",
      );
    });

    it("should throw an error if password has no lowercase letter", () => {
      expect(() => validatePassword("UPPERCASE123")).toThrowError(
        "Password must contain lowercase letter",
      );
    });

    it("should throw an error if password has no number", () => {
      expect(() => validatePassword("NoNumberPassword")).toThrowError(
        "Password must contain number",
      );
    });
  });

  it.each([
    ["abc", "Password must be at least 8 characters"],
    ["nouppercase123", "Password must contain uppercase letter"],
    ["NOLOWERCASE123", "Password must contain lowercase letter"],
    ["NoDigitsHere", "Password must contain number"],
  ])(
    'should throw correct error for "%s"',
    (password: string, expectedError: string) => {
      expect(() => validatePassword(password)).toThrowError(expectedError);
    },
  );

  it("should throw an error for empty strings", () => {
    expect(() => validatePassword("")).toThrowError(
      "Password must be at least 8 characters",
    );
  });
});
