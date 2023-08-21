import { IGrant } from '@pitchtalk/contract-api-js/dist/core';
import {
  EUserRoles,
  IOffChainProject,
  IOffChainUserData,
} from '@pitchtalk/contract-api-js/dist/interfaces';
import { IProjectRes } from '@pitchtalk/contract-api-js/dist/SubmissionService/types';
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { EMPTY_STRING, ZERO_BIG } from 'shared/constants';
import { IUserInvestments } from 'shared/interfaces';
import { EProviders } from 'store/types/user';

import { RootState } from '../store';

export interface IOffChainUser {
  projects: {
    subProject: IOffChainProject | null;
    project: IOffChainProject | null;
  };
  user: IOffChainUserData | null;
}

export interface IUserState {
  id: string;
  userOffChainId: string | null;
  userDisplayName: string;
  userRole: EUserRoles;
  userImg: string;
  userProvider: EProviders;
  project: IProjectRes | null;
  investmentsData: IUserInvestments;
  issuedGrants: IGrant[];
  offChainData: IOffChainUser;
  isLoading: boolean;
}

const initialUserInvestmentsData: IUserInvestments = {
  donationList: [],
  investmentsList: [],
  totalSpent: { donations: ZERO_BIG, investments: ZERO_BIG },
  totalSpentByProjects: {},
};

const initialState: IUserState = {
  id: '',
  userOffChainId: null,
  userDisplayName: '',
  userRole: EUserRoles.USER,
  userImg: '',
  userProvider: EProviders.GOOGLE,
  project: null,
  investmentsData: initialUserInvestmentsData,
  issuedGrants: [],
  offChainData: {
    projects: {
      subProject: null,
      project: null,
    },
    user: null,
  },
  isLoading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccountId: (state, { payload }: PayloadAction<string>) => {
      state.id = payload;
    },
    setUserProject: (state, { payload }: PayloadAction<IProjectRes | null>) => {
      state.project = payload;
    },
    setUserInvestments: (
      state,
      { payload }: PayloadAction<IUserInvestments>
    ) => {
      state.investmentsData = payload;
    },
    setIssuedGrants: (state, { payload }: PayloadAction<IGrant[]>) => {
      state.issuedGrants = payload;
    },
    setOffChainUserData: (
      state,
      { payload }: PayloadAction<IOffChainUserData | null>
    ) => {
      state.offChainData.user = payload;
      state.userOffChainId = payload?.id || null;
      state.userRole = payload?.role || EUserRoles.USER;
      state.userDisplayName = payload?.display_name || EMPTY_STRING;
      state.userImg = payload?.picture || EMPTY_STRING;
      state.userProvider =
        (payload?.provider as EProviders) || EProviders.GOOGLE;
    },
    setOffChainUserProjects: (
      state,
      {
        payload,
      }: PayloadAction<{
        subProject: IOffChainProject | null;
        project: IOffChainProject | null;
      }>
    ) => {
      state.offChainData.projects = payload;
    },
    setIsUserDataLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setUserOffChainId: (state, { payload }: PayloadAction<string | null>) => {
      state.userOffChainId = payload;
    },
    setUserImg: (state, { payload }: PayloadAction<string>) => {
      state.userImg = payload;
    },
    setUserDisplayName: (state, { payload }: PayloadAction<string>) => {
      state.userDisplayName = payload;
    },
    setUserRole: (state, { payload }: PayloadAction<EUserRoles>) => {
      state.userRole = payload;
    },
    setUserProvider: (state, { payload }: PayloadAction<EProviders>) => {
      state.userProvider = payload;
    },
  },
});

// SELECTORS
export const selectIsUserDataLoading = (state: RootState) =>
  state.user.isLoading;

export const selectAccountId = (state: RootState) => state.user.id;

export const selectUserProject = (state: RootState) => state.user.project;

export const selectUserProjectId = (state: RootState) =>
  state.user?.project?.id;

export const selectIssuedGrants = (state: RootState) =>
  state.user.issuedGrants || [];

export const selectUserInvestments = (state: RootState) =>
  state.user.investmentsData;

export const selectUserInvestmentsByProjectId = createSelector(
  [selectUserInvestments, (_: RootState, projectId: number) => projectId],
  ({ totalSpentByProjects }: IUserInvestments, projectId: number) => ({
    donated: totalSpentByProjects?.[projectId]?.donated || ZERO_BIG,
    invested: totalSpentByProjects?.[projectId]?.invested || ZERO_BIG,
  })
);

export const selectOffChainUserData = (state: RootState) =>
  state.user.offChainData.user;

export const selectOffChainUserProject = (state: RootState) =>
  state.user.offChainData.projects.project;

export const selectOffChainUserSubProject = (state: RootState) =>
  state.user.offChainData.projects.subProject;

export const selectUserOffChainId = (state: RootState) =>
  state.user.userOffChainId;

export const selectUserImg = (state: RootState) => state.user.userImg;

export const selectUserRole = (state: RootState) => state.user.userRole;

export const selectUserDisplayName = (state: RootState) =>
  state.user.userDisplayName;

export const selectIsUserAdmin = (state: RootState) =>
  selectUserRole(state) === EUserRoles.ADMIN;

export const selectIsUserChatAdmin = (state: RootState) =>
  state.user.userRole === EUserRoles.ADMIN ||
  state.user.userRole === EUserRoles.MODERATOR;

export const selectUserProvider = (state: RootState) => state.user.userProvider;

// ACTIONS
export const {
  setAccountId,
  setUserInvestments,
  setUserProject,
  setIssuedGrants,
  setOffChainUserData,
  setOffChainUserProjects,
  setUserOffChainId,
  setUserRole,
  setUserImg,
  setUserDisplayName,
  setUserProvider,
  setIsUserDataLoading,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
