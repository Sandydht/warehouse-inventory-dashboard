import User from "../../domain/user/entity/User";
import type { UserRole } from "../../domain/user/types";
import type { UserProfileResponseDto } from "../dto/response/UserProfileResponseDto";

export const toUserDomain = (dto: UserProfileResponseDto): User => {
  return new User(
    dto.id,
    dto.email,
    dto.phoneNumber,
    dto.fullName,
    dto.role as UserRole,
    dto.createdAt,
    dto.updatedAt,
    dto.deletedAt,
  );
};
