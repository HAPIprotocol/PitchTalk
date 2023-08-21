import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { PitchWithProjectData } from 'shared/interfaces';

import { RootState } from '../store';

type IPitchesState = PitchWithProjectData[];

const initialState: IPitchesState = [];

const pitchesSlice = createSlice({
  name: 'pitches',
  initialState,
  reducers: {
    setPitches: (_, action: PayloadAction<PitchWithProjectData[]>) =>
      action.payload,
  },
});

export const { setPitches } = pitchesSlice.actions;

export const selectPitches = (state: RootState) => state.pitches;

export const pitchesReducer = pitchesSlice.reducer;
