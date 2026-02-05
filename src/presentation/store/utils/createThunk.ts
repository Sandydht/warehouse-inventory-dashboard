/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";

export function createUseCaseThunk<ReturnType, PayloadType = void>(
  typePrefix: string,
  useCaseFactory: () => {
    execute: (payload: PayloadType) => Promise<ReturnType>;
  },
  mapResult?: (result: ReturnType) => any,
) {
  return createAsyncThunk<ReturnType, PayloadType, { rejectValue: string }>(
    typePrefix,
    async (payload: PayloadType, { rejectWithValue }) => {
      try {
        const useCase = useCaseFactory();
        const result = await useCase.execute(payload);
        return mapResult ? mapResult(result) : result;
      } catch (error: any) {
        return rejectWithValue(error.message);
      }
    },
  );
}
