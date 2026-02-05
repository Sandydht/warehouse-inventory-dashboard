import { createSlice } from "@reduxjs/toolkit";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import type { UserProfileResponseDto } from "../../../infrastructure/dto/response/UserProfileResponseDto";
import { getUserProfile } from "./userThunk";

interface UserState {
  userProfile: AsyncState<UserProfileResponseDto>;
}

const initialState: UserState = {
  userProfile: createAsyncState<UserProfileResponseDto>(),
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserProfileData: (state) => {
      state.userProfile.loading = false;
      state.userProfile.data = null;
      state.userProfile.error = null;
    },
  },
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, getUserProfile, "userProfile");
  },
});

export const { resetUserProfileData } = userSlice.actions;
export default userSlice.reducer;
