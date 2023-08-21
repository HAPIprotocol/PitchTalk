import { IProjectFinancialInfo } from '@pitchtalk/contract-api-js/dist/pitchtalk';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { updateOnChainProject } from './projects';
import { RootState } from '../store';

export const DEFAULT_DONATIONS: IProjectFinancialInfo = {
  total_donations: '0',
  total_investments: '0',
  ft_token_id: '',
  project_id: '',
};

interface IProjectDonations {
  ft_token_id: string | null;
  total_donations: string;
  total_investments: string;
}
type DonationsState = { [projectId: string]: IProjectDonations | null };

const initialState: DonationsState = {};

const donationsSlice = createSlice({
  name: 'donations',
  initialState,
  reducers: {
    setDonations: (
      state,
      action: PayloadAction<{ [projectId: string]: IProjectDonations | null }>
    ) => ({ ...state, ...action.payload }),
    setProjectDonations: (
      state,
      action: PayloadAction<IProjectDonations & { projectId: number }>
    ) => {
      const { projectId, ...rest } = action.payload;
      state[projectId] = rest;
    },
  },
  extraReducers(builder) {
    builder.addCase(updateOnChainProject, (state, { payload: { project } }) => {
      const { project_id, total_donations, total_investments, ft_token_id } =
        project;
      state[project_id] = {
        total_donations,
        total_investments,
        ft_token_id,
      };
    });
  },
});

export const { setDonations, setProjectDonations } = donationsSlice.actions;

export const selectDonations = (state: RootState) => state.donations;
export const selectDonationsByProjectId = createSelector(
  [selectDonations, (_: RootState, projectId: number) => projectId],
  (donations: DonationsState, projectId: number) => {
    return donations[projectId] || DEFAULT_DONATIONS;
  }
);

export const donationsReducer = donationsSlice.reducer;
