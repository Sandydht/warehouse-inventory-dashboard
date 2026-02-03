import { http, HttpResponse } from "msw";
import UserDummyData from "./json/user.json";
import type { UserLoginRequestDto } from "../dto/request/UserLoginRequestDto";
import type { UserLogoutRequestDto } from "../dto/request/UserLogoutRequestDto";

export const authApi = [
  http.post("/api/auth/login-account", async ({ request }) => {
    const { email, password } = (await request.json()) as UserLoginRequestDto;

    const user = UserDummyData.find(
      (user) => user.email === email && user.password === password,
    );
    if (user && user.id) {
      return HttpResponse.json(
        { accessToken: user.id, refreshToken: user.id },
        { status: 200 },
      );
    }

    return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
  }),

  http.post("/api/auth/logout-account", async ({ request }) => {
    const { refreshToken } = (await request.json()) as UserLogoutRequestDto;

    if (!refreshToken) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return HttpResponse.json({ message: "See you!" }, { status: 200 });
  }),
];
