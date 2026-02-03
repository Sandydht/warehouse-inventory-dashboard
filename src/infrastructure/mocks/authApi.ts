import { http, HttpResponse } from "msw";
import UserDummyData from "./json/user.json";

export const authApi = [
  http.post("/api/auth/login-account", async ({ request }) => {
    const { email, password } = (await request.json()) as {
      email: string;
      password: string;
    };

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
];
