import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { StockItem } from "../../core/inventory/domain/StockItem";
import type { StockRequest } from "../../core/inventory/domain/StockRequest";

interface InventoryState {
  liveStock: StockItem[];
  pendingRequests: StockRequest[];
}

const initialState: InventoryState = {
  liveStock: [],
  pendingRequests: [],
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {
    requestCreated(state, action: PayloadAction<StockRequest>) {
      state.pendingRequests.push(action.payload);
    },
    requestApproved(state, action: PayloadAction<string>) {
      const request = state.pendingRequests.find(
        (r) => r.id === action.payload,
      );

      if (!request) return;

      if (request.type === "CREATE") {
        state.liveStock.push(request.proposed!);
      }

      if (request.type === "UPDATE") {
        const index = state.liveStock.findIndex(
          (i) => i.id === request.original!.id,
        );

        if (index !== -1) {
          state.liveStock[index] = request.proposed!;
        }
      }

      if (request.type === "DELETE") {
        state.liveStock = state.liveStock.filter(
          (i) => i.id !== request.original!.id,
        );
      }

      state.pendingRequests = state.pendingRequests.filter(
        (r) => r.id !== request.id,
      );
    },
    requestRejected(state, action: PayloadAction<string>) {
      state.pendingRequests = state.pendingRequests.filter(
        (r) => r.id !== action.payload,
      );
    },
  },
});

export const { requestCreated, requestApproved, requestRejected } =
  inventorySlice.actions;

export default inventorySlice.reducer;
