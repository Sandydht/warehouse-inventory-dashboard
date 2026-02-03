import { createSlice } from "@reduxjs/toolkit";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import type { UserLoginResponseDto } from "../../../infrastructure/dto/response/UserLoginResponseDto";
import { loginAccount, logoutAccount } from "./authThunk";
import type { UserLogoutResponseDto } from "../../../infrastructure/dto/response/UserLogoutResponseDto";

interface AuthState {
  login: AsyncState<UserLoginResponseDto>;
  logout: AsyncState<UserLogoutResponseDto>;
}

const initialState: AuthState = {
  login: createAsyncState<UserLoginResponseDto>(),
  logout: createAsyncState<UserLogoutResponseDto>(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, loginAccount, "login");
    addAsyncThunkHandlers(builder, logoutAccount, "logout");
  },
});

export default authSlice.reducer;
