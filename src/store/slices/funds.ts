import { IFund } from '@pitchtalk/contract-api-js/dist/core';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { selectAccountId } from './user';
import { getFundParticipant } from '../../shared/utils/fundUtils';
import { RootState } from '../store';

const initialState: IFund[] = [];

const fundsSlice = createSlice({
  name: 'funds',
  initialState,
  reducers: {
    setFunds: (_, action: PayloadAction<IFund[]>) => action.payload,
  },
});

export const { setFunds } = fundsSlice.actions;

export const selectFunds = (state: RootState) => state.funds;
export const selectFund = createSelector(
  [selectFunds, selectAccountId],
  (funds: IFund[], accountId: string) => {
    return getFundParticipant(funds, accountId) as IFund;
  }
);
export const selectIsGrantUser = createSelector(
  [selectFunds, selectAccountId],
  (funds: IFund[], accountId: string) => {
    const grantUser = getFundParticipant(funds, accountId) as IFund;
    return {
      isGrantUser: !!grantUser,
      isGrantUserActive: grantUser?.is_active,
    };
  }
);
export const selectFundAccount = createSelector(
  [selectFunds, selectAccountId],
  (funds: IFund[], accountId: string) => {
    return getFundParticipant(funds, accountId) as IFund | undefined;
  }
);
export const fundsReducer = fundsSlice.reducer;
