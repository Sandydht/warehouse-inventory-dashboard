import type { AxiosResponse } from "axios";
import User from "../../domain/user/entity/User";
import UserRepository from "../../domain/user/UserRepository";
import type { UserProfileResponseDto } from "../dto/response/UserProfileResponseDto";
import { privateApi } from "../http/axiosInstance";
import { toUserDomain } from "../mappers/userMapper";

class UserRepositoryImpl extends UserRepository {
  async getUserProfile(): Promise<User> {
    const { data } = await privateApi.get<
      UserProfileResponseDto,
      AxiosResponse<UserProfileResponseDto>
    >("/user/get-profile");

    return toUserDomain(data);
  }
}

export default UserRepositoryImpl;
