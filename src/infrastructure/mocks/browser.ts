import { setupWorker } from "msw/browser";
import { authApi } from "./authApi";
import { userApi } from "./userApi";

export const worker = setupWorker(...authApi, ...userApi);
