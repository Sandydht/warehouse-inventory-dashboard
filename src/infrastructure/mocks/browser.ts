import { setupWorker } from "msw/browser";
import { authApi } from "./handlers/authApi";
import { userApi } from "./handlers/userApi";
import { approvalApi } from "./handlers/approvalApi";

export const worker = setupWorker(...authApi, ...userApi, ...approvalApi);
