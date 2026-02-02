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
    password: "password123",
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
          validPayload.password,
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
          validPayload.password,
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
          validPayload.password,
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
          validPayload.password,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
  });

  it("should throw error when password is empty", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          "",
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
          validPayload.password,
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
          validPayload.password,
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
          validPayload.password,
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.INDONESIAN_PHONE_NUMBER_IS_INVALID);
  });

  it("should throw error when password less than 8 characters", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          "pass",
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS);
  });

  it("should throw error when password does not contain letters and numbers", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          "password",
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS);
  });

  it("should throw error when password contains space", () => {
    expect(
      () =>
        new User(
          validPayload.id,
          validPayload.email,
          validPayload.phoneNumber,
          validPayload.fullName,
          validPayload.role as UserRole,
          "password 123",
          validPayload.createdAt,
          validPayload.updatedAt,
          validPayload.deletedAt,
        ),
    ).toThrowError(USER_ERRORS.PASSWORD_MUST_NOT_CONTAIN_SPACE);
  });

  it("should create RegisterUser correctly when payload is valid", () => {
    const user: User = new User(
      validPayload.id,
      validPayload.email,
      validPayload.phoneNumber,
      validPayload.fullName,
      validPayload.role as UserRole,
      validPayload.password,
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
    expect(user.getPassword()).toBe(validPayload.password);
    expect(user.getCreatedAt()).toBe(validPayload.createdAt);
    expect(user.getUpdatedAt()).toBe(validPayload.updatedAt);
    expect(user.getDeletedAt()).toBe(validPayload.deletedAt);
  });
});
