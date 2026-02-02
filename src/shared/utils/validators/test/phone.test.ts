import { describe, it, expect } from "vitest";
import { validatePhoneNumber } from "../index";

describe("validatePhoneNumber()", () => {
  it.each([
    ["08123456789", "11 digits"],
    ["+6281234567890", "13 digits with +62"],
    ["6285211223344", "13 digits with 62"],
    ["0811122233", "10 digits (minimum)"],
    ["0812345678901", "13 digits (standard max)"],
  ])(
    "should pass for valid Indonesian phone numbers format: %s (%s)",
    (phone) => {
      expect(() => validatePhoneNumber(phone)).not.toThrow();
    },
  );

  it.each([
    ["08123", "too short"],
    ["0812345678901234", "too long"],
    ["08012345678", "invalid provider code (080)"],
    ["+1812345678", "wrong country code"],
    ["not-a-number", "alphabetical input"],
  ])(
    "should throw error for invalid phone numbers format: %s (%s)",
    (phone) => {
      expect(() => validatePhoneNumber(phone)).toThrowError(
        "Invalid phone number",
      );
    },
  );
});
