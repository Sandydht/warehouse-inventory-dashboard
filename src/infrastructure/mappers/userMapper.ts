import User from "../../domain/user/entity/User";
import type { UserRole } from "../../domain/user/types";
import type { UserProfileResponseDto } from "../dto/response/UserProfileResponseDto";

export const fromUserProfileResponseDtoToUserDomain = (
  dto: UserProfileResponseDto,
): User => {
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

export const fromUserDomainToUserProfileResponseDto = (
  domain: User,
): UserProfileResponseDto => ({
  id: domain.getId(),
  email: domain.getEmail(),
  phoneNumber: domain.getPhoneNumber(),
  fullName: domain.getFullName(),
  role: domain.getRole(),
  createdAt: domain.getCreatedAt(),
  updatedAt: domain.getUpdatedAt(),
  deletedAt: domain.getDeletedAt(),
});
