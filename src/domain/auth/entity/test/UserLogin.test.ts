import { describe, it, expect } from "vitest";
import UserLogin from "../UserLogin";
import { USER_LOGIN_ERRORS } from "../../constants";

describe("UserLogin entity", () => {
  const validPayload = {
    email: "example@email.com",
    password: "password123",
  };

  it("should throw error when email is empty", () => {
    expect(() => new UserLogin("", validPayload.password)).toThrowError(
      USER_LOGIN_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should throw error when password is empty", () => {
    expect(() => new UserLogin(validPayload.email, "")).toThrowError(
      USER_LOGIN_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should throw error when email format is invalid", () => {
    expect(
      () => new UserLogin("invalid-email", validPayload.password),
    ).toThrowError(USER_LOGIN_ERRORS.EMAIL_IS_INVALID);
  });

  it("should throw error when password less than 8 characters", () => {
    expect(() => new UserLogin(validPayload.email, "pass")).toThrowError(
      USER_LOGIN_ERRORS.PASSWORD_MUST_BE_AT_LEAST_8_CHARACTERS,
    );
  });

  it("should throw error when password does not contain letters and numbers", () => {
    expect(() => new UserLogin(validPayload.email, "password")).toThrowError(
      USER_LOGIN_ERRORS.PASSWORD_MUST_CONTAIN_LETTERS_AND_NUMBERS,
    );
  });

  it("should throw error when password contains space", () => {
    expect(
      () => new UserLogin(validPayload.email, "password 123"),
    ).toThrowError(USER_LOGIN_ERRORS.PASSWORD_MUST_NOT_CONTAIN_SPACE);
  });

  it("should create RegisterUser correctly when payload is valid", () => {
    const userLogin: UserLogin = new UserLogin(
      validPayload.email,
      validPayload.password,
    );

    expect(userLogin).toBeInstanceOf(UserLogin);
    expect(userLogin.getEmail()).toBe(validPayload.email);
    expect(userLogin.getPassword()).toBe(validPayload.password);
  });
});
