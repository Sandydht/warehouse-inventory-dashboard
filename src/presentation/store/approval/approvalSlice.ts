import { createSlice } from "@reduxjs/toolkit";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import {
  approveRequest,
  createApprovalRequest,
  getApprovalList,
  getApprovalRequestDetail,
  rejectRequest,
} from "./approvalThunk";
import type { GetApprovalListResponseDto } from "../../../infrastructure/dto/response/GetApprovalListResponseDto";
import type { ApprovalRequestDto } from "../../../infrastructure/dto/common/ApprovalRequestDto";
import type { InventoryItemDto } from "../../../infrastructure/dto/common/InventoryItemDto";

interface ApprovalState {
  approvalRequest: AsyncState<ApprovalRequestDto<InventoryItemDto>>;
  approvalList: AsyncState<
    GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>
  >;
  approvalRequestDetail: AsyncState<ApprovalRequestDto<InventoryItemDto>>;
  approveRequest: AsyncState<ApprovalRequestDto<InventoryItemDto>>;
  rejectRequest: AsyncState<ApprovalRequestDto<InventoryItemDto>>;
}

const initialState: ApprovalState = {
  approvalRequest: createAsyncState<ApprovalRequestDto<InventoryItemDto>>(),
  approvalList:
    createAsyncState<
      GetApprovalListResponseDto<ApprovalRequestDto<InventoryItemDto>>
    >(),
  approvalRequestDetail:
    createAsyncState<ApprovalRequestDto<InventoryItemDto>>(),
  approveRequest: createAsyncState<ApprovalRequestDto<InventoryItemDto>>(),
  rejectRequest: createAsyncState<ApprovalRequestDto<InventoryItemDto>>(),
};

const approvalSlice = createSlice({
  name: "approval",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, createApprovalRequest, "approvalRequest");
    addAsyncThunkHandlers(builder, getApprovalList, "approvalList");
    addAsyncThunkHandlers(
      builder,
      getApprovalRequestDetail,
      "approvalRequestDetail",
    );
    addAsyncThunkHandlers(builder, approveRequest, "approveRequest");
    addAsyncThunkHandlers(builder, rejectRequest, "rejectRequest");
  },
});

export default approvalSlice.reducer;
