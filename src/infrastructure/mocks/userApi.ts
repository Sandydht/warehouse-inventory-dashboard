import { http, HttpResponse } from "msw";
import CryptoJS from "crypto-js";
import UserDummyData from "./json/user.json";

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET;

const decryptToken = (encryptedToken: string): string | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Decrypt error:", error);
    return null;
  }
};

export const userApi = [
  http.get("/api/user/get-profile", async ({ request }) => {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.replace("Bearer ", "");
    const userId = decryptToken(token);
    const user = UserDummyData.find((user) => user.id === userId);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return HttpResponse.json(
      {
        id: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        fullName: user.fullName,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        deletedAt: user.deletedAt,
      },
      { status: 200 },
    );
  }),
];
