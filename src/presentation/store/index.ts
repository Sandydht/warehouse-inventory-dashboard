import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import userReducer from "./user/userSlice";
import snackbarReducer from "./snackbar/snackbarSlice";
import approvalReducer from "./approval/approvalSlice";
import confirmationModalReducer from "./modal/confirmationModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    snackbar: snackbarReducer,
    approval: approvalReducer,
    confirmationModal: confirmationModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
