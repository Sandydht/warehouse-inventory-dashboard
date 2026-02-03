import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SnackbarType = "success" | "error" | "info" | "warning";

export interface Snackbar {
  id: number;
  message: string;
  type: SnackbarType;
  duration: number;
}

export interface SnackbarState {
  list: Snackbar[];
}

const initialState: SnackbarState = {
  list: [],
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{
        message: string;
        type?: SnackbarType;
        duration?: number;
      }>,
    ) => {
      const id = Date.now();
      const { message, type = "info", duration = 3000 } = action.payload;
      state.list.push({ id, message, type, duration });
    },
    removeSnackbar: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter(
        (snackbar) => snackbar.id !== action.payload,
      );
    },
  },
});

export const { showSnackbar, removeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
