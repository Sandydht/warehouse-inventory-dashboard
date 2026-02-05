import InputValidator from "../../utils/InputValidator.util";
import { USER_ERRORS } from "../constants";
import type { UserRole } from "../types";

class User {
  private readonly id: string;
  private readonly email: string;
  private readonly phoneNumber: string;
  private readonly fullName: string;
  private readonly role: UserRole;
  private readonly createdAt: string;
  private readonly updatedAt: string | null;
  private readonly deletedAt: string | null;

  constructor(
    id: string,
    email: string,
    phoneNumber: string,
    fullName: string,
    role: UserRole,
    createdAt: string,
    updatedAt: string | null,
    deletedAt: string | null,
  ) {
    this._verifyPayload(id, email, phoneNumber, fullName, role, createdAt);

    this.id = id;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.role = role;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }

  private _verifyPayload(
    id: string,
    email: string,
    phoneNumber: string,
    fullName: string,
    role: UserRole,
    createdAt: string,
  ) {
    InputValidator.requireNotBlank(id, USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY);
    InputValidator.requireNotBlank(
      email,
      USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      phoneNumber,
      USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      fullName,
      USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      role,
      USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );
    InputValidator.requireNotBlank(
      createdAt,
      USER_ERRORS.NOT_CONTAIN_NEEDED_PROPERTY,
    );

    InputValidator.emailValidFormat(email, USER_ERRORS.EMAIL_IS_INVALID);
    InputValidator.indonesianPhoneNumberValidFormat(
      phoneNumber,
      USER_ERRORS.INDONESIAN_PHONE_NUMBER_IS_INVALID,
    );
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPhoneNumber(): string {
    return this.phoneNumber;
  }

  getFullName(): string {
    return this.fullName;
  }

  getRole(): UserRole {
    return this.role;
  }

  getCreatedAt(): string {
    return this.createdAt;
  }

  getUpdatedAt(): string | null {
    return this.updatedAt;
  }

  getDeletedAt(): string | null {
    return this.deletedAt;
  }
}

export default User;
