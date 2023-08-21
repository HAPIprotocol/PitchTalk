import { Vesting } from '@pitchtalk/contract-api-js/dist/core';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import secToMs from 'date-fns/secondsToMilliseconds';

import { updateOnChainProject } from './projects';
import { RootState } from '../store';

type VestingState = { [projectId: string]: Vesting | null };

const initialState: VestingState = {};

const vestingSlice = createSlice({
  name: 'vesting',
  initialState,
  reducers: {
    setVesting: (
      _,
      action: PayloadAction<{ [projectId: string]: Vesting | null }>
    ) => action.payload,
  },
  extraReducers(builder) {
    builder.addCase(
      updateOnChainProject,
      (state, { payload: { project, vesting } }) => {
        if (vesting) {
          state[project.project_id] = {
            ...vesting,
            start_sec: secToMs(vesting.start_sec),
          };
        }
      }
    );
  },
});

export const { setVesting } = vestingSlice.actions;

export const selectVesting = (state: RootState) => state.vesting;
export const selectProjectVesting = createSelector(
  [selectVesting, (_: RootState, projectId: number) => projectId],
  (vestingData: VestingState, projectId: number) => {
    return vestingData[projectId] || null;
  }
);

export const vestingReducer = vestingSlice.reducer;
