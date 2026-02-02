import type { UserLoginRequestDto } from "../../dto/request/UserLoginRequestDto";
import type { UserLoginResponseDto } from "../../dto/response/UserLoginResponseDto";
import UserDummyData from "../json/user.json";
import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET;

export const loginAccountDummyApi = (
  payload: UserLoginRequestDto,
): UserLoginResponseDto => {
  const findUser = UserDummyData.find(
    (user) => user.email == payload.email && user.password == payload.password,
  );
  if (!findUser) throw new Error("Invalid credentials");

  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(findUser.id),
    SECRET_KEY,
  ).toString();

  return {
    accessToken: encrypted,
    refreshToken: encrypted,
  };
};
