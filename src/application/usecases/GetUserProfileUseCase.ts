import { USER_REPOSITORY_ERRORS } from "../../domain/user/constants";
import type User from "../../domain/user/entity/User";
import type UserRepository from "../../domain/user/UserRepository";
import type MethodAssertion from "../utils/MethodAssertion";

class GetUserProfileUseCase {
  private readonly methodAssertion: MethodAssertion;
  private readonly userRepository: UserRepository;

  constructor(
    methodAssertion: MethodAssertion,
    userRepository: UserRepository,
  ) {
    this.methodAssertion = methodAssertion;
    this.userRepository = userRepository;
  }

  async execute(): Promise<User> {
    this.methodAssertion.assertImplemented(
      this.userRepository,
      "getUserProfile",
      USER_REPOSITORY_ERRORS.METHOD_NOT_IMPLEMENTED,
    );

    return await this.userRepository.getUserProfile();
  }
}

export default GetUserProfileUseCase;
