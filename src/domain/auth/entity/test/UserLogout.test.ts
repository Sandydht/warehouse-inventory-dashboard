import { describe, it, expect } from "vitest";
import UserLogout from "../UserLogout";
import { USER_LOGOUT_ERRORS } from "../../constants";

describe("UserLogout entity", () => {
  const validPayload = {
    message: "See you!",
  };

  it("should throw error when message is empty", () => {
    expect(() => new UserLogout("")).toThrowError(
      USER_LOGOUT_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
  });

  it("should create object correctly when payload is valid", () => {
    const userLogout: UserLogout = new UserLogout(validPayload.message);

    expect(userLogout).toBeInstanceOf(UserLogout);
    expect(userLogout.getMessage()).toBe(validPayload.message);
  });
});
