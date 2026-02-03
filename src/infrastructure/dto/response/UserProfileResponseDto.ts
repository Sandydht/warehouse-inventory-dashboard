export interface UserProfileResponseDto {
  id: string;
  email: string;
  phoneNumber: string;
  fullName: string;
  role: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
}
