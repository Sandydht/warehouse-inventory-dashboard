import { describe, it, expect } from "vitest";
import NewAuth from "../NewAuth";
import { NEW_AUTH_ERRORS } from "../../constants";

describe("NewAuth entity", () => {
  const validPayload = {
    accessToken: "access-token",
    refreshToken: "refresh-token",
  };

  it("should throw error when accessToken is empty", () => {
    expect(() => new NewAuth("", validPayload.refreshToken)).toThrowError(
      NEW_AUTH_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should throw error when refreshToken is empty", () => {
    expect(() => new NewAuth(validPayload.accessToken, "")).toThrowError(
      NEW_AUTH_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const newAuth: NewAuth = new NewAuth(
      validPayload.accessToken,
      validPayload.refreshToken,
    );

    expect(newAuth).toBeInstanceOf(NewAuth);
    expect(newAuth.getAccessToken()).toBe(validPayload.accessToken);
    expect(newAuth.getRefreshToken()).toBe(validPayload.refreshToken);
  });
});
