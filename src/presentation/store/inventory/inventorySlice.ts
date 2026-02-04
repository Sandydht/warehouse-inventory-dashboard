import { createSlice } from "@reduxjs/toolkit";
import type { InventoryItemDto } from "../../../infrastructure/dto/common/InventoryItemDto";
import type { GetInventoryListResponseDto } from "../../../infrastructure/dto/response/GetInventoryListResponseDto";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import { getInventoryList } from "./inventoryThunk";

interface InventoryState {
  inventoryList: AsyncState<GetInventoryListResponseDto<InventoryItemDto>>;
}

const initialState: InventoryState = {
  inventoryList:
    createAsyncState<GetInventoryListResponseDto<InventoryItemDto>>(),
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, getInventoryList, "inventoryList");
  },
});

export default inventorySlice.reducer;
