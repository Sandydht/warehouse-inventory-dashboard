import type { AppDispatch } from "../../../app/store";
import { requestApproved } from "../../../features/inventory/inventory.slice";

export const approveRequest =
  (requestId: string) => (dispatch: AppDispatch) => {
    const role = "OFFICER";

    if (role !== "OFFICER") {
      throw new Error("Unauthorized");
    }

    dispatch(requestApproved(requestId));
  };
