import { createSlice } from "@reduxjs/toolkit";
import type { StockHistoryItemDto } from "../../../infrastructure/dto/common/StockHistoryItemDto";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import { getLast30DaysStockHistory } from "./stockHistoryThunk";

interface StockHistoryState {
  getLast30DaysStockHistory: AsyncState<StockHistoryItemDto[]>;
}

const initialState: StockHistoryState = {
  getLast30DaysStockHistory: createAsyncState<StockHistoryItemDto[]>(),
};

const stockHistorySlice = createSlice({
  name: "stockHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(
      builder,
      getLast30DaysStockHistory,
      "getLast30DaysStockHistory",
    );
  },
});

export default stockHistorySlice.reducer;
