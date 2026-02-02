import { describe, it, expect } from "vitest";
import { isValidEmail } from "../index";

describe("isValidEmail()", () => {
  it("should not throw an error when provided a valid email address", () => {
    const validEmails = [
      "john.doe@example.com",
      "hello_world@domain.org",
      "user123@sub.domain.co.id",
    ];

    validEmails.forEach((email) => {
      expect(() => isValidEmail(email)).not.toThrow();
    });
  });

  it('should throw "Invalid email" error for improperly formatted emails', () => {
    const invalidEmails = [
      "missing-at-sign.com",
      "@no-username.com",
      "user@no-extension",
      "user@domain..com",
      "spaces in@email.com",
      "double@@domain.com",
    ];

    invalidEmails.forEach((email) => {
      expect(() => isValidEmail(email)).toThrowError("Invalid email");
    });
  });

  it("should throw an error for empty strings", () => {
    expect(() => isValidEmail("")).toThrowError("Invalid email");
  });
});
