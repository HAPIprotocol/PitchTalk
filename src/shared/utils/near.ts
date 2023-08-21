import Big, { BigSource } from 'big.js';

import { BASE, DEFAULT_NEAR_DECIMALS } from 'shared/constants';

export const getAmountFormatted = (
  amount: BigSource,
  decimals: number = DEFAULT_NEAR_DECIMALS,
  toFixed = 1
) => {
  return new Big(amount)
    .div(BASE ** decimals)
    .toFixed(toFixed)
    .toString();
};

export const getFiatAmount = (
  amount: BigSource,
  price: BigSource,
  decimals?: number,
  toFixed = 1
) => {
  return new Big(amount)
    .mul(price)
    .div(decimals ? BASE ** decimals : 1)
    .toFixed(toFixed)
    .toString();
};

export const getAmountWithDecimals = (
  amount: BigSource,
  decimals: number = DEFAULT_NEAR_DECIMALS,
  toFixed = 1
) => {
  return Big(amount)
    .mul(BASE ** decimals)
    .toFixed(toFixed)
    .toString();
};

export const roundToLow = (num: number, precision: number) =>
  Math.floor(num * BASE ** precision) / BASE ** precision;
