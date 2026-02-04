import { createSlice } from "@reduxjs/toolkit";
import type InventoryItem from "../../../domain/inventory/entity/InventoryItem";
import type { CreateApprovalResponseDto } from "../../../infrastructure/dto/response/CreateApprovalResponseDto";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import { createApprovalRequest, getApprovalList } from "./approvalThunk";
import type { GetApprovalListResponseDto } from "../../../infrastructure/dto/response/GetApprovalListResponseDto";
import type ApprovalRequest from "../../../domain/approval/entity/ApprovalRequest";

interface ApprovalState {
  approvalRequest: AsyncState<CreateApprovalResponseDto<InventoryItem>>;
  approvalList: AsyncState<
    GetApprovalListResponseDto<ApprovalRequest<InventoryItem>>
  >;
}

const initialState: ApprovalState = {
  approvalRequest: createAsyncState<CreateApprovalResponseDto<InventoryItem>>(),
  approvalList:
    createAsyncState<
      GetApprovalListResponseDto<ApprovalRequest<InventoryItem>>
    >(),
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, createApprovalRequest, "approvalRequest");
    addAsyncThunkHandlers(builder, getApprovalList, "approvalList");
  },
});

export default approvalSlice.reducer;
