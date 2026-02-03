import { createSlice } from "@reduxjs/toolkit";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import type { UserProfileResponseDto } from "../../../infrastructure/dto/response/UserProfileResponseDto";
import { getUserProfile } from "./userThunk";

interface AuthState {
  userProfile: AsyncState<UserProfileResponseDto>;
}

const initialState: AuthState = {
  userProfile: createAsyncState<UserProfileResponseDto>(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, getUserProfile, "userProfile");
  },
});

export default authSlice.reducer;
