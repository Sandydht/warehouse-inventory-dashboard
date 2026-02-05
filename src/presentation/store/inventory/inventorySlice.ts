import { createSlice } from "@reduxjs/toolkit";
import type { InventoryItemDto } from "../../../infrastructure/dto/common/InventoryItemDto";
import type { GetInventoryListResponseDto } from "../../../infrastructure/dto/response/GetInventoryListResponseDto";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import { getInventoryDetail, getInventoryList } from "./inventoryThunk";

interface InventoryState {
  inventoryList: AsyncState<GetInventoryListResponseDto<InventoryItemDto>>;
  inventoryDetail: AsyncState<InventoryItemDto>;
}

const initialState: InventoryState = {
  inventoryList:
    createAsyncState<GetInventoryListResponseDto<InventoryItemDto>>(),
  inventoryDetail: createAsyncState<InventoryItemDto>(),
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, getInventoryList, "inventoryList");
    addAsyncThunkHandlers(builder, getInventoryDetail, "inventoryDetail");
  },
});

export default inventorySlice.reducer;
