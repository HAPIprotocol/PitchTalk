import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IClosestPitch } from 'shared/interfaces';

import { RootState } from '../store';

type ClosestPitchState = IClosestPitch;

const initialState: ClosestPitchState = {} as IClosestPitch;

const closestPitchSlice = createSlice({
  name: 'closestPitch',
  initialState,
  reducers: {
    setClosestPitch: (_, action: PayloadAction<IClosestPitch>) =>
      action.payload,
  },
});

export const { setClosestPitch } = closestPitchSlice.actions;

export const selectClosestPitch = (state: RootState) => state.closestPitch;

export const closestPitchReducer = closestPitchSlice.reducer;
