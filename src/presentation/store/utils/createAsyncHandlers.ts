/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AsyncThunk } from "@reduxjs/toolkit";

export type AsyncState<T> = {
  loading: boolean;
  data: T | null;
  error: string | null;
};

export const createAsyncState = <T>(): AsyncState<T> => ({
  loading: false,
  data: null,
  error: null,
});

export const addAsyncThunkHandlers = <T>(
  builder: any,
  thunk: AsyncThunk<T, any, { rejectValue: string }>,
  stateKey: string,
) => {
  builder
    .addCase(thunk.pending, (state: any) => {
      state[stateKey].loading = true;
      state[stateKey].error = null;
    })
    .addCase(thunk.fulfilled, (state: any, action: any) => {
      state[stateKey].error = null;
      state[stateKey].loading = false;
      state[stateKey].data = action.payload;
    })
    .addCase(thunk.rejected, (state: any, action: any) => {
      state[stateKey].loading = false;
      state[stateKey].error = action.payload as string;
    });
};
