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
import type { ApprovalRequestDto } from "../../../infrastructure/dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../../../infrastructure/dto/common/InventoryItemDto";

interface ApprovalState {
  approvalRequest: AsyncState<CreateApprovalResponseDto<InventoryItem>>;
  approvalList: AsyncState<
    GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>
  >;
}

const initialState: ApprovalState = {
  approvalRequest: createAsyncState<CreateApprovalResponseDto<InventoryItem>>(),
  approvalList:
    createAsyncState<
      GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>
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
