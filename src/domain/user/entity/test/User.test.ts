import { describe, it, expect } from "vitest";
import User from "../User";
import type { UserRole } from "../../types";
import { USER_ERRORS } from "../../constants";

describe("User entity", () => {
  const validPayload = {
    id: "user-123",
    email: "example@email.com",
    phoneNumber: "081123123123",
    fullName: "User",
    role: "OFFICER",
    createdAt: new Date(Date.now()).toISOString(),
    updatedAt: null,
    deletedAt: null,
  };

  it("should throw error when id is empty", () => {
    expect(
      () =>
        new User(
          "",
          validPayload.email,
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when email is empty", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          "",
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when phone number is empty", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          "",
          validPayload.fullName,
          validPayload.role as UserRole,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when fullname is empty", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          validPayload.phoneNumber,
          "",
          validPayload.role as UserRole,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when createdAt is empty", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          "",
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when email format is invalid", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          "invalid-email",
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.EMAIL_IS_INVALID);
  });

  it("should throw error when phone number format is invalid", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          "invalid-phone-number",
          validPayload.fullName,
          validPayload.role as UserRole,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.INDONESIAN_PHONE_NUMBER_IS_INVALID);
  });

  it("should create object correctly when payload is valid", () => {
    const user: User = new User(
      validPayload.id,
      validPayload.email,
      validPayload.phoneNumber,
      validPayload.fullName,
      validPayload.role as UserRole,
      validPayload.createdAt,
      validPayload.updatedAt,
      validPayload.deletedAt,
    );

    expect(user).toBeInstanceOf(User);
    expect(user.getId()).toBe(validPayload.id);
    expect(user.getEmail()).toBe(validPayload.email);
    expect(user.getPhoneNumber()).toBe(validPayload.phoneNumber);
    expect(user.getFullName()).toBe(validPayload.fullName);
    expect(user.getRole()).toBe(validPayload.role);
    expect(user.getCreatedAt()).toBe(validPayload.createdAt);
    expect(user.getUpdatedAt()).toBe(validPayload.updatedAt);
    expect(user.getDeletedAt()).toBe(validPayload.deletedAt);
  });
});
