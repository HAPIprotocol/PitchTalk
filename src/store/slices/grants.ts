import { IGrant } from '@pitchtalk/contract-api-js/dist/core';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store/store';

import { updateOnChainProject } from './projects';

export interface IGrantsState {
  [projectId: string]: IGrant[];
}

const initialState: IGrantsState = {};

const grantsSlice = createSlice({
  name: 'grants',
  initialState,
  reducers: {
    setGrants: (_, action: PayloadAction<{ [projectId: string]: IGrant[] }>) =>
      action.payload,
  },
  extraReducers(builder) {
    builder.addCase(
      updateOnChainProject,
      (state, { payload: { project, grants } }) => {
        if (grants) state[project.project_id] = grants;
      }
    );
  },
});

export const { setGrants } = grantsSlice.actions;

export const selectGrants = (state: RootState) => state.grants;
export const selectProjectGrants = createSelector(
  [selectGrants, (_: RootState, projectId: number) => projectId],
  (grants: IGrantsState, projectId: number) => {
    return grants[projectId] || [];
  }
);

export const grantsReducer = grantsSlice.reducer;
