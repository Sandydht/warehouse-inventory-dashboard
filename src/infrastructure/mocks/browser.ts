import { setupWorker } from "msw/browser";
import { authApi } from "./handlers/authApi";
import { userApi } from "./handlers/userApi";
import { inventoryApi } from "./handlers/inventoryApi";

export const worker = setupWorker(...authApi, ...userApi, ...inventoryApi);
