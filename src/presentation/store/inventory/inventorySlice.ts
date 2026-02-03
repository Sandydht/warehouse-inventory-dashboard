import { createSlice } from "@reduxjs/toolkit";
import type { AddProductResponseDto } from "../../../infrastructure/dto/response/AddProductResponseDto";
import {
  addAsyncThunkHandlers,
  createAsyncState,
  type AsyncState,
} from "../utils/createAsyncHandlers";
import { addProductToInventory } from "./inventoryThunk";

interface InventoryState {
  addProduct: AsyncState<AddProductResponseDto>;
}

const initialState: InventoryState = {
  addProduct: createAsyncState<AddProductResponseDto>(),
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    addAsyncThunkHandlers(builder, addProductToInventory, "addProduct");
  },
});

export default inventorySlice.reducer;
