import { setupWorker } from "msw/browser";
import { authApi } from "./authApi";
import { userApi } from "./userApi";
import { inventoryApi } from "./inventory.api";

export const worker = setupWorker(...authApi, ...userApi, ...inventoryApi);
