import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface ConfirmationModalState {
  isOpen: boolean;
  title?: string;
  body?: string;
  confirmType?: string;
  payload?: unknown;
}

const initialState: ConfirmationModalState = {
  isOpen: false,
};

const confirmationModalSlice = createSlice({
  name: "confirmationModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        title?: string;
        body?: string;
        confirmType?: string;
        payload?: unknown;
      }>,
    ) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.body = action.payload.body;
      state.confirmType = action.payload.confirmType;
      state.payload = action.payload.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = undefined;
      state.body = undefined;
    },
  },
});

export const { openModal, closeModal } = confirmationModalSlice.actions;
export default confirmationModalSlice.reducer;
