import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Big from 'big.js';

import { RootState } from '../store';

export type ITokenPricesState = { [key: string]: Big };

const initialState: ITokenPricesState = {};

const tokenPricesSlice = createSlice({
  name: 'tokenPrices',
  initialState,
  reducers: {
    setTokenPrices: (state, action: PayloadAction<{ [key: string]: Big }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setTokenPrices } = tokenPricesSlice.actions;
export const selectTokenPrices = (state: RootState) => state.tokenPrices;

export const tokenPricesReducer = tokenPricesSlice.reducer;
