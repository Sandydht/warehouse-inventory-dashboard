import { setupWorker } from "msw/browser";
import { authApi } from "./handlers/authApi";
import { userApi } from "./handlers/userApi";
import { approvalApi } from "./handlers/approvalApi";
import { inventoryApi } from "./handlers/inventoryApi";
import { stockHistoryApi } from "./handlers/stockHistoryApi";

export const worker = setupWorker(
  ...authApi,
  ...userApi,
  ...approvalApi,
  ...inventoryApi,
  ...stockHistoryApi,
);
