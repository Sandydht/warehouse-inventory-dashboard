import { describe, it, expect } from "vitest";
import { REFRESH_TOKEN_ERRORS } from "../../constants";
import RefreshToken from "../RefreshToken";

describe("RefreshToken entity", () => {
  const validPayload = {
    token: "valid-refresh-token",
  };

  it("should throw error when token is empty", () => {
    expect(() => new RefreshToken("")).toThrowError(
      REFRESH_TOKEN_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const refreshToken: RefreshToken = new RefreshToken(validPayload.token);

    expect(refreshToken).toBeInstanceOf(RefreshToken);
    expect(refreshToken.getToken()).toBe(validPayload.token);
  });
});
