import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface RejectApprovalRequestModalState {
  isOpen: boolean;
  payload?: unknown;
}

const initialState: RejectApprovalRequestModalState = {
  isOpen: false,
};

const rejectApprovalRequestModalSlice = createSlice({
  name: "rejectApprovalRequestModal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{
        payload?: unknown;
      }>,
    ) => {
      state.isOpen = true;
      state.payload = action.payload.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } =
  rejectApprovalRequestModalSlice.actions;
export default rejectApprovalRequestModalSlice.reducer;
