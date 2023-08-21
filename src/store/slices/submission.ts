import {
  IProjectRes,
  ISubmissionFundModel,
  Metadata,
} from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from 'store/store';

import { EMPTY_STRING } from '../../shared/constants';
import { getFundParticipant } from '../../shared/utils/fundUtils';

export interface Submission {
  metadata: Metadata | null;
  projects: IProjectRes[];
  funds: ISubmissionFundModel[];
}
const initialState: Submission = {
  metadata: {
    fee_token: EMPTY_STRING,
    total_fee_balance: EMPTY_STRING,
    join_fee: EMPTY_STRING,
    owner_id: EMPTY_STRING,
    version: EMPTY_STRING,
  },
  projects: [],
  funds: [],
};

const submissionSlice = createSlice({
  name: 'submission',
  initialState,
  reducers: {
    setSubmissionMetadata: (
      state,
      { payload }: PayloadAction<Metadata | null>
    ) => {
      state.metadata = payload;
    },
    setSubmissionProjects: (
      state,
      { payload }: PayloadAction<IProjectRes[]>
    ) => {
      state.projects = payload;
    },
    setSubmissionFunds: (
      state,
      action: PayloadAction<ISubmissionFundModel[]>
    ) => {
      state.funds = action.payload;
    },
  },
});

export const {
  setSubmissionMetadata,
  setSubmissionProjects,
  setSubmissionFunds,
} = submissionSlice.actions;

export const selectSubmissionMetadata = (state: RootState) =>
  state.submission.metadata;

export const selectSubmissionProjects = (state: RootState) =>
  state.submission.projects;

export const selectSubmissionProjectsName = (state: RootState) =>
  state.submission.projects.map((project) => project.name);

export const selectSubmissionFunds = (state: RootState) =>
  state.submission.funds;

export const selectSubFundById = createSelector(
  [selectSubmissionFunds, (_: RootState, accountId: string) => accountId],
  (funds: ISubmissionFundModel[], accountId: string) =>
    getFundParticipant(funds, accountId) as ISubmissionFundModel
);

export const submissionReducer = submissionSlice.reducer;
