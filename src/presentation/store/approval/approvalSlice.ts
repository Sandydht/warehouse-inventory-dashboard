import { createSlice } from "@reduxjs/toolkit";
import type InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import type { CreateApprovalResponseDto } from "../../../infrastructure/dto/response/CreateApprovalResponseDto";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import { createApprovalRequest } from "./approvalThunk";

interface ApprovalState {
  approvalRequest: AsyncState<CreateApprovalResponseDto<InventoryItem>>;
}

const initialState: ApprovalState = {
  approvalRequest: createAsyncState<CreateApprovalResponseDto<InventoryItem>>(),
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, createApprovalRequest, "approvalRequest");
  },
});

export default approvalSlice.reducer;
