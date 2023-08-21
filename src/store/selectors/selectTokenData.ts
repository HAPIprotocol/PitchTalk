import { createSelector } from '@reduxjs/toolkit';
import Big from 'big.js';

import usdtIcon from 'assets/images/icons/usdt-icon.png';
import wNearIcon from 'assets/images/icons/wNear-icon.svg';
import { DEFAULT_TOKEN_DATA, ZERO_BIG } from 'shared/constants';
import { ITokensState, selectTokens } from 'store/slices/tokens';
import { RootState } from 'store/store';

import { ITokenPricesState, selectTokenPrices } from './../slices/tokenPrices';

export type TokenData = {
  decimals: number;
  symbol: string;
  price: Big;
  icon: string;
};

const DEFAULT_TOKEN: TokenData = {
  ...DEFAULT_TOKEN_DATA,
  icon: usdtIcon,
  price: ZERO_BIG,
};

export const selectTokenData = createSelector(
  [
    selectTokens,
    selectTokenPrices,
    (_: RootState, tokenId?: string) => tokenId,
  ],
  (tokens: ITokensState, prices: ITokenPricesState, tokenId?: string) => {
    if (!tokenId || !tokens?.[tokenId]) return DEFAULT_TOKEN;

    return {
      icon: tokens[tokenId].icon,
      price: prices[tokenId] || ZERO_BIG,
      symbol: tokens[tokenId].symbol,
      decimals: tokens[tokenId].decimals,
    };
  }
);
