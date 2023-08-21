import { ITokenMetadata } from '@pitchtalk/contract-api-js/dist/FungibleTokenService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

export type ITokensState = { [key: string]: ITokenMetadata };

const initialState: ITokensState = {};

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ [tokenId: string]: ITokenMetadata }>
    ) => ({ ...state, ...action.payload }),
    setToken: (
      state,
      action: PayloadAction<ITokenMetadata & { tokenId: string }>
    ) => {
      const { tokenId, ...rest } = action.payload;
      state[tokenId] = { ...state?.[tokenId], ...rest };
    },
  },
});

export const { setTokens, setToken } = tokensSlice.actions;
export const selectTokens = (state: RootState) => state.tokens;

export const tokensReducer = tokensSlice.reducer;
